import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES, USER_ROLE, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      selectedDoctor: "",
      currentDate: "",
      dataTime: [],
      user : ""
    };
  }
  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.fetchAllScheduleHoursRedux();
    this.setState({
      user : this.props.userInfo
    })
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
    if(prevState.arrDoctors !== this.state.arrDoctors){
      if(this.state.user?.roleId == USER_ROLE.DOCTOR){
        this.state?.arrDoctors?.map(item=>{
          if(item?.value == this.state.user?.id){
            this.setState({
              selectedDoctor : {
                label : item?.label,
                value : item?.value
              }
            })
          }
        })
      }
    }
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
      let data = this.props.listDataTime;
      // cách 1
      // if (data && data.length > 0) {
      //   data.map((item) => {
      //     item.isSelected = false;
      //     return item;
      //   });
      // }

      // cách 2
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        dataTime: data,
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
  handleCLickButtonTime = (time) => {
    let { dataTime } = this.state;
    if (dataTime && dataTime.length > 0) {
      dataTime = dataTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
          return item;
        }
        this.setState({
          dataTime: dataTime,
        });
      });
    }
  };
  handleSaveSchedule = () => {
    let { dataTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!selectedDoctor) {
      toast.error("Invalid selected doctor!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formatedDate = moment(currentDate).unix();
    let formatedDate = new Date(currentDate).getTime();

    if (dataTime && dataTime.length > 0) {
      let selectedTime = dataTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time!");
        return;
      }
    }
    this.props.createBulkScheduleDoctorRedux({
      dataTime: result,
      doctorId: selectedDoctor.value,
      date:formatedDate,
    });
   
  };
  render() {
    let { arrDoctors, selectedDoctor, dataTime , user } = this.state;
    let yesterday = new Date().setHours(0,0,0,0);
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
                onChange={user?.roleId == USER_ROLE.DOCTOR ? ()=>{} : this.handleChangeSelect}
                options={arrDoctors}
                isDisabled={user?.roleId == USER_ROLE.DOCTOR ? true : false}
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
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-our-container">
              {dataTime &&
                dataTime.length > 0 &&
                dataTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleCLickButtonTime(item)}
                    >
                      {this.props.language === LANGUAGES.VI
                        ? item.valueVi
                        : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary mt-5"
                onClick={() => this.handleSaveSchedule()}
              >
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleHoursRedux: () => dispatch(actions.fetchAllScheduleTime()),
    createBulkScheduleDoctorRedux: (data) =>
      dispatch(actions.createBulkScheduleDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
