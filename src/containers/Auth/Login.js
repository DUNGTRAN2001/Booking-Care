import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
// dùng cho redux
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { userLoginSucces } from "../../store/actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassWord = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    // trước mỗi lần login thì clear mã lỗi đi
    this.setState({
      errMessage: "",
    });
    try {
      // gọi được thành công nhưng bị lỗi khác
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        // todo
        this.props.userLoginSucces(data.user);
        console.log("login success");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassWord = () => {
    this.setState({
      isShowPassWord: !this.state.isShowPassWord,
    });
  };
  hadleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    //   JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUserName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassWord ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassWord(event)}
                  onKeyDown={(event) => this.hadleKeyDown(event)}
                />
                <span onClick={() => this.handleShowHidePassWord()}>
                  <i
                    className={
                      this.state.isShowPassWord
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with :</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // UserLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSucces: (userInfo) => dispatch(actions.userLoginSucces(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
