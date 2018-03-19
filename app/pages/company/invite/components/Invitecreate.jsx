import React from 'react'

import _ from 'lodash'

import Reflux from 'reflux'

import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'

import Datatable from '../../../../../components/tables/Datatable.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import Timepicker from '../../../../../components/forms/inputs/Timepicker.jsx'
// import ExampleCalendar from '../../../../../components/calendar/components/ExampleCalendar.jsx'
import Reservation from '../../../company/invite/components/Reservation.jsx'
import Visitors from '../../../company/visitor/components/Visitors.jsx'
import SelectApprover from '../../../util/components/SelectApprover.jsx'

import InviteListStores from '../../../company/invite/stores/InviteListStores'
// import InviteListAction from '../../../company/invite/actions/InviteListAction'

let Invitecreate = React.createClass({

   getNowFormatDate:function () {
      var date = new Date();
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

      return(currentdate);
  },

  _getTimeEnd:function () {
     var invitetimestart=document.getElementById("invitetimestart").value;
     var timestart1=invitetimestart.split(":")
     var hour=(parseInt(timestart1[0]) + 1).toString();
     var timestart2=timestart1[1].split(" ")
     var minute=timestart2[0];
     var ampm = timestart2[1];
     if(hour == '12'&& ampm == 'AM'){
       ampm = "PM";
     }
     else if(hour=='11' && ampm == 'PM'){
       ampm = "AM";
     }

     var invitetimeend = hour + ":" + minute + " " + ampm;
     return(invitetimeend);
 },

    //自动预约按下
    reservationauto: function(){
      var invitedate=document.getElementById("invitedate").value;
      var invitetimestart=document.getElementById("invitetimestart").value;
      var invitetimeend=this._getTimeEnd();

      var meetingReservation = "会议室一" + '\n' + invitedate + ' ' + invitetimestart + " ~ " + invitetimeend;
      document.getElementById("meetingReservation").value = meetingReservation;
    },


    render: function(){

        return (

    <div id="content">
       <WidgetGrid>
          <div className="row">
            <div>
              <div className="row">

                    <div className="col-lg-1">
                      <label>邀请事由  ：</label>
                    </div>
                    <div className="col-lg-8">
                      <div>
                          <div className="btn-group" data-toggle="buttons">
                              <label className="btn btn-default active">
                                  <input type="radio" name="reason" value="0"/>
                                  面试</label>
                              <label className="btn btn-default">
                                  <input type="radio" name="reason" value="1"/>
                                  商务</label>
                              <label className="btn btn-default">
                                  <input type="radio" name="reason" value="2"/>
                                  私人</label>
                              <label className="btn btn-default">
                                  <input type="radio" name="reason" value="3"/>
                                  其他</label>
                          </div>
                        </div>
                    </div>
                </div>
                <br/>
                      <div className="row">
                              <div className="col-lg-1">
                                  <label>邀请时间  ：</label>
                              </div>
                                <div className="col-sm-2 smart-form">
                                  <section >
                                      <label className="input">
                                        <i className="icon-append fa fa-calendar"/>
                                        <UiDatepicker className="form-control datepicker" id="invitedate" defaultValue={this.getNowFormatDate()} dateFormat="yy/mm/dd" />
                                        <b className="tooltip tooltip-top-right">
                                        <i className="fa fa-calendar txt-color-teal"/>
                                          &nbsp;请输入邀请日期</b>
                                        </label>
                                  </section>
                                </div>
                      </div>
                        <div className="row">
                                <div className="col-lg-1">
                                </div>
                                  <div className="col-sm-2 smart-form">
                                    <section >
                                        <label className="input">
                                          <i className="icon-append fa fa-clock-o"/>
                                          <Timepicker className="form-control"  id="invitetimestart"
                                                   placeholder="Select time"/>
                                          <b className="tooltip tooltip-top-right">
                                          <i className="fa fa-clock-o txt-color-teal"/>
                                            &nbsp;请输入邀请开始时间</b>
                                          </label>
                                    </section>
                                    </div>
                                  <div className="col-sm-1 smart-form">
                                    <section >
                                      <label className="textarea">
                                        <textarea rows="1" className="form-control" style={{border:"none", background:"none", margin:"auto", textAlign:"center"}} disabled="disabled" value="~"/>
                                      </label>
                                    </section>


                                  </div>
                                  <div className="col-sm-2 smart-form">
                                    <section >
                                        <label className="input">
                                          <i className="icon-append fa fa-clock-o"/>
                                          <Timepicker className="form-control"  id="invitetimeend"
                                                   placeholder="Select time"/>
                                          <b className="tooltip tooltip-top-right">
                                          <i className="fa fa-clock-o txt-color-teal"/>
                                            &nbsp;请输入邀请结束时间</b>
                                          </label>
                                    </section>
                              </div>
                          </div>

                          <div className="row">
                          <div className="col-lg-1">
                              <label>备注  ：</label>
                            </div>
                            <div className="col-lg-4 smart-form">
                              <section >
                                <label className="textarea "><i className="icon-append fa fa-file-text"/>
                                    <textarea rows="4" name="info" className="form-control" placeholder="备注"/>
                                    <b className="tooltip tooltip-top-right">
                                        <i className="fa fa-file-text txt-color-teal"/>
                                        &nbsp;请输入备注</b>
                                </label>
                              </section>
                            </div>
                          </div>
                        <div className="row">
                            <div className="col-lg-1">
                              <label>会议室信息  ：</label>
                              <input type="button" className="btn btn-primary" onClick={this.reservationauto} value="自动预约"  />
                              <Reservation/>
                            </div>

                            <div className="col-lg-4 smart-form">
                                  <label className="col-lg-12 textarea">
                                      <textarea id="meetingReservation" rows="5" cols="50" name="info" disabled="disabled"/>
                                  </label>
                            </div>
                      </div>

                  </div>

                      <fieldset>
                          <br />
                      </fieldset>
                        <fieldset>
                      <InviteTable/>
                    </fieldset>
                  <fieldset>
                      <InviteMap/>
                  </fieldset>
                </div>
              </WidgetGrid>
              <form id="smart-form-register" className="smart-form " >
              <footer>
                  {/* <button className="btn btn-primary" data-toggle="modal" data-target="#selectApprover" name="selectApprover">
                                         <span className="hidden-mobile">发送邀请</span></button> */}
                  <a href-void data-toggle="modal" id="invite" data-target="#selectapprover" className="btn btn-primary">发送邀请</a>
              </footer>
              </form>

    </div>
  )
}
});

let InviteMap = React.createClass({

  componentDidMount(){
     var BMap = window.BMap;  //取出window中的BMap对象
     var map = new BMap.Map("allmap");
     var point = new BMap.Point(116.331398,39.897445);
     map.centerAndZoom(point,11);
   },

    // 地址设置button按下
   mapset: function(){
       var BMap = window.BMap;  //取出window中的BMap对象
       var map = new BMap.Map("allmap");
       var city = document.getElementById("address").value;
       // 创建地址解析器实例
       var myGeo = new BMap.Geocoder();
       if(city != ""){
             // 将地址解析结果显示在地图上,并调整地图视野
             myGeo.getPoint(city, function(point){
               if (point) {
                 map.centerAndZoom(point, 11);
                 map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
                 map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
                 var marker = new BMap.Marker(point);// 创建标注
                 map.addOverlay(marker);             // 将标注添加到地图中
                 marker.enableDragging();           // 可拖拽
               }
               // else{
               // 	alert("您选择地址没有解析到结果!");
               // }
               // }
            },"北京市");
       }else{
            alert("地址不能为空!");
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,11);
       }
    },

  render: function(){
      return (
        <div id="content">
          <div className="row">
            <article>
                  <div className="widget-body">
                      <form id="map"  target="ifr">
                          <fieldset>
                              <div className="row">
                                    <div className="col-lg-1">
                                        <label>会议地址  ：</label>
                                      </div>
                                    </div>
                                        <div className="row">
                                      <div className="col-lg-11 smart-form">
                                        <section >
                                          <label className="textarea "><i className="icon-append fa fa-map-marker"/>
                                              <textarea rows="1" id="address" className="form-control" placeholder="会议地址"/>
                                              <b className="tooltip tooltip-top-right">
                                                  <i className="fa  fa fa-map-marker txt-color-teal"/>
                                                  &nbsp;请输入会议地址</b>
                                          </label>
                                        </section>
                                      </div>
                                      <div className="col-lg-1">
                                          <button className="btn btn-primary" onClick={this.mapset} style={{padding:"4px 25px 4px"}}>设置</button>
                                      </div>
                             </div>
                             <div id="allmap"  style={{width:'100%',height:'650px',border:'#ccc solid 1px'}}></div>
                         </fieldset>
                       </form>
                       <iframe name='ifr' id="ifr" style={{display: 'none'}}></iframe>
                  </div>
          </article>
        </div>
    </div>
  )
  }
});

let VisitorAdd = React.createClass({
  memberadd: function(){
      var visitorname=$('#visitorname').val();
      var visitorTelNum=$('#visitorTelNum').val();
      var visitorComp=$('#visitorComp').val();
      var visitorMail=$('#visitorMail').val();
      // testActions.add(username,password);
  },


  render: function() {
    return (
      <div className="modal fade" id="VisitorAdd" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{dialogWidth:"20"}}>
        <div className="modal-dialog" style={{width: '1400px'}}>
          <div className="modal-content" style={{width: '1400px'}}>
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


let InviteTable = React.createClass({
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

    $('#invitetableCheck').on("click", "td", function() {
      //获取选中tr
      var tr = $(this).closest('tr');
      //获取点击td
      var clickTd = $(this).parents("tr").find("td").index($(this));
      if(clickTd != 0){
        if ($(".invite", tr)[0].checked == false) {
          $(".invite", tr)[0].checked = true;
        } else {
          //取消选中
          $(".invite", tr)[0].checked = false;
        }
      }
      if ($(".invite", tr)[0].checked == true) {
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
    if(input.prop("checked")){
      input.prop("checked", false);
      tr.css("background-color", "")
    }else{
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
  ret:function(staffId){
  let ni = $("#invite").val(staffId);

  },

  render: function() {
    let options = {
        ajax: 'api/tables/datatables.invite.json',
        columns: [
          {
            data: "id",
            orderable: false,
            render: function(data) {
              return '<input name="checkbox" class="invite" type="checkbox" style="width:15px;height:15px;margin-left:30%"  value = "' + data + '"/>';
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
        "order":[[1,'asc']]
    }
    return (
        <WidgetGrid>
          <div className="row">
            <article className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                <header>
                  <span className="widget-icon"> <i className="fa fa-table"/>
                  </span>
                  <h2>受邀人一览</h2>
                  <div className="widget-toolbar">
                    <a href-void className="btn-primary" onClick={this.delete} style={{padding: "5px 50px 5px"}}>删除访客</a>
                  </div>
                  <div className="widget-toolbar">
                    <a href-void data-toggle="modal" data-target="#VisitorAdd" className="btn-primary" style={{padding:"5px 50px 5px"}}>选择访客</a>
                  </div>
                </header>
                <div>
                  <div className="widget-body no-padding" style={{overflow: "auto"}}><VisitorAdd/><SelectApprover rtnModal={this.ret}/>
                  <Datatable useCustomizedAjax={false} options={options} filter={true}
                     id="invitetableCheck" autoWidth={true}  className="display projects-table table table-striped table-bordered table-hover" width="100%">
                  {/* <Datatable getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} options={options} id="StaffMain" filter={true} autoWidth={true} className="display projects-table table table-striped table-bordered table-hover" width="100%"> */}
                  {/* <Datatable getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} options={options} id="StaffMain" filter={true} autoWidth={true} className="display projects-table table table-striped table-bordered table-hover" width="100%"> */}
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
export default Invitecreate
