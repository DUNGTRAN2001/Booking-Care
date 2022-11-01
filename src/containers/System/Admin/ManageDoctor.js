import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkDown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snpashot) {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    console.log("check state", this.state);
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  handleOnchangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    let { selectedOption } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label htmlFor="">Chọn bác sĩ</label>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="content-right form-group">
            <label htmlFor="">Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4 "
              onChange={(event) => this.handleOnchangeDescription(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-docto-editor"></div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
        <button
          className="btn btn-primary mt-3 mb-3"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStart: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (UserId) => dispatch(actions.deleteAUser(UserId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
