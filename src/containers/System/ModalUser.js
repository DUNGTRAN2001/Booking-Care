import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    console.log("check child props", this.props);
    console.log("check child openmodal", this.props.isOpen);
    return (
      <Modal
        //isOpen thuộc tính có sẵn
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create a new User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="">Email</label>
              <input type="text" name="" id="" placeholder="Email..." />
            </div>
            <div className="input-container">
              <label htmlFor="">PassWord</label>
              <input type="text" name="" id="" placeholder="Password..." />
            </div>
            <div className="input-container">
              <label htmlFor="">FirstName</label>
              <input type="text" name="" id="" placeholder="FirstName..." />
            </div>
            <div className="input-container">
              <label htmlFor="">LastName</label>
              <input type="text" name="" id="" placeholder="LastName..." />
            </div>
            <div className="input-container max-width-input">
              <label htmlFor="">Address</label>
              <input type="text" name="" id="" placeholder="Address..." />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
