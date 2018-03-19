/**
 * 重置密码画面
 * Created by Xuwz on 2017/11/5.
 */
 // 导入React组件
import React from 'react'
import UiValidate from '../../../../components/forms/validation/UiValidate.jsx'
// 导入Action和Store
import ResetPwdAction from '../actions/ResetPwdAction'
import ResetPwdDBStore from '../stores/ResetPwdDBStore'
//导入共通函数
import VsUtil from '../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;
//验证密码格式
let passwordOptions = {
    // 输入密码框的check
    rules: {
       password: {
            required: true,
            minlength: 4,
            maxlength: 20
        },
        confirm_pwd: {
            required: true,
            minlength: 4,
            maxlength: 20,
            equalTo: '#password'
        },

    },
   // 对应弹出的消息
    messages: {
        password: {
            required: '请输入密码',
            minlength: '密码不得少于4个字符',
            maxlength: '密码不得超过20个字符'
        },
        confirm_pwd: {
            required: '请再次确认密码',
            minlength: '密码不得少于4个字符',
            maxlength: '密码不得超过20个字符',
            equalTo: '密码不一致，请重新输入！'
        },

      },
};

let ResetPwd = React.createClass({

  //画面渲染之后
  componentDidMount:function(){
      //画面控件绑定
      this._registerEventHandler();
      // 监听重置密码事件，当有返回值时，执行_onResetPwdStoreListen()
      this.unsubscribe = ResetPwdDBStore.listen(this._onResetPwdDBStoreListen);
   },

  componentWillUnmount: function() {
    // 解除对事件的监听
    this.unsubscribe();
  },
  // 表单验证
   _formValidate: function() {
      let pass = $("#login-form").valid();
      if ($("#password").val() == ""||$("#confirm_pwd").val() == "") {
          $("#password").addClass("vs-invalid").removeClass("vs-valid");
          $("#confirm_pwd").addClass("vs-invalid").removeClass("vs-valid");
          pass = false;
      }
      return pass;

    },

   // 注册画面控件事件处理
   _registerEventHandler: function() {
       let me = this;
       // 当表单提交时触发事件
      $("#submitButton").click(function(event) {

            // 防止表单默认提交
           event.preventDefault();
           // 表单验证未通过，中断执行
           if (!me._formValidate()) {
               return false;
           }

            // 表单数据获取
            // 密码
           let password = $("#password").val().trim();
            // 确认密码
           let confirm_pwd = $("#confirm_pwd").val().trim();

            // 调用重置密码Action
           ResetPwdAction.reset({
              allid:me.props.params.id,
              userType: me.props.params.userType,
              sign: me.props.params.sign,
              password: password,

          });
       });
     },

   //重置密码监听返回值的函数
   _onResetPwdDBStoreListen:function(result) {

        switch (result.data.bizCode) {
           //重置密码成功
           case config.API_BIZ_CODE.BIZ_CODE_UPDATE_SUCCESS:
                alert("密码修改成功！");
                // 跳转到登录页面
                location.href = "/#/login" ;
                break;
           //由于某种原因密码修改失败
           case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
                VsUtil.ShowHintDialog({content: UtilMsg.MsgPwd001});
                break;
           //重置密码链接不正确
           case config.API_BIZ_CODE.BIZ_CODE_LOGIN_AUTH_FAILED:
                VsUtil.ShowHintDialog({content: UtilMsg.MsgPwd});
                break;
         }
      },

  //画面渲染
  render: function() {
    // UiValidate在验证时默认会忽略掉隐藏的表单项，即options.ignore = ":hidden"
    // Select2组件会生成隐藏的<select>标签用于存放实际选择值
    // 所以此处将ignore设置成空字符串，不忽略任何元素
    let options = {
          ignore: ""
       };
    //let aaa= this.props.params.userType;
     return (
      <div id="extr-page">
        <header id="header" className="animated fadeInDown">
             <div id="logo-group">
               <span id="logo">
                  <img src="styles/img/logo.png" alt="SmartAdmin"/>
               </span>
             </div>
        </header>
        <div id="main" role="main" className="animated fadeInDown">
          <div id="content" className="container" style={{height: '80%',paddingBottom: '18%'  }}>
            <div className="row">
              <div>
                <div className="well no-padding col-md-offset-3" style={{width: '45%'}}>
                  <UiValidate options={passwordOptions}>
                    <form id="login-form" className="smart-form client-form">
                      <header>
                        重置密码
                      </header>
                      <fieldset>
                        <div style={{paddingBottom:'2%'}}>
                          <section >
                            <label className="input">
                              <i className="icon-append fa fa-lock"/>
                              <input id="password" type="password" name="password" data-smart-validate-input="" data-required=""  placeholder="密码"/>
                              <b className="tooltip tooltip-top-right"><i className="fa fa-lock txt-color-teal"/>
                                  &nbsp;请输入密码
                               </b>
                            </label>
                          </section>
                          <section >

                            <label className="input">
                              <i className="icon-append fa fa-lock"/>
                              <input id="confirm_pwd" type="password" name="confirm_pwd" data-smart-validate-input="" data-required=""  placeholder="确认密码"/>
                              <b className="tooltip tooltip-top-right"><i className="fa fa-lock txt-color-teal"/>
                                &nbsp;请再次输入密码
                              </b>
                            </label>
                          </section>
                        </div>
                      </fieldset>
                      <footer>
                        <button id="submitButton" className="btn btn-primary">
                          确定
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
export default ResetPwd
