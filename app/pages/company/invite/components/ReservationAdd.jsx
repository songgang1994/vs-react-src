/**
 *发送邀请下 会议室预约画面   模态框组件
 *Creat by caiwf 2017/11/10
 */

// 导入React组件
import React from 'react'
import Reflux from 'reflux'
// 导入共通组件
import SubHeader from '../../../layout/SubHeader.jsx'
import AddExternalEvent from '../../../../../components/calendar/components/AddExternalEvent.jsx'
import ExternalEvents from '../../../../../components/calendar/components/ExternalEvents.jsx'
import ReservationCalendar2 from '../../../../../components/calendar/components/ReservationCalendar2.jsx'
import BigBreadcrumbs from '../../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
// 导入Action和Store
import EventStore2 from '../../../../../components/calendar/stores/EventStore2'
import EventActions from '../../../../../components/calendar/actions/EventActions'
import ReservationAction from '../actions/ReservationAction'
import ReservationStore from '../stores/ReservationStore'


let ReservationAdd = React.createClass({
  //设置事件源初期属性
  getInitialState: function () {
      return ({
          //会议室预约信息
          reservation:[],
          //获取的预约信息中的最大meetingId
          maxId:-1
        })
  },
  // 画面渲染之后
  componentDidMount:function(){
      // 1.画面控件事件绑定
      this._handleClick();
      //2.监听预约信息获取事件，获取到预约信息时，返回_onSearchReservationDone
      this.unsubscribe = ReservationStore.listen(this._onSearchReservationDone);
      //3.获取预约信息
      ReservationAction.searchReservation();
  },
  componentWillUnmount: function() {
      // 解除对事件的监听
      this.unsubscribe();
  },
  _onSearchReservationDone:function(result){
      let reservation = result.listData;
      let a = 0;
      //将获取到的预约信息数据赋值传给子组件
      this.setState({reservation:reservation});
      //获取预约信息中最大的meetingId
      for(var i=0;i<reservation.length;i++){
          if(reservation[i].meetingId > a){
              a = reservation[i].meetingId;
          }
      }
      this.setState({maxId:a});
  },
  //画面点击事件
  _handleClick:function(){
      //点击手动预约按钮
      $("#btn-res2").click(function() {
          //模态框外部不可点击
          $("#CalendarModal2").modal({
             backdrop: false,
             keyboard: false,
             show:true
          });
          // $('#CalendarModal').on('show.bs.modal', function () {
          //     let calisload = false;
          //     self.setState({calisload:calisload});
          // });
      });
      //点击右上角叉叉
      $("#close2").click(function() {
          $("#CalendarModal2").modal('hide');
      });
  },
  render: function () {
    return (
      <div>
          {/* 手动预约按钮 */}
          <input type="button" id="btn-res2" className="btn btn-primary" value="手动预约"/>
          {/* 会议室预约模态框 */}
          <div className="modal fade" id="CalendarModal2" tabIndex="-1" role="dialog" aria-labelledby="CalendarModalabel" aria-hidden="true">
              <div className="modal-dialog" style={{width:"90%"}}>
                  <div className="modal-content">
                      <div className="modal-header">
                          <button type="button" className="close" id="close2" aria-hidden="true">
                              &times;
                          </button>
                          <h4 className="modal-title" id="CalendarModalLabel">会议室预约</h4>
                      </div>
                      <div className="modal-body">
                          <WidgetGrid>
                              {/* 调用日历组件 */}
                              <ReservationCalendar2 reservation={this.state.reservation} maxId={this.state.maxId}/>
                          </WidgetGrid>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
});


export default ReservationAdd
