import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getDetailClinicById } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailClinic.scss";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId : [],
      dataDetailClinic : {},
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
      let res = await getDetailClinicById({id : id})
      if(res?.errCode === 0){
        let data = res?.data
        let arrDoctorId = [];
        if(data && !_.isEmpty(data)){
          let arr = data.doctorClinic;
          if(arr?.length > 0){
            arr.map(item => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }
        this.setState({
          dataDetailClinic : res?.data,
          arrDoctorId : arrDoctorId,
        })
      }
    }
   
  }
 
  componentDidUpdate(prevProps, prevState, snpashot) {
    const descriptionElement = document.getElementById('description');
    if(prevState.dataDetailClinic !== this.state.dataDetailClinic){
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
 
  render() {
   let {arrDoctorId,dataDetailClinic,showReadMore,showReadLess,isExpanded} = this.state
    return (
      <div className="detail-specialty-container">
        <HomeHeader isShowBanner={false} />
        <div className="detail-specialty-body">
        <div className="description-specialty">
          {!_.isEmpty(dataDetailClinic) && (
            <>
            <div>{dataDetailClinic?.name}</div>
              <div
                id="description"
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic?.descriptionHTML
                }}
                style={{ maxHeight: isExpanded ? 'none' : 200, overflow: 'hidden' }}
              ></div>
            </>
          )}

          {showReadMore && !isExpanded && (
            <button onClick={this.handleReadMoreClick} style={{marginTop : '10px'}}>
              <FormattedMessage id="homepage.more-infor"/>
            </button>
          )}

          {showReadLess && (
            <button onClick={this.handleReadLessClick} style={{marginTop : '10px'}}>
              <FormattedMessage id="homepage.hide"/>
            </button>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
