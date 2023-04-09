import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
// để hiểu là tiếng việt
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo : true
    };
  }
  async componentDidMount() {
   
   
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
   
  }
  showHideDetailInfoDoctor = (status)=>{
    this.setState({
      isShowDetailInfo : !status
    })
  }
  render() {
   let {isShowDetailInfo} = this.state
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
            <div className="text-address">
              ĐỊA CHỈ KHÁM
            </div>
            <div className="name-clinic">
              Phòng khám chuyên khoa da liễu
            </div>
            <div className="detail-address">
              207 Phố Huế - Hai Bà Trưng - Hà Nội
            </div>
        </div>
        <div className="content-down">
        {
          isShowDetailInfo === false ? <div className="short-infor">
            GÍA KHÁM : 250.000đ. 
            <span onClick={()=> this.showHideDetailInfoDoctor(isShowDetailInfo)}>Xem chi tiết</span>
          </div>
          :
          <>
            <div className="title-price">Giá khám:</div>
            <div className="detail-infor">
              <div className="price">
                <span className="left">Giá khám</span>
                <span className="right">250.000đ</span>
              </div>
              <div className="note">
                Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD
              </div>
            </div>
            <div className="payment">Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
            <div className="hide-price">
               <span onClick={()=> this.showHideDetailInfoDoctor(isShowDetailInfo)}>Ẩn bảng giá</span> 
            </div>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
