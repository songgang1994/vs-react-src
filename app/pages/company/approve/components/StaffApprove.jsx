/**
 * 员工审批画面
 * Created by caowj on 2017/11/13.
 */
// 导入React组件
import React from 'react'
// 导入Reflux组件
import Reflux from 'reflux'

// 导入共通组件
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import StaffStore from '../stores/StaffDBStore.js'
import StaffCheckAction from '../actions/StaffApproveAction.js'
// 导入modal
import RefuseModal from '../../../util/components/Refuse.jsx'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

let StaffApprove = React.createClass({

  //  画面渲染
  render: function() {
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <StaffCheck/>
            </div>
          </div>
        </WidgetGrid>
      </div>
    )
  }
});

let StaffCheck = React.createClass({
  //  画面初始state生成
  getInitialState: function() {
    return {
      modal: {}
    }
  },

  //  画面渲染之后
  componentDidMount: function() {

    //  画面控件事件绑定
    this._registerEventHandler();

    //  监听同意访客事件，执行_onAgreeStaffSuccess()
    this.unsubscribeStaffAgree = StaffStore.listen(this._onAgreeStaffSuccess);
  },

  //  解除绑定
  componentWillUnmount: function() {
    //  解除对同意员工事件的监听
    this.unsubscribeStaffAgree();
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 不要在HTML标签中写onXXX={this.XXX}
  _registerEventHandler: function() {
    let me = this;
    // 行点击事件
    $('#StaffList').on('click', 'td:not(:last-child)', function(event) { // 监听表单除最后一列的其他列
      //  获取参数信息
      let table = $('#StaffList').DataTable();
      let tr = $(this).closest('tr');
      let row = table.row(tr);
      let visitor = row.data();
      let clickIndex = $(this).parents("tr").find("td").index($(this));
      let input;
      if (clickIndex != 0) { // 选中除第一列和最后一列以外，tr变色，显示附加信息
        let str = '<form  class="smart-form"><fieldset>' +
        ' <section class="col col-lg-12"><label class="label" >备注:' + visitor.memo + '</label></section>' + '</div></fieldset></form>';
        //  tr变色，显示附加信息
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(str).show();
          tr.addClass('shown');
        }
      } else { // 设置第一列
        //  checkbox选中 tr变色
        input = $(this).children().children();
        //  防止checkbox冒泡
        $(input).click(function(e) {
          e.stopPropagation();
        });
        //  设置变色选中
        if (input.prop("checked")) {
          input.prop("checked", false);
          tr.css("background-color", "")
        } else {
          input.prop("checked", true);
          tr.css("background-color", "#FFFFE0")
        }
      }
    });

    //  对DataTable 动态生成的button 进行监听
    $('#StaffList').on('click', 'button', function(event) {
      //  获取参数信息
      let table = $('#StaffList').DataTable();
      let tr = $(this).closest('tr');
      let row = table.row(tr);
      let visitor = row.data();
      //  获取当前舰艇按钮名称
      let button = event.target.name;
      //  visitorId获取
      let visitorsId = [];
      visitorsId.push(visitor.staffId);
      let userId = JSON.parse(localStorage.getItem('user')).staffId;
      if (button == "refuse") { //  拒绝按钮
        me.setState({
          modal: {
            url:"/staff/checkStaff",
            data:visitorsId,
            traditional:true,
            state:2,
            userId:userId
          }
        });
      } else if (button == "agree") { //  同意按钮
        let staffApproveData = {
          staffId: JSON.parse(localStorage.getItem('user')).staffId,
          checkState: 1,
          memo: $('#reason').val(),
          ids: visitorsId
        }
        StaffCheckAction.agreeStaff(staffApproveData);
      } else {
        //  预留表单其他按钮
      }
    });

    //  全选 checkbox 监听
    $('#selectAll').change(function(event) {
      let checked = event.target.checked;
      let input = $('input:checkbox[type="checkbox"]');
      let tr = $(input).closest('tr');
      if (input.prop("checked")) {
        input.prop("checked", false);
        tr.css("background-color", "")
      } else {
        input.prop("checked", true);
        tr.css("background-color", "#FFFFE0")
      }
    });

    //  <a /> 标签监听
    $("a").click(function(event) {
      //  获取实际点击的<a />标签
      let modal = event.target.dataset.toggle;
      let a = event.target.name;
      //  获取所有选中的checkbox
      let visitorsId = [];
      $.each($('input:checkbox[name="checkbox"]:checked'), function() {
        visitorsId.push($(this).val())
      });
      //  未选中任何 checkbox，不弹出 modal ，并提示message
      if (visitorsId.length == 0) {
        modal = ""; //  取消modal属性
        if (a == "refuse" || a == "agree") {
          VsUtil.ShowHintDialog({content: "未选中员工"});
          return false;
        }
      }
      //  选中checkbox
      if (a == "refuse") { // 拒绝
        let userId = JSON.parse(localStorage.getItem('user')).staffId;
        me.setState({
          modal: {
            url:"/staff/checkStaff",
            data:visitorsId,
            traditional:true,
            state:2,
            userId:userId
          }
        });
      } else if (a == "agree") { // 同意
        let staffApproveData = {
          staffId: JSON.parse(localStorage.getItem('user')).staffId,
          checkState: 1,
          memo: $('#reason').val(),
          ids: visitorsId
        }
        StaffCheckAction.agreeStaff(staffApproveData);
      } else {
        //  预留页面其他<a />点击事件
      }
    });
  },

  //  同意/拒绝 成功回调
  _onAgreeStaffSuccess: function(result) {
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //  showMsg
        VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        //  DataTable reload
        let table = $('#StaffList').DataTable();
        table.ajax.reload();
        break;
      case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
        break;
    }
  },

  //  画面渲染
  render: function() {
    let me = this;
    let userid = JSON.parse(localStorage.getItem('user')).staffId;
    //  表头内容居中样式
    let styleTable = {
      textAlign: "center",
      verticalAlign: "middel"
    };
    //  设置Datatable 属性
    let options = {
      ajax: '/staff/',
      aLengthMenu: [5],
      order: [
        [2, 'desc']
      ],
      data: {
        userId: userid
      },
      columns: [
        {
          data: "staffId",
          orderable: false,
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;"><input  type="checkbox" class="visitors"  name="checkbox"  value = "' + data + '" /></div>';
          }
        }, {
          orderable: false,
          data: "staffImg",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;"><img src=' + data + ' width="45" height="60"></img></div>';
          }
        }, {
          data: "staffUid",
          render: function(data) {
            return '<div style="vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "staffName",
          render: function(data) {
            return '<div style="vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "staffCellphone",
          render: function(data) {
          return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "staffMail",
          render: function(data) {
            return '<div  style="vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "departName",
          render: function(data, type, row, meta) {
          return '<div  style="vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "roleName",
          render: function(data, type, row, meta) {
          return '<div  style="vertical-align:middel;">' + data + '</div>';
          }
        },{
          data: "staffId",
          render: function(data) {
            return '<div  class="col-md-12" style="text-align:center;vertical-align:middel;"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#refuseModal"  name="refuse">拒绝</button>&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" name="agree"  >同意</button></div>';
          }
        }
      ]
    };
    return (
      <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
        <header>
          <span className="widget-icon">
            <i className="fa fa-table"/>
          </span>
          <h2>员工列表</h2>
          <div className="widget-toolbar">
            <a className="btn-primary" name="agree" style={{
              padding: "5px 50px 5px"
            }}>同意</a>
          </div>
          <div className="widget-toolbar">
            <a href-void className="btn-primary" name="refuse" data-toggle="modal" data-target="#refuseModal" style={{
              padding: "5px 50px 5px"
            }}>拒绝</a>
          </div>
        </header>
        <div>
          <div className="widget-body no-padding"><RefuseModal extraParam={this.state.modal} rtnModal={this._onAgreeStaffSuccess}/>
            <Datatable options={options} id="StaffList" filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
              <thead>
                <tr>
                  <th width="5%">
                    <input type='checkbox' id="selectAll" className="checkboxs" name="checkboxs"/></th>
                  <th data-class="expand" width="5%"></th>
                  <th width="10%">
                    <div style={styleTable}>用户ID</div>
                  </th>
                  <th width="10%">
                    <div style={styleTable}>姓名</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>手机号</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>邮箱</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>所属部门</div>
                  </th>
                  <th>
                    <div style={styleTable}>角色</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>操作</div>
                  </th>
                </tr>
              </thead>
            </Datatable>
          </div>
        </div>
      </JarvisWidget>
    )
  }
});

export default StaffApprove
