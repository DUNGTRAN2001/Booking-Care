import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Handbook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section">Tất cả bài viết</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook-bg"></div>
                <div className="title-image">Cẩm nang 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook-bg"></div>
                <div className="title-image">Cẩm nang 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook-bg"></div>
                <div className="title-image">Cẩm nangp 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook-bg"></div>
                <div className="title-image">Cẩm nang 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook-bg"></div>
                <div className="title-image">Cẩm nang 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook-bg"></div>
                <div className="title-image">Cẩm nang 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
