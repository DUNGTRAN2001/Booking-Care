import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    // try {
    //   let res = await getAllCodeService("GENDER");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   console.log("chcck res", res);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //render => didupdate
    //hiện tại(this.props) và quá khứ(previous)
    //[] [3]
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
  }
  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    console.log("check props form redux", genders);
    return (
      <div className="user-redux-container">
        <div className="title">User Redux with Dũng Trần </div>
        <div className="user-redux-body">
          {/* của bootstrap */}
          <div className="container">
            <div className="row">
              <div className="form group col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input type="email" className="form-control" />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input type="password" className="form-control" />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-9">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select className="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select className="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.role-id" />
                </label>
                <select className="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-12 mt-3">
                <button className="btn btn-primary">
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
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
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
