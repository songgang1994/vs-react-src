/**
 * 访客邀请记录画面
 * Created by yuyz on 2017/11/20.
 */
// 导入React组件
import React from 'react'

// ----------------------- 引用组件 ------------------------------ //
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import Commons from '../../commons/components/commons.jsx'
let VisitorInvite = React.createClass({
  //画面渲染
  render: function() {
    return (
      <div id="content" >
          {/* WidgetGrid start：整体页面布局设置 */}
          <WidgetGrid>
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
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xs-12" style={{backgroundColor:'#ECFFFF',marginTop:"6%"}}>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{marginTop: '2%'}}>
                  <lable>邀请信息:</lable>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2" style={{marginTop: '2%',float:"right",right:"0px"}}>
                  <span className="label label-default">面试</span>
                </div>
              </div>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{marginTop: '2%'}}>
                  <img style={{maxWidth:"120%",overflow:"hidden"}}  src="/styles/img/demo/toxiang1.png"/>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2"></div>
                <div className="col col-sm-6 col-md-6 col-lg-6 col-xs-6" style={{marginTop: '2%'}}>
                  <div className="row" >
                    <span>李伟</span>
                  </div>
                  <div className="row">
                    <span>138111111</span>
                  </div>
                  <div className="row">
                    <span>1234@126.com</span>
                  </div>

                  <div className="row">
                    <div>
                      <span>2017.11.12 10:00~11:30</span>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <span>网易娱乐有限公司</span>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <span>江苏省南通市xx区xx路xx号</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xs-12" style={{backgroundColor:'#ECFFFF',marginTop:"3%"}}>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{marginTop: '2%'}}>
                  <lable>邀请信息:</lable>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2" style={{marginTop: '2%',float:"right",right:"0px"}}>
                  <span className="label label-default">面试</span>
                </div>
              </div>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{marginTop: '2%'}}>
                  <img style={{maxWidth:"120%",overflow:"hidden"}}  src="/styles/img/demo/toxiang1.png"/>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2"></div>
                <div className="col col-sm-6 col-md-6 col-lg-6 col-xs-6" style={{marginTop: '2%'}}>
                  <div className="row" >
                    <span>孙静</span>
                  </div>
                  <div className="row">
                    <span>138111112</span>
                  </div>
                  <div className="row">
                    <span>1234@121.com</span>
                  </div>
                  <div className="row">
                    <div>
                      <span>网易娱乐有限公司</span>
                    </div>
                  </div>
                  <div className="row">
                    <span>2017.11.12 10:00~11:30</span>
                  </div>
                  <div className="row">
                    <div>
                      <span>江苏省南通市xx区xx路xx号</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xs-12" style={{backgroundColor:'#ECFFFF',marginTop:"3%"}}>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{marginTop: '2%'}}>
                  <lable>邀请信息:</lable>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2" style={{marginTop: '2%',float:"right",right:"0px"}}>
                  <span className="label label-default">面试</span>
                </div>
              </div>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{marginTop: '2%'}}>
                  <img style={{maxWidth:"120%",overflow:"hidden"}}  src="/styles/img/demo/toxiang1.png"/>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2"></div>
                <div className="col col-sm-6 col-md-6 col-lg-6 col-xs-6" style={{marginTop: '2%'}}>
                  <div className="row" >
                    <span>王大志</span>
                  </div>
                  <div className="row">
                    <span>138111113</span>
                  </div>
                  <div className="row">
                    <span>1234@1262.com</span>
                  </div>
                  <div className="row">
                    <div>
                      <span>网易娱乐有限公司</span>
                    </div>
                  </div>
                  <div className="row">
                    <span>2017.11.12 10:00~11:30</span>
                  </div>
                  <div className="row">
                    <div>
                      <span>江苏省南通市xx区xx路xx号</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <Commons/>
          </WidgetGrid>
        </div>
      )
    }
  })


  export default VisitorInvite
