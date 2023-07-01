import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from "../../../utils";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email : '',
        imageBase64 : ''
    };
  }
  async componentDidMount() {
    if(this.props.dataModal){
        this.setState({
            email : this.props.dataModal?.email
        })
    }
  }
  
  componentDidUpdate(prevProps, prevState, snpashot) {
    if(prevProps.dataModal !== this.props.dataModal){
        this.setState({
            email : this.props.dataModal?.email
        })
    }
  }
  toggle = ()=>{
    this.props.toggle()
  }
  onChangeInput = (event)=>{
    this.setState({
        email :event.target.value
    })
  }
  handleOnChangeFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  hanelSendRemedy = ()=>{
    this.props.sendRedemy(this.state)
  }
  render() {
    let {isOpenRemdyModal,dataModal,sendRedemy} = this.props
    return (
        <Modal
        isOpen={isOpenRemdyModal}
        toggle={()=>this.toggle()}
        className={"remedy-modal-container"}
        size="md"
        centered
      >
         <ModalHeader toggle={this.toggle}>Gửi hóa đơn khám bệnh</ModalHeader>
          <ModalBody>
            <div className="row">
                <div className="col-6 form-group">
                    <label>Email bệnh nhân</label>
                    <input type="email" value={this.state.email} className="form-control" onChange={(event)=>this.onChangeInput(event)}></input>
                </div>
                <div className="col-6 form-group">
                    <label>Chọn file đơn thuốc</label>
                    <input type="file" className="form-control-file"
                    onChange={(event)=>this.handleOnChangeFile(event)}
                    ></input>
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.hanelSendRemedy}>Send</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user : state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
