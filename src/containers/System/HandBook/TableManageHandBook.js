import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageHandBook.scss";
import { deleteHandbook} from "../../../services/userService";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";

class TableManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataAllHandbook: [],
    };
  }
  async componentDidMount(){
   this.props.fetchAllHandbook()
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listHandbook !== this.props.listHandbook) {
      this.setState({
        dataAllHandbook: this.props.listHandbook.reverse(),
      });
    }
  }
  handleDeleteHandbook = async (item) => {
    let res = await deleteHandbook(item.id)
    if(res.errCode === 0){
        toast.success('Delete handbook success')
        this.props.fetchAllHandbook()
    }else{
        toast.error('Delete handbook failed')
    }
  };
  handleEditHandbook = (user) => {
    this.props.handleEditHandbookFromParentKey(user);
  };
  render() {
    let {dataAllHandbook} = this.state;
    return (
      <>
        <table id="tableManageUser">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Tên cẩm nang</th>
              <th>Ảnh cẩm nang</th>
              <th>Hành động</th>
            </tr>
            {
                dataAllHandbook.length > 0 &&
                dataAllHandbook?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td >{index +1}</td>
                    <td>{item?.name}</td>
                    <td>
                        <img src={item?.image} height='50px' width='50px' ></img>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditHandbook(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteHandbook(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listHandbook : state.admin.listHandbook
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHandbook: () => dispatch(actions.fetchAllHandbook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandBook);
