/**
 * 访客信息画面
 * Created by xuwz on 2017/11/21.
 */

 // 导入React组件
import React from 'react'
 // 导入Reflux组件
import Reflux from 'reflux'
 // 导入共通组件
import Commons from '../../commons/components/commons.jsx'

import Select2 from '../../../../../components/forms/inputs/Select2.jsx'

let VisitorInformation = React.createClass({
  render: function() {
    return (
          <div id="content" >
            <div className="row">
              <div className="col-sm-12 col-lg-12 col-xs-12">
                <form id="forms" className="smart-form client-form">
                  <fieldset>
                    <div className="row">
                      <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <label className="label">姓名</label>
                        <label className="input">
                          <i className="icon-append fa  fa-user"/>
                          <input type="text" id="visitorName"  className="form-control" placeholder="宁龙" disabled/>
                        </label>
                      </section>
                    </div>
                    <div className="row">
                      <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <label className="label">身份证号</label>
                        <label className="input">
                          <i className="icon-append fa  fa-user"/>
                          <input type="text" id="visitorNumb" className="form-control" placeholder="320*****1614" disabled/>
                        </label>
                      </section>
                    </div>
                    <div className="row">
                      <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <label className="label">手机号<span className="text-danger">&nbsp;*
                        </span>
                      </label>
                      <label className="input">
                        <i className="icon-append fa  fa-phone"/>
                        <input type="password" id="visitorPhone"  className="form-control" placeholder="13875455254" disabled></input>
                      </label>
                    </section>
                    </div>
                    <div className="row">
                     <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                      <label className="label">邮箱<span className="text-danger">&nbsp;*
                      </span>
                      </label>
                      <label className="input">
                       <i className="icon-append fa  fa-envelope"/>
                       <input type="text" id="visitorMail"  className="form-control" placeholder="admin@softwise.com" disabled></input>
                      </label>
                     </section>
                    </div>
                    <div className="row">
                     <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                       <label className="label">所属公司<span className="text-danger">&nbsp;*
                       </span>
                       </label>
                       <label className="input">
                       <i className="icon-append fa  fa-user"/>
                       <input type="text" id="visitorCompany"  className="form-control" placeholder="南通苏慧信息技术有限公司" disabled/>
                      </label>
                     </section>
                    </div>
                    <div style={{marginTop: '2%'}}>
                        <div className="row">
                            <section className="col-xs-5">
                                  <img id="pic" src="/styles/img/demo/toxiang1.png" width="135px" height="180px"/>
                            </section>
                            <section className="col-xs-7" style={{marginTop:"10%"}}>
                                  <input type="file" /><br/>
                                  请上传一张您的照片<br/>
                                  这张照片将用于人脸签到<br/>
                                  请保持五官端正
                           </section>
                       </div>
                    </div>
                    <div style={{float:"left",marginLeft:"30%"}}>
                            <button type="button" className="btn btn-info  btn-default btn-sm">取消</button>
                    </div>
                    <div style={{float:"left",marginLeft:"10%"}}>
                          <button type="button" className="btn btn-info btn-default btn-sm">确定</button>
                   </div>
                  </fieldset>
                 </form>
             </div>
           </div>
          <Commons/>
       </div>
    )
  }
});
export default VisitorInformation
