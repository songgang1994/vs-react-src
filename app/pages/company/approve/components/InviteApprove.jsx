/**
 * 邀请审批画面
 * Created by caowj on 2017/11/7.
 */
// 导入React组件
import React from 'react'
// 导入Reflux组件
import Reflux from 'reflux'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
// 导入modal
import RefuseModal from '../../../util/components/Refuse.jsx'
import CheckAction from '../actions/InviteApproveAction.js'
import CheckStore from '../stores/InviteDBStore.js'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';

//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

let InviteApprove = React.createClass({

  render: function() {
    let that = this;
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <InviteCheck/>
            </div>
          </div>
        </WidgetGrid>
      </div>
    )
  }
});

let InviteCheck = React.createClass({

  //  画面初始state生成
  getInitialState: function() {
    return {modal: {}}
  },

  // 画面渲染之后
  componentDidMount: function() {
    // 画面控件事件绑定
    this._registerEventHandler();
    //  监听同意事件，执行_onAgreeInviteSuccess()
    this.unsubscribeInvitationAgree = CheckStore.listen(this._onAgreeInviteSuccess);
  },

  componentWillUnmount: function() {
    //  解除对同意邀请事件的监听
    this.unsubscribeInvitationAgree();
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 不要在HTML标签中写onXXX={this.XXX}
  _registerEventHandler: function() {
    let me = this;
    // 行点击事件
    $('#inviteList').on('click', 'td:not(:last-child)', function(event) { //监听表单除最后一列的其他列
      //获取参数信息
      let table = $('#inviteList').DataTable();
      let tr = $(this).closest('tr');
      let row = table.row(tr);
      let invitaor = row.data();
      let clickIndex = $(this).parents("tr").find("td").index($(this));
      let input;
      if (clickIndex != 0) { //选中除第一列和最后一列以外，tr变色，显示附加信息
        let infoList = row.data().visitorInfo;
        let line = Math.ceil((infoList.length) / 4);
        let str = '<form class="smart-form" ><fieldset><div class="row"><section class="col col-lg-3"><label class="label" ><h3>访客信息:';
        if (line == 0) {
          str += '(暂无访客)';
        }
        str += '</h3></label></section></div>';
        for (let j = 0; j < line; j++) {
          if (Math.ceil(j / 4) <= line) {
            str = str + '<div class="row">';
            for (let i = 0; i < infoList.length; i++) {
              str += '<section class="col col-lg-3"><label class="label" >受访人姓名:' + infoList[i].visitorName + '</label><label class="label" >受访人公司:' + infoList[i].companyName + '</label></section>';
            }
            str += '</div>';
          }
        }
        str += '<div class="row"><section class="col col-lg-3"><label class="label" ><h3>拜访地址:</h3>' + invitaor.address + '</label></section><section class="col col-lg-3"><label class="label" ><h3>备注:</h3>' + invitaor.memo + '</label></section></div></fieldset></form>';

        //tr变色，显示附加信息
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(str).show();
          tr.addClass('shown');
        }
      } else { //设置第一列
        // checkbox选中 tr变色
        input = $(this).children().children();
        $(input).click(function(e) {
          e.stopPropagation();
        });
        if (input.prop("checked")) {
          input.prop("checked", false);
          tr.css("background-color", "")
        } else {
          input.prop("checked", true);
          tr.css("background-color", "#FFFFE0")
        }
      }
    });

    //对DataTable 动态生成的button 进行监听
    $('#inviteList').on('click', 'button', function(event) {

      let table = $('#inviteList').DataTable();
      let tr = $(this).closest('tr');
      let row = table.row(tr);
      let visitor = row.data();
      let button = event.target.name;
      let visitorsId = [];
      visitorsId.push(visitor.inviteId);
      if (button == "refuse") { // 拒绝
        let userId = JSON.parse(localStorage.getItem('user')).staffId;
        me.setState({
          modal: {
            url: "/invitecheck/checkVisitor",
            data: visitorsId,
            traditional: true,
            state: 2,
            userId: userId
          }
        });
      } else if (button == "agree") { // 同意
        let ApproveData = {
          staffId: JSON.parse(localStorage.getItem('user')).staffId,
          checkState: 1,
          memo: $('#reason').val(),
          ids: visitorsId
        }
        CheckAction.agreeInvite(ApproveData);
      } else {
        //  预留表单其他按钮
      }

    });

    // 全选 checkbox 监听
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
          VsUtil.ShowHintDialog({content: "未选中访客"});
          return false;
        }
      }
      let userId = JSON.parse(localStorage.getItem('user')).staffId;
      //  选中checkbox
      if (a == "refuse") { // 拒绝
        me.setState({
          modal: {
            url: "/invitecheck/checkVisitor",
            data: visitorsId,
            traditional: true,
            state: 2,
            userId: userId
          }
        });
      } else if (a == "agree") { // 同意
        let ApproveData = {
          staffId: JSON.parse(localStorage.getItem('user')).staffId,
          checkState: 1,
          memo: $('#reason').val(),
          ids: visitorsId
        }
        CheckAction.agreeInvite(ApproveData);
      } else {
        //  预留页面其他<a />点击事件
      }
    });

  },

  //  同意/拒绝 成功回调
  _onAgreeInviteSuccess: function(result) {
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //  showMsg
        VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        //  DataTable reload
        let table = $('#inviteList').DataTable();
        table.ajax.reload();
        break;
      case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
        break;
    }
  },

  render: function() {
    let me = this;
    // 表头内容居中样式
    let companyId = JSON.parse(localStorage.getItem('user')).companyId;
    let departId = JSON.parse(localStorage.getItem('user')).departId;
    let styleTable = {
      textAlign: "center",
      verticalAlign: "middel"
    };
    let options = {
      ajax: '/invitecheck/',
      aLengthMenu: [5],
      order: [
        [1, 'desc']
      ],
      data: {
        companyId: companyId,
        departId: departId
      },
      columns: [
        {
          data: "inviteId",
          orderable: false,
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;"><input type="checkbox" class="staff"  name="checkbox" value = "' + data + '"/></div>';
          }
        }, {
          data: "staffName",
          render: function(data) {
            return '<div style="text-align:left;vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "inviteType",
          render: function(data) {
            if (data == 0) {
              data = "面试"
            } else if (data == 1) {
              data = "商务"
            } else if (data == 2) {
              data = "私人"
            } else if (data == 3) {
              data = "其他"
            }
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }, {
          data: "visitornum",
          render: function(data) {
            return '<div style="vertical-align:middel;">' + data + '</div>';
          }
        }, {
          render: function(data, type, row, meta) {
            return '<div style="text-align:center;vertical-align:middel;">' + row.inviteDate + ' ' + row.inviteBeginTime + ' ~ ' + row.inviteDate + ' ' + row.inviteEndTime + '</div>';
          }
        }, {
          render: function(data, type, row, meta) {
            return '<div style="vertical-align:middel;">' + row.roomName + '</div>' + '<div style="vertical-align:middel;">' + row.roomStarttime + ' ~ ' + row.roomEndtime + '</div>';
          }
        }, {
          data: "inviteId",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;"><div style="text-align:center;vertical-align:middel;"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#refuseModal"  name="refuse">拒绝</button>&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" name="agree" >同意</button></div></div>';
          }
        }
      ]
    };
    return (

      <JarvisWidget className="well" colorbutton={false} sortable={true} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
        <header>
          <span className="widget-icon">
            <i className="fa fa-table"/>
          </span>
          <h2>邀请列表</h2>
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
          <div className="widget-body no-padding"><RefuseModal extraParam={this.state.modal} rtnModal={this._onAgreeInviteSuccess}/>
            <Datatable options={options} id="inviteList" filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
              <thead>
                <tr>
                  <th width="5%">
                    <input type='checkbox' id="selectAll" className="checkboxs" name="checkboxs"/></th>
                  <th width="10%">
                    <div style={styleTable}>邀请人姓名</div>
                  </th>
                  <th width="10%">
                    <div style={styleTable}>邀请事由</div>
                  </th>
                  <th width="10%">
                    <div style={styleTable}>访客人数</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>预计访问时间</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>预约会议室信息</div>
                  </th>
                  <th width="10%">
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

export default InviteApprove
