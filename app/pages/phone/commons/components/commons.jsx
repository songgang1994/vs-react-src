/**
 * 部门主画面
 * Created by lihui on 2017/11/2.
 */

// 导入React组件
import React from 'react'
import {OverlayTrigger, Tooltip, Popover} from 'react-bootstrap'


let commons = React.createClass({
  // 画面渲染之后
  componentDidMount: function() {
      //画面控件绑定
      this._registerEventHandler();
  },
  // 画面控件事件处理
  _registerEventHandler: function() {
    //访客点击事件
    // $("#shen").on('click',function(){
    //   $('.approver').popover('show');
    // })
  },



  //画面渲染
  render: function() {
    return (
            <div className="col-sm-12 col-md-12 col-lg-12"  >
              <div className="btn-group dropup" style={{float:"left",marginLeft:"13%"}}>
               <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <strong>审批</strong>
               </button>
               <ul className="dropdown-menu" role="menu">
                <li><a href="#/phone/StaffApprover">员工审批</a></li>
                <li><a href="#/phone/InviteApprove">邀请审批</a></li>
                <li><a href="#/phone/VisitorApprover">访客审批</a></li>
               </ul>
              </div>
              <div className="btn-group dropup" >
               <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <strong>发出邀请</strong>
               </button>
               <ul className="dropdown-menu" role="menu">
                <li><a href="#/phone/InviteAppoint">发起邀请</a></li>
                <li><a href="#/phone/Invite">会议室预约</a></li>
               </ul>
              </div>
              <div className="btn-group dropup">
               <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <strong>邀请记录</strong>
               </button>
              <ul className="dropdown-menu" role="menu">
               <li><a href="#/phone/InviteRecord"></a>员工邀请</li>
               <li><a href="#/phone/VisitorInvite"></a>访客邀请</li>
              </ul>
             </div>
             <div className="btn-group dropup">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
               <strong>我的信息</strong>
              </button>
              <ul className="dropdown-menu" role="menu">
               <li><a href="#/phone/MyInformation">员工信息</a></li>
               <li><a href="#/phone/VisitorInformation">访客信息</a></li>
               <li><a href="#/phone/StaffRegister">信息注册</a></li>
               </ul>
             </div>
           </div>
         )
       }
     });

export default commons
