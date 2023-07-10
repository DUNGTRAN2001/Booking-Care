import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderGoBack from "../HomePage/HeaderGoBack";
import { LANGUAGES } from "../../utils/constant";
import "./SeeMore.scss"
import { getAllSpecialty } from "../../services/userService";
class SeeMoreSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataAllSpecialty : []
    };
  }
    async componentDidMount() {
    let res = await getAllSpecialty('100');
    if(res?.errCode === 0){
      this.setState({
        dataAllSpecialty : res?.data ?? []
      })
    }
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
  }
  handelViewDetailSpecialty = (item)=>{
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`, {
        name: item?.name,
      });
    }
  }
  render() {
    let {dataAllSpecialty} = this.state
    console.log('xxxxdataAllSpecialty',dataAllSpecialty);
    let {language} = this.props
    return (
     <>
         {/* <HomeHeader isShowBanner={false} /> */}
         <HeaderGoBack section={'Tất cả chuyên khoa'}/>
         <div className="seemore-cotainer">
         {dataAllSpecialty &&
            dataAllSpecialty.length > 0 &&
            dataAllSpecialty.map((item, index) => {
                  return (
                    <div
                      className="seemore-content-doctor"
                      key={index}
                      onClick={() => this.handelViewDetailSpecialty(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SeeMoreSpecialty);
