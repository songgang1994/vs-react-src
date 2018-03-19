/**
 *发送邀请下 会议室预约画面   日历组件
 *Creat by caiwf 2017/11/10
 */

// 导入React组件
import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'

import {DropdownButton, MenuItem} from 'react-bootstrap'

import EventStore from '../stores/EventStore'
import EventActions from '../actions/EventActions'
import JarvisWidget from '../../layout/widgets/JarvisWidget.jsx'
import UiDialogLauncher from '../../../components/ui/UiDialogLauncher.jsx'
import ReservationAction from '../../../app/pages/company/invite/actions/ReservationAction.js'
import ReservationCalendarAction from '../../../components/calendar/actions/ReservationCalendarAction.js'
import ReservationCalendarStore from '../../../components/calendar/stores/ReservationCalendarStore.js'
import ReservationAddStore from '../../../components/calendar/stores/ReservationAddStore.js'
//导入共通函数
import VsUtil from '../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//导入中文语言包
require('../../../../bower_components/moment/locale/zh-cn.js')

let ReservationCalendar = React.createClass({
    //设置事件源初期属性
    getInitialState: function () {
        return ({
            flag:-1
          })
    },
    // 画面渲染之后
    componentDidMount: function () {
        let me = this;
        // 1.画面控件事件绑定
        this._registerEventHandler();
        //2.监听预约信息改变事件，获取到预约信息时，返回_onReservationDone
        this.unsubscribe = ReservationCalendarStore.listen(this._onReservationDone);
        //3.监听预约信息添加事件，获取到预约信息时，返回_onAddReservationDone
        this.unsubscribeAdd = ReservationAddStore.listen(this._onAddReservationDone);

        //日历控件事件处理
        let $calendar = $(this.refs.smartCalendar);
        let calendar = $calendar.fullCalendar({
            // 日历基本属性设置
            //事件是否可编辑，可编辑是指可以移动, 改变大小等
            editable: false,
            //可被拖拽
            draggable: true,
            //是否允许用户通过单击或拖动选择日历中的对象，包括天和时间
            selectable: true,
            //当点击或拖动选择时间时，显示默认加载的提示信息，该属性只在周/天视图里可用
            selectHelper: true,
            //当点击页面日历以外的位置时，是否自动取消当前的选中状态
            unselectAuto: false,
            //可改变结束时间
            disableResizing: false,
            //可从外部拖拽事件进入
            droppable: true,
            //默认视图：周视图
            defaultView: "agendaWeek",
            //设置日历单元格宽度与高度的比例
            aspectRatio: 1.5,
            //在agenda视图模式下，是否在日历上方显示all-day(全天)
            allDaySlot:false,
            //日历开始时间
            minTime:"09:00:00",
            //日历结束时间
            maxTime:"18:30:00",
            //左侧时间显示格式
            axisFormat: 'H:mm',
            //设置日历头部信息
            header: {
                left: 'title', //,today
                center: 'prev, next, today',
                right: 'month, agendaWeek, agendaDay' //month, agendaDay,
            },

            //从外部拖拽事件进入的方法，未用到
            drop: function (date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                let originalEventObject = $(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                let copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                // console.log(copiedEventObject);
                // copiedEventObject.allDay = allDay;

                // $log.log(scope);

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $calendar.fullCalendar('renderEvent', copiedEventObject, true);

                EventActions.dropExternal($(this).data('eventObject'))

            },

            //时间选择，start：开始时间，end：结束时间
            select: function (start, end) {
                //设置添加事件模态框的位置
                $('#AddModal').on('show.bs.modal', function (e) {
                    $(this).find('.modal-dialog').css({
                        'left': '50%',
                        'margin-left': function () {
                            var modalWidth = $('#AddModal').find('.modal-dialog').width();
                            return (-(modalWidth / 2));
                        }
                    });

                });
                //添加事件模态框外部不可点击
                $('#AddModal').modal({
                   backdrop: false,
                   keyboard: false,
                   show:true
                });
                //页面input,select控件赋值
                document.getElementById("TitleAdd").value = "";
                document.getElementById("EventAdd").value = "";
                document.getElementById("Start").value = start;
                document.getElementById("End").value = end;
                document.getElementById("SelectAdd")[0].selected=true;
                calendar.fullCalendar('unselect');
            },
            //获取页面事件源
            events: function (start, end, timezone, callback) {
                callback(this.props.reservation);
            }.bind(this),

            //预约事件点击
            eventClick: function(event) {
                //设置编辑事件模态框的位置
                $('#EditModal').on('show.bs.modal', function (e) {
                    $(this).find('.modal-dialog').css({
                        'left': '50%',
                        'margin-left': function () {
                            var modalWidth = $('#EditModal').find('.modal-dialog').width();
                            return (-(modalWidth / 2));
                        }
                    });

                });
                //编辑事件模态框外部不可点击
                $('#EditModal').modal({
                   backdrop: false,
                   keyboard: false,
                   show:true
                });
                //页面input控件赋值
                document.getElementById("TitleEdit").value = event.title;
                document.getElementById("editStart").value = event.start;
                document.getElementById("editEnd").value = event.end;
                if(event.detail == undefined){
                    document.getElementById("EventEdit").value = "";
                }else{
                    document.getElementById("EventEdit").value = event.detail;
                }
                document.getElementById("EventId").value = event.meetingId;
                //会议室下拉框初始选中
                if(event.roomId == 1){
                    document.getElementById("SelectEdit")[0].selected=true;
                }else if(event.roomId == 2){
                    document.getElementById("SelectEdit")[1].selected=true;
                }else if(event.roomId == 3){
                    document.getElementById("SelectEdit")[2].selected=true;
                }
                //指定id的预约信息可编辑
                if(event.meetingId == 1){
                    $("#SelectEdit").attr("disabled",false);
                    $("#TitleEdit").attr("disabled",false);
                    $("#EventEdit").attr("disabled",false);
                    $("#_editSubmit").attr("disabled",false);
                    $("#deleteConfirm").attr("disabled",false);
                //添加的预约信息可编辑
                }else if(event.meetingId > me.props.maxId){
                    $("#SelectEdit").attr("disabled",false);
                    $("#TitleEdit").attr("disabled",false);
                    $("#EventEdit").attr("disabled",false);
                    $("#_editSubmit").attr("disabled",false);
                    $("#deleteConfirm").attr("disabled",false);
                //其他的预约信息不可编辑
                }else{
                  $("#SelectEdit").attr("disabled",true);
                  $("#TitleEdit").attr("disabled",true);
                  $("#EventEdit").attr("disabled",true);
                  $("#_editSubmit").attr("disabled",true);
                  $("#deleteConfirm").attr("disabled",true);
                }
            },

            //事件拖拽
            eventDrop:function(event){
                var start = event.start;
                var end = event.end;
                var meetingId = event.meetingId;
                //调用action中的dropReservation方法
                return me._eventDrop(meetingId,start,end);
            },

            //改变事件结束时间
            eventResize:function(event){
                var end = event.end;
                var meetingId = event.meetingId;
                // alert(endTime);
                //调用action中的resizeReservation方法
                return me._eventResize(meetingId,end);
            },

            //预约事件渲染时触发
            eventRender: function (event, element) {
                //在预约信息中写入会议室名称和预约具体
                if (!event.detail == "") {
                    if(!event.roomName == ""){
                        element.find('.fc-event-time').append("<br/><span class='ultra-light'>&nbsp;&nbsp;" + event.roomName + "</span>");
                        element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.detail + "</span>");
                    }
                }else{
                    if(!event.roomName == ""){
                        element.find('.fc-event-time').append("<br/><span class='ultra-light'>" + event.roomName + "</span><br/>");
                    }
                }
            },

        });
        $('.fc-header-right, .fc-header-center', $calendar).hide();
    },
    componentWillUnmount: function() {
        // 解除对事件的监听
        this.unsubscribe();
        this.unsubscribeAdd();
    },
    //控件事件处理
    _registerEventHandler:function(){
        let me = this;
        //点击添加事件模态框保存按钮
        $("#_addSubmit").click(function() {
            //获取画面输入的值
            let title = $("#TitleAdd").val();
            let detail = $("#EventAdd").val();
            let start = $("#Start").val();
            let end = $("#End").val();
            let SelectAdd = $("#SelectAdd").val();
            let className;
            let roomName;
            let roomId;
            //根据选择不同的会议室赋予会议室Id
            if(SelectAdd == 0){
                roomId = 1;
            }else if(SelectAdd == 1){
                roomId = 2;
            }else if(SelectAdd == 2){
                roomId = 3;
            }
            let addEvents = {
              "title": title,
              "start": start,
              "end":end,
              "detail": detail,
              "className": className,
              "roomId":roomId,
              "roomName":roomName
            }
            //调用action中的addReservation方法
            ReservationCalendarAction.addReservation(addEvents);
            //关闭模态框
            $('#AddModal').modal('hide');
        });

        //点击编辑事件模态框保存按钮
        $("#_editSubmit").click(function() {
            //获取事件源的json数据
            let eventJson = me.props.reservation;
            let meetingId = $("#EventId").val();
            let selectEdit = $("#SelectEdit").val();
            let title,detail,className,roomName,roomId;
            for(let i=0;i<eventJson.length;i++){
                if(eventJson[i].meetingId == meetingId){
                    title = $("#TitleEdit").val();
                    detail = $("#EventEdit").val();
                    //根据选择不同的会议室赋予会议室Id和样式
                    if(selectEdit == 0){
                        roomId = 1;
                        className = ["event", "bg-color-darken"];
                        roomName = "会议室一";
                    }else if(selectEdit == 1){
                        roomId = 2;
                        className = ["event", "bg-color-blue"];
                        roomName = "会议室二";
                    }else if(selectEdit == 2){
                        roomId = 3;
                        className = ["event", "bg-color-red"];
                        roomName = "会议室三";
                    }
                    //将修改的数据写入json数据
                    eventJson[i].title = title;
                    eventJson[i].detail = detail;
                    eventJson[i].className = className;
                    eventJson[i].roomName = roomName;
                    eventJson[i].roomId = roomId;
                }
            }
            let editEvents = {
              "meetingId":meetingId,
              "title": title,
              "detail": detail,
              "roomId":roomId,
            }
            //调用action中的editReservation方法
            ReservationCalendarAction.editReservation(editEvents);
            //关闭模态框
            $('#EditModal').modal('hide');
            //日历抓取数据源重新渲染
            $(me.refs.smartCalendar).fullCalendar('refetchEvents');
        });

        //点击删除确认模态框的确认按钮
        $("#_delete").click(function() {
            let eventJson = me.props.reservation;
            let meetingId = $("#EventId").val();
            for(let i=0;i<eventJson.length;i++){
                if(eventJson[i].meetingId == meetingId){
                    eventJson.splice(i, 1);
                }
            }
            //调用action中的deleteReservation方法
            ReservationCalendarAction.deleteReservation(meetingId);
            $('#DeleteModal').modal('hide');
            //日历抓取数据源重新渲染
            $(me.refs.smartCalendar).fullCalendar('refetchEvents');
        });

        //点击编辑事件模态框的删除按钮
        $("#deleteConfirm").click(function() {
            //关闭编辑事件模态框
            $('#EditModal').modal('hide');
            //显示删除确认模态框
            $('#DeleteModal').modal({
               backdrop: false,
               keyboard: false,
               show:true
            });
        });

        //模态框关闭
        $("#_closeAdd").click(function() {
            $('#AddModal').modal('hide');
        });
        $("#addClose").click(function() {
            $('#AddModal').modal('hide');
        });
        $("#_closeEdit").click(function() {
            $('#EditModal').modal('hide');
        });
        $("#editClose").click(function() {
            $('#EditModal').modal('hide');
        });
        $("#_closeDelete").click(function() {
            $('#DeleteModal').modal('hide');
        });
        $("#deleteClose").click(function() {
            $('#DeleteModal').modal('hide');
        });
    },
    _eventDrop:function(meetingId,start,end){
        var eventJson = this.props.reservation;
        for(var i=0;i<eventJson.length;i++){
            if(eventJson[i].meetingId == meetingId){
                eventJson[i].start = start;
                eventJson[i].end = end;
            }
        }
        ReservationCalendarAction.dropReservation(meetingId,start,end);
        $(this.refs.smartCalendar).fullCalendar('refetchEvents');
    },
    _eventResize:function(meetingId,end){
        var eventJson = this.props.reservation;
        for(var i=0;i<eventJson.length;i++){
            if(eventJson[i].meetingId == meetingId){
                eventJson[i].end = end;
            }
        }
        ReservationCalendarAction.resizeReservation(meetingId,end);
        $(this.refs.smartCalendar).fullCalendar('refetchEvents');
    },

    //添加预约事件后重新获取预约信息
    _onReservationDone:function(result){
      // switch (result.data.bizCode) {
      //   case config.API_BIZ_CODE.BIZ_CODE_UPDATE_SUCCESS:
      //     //成功
      //     //showMsg
      //     VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
      //     break;
      //   default:
      //     VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
      //     break;
      // }
    },
    _onAddReservationDone:function(result){
        // switch (result.data.bizCode) {
        //   case config.API_BIZ_CODE.BIZ_CODE_UPDATE_SUCCESS:
        //     //成功
        //     //showMsg
        //     VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
            //获取前台返回的dto
            let meetingId = result.data.meetingId;
            let roomId = result.data.roomId;
            let eventJson = this.props.reservation;
            let className,roomName;
            //根据roomId赋予不同的样式
            if(roomId == 1){
                className = ["event", "bg-color-darken"];
                roomName = "会议室一";
            }else if(roomId == 2){
                className = ["event", "bg-color-blue"];
                roomName = "会议室二";
            }else if(roomId == 3){
                className = ["event", "bg-color-red"];
                roomName = "会议室三";
            }
            let addReservation = {
              "meetingId":meetingId,
              "title": result.data.title,
              "start": result.data.start,
              "end":result.data.end,
              "detail": result.data.detail,
              "className": className,
              "roomId": roomId,
              "roomName":roomName,
              //添加的预约信息可编辑
              "editable":true,
            }
            //将新增的数据写入json数据
            eventJson.push(addReservation);
            //日历抓取数据源重新渲染
            $(this.refs.smartCalendar).fullCalendar('refetchEvents');
        //     break;
        //   default:
        //     VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        //     break;
        // }
    },
    // componentWillReceiveProps:function(){
    //     var calisload = this.props.calisload;
    //     if(!calisload){
    //         $(this.refs.smartCalendar).fullCalendar('render');
    //         calisload = true;
    //     };
    // },

    //原日历控件固有方法，保持一致
    _changeView: function (period) {
        $(this.refs.smartCalendar).fullCalendar('changeView', period);
    },
    //点击日历">"按钮
    _next: function () {
        $('.fc-button-next', this.refs.smartCalendar).click();
    },
    //点击日历"<"按钮
    _prev: function () {
        $('.fc-button-prev', this.refs.smartCalendar).click();
    },
    //点击日历"今天"按钮
    _today: function () {
        $('.fc-button-today', this.refs.smartCalendar).click();
    },
    render: function () {
        return (
        <div id="content">
            {/* 添加事件模态框 */}
            <div className="modal fade" id="AddModal" tabIndex="-1" role="dialog" aria-labelledby="AddModalLabel" aria-hidden="true" style={{overflow:"visible"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-hidden="true" id="addClose">
                                &times;
                            </button>
                            <h4 className="modal-title" id="AddModalLabel">日程添加</h4>
                        </div>
                        <form onSubmit={this._addSubmit} encType="multipart/form-data" className="smart-form" >
                        <div className="modal-body">
                          <fieldset style={{paddingLeft:'5%',paddingRight:'5%'}}>
                                  <div className="col-md-12">
                                      <section>
                                          <label htmlFor="SelectAdd" className="label"> 选择会议室</label>
                                          <label className="select">
                                          <select className="form-control" id="SelectAdd">
                                              <option value="0">会议室一</option>
                                              <option value="1">会议室二</option>
                                              <option value="2">会议室三</option>
                                          </select>
                                          </label>
                                      </section>
                                  </div>
                                  <section>
                                      <div className="col-md-12">
                                          <section>
                                              <label className="label">日程标题</label>
                                              <label className="input"> <i
                                                  className="icon-append fa  fa-paperclip"/>
                                                <input type="text" name="address" placeholder="日程标题" id="TitleAdd"/>
                                                  <b className="tooltip tooltip-top-right">
                                                      <i className="fa  fa-paperclip txt-color-teal"/>
                                                      &nbsp;请输入日程标题</b>
                                              </label>
                                              {/* <input type="text" className="form-control" placeholder="标题" id="TitleAdd"  required/> */}
                                          </section>
                                      </div>
                                  </section>
                                  <section>
                                      <div className="col-md-12">
                                          <section>
                                              <label className="label">日程事件</label>
                                              <label className="input"> <i
                                                  className="icon-append fa  fa-edit"/>
                                                <input type="text" name="address" placeholder="日程事件" id="EventAdd"/>
                                                  <b className="tooltip tooltip-top-right">
                                                      <i className="fa  fa-edit txt-color-teal"/>
                                                      &nbsp;请输入日程事件</b>
                                              </label>
                                              {/* <textarea className="form-control" placeholder="事件" rows="2" id="EventAdd"  required/> */}
                                        </section>
                                      </div>
                                  </section>
                          </fieldset>
                        </div>
                        <footer>
                            <button type="button" className="btn btn-primary" id="_addSubmit">
                              保存
                            </button>
                            <button type="button" className="btn btn-primary" id="_closeAdd">取消</button>
                        </footer>
                        <input type="hidden" name="Start" id="Start"/>
                        <input type="hidden" name="End" id="End"/>
                    </form>
                    </div>
                </div>
            </div>

            {/* 编辑事件模态框 */}
            <div className="modal fade" id="EditModal" tabIndex="-1" role="dialog" aria-labelledby="EditModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" id="editClose" aria-hidden="true">
                                &times;
                            </button>
                            <h4 className="modal-title" id="EditModalLabel">日程编辑</h4>
                        </div>
                        <form onSubmit={this._editSubmit} encType="multipart/form-data" className="smart-form">
                        <div className="modal-body">
                          <fieldset style={{paddingLeft:'5%',paddingRight:'5%'}}>
                              <section>
                                  <section>
                                      <div className="col-md-12">
                                          <section>
                                              <label htmlFor="SelectEdit" className="label"> 选择会议室</label>
                                              <label className="select">
                                              <select className="form-control" id="SelectEdit" disabled="true">
                                                  <option value="0">会议室一</option>
                                                  <option value="1">会议室二</option>
                                                  <option value="2">会议室三</option>
                                              </select>
                                              </label>
                                          </section>
                                      </div>
                                  </section>
                                  <section>
                                      <div className="col-md-12">
                                          <section>
                                              <label className="label">日程标题</label>
                                              <label className="input"> <i
                                                  className="icon-append fa  fa-paperclip"/>
                                                <input type="text" name="address" placeholder="日程标题" id="TitleEdit" disabled="true"/>
                                                  <b className="tooltip tooltip-top-right">
                                                      <i className="fa  fa-paperclip txt-color-teal"/>
                                                      &nbsp;请输入日程标题</b>
                                              </label>
                                              {/* <input type="text" className="form-control" placeholder="标题" id="TitleAdd"  required/> */}
                                          </section>
                                      </div>
                                  </section>
                                  <section>
                                      <div className="col-md-12">
                                          <section>
                                              <label className="label">日程事件</label>
                                              <label className="input"> <i
                                                  className="icon-append fa  fa-edit"/>
                                                <input type="text" name="address" placeholder="日程事件" id="EventEdit" disabled="true"/>
                                                  <b className="tooltip tooltip-top-right">
                                                      <i className="fa  fa-edit txt-color-teal"/>
                                                      &nbsp;请输入日程事件</b>
                                              </label>
                                              {/* <textarea className="form-control" placeholder="事件" rows="2" id="EventAdd"  required/> */}
                                        </section>
                                      </div>
                                  </section>
                              </section>
                          </fieldset>
                        </div>
                        <footer>
                            <button type="button" className="btn btn-primary" id="_editSubmit" disabled>
                              保存
                            </button>
                            <button type="button" className="btn btn-primary" id="deleteConfirm" disabled>
                              删除
                            </button>
                            <button type="button" className="btn btn-primary" id="_closeEdit">取消</button>
                        </footer>
                        <input type="hidden" name="id" id="EventId"/>
                        <input type="hidden" name="editStart" id="editStart"/>
                        <input type="hidden" name="editEnd" id="editEnd"/>
                    </form>
                    </div>
                </div>
            </div>

            {/* 删除确认模态框 */}
            <div className="modal fade" id="DeleteModal" tabIndex="-1" role="dialog" aria-labelledby="DeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" id="deleteClose" aria-hidden="true">
                                &times;
                            </button>
                            <h4 className="modal-title" id="DeleteModalLabel">您确认要删除日程吗？</h4>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="_closeDelete">取消</button>
                            <button type="button" className="btn btn-primary" id="_delete">
                              确认
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false}
                              fullscreenbutton={false} sortable={false}>
                <header>
                  <span className="widget-icon"> <i className="fa fa-calendar"/> </span>

                  <h2>日程事件</h2>
                </header>

                {/* widget div*/}
                <div className="col-md-8">
                    <div className="widget-body no-padding">
                        {/* content goes here */}
                        <div className="widget-body-toolbar">

                            <div id="calendar-buttons">

                                <div className="btn-group">
                                    <a onClick={this._prev} className="btn btn-default btn-xs"><i
                                        className="fa fa-chevron-left"/></a>
                                    <a onClick={this._today} className="btn btn-default btn-xs">
                                      <strong>今天</strong></a>
                                    <a onClick={this._next} className="btn btn-default btn-xs"><i
                                        className="fa fa-chevron-right"/></a>
                                </div>
                            </div>
                        </div>

                        {/* 日历显示 */}
                        <div id="calendar" ref="smartCalendar">



                        </div>

                        {/* end content */}
                    </div>

                </div>
                {/* end widget div */}
            </JarvisWidget>
          </div>
          )
    }
});


export default ReservationCalendar
