import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
// để hiểu là tiếng việt
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime : [],
      isOpenModalBooking : false,
      dataShceduleTimeModal : {}
    };
  }
  async componentDidMount() {
    let { language } = this?.props;
    let allDays = this.getArrDays(language);
    this.setState({
      allDays : allDays
    })
    let doctorId = this.props.doctorId;
    if(allDays?.length > 0){
      let res = await getScheduleDoctorByDate(doctorId, allDays[0]?.value);
      this.setState({
        allAvailableTime : res?.data
      })
    }
   
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    let { language } = this.props;
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(language);
      this.setState({
        allDays : allDays
      })
    }
  }
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if(i === 0){
          let ddMM = moment(new Date()).format("DD/MM");
          let toDay = `Hôm nay - ${ddMM}`
          object.label = toDay
        }
        else{
          let lableVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(lableVi)
        }
      } else {
        if(i === 0){
          let ddMM = moment(new Date()).format("DD/MM");
          let toDay = `Today - ${ddMM}`
          object.label = toDay
        }else{
          object.label = moment(new Date()).add(i, "days").locale(LANGUAGES.EN).format("ddd - DD/MM");
        }
        //  startOf: đầu ngày
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  
  handleOnChangeSelect = async (event) => {
    let date = event.target.value;
    let doctorId = this.props.doctorId;
    let res = await getScheduleDoctorByDate(doctorId, date);
    if(res?.errCode === 0){
         this.setState({
          allAvailableTime : res?.data ? res?.data : []
         })
    }
  };
  handleClickSheduleTime = (time)=>{
    this.setState({
      isOpenModalBooking : true,
      dataShceduleTimeModal : time
    })
  }
  closeBookingModal = ()=>{
    this.setState({
      isOpenModalBooking : false
    })
  }
  render() {
    let { allDays,allAvailableTime,isOpenModalBooking } = this.state;
    let {language} = this.props;
    
    return (
      <>
        <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-availale-time">
          <div className="text-calendar">
          <i className="fas fa-calendar-alt"></i>
            <span><FormattedMessage id="patient.detail-doctor.schedule"/></span>
          </div>
          <div className="time-content">
          {
            allAvailableTime?.length > 0  ?
            <>
              
                <div className="time-content-btns">
                  {
                      allAvailableTime?.map((item,index)=>{
                      let timeDisplay = language === LANGUAGES.VI ? item?.timeTypeData?.valueVi : item?.timeTypeData?.valueEn
                      return (
                        <button key={index} className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'} onClick={()=>this.handleClickSheduleTime(item)}>
                          {timeDisplay}
                        </button>
                      )
                    })
                  }
                </div>
              <div className="book-free">
                <span><FormattedMessage id="patient.detail-doctor.choose"/> <i className="far fa-hand-point-up"></i> <FormattedMessage id="patient.detail-doctor.book-free"/></span>
              </div>
            </>
            
          :
            <div className="no-schedule">
            <FormattedMessage id="patient.detail-doctor.no-schedule"/>
            </div>
          }
            </div>
        </div>
        </div>
        <BookingModal isOpenModalBooking={isOpenModalBooking} closeBookingModal={this.closeBookingModal}
          dataShceduleTimeModal={this.state.dataShceduleTimeModal} 
          doctorId={this?.props?.doctorId}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app?.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
