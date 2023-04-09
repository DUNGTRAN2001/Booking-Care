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
    if (inputData?.length > 0) {
      if(type === "USERS"){
        inputData.map((item, index) => {
          let object = {};
          let labelVi =`${item.lastName} ${item.firstName}`;
          let labelEn =`${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      else if(type === "PRICE" ){
        inputData.map((item, index) => {
          let object = {};
          let labelVi =`${item.valueVi}`;
          let labelEn =`${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      else if(type === "PAYMENT" || type === "PROVINCE"){
        inputData.map((item, index) => {
          let object = {};
          let labelVi =`${item.valueVi}`;
          let labelEn =`${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      
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
    if(prevProps?.allRequiredDoctorInfor !== this.props?.allRequiredDoctorInfor){
      let {allRequiredDoctorInfor} = this.props
      let dataSelectPrice = this.buildDataInputSelect(allRequiredDoctorInfor?.resPrice,"PRICE");
      let dataSelectPayment = this.buildDataInputSelect(allRequiredDoctorInfor?.resPayment,"PAYMENT");
      let dataSelectProvince= this.buildDataInputSelect(allRequiredDoctorInfor?.resProvince,"PROVINCE");
      this.setState({
        listPrice : dataSelectPrice,
        listPayment : dataSelectPayment,
        listProvince: dataSelectProvince,
      })
    }
    if (prevProps.language !== this.props.language) {
      let {allRequiredDoctorInfor} = this.props
      let dataSelect = this.buildDataInputSelect(this.props.listDoctors,"USERS");
      let dataSelectPrice = this.buildDataInputSelect(allRequiredDoctorInfor?.resPrice,"PRICE");
      let dataSelectPayment = this.buildDataInputSelect(allRequiredDoctorInfor?.resPayment,"PAYMENT");
      let dataSelectProvince= this.buildDataInputSelect(allRequiredDoctorInfor?.resProvince,"PROVINCE");
      this.setState({
        arrDoctors: dataSelect,
        listPrice : dataSelectPrice,
        listPayment : dataSelectPayment,
        listProvince: dataSelectProvince,
      });
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
      contentHTML: this.state?.contentHTML,
      contentMarkdown: this.state?.contentMarkDown,
      description: this.state?.description,
      doctorId: this.state.selectedOption?.value,

      selectedPrice : this.state.selectedPrice?.value,
      selectedPayment : this.state.selectedPayment?.value,
      selectedProvince : this.state.selectedProvince?.value,
      nameClinic : this.state.nameClinic,
      addressClinic : this.state.addressClinic,
      note : this.state.note,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let {listPayment,listPrice,listProvince} = this.state
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res?.errCode === 0 && res?.data?.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = "", nameClinic = "",note = "",paymentId = "",priceId = "", provinceId = "",
      selectedPayment = "", selectedPrice = "", selectedProvince = "";
     
      if(res?.data?.Doctor_Infor){
        addressClinic = res?.data?.Doctor_Infor?.addressClinic;
        nameClinic = res?.data?.Doctor_Infor?.nameClinic;
        note = res?.data?.Doctor_Infor?.note;
        paymentId =  res?.data?.Doctor_Infor?.paymentId;
        priceId =  res?.data?.Doctor_Infor?.priceId;
        provinceId =  res?.data?.Doctor_Infor?.provinceId;
        selectedPayment = listPayment.find(item=>{
          if(item?.value === paymentId) return item
        })
        selectedPrice = listPrice.find(item=>{
          if(item?.value === priceId) return item
        })
        selectedProvince = listProvince.find(item=>{
          if(item?.value === provinceId) return item
        })
      }
      this.setState({
        contentMarkDown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldData: true,
        addressClinic : addressClinic,
        nameClinic : nameClinic,
        note : note,
        selectedPayment : selectedPayment,
        selectedPrice : selectedPrice,
        selectedProvince : selectedProvince,

      });
    } else {
      this.setState({
        contentMarkDown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
        addressClinic : "",
        nameClinic : "",
        note : "",
        selectedPayment : "",
        selectedPrice : "",
        selectedProvince : ""
      });
    }
  };
  handleChangeSelectDoctorInfor = async (selectedOption,name)=>{
    let stateName = name.name;
    let stateCopy = {...this.state};
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy
    })
  }

  handleOnchangeText = (event,id) => {
    let copyState = {...this.state}
    copyState[id] = event.target.value
    this.setState({
      ...copyState
    });
  };
  render() {
    let { selectedOption, 
        arrDoctors ,
        listPrice,
        listProvince,
        listPayment,
        selectedPrice,
        selectedProvince,
        selectedPayment,
        nameClinic,
        addressClinic,
        note} = this.state;
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
              onChange={(event) => this.handleOnchangeText(event,'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.price"/></label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPrice}
              placeholder={<div><FormattedMessage id="admin.manage-doctor.price"/>...</div>}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
            <Select
              value={selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPayment}
              placeholder={<div><FormattedMessage id="admin.manage-doctor.payment"/>...</div>}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.province"/></label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listProvince}
              placeholder={<div><FormattedMessage id="admin.manage-doctor.province"/>...</div>}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.name-clinic"/></label>
            <input className="form-control"
                   onChange={(event) => this.handleOnchangeText(event,'nameClinic')}
                   value={nameClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.address-clinic"/></label>
            <input className="form-control"
                   onChange={(event) => this.handleOnchangeText(event,'addressClinic')}
                   value={addressClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.note"/></label>
            <input className="form-control" 
                  onChange={(event) => this.handleOnchangeText(event,'note')}
                  value={note}
            ></input>
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
          {this.state.hasOldData === true ? <FormattedMessage id="admin.manage-doctor.save"/> : <FormattedMessage id="admin.manage-doctor.add"/>}
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
