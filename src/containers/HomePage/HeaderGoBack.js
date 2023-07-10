import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import "./HeaderGoBack.scss"
class HeaderGoBack extends Component {
    handleGoHome = ()=>{
        if (this?.props?.history) {
            this.props.history.push(`/home`);
        }
    }
    handleGoBack = ()=>{
      if (this.props.history) {
        this.props.history.goBack();
      }
    }
  render() {
    let {section} = this.props
    return (
      <div className="header-go-back">
        <div onClick={this.handleGoBack}>
            <i class="fa fa-arrow-left icon" aria-hidden="true"></i>
        </div>
        <div className="home-conent" onClick={this.handleGoHome}>
            <i class="fa fa-home" aria-hidden="true"></i>
           <span> <FormattedMessage id="home-header.home" /></span>
        </div>
        <span style={{
            color : '#fff',
            fontSize : '18px'
        }}>/</span>
        <div className="section-content">
           <span>{section}</span>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HeaderGoBack)
  );
