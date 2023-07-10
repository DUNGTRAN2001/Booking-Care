import React from 'react';
import { View, Document, Page, Text ,Font ,StyleSheet} from '@react-pdf/renderer';
import RobotoRegular from "../../../../assets/fonts/Roboto-Regular.ttf"
import RobotoBold from "../../../../assets/fonts/Roboto-Bold.ttf"
import RobotoItalic from "../../../../assets/fonts/Roboto-Italic.ttf"
import moment from 'moment/moment';
class ExportPdfFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate : moment().format('DD/MM/YYYY')
    };
  }
  componentDidMount = ()=>{
    Font.register({
      family: 'Roboto',
      fonts: [
          {
              src: RobotoRegular,
              fontWeight: 'normal',
          },
          {
              src: RobotoBold,
              fontWeight: 'bold',
          },
          {
              src: RobotoItalic,
              fontStyle: 'italic'
          },
      ],
  });
  }
  render() {
    const {data,doctorInfo} = this.props
    return (
     
        <Document>
        <Page size="A4" style={styles.Container}>
          <View style={styles.Header}>
            <View style={styles.HeaderMix}>
                <Text style={[styles.Text1, styles.TextBold]}>Đặt lịch khám bệnh BookingCare</Text>
                <Text style={[styles.Text2,{width : 180 , textAlign : 'center' ,marginTop : 5}]} >Đơn thuốc online</Text>
            </View>
            <View style={styles.HeaderBold}>
                <View style={styles.rowHeaderBold}>
                  <Text style={[styles.Text2,styles.TextItalic]}>Ngày in hóa đơn : {this.state.currentDate}</Text>
                </View>
            </View>
          </View>
          <Text style={[styles.Title, styles.UpperCase]}>
                Đơn thuốc
          </Text>
          <View style={[styles.RowSum,{marginBottom : 10}]}>
              <View style={styles.Row}>
                <View style={styles.RowBold}>
                    <Text style={[styles.Text2, styles.TextBold, { width: 90 }]}>Họ và tên</Text>
                    <Text style={styles.Text2}>:</Text>
                </View>
                    <Text style={[styles.Text2, { width: 120, paddingLeft: 3 }]}>{data.patientName}</Text>
                </View>
                <View style={styles.Row}>
                    <View style={styles.RowBold}>
                      <Text style={[styles.Text2, styles.TextBold, { width: 50 }]}>Giới tính</Text>
                      <Text style={styles.Text2}>:</Text>
                    </View>
                    <Text style={[styles.Text2, { width: 102, paddingLeft: 3 }]}>{data.gender}</Text>
                 </View>
                      <View style={styles.Row}>
                  <View style={styles.RowBold}>
                      <Text style={[styles.Text2, styles.TextBold, { width: 75 }]}>Số điện thoại</Text>
                      <Text style={styles.Text2}>:</Text>
                  </View>
                      <Text style={[styles.Text2, { width: 105, paddingLeft: 3 }]}>{data.phonenumber}</Text>
                  </View>
          </View>
          <View style={[styles.Row,{marginBottom : 10}]}>
              <View style={styles.RowBold}>
                  <Text style={[styles.Text2, styles.TextBold, { width: 90 }]}>Địa chỉ</Text>
                  <Text style={styles.Text2}>:</Text>
              </View>
                  <Text style={[styles.Text2, { width: 400, paddingLeft: 3 }]}>{data?.address}</Text>
          </View>
          <View style={[styles.Row,{marginBottom : 10}]}>
              <View style={styles.RowBold}>
                  <Text style={[styles.Text2, styles.TextBold, { width: 90 }]}>Bác sĩ kê đơn</Text>
                  <Text style={styles.Text2}>:</Text>
              </View>
                  <Text style={[styles.Text2, { width: 400, paddingLeft: 3 }]}>{doctorInfo?.lastName} {doctorInfo?.firstName}</Text>
          </View>
          <View style={[styles.Row,{marginBottom : 10}]}>
              <View style={styles.RowBold}>
                  <Text style={[styles.Text2, styles.TextBold, { width: 90 }]}>Chẩn đoán bệnh</Text>
                  <Text style={styles.Text2}>:</Text>
              </View>
                  <Text style={[styles.Text2, { width: 400, paddingLeft: 3 }]}>{data.diagnostic}</Text>
          </View>
          <Text style={[styles.Text2, styles.TextBold ,{marginBottom : 10}]}>Đơn thuốc</Text>
          <View style={{padding : '0 20', marginBottom : 10}}>
            {data?.rows?.map((item,index)=>{
              return (
                  <View style={[styles.RowSum,{marginBottom : 10}]}>
                  <Text style={[styles.Text2,{marginRight : 5}]}>{index + 1}.</Text>
                  <View style={styles.Row}>
                    <View style={styles.RowBold}>
                        <Text style={[styles.Text2, { width: 90 }]}>Tên thuốc</Text>
                        <Text style={styles.Text2}>:</Text>
                    </View>
                        <Text style={[styles.Text2, { width: 120, paddingLeft: 3 }]}>{item?.selectedMedician?.label}</Text>
                    </View>
                    <View style={styles.Row}>
                        <View style={styles.RowBold}>
                          <Text style={[styles.Text2, { width: 50 }]}>Số lượng</Text>
                          <Text style={styles.Text2}>:</Text>
                        </View>
                        <Text style={[styles.Text2, { width: 80, paddingLeft: 3 }]}>{item?.number} {(item?.type?.label)}</Text>
                    </View>
                          <View style={styles.Row}>
                      <View style={styles.RowBold}>
                          <Text style={[styles.Text2, { width: 75 }]}>Cách dùng</Text>
                          <Text style={styles.Text2}>:</Text>
                      </View>
                          <Text style={[styles.Text2, { width: 105, paddingLeft: 3 }]}>{item?.useWay?.label}</Text>
                      </View>
                  </View>
              )
            })}
          </View>
          <View style={[styles.Row,{marginBottom : 10}]}>
              <View style={styles.RowBold}>
                  <Text style={[styles.Text2, styles.TextBold, { width: 90 }]}>Lời dặn</Text>
                  <Text style={styles.Text2}>:</Text>
              </View>
                  <Text style={[styles.Text2, { width: 400, paddingLeft: 3 }]}>{data.advice}</Text>
          </View>
          <Text style={[styles.Text2, styles.TextItalic ,{marginBottom : 10}]}>*Khám lại xin mang theo hóa đơn này, cảm ơn vì đã tin tưởng sử dụng dịch vụ của chúng tôi.</Text>
        </Page>
      </Document>
    );
  }
}
const styles = StyleSheet.create({
  Center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
},
  UpperCase: {
      textTransform: 'uppercase'
  },
  Text1: {
      fontSize: 14,
      fontFamily: 'Roboto',
  },
  TextBold: {
      fontWeight: 'bold',
  },
  Text2: {
      fontSize: 12,
      fontFamily: 'Roboto'
  },
  Text3: {
      fontSize: 10,
      fontFamily: 'Roboto'
  },
  TextItalic: {
      fontStyle: 'italic'
  },
  Container: {
      padding: 24
  },
  Header: {
      flexDirection: 'row',
      gap: 40,
      justifyContent: 'space-between'
  },
  HeaderMix: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4
  },
  HeaderBold: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4
  },
  rowHeaderBold: {
      width: 266,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  Title: {
      flexDirection: 'row',
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 20,
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
  },
  Row: {
    flexDirection: 'row',
  },
  RowBold: {
      flexDirection: 'row',
      gap: 4
  },
  RowSum: {
      flexDirection: 'row',
      gap : 12
  },

})
export default ExportPdfFile