import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClinic, getAllHandBook } from "../../services/userService";
import HeaderGoBack from "../HomePage/HeaderGoBack";
import "./SeeMore.scss";
class SeeMoreHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataAllHandBook : []
    };
  }
    async componentDidMount() {
        let res = await getAllHandBook('100');
        if(res?.errCode === 0){
          this.setState({
            dataAllHandBook : res?.data ?? []
          })
        }
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
  }
  handelViewDetailHandBook = (item)=>{
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  }
  render() {
    let {dataAllHandBook} = this.state
    return (
     <>
         <HeaderGoBack section={'Tất cả cẩm nang'}/>
         <div className="seemore-cotainer">
         {dataAllHandBook &&
            dataAllHandBook.length > 0 &&
            dataAllHandBook.map((item, index) => {
                  return (
                    <div
                      className="seemore-content-doctor"
                      key={index}
                      onClick={() => this.handelViewDetailHandBook(item)}
                    >
                         <div
                            className="backgroud-image-doctor"
                            style={{ backgroundImage: `url(${item?.image})` }}
                          ></div>

                        <div className="title-image-doctor">                 
                            {item?.name}
                        </div>
                      </div>
                  
                  );
                })}
         </div>
     </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app?.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeMoreHandBook);
