import React, { Component } from "react";
import { connect } from "react-redux";
import "./ExportBillModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from "react-select";
class ExportBillModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        patientName : "",
        address : "",
        phonenumber : "",
        gender : "",
        number : "",
        number1 : "",
        number2 : "",
        useWay : "",
        useWay1 : "",
        useWay2 : "",
        options : [
            {label : 'Paracetamol',value : 1},
            {label : 'Ibuprofen',value : 2},
            {label : 'Amoxicillin',value : 3},
            {label : 'Omeprazole',value : 4},
            {label : 'Simvastatin',value : 5},
          ],
        selectedMedician : '',
        selectedMedician1 : '',
        selectedMedician2 : '',
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
  }
  toggle = ()=>{
    this.props.toggleExportFile()
  }
 
  onChangeInput = (event,id)=>{
    let copyState = {...this.state}
    copyState[id] = event.target.value
    this.setState({
        ...copyState
    })
  }
  handleChangeSelect = (selectedOption)=>{
    this.setState({ selectedMedician: selectedOption });
  }
  handleChangeSelect1 = (selectedOption)=>{
    this.setState({ selectedMedician1: selectedOption });
  }
  handleChangeSelect2 = (selectedOption)=>{
    this.setState({ selectedMedician2: selectedOption });
  }
  render() {
    let {isOpenExportFile} = this.props
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
                    <input type="text" value={this.state.patientName} className="form-control" onChange={(event)=>this.onChangeInput(event,'patientName')}></input>
                </div>
                <div className="col-6 form-group">
                    <label>Địa chỉ bệnh nhân</label>
                    <input type="text" value={this.state.address} className="form-control" onChange={(event)=>this.onChangeInput(event,'address')}></input>
                </div>
                <div className="col-6 form-group">
                    <label>Giới tính</label>
                    <input type="text" value={this.state.gender} className="form-control" onChange={(event)=>this.onChangeInput(event,'gender')}></input>
                </div>
                <div className="col-6 form-group">
                    <label>Số điện thoại</label>
                    <input type="text" value={this.state.phonenumber} className="form-control" onChange={(event)=>this.onChangeInput(event,'phonenumber')}></input>
                </div>
            </div>
            <div className="row">
                <div className="col-5 form-group">
                    <label>Chọn loại thuốc</label>
                </div>
                <div className="col-3 form-group">
                <label>Số lượng thuốc</label>
                </div>
                <div className="col-3 form-group">
                    <label>Cách dùng</label>
                </div>
            </div>
            <div className="row">
                 <div className="col-5 form-group">
                 <Select
                   value ={this.state.selectedMedician}
                   onChange ={this.handleChangeSelect}
                   placeholder={'Chọn loại thuốc'}
                   options={this.state.options}
                  />       
                </div>
                <div className="col-3 form-group">
                    <input type="number" value={this.state.number} className="form-control" onChange={(event)=>this.onChangeInput(event,'number')}></input>
                </div>
                <div className="col-3 form-group">
                    <input type="text" value={this.state.useWay} className="form-control" onChange={(event)=>this.onChangeInput(event,'useWay')}></input>
                </div>
            </div>
            <div className="row">
                 <div className="col-5 form-group">
                 <Select
                   value ={this.state.selectedMedician1}
                   onChange ={this.handleChangeSelect1}
                   placeholder={'Chọn loại thuốc'}
                   options={this.state.options}
                  />       
                </div>
                <div className="col-3 form-group">
                    <input type="number" value={this.state.number1} className="form-control" onChange={(event)=>this.onChangeInput(event,'number1')}></input>
                </div>
                <div className="col-3 form-group">
                    <input type="text" value={this.state.useWay1} className="form-control" onChange={(event)=>this.onChangeInput(event,'useWay1')}></input>
                </div>
            </div>  
            <div className="row">
                 <div className="col-5 form-group">
                 <Select
                   value ={this.state.selectedMedician2}
                   onChange ={this.handleChangeSelect2}
                   placeholder={'Chọn loại thuốc'}
                   options={this.state.options}
                  />       
                </div>
                <div className="col-3 form-group">
                    <input type="number" value={this.state.number2} className="form-control" onChange={(event)=>this.onChangeInput(event,'number2')}></input>
                </div>
                <div className="col-3 form-group">
                    <input type="text" value={this.state.useWay2} className="form-control" onChange={(event)=>this.onChangeInput(event,'useWay2')}></input>
                </div>
                <div className="col-1 form-group" style={{paddingTop : '6px'}}>
                    <i class="fa fa-plus-circle" aria-hidden="true" style={{fontSize : '20px'}}></i>
                </div>
            </div>  
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Xuất file</Button>{' '}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportBillModal);
