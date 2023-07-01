import React, { Component } from "react";
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createNewSpecialty, editSpecialtyService, getAllSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageSpecialty from "./TableManageSpecialty";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import { FormattedMessage } from "react-intl";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : '',
        descriptionHTML : '',
        descriptionMarkdown : '',  
        imageBase64: '',
        isOpen: false,
        specialtyEditId: "",
        action: CRUD_ACTIONS.CREATE, 
    };
  }

  componentDidMount() {
  }
  componentDidUpdate(){

  }
  handleOnChangeInput = (event,id)=>{
    const copyState = {...this.state};
    copyState[id] = event.target.value;
    this.setState({
        ...copyState
    })
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
        descriptionMarkdown: text,
        descriptionHTML: html,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  openPreviewImg = () => {
    if (!this.state.imageBase64) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveNewSpecialty = async()=>{
    if(this.state.action === CRUD_ACTIONS.CREATE){
      let res = await createNewSpecialty(this.state)
      if(res?.errCode === 0){
          toast.success('Add new specialty succeeds!')
          this.setState({
            name : '',
            imageBase64 : '',
            descriptionHTML : '',
            descriptionMarkdown : '',   
            action: CRUD_ACTIONS.CREATE,
          })
          this.props.fetchAllSpecialty()
      }else{
          toast.error('Something wrongs....')
      }
    }else{
      const dataSubmit = {
        id : this.state.specialtyEditId,
        name : this.state.name,
        imageBase64 : this.state.imageBase64,
        descriptionHTML : this.state.descriptionHTML,
        descriptionMarkdown : this.state.descriptionMarkdown,   
        action: CRUD_ACTIONS.CREATE,
      }
      let res = await editSpecialtyService(dataSubmit)
      if(res.errCode === 0){
        toast.success('Edit specialty is successed!')
        this.setState({
          name : '',
          imageBase64 : '',
          descriptionHTML : '',
          descriptionMarkdown : '',   
          action: CRUD_ACTIONS.CREATE,
        })
        this.props.fetchAllSpecialty()
      }else{
        toast.error('Something wrongs....')
      }
    }
  }
  handleEditSpecialtyFromParentKey = (item)=>{
    this.setState({
      specialtyEditId : item?.id,
      name : item?.name,
      imageBase64 : item?.image,
      descriptionHTML : item?.descriptionHTML,
      descriptionMarkdown : item?.descriptionMarkdown,   
      action: CRUD_ACTIONS.EDIT,
    });
  }
  render() {
    return (
    <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>
        <div className="add-new-specialty row">
            <div className="col-6 form-group">
                <label>Tên chuyên khoa</label>
                <input className="form-control" type="text" value={this.state.name} 
                onChange={(event)=>this.handleOnChangeInput(event,'name')}>
                </input>
            </div>
            <div className="form-group col-3">
                <label htmlFor="">
                  Ảnh chuyên khoa
                </label>
                <div className="preview-img-cotainer">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="lable-upload">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.imageBase64})`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>
            <div className="col-12">
                <MdEditor
                    style={{ height: "300px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.descriptionMarkdown}
                />
            </div>
            <div className="col-12">
              <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  style={{margin : '10px 0'}}
                  onClick={() => this.handleSaveNewSpecialty()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    'Sửa thông tin'
                  ) : (
                    'Lưu thông tin'
                  )}
                </button>
            </div>
            <div className="col-12 mb-5">
                <TableManageSpecialty
                  handleEditSpecialtyFromParentKey={this.handleEditSpecialtyFromParentKey}
                  action={this.state.action}
                />
              </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.imageBase64}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
