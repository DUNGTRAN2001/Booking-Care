import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUser } from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      // Mặc định không mởi open modal User , thêm mới mới mở ra
      isOpenModal: false,
    };
  }
  /**
   * Life cycle : vòng đời của react
   * Run component : 1 : run constructor -> init state
   * 2 : Didmount : muốn gán giá trị cho biến state thì dùng hàm didmount
   * 3 : render (re-render)
   */
  async componentDidMount() {
    let response = await getAllUser("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUser: response.users,
        }
        // () => {
        //   console.log(this.state.arrUser);
        // }
      );
    }
    // console.log("data get all user", response);
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  // từ thằng cha truyền sang thằng con
  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  render() {
    // console.log("check render", this.state);
    let { arrUser } = this.state;
    // propperties
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="title text-center">Manage User With Dũng Trần</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add New User
          </button>
        </div>
        <div className="user-table mt-4 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {arrUser &&
              arrUser.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
