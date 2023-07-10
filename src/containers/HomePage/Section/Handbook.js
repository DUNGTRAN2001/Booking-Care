import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import { getAllClinic, getAllHandBook } from "../../../services/userService";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAllHanBook: [],
    };
  }
  async componentDidMount(){
    let res = await getAllHandBook('4');
    if(res?.errCode === 0){
      this.setState({
        dataAllHanBook : res?.data ?? []
      })
    }
  }
  handelViewDetailHandBook = (item)=>{
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  }
  handleSeeMoreHanBook = ()=>{
    if (this.props?.history) {
      this.props.history.push(`/all-handbook`);
    }
  }
  render() {
    const {dataAllHanBook} = this.state
    return (
      <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.hand-book"/>
          </span>
          <button className="btn-section" onClick={this.handleSeeMoreHanBook}>
            <FormattedMessage id="homepage.more-infor"/>
          </button>
        </div>
        <div className="section-body">
          <Slider {...this.props.settings}>
          {dataAllHanBook?.map((item,index)=>{
            return(
              <div className="section-customize" key={index} onClick={()=>this.handelViewDetailHandBook(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
