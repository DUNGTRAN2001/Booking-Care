import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "harcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateIput = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter" + " " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateIput();
    if (isValid === true) {
      // call Api edit Modal
      this.props.editUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        //isOpen thuộc tính có sẵn
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Email..."
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                disabled
              />
            </div>
            <div className="input-container">
              <label htmlFor="">PassWord</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Password..."
                value={this.state.password}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
                disabled
              />
            </div>
            <div className="input-container">
              <label htmlFor="">FirstName</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="FirstName..."
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>
            <div className="input-container">
              <label htmlFor="">LastName</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="LastName..."
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            <div className="input-container max-width-input">
              <label htmlFor="">address</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="address..."
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
