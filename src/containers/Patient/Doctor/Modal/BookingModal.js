import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import {  Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker"
import * as actions from "../../../../store/actions"
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import {postPatientBookAppointment} from "../../../../services/userService"
import { toast } from "react-toastify";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName : "",
      phoneNumber : "",
      email : "",
      address : "",
      reason : "",
      birthday : "",
      genders : [],
      doctorId : "",
      selectedGender : "",
      timeType : ""
    };
  }
  componentDidMount() {
    this.setState({
      doctorId : +this.props?.doctorId
    })
    this.props.getGenders()
  }
  buildDataGender = (data)=>{
    let result = [];
    let language = this.props.language;
    if(data?.length > 0){
      data?.map(item=>{
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object)
      })
    }
    return result
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if(prevProps.language !== this.props.language){
      this.setState({
        genders : this.buildDataGender(this.props.genders)
      })
    }
    if(prevProps.genders !== this.props.genders){
      this.setState({
        genders : this.buildDataGender(this.props.genders)
      })
    }
    if(prevProps.dataShceduleTimeModal !== this.props?.dataShceduleTimeModal){
      if(this.props?.dataShceduleTimeModal && !_.isEmpty(this.props?.dataShceduleTimeModal)){
        this.setState({
          timeType : this.props?.dataShceduleTimeModal?.timeType
        })
      }
    }
  }
  toggle = () => {
    this.props.closeBookingModal();
  };
  handleOnchangeInput = (event,id)=>{
    let copyState = {...this.state};
    copyState[id] = event.target.value;
    this.setState({
      ...copyState
    })
  }
  hadnleOnChangeDatePicker = (date)=>{
    this.setState({
      birthday: date[0],
    });
  }
  handleChangeSelect = (selectedOption)=>{
    this.setState({ selectedGender: selectedOption });
  }
  hadleConfirmBooking = async ()=>{
    // console.log('xxx',this.state);
    // validateInput
    let date = new Date(this.state?.birthday).getTime()
    let res = await postPatientBookAppointment({
      fullName : this.state?.fullName,
      phoneNumber : this.state?.phoneNumber,
      email : this.state?.email,
      address : this.state?.address,
      reason : this.state?.reason,
      date : date,
      doctorId : this.state?.doctorId,
      timeType : this.state?.timeType,
      selectedGender : this.state?.selectedGender?.value
    })
    if(res?.errCode === 0){
      toast.success("Booking a new appointment succeed!");
      this.props?.closeBookingModal()
    }else{
      toast.error("Booking a new appointment error!");
      this.props?.closeBookingModal()
    }
  }
  render() {
    let {fullName,phoneNumber,email,address,reason,birthday,genders} = this.state;
    let {isOpenModalBooking,closeBookingModal,dataShceduleTimeModal,doctorId} = this.props;
    return (
          <Modal
        //isOpen thuộc tính có sẵn
        isOpen={isOpenModalBooking}
        toggle={() => this.toggle()}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
            <div className="booking-modal-header">
                <span className="left">
                   <FormattedMessage id="patient.booking-modal.title"/>
                </span>
                <span className="right" onClick={closeBookingModal}>
                    <i className="fas fa-times"/>
                </span>
            </div>
            <div className="booking-modal-body">
                <div className="doctor-infor">
                  <ProfileDoctor 
                    doctorId={this?.props?.doctorId}
                    isShowDescriptionDoctor={false}
                    dataTime={dataShceduleTimeModal}
                  />
                </div>
                <div className="row">
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="patient.booking-modal.full-name"/></label>
                        <input className="form-control" value={fullName} onChange={(event)=>this.handleOnchangeInput(event, 'fullName')}/>
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="patient.booking-modal.phone-number"/></label>
                        <input className="form-control" value={phoneNumber} onChange={(event)=>this.handleOnchangeInput(event, 'phoneNumber')}/>
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="patient.booking-modal.email-address"/></label>
                        <input className="form-control" value={email} onChange={(event)=>this.handleOnchangeInput(event, 'email')}/>
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="patient.booking-modal.contact-address"/></label>
                        <input className="form-control" value={address} onChange={(event)=>this.handleOnchangeInput(event, 'address')}/>
                    </div>
                    <div className="col-12 form-group">
                        <label><FormattedMessage id="patient.booking-modal.medical-examination-reason"/></label>
                        <input className="form-control"  value={reason} onChange={(event)=>this.handleOnchangeInput(event, 'reason')}/>
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="patient.booking-modal.birthday"/></label>
                         <DatePicker
                          onChange={this.hadnleOnChangeDatePicker}
                          className="form-control"
                          selected={birthday}
                         />
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="patient.booking-modal.gender"/></label>
                        <Select
                          value ={this.state.selectedGender}
                          onChange ={this.handleChangeSelect}
                          placeholder={<FormattedMessage id="patient.booking-modal.choose-gender"/>}
                          options={genders}
                        />
                    </div>
                </div>
            </div>
            <div className="booking-modal-footer">
                <button className="btn-booking-cancel" onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.close"/></button>
                <button className="btn-booking-confirm" onClick={this.hadleConfirmBooking}><FormattedMessage id="patient.booking-modal.confirm"/></button>
            </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders : state.admin.genders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders : ()=> dispatch(actions.fetchGenderStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
