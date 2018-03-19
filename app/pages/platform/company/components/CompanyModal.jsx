import React from 'react'
import Reflux from 'reflux'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
// 导入共通组件
import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
// 导入Action和Store
import CompanyModalDBStore from '../stores/CompanyModalDBStore.js'
import CompanyModalAction from '../actions/CompanyModalAction.js'


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

//状态标签组件
let LabelsPopover = React.createClass({
  getInitialState:function(){
    return {
      flag:'',
      companyName:''
    };
  },
  render: function(){
      let flag = this.props.flag;
      let name = this.props.companyName;
      switch(flag){
        case "1":
            return (
                <OverlayTrigger placement="bottom" overlay={<Popover id="popover-down-popover">{name}</Popover>} >
                <a href-void className="btn btn-warning">
                    <b>&nbsp;&nbsp;临时&nbsp;&nbsp;</b>
                </a>
              </OverlayTrigger>
            )
        case "2":
            return (
                <OverlayTrigger placement="bottom" overlay={<Popover id="popover-down-popover">{name}</Popover>} >
                <a href-void className="btn btn-success">
                    <b>&nbsp;&nbsp;通过&nbsp;&nbsp;</b>
                </a>
              </OverlayTrigger>
            )
        case "3":
            return (
                <OverlayTrigger placement="bottom" overlay={<Popover id="popover-down-popover">{name}</Popover>} >
                <a href-void className="btn btn-danger">
                    <b>&nbsp;&nbsp;未通过&nbsp;&nbsp;</b>
                </a>
              </OverlayTrigger>
            )
        case "4":
            return (
                <OverlayTrigger placement="bottom" overlay={<Popover id="popover-down-popover">{name}</Popover>} >
                <a href-void className="btn btn-default">
                    <b>&nbsp;&nbsp;失效&nbsp;&nbsp;</b>
                </a>
              </OverlayTrigger>
            )
        case "5":
            return (
                <OverlayTrigger placement="bottom" overlay={<Popover id="popover-down-popover">{name}</Popover>} >
                <a href-void className="btn btn-primary">
                    <b>&nbsp;&nbsp;未审核&nbsp;&nbsp;</b>
                </a>
              </OverlayTrigger>
            )
      }
  }
});

let CompanyModal = React.createClass({

    // 画面初始state生成
    getInitialState: function(){
        return {
            passwordSection: true,  //是否显示 密码输入框
            proxy:true,       //"代理" 属性
            valid:true,       //"有效" 属性
        }
    },

    // 画面渲染之后
    componentDidMount: function() {

      // 画面控件事件绑定
      this._registerEventHandler();

      // 监听公司信息更改，执行_onCompanyDataTableDBStoreListen()
      this.unsubscribeDB = CompanyModalDBStore.listen(this._onCompanyModalDBStoreListen);
    },

    componentWillUnmount: function() {
        // 解除对事件的监听
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
        me.props.extraParam.company[name] = value;
        //将画面上改变的值，设置到对应的属性上（需调用此方法，新的值才可显示）
        me.setState(me.props.extraParam.company);
      });

      //"确认"按钮点击事件
      $("#submit").click(function(e) {
        // 防止默认事件
        e.preventDefault();

        // 表单验证未通过，中断执行
        if (!me._formValidate()) {
            return false;
        }
        let userId = JSON.parse(localStorage.getItem('user')).adminId;
        me.props.extraParam.company.updateid = userId;
        me.setState(me.props.extraParam.company);
        //请求后台
        if(me.props.extraParam.isAdd){  //新增
          CompanyModalAction.insertCompany(me.props.extraParam.company);
          me.props.extraParam.company.craeteid = userId;
          me.setState(me.props.extraParam.company);
        }else{  //更新
          CompanyModalAction.updateCompany(me.props.extraParam.company);
        }
      });
    },

    // 表单验证
    _formValidate: function() {
        let pass = $("#smart-form-register").valid();
        return pass;
    },

    toggleChange: function(type){
        let state = {};
        state[type] = !this.state[type];
        this.setState(state)
    },

    //插入/更新公司信息，监听返回值的函数
    _onCompanyModalDBStoreListen: function(result){
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

    // 显示公司名，新增时可输入，修改时只显示名称
    companyNameArae: function(flag){
      if(flag){
        // 新增
          return(
            <div>
              <section >
                <label className="label">公司名<span className="text-danger">&nbsp;* </span></label>
                <label className="input">
                  <i className="icon-append fa  fa fa-bank"/>
                  <input type="text" name="companyName" placeholder="公司名" value={this.props.extraParam.company.companyName}/>
                    <b className="tooltip tooltip-top-right">
                        <i className="fa  fa fa-bank txt-color-teal"/>
                        &nbsp;请输入公司名
                    </b>
                </label>
              </section>
            </div>
          )
      }else{
        // 修改
          return(
              <div>
                <div className="row">
                  <section  className="col col-6">
                      <h2><strong>{this.props.extraParam.company.companyName}</strong></h2>
                  </section>
                  <section  className="col col-6 ">
                    <span className="pull-right">
                      {/* <LabelsPopover flag={this.props.extraParam.company.flag} name={this.props.extraParam.company.name}/> */}
                    </span>
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
                          <label>近30天登录总人数：350</label>
                    </section>
                    <section className="col col-6">
                        <label>最近登录日期：2017/10/19 15:30</label>
                    </section>
                </div>

                <hr style={{background:"blue"}}></hr>
                <br></br>

              </div>
          )
      }
    },

    //画面渲染
    render: function () {
      return (
        <div>
          <div className="modal fade" id="companyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 className="modal-title fa fa-bank" id="myModalLabel">{this.props.extraParam.isAdd ? <span >&nbsp;编辑</span> : <span >&nbsp;新增</span>}</h4>
                </div>

                <div className="modal-body">
                  <UiValidate options={validationOptions}>
                    <form id="smart-form-register" className="smart-form" noValidate="novalidate" style={{paddingLeft:'5%',paddingRight:'5%'}}>

                        {/* 显示公司名 */}
                        {this.companyNameArae(this.props.extraParam.isAdd)}

                        <section>
                            <label className="label">公司地址</label>
                            <label className="input"> <i
                                className="icon-append fa  fa-building"/>
                              <input type="text" name="companyAddress" placeholder="公司地址" value={this.props.extraParam.company.companyAddress}/>
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
                              <input type="text" name="contactsName" placeholder="联系人" value={this.props.extraParam.company.contactsName}/>
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa  fa-user txt-color-teal"/>
                                  &nbsp;请输入联系人
                                </b>
                            </label>
                          </section>
                          <section className="col col-6">
                            <label className="label">联系人邮箱<span className="text-danger">&nbsp;* </span></label>
                            <label className="input">
                              <i className="icon-append fa  fa-envelope"/>
                              <input type="email" name="contactsMail" placeholder="联系人邮箱" value={this.props.extraParam.company.contactsMail}/>
                              <b className="tooltip tooltip-top-right">
                                  <i className="fa  fa-envelope txt-color-teal"/>
                                  &nbsp;请输入联系人邮箱
                              </b>
                            </label>
                            <small>邮箱地址为登录用户名，密码将发送至该邮箱。</small>
                          </section>
                        </div>

                        <div className="row">
                          <section className="col col-6">
                            <label className="label">联系人手机</label>
                            <label className="input">
                              <i className="icon-append fa  fa-mobile"/>
                              <input type="text" name="contactsCellphone" placeholder="联系人手机" value={this.props.extraParam.company.contactsCellphone}/>
                              <b className="tooltip tooltip-top-right">
                                  <i className="fa  fa-mobile txt-color-teal"/>
                                  &nbsp;请输入联系人手机
                              </b>
                            </label>
                          </section>

                          <section className="col col-5">
                            <label> </label>  {/*不能删 */}
                            <label className="toggle">自动生成密码
                                <input type="checkbox" name="checkbox-toggle" onChange={this.toggleChange.bind(this, 'passwordSection')}/>
                                <i data-swchoff-text="否"  data-swchon-text="是"/>
                            </label>
                          </section>
                        </div>

                        <div className="row">
                          <section className="col col-6">
                            <label className="label">联系人座机</label>
                            <label className="input">
                              <i className="icon-append fa fa-phone"/>
                              <input type="text" name="contactsTelephone" placeholder="联系人座机" value={this.props.extraParam.company.contactsTelephone}/>
                              <b className="tooltip tooltip-top-right">
                                <i className="fa fa-phone txt-color-teal"/>
                                    &nbsp;请输入联系人座机
                              </b>
                            </label>
                          </section>

                          <section className="col col-6"  style={{display: (this.state.passwordSection ? 'block' : 'none')}}>
                            <label className="label">登录密码</label>
                            <label className="input">
                              <i className="icon-append fa fa-lock"/>
                              <input type="input" name="contactsLoginpassword" placeholder="登录密码" value={this.props.extraParam.company.contactsLoginpassword}/>
                              <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-lock txt-color-teal"/>
                                  &nbsp;请输入登录密码
                              </b>
                            </label>
                          </section>
                        </div>

                        <div className="row">
                          <section className="col col-5">
                            <label>设为代理</label>
                            <label className="toggle">
                              代理
                              <input type="checkbox" name="isAgent" onChange={this.toggleChange.bind(this, 'proxy')}/>
                              <i data-swchoff-text="否"  data-swchon-text="是"/>
                            </label>
                          </section>

                          <section className="col col-1"></section>

                          <section className="col col-6"  style={{display: (this.state.proxy ?  'block' : 'none')}}>
                            <label>上级代理</label>
                            <label className="select">
                              <select name="agentcompanyId" defaultValue={"0"}>
                                  <option value="0" disabled={true}>无</option>
                                  <option value="1">Male</option>
                                  <option value="2">Female</option>
                                  <option value="3">Prefer not to answer</option>
                              </select>
                              <i/>
                            </label>
                          </section>
                        </div>

                        {/* 是否显示费用和有效按钮 (新增状态不显示，修改状态显示)*/}
                        <div className="row" style={{display: (this.props.extraParam.isAdd ?  'none' : 'block')}}>
                          <section className="col col-5">
                              <label className="toggle">
                                费用结清
                                <input type="checkbox" name="isPaid" defaultChecked/>
                                <i data-swchon-text="是" data-swchoff-text="否"/>
                              </label>
                          </section>

                          <section className="col col-1"></section>

                          <section className="col col-5">
                              <label className="toggle">
                                有效
                                <input type="checkbox" name="isvalid" defaultChecked onChange={this.toggleChange.bind(this, 'valid')}/>
                                <i data-swchon-text="是" data-swchoff-text="否"/>
                              </label>
                          </section>
                        </div>

                        <div className="row">
                          <section className="col col-6">
                            <label>有效开始时间</label>
                            <label className="input">
                              <i className="icon-append fa fa-calendar" />
                              <UiDatepicker type="text" name="termOfValidityBegin" placeholder="11/10/2017" disabled={(this.state.valid ?  '' : 'disabled')} dateFormat="dd/mm/yy" />
                            </label>
                          </section>

                          <section className="col col-6">
                            <label>有效结束时间</label>
                            <label className="input">
                              <i className="icon-append fa fa-calendar" />
                              <UiDatepicker type="text" name="termOfValidityEnd" placeholder="11/10/2017" disabled={(this.state.valid ?  '' : 'disabled')} dateFormat="dd/mm/yy"/>
                            </label>
                          </section>
                        </div>

                        <section style={{display: (this.props.extraParam.isAdd ?  'none' : 'block')}}>
                          <label>备注</label>
                          <label className="textarea">  <i className="icon-append fa fa-file-text"/>
                              <textarea rows="4" name="memo" placeholder="备考"/>
                              <b className="tooltip tooltip-top-right">
                                <i className="fa fa-file-text txt-color-teal"/>
                                &nbsp;请填写备注
                              </b>
                          </label>
                        </section>
                    </form>
                  </UiValidate>
                </div>

                <div className="modal-footer">
                  <button type="btn btn-primary" className="btn btn-primary" id="cancel" data-dismiss="modal">
                      取消
                  </button>
                  <button type="btn btn-primary" className="btn btn-primary" id="submit" data-dismiss="modal">
                      确定
                  </button>
                </div>

              </div>{/* <!-- /.modal-content --> */}
            </div>{/* <!-- /.modal --> */}
          </div>
        </div>
      )
    }

});

export default CompanyModal
