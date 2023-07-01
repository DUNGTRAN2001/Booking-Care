import React, { Component } from "react";
import { connect } from "react-redux";
import './ManageClinic.scss';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createClinic, editSClinicService } from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageClinic from "./TableManageClinic";
import Lightbox from "react-image-lightbox";
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : '',
        address : '',
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
  handleSaveNewClinic = async()=>{
    if(this.state.action === CRUD_ACTIONS.CREATE){
      let res = await createClinic(this.state)
      if(res?.errCode === 0){
          toast.success('Add new clinic succeeds!')
          this.setState({
            name : '',
            address : '',
            imageBase64 : '',
            descriptionHTML : '', 
            descriptionMarkdown : '', 
            action : CRUD_ACTIONS.CREATE  
          })
          this.props.fetchAllClinic()
      }else{
          toast.error('Something wrongs....')
      }
    }else{
      const dataSubmit = {
        id : this.state.specialtyEditId,
        name : this.state.name,
        address :  this.state.address,
        imageBase64 : this.state.imageBase64,
        descriptionHTML : this.state.descriptionHTML,
        descriptionMarkdown : this.state.descriptionMarkdown,   
        action: CRUD_ACTIONS.CREATE,
      }
      let res = await editSClinicService(dataSubmit)
      if(res.errCode === 0){
        toast.success('Edit clinic is successed!')
        this.setState({
          name : '',
          address : '',
          imageBase64 : '',
          descriptionHTML : '',
          descriptionMarkdown : '',   
          action: CRUD_ACTIONS.CREATE,
        })
        this.props.fetchAllClinic()
      }else{
        toast.error('Something wrongs....')
      }
    }
  }
  handleEditClinicFromParentKey = (item)=>{
    this.setState({
      specialtyEditId : item?.id,
      name : item?.name,
      address : item?.address,
      imageBase64 : item?.image,
      descriptionHTML : item?.descriptionHTML,
      descriptionMarkdown : item?.descriptionMarkdown,   
      action: CRUD_ACTIONS.EDIT,
    });
  }
  render() {
    return (
    <div className="manage-clinic-container">
        <div className="ms-title">Quản lý phòng khám</div>
        <div className="add-new-clinic row">
            <div className="col-6 form-group">
                <label>Tên phòng khám</label>
                <input className="form-control" type="text" value={this.state.name} 
                onChange={(event)=>this.handleOnChangeInput(event,'name')}>
                </input>
            </div>
            <div className="form-group col-3">
                <label htmlFor="">
                  Ảnh phòng khám
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
             <div className="col-6 mb-4">
                <label>Địa chỉ phòng khám</label>
                <input className="form-control" type="text" value={this.state.address} 
                onChange={(event)=>this.handleOnChangeInput(event,'address')}>
                </input>
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
                  onClick={() => this.handleSaveNewClinic()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    'Sửa thông tin'
                  ) : (
                    'Lưu thông tin'
                  )}
                </button>
            </div>
            <div className="col-12 mb-5">
                <TableManageClinic
                  handleEditClinicFromParentKey={this.handleEditClinicFromParentKey}
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
    fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
