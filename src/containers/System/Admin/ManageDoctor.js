import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkDown: "",
      contentHTML: "",
      description: "",
      hasOldData: false,
      arrDoctors: [],
      listPrice : [],
      listPayment : [],
      listProvince : [],
      selectedOption: "",
      selectedPrice : "",
      selectedPayment : "",
      selectedProvince : "",
      nameClinic : "",
      addressClinic : "",
      note : ""
    };
  }
  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getRequiredDoctorInfor();
  }
  buildDataInputSelect = (inputData,type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = type === 'USER' ? `${item.lastName} ${item.firstName}` : item.valueVi;
        let labelEn =  type === 'USER' ? `${item.firstName} ${item.lastName}` : item.valueEn;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;

        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.listDoctors,"USERS");
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let {allRequiredDoctorInfor} = this.props
      let dataSelect = this.buildDataInputSelect(this.props.listDoctors);
      let dataSelectPrice = this.buildDataInputSelect(allRequiredDoctorInfor?.resPrice);
      let dataSelectPayment = this.buildDataInputSelect(allRequiredDoctorInfor?.resPayment);
      let dataSelectProvince= this.buildDataInputSelect(allRequiredDoctorInfor?.resProvince);
      this.setState({
        arrDoctors: dataSelect,
        listPrice : dataSelectPrice,
        listPayment : dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if(prevProps?.allRequiredDoctorInfor !== this.props?.allRequiredDoctorInfor){
      let {allRequiredDoctorInfor} = this.props
      let dataSelectPrice = this.buildDataInputSelect(allRequiredDoctorInfor?.resPrice);
      let dataSelectPayment = this.buildDataInputSelect(allRequiredDoctorInfor?.resPayment);
      let dataSelectProvince= this.buildDataInputSelect(allRequiredDoctorInfor?.resProvince);
      this.setState({
        listPrice : dataSelectPrice,
        listPayment : dataSelectPayment,
        listProvince: dataSelectProvince,
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkDown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res?.errCode === 0 && res?.data?.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentMarkDown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentMarkDown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  handleOnchangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    let { selectedOption, arrDoctors ,listPrice,listProvince,listPayment} = this.state;
    console.log('xxxx111',listPayment,listPrice,listPrice);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title"/></div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label htmlFor=""><FormattedMessage id="admin.manage-doctor.choose-doctor"/></label>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={arrDoctors}
              placeholder={<div><FormattedMessage id="admin.manage-doctor.choose-doctor"/>... </div>}
            />
          </div>
          <div className="content-right form-group">
            <label htmlFor=""><FormattedMessage id="admin.manage-doctor.intro-infor"/></label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleOnchangeDescription(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá</label>
            <Select
              // value={selectedOption}
              onChange={this.handleChangeSelect}
              options={listPrice}
              placeholder={"Chọn giá..."}
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán</label>
            <Select
              // value={selectedOption}
              onChange={this.handleChangeSelect}
              options={listPayment}
              placeholder={"Chọn phương thức thanh toán..."}
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn tỉnh thành</label>
            <Select
              // value={selectedOption}
              onChange={this.handleChangeSelect}
              options={listProvince}
              placeholder={"Chọn tỉnh thành..."}
            />
          </div>
          <div className="col-4 form-group">
            <label>Tên phòng khám</label>
            <input className="form-control"></input>
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám</label>
            <input className="form-control"></input>
          </div>
          <div className="col-4 form-group">
            <label>Lưu ý</label>
            <input className="form-control"></input>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkDown}
          />
        </div>
        <button
          className={
            this.state.hasOldData === true
              ? "btn btn-warning"
              : "btn btn-primary"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.hasOldData === true ? <FormattedMessage id="admin.manage-doctor.add"/> : <FormattedMessage id="admin.manage-doctor.save"/>}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctors: state?.admin?.allDoctors,
    allRequiredDoctorInfor : state?.admin?.allRequiredDoctorInfor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailInforDoctor(data)),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
