/**
 * 邀请一览子画面
 * Created by nicheng on 17/11/14.
 */

import React from 'react'

import _ from 'lodash'

import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import Tagsinput from '../../../../../components/forms/inputs/Tagsinput.jsx'
import DetailActions from '../actions/DetailActions.js'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import InvitelistchildAction from './../actions/InvitelistchildAction.js'
import InviteCheckStateStore from '../stores/InviteCheckStateStore.js'

let Invitelistchild = React.createClass({

  //画面初始state生成
  getInitialState: function() {
    //获取当前时间
    let nowdate = new Date();
    let nowtime = Date.parse(new Date());
    let lastMtime = nowtime-30*24*3600*1000;
    let lastMdate = new Date(lastMtime);

    //字符串拼接当前时间年月日
    let now = nowdate.getFullYear()+"-"+(nowdate.getMonth()+1)+"-"+nowdate.getDate();
    //字符串拼接当前时间年月日
    let lastM =lastMdate.getFullYear()+"-"+(lastMdate.getMonth()+1)+"-"+lastMdate.getDate();
    let userType = localStorage.getItem('userType');
    let companyId = JSON.parse(localStorage.getItem('user')).companyId;
    let departId = JSON.parse(localStorage.getItem('user')).departId;
    let staffId = JSON.parse(localStorage.getItem('user')).staffId;

    return {
      //初始化参数对象
      invitevisitor: {
        //公司id
        companyId: companyId,
        //部门id
        departId: departId,
        //员工id
        staffId: staffId,
        //登录用户类型
        userType: userType,
        inviteTypeStr:"",
        //预约时间
        inviteDate: now,
        lastMinviteDate: lastM,
        visitState: "",
        checkState: "0,1,2"
      },
      inviteType: [0,1,2,3],
      checkStateList: [0,1,2],
      inviteCheckState:{}

    }
  },

  // 画面渲染之后
  componentDidMount: function() {
    //获取审核状态的store监听，触发回调
    this.unsubscribeLabelDone = InviteCheckStateStore.listen(this._onInviteCheckState);
    InvitelistchildAction.getInviteCheckState(this.state.invitevisitor);
    this._registerEventHandler();
  },

  componentWillUnmount: function() {
      //解除对审核状态的获取事件的监听
			this.unsubscribeLabelDone();
	},

  _onInviteCheckState:function(data){

    let inviteChSta=data;
    this.setState({"inviteCheckState":inviteChSta});

  },

  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 代替HTML标签中写onXXX={this.XXX}
  _registerEventHandler: function() {
    let me=this;
    $("label[name='label']").click(function() {
      let cs=$(this)[0].getAttribute("value");
      let str='';
      //checkbox选中的情况
      if($(this).find("input")[0].checked==true){
        //移除未选中样式
        $(this).removeClass("btn btn-default");
        //添加选中样式
        $(this).addClass("btn btn-primary");

        me.state.checkStateList.push(cs);
        //数组的排序
        me.state.checkStateList.sort();
        //数组字符串化
        str=me.state.checkStateList.toString();
        me.state.invitevisitor.checkState=str;
        InvitelistchildAction.getInviteInfo();
        console.log(me.state.invitevisitor.checkState);
      //checkbox未选中的情况
      } else {
        //移除选中样式
        $(this).removeClass("btn-primary");
        //添加未选中样式
        $(this).addClass("btn-default");
        let ivlist=[];
        let iv=me.state.checkStateList;
        //移除该label value值
        for(let i=0;i<iv.length;i++){
          if(iv[i]!=cs){
            ivlist.push(iv[i]);
           }
        }
        me.state.checkStateList=ivlist;
        //数组的排序
        me.state.checkStateList.sort();
        str=me.state.checkStateList.toString();
        me.state.invitevisitor.checkState=str;
        InvitelistchildAction.getInviteInfo();
        console.log(me.state.invitevisitor.checkState);
        }
     });

     $("#startdate").change(function(){
       me.state.invitevisitor.lastMinviteDate = $("#startdate").val();
       InvitelistchildAction.getInviteCheckState(me.state.invitevisitor);
       InvitelistchildAction.getInviteInfo();
     });

     $("#finishdate").change(function(){
       me.state.invitevisitor.inviteDate = $("#finishdate").val();
       InvitelistchildAction.getInviteCheckState(me.state.invitevisitor);
       InvitelistchildAction.getInviteInfo();
     });

  },

  //获取datatable的api
  _getApi: (dtapi) => {
    InvitelistchildAction.inviteViewInited(dtapi);
  },
  //获取datatable的api
  _onAjaxDidReceive: (e, settings, json, xhr) => {

    //返回的列表对象赋给datatable显示
    json.data = json.listData.map((visitInvite) => {
    return {
      inviteId: visitInvite['inviteId'],
      staffName: visitInvite['staffName'],
      departName: visitInvite['departName'],
      inviteType: visitInvite['inviteType'],
      timeSection: visitInvite['timeSection'],
      checkState: visitInvite['checkState']};
    })
  },


  render: function() {
    let me =this;
    //datatable内容居中样式
    let styleTable = {
      textAlign:"center",
      verticalAlign:"middel"
    };
    //列表参数
    let options = {
    //  ajax: '/visitorInvite/list',
    //发送请求
      ajax: {
        url: '/inviteList/listInfo/',
        type: 'POST',
        contentType: 'application/json',
        data: function(data) {
          return _.extend(data, me.state.invitevisitor)
        }
      },
      // data:this.data,
      columns: [
        {
          //受访人
          data: "staffName"
        },{
         //受访人部门
          data: "departName"
        },{
          //事由
          data: "inviteType",
          render: function(data) {
            if (data == 0) {
              data = "面试"
            } else if (data == 1) {
              data = "商务"
            } else if (data == 2) {
              data = "私人"
            } else {
              data = "其他"
            }
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        },{
          //预约时间
          data: "timeSection",
          render: function(data) {
            let data2 = (data == null
              ? ''
              : data)
            return '<div style="text-align:center;vertical-align:middel;">' + data2 + '</div>';
          }
        }, {
          //访问状态
          data: "checkState",
          render: function(data) {
            if (data == 0) {
              data = "未审核"
            } else if (data == 1) {
              data = "审核通过"
            } else {
              data = "审核未通过"
            }
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        },{
          data: "inviteId",
          render: function(data) {
            return "<div style='text-align:center;vertical-align:middel;'><button name='btn-stastic-graph' class='btn btn-info'>详细</button>&nbsp;&nbsp;&nbsp;&nbsp;<button name='btn-edit-graph' class='btn btn-info'>编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-warning'>取消</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-danger btn-sm'>删除</button><span style='display:none'>"+data+"</div>";
          }
        }
      ],
      //分页:每页最大数组显示
      aLengthMenu: [5],
      //排序
      "order":[[1,'asc']]
    }
    return (
      <div id="content">

        <form id="order-form" className="smart-form" noValidate="novalidate" >
          <div className="row">
            <article className="col col-2.9">
              <label>统计开始日期 : </label>
              <label className="input">
                <i className="icon-append fa fa-calendar"/>
                <UiDatepicker type="text"  name="startdate" id="startdate" minRestrict="#finishdate" placeholder="开始时间" data-date-format="yy/mm/dd" defaultValue={this.state.invitevisitor.lastMinviteDate}/>
              </label>
            </article>

            <article className="col col-3"></article>

            <article className="col col-2.9">
              <label>统计结束日期: </label>
              <label className="input">
                <i className="icon-append fa fa-calendar"/>
                <UiDatepicker type="text" name="finishdate" id="finishdate" maxRestrict="#startdate" placeholder="结束时间" data-date-format="yy/mm/dd" defaultValue={this.state.invitevisitor.inviteDate}/>
              </label>
            </article>
          </div>
          <br></br><br></br>
        </form>

        <div className="form-group">

          <div className="btn-group" data-toggle="buttons">
            <label id= "nosign" name="label" className="btn btn-primary" value="0" >
              <input type="checkbox" id="nosignCheckbox"  />
              未审核({this.state.inviteCheckState.unapprove})
            </label>
            <label id= "asking" name="label" className="btn btn-primary" value="1" >
              <input type="checkbox" id="askingCheckbox"  />
              审核通过({this.state.inviteCheckState.approvepass})
            </label>
            <label id="signed" name="label" className="btn btn-primary" value="2" >
              <input type="checkbox" id="signedCheckbox"  />
              审核不通过({this.state.inviteCheckState.approvenopass})
            </label>
          </div>
        </div>

        <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
          <header>
            <span className="widget-icon">
              <i className="fa fa-table"/>
            </span>
            <h2>邀请人员一览</h2>
          </header>
          <div>
            <div className="widget-body no-padding">
              <Datatable id="inviteList" getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} options={options}  filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
                <thead>
                  <tr>
                    <th><div style={styleTable}>受访人</div></th>
                    <th><div style={styleTable}>受访部门</div></th>
                    <th><div style={styleTable}>事由</div></th>
                    <th><div style={styleTable}>预约时间</div></th>
                    <th><div style={styleTable}>状态</div></th>
                    <th><div style={styleTable}>操作</div></th>
                  </tr>
                </thead>
              </Datatable>
            </div>
          </div>
        </JarvisWidget>
      </div>
    )
  }
});
export default Invitelistchild
