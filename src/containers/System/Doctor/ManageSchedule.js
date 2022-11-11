import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment/moment";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      selectedDoctor: "",
      currentDate: "",
      dataTime: [],
    };
  }
  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.fetchAllScheduleHoursRedux();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;

        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.listDoctors);
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.listDoctors);
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.listDataTime !== this.props.listDataTime) {
      this.setState({
        dataTime: this.props.listDataTime,
      });
    }
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  hadnleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  render() {
    let { arrDoctors, selectedDoctor, dataTime } = this.state;
    // let { language } = this.props.language;
    console.log("check lang", this.props.language);
    return (
      <div className="manage-schedule-container">
        <div className="m-s-tiltle">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelect}
                options={arrDoctors}
              />
            </div>
            <div className="col-6 form">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.hadnleOnChangeDatePicker}
                className="form-control"
                selected={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-our-container">
              {dataTime &&
                dataTime.length > 0 &&
                dataTime.map((item, index) => {
                  return (
                    <button className="btn btn-schedule" key={index}>
                      {this.props.language === LANGUAGES.VI
                        ? item.valueVi
                        : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button className="btn btn-primary mt-5 ">
                <FormattedMessage id="manage-schedule.save-schedule" />
              </button>
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
    listDoctors: state.admin.allDoctors,
    listDataTime: state.admin.time,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleHoursRedux: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
