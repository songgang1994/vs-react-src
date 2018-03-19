/**
 * 访客详细信息画面
 * Created by songgang on 2017/11/2.
 */
// 导入React组件
import React from 'react'
// 导入Reflux组件
import Reflux from 'reflux'
// 导入共通组件
import BigBreadcrumbs from '../../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

import VisitorFormActions from '../actions/VisitorFormActions'
// import VisitorStore from '../stores/VisitorStores'
// import VisitorDBStore from '../stores/VisitorDBStores'

let VisitorInfo = React.createClass({
  render: function() {
    let that = this;
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-4 col-lg-offset-4">
              <VisitorForm/>
            </div>
          </div>
        </WidgetGrid>
      </div>
    )
  }
});

let VisitorForm = React.createClass({

  // 画面初始state生成
  getInitialState: function() {
    return {
      visitor: {
        visitorId: "",
        visitorName: "",
        visitorImg: "styles/img/demo/toxiang1.png",
        visitorCellphone: "",
        memo: "",
        visitorIdcard: "",
        companyName: "",
        visitorMail: ""
      }, //访客对象信息
      type: 0, //0:add 1:edit 2：modal显示
    }
  },
  // 画面渲染之前
  componentWillMount: function() {
    // 这里是正确写法
    //let visitorId = this.props.param;
    let visitorId = 1
    //绑定获取访客信息事件的监听
    this.unsubscribeInfo = VisitorStore.listen(this._onGetVisitorInfoSuccess)
    //绑定 新增/编辑 访客信息事件的监听
    this.unsubscribeAddOrUpdInfo = VisitorDBStore.listen(this._onAddOrUpdVisitorInfoSuccess)
    // 正确写法
    // if(this.state.type != 0){
    //   VisitorFormActions.getVisitorInfo(visitorId)
    // }
    VisitorFormActions.getVisitorInfo(visitorId)
  },
  // 画面渲染之后
  componentDidMount: function() {

    // 画面控件事件绑定
    this._registerEventHandler();

  },

  componentWillUnmount: function() {
    // 解除对获取访客信息事件的监听
    this.unsubscribeInfo();
    // 解除对 新增/编辑 访客信息事件的监听
    this.unsubscribeAddOrUpdInfo();
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 代替HTML标签中写onXXX={this.XXX}
  _registerEventHandler: function() {
    //将this关键字换为me，否则报错，在此函数中使用this指向的组件
    let me = this

    // 监听所有显示的input，当显示的值发生改变时，将"取消"和"确认"按钮显示可用
    $("input").on('input', function(event) {
      var name = event.target.name
      var value = event.target.value
      me.state.visitor[name] = value
      //将画面上改变的值，设置到对应的属性上（需调用此方法，新的值才可显示）
      me.setState(me.state.visitor)
    });

    //头像选择
    $("#pic").click(function() {
      $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
      $("#upload").on("change", function() { //获取input的值
        if ($("#upload")[0].files.length) { //判断input的长度
          var file = $("#upload")[0].files[0]
          var reader = new FileReader() //new一个FileReader实例
          if (/image+/.test(file.type)) { //判断文件是不是imgage类型
            reader.onload = function() {
              var Upload = this.result
              //设置图片
              me.setState({
                visitor: {
                  visitorImg: Upload
                }
              })
            }
            reader.readAsDataURL(file)
          }
        }
        var objUrl = me.getObjectURL(this.files[0]) //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
          $("#pic").attr("src", objUrl) //将图片路径存入src中，显示出图片
        }
      });
    });

    //提交表单信息
    $('#submit').click(function(event) {
      // 防止默认事件
      event.preventDefault()

      //表单验证未通过，中断执行
      // if (!me._formValidate()) {
      //   return false
      // };

      //获取form表单的值
      let visitorId = $("#visitorId").val()
      let visitorName = $("#visitorName").val()
      let visitorCellphone = $("#visitorCellphone").val()
      let memo = $("#memo").val()
      let visitorIdcard = $("#visitorIdcard").val()
      let companyName = $("#companyName").val()
      let visitorMail = $("#visitorMail").val()
      let visitorImg = me.state.visitor.visitorImg

      //设置临时对象
      let visitor = {
        visitorId: visitorId,
        visitorName: visitorName,
        visitorCellphone: visitorCellphone,
        visitorIdcard: visitorIdcard,
        companyName: companyName,
        visitorMail: visitorMail,
        visitorImg: visitorImg,
        memo: memo
      }

      //调用Action
      //VisitorFormActions.addOrUpdVisitorInfo(visitor)

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
    let pass = $("#form-visitor").valid();
    return pass;
  },

  // 获取 访客信息
  _onGetVisitorInfoSuccess: function(result) {
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        this.state.visitor = result.data
        this.setState(this.state.visitor);
        break;
      case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
        break;
    }
  },

  // 新增/编辑 访客
  _onAddOrUpdVisitorInfoSuccess: function(result) {
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //  showMsg
        alert(111)
        //VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        break;
      case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
        break;
    }
  },

  render: function() {
    return (
      <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false} style={{}}>
        <header>
          <span className="widget-icon">
            <i className="fa fa-table"/>
          </span>
          <h2>访客信息完善</h2>
        </header>
        <div>
          <div className="widget-body no-padding">
            <form id="form-visitor" className="smart-form " noValidate="novalidate">
              <fieldset>
                <input type="hidden" id="visitorId" value={this.state.visitor.visitorId}/>
                <section>
                  <section >
                    <label className="input">
                      <i className="icon-append fa fa-user"/>
                      <input type="text" name="visitorName" id="visitorName" placeholder="姓名" value={this.state.visitor.visitorName}/>
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-user txt-color-teal"/>
                        &nbsp;请输入姓名</b>
                    </label>
                  </section>
                  <section >
                    <label className="input">
                      <i className="icon-append fa fa-phone"/>
                      <input type="text" name="visitorCellphone" id="visitorCellphone" placeholder="手机号" value={this.state.visitor.visitorCellphone}/>
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-phone txt-color-teal"/>
                        &nbsp;请输入手机号</b>
                    </label>
                  </section>
                  <section >
                    <label className="input">
                      <i className="icon-append fa fa-credit-card"/>
                      <input type="text" name="visitorIdcard" id="visitorIdcard" placeholder="身份证号" value={this.state.visitor.visitorIdcard}/>
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-credit-card txt-color-teal"/>
                        &nbsp;请输入身份证号</b>
                    </label>
                  </section>
                  <section>
                    <label className="input">
                      <i className="icon-append fa fa-building"/>
                      <input type="text" name="companyName" id="companyName" placeholder="公司" value={this.state.visitor.companyName}/>

                      <b className="tooltip tooltip-top-right">
                        <i className="fa  fa-building txt-color-teal"/>
                        &nbsp;请输入公司名称</b>
                    </label>
                  </section>
                  <section>
                    <label className="input">
                      <i className="icon-append fa fa-envelope"/>
                      <input type="text" name="visitorMail" id="visitorMail" placeholder="邮箱" value={this.state.visitor.visitorMail}/>
                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-envelope txt-color-teal"/>
                        &nbsp;请输入邮箱</b>
                    </label>
                  </section>
                  <section>
                    <label className="textarea">
                      <i className="icon-append fa fa-file-text"/>
                      <textarea name="memo" id="memo" className="form-control help-block m-b-none" placeholder="备注" rows="5" value={this.state.visitor.memo}/>

                      <b className="tooltip tooltip-top-right">
                        <i className="fa fa-file-text txt-color-teal"/>
                        &nbsp;请填写备注</b>
                    </label>
                  </section>
                  <div className="row">
                    <section className="col col-4">
                      <img id="pic" src={this.state.visitor.visitorImg} width="90" height="120"/>
                      <input id="upload" name="file" accept="image/*" type="file" style={{
                        "display": "none"
                      }}/>
                    </section>
                    <section className="col col-8">
                      <h5><br/>
                        <br/>请上传一张您的照片, 这张照片将用于人脸签到, 请保证五官清晰。
                      </h5>
                    </section>
                  </div>
                </section>
              </fieldset>
              <footer>
                <button type="button" id="submit" className="btn btn-primary">
                  确定
                </button>
                <button type="submit" className="btn btn-primary">
                  取消
                </button>
              </footer>
            </form>
            {/* </UiValidate> */}
          </div>
        </div>
      </JarvisWidget>
    )

  }
});

export default VisitorInfo
