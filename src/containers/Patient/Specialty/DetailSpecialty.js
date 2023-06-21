import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailSpecialtyById,getAllCodeService } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId : [],
      dataDetailSpecialty : {},
      lisProvince : [],
      isExpanded: false,
      showReadMore: false,
      showReadLess: false
    };
  }
  async componentDidMount() {
    if (
      this?.props?.match?.params?.id
    ) {
      let id = this.props.match.params.id;
      let data = {
        id : id,
        location : 'ALL'
      }
      let resProvince = await getAllCodeService('PROVINCE')
      let res =await getDetailSpecialtyById(data)
      if(res?.errCode === 0 && resProvince.errCode === 0){
        let data = res?.data
        let arrDoctorId = [];
        if(data && !_.isEmpty(data)){
          let arr = data.doctorSpecialty;
          if(arr?.length > 0){
            arr.map(item => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }
        let dataProvince = resProvince?.data;
        if(dataProvince && dataProvince?.length > 0){
          dataProvince?.unshift({
            createAt : null,
            keyMap : 'ALL',
            type : 'PROVINCE',
            valueEn : 'Nationwide',
            valueVi : 'Toàn quốc'
          })
        }
        this.setState({
          dataDetailSpecialty : res?.data,
          arrDoctorId : arrDoctorId,
          lisProvince : dataProvince ? dataProvince : []
        })
      }
    }
   
  }
 
  componentDidUpdate(prevProps, prevState, snpashot) {
    const descriptionElement = document.getElementById('description');
    if(prevState.dataDetailSpecialty !== this.state.dataDetailSpecialty){
      if (descriptionElement.clientHeight >= 200) {
        this.setState({ showReadMore: true });
      }
    }
  }
  handleReadMoreClick = () => {
    this.setState({ isExpanded: true, showReadLess: true });
  };

  handleReadLessClick = () => {
    this.setState({ isExpanded: false, showReadLess: false });
  }; 
  handleOnChangeSelect = async (event)=>{
    if (
      this?.props?.match?.params?.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value
      let data = {
        id : id,
        location : location
      }
      let res =await getDetailSpecialtyById(data)
      if(res?.errCode === 0 ){
        let data = res?.data
        let arrDoctorId = [];
        if(data && !_.isEmpty(data)){
          let arr = data.doctorSpecialty;
          if(arr?.length > 0){
            arr.map(item => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }
        this.setState({
          dataDetailSpecialty : res?.data,
          arrDoctorId : arrDoctorId,
        })
      }
    }
  }
  render() {
   let {arrDoctorId,dataDetailSpecialty,lisProvince,showReadMore,showReadLess,isExpanded} = this.state
   let {language} = this.props
    return (
      <div className="detail-specialty-container">
        <HomeHeader isShowBanner={false} />
        <div className="detail-specialty-body">
        <div className="description-specialty">
          {!_.isEmpty(dataDetailSpecialty) && (
            <div
              id="description"
              dangerouslySetInnerHTML={{
                __html: dataDetailSpecialty.descriptionHTML
              }}
              style={{ maxHeight: isExpanded ? 'none' : 200, overflow: 'hidden' }}
            ></div>
          )}

          {showReadMore && !isExpanded && (
            <button onClick={this.handleReadMoreClick}>
              <FormattedMessage id="homepage.more-infor"/>
            </button>
          )}

          {showReadLess && (
            <button onClick={this.handleReadLessClick}>
              <FormattedMessage id="homepage.hide"/>
            </button>
          )}
        </div>
          <div className="search-sp-doctor">
              <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                  {lisProvince?.length > 0 &&
                  lisProvince?.map((item,index)=>{
                    return <option key={index} value={item?.keyMap}>
                      {language === LANGUAGES.VI ? item?.valueVi : item?.valueEn}
                    </option>
                  })
                  }
              </select>
          </div>
          {arrDoctorId?.map((item,index)=>{
            return(
            <div className="each-doctor" key={index}>
                <div className="dt-content-left">
                  <div className="profile-doctor">
                    <ProfileDoctor 
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={true}
                        // dataTime={dataShceduleTimeModal}
                      />
                  </div>
                  </div>
                  <div className="dt-content-right">
                        <div className="doctor-schedule">
                          <DoctorSchedule doctorId={item} />
                        </div>
                        <div className="doctor-extra-info">
                          <DoctorExtraInfo doctorId={item} />
                        </div>
                  </div>
            </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
