/**
 * 找回密码画面
 * Created by Xuwz on 2017/11/3.
 */
 // 导入React组件
import React from 'react'
 // 导入共通组件
import UiValidate from '../../../../components/forms/validation/UiValidate.jsx'
import Select2 from '../../../../components/forms/inputs/Select2.jsx'
 //导入共通函数
import VsUtil from '../../../../app/com/vs-util';
 // 导入Action和Store
import FindPwdAction from '../actions/FindPwdAction'
import FindPwdStore from '../stores/FindPwdStore'
 //共通配置参数
let config = window.SMARTADMIN_GLOBALS;
 //消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;


//验证邮箱格式
let fpwOptions = {
     rules : {
        email : {
             required : true,
             email : true
         },
      },
     messages : {
        email : {
             required : '请输入您的邮箱!',
             email : '请输入有效的邮箱地址！'
         },

     }
};

let FindPwd = React.createClass({
    getInitialState: function () {
      return {
        email: localStorage.getItem("email"),
      }
    },
    // 画面渲染之后
    componentDidMount:function(){
       // 1.画面控件事件绑定
       this._registerEventHandler();
       // 2.监听找回密码事件，当有返回值时，执行_onFindPwdStoreListen()
       this.unsubscribe = FindPwdStore.listen(this._onFindPwdStoreListen);
    },

    componentWillUnmount: function() {
        // 解除对事件的监听
        this.unsubscribe();

    },

    // 表单验证
     _formValidate: function() {
        let pass = $("#login-form").valid();
        if ($("#sel-user-type").val() == "") {
            $("#div-user-type").addClass("vs-invalid").removeClass("vs-valid");
            pass = false;
        }
        return pass;

      },

     // 注册画面控件事件处理
    _registerEventHandler: function() {
        $("#sel-user-type").change(function(){
           // 取消下拉边框红色错误情况
           $("#div-user-type").removeClass("vs-invalid");
        }).change();
        let me = this;
        // 当表单提交时触发事件
        $("#btn-fpw").click(function(event) {
            // 防止表单默认提交
           event.preventDefault();
           // 表单验证未通过，中断执行
           if (!me._formValidate()) {
               return false;
           }
           // 表单数据获取
           //用户类型
          let userType = $("#sel-user-type").val();
           // 邮箱
          let email = $("#email").val().trim();
          // 调用找回密码Action
          FindPwdAction.find(
              {
                 userType:userType,
                 email: email,
              }
           );
         });
    },

    _onFindPwdStoreListen:function(result) {
      switch (result.data.bizCode) {
        case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
           //邮箱找回成功
            VsUtil.ShowHintDialog({content: UtilMsg.Msgmail});
            break;
        case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
            //未找到对应的邮箱地址
            VsUtil.ShowHintDialog({content: UtilMsg.Msg000});
            break;
        case config.API_BIZ_CODE.BIZ_CODE_INVALID_PARAMS:
            //当参数检测为空时
            VsUtil.ShowHintDialog({content: UtilMsg.Msgfail});
            break;
      };
    },
   //画面渲染
   render: function() {
      let options = {
          ignore: ""
       }
      return (
        <div id="extr-page">
          <header id="header" className="animated fadeInDown">
              <div id="logo-group">
                  <span id="logo"> <img src="styles/img/logo.png" alt="Face360 Visitor System"/> </span>
              </div>
              <span id="extr-page-header-space"> <span className="hidden-mobile hiddex-xs">需要一个帐号?</span>&nbsp;<a href="#/register" className="btn btn-danger">注册帐号</a> </span>
          </header>
          <div id="main" role="main" className="animated fadeInDown">
            <div id="content" className="container" style={{height: '80%',  paddingBottom: '18%' }}>
              <div className="row">
                <div>
                  <div className="well no-padding col-md-offset-3" style={{width: '45%'}}>
                    <UiValidate options={fpwOptions}>
                      <form id="login-form" className="smart-form client-form">
                        <header>
                          找回密码
                        </header>
                        <fieldset>
                            <div style={{paddingBottom: '2%'  }}>
                              <section>
                                  <label className="label">
                                     {/* 请选择您的用户类型，并 */}
                                     输入注册邮箱
                                     <br/>
                                     我们将给您发送链接用于重置密码
                                  </label>

                                   <label className="select"> <i className="icon-append fa fa-user"/>
                                    <div id='div-user-type'>
                                     <Select2 id="sel-user-type" multiple={false} style={{width: '100%'}} data-select-search="false" data-language="zh-CN" data-minimum-results-for-search="Infinity" data-placeholder="请选择您的登录用户类型"  name="usertype" defaultValue="" data-smart-validate-input="" data-required="" data-message-required="">
                                        <option value=""></option>
                                        <option value="agent">代理</option>
                                        <option value="company-admin">公司管理员</option>
                                        <option value="company-depart-leader">公司部门领导</option>
                                        <option value="company-receptionist">公司接待</option>
                                        <option value="company-staff">公司员工</option>
                                     </Select2>
                                   </div>
                                  </label>
                              </section>
                            </div>
                            <section >
                              <label className="input">
                                <i className="icon-append fa fa-envelope"/>
                                <input id="email" type="text" name="email" data-smart-validate-input=""  placeholder="邮箱"/>
                                <b className="tooltip tooltip-top-right"><i className="fa fa-envelope"/>
                                　　&nbsp;请输入邮箱
                              　</b>
                              </label>
                            </section>

                        </fieldset>
                        <footer>
                          <button id="btn-fpw" className="btn btn-primary">
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

export default FindPwd
