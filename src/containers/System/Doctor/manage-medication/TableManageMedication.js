import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { deleteMedication } from "../../../../services/userService";
import { toast } from "react-toastify";

class TableManageMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataAllMedication: [],
    };
  }
  async componentDidMount(){
   this.props.fetchAllMedication()
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listMedication !== this.props.listMedication) {
      this.setState({
        dataAllMedication: this.props.listMedication,
      });
    }
  }
  handleDeleteMedication = async (item) => {
    let res = await deleteMedication(item.id)
    if(res.errCode === 0){
        toast.success('Delete medication success')
        this.props.fetchAllMedication()
    }else{
        toast.error('Delete medication failed')
    }
  };
  handleEditMedication = (user) => {
    this.props.handleEditMedicationFromParentKey(user);
  };
  render() {
   
    let {dataAllMedication} = this.state;
    return (
      <>
        <table id="tableManageUser">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Tên loại thuốc</th>
              <th>Mô tả thuốc</th>
              <th>Hành động</th>
            </tr>
            {
                dataAllMedication?.length > 0 &&
                dataAllMedication?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td >{index +1}</td>
                    <td>{item?.name}</td>
                    <td style={{maxWidth : '300px'}}>{item?.description}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditMedication(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteMedication(item)}
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
    listMedication : state.admin.listMedication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMedication: () => dispatch(actions.fetchAllMedication()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageMedication);
