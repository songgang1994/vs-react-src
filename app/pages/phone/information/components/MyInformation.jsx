/**
 * 我的信息画面
 * Created by yuyz on 2017/11/20.
 */
// 导入React组件
import React from 'react'
// 导入Reflux组件
import Reflux from 'reflux'
// 导入共通组件
import Commons from '../../commons/components/commons.jsx'

import Select2 from '../../../../../components/forms/inputs/Select2.jsx'
let MyInformation = React.createClass({
  render: function() {
    return (
          <div id="content" >
            <div className="row">
              <div className="col-sm-12 col-lg-12 col-xs-12">
                <form id="forms" className="smart-form client-form">
                  <fieldset>
                    <div className="row">
                      <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <label className="label">所属公司 </label>
                        <label className="input">
                          <i className="icon-append fa  fa-user"/>
                          <input type="text" id="company" name="company" className="form-control" placeholder="苏慧信息技术有限公司" disabled/>
                        </label>
                      </section>
                    </div>
                    <div className="row">
                      <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <label className="label">登录名</label>
                        <label className="input">
                          <i className="icon-append fa  fa-user"/>
                          <input type="text" id="loginName" className="form-control" placeholder="admin" disabled/>
                        </label>
                      </section>
                    </div>
                    <div className="row">
                      <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <label className="label">密码<span className="text-danger">&nbsp;*
                        </span>
                      </label>
                      <label className="input">
                        <i className="icon-append fa  fa-lock"/>
                        <input type="visitorPassword" id="visitorPassword" name="visitorPassword" className="form-control" placeholder="*****" ></input>
                      </label>
                    </section>
                    </div>
                    <div className="row">
                     <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                       <label className="label">用户ID<span className="text-danger">&nbsp;*
                       </span>
                       </label>
                       <label className="input">
                       <i className="icon-append fa  fa-user"/>
                       <input type="text" id="visitorUid" name="visitorUid" className="form-control" placeholder="A000001" disabled/>
                      </label>
                     </section>
                    </div>
                    <div className="row">
                     <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                       <label className="label">姓名
                       <span className="text-danger">&nbsp;*
                       </span>
                       </label>
                       <label className="input">
                       <i className="icon-append fa  fa-user"/>
                       <input type="text" id="visitorName" name="visitorName" className="form-control" placeholder="小王" />
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
                      <input type="text" id="cellphone" name="cellphone" className="form-control" placeholder="187528925" ></input>
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
                       <input type="text" id="visitorMail" name="visitorMail" className="form-control" placeholder="suhui@soft" ></input>
                      </label>
                     </section>
                    </div>
                    <div className="row">
                     <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                      <label className="label">所属部门<span className="text-danger">&nbsp;*
                      </span>
                      </label>
                      <label className="select">
                       <div id="visitor-depart">
                       <Select2  style={{width: '100%'}} disabled>
                       <option value="开发部">开发部</option>
                       </Select2>
                       </div>
                      </label>
                    </section>
                   </div>
                   <div className="row">
                   <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                    <label className="label">角色<span className="text-danger">&nbsp;*
                    </span>
                    </label>
                    <label className="select">
                      <div id="visitor-role">
                      <Select2 style={{  width: '100%'}} disabled>
                      <option value="普通员工">普通员工</option>
                      </Select2>
                    </div>
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
             <div >
              <div style={{float:"left",marginLeft:"30%"}}>
                <button type="button" className="btn btn-info  btn-default btn-sm">取消</button>
              </div>
              <div style={{float:"left",marginLeft:"10%"}}>
                <button type="button" className="btn btn-info btn-default btn-sm">确定</button>
              </div>
             </div>
          </fieldset>
        </form>
        {/* </UiValidate> */}
       </div>
      </div>
     <Commons/>
    </div>
   )
  }
});
export default MyInformation
