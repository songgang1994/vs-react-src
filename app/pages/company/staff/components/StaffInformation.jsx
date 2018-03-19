/**
 * 员工一览画面
 * Created by Xuwz on 2017/11/16.
 */
 // 导入React组件
import React from 'react'
// 导入Action和Store
import StaffInformationAction from '../actions/StaffInformationAction'
import StaffInformationStore from '../stores/StaffInformationStore'

//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

// ----------------------- 引用组件 ------------------------------ //
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'

// ----------------------- 引用Store --------------------- //

let StaffInformation = React.createClass({
  getInitialState: function() {
    return {
        Upload: "",
        staffId:"",
        originalStaff:[],
        staff:[],
        submitAble: false
    }
  },

  // 画面渲染之前
  componentWillMount: function() {
    //获取想要的员工id
    let staffId = JSON.parse(localStorage.getItem('user')).staffId;
    //调用员工一览的Action
    StaffInformationAction.staff(staffId);
  },
  // 画面渲染之后
  componentDidMount: function() {
    //画面控件绑定
    this._registerEventHandler();
    //  监听员工信息获取事件，当获取到员工信息时，执行_onStaffInformationDone()
    this.unsubscribe = StaffInformationStore.listen(this._onStaffInformationDone);
  },

  componentWillUnmount: function() {
    // 解除对员工信息获取事件的监听
    this.unsubscribe();
  },

  // 注册画面控件事件处理
  _registerEventHandler: function() {

  },
  _onStaffInformationDone: function(result) {
    let newStaff = result.listData[0];
    //将读取的数据，绑定到画面显示的对象上
    this.setState({"staff": newStaff});
    //复制一份，绑定到对比对象上， 一定要复制！复制！复制！ 不能直接绑定
    this.setState({"originalStaff": _.extend({}, newStaff)});
  },

  render: function() {

    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
            <header>
              <span className="widget-icon">
                <i className="fa fa-table"/>
              </span>
              <h2>个人信息</h2>
            </header>
            <div>
              <div className="widget-body">
                <form id="smart-form-register" className="smart-form " style={{
                  height: '670px'
                }}>
                  <fieldset style={{
                    padding: '0%'
                  }}>
                    <div className="row">
                      <section className="col col-6">
                        <label className="label">用户ID<span className="text-danger">&nbsp;*
                          </span>
                        </label>
                        <label className="input">
                          <i className="icon-append fa  fa-user"/>
                          <input type="text" className="form-control" placeholder="用户ID" value={this.state.staff.staffUid} disabled/>
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
                          <input type="text" className="form-control" placeholder="姓名" value="刘伟" disabled/>
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
                          <input type="text" className="form-control" placeholder="登录名" value="liuwei@Softwise.com" disabled/>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa  fa-user txt-color-teal"/>
                            &nbsp;请输入登录名</b>
                        </label>
                      </section>
                      <section className="col col-6">
                        <label ></label>
                        <p></p>
                        <p>若不设置，则默认邮箱地址为登录名。</p>
                      </section>
                    </div>
                    <div className="row">
                      <section className="col col-6">
                        <label className="label">密码</label>
                        <label className="input">
                          <i className="icon-append fa  fa-lock"/>
                          <input type="password" className="form-control" placeholder="密码" value="123456"></input>
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
                    <div className="row">
                      <section className="col col-6">
                        <label className="label">手机号
                        </label>
                        <label className="input">
                          <i className="icon-append fa  fa-phone"/>
                          <input type="text" className="form-control" placeholder="手机号" value="188-5141-1111"></input>
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
                          <input type="text" className="form-control" placeholder="邮箱" value="liuwei@Softwise.com"></input>
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
                          <input type="text" className="form-control" placeholder="所属部门" value="人事部" disabled></input>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa  fa-user txt-color-teal"/>
                            &nbsp;请选择所属部门</b>
                        </label>
                      </section>
                      <section className="col col-6">
                        <label className="label">角色</label>
                        <label className="input">
                          <i className="icon-append fa  fa-user"/>
                          <input type="text" className="form-control" placeholder="角色" value="普通员工" disabled></input>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa  fa-user txt-color-teal"/>
                            &nbsp;请选择角色</b>
                        </label>
                      </section>
                    </div>
                    <div className="row">
                      <section className="col col-6">
                        <label className="label">头像</label>
                        <div ><img src="styles/img/demo/toxiang1.png" height="182" width="130" id="imgs"/></div>
                        <input className="selectbtn" name="files" id="files" multiple="multiple" style={{
                          visibility: "hidden",
                          width: '0',
                          height: '0',
                          opacity: '0'
                        }} type="file"/>
                      </section>
                      <section className="col col-6">
                        <label className="label">备注</label>
                        <label className="input">
                          <textarea rows="10" name="info" placeholder="备注" className="form-control"/>
                        </label>
                      </section>
                    </div>
                  </fieldset>
                  <footer>
                    <button type="submit" className="btn btn-primary">
                      保存
                    </button>
                    <button type="button" className="btn btn-primary">
                      取消
                    </button>
                  </footer>
                </form>
              </div>
            </div>
          </JarvisWidget>
        </div>
        <div className="col-sm-2"></div>

      </div>
    )
  }
});

export default StaffInformation
