/**
 * 访客审批画面
 * Created by xuwz on 2017/11/20.
 */

// 导入React组件
import React from 'react'
import {OverlayTrigger, Tooltip, Popover} from 'react-bootstrap'
// ----------------------- 引用组件 ------------------------------ //
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import Commons from '../../commons/components/commons.jsx'

let VisitorApprove = React.createClass({
    //画面渲染
    render: function() {
      return (
        <div id="content">
          {/* WidgetGrid start：整体页面布局设置 */}
          <WidgetGrid>
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xs-12" style={{backgroundColor:'#ECFFFF',marginTop:"3%"}}>
              <div className="row">

                <div className="col col-sm-3 col-md-3 col-lg-3 col-xs-3" style={{marginTop: '3%',float: "right",right: "0px"}}>
                  <button className="btn btn-primary btn-block">
                    <strong>同意</strong>
                  </button>
                </div>
                <div className="col col-sm-3 col-md-3 col-lg-3 col-xs-3" style={{marginTop: '3%',float: "right",right: "0px"
                }}>
                  <button className="btn btn-primary btn-block">
                    <strong>拒绝</strong>
                  </button>
                </div>
                <div className="clearfix"></div>
                <div  style={{borderTop:"solid blue 1px",marginTop: '1%'}}></div>
              </div>

              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{marginTop: '5%'}}>
                  <img style={{maxWidth:"150%",overflow:"hidden"}}  src="/styles/img/demo/toxiang1.png"/>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2"></div>
                <div className="col col-sm-6 col-md-6 col-lg-6 col-xs-6">
                  <div className="row">
                    <h2>
                      <b>访客一</b>
                    </h2>
                  </div>

                  <div className="row">
                    <span>138111111</span>
                  </div>

                  <div className="row">
                    <span>1234@126.com</span>
                  </div>

                  <div className="row">
                    <div>
                      <span>网易娱乐有限公司</span>
                    </div>
                  </div>
                   {/* 有待添加 */}
                  {/* <div className="row">
                    <div>
                      <span>10:30~11:30</span>
                    </div>
                  </div> */}

                </div>

              </div>
            </div>
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xs-12" style={{backgroundColor:'#ECFFFF',marginTop:"3%"}}>
              <div className="row">

                <div className="col col-sm-3 col-md-3 col-lg-3 col-xs-3" style={{marginTop: '3%',float: "right",right: "0px"}}>
                  <button className="btn btn-primary btn-block">
                    <strong>同意</strong>
                  </button>
                </div>
                <div className="col col-sm-3 col-md-3 col-lg-3 col-xs-3" style={{marginTop: '3%',float: "right",right: "0px"}}>
                  <button className="btn btn-primary btn-block">
                    <strong>拒绝</strong>
                  </button>
                </div>
                <div className="clearfix"></div>
                <div  style={{borderTop:"solid blue 1px",marginTop: '1%'}}></div>
              </div>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{
                  marginTop: '5%'
                }}>
                  <img style={{maxWidth:"150%",overflow:"hidden"}}  src="/styles/img/demo/toxiang1.png"/>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2"></div>
                <div className="col col-sm-6 col-md-6 col-lg-6 col-xs-6">
                  <div className="row">
                    <h2>
                      <b>访客二</b>
                    </h2>
                  </div>

                  <div className="row">
                    <span>138111111</span>
                  </div>

                  <div className="row">
                    <span>1234@126.com</span>
                  </div>

                  <div className="row">
                    <div>
                      <span>网易娱乐有限公司</span>
                    </div>
                  </div>
                   {/* 有待添加
                  <div className="row">
                    <div>
                      <span>2017.11.12</span>
                      <br></br>
                      <span>10:30~11:30</span>
                    </div>
                  </div> */}

                </div>

              </div>
            </div>
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xs-12" style={{backgroundColor:'#ECFFFF',marginTop:"3%"}}>
              <div className="row">

                <div className="col col-sm-3 col-md-3 col-lg-3 col-xs-3" style={{marginTop: '3%',float: "right",right: "0px"}}>
                  <button className="btn btn-primary btn-block">
                    <strong>同意</strong>
                  </button>
                </div>
                <div className="col col-sm-3 col-md-3 col-lg-3 col-xs-3" style={{marginTop: '3%',float: "right",right: "0px"}}>
                  <button className="btn btn-primary btn-block">
                    <strong>拒绝</strong>
                  </button>
                </div>
                <div className="clearfix"></div>
                <div  style={{borderTop:"solid blue 1px",marginTop: '1%'}}></div>
              </div>
              <div className="row">
                <div className="col col-sm-4 col-md-4 col-lg-4 col-xs-4" style={{
                  marginTop: '5%'
                }}>
                  <img style={{maxWidth:"150%",overflow:"hidden"}}  src="/styles/img/demo/toxiang1.png"/>
                </div>
                <div className="col col-sm-2 col-md-2 col-lg-2 col-xs-2"></div>
                <div className="col col-sm-6 col-md-6 col-lg-6 col-xs-6">
                  <div className="row">
                    <h2>
                      <b>访客三</b>
                    </h2>
                  </div>

                  <div className="row">
                    <span>138111111</span>
                  </div>

                  <div className="row">
                    <span>1234@126.com</span>
                  </div>

                  <div className="row">
                    <div>
                      <span>网易娱乐有限公司</span>
                    </div>
                  </div>
                     {/* 有待添加
                  <div className="row">
                    <div>
                      <span>2017.11.12</span>
                      <br></br>
                      <span>10:30~11:30</span>
                    </div>
                  </div> */}

                </div>

              </div>
            </div>
              <Commons/>
          </WidgetGrid>
        </div>
      )
    }
})
export default VisitorApprove
