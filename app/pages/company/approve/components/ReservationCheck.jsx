/**
 * 审批画面
 * Created by songgang on 2017/11/2.
 */
// 导入React组件
import React from 'react'
// 导入Reflux组件
import Reflux from 'reflux'

// 导入共通组件
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import VisitorApproveDBStore from '../stores/VisitorApproveDBStore.js'
import VisitorApproveAction from '../actions/VisitorApproveAction.js'

// 导入modal
import RefuseModal from '../../../util/components/Refuse.jsx'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

let Projects = React.createClass({
  // 初始化函数执行顺序依次为
  //  1. getInitialState
  //  2. componentWillMount
  //  3. render
  //  4. componentDidMount
  // 画面数据更新执行
  //  1. componentWillReceiveProps(nextProps)
  //  2. shouldComponentUpdate(nextProps, nextState)
  //  3. componentWillUpdate(object nextProps, object nextState)
  //  4. render
  //  5. componentDidUpdate(object prevProps, object prevState)
  // 画面卸载执行
  //  1. componentWillUnmount
  // 其他自定义函数前面统一加_

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
    return {
      modal: {}
    }
  },

  //  画面渲染之后
  componentDidMount: function() {

    //  画面控件事件绑定
    this._registerEventHandler();

    //  监听同意访客事件，执行_onAgreeVisitorInvitationSuccess()
    this.unsubscribeVisitorAgree = VisitorApproveDBStore.listen(this._onAgreeVisitorInvitationSuccess);
  },

  //  解除绑定
  componentWillUnmount: function() {
    //  解除对同意访客事件的监听
    this.unsubscribeVisitorAgree();
  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 不要在HTML标签中写onXXX={this.XXX}
  _registerEventHandler: function() {
    let me = this;
    // 行点击事件
    $('#VisitorList').on('click', 'td:not(:last-child)', function(event) { // 监听表单除最后一列的其他列
      //  获取参数信息
      var table = $('#VisitorList').DataTable();
      var tr = $(this).closest('tr');
      var row = table.row(tr);
      var visitor = row.data();
      var clickIndex = $(this).parents("tr").find("td").index($(this));
      var input;
      // if (clickIndex != 0) { // 选中除第一列和最后一列以外，tr变色，显示附加信息
      //   var str = '<form  class="smart-form"><fieldset>' +
      //   ' <section class="col col-lg-12"><label class="label" >备注:' + visitor.memo + '</label></section>' + '</div></fieldset></form>';
      //   //  tr变色，显示附加信息
      //   if (row.child.isShown()) {
      //     row.child.hide();
      //     tr.removeClass('shown');
      //   } else {
      //     row.child(str).show();
      //     tr.addClass('shown');
      //   }
      //   //  check选中
      //   //  input = $(this).parents("tr").find("input");
      //   //  if(input.prop("checked")){
      //   //    input.prop("checked", false);
      //   //  }else{
      //   //    input.prop("checked", true);
      //   //  }
      // } else { // 设置第一列
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
      // }
    });

    //  对DataTable 动态生成的button 进行监听
    $('#VisitorList').on('click', 'button', function(event) {
      //  获取参数信息
      var table = $('#VisitorList').DataTable();
      var tr = $(this).closest('tr');
      var row = table.row(tr);
      var visitor = row.data();
      //  获取当前舰艇按钮名称
      let button = event.target.name;
      //  visitorId获取
      let visitorsId = [];
      visitorsId.push(visitor.visitorId);
      let userId = JSON.parse(localStorage.getItem('user')).staffId;
      if (button == "refuse") { //  拒绝按钮
        me.setState({
          modal: {
            url:"/visitor/checkVisitor",
            data:visitorsId,
            traditional:true,
            state:2,
            userId:userId
          }
        });
      } else if (button == "agree") { //  同意按钮
        VisitorApproveAction.agreeVisitorInvitation(visitorsId,1);
      } else {
        //  预留表单其他按钮
      }
    });

    //  全选 checkbox 监听
    $('#selectAll').change(function(event) {
      let checked = event.target.checked;
      var input = $('input:checkbox[type="checkbox"]');
      var tr = $(input).closest('tr');
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
            url:"/visitor/checkVisitor",
            data:visitorsId,
            traditional:true,
            state:2,
            userId:userId

          }
        });
      } else if (a == "agree") { // 同意
        VisitorApproveAction.agreeVisitorInvitation(visitorsId,1);
      } else {
        //  预留页面其他<a />点击事件
      }
    });
  },

  //  同意/拒绝 成功回调
  _onAgreeVisitorInvitationSuccess: function(result) {
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //  showMsg
        VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        //  DataTable reload
        let table = $('#VisitorList').DataTable();
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
    let roleid = JSON.parse(localStorage.getItem('user')).roleId;
    //  表头内容居中样式
    let styleTable = {
      textAlign: "center",
      verticalAlign: "middel"
    };
    //  设置Datatable 属性
    let options = {
      ajax: '/visitor/',
      aLengthMenu: [5],
      order: [
        [3, 'desc']
      ],
      data: {
        userId: userid,
        state: 0 //  只查询个人所属访客
      },
      columns: [
        {
          data: "visitorId",
          orderable: false,
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;"><input  type="checkbox" class="visitors"  name="checkbox"  value = "' + data + '" /></div>';
          }
        }, {
          orderable: false,
          data: "visitorImg",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;"><img src=' + data + ' width="45" height="60"></img></div>';
          }
        }, {

          data: "visitorName",
          render: function(data) {
            return '<div style="vertical-align:middel;">' + data + '</div>';
          }
        }, {

          data: "visitorIdcard",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }, {

          data: "visitorCellphone",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }, {

          data: "companyName",
          render: function(data) {
            return '<div style="vertical-align:middel;">' + data + '</div>';
          }
        }, {

          data: "visitorMail",
          render: function(data) {
            return '<div  style="vertical-align:middel;">' + data + '</div>';
          }
        }, {
          render: function(data, type, row, meta) {
            return '<div style="text-align:center;vertical-align:middel;">' + row.termOfValidityBegin + ' ~ ' + row.termOfValidityEnd + '</div>';
          }
        }, {
          data: "visitorId",
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
          <h2>预约列表</h2>
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
            <Datatable options={options} id="VisitorList" filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
              <thead>
                <tr>
                  <th width="5%">
                    <input type='checkbox' id="selectAll" className="checkboxs" name="checkboxs"/></th>
                  <th data-class="expand" width="5%"></th>
                  <th width="10%">
                    <div style={styleTable}>预约人姓名</div>
                  </th>
                  <th width="10%">
                    <div style={styleTable}>预约人身份证号</div>
                  </th>
                  <th width="10%">
                    <div style={styleTable}>预约人手机</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>预约人所属公司</div>
                  </th>
                  <th width="10%">
                    <div style={styleTable}>预约人邮箱</div>
                  </th>
                  <th>
                    <div style={styleTable}>预约访问时间</div>
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

export default Projects
