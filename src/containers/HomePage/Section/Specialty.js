import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Specialty extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-content">
          <Slider {...settings}>
            <div className="img">
              <h3>1</h3>
            </div>
            <div className="img-customzie">
              <h3>2</h3>
            </div>
            <div className="img-customzie">
              <h3>3</h3>
            </div>
            <div className="img-customzie">
              <h3>4</h3>
            </div>
            <div className="img-customzie">
              <h3>5</h3>
            </div>
            <div className="img-customzie">
              <h3>6</h3>
            </div>
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
