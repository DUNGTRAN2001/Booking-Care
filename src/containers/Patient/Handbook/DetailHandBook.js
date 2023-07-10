import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailHandBookById } from "../../../services/userService";
import HeaderGoBack from "../../HomePage/HeaderGoBack";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailHandBook.scss";
class DetailHanbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandBook: {},
    };
  }
  async componentDidMount() {
    let id = this.props?.match?.params?.id;
      let res = await getDetailHandBookById(id)
      if(res?.errCode === 0){
        this.setState({
            dataHandBook : res?.data
        })
      }
   
  }
 
  componentDidUpdate(prevProps, prevState, snpashot) {
   
  }

  render() {
    const {dataHandBook} = this.state
    let id = this.props?.match?.params?.id;
    return (
      <div className="hanbook-container">
        <HomeHeader isShowBanner={false} />
        <HeaderGoBack section={`Cẩm nang ${id}`}/>
        <div className="title-handbook">
            <span style={{ color: '#49bce2'}}>{dataHandBook?.name}</span>
        </div>
        <div className="content-hanbook">
            {dataHandBook &&
                dataHandBook?.descriptionHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataHandBook?.descriptionHTML,
                  }}
                ></div>
              )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHanbook);
