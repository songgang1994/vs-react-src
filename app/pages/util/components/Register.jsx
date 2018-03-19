/**
* 注册页面
* Created by ninglong on 2017/11/6.
**/
//导入React组件
import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
//导入共通函数
import UiValidate from '../../../../components/forms/validation/UiValidate.jsx'
import LoadHtml from '../../../../components/utils/LoadHtml.jsx'
import Select2 from '../../../../components/forms/inputs/Select2.jsx'
import VsUtil from '../../../../app/com/vs-util'
//导入Action和Store
import RegisterAction from '../actions/RegisterAction'
import SearchCompanyListStore from '../stores/SearchCompanyListStore'
import SearchDepartListStore from '../stores/SearchDepartListStore'
import SearchRoleListStore from '../stores/SearchRoleListStore'
import StaffRegisterDBStore from '../stores/StaffRegisterDBStore'
//共通配置参数
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let StaffMsg = window.MSG_GLOBALS.StaffEnroll;

//表单提交前的验证配置
let validationOptions = {
  // 改变提示字体样式，默认为斜体，改正常规
  errorElement: "samp",
  //表单提交前的验证规则
  rules: {
    staffCellphone: {
      required: true,
      rangelength: [11, 11]
    },
    staffUid: {
      required: true
    },
    staffName: {
      required: true
    },
    passwordd: {
      required: true
    },
    passwords: {
      required: true,
      equalTo: "#staffLoginpassword"
    },
    contactsMail: {
      required: true,
      email: true
    }
  },
  //表单验证的message
  messages: {
    staffCellphone: {
      required: "手机号必须填写",
      rangelength: "手机号为十一位"
    },
    staffUid: {
      required: "用户ID必须填写"
    },
    staffName: {
      required: "请填写您的姓名"
    },
    passwordd: {
      required: "请填写密码"
    },
    passwords: {
      required: "请确认密码",
      equalTo: "两次密码输入不一致"
    },
    contactsMail: {
      required: "请填写邮箱地址",
      email: "邮箱地址格式不正确"
    }
  }
};

let Register = React.createClass({
  //页面初始state生成
  getInitialState: function() {
    return {
      companyId: "",
      Upload: "",
      conditions: "",
      companySelect: "",
      staffLonginaccount: "",
      result: ""
    }
  },

  componentDidMount: function() {
    //画面控件事件绑定
    this._registerEventHandler();
    //绑定公司列表事件的监听
    this.unsubscribe = SearchCompanyListStore.listen(this._onSearchCompanyDone);
    //绑定部门列表事件的监听
    this.departUs = SearchDepartListStore.listen(this._onRegisterEqDone);
    //绑定角色列表事件的监听
    this.roleus = SearchRoleListStore.listen(this._onRegisterRoDone);
    //绑定提交表单的事件监听
    this.Enroll = StaffRegisterDBStore.listen(this._onStaffEnrollListen);
    // 获取公司列表
    RegisterAction.searchCompany();
  },
  componentWillUnmount: function() {
    // 解除对公司列表获取事件的监听
    this.unsubscribe();
    this.departUs();
    this.roleus();
    this.Enroll();
  },
  //公司列表选择验证
  companySelet: function() {
    //获取到当前列表的ID
    var companySelet = $('#sel-company').val();
    //判断是否是空
    if (companySelet == "") {
      var companySelect = "请选择公司"
      this.setState({companySelect: companySelect});
      //表单验证
      if (!this._formValidate()) {
        return false;
      };
      return false;
    } else {
      var companySelect = ""
      this.setState({companySelect: companySelect});
      if (!this._formValidate()) {
        return false;
      };
    }
  },

  _registerEventHandler: function() {
    let me = this;
    //头像选择
    $("#pic").click(function() {
      $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
      $("#upload").on("change", function() { //获取input的值
        if ($("#upload")[0].files.length) { //判断input的长度
          var file = $("#upload")[0].files[0];
          var reader = new FileReader(); //new一个FileReader实例
          if (/image+/.test(file.type)) { //判断文件是不是imgage类型
            reader.onload = function() {
              var Upload = this.result;
              //设置图片
              me.setState({Upload: Upload});
            }
            reader.readAsDataURL(file);
          }
        }
        var objUrl = me.getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
          $("#pic").attr("src", objUrl); //将图片路径存入src中，显示出图片
        }
      });
    });

    //注册点击事件
    $('#submit').click(function(event) {
      // 防止默认事件
      event.preventDefault();
      //公司列表验证
      me.companySelet();
      // 表单验证未通过，中断执行
      if (!$('#terms').is(':checked')) {
        var conditions = "请查看条款和条件并同意"
        me.setState({conditions: conditions});
        if (!me._formValidate()) {
          return false;
        };
        return false;
      } else {
        var conditions = ""
        me.setState({conditions: conditions});
        if (!me._formValidate()) {
          return false;
        };
      }

      //获取form表单的值
      var companyId = $('#sel-company').val();
      var departId = $('#sel-depart').val();
      var roleId = $('#sel-roleId').val();
      var staffLoginaccount = $('#staffLoginaccount').val();
      var staffLoginpassword = $('#staffLoginpassword').val();
      var staffUid = $('#staffUid').val();
      var staffName = $('#staffName').val();
      var staffMail = $('#staffMail').val();
      var staffCellphone = $('#staffCellphone').val();
      var checkuserid = $('#sel-checkuserid').val();
      //判断登录名是否为空
      if (staffLoginaccount == "") {
        //email赋值给登录名
        staffLoginaccount = staffMail;
      }
      //抽取一个对象
      var register = {
        companyId: companyId,
        departId: departId,
        roleId: roleId,
        staffLoginaccount: staffLoginaccount,
        staffLoginpassword: staffLoginpassword,
        staffUid: staffUid,
        staffName: staffName,
        staffMail: staffMail,
        staffCellphone: staffCellphone,
        staffImg: me.state.Upload,
        checkuserid: checkuserid
      }
      //调用RegisterAction
      RegisterAction.register(register);
    });
    //根据公司ID获取部门列表
    $("#sel-company").on("change", function() {
      var companyId = $('#sel-company').val();
      if (companyId != "") {
        //调用RegisterAction
        RegisterAction.registerEq(companyId);
      }
    });
    //根据公司ID获取角色列表
    $("#sel-company").on("change", function() {
      var companyId = $('#sel-company').val();
      if (companyId != "") {
        RegisterAction.searchRole(companyId);
      }
    });
  },
  //创建一个虚拟的url
  getObjectURL: function(file) {
    //声明一个空的url
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  },
  //表单验证
  _formValidate: function() {
    let pass = $("#forms").valid();
    return pass;
  },
  //给公司列表赋值
  _onSearchCompanyDone: function(data) {
    data.companies.forEach(function(company, index) {
      $("#sel-company").append(new Option(company.companyName, company.companyId)).trigger('change');
    })
  },
  //给部门列表赋值
  _onRegisterEqDone: function(data) {
    data.depart.forEach(function(depart, index) {
      $("#sel-depart").append(new Option(depart.departName, depart.departId)).trigger('change');
    })
  },
  //给角色列表赋值
  _onRegisterRoDone: function(data) {
    data.role.forEach(function(role, index) {
      $("#sel-roleId").append(new Option(role.roleName, role.roleId)).trigger('change');
    })
  },
  _onStaffEnrollListen: function(result) {
    switch(result.data.bizCode){
      //注册成功Msg
      //注册成功后页面跳转
        case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
          VsUtil.ShowHintDialog({content: StaffMsg.Msg001});
          window.location.href = "/#/login";
        break;
        //注册失败
        case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
          VsUtil.ShowHintDialog({content: StaffMsg.Msg002});
          break;
        }
  },
  render: function() {
    return (
      <div id="extr-page">
        <header id="header" className="animated fadeInDown">
          <div id="logo-group">
            <span id="logo">
              <img src="styles/img/logo.png" alt="SmartAdmin"/>
            </span>
          </div>
          <span id="extr-page-header-space">
            <span className="hidden-mobile hiddex-xs">已经注册过?</span>&nbsp;<a href="#login" className="btn btn-danger">登录</a>
          </span>
        </header>
        <div id="main" role="main" className="animated fadeInDown">
          <div id="content" className="container">
            <div className="row">
              <div className="col-sm-2 col-md-2"></div>
              <div className="col-sm-8 col-sm-8">
                <div className="well no-padding">
                  <UiValidate options={validationOptions}>
                    <form id="forms" className="smart-form client-form">
                      <header>
                        公司员工注册
                      </header>
                      <fieldset>
                        <section>
                          <label className="label">选择公司<span className="text-danger">&nbsp;*
                            </span>
                          </label>
                          <label className="select">
                            <div id="div-company">
                              <Select2 multiple={false} style={{
                                width: '100%'
                              }} data-select-search="true" data-language="zh-CN" data-placeholder="请选择您的公司" id="sel-company" defaultValue="" name="company">
                                <option value=""></option>
                              </Select2>
                            </div>
                          </label>
                          <label>
                            <p style={{
                              color: "red"
                            }}>{this.state.companySelect}</p>
                          </label>
                        </section>
                        <div className="row">
                          <section className="col col-6">
                            <label className="label">用户ID<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <label className="input">
                              <i className="icon-append fa  fa-user"/>
                              <input type="text" id="staffUid" name="staffUid" className="form-control" placeholder="用户ID"/>
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
                              <input type="text" id="staffName" name="staffName" className="form-control" placeholder="姓名"/>
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
                              <input type="text" id="staffLoginaccount" className="form-control" placeholder="登录名"/>
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
                            <label className="label">密码<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <label className="input">
                              <i className="icon-append fa  fa-lock"/>
                              <input type="password" id="staffLoginpassword" name="passwordd" className="form-control" placeholder="密码"></input>
                              <b className="tooltip tooltip-top-right">
                                <i className="fa  fa-lock txt-color-teal"/>
                                &nbsp;请输入密码</b>
                            </label>
                          </section>
                          <section className="col col-6">
                            <label className="label">确认密码<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <label className="input">
                              <i className="icon-append fa  fa-lock"/>
                              <input type="password" id="staffLoginpasswords" name="passwords" className="form-control" placeholder="确认密码"></input>
                              <b className="tooltip tooltip-top-right">
                                <i className="fa  fa-lock txt-color-teal"/>
                                &nbsp;请再次输入密码</b>
                            </label>
                          </section>
                        </div>
                        <div className="row">
                          <section className="col col-6">
                            <label className="label">手机号<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <label className="input">
                              <i className="icon-append fa  fa-phone"/>
                              <input type="text" id="staffCellphone" name="staffCellphone" className="form-control" placeholder="手机号"></input>
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
                              <input type="text" id="staffMail" name="contactsMail" className="form-control" placeholder="邮箱"></input>
                              <b className="tooltip tooltip-top-right">
                                <i className="fa  fa-envelope txt-color-teal"/>
                                &nbsp;请输入邮箱地址</b>
                            </label>
                          </section>
                        </div>
                        <div className="row">
                          <section className="col col-6">
                            <label className="label">所属部门<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <label className="select">
                              <div id="div-depart">
                                <Select2 multiple={false} style={{
                                  width: '100%'
                                }} data-select-search="true" data-language="zh-CN" data-placeholder="请选择您的部门" id="sel-depart" defaultValue="" name="depart">
                                  <option value=""></option>
                                </Select2>
                              </div>
                            </label>
                          </section>
                          <section className="col col-6">
                            <label className="label">角色<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <label className="select">
                              <div id="div-roleId">
                                <Select2 multiple={false} style={{
                                  width: '100%'
                                }} data-select-search="true" data-language="zh-CN" data-placeholder="请选择您的角色" id="sel-roleId" defaultValue="" name="roleId">
                                  <option value=""></option>
                                </Select2>
                              </div>
                            </label>
                          </section>
                        </div>
                        <div className="row">
                          <section className="col col-3">
                            <label className="label">头像<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <img id="pic" src="" width="135px" height="180px"/>
                            <input id="upload" name="file" accept="image/*" type="file" style={{
                              "display": "none"
                            }}/>
                          </section>
                          <section className="col col-3">
                            <h5><br/>
                              <br/>请上传一张您的照片,<br/>
                              这张照片将用于人脸签到,<br/>
                              请保证五官清晰。
                            </h5>
                          </section>
                          <section className="col col-6">
                            <label className="label">审批人<span className="text-danger">&nbsp;*
                              </span>
                            </label>
                            <label className="select">
                              <div id="div-checkuserid">
                                <Select2 multiple={false} style={{
                                  width: '100%'
                                }} data-select-search="true" data-language="zh-CN" data-placeholder="请选择审批人" id="sel-checkuserid" defaultValue="" name="checkuserid">
                                  <option value=""></option>
                                </Select2>
                              </div>
                            </label>
                          </section>
                        </div>
                      </fieldset>
                      <fieldset>
                        <div className="row"></div>
                        <section>
                          <label className="checkbox">
                            <input type="checkbox" name="terms" id="terms"/>
                            <i/>我同意
                            <a href="#" data-toggle="modal" data-target="#myModal">
                              条款和条件
                            </a>
                            <p style={{
                              color: "red"
                            }}>{this.state.conditions}</p>
                          </label>
                        </section>
                      </fieldset>
                      <footer>
                        <button id="submit" type="button" className="btn btn-primary">
                          注册
                        </button>
                      </footer>
                      <div className="message">
                        <i className="fa fa-check"/>
                        <p>
                          谢谢您的注册!
                        </p>
                      </div>
                    </form>
                  </UiValidate>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">条款 & 条件</h4>
              </div>
              <div className="modal-body custom-scroll terms-body">
                <LoadHtml url="html/smartadmin/terms-and-conditions.html"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" id="i-agree">
                  <i className="fa fa-check"/>
                  我同意
                </button>
                <button type="button" className="btn btn-danger pull-left" id="print">
                  <i className="fa fa-print"/>
                  打印
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Register
