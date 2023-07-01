import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageSpecialty.scss";
import { deleteSpecialty } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";

class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataAllSpecialty: [],
    };
  }
  async componentDidMount(){
   this.props.fetchAllSpecialty()
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      this.setState({
        dataAllSpecialty: this.props.listSpecialty,
      });
    }
  }
  handleDeleteSpecialty = async (item) => {
    let res = await deleteSpecialty(item.id)
    if(res.errCode === 0){
        toast.success('Delete specialty success')
        this.props.fetchAllSpecialty()
    }else{
        toast.error('Delete specialty failed')
    }
  };
  handleEditSpecialty = (user) => {
    this.props.handleEditSpecialtyFromParentKey(user);
  };
  render() {
    let {dataAllSpecialty} = this.state;
    return (
      <>
        <table id="tableManageUser">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Tên chuyên khoa</th>
              <th>Ảnh chuyên khoa</th>
              <th>Hành động</th>
            </tr>
            {
                dataAllSpecialty?.length > 0 &&
                dataAllSpecialty?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td >{index +1}</td>
                    <td>{item?.name}</td>
                    <td>
                        <img src={item?.image} height='50px' width='50px' ></img>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditSpecialty(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteSpecialty(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listSpecialty : state.admin.listSpecialty
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
