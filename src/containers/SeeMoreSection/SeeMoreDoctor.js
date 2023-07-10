import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import * as actions from "../../store/actions";
import HeaderGoBack from "../HomePage/HeaderGoBack";
import { LANGUAGES } from "../../utils/constant";
import "./SeeMore.scss"
class SeeMoreDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        arrDoctors : []
    };
  }
  componentDidMount() {
    this.props.loadTopDoctor('100')
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
        this.setState({
          arrDoctors: this.props.topDoctorsRedux,
        });
      }
  }
  handleViewDetailDoctor = (doctor)=>{
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  }
  render() {
    let {arrDoctors} = this.state
    let {language} = this.props
    return (
     <>
         {/* <HomeHeader isShowBanner={false} /> */}
         <HeaderGoBack section={'Tất cả bác sĩ'}/>
         <div className="seemore-cotainer">
         {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item?.positionData?.valueVi}, ${item?.lastName} ${item?.firstName}`;
                  let nameEn = `${item?.positionData?.valueEn},${item?.firstName} ${item?.lastName}`;
                  return (
                    <div
                      className="seemore-content-doctor"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                         <div
                            className="backgroud-image-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>

                        <div className="title-image-doctor">                 
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                      </div>
                  
                  );
                })}
         </div>
     </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app?.language,
    topDoctorsRedux: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeMoreDoctor);
