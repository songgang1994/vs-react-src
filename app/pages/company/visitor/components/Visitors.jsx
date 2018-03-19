/**
 * 访客审批画面
 * Created by songgang on 2017/11/2.
 */
// 导入React组件
import React from 'react'
// 导入Reflux组件
import Reflux from 'reflux'
import _ from 'lodash'

// 导入共通组件
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
//import VisitorListDBStore from '../stores/VisitorListDBStore.js'
//import VisitorListAction from '../actions/VisitorListAction.js'

// 导入modal
import RefuseModal from '../../../util/components/Refuse.jsx'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

let VisitorApprove = React.createClass({
  //  画面渲染
  render: function() {
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <Visitors/>
            </div>
          </div>
        </WidgetGrid>
      </div>
    )
  }
});

let Visitors = React.createClass({
  //  画面初始state生成
  getInitialState: function() {
    let userid = JSON.parse(localStorage.getItem('user')).staffId;
    let departid = JSON.parse(localStorage.getItem('user')).departId;
    let companyid = JSON.parse(localStorage.getItem('user')).companyId;
    let roleid = JSON.parse(localStorage.getItem('user')).roleId;
    return {
      modal: {}, //存储模态框数据的对象
      tableData:{// 存储DataTable 请求数据的对象
        roleId: roleid,
        departId: departid,
        companyId: companyid,
        staffId: userid,
        checkState: 0
      }
    }
  },

  //  画面渲染之后
  componentDidMount: function() {

    //  画面控件事件绑定
    this._registerEventHandler();

    //  监听同意访客事件，执行_onAgreeVisitorInvitationSuccess()
    //this.unsubscribeVisitorAgree = VisitorListDBStore.listen(this._onAgreeVisitorInvitationSuccess);
  },

  //  解除绑定
  componentWillUnmount: function() {
    //  解除对同意访客事件的监听
    //this.unsubscribeVisitorAgree();
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 不要在HTML标签中写onXXX={this.XXX}

  _registerEventHandler: function() {
    let me = this;

    //  对DataTable 动态生成的button 进行监听
    $('#VisitorList').on('click', 'button', function(event) {
      //  获取参数信息
      // let table = me.refs.VisitorList.getApi();
      let table = $('#VisitorList').DataTable();
      let tr = $(this).closest('tr');
      let row = table.row(tr);
      let visitor = row.data();
      //  获取当前舰艇按钮名称
      let button = event.target.name;
      //  visitorId获取
      let visitorsId = [];
      visitorsId.push(visitor.visitorId);
      let userId = JSON.parse(localStorage.getItem('user')).staffId;
      if (button == "refuse") { //  拒绝按钮
        me.setState({
          modal: {
            url: "/visitor/checkVisitor",
            data: visitorsId,
            traditional: true,
            state: 2,
            userId: userId
          }
        });
      } else if (button == "agree") { //  同意按钮
        let visitorApproveData = {
          staffId: JSON.parse(localStorage.getItem('user')).staffId,
          checkState: 1,
          memo: $('#reason').val(),
          ids: visitorsId
        }
        //VisitorListAction.agreeVisitorInvitation(visitorApproveData);
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
          VsUtil.ShowHintDialog({content: "未选中访客"});
          return false;
        }
      }
      //  选中checkbox
      if (a == "refuse") { // 拒绝
        let userId = JSON.parse(localStorage.getItem('user')).staffId;
        me.setState({
          modal: {
            url: "/visitor/checkVisitor",
            data: visitorsId,
            traditional: true,
            state: 2,
            userId: userId

          }
        });
      } else if (a == "agree") { // 同意
        let visitorApproveData = {
          staffId: JSON.parse(localStorage.getItem('user')).staffId,
          checkState: 1,
          memo: $('#reason').val(),
          ids: visitorsId
        }
        //VisitorListAction.agreeVisitorInvitation(visitorApproveData);
      } else {
        //  预留页面其他<a />点击事件
      }
    });
  },

  //  同意/拒绝 成功回调
  _onAgreeVisitorInvitationSuccess: function(result) {
    let me = this;
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //  showMsg
        VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]})
        //  DataTable reload
        let table = $('#VisitorList').DataTable();
        table.ajax.reload();
        //me.refs.VisitorList.getApi().ajax.reload()
        break;
      case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
        break;
    }
  },
  _format:function(rowdata) {
    return '<form  class="smart-form"><fieldset>' +
    ' <section class="col col-lg-12"><label class="label" >备注:' + rowdata.memo + '</label></section>' + '</div></fieldset></form>';
  },
  //  画面渲染
  render: function() {
    let me = this;
    //  设置Datatable 属性
    let options = {
      ajax: {
        url: '/visitor/',
        data:me.state.tableData
      },
      order: [
        [7, 'desc']
      ],
      columns: [
        {
          data: "visitorId",
          orderable: false,
          render: function(data) {
            return '<div class="text-center"><input  type="checkbox" class="visitors"  name="checkbox"  value = "' + data + '" /></div>';
          }
        }, {
          orderable: false,
          data: "visitorImg",
          render: function(data) {
            return '<div class="text-center"><img src=' + data + ' width="45" height="60"></img></div>';
          }
        }, {

          data: "visitorName",
          render: function(data) {
            return '<div class="text-left">' + data + '</div>';
          }
        }, {

          data: "visitorIdcard",
          render: function(data) {
            return '<div class="text-center">' + data + '</div>';
          }
        }, {

          data: "visitorCellphone",
          render: function(data) {
            return '<div class="text-center">' + data + '</div>';
          }
        }, {

          data: "companyName",
          render: function(data) {
            return '<div class="text-left">' + data + '</div>';
          }
        }, {

          data: "visitorMail",
          render: function(data) {
            return '<div class="text-left">' + data + '</div>';
          }
        }, {
          render: function(data, type, row, meta) {
            return '<div class="text-center">' + row.termOfValidityBegin + ' ~ ' + row.termOfValidityEnd + '</div>';
          }
        }, {
          data: "visitorId",
          render: function(data) {
            return '<div  class="text-center"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#refuseModal"  name="refuse">拒绝</button>&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" name="agree"  >同意</button></div>';
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
          <h2>访客列表</h2>
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
          <div className="widget-body no-padding"><RefuseModal extraParam={this.state.modal} rtnModal={this._onAgreeVisitorInvitationSuccess}/>
            <Datatable detailsFormat={this._format}  options={options} ref="VisitorList" id="VisitorList" filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
              <thead>
                <tr>
                  <th width="5%">
                    <input type='checkbox' id="selectAll" className="checkboxs" name="checkboxs"/></th>
                  <th data-class="expand" width="5%"></th>
                  <th width="10%">
                    <div className="text-center">姓名</div>
                  </th>
                  <th width="10%">
                    <div className="text-center">身份证号</div>
                  </th>
                  <th width="10%">
                    <div className="text-center">手机</div>
                  </th>
                  <th width="15%">
                    <div className="text-center">公司</div>
                  </th>
                  <th width="10%">
                    <div className="text-center">邮箱</div>
                  </th>
                  <th>
                    <div className="text-center">访问时效</div>
                  </th>
                  <th width="15%">
                    <div className="text-center">操作</div>
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

export default VisitorApprove
