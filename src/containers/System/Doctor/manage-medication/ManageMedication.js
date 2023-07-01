import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageMedication.scss";
import { CRUD_ACTIONS } from "../../../../utils";
import TableManageMedication from "./TableManageMedication";
import { createNewMedication, editMedicationService } from "../../../../services/userService";
import { toast } from "react-toastify";
import * as actions from "../../../../store/actions";

class ManageMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : "",
        description : "",
        medicationId : "",
        action : CRUD_ACTIONS.CREATE
    };
  }
  componentDidMount() {

  }
 
  componentDidUpdate(prevProps, prevState, snpashot) {
   
  }
  handleOnChangeInput = (event,id)=>{
    let copyState = {...this.state}
    copyState[id] = event.target.value;
    this.setState({
        ...copyState
    })
  }
  handleSaveNewSpecialty =async ()=>{
    if(this.state.action === CRUD_ACTIONS.CREATE){
      let res = await createNewMedication(this.state)
      if(res?.errCode === 0){
          toast.success('Add new medication succeeds!')
          this.setState({
            name : '',
            description : '',   
            action: CRUD_ACTIONS.CREATE,
          })
          this.props.fetchAllMedication()
      }else{
          toast.error('Something wrongs....')
      }
    }else{
      const dataSubmit = {
        id : this.state.medicationId,
        name : this.state.name,
        description : this.state.description,   
        action: CRUD_ACTIONS.CREATE,
      }
      let res = await editMedicationService(dataSubmit)
      if(res.errCode === 0){
        toast.success('Edit medication is successed!')
        this.setState({
          name : '',
          description : '',   
          action: CRUD_ACTIONS.CREATE,
        })
        this.props.fetchAllMedication()
      }else{
        toast.error('Something wrongs....')
      }
    }
  }
  handleEditMedicationFromParentKey = (item)=>{
    this.setState({
      medicationId : item?.id,
      name : item?.name,
      description : item?.description,
      action: CRUD_ACTIONS.EDIT,
    });
  }
  render() {
    return (
      <div className="manage-medication-container">
        <div className="m-c-tiltle">
          <FormattedMessage id="manage-medication.title" />
        </div>
        <div className="manage-medication-content">
            <div className="row">
                <div className="col-6 form-group">
                    <label>Tên loại thuốc</label>
                    <input className="form-control" type="text" value={this.state.name} 
                    onChange={(event)=>this.handleOnChangeInput(event,'name')}>
                    </input>             
                </div>
                <div className="col-6 form-group">
                    <label>Mô tả thuốc</label>
                    <input className="form-control" type="text" value={this.state.description} 
                    onChange={(event)=>this.handleOnChangeInput(event,'description')}>
                    </input>   
                </div>
                <div className="col-12">
                    <button
                        className={
                            this.state.action === CRUD_ACTIONS.EDIT
                            ? "btn btn-warning"
                            : "btn btn-primary"
                        }
                        style={{margin : '10px 0'}}
                        onClick={() => this.handleSaveNewSpecialty()}
                        >
                        {this.state.action === CRUD_ACTIONS.EDIT ? (
                            'Sửa thông tin'
                        ) : (
                            'Lưu thông tin'
                        )}
                        </button>
                </div>
                <div className="mt-3 col-12">
                    <TableManageMedication 
                    handleEditMedicationFromParentKey={this.handleEditMedicationFromParentKey}
                    />
                </div>
        </div>
                
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctors: state.admin.allDoctors,
    listDataTime: state.admin.time,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMedication: () => dispatch(actions.fetchAllMedication()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMedication);
