import React from 'react'
import Reflux from 'reflux'
let StaffForm = React.createClass({
  getInitialState: function() {
    return {staff:""}
  },
  componentDidMount: function() {
    // 画面控件事件绑定

    this._registerEventHandler();
  },
  _registerEventHandler: function() {},
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.staff != null) {
      this.setState({"staff": nextProps.staff});
    }else{
      nextProps.staff = ""
    }
  },
  //自动生成密码开启与关闭事件
  _toggleChange: function(type) {
    let state = {};
    state[type] = !this.state[type];
    this.setState(state)
  },
  render: function() {
    let src = this.state.staff.staffImg
    return (
      <form id="smart-form-register" className="smart-form ">
        <fieldset style={{
          padding: '0%'
        }}>
          <div className="row">
            <input type="reset" name="reset" style={{display:"none"}} />
            <section className="col col-6">
              <label className="label">用户ID<span className="text-danger">&nbsp;*
                </span>
              </label>
              <label className="input">
                <i className="icon-append fa  fa-user"/>
                <input type="text" className="form-control" name="staffUid" placeholder="用户ID" id="staffUid" value={this.state.staff.staffUid}/>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-user txt-color-teal"/>
                  &nbsp;请输入用户ID</b>
              </label>
            </section>
            <section className="col col-6">
              <label className="label">姓名
                <span className="text-danger">&nbsp;*
                </span>
              </label>
              <label className="input">
                <i className="icon-append fa  fa-user"/>
                <input type="text" className="form-control" placeholder="姓名" name="staffName" id="staffName" value={this.state.staff.staffName}/>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-user txt-color-teal"/>
                  &nbsp;请输入姓名</b>
              </label>
            </section>
          </div>
          <div className="row">
            <section className="col col-6">
              <label className="label">登录名</label>
              <label className="input">
                <i className="icon-append fa  fa-user"/>
                <input type="text" className="form-control" placeholder="登录名" id="staffLoginaccount" name="staffLoginaccount" value={this.state.staff.staffLoginaccount} disabled/>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-user txt-color-teal"/>
                  &nbsp;请输入登录名</b>
              </label>
            </section>
            <section className="col col-6">
              <label ></label>
              <p></p>

            </section>
          </div>
          <div className="row" id="pass" style={{
            display: 'block'
          }}>
            <section className="col col-6">
              <label className="label">密码</label>
              <label className="input">
                <i className="icon-append fa  fa-lock"/>
                <input type="password" className="form-control" placeholder="密码" id="staffLoginpassword" name="staffLoginpassword" value={this.state.staff.staffLoginpassword}></input>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-lock txt-color-teal"/>
                  &nbsp;请输入密码</b>
              </label>
            </section>
            <section className="col col-6">
              <label className="label">确认密码</label>
              <label className="input">
                <i className="icon-append fa  fa-lock"/>
                <input type="password" className="form-control" placeholder="确认密码"></input>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-lock txt-color-teal"/>
                  &nbsp;请再次输入密码</b>
              </label>
            </section>
          </div>
          <div className="row" id="pswd" style={{
            display: 'none'
          }}>
            <section className="col col-4 smart-form">
              <label></label>
              <label className="toggle">自动生成密码
                <input type="checkbox" name="checkbox-toggle" id="toggleChange" onClick={this._toggleChange.bind(this, "passwordSection")}/>
                <i data-swchoff-text="是" data-swchon-text="否"/></label>
            </section>
            <section className="col col-2"></section>
            <section className="col col-6" id="style" style={{
              display: (this.state.passwordSection
                ? 'block'
                : 'none')
            }}>
              <label className="label">密码</label>
              <label className="input">
                <i className="icon-append fa  fa-lock"/>
                <input type="password" className="form-control" placeholder="密码" id="staffLoginpassword"></input>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-lock txt-color-teal"/>
                  &nbsp;请输入密码</b>
              </label>
            </section>

          </div>
          <div className="row">
            <section className="col col-6">
              <label className="label">手机号
              </label>
              <label className="input">
                <i className="icon-append fa  fa-phone"/>
                <input type="text" className="form-control" placeholder="手机号" id="staffCellphone" name="staffCellphone" value={this.state.staff.staffCellphone}></input>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-phone txt-color-teal"/>
                  &nbsp;请输入手机号</b>
              </label>
            </section>
            <section className="col col-6">
              <label className="label">邮箱<span className="text-danger">&nbsp;*
                </span>
              </label>
              <label className="input">
                <i className="icon-append fa  fa-envelope"/>
                <input type="text" className="form-control" placeholder="邮箱" id="staffMail" name="staffMail" value={this.state.staff.staffMail}></input>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-envelope txt-color-teal"/>
                  &nbsp;请输入邮箱地址</b>
              </label>
            </section>
          </div>
          <div className="row">
            <section className="col col-6">
              <label className="label">所属部门</label>
              <label className="input">
                <i className="icon-append fa  fa-user"/>
                <input type="text" className="form-control" placeholder="所属部门"></input>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-user txt-color-teal"/>
                  &nbsp;请选择所属部门</b>
              </label>
            </section>
            <section className="col col-6">
              <label className="label">角色</label>
              <label className="input">
                <i className="icon-append fa  fa-user"/>
                <input type="text" className="form-control" placeholder="角色"></input>
                <b className="tooltip tooltip-top-right">
                  <i className="fa  fa-user txt-color-teal"/>
                  &nbsp;请选择角色</b>
              </label>
            </section>
          </div>
          <div className="row">
            <section className="col col-6">
              <label className="label">头像<span className="text-danger">&nbsp;*
                </span>
              </label>
              <img id="pic" src={src} name="src" width="135px" height="180px"/>
              <input id="upload" name="file" accept="image/*" type="file" style={{
                "display": "none"
              }}/>
            </section>
            <section className="col col-6">
              <label className="label">备注</label>
              <label className="textarea">
                <i className="icon-append fa fa-file-text"/>
                <textarea type="input" id="memo" name="remarks" className="form-control help-block m-b-none" name="memo" value={this.state.staff.memo} placeholder="备注" rows="10"/>
                <b className="tooltip tooltip-top-right">
                  <i className="fa fa-file-text txt-color-teal"/>
                  &nbsp;请填写备注</b>
              </label>
            </section>
          </div>
        </fieldset>
      </form>
    )
  }
});

export default StaffForm
