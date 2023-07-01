import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import './VerifyEmail.scss'

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        statusVerify : false,
        errCode : 0,
    };
  }
  async componentDidMount() {
    if(this?.props?.location?.search){
        let urlParams = new URLSearchParams(this.props.location?.search)
        let token = urlParams.get('token')
        let doctorId = urlParams.get('doctorId')
        let scheduleId= urlParams.get('scheduleId')
        let res = await postVerifyBookAppointment({
            token : token,
            doctorId : doctorId,
            scheduleId : scheduleId
        })
        if(res?.errCode == 0){
            this.setState({
                statusVerify : true,
                errCode : res.errCode
            })
        }else{
            this.setState({
                statusVerify : true,
                errCode : res?.errCode || -1
            })
        }
    }
 
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    
  }
  render() {
    let {statusVerify,errCode} = this.state;
     console.log('xxxerr',errCode);
    return (
     <>
         <HomeHeader isShowBanner={false} />
       <div className="verify-email-container">
            {errCode == 0 ? 
            <div className="infor-booking">Xác nhận lịch hẹn thành công</div>
            :
            errCode == 3  ? 
            <div className="infor-booking">Khung giờ khám bệnh đã đầy , vui lòng chọn khung giờ khác</div>
            :
            <div className="infor-booking">Lịch hẹn đã được xác nhận hoặc không tồn tại</div>
            }
         </div>
     </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
