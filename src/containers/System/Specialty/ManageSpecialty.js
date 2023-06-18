import React, { Component } from "react";
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : '',
        imageBase64 : '',
        descriptionHTML : '',
        descriptionMarkdown : '',   
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
  handleSaveNewSpecialty = async()=>{
    console.log('xxxxthiss.state',this.state);
    let res = await createNewSpecialty(this.state)
    if(res?.errCode === 0){
        toast.success('Add new specialty succeeds!')
    }else{
        toast.error('Something wrongs....')
        console.log('xxx',res);
    }
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
            <div className="col-6 form-group">
                <label>Ảnh chuyên khoa</label>
                <input className="form-control-file" type="file" 
                onChange={(event)=>{this.handleOnChangeImage(event)}}
                >
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
                <button className="btn-save-specialty" onClick={()=>this.handleSaveNewSpecialty()}>Save</button>
            </div>
        </div>
     
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
