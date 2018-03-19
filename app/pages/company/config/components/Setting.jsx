/**
 * 系统设置画面jsx
 * Created by yao on 2017/11/2.
 */
// import Department from '../../../util/components/DepartmentSelect.jsx'

import React from 'react'
import {Alert} from 'react-bootstrap'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Clockpicker from '../../../../../components/forms/inputs/Clockpicker.jsx'
// 导入设置画面Action和Store
import SettingAction from '../actions/SettingAction'
import SettingFormStore from '../stores/SettingFormStore'
import MeetingRoomStore from '../stores/MeetingRoomStore'
import SettingDBStore from '../stores/SettingDBStore'
//表单验证组件
import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;


let SettingTable = React.createClass({

	getInitialState: function () {
		//全局登录信息
		let userid = '';
		let companyId = JSON.parse(localStorage.getItem('user')).companyId;
		let userType = localStorage.getItem('userType');
		if(userType == "company-admin"){
			userid = JSON.parse(localStorage.getItem('user')).staffId;
		}

  	return {
			companyId:companyId,
			userType:userType,
			userid:userid,
    	count: 1,					//新增会议室变量
			validateArr:[],		//动态添加jq验证数组
			delRoomId : [],		//删除的会议室id
			addRooms:[], 			// 新增的会议室信息
			originalRooms:[],	//初始页面的会议室
			currentRoomsContainsIds:[],	//当前页面包含roomid的会议室
			updateRooms:[],		//更新会议室的信息
			originalPage:{}		//初始画面内容
    }
  },

	// 画面渲染之后
	componentDidMount: function() {
		//1.画面控件事件绑定
		this._registerEventHandler();
		//2.监听表单radio、checkbox、textarea状态获取事件，触发回调
		this.unsubscribeFormDone = SettingFormStore.listen(this._onInitFormDone);
		//3.监听表单会议室数据获取事件，触发回调
		this.unsubscribeRoomDone = MeetingRoomStore.listen(this._onGetRoomsDone);
		//4.监听设置保存提交服务器返回值获取事件，触发回调
		this.unsubscribeFormSave = SettingDBStore.listen(this._onSaveFormInputsStatusSuccess);
		//5.执行SettingActions中initForm方法，向服务器发送请求获取radio、checkbox、textarea数据
		SettingAction.initForm(this.state.companyId);
		//6.执行SettingActions中getRooms方法，向服务器发送请求获取会议室数据
		SettingAction.getRooms(this.state.companyId);
	},

	componentWillUnmount: function() {
			// 解除对表单、会议室列表、保存设置获取事件的监听
			this.unsubscribeFormDone();
			this.unsubscribeRoomDone();
			this.unsubscribeFormSave();
	},

	// 设置画面控件事件处理
	// 事件统一通过jQuery绑定
	// 代替HTML标签中写onXXX={this.XXX}
	_registerEventHandler: function(){
		//将this关键字换为settingComponent，否则报错，在此函数中使用this指向的组件
    let settingComponent = this;
		//表单内容change、input事件
		$("#formContent").on("change",function(){
			$("#save").prop("disabled",false);
			$("#cancel").prop("disabled",false);
		});
		$("#inviteInfoTemp").on("input",function(){
			$("#save").prop("disabled",false);
			$("#cancel").prop("disabled",false);
		});
		$("#meetingroomtbs").on("input",function(){
			$("#save").prop("disabled",false);
			$("#cancel").prop("disabled",false);
		})

		//新增会议室
		$("#add").click(function(e){
			// 防止默认事件
			e.preventDefault();
			let inputContent = $("#meetingroomtbs tr:last input");
			function ifEmpty(){
				if(inputContent[0].value=='' || inputContent[1].value=='' || inputContent[2].value=='' || inputContent[3].value==''){
					return true;
				}else return false;
			};
			let lines = document.getElementById('meetingroomtbs').rows;	//当前会议室管理表格内的行数
			if(lines.length >= 10){
				alert("已到达上限！");
			}else if(lines.length >= 2 && ifEmpty()){
				alert("请在表格中填入完整内容！");
			}else{
				//增加行
				settingComponent.state.validateArr.push(settingComponent.state.count+1);
				settingComponent.setState({
					count: settingComponent.state.count + 1,
					validateArr:settingComponent.state.validateArr
				});
				// settingComponent.state.validateArr.push(settingComponent.state.count);	//将当前行数存入alidate数组，render循环添加jq验证用
				// settingComponent.setState({
				// 	validateArr:settingComponent.state.validateArr
				// });
				console.log(settingComponent.state.count);
				console.log(settingComponent.state.validateArr);
			}
		});

		//保存页面设置
		$("#save").click(function(e){
			// 防止默认事件
			e.preventDefault();
			// 表单验证未通过，中断执行
			if(!settingComponent._formValidate()){
				return false;
			}

			//获取radio签到类型
			for(let i = 0; i < 4; i++){	//签到类型：身份证+人脸；身份证/人脸；人脸+电话；人脸/电话
				if($("[name='sign_in_type']")[i].checked == true){
					var signInType = $("[name='sign_in_type']")[i].value;
					break;
				}
			}
			//获取checkbox消息推送类型 消息推送类型：短信；微信
			if($("[name='msg_type']")[0].checked == true && $("[name='msg_type']")[1].checked == true){
				var msgType = 2;
			}else{
				var msgType = $("[name='msg_type']")[0].checked ==true?0:1;
			}
			//获取确认方式
			for(let i = 0; i < 3; i++){	//确认方式：电话+系统；电话/系统；系统
				if($("[name='confirm_type']")[i].checked == true){
					var confirmType = $("[name='confirm_type']")[i].value;
					break;
				}
			}
			//获取员工注册是否开启
			let staffReg = $("[name='staff_reg']")[0].checked==true?1:0;
			//获取超时提醒是否开启
			let timeoutAlarm = $("[name='timeoutAlarm']")[0].checked==true?1:0;
			//获取邀请审批是否开启
			let inviteApprove = $("[name='inviteApprove']")[0].checked==true?1:0;
			//获取邀请信息模板
			let inviteInfoTemp = $("#inviteInfoTemp")[0].value;

			//清空会议室新增、更新数组、当前包含roomid数组
			settingComponent.state.addRooms = [];
			settingComponent.state.updateRooms=[];
			settingComponent.state.currentRoomsContainsIds = [];
			//获取新增rooms
			let lines = $("#meetingroomtbs")[0].rows;
			for(let i = 1; i < lines.length; i++){
				if($("#meetingroomtbs tr:eq("+i+") td:eq(1) input")[0].getAttribute("roomid") == null){
					//找到没有roomid的元素，获取名字，起止时间存入对象,push进数组
					let roomname = $("#meetingroomtbs tr:eq("+i+") td:eq(1) input")[0].value;
					let strattime = $("#meetingroomtbs tr:eq("+i+") td:eq(1)").next().find("input")[0].value;
					let endtime = $("#meetingroomtbs tr:eq("+i+") td:eq(1)").next().find("input")[1].value;
					let room = {
						roomName:roomname,
						roomStartTime:strattime,
						roomEndTime:endtime
					}
					settingComponent.state.addRooms.push(room);//新增的room信息存入当前组件的新增数组
				}
			}

			//获取提交前含有roomid的会议室
			for(let i = 1; i < lines.length; i++){
				if($("#meetingroomtbs tr:eq("+i+") td:eq(1) input")[0].getAttribute("roomid") != null){
					//找到没有roomid的元素，获取名字，起止时间存入对象,push进数组
					let roomid = $("#meetingroomtbs tr:eq("+i+") td:eq(1) input")[0].getAttribute("roomid");
					let roomname = $("#meetingroomtbs tr:eq("+i+") td:eq(1) input")[0].value;
					let starttime = $("#meetingroomtbs tr:eq("+i+") td:eq(1)").next().find("input")[0].value;
					let endtime = $("#meetingroomtbs tr:eq("+i+") td:eq(1)").next().find("input")[1].value;
					let room = {
						roomid:roomid,
						roomname:roomname,
						starttime:starttime,
						endtime:endtime
					}
					settingComponent.state.currentRoomsContainsIds.push(room);//新增的room信息存入当前组件的新增数组
				}
			}

			//获取更新rooms
			let originalRooms = settingComponent.state.originalRooms;
			let currentRoomsContainsIds = settingComponent.state.currentRoomsContainsIds;
			for(let k = 0; k < originalRooms.length; k++){
				for(let j = 0; j < currentRoomsContainsIds.length; j++){
					if(originalRooms[k].roomId == currentRoomsContainsIds[j].roomid){
						if(originalRooms[k].roomName!=currentRoomsContainsIds[j].roomname ||
							originalRooms[k].roomStartTime.substr(0,5)!=currentRoomsContainsIds[j].starttime ||
							originalRooms[k].roomEndTime.substr(0,5)!=currentRoomsContainsIds[j].endtime){//内容有更新
								let updroom = {
									roomId:currentRoomsContainsIds[j].roomid,
									roomName:currentRoomsContainsIds[j].roomname,
									roomStartTime:currentRoomsContainsIds[j].starttime,
									roomEndTime:currentRoomsContainsIds[j].endtime
								}
								settingComponent.state.updateRooms.push(updroom);
								break;
						}
					}
				}
			}

			let settingObj = {
				userId:settingComponent.state.userid,
	      companyId:settingComponent.state.companyId,
				signInType:signInType,
				msgType:msgType,
				confirmType:confirmType,
				staffReg:staffReg,
				timeoutAlarm:timeoutAlarm,
				inviteApprove:inviteApprove,
				inviteInfoTemp:inviteInfoTemp,
				addRooms:settingComponent.state.addRooms,	//新增rooms的信息数组
				delRoomId:settingComponent.state.delRoomId,	//删除rooms的roomid数组
				updateRooms:settingComponent.state.updateRooms	//更新rooms信息数组
			};

			SettingAction.saveFormInputsStatus(settingObj);

			// settingComponent.setState({
			// 	count: 1
			// });
		});

		//取消更改的设置
		$("#cancel").click(function(e){
			//清空删除会议室ids数组,
			settingComponent.state.delRoomId = [];
			//防止默认事件
			e.preventDefault();
			//克隆组件初始状态的部分内容
			let originalPage = settingComponent.state.originalPage.clone(true);
			$(".formBody").remove();	//移除当前已更改的表单
			$(".forClone").append(settingComponent.state.originalPage); //在移除的节点之下追加clone保存的内容
			settingComponent.state.originalPage = originalPage;	//将clone的内容赋给组件state属性，否则state属性值随着remove而清空
			$("#save").prop("disabled",true);
			$("#cancel").prop("disabled",true);
		});
	},

	//获取表单input check状态
	_onInitFormDone:function(data){
		// console.log(data[0].settingValue);
		// console.log(data);
		$("[name='sign_in_type']"+"[value='"+data.signInType+"']").prop("checked", true);
		if(data.msgType == 2){
			$("[name='msg_type']").prop("checked",true);
		}else{
			$("[name='msg_type']"+"[value='"+data.msgType+"']").prop("checked", true);
		}
		$("[name='confirm_type']"+"[value='"+data.confirmType+"']").prop("checked", true);
		if(data.staffReg == 1){
			$("[name='staff_reg']").prop("checked", true);
		}else{
			$("[name='staff_reg']").prop("checked", false);
		}
		if(data.timeoutAlarm == 1){
			$("[name='timeoutAlarm']").prop("checked", true);
		}else{
			$("[name='timeoutAlarm']").prop("checked", false);
		}
		if(data.inviteApprove == 1){
			$("[name='inviteApprove']").prop("checked", true);
		}else{
			$("[name='inviteApprove']").prop("checked", false);
		}
		$("#inviteInfoTemp").prop("value",data.inviteInfoTemp);

	},
	//获取会议室列表
	_onGetRoomsDone:function(data){
		this.state.originalRooms = data;
		this.state.validateArr = [];
		for(let i = 1; i < data.length+1; i++){
			if (i > 1) {
				this.setState({
					count: this.state.count + 1
				});
				this.state.validateArr.push(i);	//当前会议室行数存入validate数组
				this.setState({
					validateArr:this.state.validateArr
				})
			}
			if( i == 1){
				this.state.validateArr.push(i);	//当前会议室行数存入validate数组
				this.setState({
					validateArr:this.state.validateArr
				})
			}
			$("#meetingroomtbs tr:eq("+i+") input:eq(1)").attr("roomid",data[i-1].roomId); //会议室表主键存入input
			$("#meetingroomtbs tr:eq("+i+") input:eq(1)")[0].value = data[i-1].roomName;
			$("#meetingroomtbs tr:eq("+i+") input:eq(2)")[0].value = (data[i-1].roomStartTime).substr(0,5);
			$("#meetingroomtbs tr:eq("+i+") input:eq(3)")[0].value = (data[i-1].roomEndTime).substr(0,5);

		}
		this._cloneOriginal();	//复制初始画面
		//console.log(this.state.validateArr);
	},

	//克隆初始画面tbody标签的内容到state属性
	_cloneOriginal: function(){
		let originalPage = $(".formBody").clone(true);
		this.state.originalPage = originalPage;
	},

	//表单验证
	_formValidate:function(){
		let right = $(".smart-form").valid();
		//消息推送方式至少选中一个
		let unckecked = 0;
		for(let i = 0; i < $("input[name=msg_type]").length; i++){
			if($("input[name=msg_type]")[i].checked == false){
				unckecked++;
			}
			if(unckecked == $("input[name=msg_type]").length){
				alert("至少选一种消息推送方式！");
				right = false;
			}
		}

		//时间大小验证
		let wrongTime = 0;
		for(let i = 0; i < $(".picker1").length; i++){
			let date = new Date();
			let a = $(".picker1")[i].value.split(":");
			let b = $(".picker2")[i].value.split(":");
			if(date.setHours(a[0],a[1]) >= date.setHours(b[0],b[1])){
				$(".picker1")[i].style.color="red"
				$(".picker2")[i].style.color="red"
				wrongTime++;
			}else if($(".picker1")[i].value == "" || $(".picker2")[i].value == ""){
				//placeholder颜色为红
				alert("时间不能为空！");
				right = false;
			}
			if(wrongTime > 0){
				alert("开始时间必须小于结束时间！");
				right = false;
			}
		}

		return right;
	},

	//设置保存成功回调
	_onSaveFormInputsStatusSuccess:function(result){
		switch (result.data.bizCode) {
			case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:	// 保存成功msg
				VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
				location.reload();
				// $("#meetingroomtbs tr:gt(1)").remove();	//去除会议室第一行往下的内容
				// me.state.count = 1;
				// this.setState({
				// 	count: 1
				// });
				// SettingAction.getRooms(1);
				// console.log(this.state.count);

				$("#save").attr("disabled",true);
				$("#cancel").attr("disabled",true);
				break;
			case config.API_BIZ_CODE.BIZ_CODE_DELETE_SUCCESS:	// 保存失败msg
				VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
				location.reload();
				break;
		}
	},

  render: function () {
		//通用样式
    let rowStyle = {
			width:'25%',
			verticalAlign:'middle'
    };
		//新增会议室
		let rows = [];
		for (let i = 0; i < this.state.count; i++) {
  		rows.push(<Row index={i+1} key={i} validateArr={this.state.validateArr} roomIdArray={this.state.delRoomId} parentCallBack={this.handleChange}/>);
  	};

		//表单提交配置
		let validateConfig = {
			//表单验证规则
			rules:{
				temp:{
					required:true,
					maxlength:200
				}
			},
			//表单验证msg
			messages:{
				temp:{
					required:"邀请信息模板不能为空！",
					maxlength:"最多输入200长度"
				}
			}
		};
		//循环为会议室添加jq验证
		let validateArr = this.state.validateArr;
		for (let i = 0; i < validateArr.length; i++) {
			if(validateArr[i] != 0){
				let obj = {};
				obj["meetingRoomName_" + validateArr[i]] = {
					required: true,
					maxlength: 10
				};
				obj["startTime_" + validateArr[i]] = {
					required: true
				};
				obj["endTime_" + validateArr[i]] = {
					required: true
				};
				_.extend(validateConfig.rules, obj);

				obj = {};
				obj["meetingRoomName_" + validateArr[i]] = {
					required:"会议室名不能为空！",
					maxlength: "会议室不能超过10位！"
				};
				obj["startTime_" + validateArr[i]] = {
					required:" 起始时间不能为空！"
				};
				obj["endTime_" + validateArr[i]] = {
					required: "结束时间不能为空！"
				};
				_.extend(validateConfig.messages, obj);
			}
		};
		//画面渲染内容
    return (
        <div id=".container-fluid">
          <WidgetGrid>
            <div className="row col-md-offset-2 col-md-8">
              <article className="col-sm-12">
                <JarvisWidget editbutton={false} colorbutton={false} sortable={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                  <header>
                    <label style={{marginLeft:'1.2%'}}><i className="fa fa-gear"/>&nbsp;
                    <h2>系统设置</h2></label>
                  </header>
                  <div>
                    <div className="widget-body">
											<UiValidate options={validateConfig}>
												<form className="smart-form">
	                      <table className="table table-bordered forClone">
	                        <tbody id="formContent" className="formBody">
	                        <tr>
	                          <td style={rowStyle}>签到方式</td>
	                          <td>
	                            <div id="attendanceMethod" className="row">
	                              <div className="col col-4">
	                                <label className="radio">
	                                    <input type="radio" name="sign_in_type" value="0"/>
	                                    <i/>身份证+人脸</label>
	                                <label className="radio">
	                                    <input type="radio" name="sign_in_type" value="2"/>
	                                    <i/>人脸+电话</label>
	                              </div>
	                              <div className="col col-4">
	                                <label className="radio">
	                                    <input type="radio" name="sign_in_type" value="1"/>
	                                    <i/>身份证/人脸</label>
	                                <label className="radio">
	                                    <input type="radio" name="sign_in_type" value="3"/>
	                                    <i/>人脸/电话</label>
	                              </div>
	                            </div>
	                          </td>
	                        </tr>
	                        <tr>
	                          <td style={rowStyle}>消息推送方式</td>
	                          <td>
	                            <div id="notificationMethod" className="row">
	                              <div className="col col-4">
	                                <label className="checkbox">
	                                    <input type="checkbox" name="msg_type" value="0"/>
	                                    <i/>短信</label>
	                              </div>
	                              <div className="col col-4">
	                                <label className="checkbox">
	                                    <input type="checkbox" name="msg_type" value="1"/>
	                                    <i/>微信</label>
	                              </div>
	                            </div>
	                          </td>
	                        </tr>
	                        <tr>
	                          <td style={rowStyle}>确认方式</td>
	                          <td>
	                            <div className="row">
	                              <div className="col col-4">
	                                <label className="radio">
	                                    <input type="radio" name="confirm_type" value="0"/>
	                                    <i/>电话+系统</label>
	                              </div>
	                              <div className="col col-4">
	                                <label className="radio">
	                                    <input type="radio" name="confirm_type" value="1"/>
	                                    <i/>电话/系统</label>
	                              </div>
	                              <div className="col col-4">
	                                <label className="radio">
	                                    <input type="radio" name="confirm_type" value="2"/>
	                                    <i/>系统</label>
	                              </div>
	                            </div>
	                          </td>
	                        </tr>
	                        <tr>
	                          <td style={rowStyle}>员工注册</td>
	                          <td>
															<div>
																<section style={{marginLeft: '-4%'}} className="col col-1">
		                              <label className="toggle" style={{marginTop:'-4px'}}>
		                                <input type="checkbox" name="staff_reg"/>
		                                <i data-swchon-text="ON" data-swchoff-text="OFF"/></label>
		                            </section>
														</div>
	                          </td>
	                        </tr>
	                        <tr>
	                          <td style={rowStyle}>超时提醒</td>
	                          <td>
	                            <section style={{marginLeft: '-4%'}} className="col col-1">
	                              <label className="toggle" style={{marginTop:'-4px'}}>
	                                <input type="checkbox" name="timeoutAlarm"/>
	                                <i data-swchon-text="ON" data-swchoff-text="OFF"/></label>
	                            </section>
	                          </td>
	                        </tr>
	                        <tr>
	                          <td style={rowStyle}>邀请审批</td>
	                          <td>
	                            <section style={{marginLeft: '-4%'}} className="col col-1">
	                              <label className="toggle" style={{marginTop:'-4px'}}>
	                                <input type="checkbox" name="inviteApprove"/>
	                                <i data-swchon-text="ON" data-swchoff-text="OFF"/></label>
	                            </section>
	                          </td>
	                        </tr>
	                        <tr style={{lineHeight:'100px'}}>
	                          <td style={rowStyle}>邀请信息模板</td>
	                          <td>
	                            <textarea id="inviteInfoTemp" name="temp" style={{border:'none'}} rows="5" cols="83">
															</textarea>
	                          </td>
	                        </tr>
	                        <tr>
	                          <td style={rowStyle}>会议室管理</td>
	                          <td>
															<button id="add" style={{margin:'1% 0'}} className="btn btn-default btn-sm">添加会议室</button>
															{/* 会议室管理嵌套表格 */}
															<div className="custom-scroll table-responsive" style={{height:'150px', overflowY: 'scroll'}}>
	                              <table id="meetingroomtbs" className="table table-bordered">
																	<tbody id="roomContent">
	                                <tr>
	                                  <th style={rowStyle}>No.</th>
	                                  <th style={{textAlign:'center'}}>会议室</th>
	                                  <th style={{width:'26%',textAlign:'center'}}>允许使用时间</th>
																		<th style={{textAlign:'center'}}>操作</th>
	                                </tr>
																	{rows}
																</tbody>
	                              </table>
															</div>
	                          </td>
	                        </tr>
	                        </tbody>
	                      </table>
												{/* 底部按钮 */}
	                      <div style={{textAlign:'right'}}>
													<button id="cancel" style={{width:'10%',margin:'2% 0'}} type="button" className="btn btn-primary btn-sm" disabled>
	                          {/* onclick="window.history.back();" */}
	                            取消
	                        </button>&emsp;
												  <button id="save" style={{width:'10%',margin:'2% 0'}} type="submit" className="btn btn-primary btn-sm" disabled>
	                           确认
	                        </button>
	                      </div>
												</form>
											</UiValidate>
                      {/* <button style={{width:'10%',margin:'2% 0'}} data-toggle="modal" data-target="#myModal" className="btn btn-primary btn-sm">
                         部门
                      </button>
                      <input type="text" id="bumen"/> */}
                		</div>
                  </div>
                </JarvisWidget>
              </article>
            </div>
          </WidgetGrid>
					{/* <Department></Department> */}
        </div>
    )
  }
});
export default SettingTable

//用于添加行的子组件
let Row = React.createClass({
	getInitialState: function () {
	  	return {
	    	delRoomId : []
	    }
  },

	componentDidMount: function(){
		// 增加行后的排序
		this._sort();
		this._del(this);
		this._timePickerOnchange();
	},

	//会议室排序
	_sort: function(){
		let j = 1;
		for(let i = 0; i < $("#meetingroomtbs tr input").length; i++){
			if(i%4 == 0){
				$("#meetingroomtbs tr input")[i].value = j;
				j++;
			}
		}
	},
	_timePickerOnchange: function(){
		$(".picker1").change(function(e){
		  	$("#save").attr("disabled",false);
		  	$("#cancel").attr("disabled",false);
		});

		$(".picker2").change(function(e){
			 $("#save").attr("disabled",false);
			 $("#cancel").attr("disabled",false);
		});
	},
	_del: function(roomComponent){

		$(this.refs.delOperate).click(function(e){
			let inputContent = $("#meetingroomtbs tr:eq(1) input:not(:first)");
			let lines = document.getElementById('meetingroomtbs').rows;
			let roomId = $(e.target).parent().prev().prev().find("input")[0].getAttribute("roomid");
			let indexToZero = $(e.target).parent().prev().prev().prev().find("input")[0].value; //删除的会议室的排序索引
			let validateArr = roomComponent.props.validateArr;

			let count = 0;
			for(let j = 0; j < validateArr.slice(0,indexToZero).length; j++){
				if(validateArr.slice(0,indexToZero)[j] == 0){
					count++;
				}
			}

			if(lines.length > 2){
				$(e.target).parent().parent().remove();
				for(let i = 0; i < validateArr.length; i++){
					if(i == indexToZero-1){
						validateArr[i+count] = 0;
					}
				}
				console.log(validateArr);
				//删除的roomid存入数组
				roomComponent.props.roomIdArray.push(roomId);
				//删除后动态排序
				roomComponent._sort();
				$("#save").attr("disabled",false);
				$("#cancel").attr("disabled",false);
			}else{
				console.log("只剩下最后一行了！");
				for(let i = 0; i < inputContent.length; i++){
					 inputContent[i].value = "";
				}
			}
		});
	},

	render: function(){
		return (
			<tr>
				<td><input readOnly style={{border:'none'}} type="text"/></td>
				<td style={{textAlign:'center'}}><input className="roomname" name={"meetingRoomName_" + this.props.index} style={{border:'none',width:'95%',textAlign:'center'}} type="text"/></td>
				<td style={{textAlign:'center'}}>
					<Clockpicker name={"startTime_" + this.props.index} className="picker1" style={{width:'28%',border:'none'}} data-autoclose="true" placeholder="00:00"/>&emsp;~&emsp;
					<Clockpicker name={"endTime_" + this.props.index} className="picker2" style={{width:'28%',border:'none'}} data-autoclose="true" placeholder="23:59"/>
				</td>
				<td style={{textAlign:'center'}}>
					<a ref="delOperate" style={{cursor:'pointer'}}>删除</a>
				</td>
			</tr>
		)
	}
});
