/**
 *发送邀请下 邀请记录画面
 *Creat by caiwf 2017/11/13
 */

import React from 'react'

import _ from 'lodash'

import Reflux from 'reflux'

import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'

import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import Timepicker from '../../../../../components/forms/inputs/Timepicker.jsx'
// import ExampleCalendar from '../../../../../components/calendar/components/ExampleCalendar.jsx'
import Reservation from '../../../company/invite/components/Reservation.jsx'
import Visitors from '../../../company/visitor/components/Visitors.jsx'
import SelectApprover from '../../../util/components/SelectApprover.jsx'

import InviteListStores from '../../../company/invite/stores/InviteListStores'
// import InviteListAction from '../../../company/invite/actions/InviteListAction'
import InviteCalendarAction from '../actions/InviteCalendarAction'
import InviteCalListStore from '../stores/InviteCalListStore'
import InviteCalDetailStore from '../stores/InviteCalDetailStore'
import InviteCalDBStore from '../stores/InviteCalDBStore'
import ExampleCalendarDisplay from '../../../../../components/calendar/components/ExampleCalendarDisplay.jsx'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;

let validationOptions = {
  // jQuery.validator.addMethod("time", function(value,element) {
  //
  // });
  //表单验证规则
  rules:{
    invitetimestartdetail:{
      required:true,
      maxlength:200
    }
  },
  //表单验证msg
  messages:{
    invitetimestartdetail:{
      required:"邀请信息模板不能为空！",
      maxlength:"最多输入200长度"
    }
  }
};

let Invitecalendar = React.createClass({
  getInitialState: function() {
    //获取登录信息
    let companyId = '';
    let departId = '';
    let staffId = '';
    var userType = localStorage.getItem('userType');
    if (userType == "companyadminName" || userType == "company-receptionist") {
      companyId = JSON.parse(localStorage.getItem('user')).companyId;
    } else if (userType == "company-depart-leader") {
      companyId = JSON.parse(localStorage.getItem('user')).companyId;
      departId = JSON.parse(localStorage.getItem('user')).departId;
    } else if (userType == "company-staff") {
      companyId = JSON.parse(localStorage.getItem('user')).companyId;
      departId = JSON.parse(localStorage.getItem('user')).departId;
      staffId = JSON.parse(localStorage.getItem('user')).staffId;
    }
    return ({
      isEdit: false,
      inviteRecord: [],
      meetingId: -1,
      companyId: companyId,
      departId: departId,
      staffId: staffId,
      userType: userType,
      city:""
    });
  },
  // 画面渲染之后执行
  componentDidMount: function() {
    //画面控件事件绑定
    this._registerEventHandler();
    //监听邀请信息获取事件，获取到邀请信息时，返回_onSearchInviteDone
    this.unsubscribe = InviteCalListStore.listen(this._onSearchInviteDone);
    //监听单个邀请信息获取事件，获取到邀请信息时，返回_onSearchInviteByIdDone
    this.unsubscribeDetail = InviteCalDetailStore.listen(this._onSearchInviteByIdDone);
    //监听更新信息事件，更新完邀请信息时，返回_onSearchInviteByIdDone
    this.unsubscribeDB = InviteCalDBStore.listen(this._onUpdateInviteDone);

    let companyId = this.state.companyId;
    let departId = this.state.departId;
    let staffId = this.state.staffId;
    let userType = this.state.userType;
    //获取邀请信息
    InviteCalendarAction.searchInvite(companyId, departId, staffId, userType);
  },

  componentWillUnmount: function() {
    // 解除对事件的监听
    this.unsubscribe();
    this.unsubscribeDetail();
    this.unsubscribeDB();
  },

  _getMeetingRomm: function() {
    let meetingReservationdetail = "会议室一" +
    '\n' +
    '9:30 ~ 12:00';
    return (meetingReservationdetail);
  },

  getNowFormatDatedetail: function() {
    let date = new Date();
    let seperator1 = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return (currentdate);
  },

  _getTimeEnd: function() {
    let invitetimestart = $("#invitetimestartdetail").val();
    let timestart1 = invitetimestart.split(":")
    let hour = (parseInt(timestart1[0]) + 1).toString();
    let timestart2 = timestart1[1].split(" ")
    let minute = timestart2[0];
    let ampm = timestart2[1];
    if (hour == '12' && ampm == 'AM') {
      ampm = "PM";
    } else if (hour == '11' && ampm == 'PM') {
      ampm = "AM";
    }

    let invitetimeend = hour + ":" + minute + " " + ampm;
    return (invitetimeend);
  },

  //自动预约按下
  reservationautodetail: function() {
    let invitedatedetail = $("#invitedatedetail").val();
    let invitetimestart = $("#invitetimestartdetail").val();
    let invitetimeend = this._getTimeEnd();

    let meetingReservationdetail = "会议室一" +
    '\n' + invitedatedetail + ' ' + invitetimestart + " ~ " + invitetimeend;
    $("#meetingReservationdetail").val(meetingReservationdetail);
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 不要在HTML标签中写onXXX={this.}
  _registerEventHandler: function() {
    let me = this;

    //编辑按下
    $('#editDetail').on("click", function() {
      me.setState({"isEdit": true});
    });

    //确定按下
    $('#editFix').on("click", function() {
      me.setState({"isEdit": false});
      //将时间转化为24小时制
      let selBegin = $("#invitetimestartdetail").val();
      let selEnd = $("#invitetimeenddetail").val();
      let indexBegin = selBegin.indexOf(':');
      let indexEnd = selEnd.indexOf(':');
      let hourBegin = selBegin.substring(0,indexBegin);
      let hourEnd = selEnd.substring(0,indexEnd);
      let flagBegin = selBegin.substring(selBegin.length-2,selBegin.length);
      let flagEnd = selEnd.substring(selEnd.length-2,selEnd.length);
      if(flagBegin == "PM"){
        hourBegin = (parseInt(hourBegin)+12).toString()
      }
      let selBeginTime = hourBegin.concat(selBegin.substring(indexBegin,selBegin.length-3)).concat(':00');
      if(flagEnd == "PM"){
        hourEnd = (parseInt(hourEnd)+12).toString()
      }
      let selEndTime = hourEnd.concat(selEnd.substring(indexEnd,selEnd.length-3)).concat(':00');
      //获取表单信息
      let inviteType = $("input[name='reason']:checked").val();
      let inviteDate = $("#invitedatedetail").val();
      let inviteBeginTime = selBeginTime;
      let inviteEndTime = selEndTime;
      let memo = $("#memoInfo").val();
      let address = me.state.city;
      let inviteInfo = {
        inviteId:me.state.inviteId,
        inviteDate:inviteDate,
        inviteBeginTime:inviteBeginTime,
        inviteEndTime:inviteEndTime,
        inviteType:inviteType,
        memo:memo,
        address:address,
      }
      //调用action中的updateInvite方法
      InviteCalendarAction.updateInvite(inviteInfo);
    });

    //取消按下
    $('#editCancel').on("click", function() {
      me.setState({"isEdit": false});
    });

  },
  //获取到所有邀请信息后让其在日历显示
  _onSearchInviteDone: function(result) {
      let inviteRecord = result.listData;
      //将获取到的邀请信息数据赋值传给子组件
      this.setState({inviteRecord: inviteRecord});
  },
  //获取到单个邀请信息后
  _onSearchInviteByIdDone: function(result) {
    let singleRecord = result.listData;
    //将查询到的日期转化为datepicker对应的样式
    let date = singleRecord[0].inviteDate.replace(/-/g,"/");
    //将查询到的时间转化为timepicker对应的样式
    let timeBegin = singleRecord[0].inviteBeginTime;
    let timeEnd = singleRecord[0].inviteEndTime;
    let beginTime,endTime;
    if(timeBegin.substring(0,2) > 12){
      let beginTimeHour = (timeBegin.substring(0,2)-12).toString();
      beginTime = beginTimeHour.concat(timeBegin.substring(2,5)).concat(" PM");
    }else{
      if(timeBegin.substring(0,1) == 0){
        beginTime = timeBegin.substr(1,4).concat(" AM");
      }else{
        beginTime = timeBegin.substr(0,5).concat(" AM");
      }
    }
    if(timeEnd.substring(0,2) > 12){
      let endTimeHour = (timeEnd.substring(0,2)-12).toString();
      endTime = endTimeHour.concat(timeEnd.substring(2,5)).concat(" PM");
    }else{
      if(timeEnd.substring(0,1) == 0){
        endTime = timeEnd.substr(1,4).concat(" AM");
      }else{
        endTime = timeEnd.substr(0,5).concat(" AM");
      }
    }
    //将查到的信息赋值到表单
    $("[name='reason']"+"[value='"+singleRecord[0].inviteType+"']").prop("checked", true);
    $("#invitedatedetail").val(date);
    $("#invitetimestartdetail").val(beginTime);
    $("#invitetimeenddetail").val(endTime);
    $("#memoInfo").val(singleRecord[0].memo);
    $("#addressdisplay").val(singleRecord[0].address);
    this.setState({city:singleRecord[0].address});
  },
  //更新完邀请信息
  _onUpdateInviteDone:function(result){
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_UPDATE_SUCCESS:
        //成功
        //showMsg
        VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        break;
    default:
        VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        break;
    }
  },
  //获取子组件传过来的inviteId
  _rtnInfo: function(result) {
    let inviteId = result;
    this.setState({inviteId: inviteId});
    InviteCalendarAction.searchInviteById(inviteId);
  },
  //获取子组件传过来的city
  _rtnInfoCity:function(result){
    this.setState({city:result});
  },

  render: function() {

    return (

      <div id="content">
        <WidgetGrid>
          <div id="">
            <WidgetGrid>
              <div className="row">
                <ExampleCalendarDisplay id="exampleCalendarDisplay" inviteRecord={this.state.inviteRecord}
                  rtnInfo={this._rtnInfo}/>
              </div>
            </WidgetGrid>

            <WidgetGrid>
              <div className="modal-content" id="detail" style={{
                display: 'none'
              }}>
                <div className="modal-header" style={{
                  background: "#F8F8FF"
                }}>
                  <h1 className="modal-title col-lg-1">详情</h1>
                  <button className='btn btn-sm btn-primary col-lg-1' id="editDetail" style={{
                    display: this.state.isEdit
                      ? 'none'
                      : 'block'
                  }}>编辑</button>
                  <button className='btn btn-sm btn-primary col-lg-1' id="editFix" style={{
                    display: this.state.isEdit
                      ? 'block'
                      : 'none'
                  }}>确定</button>
                  <button className='btn btn-sm btn-primary col-lg-1' id="editCancel" style={{
                    display: this.state.isEdit
                      ? 'block'
                      : 'none'
                  }}>取消</button>
                  {/* {editFixButton}{editCancelButton} */}
                </div>
                <UiValidate options={validationOptions}>
                <div className="modal-body">
                  <WidgetGrid>
                    <div className="row">
                      <div>
                        <div className="row">

                          <div className="col-lg-1">
                            <label>邀请事由 ：</label>
                          </div>
                          <div className="col-lg-8">
                            <div>
                              <div className="btn-group" data-toggle="buttons">
                                <label className="btn btn-default" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'} unAbled={this.state.isEdit ? 'false' : 'true'}>
                                  <input type="radio" name="reason" value="0"/>
                                  面试</label>
                                <label className="btn btn-default" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'} unAbled={this.state.isEdit ? 'false' : 'true'}>
                                  <input type="radio" name="reason" value="1"/>
                                  商务</label>
                                <label className="btn btn-default" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'} unAbled={this.state.isEdit ? 'false' : 'true'}>
                                  <input type="radio" name="reason" value="2"/>
                                  私人</label>
                                <label className="btn btn-default" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'} unAbled={this.state.isEdit ? 'false' : 'true'}>
                                  <input type="radio" name="reason" value="3"/>
                                  其他</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div className="row">
                          <div className="col-lg-1">
                            <label>邀请时间 ：</label>
                          </div>
                          <div className="col-sm-2 smart-form">
                            <section >
                              <label className="input">
                                <i className="icon-append fa fa-calendar"/>
                                <UiDatepicker className="form-control datepicker" id="invitedatedetail" defaultValue={this.getNowFormatDatedetail()} dateFormat="yy/mm/dd" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'}/>
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-calendar txt-color-teal"/>
                                  &nbsp;请输入邀请日期</b>
                              </label>
                            </section>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-1"></div>
                          <div className="col-sm-2 smart-form">
                            <section >
                              <label className="input">
                                <i className="icon-append fa fa-clock-o"/>
                                <Timepicker className="form-control" name="invitetimestartdetail" id="invitetimestartdetail" placeholder="Select time" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'}/>
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-clock-o txt-color-teal"/>
                                  &nbsp;请输入邀请开始时间</b>
                              </label>
                            </section>
                          </div>
                          <div className="col-sm-1 smart-form">
                            <section >
                              <label className="textarea">
                                <textarea rows="1" className="form-control" style={{
                                  border: "none",
                                  background: "none",
                                  margin: "auto",
                                  textAlign: "center"
                                }} disabled="disabled" value="~"/>
                              </label>
                            </section>

                          </div>
                          <div className="col-sm-2 smart-form">
                            <section >
                              <label className="input">
                                <i className="icon-append fa fa-clock-o"/>
                                <Timepicker className="form-control" name="invitetimeenddetail" id="invitetimeenddetail" placeholder="Select time" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'}/>
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-clock-o txt-color-teal"/>
                                  &nbsp;请输入邀请结束时间</b>
                              </label>
                            </section>
                          </div>
                        </div>

                        {/* <div className="row">
                          <div className="col-lg-1">
                            <label>备注 ：</label>
                          </div>
                          <div className="col-lg-4 smart-form">
                            <section >
                              <label className="textarea "><i className="icon-append fa fa-file-text"/>
                                <textarea rows="4" name="info" id="memoInfo" className="form-control" placeholder="备注" disabled={this.state.isEdit
                                  ? ''
                                  : 'disabled'}/>
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-file-text txt-color-teal"/>
                                  &nbsp;请输入备注</b>
                              </label>
                            </section>
                          </div>
                        </div> */}
                        <div className="row">
                          {/* <div className="col-lg-1">
                            <label>会议室信息 ：</label>
                            <div style={{
                              display: this.state.isEdit
                                ? 'block'
                                : 'none'
                            }}>
                              <input type="button" className="btn btn-primary" onClick={this.reservationautodetail} value="自动预约"/>
                              <Reservation/>
                            </div>
                          </div> */}

                          {/* <div className="col-lg-4 smart-form">
                            <label className="col-lg-12 textarea">
                              <textarea id="meetingReservationdetail" rows="5" cols="50" name="info" disabled/>
                            </label>
                          </div> */}
                        </div>

                      </div>

                      <fieldset>
                        <br/>
                      </fieldset>
                      <fieldset>
                        <InviteTableDisplay a={this.state.isEdit}/>
                      </fieldset>
                      <fieldset>
                        <InviteMapDisplay a={this.state.isEdit} rtnInfo={this._rtnInfoCity}/>
                      </fieldset>
                    </div>
                  </WidgetGrid>

                </div>
                </UiValidate>

              </div>
            </WidgetGrid>

          </div>
        </WidgetGrid>
      </div>
    )
  }
});

let InviteMapDisplay = React.createClass({

  componentDidMount() {
    this._registerEventHandler();
    var BMap = window.BMap; //取出window中的BMap对象
    var map = new BMap.Map("allmapdisplay");
    var city = $("#addressdisplay").val();
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    if (city != "") {
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(city, function(point) {
        if (point) {
          map.centerAndZoom(point, 11);
          map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
          map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
          var marker = new BMap.Marker(point); // 创建标注
          map.addOverlay(marker); // 将标注添加到地图中
          marker.enableDragging(); // 可拖拽
        }
        // else{
        // 	alert("您选择地址没有解析到结果!");
        // }
        // }
      }, "北京市");
    } else {
      // alert("地址不能为空!");
      var map = new BMap.Map("allmapdisplay");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 11);
    }
  },

  // 地址设置button按下
  _registerEventHandler: function() {
    let me = this;
    $("#setAddress").click(function() {
      var BMap = window.BMap; //取出window中的BMap对象
      var map = new BMap.Map("allmapdisplay");
      var city = $("#addressdisplay").val();
      me.props.rtnInfo(city);
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder();
      if (city != "") {
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(city, function(point) {
          if (point) {
            map.centerAndZoom(point, 11);
            map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
            map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
            var marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker); // 将标注添加到地图中
            marker.enableDragging(); // 可拖拽
          }
          // else{
          // 	alert("您选择地址没有解析到结果!");
          // }
          // }
        }, "北京市");
      } else {
        alert("地址不能为空!");
        var map = new BMap.Map("allmapdisplay");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 11);
      }
    });
  },

  render: function() {
    return (
      <div id="content">
        <div className="row">
          <article>
            <div className="widget-body">
              <form id="map" target="ifr">
                <fieldset>
                  <div className="row">
                    <div className="col-lg-1">
                      <label>会议地址 ：</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-11 smart-form">
                      <section >
                        <label className="textarea"><i className="icon-append fa fa-map-marker"/>
                          <textarea rows="1" id="addressdisplay" className="form-control" placeholder="会议地址" disabled={this.props.a
                            ? ''
                            : 'disabled'} defaultValue="江苏南通江海英才大厦"/>
                        </label>
                      </section>
                    </div>
                    <div className="col-lg-1">
                      <button className="btn btn-primary" id="setAddress"  style={{
                        padding: "3px 25px 3px",
                        display: this.props.a
                          ? 'block'
                          : 'none'
                      }}>设置</button>
                    </div>
                  </div>
                  <div id="allmapdisplay" style={{
                    width: '100%',
                    height: '650px',
                    border: '#ccc solid 1px',
                    display: this.props.a
                      ? 'block'
                      : 'none'
                  }}></div>
                </fieldset>
              </form>
              <iframe name='ifr' id="ifr" style={{
                display: 'none'
              }}></iframe>
            </div>
          </article>
        </div>
      </div>
    )
  }
});

let InviteTableDisplay = React.createClass({
  //监听指定store
  mixins: [Reflux.connect(InviteListStores)],
  // 画面初始state生成
  getInitialState: function() {
    return InviteListStores.getData()
  },
  // 画面渲染之后执行
  componentDidMount: function() {
    //画面控件事件绑定
    this._dataTableEventHandler();
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 不要在HTML标签中写onXXX={this.XXX}
  _dataTableEventHandler: function() {
    //触发点击事件

    $('#invitetableDisplay').on("click", "td", function() {
      //获取选中tr
      var tr = $(this).closest('tr');
      //获取点击td
      var clickTd = $(this).parents("tr").find("td").index($(this));
      if (clickTd != 0) {
        if ($(".inviteDisplay", tr)[0].checked == false) {
          $(".inviteDisplay", tr)[0].checked = true;
        } else {
          //取消选中
          $(".inviteDisplay", tr)[0].checked = false;
        }
      }
      if ($(".inviteDisplay", tr)[0].checked == true) {
        tr[0].style.background = "#FFFFE0";
      } else {
        tr[0].style.background = "";
      }
    });
  },

  //全选事件处理
  _selectAll(e) {
    let checked = e.target.checked;
    var input = $('input:checkbox[type="checkbox"]');
    var tr = $(input).closest('tr');
    if (input.prop("checked")) {
      input.prop("checked", false);
      tr.css("background-color", "")
    } else {
      input.prop("checked", true);
      tr.css("background-color", "#FFFFE0")
    }
  },
  //删除事件处理
  // delete : function(){
  //   var idArray=[];
  //   $('input:checkbox[name="checkbox"]:checked').each(
  //     function(){
  //       idArray.push($(this).val());
  //     }
  //     )
  //     testActions.delete(idArray);
  // },

  render: function() {
    let options = {
      // ajax: 'api/tables/datatables.invite.json',
      columns: [
        {
          data: "id",
          orderable: false,
          render: function(data) {
            return '<input name="checkbox" class="inviteDisplay" type="checkbox" style="width:15px;height:15px;margin-left:30%"  value = "' + data + '"/>';
          }
        }, {
          data: "invitedname"
        }, {
          data: "invitedphone"
        }, {
          data: "mailaddress"
        }, {
          data: "invitedcompany"
        }
      ],
      "order": [
        [1, 'asc']
      ]
    }
    return (
      <WidgetGrid>
        <div className="row">
          <article className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <JarvisWidget className="well" colorbutton={false} sortable={true} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
              <header>
                <span className="widget-icon">
                  <i className="fa fa-table"/>
                </span>
                <h2>访客信息</h2>
                <div className="widget-toolbar">
                  <a href-void className="btn-primary" onClick={this.delete} style={{
                    padding: "1px 50px 1px",
                    display: this.props.a
                      ? 'block'
                      : 'none'
                  }}>删除访客</a>
                </div>
                <div className="widget-toolbar">
                  <a href-void data-toggle="modal" data-target="#VisitorAddDisplay" className="btn-primary" style={{
                    padding: "1px 50px 1px",
                    display: this.props.a
                      ? 'block'
                      : 'none'
                  }}>选择访客</a>
                </div>
              </header>
              <div>
                <div className="widget-body no-padding" style={{
                  overflow: "auto"
                }}><VisitorAddDisplay/>
                  <Datatable useCustomizedAjax={false} options={options} filter={true} id="invitetableDisplay" autoWidth={true} className="display projects-table table table-striped table-bordered

table-hover" width="100%">
                    {/* <Datatable getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} options={options} id="StaffMain"

filter={true} autoWidth={true} className="display projects-table table table-striped table-bordered table-hover" width="100%"> */}
                    {/* <Datatable getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} options={options} id="StaffMain"

filter={true} autoWidth={true} className="display projects-table table table-striped table-bordered table-hover" width="100%"> */}
                    <thead>
                      <tr>
                        <th width="5%"><input type='checkbox' className="checkboxs" onChange={this._selectAll} style={{
        "width": '15px',
        "height": '15px'
      }}/></th>
                        <th width="15%">姓名</th>
                        <th width="20%">手机号</th>
                        <th width="30%">邮件地址</th>
                        <th width="30%">公司</th>
                      </tr>
                    </thead>
                  </Datatable>
                </div>
              </div>
            </JarvisWidget>
          </article>
        </div>
      </WidgetGrid>
    )
  }
});

let VisitorAddDisplay = React.createClass({
  memberadd: function() {
    var visitorname = $('#visitorname').val();
    var visitorTelNum = $('#visitorTelNum').val();
    var visitorComp = $('#visitorComp').val();
    var visitorMail = $('#visitorMail').val();
    // testActions.add(username,password);
  },

  render: function() {
    return (
      <div className="modal fade" id="VisitorAddDisplay" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{
        dialogWidth: "20"
      }}>
        <div className="modal-dialog" style={{
          width: '1400px'
        }}>
          <div className="modal-content" style={{
            width: '1400px'
          }}>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h4 className="modal-title" id="myModalLabel">
                访客选择
              </h4>
            </div>
            <div className="modal-body">
              <Visitors/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.memberadd} data-dismiss="modal">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
export default Invitecalendar
