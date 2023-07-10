import React, { Component } from "react";
import { connect } from "react-redux";
import "./ExportBillModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from "react-select";
import * as actions from "../../../store/actions";
import { TYPE_MEDICAL, USE_WAY_MEDICAL } from "../../../utils";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportPdfFile from "./pdf/ExportPdfFile";
class ExportBillModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        patientName : "",
        address : "",
        phonenumber : "",
        gender : "",
        rows: [{
          selectedMedician: '',
          number: '',
          useWay: ''
        }],
        selectedMedician: '', 
        options : [],
        diagnostic : '',
        advice : ''
    };
  }
  async componentDidMount() {
    if(this.props.dataModal){
        this.setState({
            patientName : this.props.dataModal?.patientName,
            address :this.props.dataModal?.address,
            phonenumber : this.props.dataModal?.phonenumber,
            gender : this.props.dataModal?.gender
        })
    }
    this.props.fetchAllMedication()
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if(prevProps.dataModal !== this.props.dataModal){
        this.setState({
            patientName : this.props.dataModal?.patientName,
            address :this.props.dataModal?.address,
            phonenumber : this.props.dataModal?.phonenumber,
            gender : this.props.dataModal?.gender
        })
    }
    if (prevProps.listMedication !== this.props.listMedication) {
      let dataSelect = this.buildDataInputSelect(this.props.listMedication);
      this.setState({
        options: dataSelect,
      });
    }

  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item?.name
        object.value = item?.id;
        result.push(object);
      });
    }
    return result;
  };
  toggle = ()=>{
    this.props.toggleExportFile()
    this.setState({
      selectedMedician: '', 
      diagnostic : '',
      advice : '',
      rows: [{
        selectedMedician: '',
        number: '',
        type : '',
        useWay: ''
      }],
    })

  }
  handleAddMedical = () => {
    const { rows, selectedMedician, number, useWay } = this.state;
    const newRow = { selectedMedician, number, useWay };
    const updatedRows = [...rows, newRow];
  
    this.setState({
      rows: updatedRows,
      selectedMedician: '',
      number: '',
      type : '',
      useWay: ''
    });
  };
  onChangeInputNormal = (event,name)=>{
    const copyState = {...this.state};
    copyState[name] = event.target.value;
    this.setState({
      ...copyState
    })
  }
  onChangeInput = (event, field, index) => {
    const { rows } = this.state;
    const updatedRows = [...rows];
    updatedRows[index][field] = event.target.value;
  
    this.setState({
      rows: updatedRows
    });
  };
  handleChangeSelect = (index) => {
    return (selectedOption) => {
      const { rows } = this.state;
      const updatedRows = [...rows];
      updatedRows[index].selectedMedician = selectedOption;
  
      this.setState({
        rows: updatedRows
      });
    };
  };
  handleChangeSelectUseWay = (index) => {
    return (selectedOption) => {
      const { rows } = this.state;
      const updatedRows = [...rows];
      updatedRows[index].useWay = selectedOption;
  
      this.setState({
        rows: updatedRows
      });
    };
  };
  handleChangeSelectType = (index) => {
    return (selectedOption) => {
      const { rows } = this.state;
      const updatedRows = [...rows];
      updatedRows[index].type = selectedOption;
  
      this.setState({
        rows: updatedRows
      });
    };
  };

  
  render() {
    let {isOpenExportFile} = this.props
    const { rows } = this.state;
    return (
        <Modal
        isOpen={isOpenExportFile}
        toggle={()=>this.toggle()}
        className={"remedy-modal-container"}
        size="lg"
        centered
      >
         <ModalHeader toggle={this.toggle}>Xuất hóa đơn khám bệnh</ModalHeader>
          <ModalBody>
             <div className="row">
                <div className="col-6 form-group">
                    <label>Họ và tên bệnh nhân</label>
                    <input type="text" value={this.state.patientName} className="form-control" onChange={(event)=>this.onChangeInputNormal(event,'patientName')}></input>
                </div>
                <div className="col-6 form-group">
                    <label>Địa chỉ bệnh nhân</label>
                    <input type="text" value={this.state.address} className="form-control" onChange={(event)=>this.onChangeInputNormal(event,'address')}></input>
                </div>
                <div className="col-6 form-group">
                    <label>Giới tính</label>
                    <input type="text" value={this.state.gender} className="form-control" onChange={(event)=>this.onChangeInputNormal(event,'gender')}></input>
                </div>
                <div className="col-6 form-group">
                    <label>Số điện thoại</label>
                    <input type="text" value={this.state.phonenumber} className="form-control" onChange={(event)=>this.onChangeInputNormal(event,'phonenumber')}></input>
                </div>
                <div className="col-12 form-group">
                    <label>Chẩn đoán</label>
                    <input type="text" value={this.state.diagnostic} className="form-control" onChange={(event)=>this.onChangeInputNormal(event,'diagnostic')}></input>
                </div>
                <div className="col-12 form-group">
                    <label>Lời dặn</label>
                    <input type="text" value={this.state.advice} className="form-control" onChange={(event)=>this.onChangeInputNormal(event,'advice')}></input>
                </div>
            </div>
            <div>
            <div className="col-1 form-group" onClick={this.handleAddMedical}>
              <i className="fa fa-plus-circle" aria-hidden="true" style={{ fontSize: '20px' ,color : '#04AA6D' ,cursor : 'pointer'}}></i>
            </div>
            {rows.map((row, index) => (
              <div className="row" key={index}>
                <div className="col-4 form-group">
                  <Select
                    value={row.selectedMedician}
                    onChange={this.handleChangeSelect(index)}
                    placeholder="Chọn loại thuốc"
                    options={this.state.options}
                  />
                </div>
                <div className="col-3 form-group">
                  <input
                    type="number"
                    value={row.number}
                    className="form-control"
                    onChange={event => this.onChangeInput(event, 'number', index)}
                    placeholder="Số lượng"
                    style={{height : '38px'}}
                  />
                </div>
                <div className="col-2 form-group">
                <Select
                    value={row.type}
                    onChange={this.handleChangeSelectType(index)}
                    placeholder="Loại"
                    options={TYPE_MEDICAL}
                  />
                </div>
                <div className="col-3 form-group">
                <Select
                    value={row.useWay}
                    onChange={this.handleChangeSelectUseWay(index)}
                    placeholder="Cách dùng"
                    options={USE_WAY_MEDICAL}
                  />
                </div>
              </div>
            ))}
         </div>
         {/* <ExportPdfFile/> */}
          </ModalBody>
          <ModalFooter>
          <PDFDownloadLink document={<ExportPdfFile data={this.state} doctorInfo={this.props.user}/>} fileName={this.state.patientName + '- Hóa đơn thuốc'} style={{ textDecoration: 'none' }}>
            <Button color="primary"  onClick={this.toggle}>Xuất file</Button>
          </PDFDownloadLink>
            <Button color="secondary" onClick={this.toggle}>Hủy bỏ</Button>
          </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user : state.user.userInfo,
    listMedication : state.admin.listMedication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMedication: () => dispatch(actions.fetchAllMedication()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportBillModal);
