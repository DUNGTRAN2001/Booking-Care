import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-Falcility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-medical-Falcility-bg"></div>
                <div className="title-image">Bệnh viên đa khoa An Việt 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-Falcility-bg"></div>
                <div className="title-image">Bệnh viên đa khoa An Việt 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-Falcility-bg"></div>
                <div className="title-image">Bệnh viên đa khoa An Việt 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-Falcility-bg"></div>
                <div className="title-image">Bệnh viên đa khoa An Việt 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-Falcility-bg"></div>
                <div className="title-image">Bệnh viên đa khoa An Việt 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-Falcility-bg"></div>
                <div className="title-image">Bệnh viên đa khoa An Việt 6</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
