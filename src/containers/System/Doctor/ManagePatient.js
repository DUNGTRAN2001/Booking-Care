import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { postSendRedemy } from "../../../services/userService";
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentDate : moment(new Date()).startOf('day').valueOf(),
        dataPatient : [],
        isOpenRemdyModal : false,
        dataModal : {},
        isShowLoading : false
    };
  }
  async componentDidMount() {
    this.getDataPatient()
  }
  
  componentDidUpdate(prevProps, prevState, snpashot) {
    
  }
  getDataPatient = async()=>{
    let {user} = this.props
    let {currentDate} = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId : user?.id,
      date : formatedDate
    })
    if(res?.errCode === 0){
      this.setState({
        dataPatient : res?.data
      })
    }
  }
  hadnleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    },async()=>{
      await this.getDataPatient()
    });
  };
  handleConfirm = (item)=>{
    let data = {
      doctorId : item?.doctorId,
      patientId : item?.patientId,
      email : item?.patientData?.email,
      timeType : item?.timeType,
      patientName : item?.patientData?.firstName
    }
    this.setState({
      isOpenRemdyModal : true,
      dataModal : data
    })
  }
  toggle = ()=> {
    this.setState({
      isOpenRemdyModal: !this.state.isOpenRemdyModal
    });
  }
  sendRedemy = async (data)=>{
    let {dataModal} = this.state
    this.setState({
      isShowLoading : true
    })
    let res = await postSendRedemy({
      email : data.email,
      imageBase64 : data.imageBase64,
      doctorId : dataModal?.doctorId ,
      patientId : dataModal?.patientId,
      timeType : dataModal?.timeType,
      language : this.props.language,
      patientName : dataModal?.patientName
    })
    if(res?.errCode === 0){
      toast.success('Send redemy success')
      this.setState({
        isOpenRemdyModal : false,
        isShowLoading : false
      })
      await this.getDataPatient()
    }else{
      this.setState({
        isOpenRemdyModal : false,
        isShowLoading : false
      })
      toast.error('Something error...')
    }
  }
  render() {
    let {dataPatient} = this.state
    let {language} = this.props
    return (
      <>
         <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text='Loading ...'
      >
          <div className="manage-patient-container">
          <div className="m-p-title">
              Quản lý bệnh nhân khám bệnh
          </div>
          <div className="manage-patient-body row">
              <div className="col-4 form-group">
                  <label>Chọn ngày khám </label>
                  <DatePicker
                  value={this.state.currentDate}
                  onChange={this.hadnleOnChangeDatePicker}
                  className="form-control"
                  selected={this.state.currentDate}
                />
              </div>
              <div className="col-12">
                  <table style={{width : '100%'}} className="table-manage-patient">
                      <tr>
                          <th>STT</th>
                          <th>Họ và tên</th>
                          <th>Email</th>
                          <th>Thời gian khám</th>
                          <th>Địa chỉ</th>
                          <th>Giới tính</th>
                          <th>Số điện thoại</th>
                          <th>Hành động</th>
                      </tr>
                      {
                        dataPatient.length > 0 ? 
                        dataPatient?.map((item,index)=>{
                        return(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item?.patientData?.firstName}</td>
                            <td>{item?.patientData?.email}</td>
                            <td>{language === LANGUAGES.VI ?  item?.timeTypeDataPatient?.valueVi : item?.timeTypeDataPatient?.valueEn}</td>
                            <td>{item?.patientData?.address}</td>
                            <td>{language === LANGUAGES.VI ? item?.patientData?.genderData?.valueVi : item?.patientData?.genderData?.valueEn}</td>
                            <td>{item?.patientData?.phonenumber}</td>
                            <td>
                              <button className="mp-btn-confirm" onClick={()=>this.handleConfirm(item)}>Xác nhận</button>
                            </td>
                        </tr>
                        )
                        }):
                        <tr>
                          <td colSpan={8} style={{textAlign : 'center'}}>no data</td>
                      </tr>
                      }
                  </table>
              </div>
          </div>
        </div>
        <RemedyModal 
          isOpenRemdyModal = {this.state.isOpenRemdyModal}
          dataModal ={this.state.dataModal}
          toggle={this.toggle}
          sendRedemy={this.sendRedemy}
        />
    </LoadingOverlay>
      </>
     
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
