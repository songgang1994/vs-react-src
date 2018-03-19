/**
 *公司管理员下 公司详细画面   公司详细组件
 *Creat by chenfei 2017/11/3
 */

// 导入React组件
import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
// 导入共通组件
import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
// 导入Action和Store
import CompanyDetailStore from '../stores/CompanyDetailStore.js'
import CompanyDetailDBStore from '../stores/CompanyDetailDBStore.js'
import CompanyDetailAction from '../actions/CompanyDetailAction.js'

// 表单提交前的验证配置
let validationOptions = {
  // 改变提示字体样式，默认为斜体，改正常规
  // errorElement: "samp",

  //表单提交前的验证规则
  rules: {
    contactsMail: {
      required: true,
      email: true
    },
    companyAddress: {
      required: true,
    },
    contactsName: {
      required: true,
    },
    contactsLoginpassword: {
      required: true,
    },
    contactsCellphone:{
      isMobile:true
    },
    contactsTelephone:{
      isTelephone:true
    }

  },

  //表单验证的message
  messages: {
    contactsMail: {
      required: "邮箱地址必须填写",
      email: "邮箱格式不正确"
    },
    contactsCellphone:{
      isMobile:"请输入正确的手机号码"
    },
    contactsTelephone:{
      isTelephone:"请输入正确的座机号码"
    },
    companyAddress: {
      required: "地址不能为空",
    },
    contactsName: {
      required: "联系人不能为空",
    },
    contactsLoginpassword: {
      required: "密码不能为空",
    }
  }
};

//表单显示区域的组件
let CompanyDetail = React.createClass({

  // 画面初始state生成
  getInitialState: function() {
    return {
      //判断提交按钮是否可用（当显示的信息被手工更改时，变为true）
      submitAble: false,
      //公司信息(用于画面显示)
      company: {},
      //公司信息（用于判断画面信息是否被修改）
      originalCompany: {}
    }
  },

  // 画面渲染之前
  componentWillMount: function() {
  },

  // 画面渲染之后
  componentDidMount: function() {
    // 1.画面控件事件绑定
    this._registerEventHandler();
    // 2.监听公司信息获取事件，当获取到公司信息时，执行_onCompanyDetailStoreListen()
    this.unsubscribe = CompanyDetailStore.listen(this._onCompanyDetailStoreListen);
    // 3.监听公司信息增删改事件，当增删改公司信息时，执行_onCompanyDetailDBStoreListen()
    this.unsubscribeDB = CompanyDetailDBStore.listen(this._onCompanyDetailDBStoreListen);
    // 4.执行CompanyDetailAction中的getCompany()方法，请求后台获取数据
    CompanyDetailAction.getCompany();
  },

  componentWillUnmount: function() {
      // 解除对事件的监听
      this.unsubscribe();
      this.unsubscribeDB();
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 代替HTML标签中写onXXX={this.XXX}
  _registerEventHandler: function() {
    //将this关键字换为me，否则报错，在此函数中使用this指向的组件
    let me = this;

    // 监听所有显示的input，当显示的值发生改变时，将"取消"和"确认"按钮显示可用
    $("input").on('input',function(event) {
      var name = event.target.name;
      var value = event.target.value;
      me.state.company[name] = value;
      //将画面上改变的值，设置到对应的属性上（需调用此方法，新的值才可显示）
      me.setState(me.state.company);

      //判断改变后的值，是否和初始值相同
      if (me.state.company.companyAddress != me.state.originalCompany.companyAddress || me.state.company.contactsName != me.state.originalCompany.contactsName || me.state.company.contactsMail != me.state.originalCompany.contactsMail || me.state.company.contactsCellphone != me.state.originalCompany.contactsCellphone
          || me.state.company.contactsLoginpassword != me.state.originalCompany.contactsLoginpassword || me.state.company.contactsTelephone != me.state.originalCompany.contactsTelephone) {
        me.setState({"submitAble": true});
      } else {
        me.setState({"submitAble": false});
      }
    });

    //"取消"按钮点击事件
    $("#cancel").click(function(e) {
      //防止默认事件
      e.preventDefault();
      //将改变的值重置为画面显示时的初始值
      //赋值时，必须赋值originalCompany，使company不指向originalCompany
      me.setState({"company": _.extend({}, me.state.originalCompany)});
      //将按钮设为disable
      me.setState({"submitAble": false});
    });

    //"确认"按钮点击事件
    $("#submit").click(function(e) {
      // 防止默认事件
      e.preventDefault();

      // 表单验证未通过，中断执行
      if (!me._formValidate()) {
          return false;
      }
      // 调用Action中updateCompany方法
      CompanyDetailAction.updateCompany(me.state.company);
    });
  },

  // 表单验证
  _formValidate: function() {
      let pass = $("#smart-form-register").valid();
      return pass;
  },

  //获取公司信息，监听返回值的函数
  _onCompanyDetailStoreListen: function(result){
    //获取公司信息
    let newCompany = result.data;
    //将读取的数据，绑定到画面显示的对象上
    this.setState({"company": newCompany});
    //复制一份，绑定到对比对象上， 一定要复制！复制！复制！ 不能直接绑定
    this.setState({"originalCompany": _.extend({}, newCompany)});
  },

  //更新公司信息，监听返回值的函数
  _onCompanyDetailDBStoreListen: function(result){
      switch (result.data.bizCode) {
        case config.API_BIZ_CODE.BIZ_CODE_UPDATE_SUCCESS:
          //更新成功
          //showMsg
          VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
          //更新成功后 重新取下数据
          CompanyDetailAction.getCompany();
          //将确认和取消按钮 disable
          this.setState({"submitAble":false});
          break;
        default:
          VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
          break;
      }
  },

  //画面渲染
  render: function() {
    return (
      // 显示区的最外层控件
      <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
        {/* 标题栏 */}
        <header>
          <h2 className="fa fa-bank">
            &nbsp;详细
          </h2>
        </header>

        {/* 正文部分 */}
        <div>   {/*此div不加,<footer>区域外边的框不显示*/}
          <div className="widget-body no-padding">

            {/* 验证控件 */}
            <UiValidate options={validationOptions}>
              <form id="smart-form-register" className="smart-form " noValidate="novalidate" >
                {/* 使form内部控件远离边框 */}
                <fieldset style={{
                  paddingLeft: '5%',
                  paddingRight: '5%'
                }}>

                  <section>
                    <section>
                      <div className="row">
                        <section className="col col-6">
                          <h2>
                            <strong>{this.state.company.companyName}</strong>
                          </h2>
                        </section>
                      </div>

                      <div className="row">
                        <section className="col col-6">
                          <label>员工数：500</label>
                        </section>
                        <section className="col col-6">
                          <label>访客总数：500</label>
                        </section>
                      </div>

                      <div className="row">
                        <section className="col col-6">
                          <label>近30天登录总人次：350</label>
                        </section>
                        <section className="col col-6">
                          <label>最近登录日期：2017/10/19 15:30</label>
                        </section>
                      </div>

                      <div className="row">
                        <section className="col col-6">
                          <label>有效开始时间：2017/10/19</label>
                        </section>
                        <section className="col col-6">
                          <label>有效结束时间：2017/12/19</label>
                        </section>
                      </div>

                      {/* 分割线 */}
                      <hr></hr>

                    </section>

                    <section>
                      <label className="label">公司地址</label>
                      <label className="input">
                        <i className="icon-append fa  fa-building"/>
                        <input type="text" name="companyAddress" placeholder="公司地址" value={this.state.company.companyAddress}/>
                        <b className="tooltip tooltip-top-right">
                          <i className="fa  fa-building txt-color-teal"/>
                          &nbsp;请输入公司地址</b>
                      </label>
                    </section>

                    <div className="row">
                      <section className="col col-6">
                        <label className="label">联系人</label>
                        <label className="input">
                          <i className="icon-append fa  fa-user"/>
                          <input type="text" name="contactsName" placeholder="联系人" value={this.state.company.contactsName}/>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa  fa-user txt-color-teal"/>
                            &nbsp;请输入联系人</b>
                        </label>
                      </section>
                      <section className="col col-6">
                        <label className="label">联系人邮箱<span className="text-danger">&nbsp;*
                          </span>
                        </label>
                        <label className="input">
                          <i className="icon-append fa  fa-envelope"/>
                          <input type="email" name="contactsMail" placeholder="联系人邮箱" value={this.state.company.contactsMail}/>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa  fa-envelope txt-color-teal"/>
                            &nbsp;请输入联系人邮箱</b>
                        </label>
                        <small className="text-danger">默认邮箱地址为登录名。如修改邮箱地址，原登录用户将失效。</small>
                      </section>
                    </div>

                    <div className="row">
                      <section className="col col-6">
                        <label className="label">联系人手机</label>
                        <label className="input">
                          <i className="icon-append fa  fa-mobile"/>
                          <input type="text" id="contactsCellphone" name="contactsCellphone" placeholder="联系人手机" value={this.state.company.contactsCellphone}/>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa  fa-mobile txt-color-teal"/>
                            &nbsp;请输入联系人手机</b>
                        </label>
                      </section>

                      <section className="col col-6">
                        <label className="label">登录密码</label>
                        <label className="input">
                          <i className="icon-append fa fa-lock"/>
                          <input type="text" name="contactsLoginpassword" placeholder="登录密码" value={this.state.company.contactsLoginpassword}/>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa fa-lock txt-color-teal"/>
                            &nbsp;请输入登录密码</b>
                        </label>
                      </section>
                    </div>

                    <div className="row">
                      <section className="col col-6">
                        <label className="label">联系人座机</label>
                        <label className="input">
                          <i className="icon-append fa fa-phone"/>
                          <input type="text" name="contactsTelephone" placeholder="联系人座机" value={this.state.company.contactsTelephone}/>
                          <b className="tooltip tooltip-top-right">
                            <i className="fa fa-phone txt-color-teal"/>
                            &nbsp;请输入联系人座机</b>
                        </label>
                      </section>
                    </div>
                  </section>
                </fieldset>

                {/* form足部 */}
                <footer>
                  {/* "确认"和"取消"按钮会在画面值手动发生改变时，变为可点状态 */}
                  <button id="submit" type="submit" className="btn btn-primary"
                    disabled={(this.state.submitAble ? '' : 'disabled')}>
                    确定
                  </button>
                  <button  id="cancel" className="btn btn-primary"
                    disabled={(this.state.submitAble ? '' : 'disabled')}>
                    取消
                  </button>
                </footer>
              </form>
            {/* 验证控件结束 */}
            </UiValidate>
          </div>
        {/* 正文部分结束 */}
        </div>
      {/* 显示区域结束 */}
      </JarvisWidget>
    )
  }

});

export default CompanyDetail
