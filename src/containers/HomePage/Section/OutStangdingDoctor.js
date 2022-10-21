import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutStangdingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-outstangding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstangding-doctor-bg"></div>
                  </div>
                  <div className="position text-center">
                    <div className="title-image">
                      Giáo sư , Tiến sĩ Dũng Trần
                    </div>
                    <div>Cơ xương khớp 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstangding-doctor-bg"></div>
                  </div>
                  <div className="position text-center">
                    <div className="title-image">
                      Giáo sư , Tiến sĩ Dũng Trần
                    </div>
                    <div>Cơ xương khớp 2</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstangding-doctor-bg"></div>
                  </div>
                  <div className="position text-center">
                    <div className="title-image">
                      Giáo sư , Tiến sĩ Dũng Trần
                    </div>
                    <div>Cơ xương khớp 3</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstangding-doctor-bg"></div>
                  </div>
                  <div className="position text-center">
                    <div className="title-image">
                      Giáo sư , Tiến sĩ Dũng Trần
                    </div>
                    <div>Cơ xương khớp 4</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstangding-doctor-bg"></div>
                  </div>
                  <div className="position text-center">
                    <div className="title-image">
                      Giáo sư , Tiến sĩ Dũng Trần
                    </div>
                    <div>Cơ xương khớp 5</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstangding-doctor-bg"></div>
                  </div>
                  <div className="position text-center">
                    <div className="title-image">
                      Giáo sư , Tiến sĩ Dũng Trần
                    </div>
                    <div>Cơ xương khớp 6</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStangdingDoctor);
