import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
// để hiểu là tiếng việt
import { FormattedMessage } from "react-intl";
import { getExtraInforDotorById } from "../../../services/userService";
import NumberFormat from 'react-number-format';
import { LANGUAGES } from "../../../utils/constant";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo : false,
      extraInfor : {}
    };
  }
  async componentDidMount() {
    let doctorId = this.props.doctorId;
    let res = await getExtraInforDotorById(doctorId);
    if(res?.data && res?.errCode === 0){
      this.setState({
        extraInfor : res?.data
      })
    }
  }
  async componentDidUpdate(prevProps, prevState, snpashot) {
    if(prevProps.doctorId !== this.props.doctorId){
      let doctorId = this.props.doctorId;
      let res = await getExtraInforDotorById(doctorId);
      if(res?.data && res?.errCode === 0){
        this.setState({
          extraInfor : res?.data
        })
      }
    }
  }
  showHideDetailInfoDoctor = (status)=>{
    this.setState({
      isShowDetailInfo : !status
    })
  }
  render() {
   let {isShowDetailInfo,extraInfor} = this.state;
   let {language} = this.props;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-infor-doctor.text-address"/>
            </div>
            <div className="name-clinic">
              {extraInfor?.nameClinic ? extraInfor?.nameClinic : ""}
            </div>
            <div className="detail-address">
            {extraInfor?.addressClinic ? extraInfor?.addressClinic : ""}
            </div>
        </div>
        <div className="content-down">
   
        {
          isShowDetailInfo === false ? <div className="short-infor">
          <FormattedMessage id="patient.extra-infor-doctor.price-uppercase"/> : {extraInfor?.priceTypeData && language === LANGUAGES.VI
              ?
            <NumberFormat 
              value={extraInfor?.priceTypeData?.valueVi} 
              displayType={'text'} 
              thousandSeparator={true} 
              suffix={'VNĐ'} 
              className="currency"
              />
              :
            <NumberFormat 
              value={extraInfor?.priceTypeData?.valueEn} 
              displayType={'text'} 
              thousandSeparator={true} 
              suffix={'$'}
              className="currency"
              />
            }
            
            <span onClick={()=> this.showHideDetailInfoDoctor(isShowDetailInfo)}>
              <FormattedMessage id="patient.extra-infor-doctor.detail"/>
            </span>
          </div>
          :
          <>
            <div className="title-price"><FormattedMessage id="patient.extra-infor-doctor.price"/>:</div>
            <div className="detail-infor">
              <div className="price">
                <span className="left"><FormattedMessage id="patient.extra-infor-doctor.price"/></span>
                <span className="right">
                {
                extraInfor?.priceTypeData && language === LANGUAGES.VI
                ?
                <NumberFormat 
                  value={extraInfor?.priceTypeData?.valueVi} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  suffix={'VNĐ'} 
                  className="currency"
                  />
                  :
                <NumberFormat 
                  value={extraInfor?.priceTypeData?.valueEn} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  suffix={'$'}
                  className="currency"
                  />
                }
            </span>
              </div>
              <div className="note">
                {extraInfor?.note ? extraInfor?.note : ""}
              </div>
            </div>
            <div className="payment"><FormattedMessage id="patient.extra-infor-doctor.payment-method"/>:&nbsp;
            {extraInfor?.paymentTypeData && language === LANGUAGES.VI ? 
            extraInfor?.paymentTypeData?.valueVi : 
            extraInfor?.paymentTypeData?.valueEn}
            </div>
            <div className="hide-price">
               <span onClick={()=> this.showHideDetailInfoDoctor(isShowDetailInfo)}>
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price"/> 
               </span> 
            </div>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
