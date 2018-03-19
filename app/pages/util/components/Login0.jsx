/**
 * 登录画面
 * Created by shaolj on 2017/11/2.
 */

// 导入React组件
import React from 'react'

//导入共通函数
import VsUtil from '../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

// 导入共通组件
import UiValidate from '../../../../components/forms/validation/UiValidate.jsx'
import Select2 from '../../../../components/forms/inputs/Select2.jsx'
// 导入Action和Store
import LoginAction from '../actions/LoginAction'
import LoginStore from '../stores/LoginStore'
import CompanyStore from '../stores/CompanyStore'

let Login = React.createClass({
    // 初始化函数执行顺序依次为
    //  1. getInitialState
    //  2. componentWillMount
    //  3. render
    //  4. componentDidMount
    // 画面数据更新执行
    //  1. componentWillReceiveProps(nextProps)
    //  2. shouldComponentUpdate(nextProps, nextState)
    //  3. componentWillUpdate(object nextProps, object nextState)
    //  4. render
    //  5. componentDidUpdate(object prevProps, object prevState)
    // 画面卸载执行
    //  1. componentWillUnmount
    // 其他自定义函数前面统一加_

    // 自动绑定
    // mixins: [Reflux.connect(LoginStore)],
    // 画面初始state生成
    getInitialState: function () {
        return {
            //登录用户名
            loginName: localStorage.getItem("loginName"),
            //登录密码
            loginPassword: ""
        }
    },
    // 画面渲染之后
    componentDidMount: function() {
        // 1. 画面控件事件绑定
        this._registerEventHandler();
        this.unsubscribeLogin = LoginStore.listen(this._onLoginSuccess);
    },
    componentWillUnmount: function() {
        // 2. 解除对登录成功事件的监听
        this.unsubscribeLogin();
    },
    // 表单验证
    _formValidate: function() {
        let pass = $("#form-login").valid();
        if ($("#sel-user-type").val() == "") {
            $("#div-user-type").addClass("vs-invalid").removeClass("vs-valid");
        }
        return pass;
    },
    // 注册画面控件事件处理
    // 事件统一通过jQuery绑定
    // 不要在HTML标签中写onXXX={this.XXX}
    _registerEventHandler: function() {
        let me = this;

        // 当表单提交时触发事件
        $("#btn-login").click(function(event) {

            // 防止表单默认提交
            event.preventDefault();

            // 表单验证未通过，中断执行
            if (!me._formValidate()) {
                return false;
            }

            // 表单数据获取
            // 用户类型
            //var userType = $("#sel-user-type").val();
            // 公司ID
            var companyId = "1";
            // 登录用户名
            var loginName = $("#txt-login-name").val().trim();
            // 登录密码
            var loginPassword = $("#login-password").val().trim();

            let userType ;
            if(loginName == "admin"){
              userType = "company-admin0";
            }else if(loginName == "depart"){
              userType = "company-depart-leader0";
            }else if(loginName == "staff"){
              userType = "company-staff0";
            }else if(loginName == "recp"){
              userType = "company-receptionist0";
            }

            // 调用登录Action
            LoginAction.login({
                userType: userType,
                companyId: 1,
                loginName: loginName,
                loginPassword: loginPassword
            });
        });
    },

    _onLoginSuccess: function(result) {
      // 各种用户类型所对应的Entity的[用户姓名字段]的名称
      // 比如当用户类型是Agent时，成功登录后从服务器返回的user是AgentEntity, user.agentName就是该用户的真实姓名
      let realnameMapper = {
        'agent': 'agentName',
        'company-admin0': 'staffName',
        'company-depart-leader0': 'staffName',
        'company-receptionist0': 'staffName',
        'company-receptionist0': 'staffName',
        'company-staff0': 'staffName',
        'platform-admin0': 'adminName'
      }
      switch (result.data.bizCode) {
        case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
          let user = result.data;
          // 是否记住登录状态
          let keepLogin = $("input[name='remember']").prop("checked")
          var loginName = $("#txt-login-name").val().trim();
          let userType ;
          if(loginName == "admin"){
            userType = "company-admin0";
          }else if(loginName == "depart"){
            userType = "company-depart-leader0";
          }else if(loginName == "staff"){
            userType = "company-staff0";
          }else if(loginName == "recp"){
            userType = "company-receptionist0";
          }

          // 成功登录后，向localStorage中写入信息
          localStorage.setItem('isLogin', keepLogin.toString());
          localStorage.setItem("loginName", $("#txt-login-name").val());
          localStorage.setItem('userType', userType);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('name', user[realnameMapper[userType]]);

          // 跳转到当前用户首页
          location.href = "/#/redirect/" + userType;
          break;
        case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
          VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
          break;
        case config.API_BIZ_CODE.BIZ_CODE_LOGIN_AUTH_FAILED:
          VsUtil.ShowHintDialog({content: UtilMsg.Msg002});
          break;
      }

    },
    // 画面渲染
    render: function () {
        // UiValidate在验证时默认会忽略掉隐藏的表单项，即options.ignore = ":hidden"
        // Select2组件会生成隐藏的<select>标签用于存放实际选择值
        // 所以此处将ignore设置成空字符串，不忽略任何元素
        let options = {
            ignore: ""
        };
        return (
            <div id="extr-page" >
                <header id="header" className="animated fadeInDown">
                    <div id="logo-group">
                        <span id="logo"> <img src="styles/img/logo.png" alt="Face360 Visitor System"/> </span>
                    </div>
                    <span id="extr-page-header-space"> <span className="hidden-mobile hiddex-xs">需要一个帐号?</span>&nbsp;<a href="#/register" className="btn btn-danger">注册帐号</a> </span>
                </header>
                <div id="main" role="main" className="animated fadeInDown">
                    <div id="content" className="container">
                        <div className="row col-sm-offset-3 col-sm-6">
                              <div>
                                <div className="well no-padding">
                                    <UiValidate options={options}>
                                    <form id="form-login" className="smart-form client-form">
                                        <header style={{textAlign:"center"}}>
                                            <h1>装甲兵工程学院-来访系统</h1>
                                        </header>

                                        <fieldset>

                                            <section>
                                                <label className="label">登录用户名</label>
                                                <label className="input"> <i className="icon-append fa fa-user"/>
                                                    <input id="txt-login-name" type="text" name="username" data-smart-validate-input="" data-required="" data-message-required="请输入您的登录用户名" />
                                                    <b className="tooltip tooltip-top-right"><i className="fa fa-user txt-color-teal"/>
                                                        请输入登录用户名</b></label>
                                            </section>

                                            <section>
                                                <label className="label">登录密码</label>
                                                <label className="input"> <i className="icon-append fa fa-lock"/>
                                                    <input id="login-password" type="password" name="password" data-smart-validate-input="" data-required="" data-message="请输入您的登录密码"/>
                                                    <b className="tooltip tooltip-top-right"><i className="fa fa-lock txt-color-teal"/> 请输入登录密码</b> </label>
                                                <div className="note">
                                                    <a href="/#/findpwd" >忘记密码?</a>
                                                </div>
                                            </section>

                                            <section>
                                                <label className="checkbox">
                                                    <input type="checkbox" name="remember" defaultChecked={false}/>
                                                    <i/>保存登录信息</label>
                                            </section>
                                        </fieldset>
                                        <footer>
                                            <button id="btn-login" className="btn btn-primary">
                                                登  录
                                            </button>
                                        </footer>
                                    </form>
                                  </UiValidate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Login
