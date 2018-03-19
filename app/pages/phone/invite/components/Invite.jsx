/**
 * 邀请审批画面
 * Created by caowj on 2017/11/7.
 */
// 导入React组件
import React from 'react'
// 导入Reflux组件
import Reflux from 'reflux'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import Timepicker from '../../../../../components/forms/inputs/Timepicker.jsx'
import ElementHolder from '../../../../../components/utils/mixins/ElementHolder.jsx'
import Commons from '../../commons/components/commons.jsx'

let Invite = React.createClass({

  // 画面渲染之后
  componentDidMount:function(){
    // 画面控件事件绑定
    this._registerEventHandler();
     var BMap = window.BMap;  //取出window中的BMap对象
     var map = new BMap.Map("allmap");
     map.addControl(new BMap.NavigationControl());
     map.addControl(new BMap.ScaleControl());
     map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
     var point = new BMap.Point(116.331398,39.897445);
     map.centerAndZoom(point,11);
     var marker = new BMap.Marker(point);// 创建标注
     map.addOverlay(marker);             // 将标注添加到地图中

   },
   _registerEventHandler: function() {
     let me = this;
     $("#setAddress").click(function() {
       var BMap = window.BMap; //取出window中的BMap对象
       var map = new BMap.Map("allmap");
       var city = $("#address").val();
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
         }, "北京市");
       } else {
         alert("地址不能为空!");
         var map = new BMap.Map("allmap");
         var point = new BMap.Point(116.331398, 39.897445);
         map.centerAndZoom(point, 11);
       }
     });
   },


 render: function() {
     return (

        <div id="content" >
           <div className="row">
             <div className="col-sm-12 col-sm-12">
                <div className="well no-padding">
                 <form id="forms" className="smart-form client-form">

                   <fieldset>
                       <section >
                             <label>访客姓名</label>
                             <label className="input">
                                   <i className="icon-append fa  fa-user"/>
                                   <input type="text" name="username" />
                              </label>
                       </section>

                        <section >
                              <label>访客手机号</label>
                              <label className="input">
                                   <i className="icon-append fa  fa-phone"/>
                                   <input type="text" name="usermoblie" />
                              </label>
                        </section>

                        <section >
                             <label>访客邮箱</label>
                             <label className="input">
                                   <i className="icon-append fa  fa-envelope"/>
                                   <input type="text" name="email" />
                             </label>
                        </section>

                        <section >
                              <label>访客所属公司</label>
                              <label className="input">
                                   <i className="icon-append fa  fa-user"/>
                                   <input type="text" name="company" />
                              </label>
                        </section>

                        <section >
                           <label>邀请事由</label>
                           <section >
                              <div className="btn-group" data-toggle="buttons">
                                   <label className="btn btn-default btn-sm active">
                                     <input type="radio" name="reason" value="0"/>
                                     面试</label>
                                   <label className="btn btn-default btn-sm">
                                     <input type="radio" name="reason" value="1"/>
                                     商务</label>
                                   <label className="btn btn-default btn-sm">
                                     <input type="radio" name="reason" value="2"/>
                                     私人</label>
                                   <label className="btn btn-default btn-sm">
                                     <input type="radio" name="reason" value="3"/>
                                   其他</label>
                              </div>
                          </section>
                        </section>
                        <div style={{width:"85%",float:"left"}}>
                        <section >
                              <label>邀请时间</label>
                              <section >
                                <label className="input"><i className="icon-append fa fa-calendar"/>
                                  <UiDatepicker className="form-control datepicker" id="visitdate" defaultValue="选择日期"  dateFormat="yy/mm/dd" />
                                </label>
                              </section>

                              <div className="row">
                                <div style={{width:"46%",float:"left"}}>
                                <section className="col col-5">
                                  <label className="input">
                                    <i className="icon-append fa fa-clock-o"/>
                                    <Timepicker className="form-control"  id="invitetimestart" placeholder="Select time"/>
                                    <b className="tooltip tooltip-top-right">
                                    <i className="fa fa-clock-o txt-color-teal"/>
                                      &nbsp;请输入邀请开始时间</b>
                                  </label>
                                </section>
                                </div>
                                <div style={{float:"left",paddingTop:"3%"}}>
                                     ——
                                </div>
                                <div style={{width:"45%",float:"left"}}>
                                <section className="col col-5">
                                  <label className="input">
                                    <i className="icon-append fa fa-clock-o"/>
                                    <Timepicker className="form-control"  id="invitetimeend" placeholder="Select time"/>
                                    <b className="tooltip tooltip-top-right">
                                    <i className="fa fa-clock-o txt-color-teal"/>
                                      &nbsp;请输入邀请结束时间</b>
                                  </label>
                                </section>
                                </div>
                             </div>
                        </section>

                        <section >
                              <label>会议室预约</label>
                              <div className="row">
                              <div style={{width:"30%",float:"left"}}>
                              <section  className="col col-1">
                                   <button  className="btn btn-default btn-sm">
                                      自动预约
                                   </button>
                              </section>
                              </div>
                              <div style={{width:"50%",float:"left"}}>
                              <section className="col col-1">
                                   <button  className="btn btn-default btn-sm">
                                      手动预约
                                   </button>
                              </section>
                              </div>
                             </div>
                        </section>
                      </div>
                      <div className="clearfix"></div>
                        <section >
                            <label>地址设定</label>
                            <label className="input,button">
                                 <input type="text" name="address" id="address" style={{height:"21px",width:"220px"}}/>
                            </label>
                       <button type="button"  className="btn btn-primary" id="setAddress"  style={{padding: "3px 25px 3px",float:"right",width:"20%"}}>设置</button>
                       <div id="allmap"  style={{width:'100%',height:'400px',border:'#ccc solid 1px'}}></div>
                    </section>
                   </fieldset>
                   <footer>
                     <div  style={{float:"left",width:"30%",marginLeft:"20%"}}>
                     <button type="button" className="btn btn-primary">
                        取消
                      </button>
                    </div>
                    <div  style={{float:"left",width:"30%"}}>
                     <button type="button"   className="btn btn-primary ">
                       确定
                     </button>
                   </div>
                 </footer>
                 </form>
             </div>
           </div>
           <Commons/>
         </div>
       </div>
    )
  }
});
export default Invite
