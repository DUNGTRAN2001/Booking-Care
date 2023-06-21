import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAllSpecialty: [],
    };
  }
  async componentDidMount(){
    let res = await getAllSpecialty();
    if(res?.errCode === 0){
      this.setState({
        dataAllSpecialty : res?.data ?? []
      })
    }
  }
  handelViewDetailSpecialty = (item)=>{
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  }
  render() {
    const {dataAllSpecialty} = this.state
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.specialty-popular"/>
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor"/>
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
            {dataAllSpecialty?.map((item,index)=>{
              return(
                <div className="section-customize" key={index} onClick={()=>this.handelViewDetailSpecialty(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
