import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import {getDotorInforDotorById} from "../../../services/userService"
import { LANGUAGES } from "../../../utils";
import NumberFormat from 'react-number-format';
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

  render() {
    const {dataProfile} = this.state;
    const {language} = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    console.log('xxxdatapro',dataProfile);
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
                    {dataProfile.Markdown && dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
            </div>
          </div>
          
        </div>
        <div className="price">
        Giá khám: &nbsp;
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
