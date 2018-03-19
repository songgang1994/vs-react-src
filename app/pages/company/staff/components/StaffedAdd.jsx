import React from 'react'
import Reflux from 'reflux'

// ----------------------- 引用组件 ------------------------------ //
import StaffForm from './StaffForm.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import StaffedAction from './../actions/StaffedAction'
// ----------------------- 引用Store --------------------- //
let StaffedAdd = React.createClass({
  // 画面初始state生成
  getInitialState: function() {
    return {
        Uploads: "",

    }
  },
  //画面渲染之前执行
  componentWillMount: function() {
    //获取json数据
  },
  componentDidMount: function() {

    // 画面控件事件绑定
    this._registerEventHandlers();
  },
  _registerEventHandlers: function() {
    let me = this;
    $("#keeps").click(function(){
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
        staffImg:me.state.Uploads,
        companyId:companyId
      }
      StaffedAction.staffAdd(staffAdd);
      $("input[type=reset]").trigger("click");
      $("#pics").attr("src", '');
    });

      //头像选择
    $("#pics").click(function() {
      $("#uploads").click(); //隐藏了input:file样式后，点击头像就可以本地上传
      $("#uploads").on("change", function() {
        if ($("#uploads")[0].files.length) {
          var file = $("#uploads")[0].files[0];
          var reader = new FileReader(); //new一个FileReader实例
          if (/image+/.test(file.type)) { //判断文件是不是imgage类型
            reader.onload = function() {
              console.log(this.result);
              var Uploads = this.result;
              me.setState({Uploads: Uploads});
            }
            reader.readAsDataURL(file);
          }
        }
        var objUrl = me.getObjectURLS(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
          $("#pics").attr("src", objUrl); //将图片路径存入src中，显示出图片
        }
      });
    });
    $("#closes").click(function(){
      $("#pics").attr("src", '');
    });
  },
  getObjectURLS: function(file) {
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
      <div className="modal fade" id="StaffAdd" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" >
          <div className="modal-content" >
            {/* header start */}
            <div className="modal-header">
              {/* 关闭按钮 */}
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              {/* 设置弹框标题 */}
              <h4 className="modal-title" id="myModalLabel">
              新增
              </h4>
            </div>
              {/* header end */}
              {/* body start */}
            <div className="modal-body" >
              <div className="row">
                        <StaffForm/>
              </div>
            </div>
            <div className="modal-footer">
              <button id="closes" type="button" className="btn btn-primary" data-dismiss="modal">取消
              </button>
              <button id="keeps" type="button" className="btn btn-primary" data-dismiss="modal" >保存
              </button>
              <button id="staffAdd" type="button" className="btn btn-primary" >继续添加
              </button>

              {/* <button type="button" className="btn btn-primary">
                取消
              </button>
              <button className="btn btn-primary" type="button" style={{
                display: (this.state.isEdit
                  ? 'none'
                  : 'block')
              }}>
                继续添加
              </button>
              <button type="submit" className="btn btn-primary">
                保存
              </button> */}
            </div>
          </div>
        </div>
      </div>

    )
  }
});

export default StaffedAdd
