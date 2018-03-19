/**
 * 部门员工列表画面
 * Created by lihui on 2017/11/2.
 */
// 导入React组件
import React from 'react'

// ----------------------- 引用组件 ------------------------------ //
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let StaffMsg = window.MSG_GLOBALS.StaffMsg;

// ----------------------- 引用自定义组件 ------------------------------ //
// import StaffAdd from '../../staff/components/StaffAdd.jsx'

// ----------------------- 引用Action和Store --------------------- //
import DepartStaffListAction from './../actions/DepartStaffListAction'
import StaffDeleteDBStore from './../stores/StaffDeleteDBStore'
import RoleSettingDBStore from './../stores/RoleSettingDBStore'

let DepartStaffList = React.createClass({
  getInitialState: function() {
    return {departId: ""}
  },
  //画面渲染之后执行
  componentDidMount: function() {
    //画面控件事件绑定
    this._departEventHander();
    //监听部门员工移除事件,当移除员工后，执行_onDeleteDBStoreListen方法
    this.unsubscribeDB = StaffDeleteDBStore.listen(this._onDeleteDBStoreListen);
    //监听部门领导移除事件,当设置后，执行__onRoleDBStoreListen方法
    this.unsubscribe = RoleSettingDBStore.listen(this._onRoleDBStoreListen);
  },

  componentWillUnmount: function() {
      // 解除对事件的监听
      this.unsubscribe();
      this.unsubscribeDB();
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
      DepartStaffListAction.staffList(departId,companyId);
    }
  },
  _departEventHander: function(){
     //datatable行点击事件绑定
    this._dataTableEventHandler();
    //部门领导设置事件绑定
    this._leaderEventHandler();
    //全选事件绑定
    this._selectAllEventHandler();
    //移除事件绑定
    this._staffDeleteEventHandler();
  },
  //datatable行点击事件处理
  _dataTableEventHandler: function() {
    //触发点击事件
    $('#StaffMain').on("click", "td", function() {
      //获取选中tr
      let tr = $(this).closest('tr');
      //获取点击td
      let clickTd = $(this).parents("tr").find("td").index($(this));
      //当点击不为checkbox的场合
      if (clickTd != 0) {
        if ($(".staff", tr)[0].checked == false) {
          $(".staff", tr)[0].checked = true;
        } else {
          //取消选中
          $(".staff", tr)[0].checked = false;
        }
      }
      if ($(".staff", tr)[0].checked == true) {
        tr[0].style.background = "#FFFFE0";
      } else {
        tr[0].style.background = "";
      }
    });
  },

  //责任人任命取消事件处理
  _leaderEventHandler: function() {
    //点击设置/取消按钮，触发事件
    $("#leaderSetting").click(function() {
      //获取选中的节点
      let idArray = $('input:checkbox[name="checkbox"]:checked');
      //获取datatable
      let table = $('#StaffMain').DataTable();
      //获取选中行
      let tr = $(idArray).closest('tr');
      let leader = [];
      let member = [];
      let staffId = JSON.parse(localStorage.getItem('user')).staffId
      for(let i=0;i<tr.length;i++){
        //获取选中行数据
        let staff = table.row(tr[i]).data();
        //当原先是部门领导的场合
        if(staff.roleId == 2){
          leader.push(staff.staffId);
        } else{
          //当原先是普通员工的场合
          member.push(staff.staffId);
        }
        if(staff.staffId == staffId){
          VsUtil.ShowHintDialog({content: StaffMsg.Msg006});
          return;
        }
      }
      //当没有选中任何数据的场合
      if(leader.length==0&&member.length==0){
        //提示请选择
        VsUtil.ShowHintDialog({content: StaffMsg.Msg005});
        return;
      }
      //执行部门领导设置的Action
      DepartStaffListAction.roleSetting(leader,member);
    });
  },

  //删除事件处理
  _staffDeleteEventHandler: function() {
    //点击移除按钮,触发事件
    $("#staffDelete").click(function() {
      //获取选中行的staffId值
      let idArray = [];
      let staffId = JSON.parse(localStorage.getItem('user')).staffId
      $('input:checkbox[name="checkbox"]:checked').each(function() {
        //判断移除项是否包含自己
        if($(this).val() == staffId){
          VsUtil.ShowHintDialog({content: StaffMsg.Msg007});
          return;
        }
        idArray.push($(this).val());
      })
      //判断至少选中一项
      if(idArray.length==0){
        VsUtil.ShowHintDialog({content: StaffMsg.Msg005});
        return;
      }
      //执行员工移除的Action
      DepartStaffListAction.staffDelete(idArray);
    })
  },

  //获取datatable的api
  _getApi: (dtapi) => {
    DepartStaffListAction.viewInited(dtapi);
  },

  //ajax返回数据接收
  _onAjaxDidReceive: (e, settings, json, xhr) => {
    //循环遍历获取到的列表数据
    json.data = json.listData.map((staff) => {
      return {staffId: staff['staffId'], staffImg: staff['staffImg'],staffName: staff['staffName'], staffUid: staff['staffUid'], departName: staff['departName'], roleId: staff['roleId']};
    })
  },

  //全选事件处理
  _selectAllEventHandler: function() {
    $("#selectAllbox").change(function(event) {
      let checked = event.target.checked;
      $('input:checkbox[name="checkbox"]').prop('checked', checked);
      for (let i = 0; i < $("#StaffMain tr").length; i++) {
        //添加背景色
        if ($(".staff", $("#StaffMain tr"))[0].checked != true) {
          $("#StaffMain tr")[i].style.background = "";
        } else {
          //消除背景色
          $("#StaffMain tr")[i].style.background = "	#FFFFE0";
        }
      }
      $("#StaffMain tr")[0].style.background = "";
    });
  },

  //移除员工后,监听返回信息
  _onDeleteDBStoreListen:function(result){
    switch (result.rtnCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //移除成功
        VsUtil.ShowHintDialog({content: StaffMsg.Msg001});
        break;
      default:
       //移除失败
        VsUtil.ShowHintDialog({content: StaffMsg.Msg002});
        break;
    }
  },

  //设置部门领导后，监听返回信息
  _onRoleDBStoreListen:function(result){
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

  //画面渲染
  render: function() {
    let companyId = JSON.parse(localStorage.getItem('user')).companyId
    let departId = JSON.parse(localStorage.getItem('user')).departId
    let userType = localStorage.getItem('userType');
    if(!departId&&userType == "company-admin"){
      departId = 0;
    }
    //列表参数
    let options = {
      ajax:'/staff/list/' + departId + '/' + companyId,
      columns: [
        //checkbox列
        {
          data: "staffId",
          orderable: false,
          //自定义列表数据样式
          render: function(data) {
            return '<input name="checkbox" class="staff" type="checkbox" style="width:15px;height:15px;margin-left:30%"  value = "' + data + '"/>';
          }
        },
        //人物头像
        {
          data: "staffImg",
          orderable: false,
          render: function(data) {
            return '<div style="text-align:center"><img src="'+ data +'" width="45px" height="60px"/></div>';
          }

        },
        //员工姓名
        {
          data: "staffName"
        },
        //员工id
        {
          data: "staffUid"
        },
        //部门名称
        {
          data: "departName",
        },
        //责任人设置
        {
          data: "roleId",
          render: function(data) {
            if (data == 2) {
              data = "block"
            } else {
              data = "none"
            }
            return '<span class="btn-primary" style="display:' + data + ';width:80px;margin-left:35%;text-align:center">部门领导</span><span style="display:none">' + data + '</span>';
          }
        }
      ],
      aLengthMenu: [5], //分页 每页数据长度
      "order": [
        [2, 'asc']     //排序
      ]
    };
    return (
      //员工列表
      <div id="onDepartId">
        {/* JarvisWidget start：局部页面设置 */}
        <JarvisWidget className="well" colorbutton={false} sortable={true} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
          {/*header start:画面头部设计 */}
          <header>
            <span className="widget-icon">
              <i className="fa fa-table"/>
            </span>
            <h2>部门员工
            </h2>

            <div className="widget-toolbar">
            <a id="leaderSetting" href-void className="btn-primary"  style={{
              padding:"5px 30px 5px",
              margin: "5px"
            }}>部门领导&nbsp;&nbsp;设置&nbsp;/&nbsp;取消</a>

            <a id="staffAdd" data-toggle="modal" data-target="#StaffAdd" className="btn-primary" style={{
              padding: "5px 30px 5px",
              margin: "5px"
            }}>添加</a>

            <a href-void id="staffDelete" className="btn-primary" style={{
              padding: "5px 30px 5px",
              margin: "5px"
            }}>移除</a>

            </div>
          </header>
          {/*header end */}
          {/* body start*/}
          <div>
            <div className="widget-body no-padding" style={{
              height: '560px'
            }}>
              {/* 新增modal弹框 */}
              {/* <StaffAdd departId={this.state.departId}/> */}
              {/* datatable start 功能以及列表样式设置*/}
              <Datatable getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} options={options} id="StaffMain" filter={true} autoWidth={true} className="display projects-table table table-striped table-bordered table-hover" width="100%">
                {/* 表头 每列说明 */}
                <thead>
                  <tr className="title">
                    {/*全选checkbox*/}
                    <th width="5%">
                      <input id="selectAllbox" type='checkbox' className="checkboxs" style={{
                        "width": '15px',
                        "height": '15px'
                      }}/></th>
                      {/* 头像 */}
                    <th width="10%"></th>
                    <th width="20%" style={{
                      "textAlign": "center"
                    }}>姓名</th>
                    <th width="20%" style={{
                      "textAlign": "center"
                    }}>用户ID</th>
                    <th width="20%" style={{
                      "textAlign": "center"
                    }}>所属部门</th>
                    <th width="20%" style={{
                      "textAlign": "center"
                    }}>职位</th>
                  </tr>
                </thead>
              </Datatable>
              {/* datatable end */}
            </div>
          </div>
          {/* body end*/}
        </JarvisWidget>
      </div>
    )
  }
});
export default DepartStaffList
