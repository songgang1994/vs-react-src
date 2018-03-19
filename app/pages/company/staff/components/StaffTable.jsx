/**
 * 员工画面一览画面
 * Created by ninglong on 2017/11/15.
 */
 // 导入React组件
import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
// ----------------------- 引用组件 ------------------------------ //
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import BatchImport from '../../../util/components/BatchImport.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
//引用的store
import StaffSettingDBStore from './../stores/StaffSettingDBStore'
import StaffedAction from './../actions/StaffedAction'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//消息参数
let config = window.SMARTADMIN_GLOBALS;
let StaffMsg = window.MSG_GLOBALS.StaffMsg;
// ----------------------- 引用自定义组件 ------------------------------ //
import StaffedEditor from './StaffedEditor.jsx'
// import StaffedAdd from './StaffedAdd.jsx'
let StaffTable = React.createClass({
  getInitialState: function() {
    return {
        staffId: "",
        staff:{
          staffUid:"",
          staffName:"",
          staffLoginaccount:"",
          staffLoginpassword:"",
          staffCellphone:"",
          staffMail:"",
          memo:"",
          staffImg:"",
          companyId:""
        }
    }
  },
  componentDidMount: function() {
    //画面控件事件绑定
    this._leaderEventHandler();
    this.unsubscribe = StaffSettingDBStore.listen(this._onStaffDBStoreListen);
  },
  componentWillUnmount: function() {
      // 解除对事件的监听
      this.unsubscribe();
  },
  //获取父组件传递值
  componentWillReceiveProps: function(nextProps) {
    let departId = nextProps.departId;
    this.setState({departId:departId});
    let companyId = JSON.parse(localStorage.getItem('user')).companyId
    if (departId) {
      if (!Number.isInteger(parseInt(departId))) {
        departId = 0;
      }
      //获取部门员工列表数据
      StaffedAction.staffList(departId,companyId);
    }
  },
  //获取datatable的api
  _getApi: (dtapi) => {
    StaffedAction.viewInited(dtapi);
  },

  //ajax返回数据接收
  _onAjaxDidReceive: (e, settings, json, xhr) => {
    //循环遍历获取到的列表数据
    json.data = json.listData.map((staff) => {
      return {staffId: staff['staffId'], staffImg: staff['staffImg'],staffName: staff['staffName'], staffUid: staff['staffUid'], departName: staff['departName'], roleName: staff['roleName'],staffCellphone:staff['staffCellphone'],staffMail:staff['staffMail'],isvalid:staff['isvalid']};
    })
  },
  _leaderEventHandler: function() {
    let me = this;
    $('#StaffList').on('click', '[name="editButton"]', function(event) {
      var table = $('#StaffList').DataTable();
      var tr = $(this).closest('tr');
      var staff = table.row(tr).data();
      me.setState({staff:staff});
    });
    $('#staffAdd').click(function(){
      me.setState({staff:""});
    })
    //点击设置/取消按钮，触发事件
    $("#leaderSetting").click(function() {
      //获取选中的节点
      var idArray = $('input:checkbox[name="checkbox"]:checked');
      //获取datatable
      var table = $('#StaffList').DataTable();
      //获取选中行
      var tr = $(idArray).closest('tr');
      var leader = [];
      var member = [];
      var staffId = JSON.parse(localStorage.getItem('user')).staffId
      for (var i = 0; i < tr.length; i++) {
        //获取选中行数据
        var staff = table.row(tr[i]).data();
        //当原先是在职的场合
        if (staff.isvalid == 1) {
          leader.push(staff.staffId);
        } else {
          //当原先是不再在职的场合
          member.push(staff.staffId);
        }
        if (staff.staffId == staffId) {
          VsUtil.ShowHintDialog({content: StaffMsg.Msg006});
          return;
        }
      }
      //当没有选中任何数据的场合
      if (leader.length == 0 && member.length == 0) {
        //提示请选择
        VsUtil.ShowHintDialog({content: StaffMsg.Msg005});
        return;
      }
      //执行部门领导设置的Action
      StaffedAction.staffSetting(leader, member);
    });

    $('#StaffList').on('click', 'td:not(:last-child)', function(event) {
      //获取参数信息
      var table = $('#StaffList').DataTable();
      var tr = $(this).closest('tr');
      var row = table.row(tr);
      var visitor = row.data();
      var clickIndex = $(this).parents("tr").find("td").index($(this));
      var input = $(this).children().children();
      //VisitorActions.isShowVisitorInfo("true",visitor);
      if (clickIndex != 0) { //选中除第一列和最后一列以外，tr变色，显示附加信息
        var str = '<form  class="smart-form"><fieldset>' +
        ' <section class="col col-lg-12"><label class="label" >登录名:' + visitor.staffLoginaccount + '</label></section>' + ' <section class="col col-lg-12"><label class="label" >备注:' + visitor.memo + '</label></section>' + '</div></fieldset></form>';
        //tr变色，显示附加信息
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(str).show();
          tr.addClass('shown');
        }
        //check选中
      } else { //设置第一列
        // checkbox选中 tr变色
        if ($(event.target).prop('type') == 'checkbox') {
          if (!input.prop("checked")) {
            input.prop("checked", false);
            tr.css("background-color", "")
          } else {
            input.prop("checked", true);
            tr.css("background-color", "#FFFFE0")
          }
        } else {
          if (input.prop("checked")) {
            input.prop("checked", false);
            tr.css("background-color", "")
          } else {
            input.prop("checked", true);
            tr.css("background-color", "#FFFFE0")
          }
        }
      }
    });

  },
  selectAll(e) { //全选
    let checked = e.target.checked;
    var input = $('input:checkbox[type="checkbox"]');
    var tr = $(input).closest('tr');
    if (input.prop("checked")) {
      input.prop("checked", false);
      tr.css("background-color", "")
    } else {
      input.prop("checked", true);
      tr.css("background-color", "#FFFFE0")
    }
  },
  _onStaffDBStoreListen:function(result){
    switch (result.rtnCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //设置成功
        VsUtil.ShowHintDialog({content: StaffMsg.Msg003});
        break;
      default:
       //设置失败
        VsUtil.ShowHintDialog({content: StaffMsg.Msg004});
        break;
    }
  },
  render: function() {
    let companyId = JSON.parse(localStorage.getItem('user')).companyId
    let departId = JSON.parse(localStorage.getItem('user')).departId
    let userType = localStorage.getItem('userType');
    if (!departId && userType == "company-admin") {
      departId = 0;
    }
    let options = {
      ajax: '/staff/list/' + departId + '/' + companyId,
      columns: [
        //checkbox列
        {
          data: "staffId",
          orderable: false,
          //自定义列表数据样式
          render: function(data) {
            return '<input name="checkbox"  class="staff" type="checkbox" style="width:15px;height:15px;margin-left:30%"  value = "' + data + '"/>';
          }
        },
        //人物头像
        {
          data: "staffImg",
          orderable: false,
          render: function(data) {
            return '<div style="text-align:center"><img src="' + data + '" width="45px" height="60px"/></div>';
          }
        },
        //员工姓名
        {
          data: "staffUid"
        }, {
          data: "staffName"
        }, {
          data: "staffCellphone",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "staffMail"
        }, {
          data: "departName"
        }, {
          data: "roleName"
        },
        //责任人设置
        {
          data: "isvalid",
          render: function(data) {
            if (data == 0) {
              data = "block"
            } else {
              data = "none"
            }
            return '<span class="btn-primary" style="display:' + data + ';width:80px;margin-left:35%;text-align:center">离职</span><span style="display:none">' + data + '</span>';
          }
        }, {
          data: "staffId",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;"><div style="text-align:center;vertical-align:middel;"><input name="editButton" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#StaffEditor" value="编辑"/></div><span style="display:none">' + data + '</span></div>';
          }
        }
      ],
      aLengthMenu: [5], //分页 每页数据长度
      "order": [
        [2, 'asc'] //排序
      ]
    };
    return (
      <div id="content">
        <JarvisWidget className="well" editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
          <header>
            <span className="widget-icon">
              <i className="fa fa-table"/>
            </span>
            <h2>部门员工
            </h2>
            <div className="widget-toolbar">
              <a id="leaderSetting" href-void className="btn-primary right-top-button" style={{
                padding: "5px 30px 5px",
                margin: "5px"
              }}>员工状态&nbsp;&nbsp;在职&nbsp;/&nbsp;离职</a>

              <a id="a2" href-void className="btn-primary right-top-button" id="staffAdd" data-toggle="modal" data-target="#StaffEditor" name="uuser" style={{
                padding: "5px 30px 5px",
                margin: "5px"
              }}>新增</a>

              <a href-void className="btn-primary right-top-button" data-toggle="modal" data-target="#batchimport" style={{
                padding: "5px 30px 5px",
                margin: "5px"
              }}>批量导入</a>
            </div>

          </header>
          <div>
            <div className="widget-body no-padding" >
              <Datatable id="StaffList" filter={true} autoWidth={true} getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} filter={true} options={options} className="display projects-table table table-striped table-bordered table-hover " width="100%">
                <thead >
                  <tr>
                    <th bsort="false" style={{
                      "textAlign": "center",
                      width: "3%"
                    }}>
                      <input type='checkbox' className="checkboxs" onChange={this.selectAll}/></th>
                    <th data-class="expand" style={{
                      "textAlign": "center",
                      width: "0.9%"
                    }}></th>
                    <th data-class="expand" style={{
                      "textAlign": "center",
                      width: "10%"
                    }}>用户ID</th>
                    <th style={{
                      "textAlign": "center",
                      width: "10%"
                    }}>姓名</th>
                    <th style={{
                      "textAlign": "center",
                      width: "10%"
                    }}>手机号</th>
                    <th style={{
                      "textAlign": "center",
                      width: "10%"
                    }}>邮箱</th>
                    <th style={{
                      "textAlign": "center",
                      width: "10%"
                    }}>所属部门</th>
                    <th style={{
                      "textAlign": "center",
                      width: "10%"
                    }}>角色</th>
                    <th style={{
                      "textAlign": "center",
                      width: "10%"
                    }}>在职状态</th>
                    <th style={{
                      "textAlign": "center",
                      width: "9%"
                    }}>操作</th>
                  </tr>
                </thead>
              </Datatable>
            </div>
          </div>
          <BatchImport/>
        </JarvisWidget>
        {/* <StaffedAdd/> */}
        <StaffedEditor staff={this.state.staff}/>
      </div>
    )
  }
});

export default StaffTable
