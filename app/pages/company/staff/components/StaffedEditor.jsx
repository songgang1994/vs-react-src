/**
 *员工新增编辑画面
 * Created by ninglong on 17/11/6.
 */
import React from 'react'
import Reflux from 'reflux'

// ----------------------- 引用组件 ------------------------------ //
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import StaffEditorAction from './../actions/StaffEditorAction'
import SearchStaffListStore from '../stores/SearchStaffListStore'
import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
// ----------------------- 引用Store --------------------- //
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
    staffLoginpassword: {
      rangelength:[4,20],
      required: true
    },
    passwords: {
      required: true,
      equalTo: "#staffLoginpassword"
    },
    staffMail: {
      required: true,
      email: true
    }
  },
  //表单验证的message
  messages: {
    staffCellphone: {
      required: "手机号必须填写",
      rangelength: "请输入11位手机号"
    },
    staffUid: {
      required: "用户ID必须填写"
    },
    staffName: {
      required: "请填写您的姓名"
    },
    staffLoginpassword: {
      rangelength:"密码必须大于4位小于20位",
      required: "请填写密码"
    },
    passwords: {
      required: "请确认密码",
      equalTo: "两次密码输入不一致"
    },
    staffMail: {
      required: "请填写邮箱地址",
      email: "邮箱地址格式不正确"
    }
  }
};
let StaffedEditor = React.createClass({
  // 画面初始state生成
  getInitialState: function() {
    return {
        Upload: "",
        originalStaff:[],
        submitAble: false,
        staff:{}
    }
  },
  //画面渲染之前执行
  componentWillMount: function() {
    //获取json数据
  },
  componentDidMount: function() {
    // 画面控件事件绑定

    this._registerEventHandler();
    this.unsubscribe = SearchStaffListStore.listen(this._onSearchStaffDone);
  },
  componentWillUnmount: function() {
    // 解除对公司列表获取事件的监听
    this.unsubscribe();
  },
  componentWillReceiveProps: function(nextProps) {
  var staff = nextProps.staff;
    this.setState({staff:staff});
    if(staff != ""){
        $("#pswd").css("display","none")
        $("#add").css("display","block")
        $("#continueAdd").css("display","none")
        this.state.staff = {};
        this.state.staff.memo = "";
        this.state.staff.staffImg="";
        this._equals();
    }else{

        $("#add").css("display","none")
        $("#pswd").css("display","block")
        $("#continueAdd").css("display","block")
        this.setState({"submitAble": true});
        this.state.staff.memo="";
        this.state.staff.staffImg=""
        this.state.staff = "";
    }
  },

  _staffAdd:function(){
    let me = this;
      event.preventDefault();
      let staffUid=$("#staffUid").val();
      let staffName=$("#staffName").val();
      let staffLoginaccount=$("#staffLoginaccount").val();
      let staffLoginpassword=$("#staffLoginpassword").val();
      let staffCellphone=$("#staffCellphone").val();
      let staffMail=$("#staffMail").val();
      let memo=$("#memo").val();
      let companyId = JSON.parse(localStorage.getItem('user')).companyId
      if(staffLoginaccount==""){
        staffLoginaccount = staffMail;
      }
      if(staffLoginpassword==""){
        staffLoginaccount="1234"
      }
      let staffAdd={
        staffUid:staffUid,
        staffName:staffName,
        staffLoginaccount:staffLoginaccount,
        staffLoginpassword:staffLoginpassword,
        staffCellphone:staffCellphone,
        staffMail:staffMail,
        memo:memo,
        staffImg:me.state.Upload,
        companyId:companyId
      }
      StaffEditorAction.staffAdd(staffAdd);
      $("input[type=reset]").trigger("click");
      $("#pic").attr("src", '');

  },
  _formValidate: function() {
      let pass = $("#smart-form-register").valid();
      return pass;
  },
  _equals:function(staff){
      let me = this;
    $(":input").on('input',function(event) {
      let name = event.target.name;
      let value = event.target.value;
      me.state.staff[name] = value;
        me.setState(me.state.staff);
        if (me.state.staff.staffUid != me.state.originalStaff.staffUid
           || me.state.staff.staffName != me.state.originalStaff.staffName
           || me.state.staff.staffLoginpassword != me.state.originalStaff.staffLoginpassword
           || me.state.staff.staffCellphone != me.state.originalStaff.staffCellphone
           || me.state.staff.staffMail != me.state.originalStaff.staffMail
           || me.state.staff.memo != me.state.originalStaff.memo
           || me.state.staff.src != me.state.originalStaff.src) {
          me.setState({"submitAble": true});
        } else {
          me.setState({"submitAble": false});
        }
    });
  },
  _registerEventHandler: function() {
    let me = this;
    //表单提交
    $("#keep").click(function(){
      event.preventDefault();
      // if(me.props.staff!=""){
      if(me.props.staff!= null){
        if (!me._formValidate()) {
            return false;
        }
        StaffEditorAction.StaffEditor(me.state.staff);
      }else{
        if (!me._formValidate()) {
            return false;
        }
        me._staffAdd();
      }
    });
    //头像选择
    $("#pic").click(function() {
      $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
      $("#upload").on("change", function() {
        if ($("#upload")[0].files.length) {
          var file = $("#upload")[0].files[0];
          var reader = new FileReader(); //new一个FileReader实例
          if (/image+/.test(file.type)) { //判断文件是不是imgage类型
            reader.onload = function() {
              console.log(this.result);
              var Upload = this.result;
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
    $('[name="close"]').click(function(e){
      e.preventDefault();

      // $("#pic").attr("src", me.props.staffImg);
      // me.setState({"submitAble": false});
      // $("#smart-form-register").Validform().resetForm();
      var validator = $( "#smart-form-register" ).validate();
      validator.resetForm();
});
  },
  _onSearchStaffDone:function(result){
    let newStaff = result.listData[0];
    //将读取的数据，绑定到画面显示的对象上
    this.setState({"staff": newStaff});
    //复制一份，绑定到对比对象上， 一定要复制！复制！复制！ 不能直接绑定
    this.setState({"originalStaff": _.extend({}, newStaff)});
  },
  getObjectURL: function(file) {
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

  //自动生成密码开启与关闭事件
  _toggleChange: function(type) {
    let state = {};
    state[type] = !this.state[type];
    this.setState(state)
  },
  //画面渲染
  render: function() {
    return (
      <div>
      <div className="modal fade" id="StaffEditor" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" >
          <div className="modal-content" >
            {/* header start */}
            <div className="modal-header">
              {/* 关闭按钮 */}
              <button type="button" className="close" name="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              {/* 设置弹框标题 */}
              <h4 className="modal-title" id="myModalLabel">
                编辑
              </h4>
            </div>
              {/* header end */}
              {/* body start */}
            <div className="modal-body">
              <input id="departIdStaff" type="hidden" />

                <UiValidate options={validationOptions}>
                        <form id="smart-form-register" className="smart-form " >
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
                                  <input type="text" className="form-control" name="staffUid" placeholder="用户ID" id="staffUid" value={this.state.staff.staffUid} />
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
                                  <input type="text" className="form-control" placeholder="姓名" name="staffName" id="staffName" value={this.state.staff.staffName}  />
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
                                  <input type="text" className="form-control" placeholder="登录名" id="staffLoginaccount" name="staffLoginaccount" value={this.state.staff.staffLoginaccount}  disabled/>
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
                            <div className="row" id="add"  style={{'display':'block'}} >
                              <section className="col col-6">
                                <label className="label">密码</label>
                                <label className="input">
                                  <i className="icon-append fa  fa-lock"/>
                                  <input type="password" className="form-control" placeholder="密码" id="staffLoginpassword" name="staffLoginpassword" value={this.state.staff.staffLoginpassword} ></input>
                                  <b className="tooltip tooltip-top-right">
                                    <i className="fa  fa-lock txt-color-teal"/>
                                    &nbsp;请输入密码</b>
                                </label>
                              </section>
                              <section className="col col-6">
                                <label className="label">确认密码</label>
                                <label className="input">
                                  <i className="icon-append fa  fa-lock"/>
                                  <input type="password" className="form-control" name="passwords" placeholder="确认密码"></input>
                                  <b className="tooltip tooltip-top-right">
                                    <i className="fa  fa-lock txt-color-teal"/>
                                    &nbsp;请再次输入密码</b>
                                </label>
                              </section>
                            </div>
                            <div className="row" id="pswd"  style={{'display':'none'}}>
                            <section className="col col-4 smart-form">
                              <label></label>
                              <label className="toggle">自动生成密码
                                <input type="checkbox" name="checkbox-toggle" id="toggleChange" onClick={this._toggleChange.bind(this,"passwordSection")}/>
                                <i data-swchoff-text="是" data-swchon-text="否"/></label>
                            </section>
                            <section className="col col-2"></section>
                            <section className="col col-6" id="style" style={{
                                display: (this.state.passwordSection
                                  ? 'block'
                                  : 'none')
                              }} >
                              <label className="label">密码</label>
                              <label className="input">
                                <i className="icon-append fa  fa-lock"/>
                                <input type="password" className="form-control" placeholder="密码" name="passwordd" id="staffLoginpassword" ></input>
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
                                  <input type="text" className="form-control" placeholder="手机号" id="staffCellphone" name="staffCellphone" value={this.state.staff.staffCellphone} />
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
                                  <input type="text" className="form-control" placeholder="邮箱" id="staffMail" name="staffMail" value={this.state.staff.staffMail} ></input>
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
                                  <input type="text" className="form-control" placeholder="所属部门" ></input>
                                  <b className="tooltip tooltip-top-right">
                                    <i className="fa  fa-user txt-color-teal"/>
                                    &nbsp;请选择所属部门</b>
                                </label>
                              </section>
                              <section className="col col-6">
                                <label className="label">角色</label>
                                <label className="input">
                                  <i className="icon-append fa  fa-user"/>
                                  <input type="text" className="form-control" placeholder="角色" ></input>
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
                                <img id="pic" src={this.state.staff.staffImg} name="src" width="135px" height="180px"/>
                                <input id="upload" name="file" accept="image/*" type="file" style={{
                                  "display": "none"
                                }}/>
                              </section>
                              <section className="col col-6">
                                <label className="label">备注</label>
                                <label className="textarea">
                                  <i className="icon-append fa fa-file-text"/>
                                  <textarea type="input" id="memo"  name="remarks" className="form-control help-block m-b-none" name="memo"  value={this.props.staff.memo} placeholder="备注" rows="10" />
                                  <b className="tooltip tooltip-top-right">
                                    <i className="fa fa-file-text txt-color-teal"/>
                                    &nbsp;请填写备注</b>
                                </label>
                              </section>
                            </div>
                          </fieldset>
                        </form>
                      </UiValidate>
            </div>
            <div className="modal-footer">
              <button id="close" type="button" name="close" className="btn btn-primary"  data-dismiss="modal"   disabled={(this.state.submitAble ? '' : 'disabled')}>取消
              </button>
              <button id="keep" type="button" className="btn btn-primary" data-dismiss="modal"   disabled={(this.state.submitAble ? '' : 'disabled')} >保存
              </button>
              <button className="btn btn-primary" type="button" id="continueAdd" type="button" style={{'display':'none'}}>
                继续添加
              </button>
            </div>
          </div>
        </div>
      </div>
</div>
    )
  }
});

export default StaffedEditor
