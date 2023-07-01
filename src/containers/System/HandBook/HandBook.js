import MarkdownIt from "markdown-it";
import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import MdEditor from "react-markdown-editor-lite";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createNewHandbook, editHandbookService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import './HandBook.scss';
import TableManageHandBook from "./TableManageHandBook";
const mdParser = new MarkdownIt();

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : '',
        descriptionHTML : '',
        descriptionMarkdown : '',  
        imageBase64: '',
        isOpen: false,
        handbookEditId: "",
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
  handleSaveNewHandbook = async()=>{
    if(this.state.action === CRUD_ACTIONS.CREATE){
      let res = await createNewHandbook(this.state)
      if(res?.errCode === 0){
          toast.success('Add new handbook succeeds!')
          this.setState({
            name : '',
            imageBase64 : '',
            descriptionHTML : '',
            descriptionMarkdown : '',   
            action: CRUD_ACTIONS.CREATE,
          })
          this.props.fetchAllHandbook()
      }else{
          toast.error('Something wrongs....')
      }
    }else{
      const dataSubmit = {
        id : this.state.handbookEditId,
        name : this.state.name,
        imageBase64 : this.state.imageBase64,
        descriptionHTML : this.state.descriptionHTML,
        descriptionMarkdown : this.state.descriptionMarkdown,   
        action: CRUD_ACTIONS.CREATE,
      }
      let res = await editHandbookService(dataSubmit)
      if(res.errCode === 0){
        toast.success('Edit handbook is successed!')
        this.setState({
          name : '',
          imageBase64 : '',
          descriptionHTML : '',
          descriptionMarkdown : '',   
          action: CRUD_ACTIONS.CREATE,
        })
        this.props.fetchAllHandbook()
      }else{
        toast.error('Something wrongs....')
      }
    }
  }
  handleEditHandbookFromParentKey = (item)=>{
    this.setState({
      handbookEditId : item?.id,
      name : item?.name,
      imageBase64 : item?.image,
      descriptionHTML : item?.descriptionHTML,
      descriptionMarkdown : item?.descriptionMarkdown,   
      action: CRUD_ACTIONS.EDIT,
    });
  }
  render() {
    return (
    <div className="manage-handbook-container">
        <div className="ms-title">Quản lý cẩm nang</div>
        <div className="add-new-handbook row">
            <div className="col-6 form-group">
                <label>Tên cẩm nang</label>
                <input className="form-control" type="text" value={this.state.name} 
                onChange={(event)=>this.handleOnChangeInput(event,'name')}>
                </input>
            </div>
            <div className="form-group col-3">
                <label htmlFor="">
                  Ảnh cẩm nang
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
                  onClick={() => this.handleSaveNewHandbook()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    'Sửa thông tin'
                  ) : (
                    'Lưu thông tin'
                  )}
                </button>
            </div>
            <div className="col-12 mb-5">
                <TableManageHandBook
                  handleEditHandbookFromParentKey={this.handleEditHandbookFromParentKey}
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
    fetchAllHandbook: () => dispatch(actions.fetchAllHandbook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
