import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClinic } from "../../services/userService";
import HeaderGoBack from "../HomePage/HeaderGoBack";
import "./SeeMore.scss";
class SeeMoreClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataAllClinic : []
    };
  }
    async componentDidMount() {
        let res = await getAllClinic('100');
        if(res?.errCode === 0){
          this.setState({
            dataAllClinic : res?.data ?? []
          })
        }
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
  }
  handelViewDetailClinic = (item)=>{
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  }
  render() {
    let {dataAllClinic} = this.state
    return (
     <>
         {/* <HomeHeader isShowBanner={false} /> */}
         <HeaderGoBack section={'Tất cả phòng khám'}/>
         <div className="seemore-cotainer">
         {dataAllClinic &&
            dataAllClinic.length > 0 &&
            dataAllClinic.map((item, index) => {
                  return (
                    <div
                      className="seemore-content-doctor"
                      key={index}
                      onClick={() => this.handelViewDetailClinic(item)}
                    >
                         <div
                            className="backgroud-image-doctor"
                            style={{ backgroundImage: `url(${item?.image})` }}
                          ></div>

                        <div className="title-image-doctor">                 
                            {item?.name}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeMoreClinic);
