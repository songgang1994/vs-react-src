import React from 'react'
import Reflux from 'reflux'

import {OverlayTrigger, Tooltip, Popover} from 'react-bootstrap'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import TreeView from '../../../../../components/ui/TreeView.jsx'
import EasyPieChart from '../../../../../components/graphs/inline/EasyPieChart.jsx'
import AdminAction from '../actions/AdminAction.js'
import AdminStores from '../stores/AdminStores.js'



let AdminDetaile = React.createClass({
  mixins: [Reflux.connect(AdminStores)],
  getInitialState: function() {
    return {company: "", isAdd: false, updatepwd: false, firstIn: true}
  },
  showpwd: function() {
    this.setState({updatepwd: true})
  },
  toggleChange: function(type) {
    let state = {};
    state[type] = this.state[type];
    this.setState(state)
  },

  componentDidMount:function(){
    this._registerEventHandler();
  },
// 注册画面控件事件处理
_registerEventHandler: function() {
    let me = this;
  // 当表单提交时触发事件
    $("#btn-admin").click(function(event) {

        // 防止表单默认提交
        event.preventDefault();

        // 表单数据获取
        //姓名
        var name = $("#name").val().trim();
        //登录名
        var logname = $("#logname").val().trim();
        // 密码
        var password = $("#password").val().trim();
        // 确认密码
        var confirm_password = $("#confirm_password").val().trim();
        //备注
        var remark = $("#remark").val().trim();
       // 调用登录Action
        AdminDetailAction.reset(
          {
            name: name,
            logname: logname,
            password: password,
            confirm_password:confirm_password,
            remark: remark
          }
        );
    });
},



  render: function() {
    let title = this.state.isAdd
      ? <h2>新增</h2>
      : (this.state.firstIn
        ? <h2>新增</h2>
        : <h2>管理员信息</h2>)
    let name = this.state.firstIn
      ? <input id="name" type="text" className="form-control" placeholder="姓名" value={this.state.company.name}></input>
      : <input type="text" className="form-control" placeholder="姓名" value={this.state.company.name} onChange></input>;
    let username = this.state.isAdd
      ? <input  type="text" className="form-control" placeholder="登录名" value={this.state.company.loginname}/>
      : (this.state.firstIn
        ? <input id="logname" type="text" placeholder="登录名" className="form-control" value={this.state.company.loginname}/>
        : <input type="text" placeholder="登录名" className="form-control" value={this.state.company.loginname} disabled/>)
    let pwd = this.state.firstIn
      ? <input id="password" type="password" className="form-control" placeholder="密码" value={this.state.company.password}></input>
      : <input type="password" className="form-control" placeholder="密码" value={this.state.company.password} onChange={this.showpwd.bind(null)}></input>;
    let note = this.state.firstIn
      ? <textarea id="remark" type="text" rows="9" className="form-control" placeholder="备注" value={this.state.company.note} readonly/>
      : <textarea type="text" rows="9" className="form-control" placeholder="备注" value={this.state.company.note}/>
    let youxiao = this.state.company.flag == 1
      ? <input id="aaa" type="checkbox" name="checkbox" onChange checked/>
      : (this.state.isAdd
        ? <input  type="checkbox" name="checkbox"  checked onChange />
        : <input type="checkbox" name="checkbox" onChange={this.toggleChange.bind(null, 'valid')}/>)
    return (
      <div >
        <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
          <header>
            <span className="widget-icon">
              <i className="fa fa-bank"/>
            </span>
            {title}
          </header>
          <div className="col-sm-12 col-lg-12">
            <form id="smart-form-register" className="smart-form" noValidate="novalidate" onSubmit={this._onSubmit} style={{
              height: '600px'
            }}>
              <fieldset style={{
                paddingLeft: '3px',
                paddingRight: '5%',
                paddingTop: '1px'
              }}>
                <div className="row">
                  <section className="col col-sm-12">
                    <label className="label">姓名<span className="text-danger">&nbsp;*
                      </span>
                    </label>
                    <label className="input">
                      <i className="icon-append fa fa-user"/> {name}
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-user txt-color-teal"/>
                        &nbsp;请输入姓名</b>
                    </label>
                    <small></small>
                  </section>
                </div>
                <div className="row">
                  <section className="col col-sm-12">
                    <label className="label">登录名<span className="text-danger">&nbsp;*
                      </span>
                    </label>
                    <label className="input">
                      <i className="icon-append fa  fa-user"/> {username}
                      <b className="tooltip tooltip-top-right">
                        <i className="fa  fa-user txt-color-teal"/>
                        &nbsp;请输入登录名</b>
                    </label>
                    <small></small>
                  </section>
                </div>
                <div className="row">
                  <section className="col col-sm-12">
                    <label className="label">密码<span className="text-danger">&nbsp;*
                      </span>
                    </label>
                    <label className="input">
                      <i className="icon-append fa  fa-lock"/> {pwd}
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-lock txt-color-teal"/>
                        &nbsp;请输入密码</b>
                    </label>
                    <small></small>
                  </section>
                </div>
                <div className="row" style={{
                  display: (this.state.isAdd
                    ? 'block'
                    : (this.state.firstIn
                      ? 'block'
                      : 'none'))
                }}>
                  <section className="col col-sm-12">
                    <label className="label">确认密码<span className="text-danger">&nbsp;*
                      </span>
                    </label>
                    <label className="input">
                      <i className="icon-append fa  fa-lock"/>
                      <input id="confirm_password" type="password" className="form-control" placeholder="确认密码"></input>
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-lock txt-color-teal"/>
                        &nbsp;请再次输入密码</b>
                    </label>
                    <small></small>
                  </section>
                </div>
                <div className="row" style={{
                  display: (this.state.isAdd
                    ? 'none'
                    : (this.state.updatepwd
                      ? 'block'
                      : 'none'))
                }}>
                  <section className="col col-sm-12">
                    <label className="label">确认密码<span className="text-danger">&nbsp;*
                      </span>
                    </label>
                    <label className="input">
                      <i className="icon-append fa  fa-lock"/>
                      <input type="password" className="form-control" placeholder="确认密码"></input>
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-lock txt-color-teal"/>
                        &nbsp;请再次输入密码</b>
                    </label>
                    <small></small>
                  </section>
                </div>
                <div className="row" >
                  <section className="col col-sm-4">
                    <label className="toggle">是否有效
                      {youxiao}
                      <i data-swchon-text="是" data-swchoff-text="否"/></label>
                    <small></small>
                  </section>

                </div>
                <div className="row">
                  <section className="col col-sm-12">
                    <label className="textarea">
                      <i className="icon-append fa  fa-file-text"/> {note}
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-file-text txt-color-teal"/>
                        &nbsp;请填写备注</b>
                    </label>
                  </section>
                </div>
                <footer>
                  <button id="btn-admin" type="submit" className="btn btn-primary">
                    确定
                  </button>
                  <button className="btn btn-primary">
                    取消
                  </button>
                </footer>
              </fieldset>
            </form>

            {/* <form className="" style={{ height: '570px'}}>
                  <fieldset>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-0"></div>
                        <div className="col-sm-10">
                          <label >姓名</label>

                          {name}

                        </div>
                     </div>
                    </div>
                  <div className="form-group">
                    <div className="row">
                        <div className="col-sm-10">
                          <label >登录名</label>
                        <div >
                          {username}
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                        <div className="col-sm-10">
                          <label >密码</label>
                        <div >
                          {pwd}
                        </div>
                        </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row"  style={{display: (this.state.isAdd ?  'block':'none')}}>
                        <div className="col-sm-10">
                          <label >确认密码</label>
                        <div >
                          <input type="password" className="form-control" placeholder="确认密码"  ></input>
                        </div>
                        </div>
                    </div>
                    <div className="row"  style={{display: (this.state.isAdd ?  'none':(this.state.updatepwd ? 'block':'none'))}}>
                        <div className="col-sm-10">
                          <label >确认密码</label>
                        <div >
                          <input type="password" className="form-control" placeholder="确认密码"  ></input>
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                        <div className="col-sm-10">
                           <label >备注</label>
                        <div >
                           {note}
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                        <div className="col-sm-5 smart-form">
                          <label className="toggle">是否有效
                          <input type="checkbox" name="checkbox-toggle" defaultChecked onChange={this.toggleChange.bind(this, 'valid')}/>
                          <i data-swchon-text="是" data-swchoff-text="否"/></label>
                        </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                          <button type="submit" className="btn btn-primary">确定</button>
                        </div>
                        <div className="col-sm-2">
                          <button type="" className="btn btn-primary">取消</button>
                        </div>
                     </div>
                  </div>
                </fieldset>
                </form> */}
          </div>
        </JarvisWidget>
      </div>
    )
  }
});
export default AdminDetaile
