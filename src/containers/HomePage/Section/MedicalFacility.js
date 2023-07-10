import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAllClinic: [],
    };
  }
  async componentDidMount(){
    let res = await getAllClinic('6');
    if(res?.errCode === 0){
      this.setState({
        dataAllClinic : res?.data ?? []
      })
    }
  }
  handelViewDetailClinic = (item)=>{
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  }
  handleSeeMoreSpecialty = ()=>{
    if (this.props?.history) {
      this.props.history.push(`/all-clinic`);
    }
  }
  render() {
    const {dataAllClinic} = this.state
    return (
      <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.outstanding-medical-facility"/>
          </span>
          <button className="btn-section" onClick={this.handleSeeMoreSpecialty}>
            <FormattedMessage id="homepage.more-infor"/>
          </button>
        </div>
        <div className="section-body">
          <Slider {...this.props.settings}>
          {dataAllClinic?.map((item,index)=>{
            return(
              <div className="section-customize" key={index} onClick={()=>this.handelViewDetailClinic(item)}>
                <div className="bg-image section-specialty-bg"
               style={{ backgroundImage: `url(${item?.image})` }}
                ></div>
                <div className="title-image">{item?.name}</div>
              </div>
            )
          })}
          
          </Slider>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
