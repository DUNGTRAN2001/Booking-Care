import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import {getDotorInforDotorById} from "../../../services/userService"
import { LANGUAGES } from "../../../utils";
import NumberFormat from 'react-number-format';
import _ from "lodash";
import moment from "moment";
import { FormattedMessage } from "react-intl";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataProfile : {}
    };
  }
  async componentDidMount() {
    let id = this.props.doctorId;
    let data =await this.getInforDoctor(id)
    this.setState({
      dataProfile : data
    })
  }
  getInforDoctor = async (id)=>{
    let result = {};
    if(id){
      let res = await getDotorInforDotorById(id)
      if(res?.errCode === 0){
        result = res?.data
      }
    }
    return result
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
  }
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  renderTimeBooking = (data)=>{
    let {language} = this.props;
    if(data && !_.isEmpty(data)){
      let time = language === LANGUAGES.VI 
                ? data?.timeTypeData.valueVi : data?.timeTypeData?.valueEn
      let date = language === LANGUAGES.VI 
                 ? this.capitalizeFirstLetter(moment.unix(+data.date / 1000).format('dddd - DD/MM/YYYY'))
                 : this.capitalizeFirstLetter(moment.unix(+data.date / 1000).locale('en').format('ddd - MM/DD/YYYY'))           
    return(
      <>
        <div>{time} - {date}</div>
        <div><FormattedMessage id="patient.booking-modal.free-booking"/></div>
      </> 
    )
  }
    return <></>
  }
  render() {
    const {dataProfile} = this.state;
    const {language,isShowDescriptionDoctor,dataTime} = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile?.image ? dataProfile?.image : ""
              }) `,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
            {isShowDescriptionDoctor === true ? 
              <>
                {dataProfile.Markdown && dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
              </>
              :
              <>
                {this.renderTimeBooking(dataTime)}
              </>
            }
            </div>
          </div>
          
        </div>
        <div className="price">
        <FormattedMessage id="patient.booking-modal.examination-price"/> :&nbsp;
        {dataProfile?.Doctor_Infor?.priceTypeData && language === LANGUAGES.VI
              ?
            <NumberFormat 
              value={dataProfile?.Doctor_Infor?.priceTypeData?.valueVi} 
              displayType={'text'} 
              thousandSeparator={true} 
              suffix={'VNĐ'} 
              className="currency"
              />
              :
            <NumberFormat 
              value={dataProfile?.Doctor_Infor?.priceTypeData?.valueEn} 
              displayType={'text'} 
              thousandSeparator={true} 
              suffix={'$'}
              className="currency"
              />
            }
          </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
