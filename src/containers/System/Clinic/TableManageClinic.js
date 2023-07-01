import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteClinic, deleteSpecialty } from "../../../services/userService";
import * as actions from "../../../store/actions";
import "./TableManageClinic.scss";

class TableManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataAllClinic: [],
    };
  }
  async componentDidMount(){
   this.props.fetchAllClinic()
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listClinic !== this.props.listClinic) {
      this.setState({
        dataAllClinic: this.props.listClinic,
      });
    }
  }
  handleDeleteClicnic = async (item) => {
    let res = await deleteClinic(item.id)
    if(res.errCode === 0){
        toast.success('Delete clinic success')
        this.props.fetchAllClinic()
    }else{
        toast.error('Delete clinic failed')
    }
  };
  handleEditClinic = (user) => {
    this.props.handleEditClinicFromParentKey(user);
  };
  render() {
    let {dataAllClinic} = this.state;
    return (
      <>
        <table id="tableManageUser">
          <tbody>
            <tr>
              <th style={{textAlign : 'center'}}>Stt</th>
              <th>Tên phòng khám</th>
              <th>Địa chỉ phòng khám</th>
              <th>Ảnh phòng khám</th>
              <th>Hành động</th>
            </tr>
            {
                dataAllClinic.length > 0 &&
                dataAllClinic?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{textAlign : 'center'}}>{index +1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.address}</td>
                    <td>
                        <img src={item?.image} height='50px' width='50px' ></img>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditClinic(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteClicnic(item)}
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
    listClinic : state.admin.listClinic
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
