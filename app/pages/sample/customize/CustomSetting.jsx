import React from 'react'
import {Alert} from 'react-bootstrap'
import SubHeader from '../../layout/SubHeader.jsx'
import BigBreadcrumbs from '../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../components/layout/widgets/JarvisWidget.jsx'
import UiDialogLauncher from '../../../../components/ui/UiDialogLauncher.jsx'

let SettingTable = React.createClass({



	componentDidMount: function() {
			var lines = document.getElementById('meetingroomtbs').rows;
			var inputContent = $("#meetingroomtbs tr:last input");

			function ifEmpty(){
				var inputContent = $("#meetingroomtbs tr:last input");
				if(inputContent[0].value=='' || inputContent[1].value=='' || inputContent[2].value==''){
					return true;
				}else return false;
			};
			function ifEmptyForLine2(){

				if(inputContent[0].value!=='' || inputContent[1].value!=='' || inputContent[2].value!==''){
					return true;
				}
			};

      $("#add").click(function() {
        var row = '<tr>'+
                    '<td><input style="border: none;" type="text"/></td>'+
                    '<td><input style="border: none;" type="text"/></td>'+
                    '<td><input style="border: none;" type="text"/></td>'+
                  '</tr>';
				var serial = document.getElementById("serial");
				var roomName = document.getElementById("roomName");
				var period = document.getElementById("period");

				if(lines.length >= 6){
				  alert("已到达上限！");
			  }else if(lines.length >= 2 && ifEmpty()){

					alert("请在表格中填入完整内容！");
				}else{
				  $("#meetingroomtbs").append(row);
				  $("#meetingroomtbs tr").css("height","35px");
			  }
      });

     	$("#del").click(function() {
			 if(lines.length > 2){
				 $("#meetingroomtbs tr:last").remove();
			 }else if(lines.length == 2 && ifEmptyForLine2()){
				 for(var i = 0; i < 3; i++){
	 					inputContent[i].value = "";
						//handleChange;
				 }
				 console.log("清空数据了！！！");
			 }else{

				 alert("无法删除！");
			 }

      });
	},
	handleChange: function(event) {
		var attend = document.getElementById("first");
		var message = document.getElementById("second");
		var confirm = document.getElementById("third");
		var register = document.getElementById("fourth");
		var timeOut = document.getElementById("fifth");
		var inviteApprove = document.getElementById("sixth");
		var weChat = document.getElementById("weChat");
		var serial = document.getElementById("serial");
		var roomName = document.getElementById("roomName");
		var period = document.getElementById("period");

		if(attend.checked && message.checked && !weChat.checked && confirm.checked
				&& register.checked && !timeOut.checked && inviteApprove.checked
				&& serial.value=='' && roomName.value=='' && period.value==''){
				$("#save").attr("disabled",true);
		}else $("#save").attr("disabled",false);
	},


    render: function () {
      var rowStyle = {
				paddingTop: '27px'
      };

        return (
          <div id="content">
              {/* <div className="row">
                  <BigBreadcrumbs items={['Table', 'Normal Tables']} icon="table" className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
                  <SubHeader />
              </div> */}

              <WidgetGrid>
                  <div className="row">
                      <article className="col-sm-12">

                          <JarvisWidget editbutton={false} color="blueDark">
                              {/* <header>
                                  <span className=" "> <i className="fa fa-table"/> </span>

                                  <h2>自定义设置</h2>
                              </header> */}
                              <div>
                                  <div className="widget-body">
                                      {/* <p>Adds borders to any table row within <code>&lt;table&gt;</code> by adding the
                                          <code>.table-bordered</code>
                                          with the base class</p> */}

                                      {/* <div className="table-responsive"> */}

                                          <table className="table table-bordered">
                                              {/* <thead>
                                              <tr>
                                                  <th>Column name</th>
                                                  <th>Column name</th>

                                              </tr>
                                              </thead> */}
                                              <tbody id="formContent">
                                              <tr>
                                                  <td style={rowStyle} width="200px">签到方式</td>
                                                  <td>
                                                    <form className="smart-form">
                                                      <div id="attendanceMethod" className="row">
                                                          <div className="col col-4">
                                                              <label className="radio">
                                                                  <input id="first" onChange={this.handleChange} type="radio" name="radio" defaultChecked/>
                                                                  <i/>身份证+人脸</label>
                                                              <label className="radio">
                                                                  <input onChange={this.handleChange} type="radio" name="radio"/>
                                                                  <i/>人脸+电话</label>
                                                          </div>
                                                          <div className="col col-4">
                                                              <label className="radio">
                                                                  <input onChange={this.handleChange} type="radio" name="radio"/>
                                                                  <i/>身份证/人脸</label>
                                                              <label className="radio">
                                                                  <input onChange={this.handleChange} type="radio" name="radio"/>
                                                                  <i/>人脸/电话</label>
                                                          </div>
                                                      </div>
                                                    </form>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>消息推送方式</td>
                                                  <td>
                                                    <form className="smart-form">
                                                      <div id="notificationMethod" className="row">
                                                          <div className="col col-4">
                                                              <label className="checkbox">
                                                                  <input id="second" onChange={this.handleChange} type="checkbox" name="checkbox"
                                                                         defaultChecked/>
                                                                  <i/>短信</label>
                                                          </div>
                                                          <div className="col col-4">
                                                              <label className="checkbox">
                                                                  <input id="weChat" onChange={this.handleChange} type="checkbox" name="checkbox"/>
                                                                  <i/>微信</label>
                                                          </div>
                                                      </div>
                                                    </form>
                                                  </td>

                                              </tr>
                                              <tr>
                                                  <td>确认方式</td>
                                                  <td>
                                                    <form className="smart-form">
                                                      <div className="row">
                                                          <div className="col col-4">
                                                              <label className="radio">
                                                                  <input id="third" onChange={this.handleChange} type="radio" name="radio" defaultChecked/>
                                                                  <i/>电话+系统</label>
                                                          </div>
                                                          <div className="col col-4">
                                                              <label className="radio">
                                                                  <input onChange={this.handleChange} type="radio" name="radio"/>
                                                                  <i/>电话/系统</label>
                                                          </div>
                                                          <div className="col col-4">
                                                              <label className="radio">
                                                                  <input onChange={this.handleChange} type="radio" name="radio"/>
                                                                  <i/>系统</label>
                                                          </div>
                                                      </div>
                                                    </form>
                                                  </td>

                                              </tr>
                                              <tr>
                                                  <td style={{cursor: 'pointer'}}>员工注册</td>
                                                  <td>
                                                    <form className="smart-form">
                                                      <section style={{marginLeft: '-29px'}} className="col col-1">
                                                        <label className="toggle">
                                                            <input id="fourth" onChange={this.handleChange} type="checkbox" name="checkbox-toggle"
                                                                   defaultChecked/>
                                                            <i data-swchon-text="ON" data-swchoff-text="OFF"/></label>
                                                      </section>
                                                    </form>
                                                  </td>

                                              </tr>
                                              <tr>
                                                  <td>超时提醒</td>
                                                  <td>
                                                    <form className="smart-form">
                                                      <section style={{marginLeft: '-29px'}} className="col col-1">
                                                        <label className="toggle">
                                                            <input id="fifth" onChange={this.handleChange} type="checkbox" name="checkbox-toggle"/>
                                                            <i data-swchon-text="ON" data-swchoff-text="OFF"/></label>
                                                      </section>
                                                    </form>
                                                  </td>

                                              </tr>
                                              <tr>
                                                  <td>邀请审批</td>
                                                  <td>
                                                    <form className="smart-form">
                                                      <section style={{marginLeft: '-29px'}} className="col col-1">
                                                        <label className="toggle">
                                                            <input id="sixth" onChange={this.handleChange} type="checkbox" name="checkbox-toggle" defaultChecked/>
                                                            <i data-swchon-text="ON" data-swchoff-text="OFF"/></label>
                                                      </section>
                                                    </form>
                                                  </td>

                                              </tr>
                                              <tr>
                                                  <td>邀请信息模板</td>
                                                  <td>
                                                    尊敬的客户，您好！
                                                      XX将于XXXX年XX月XX日（周X）XX时XX分在XXXX举办企业信息化推介会，诚邀您的光临！
                                                  </td>

                                              </tr>
                                              <tr>
                                                  <td style={{padding: 'auto'}}>会议室管理</td>
                                                  <td>
                                                    <span id="add" className="fa fa-plus"/>&emsp;&emsp;
                                                    <span id="del" className="fa fa-times"/>
                                                    <table id="meetingroomtbs" className="table table-bordered">
																											<tbody>
                                                      <tr>
                                                        <td style={{width: '200px'}}>No.</td>
                                                        <td style={{width: '260px'}}>会议室</td>
                                                        <td>允许使用时间</td>
                                                      </tr>
																											<tr style={{height: '35px'}}>
                                                        <td><input id="serial" onChange={this.handleChange} style={{border:'none'}} type="text"/></td>
                                                        <td><input id="roomName" onChange={this.handleChange} style={{border:'none'}} type="text"/></td>
                                                        <td><input id="period" onChange={this.handleChange} style={{border:'none'}} type="text"/></td>
                                                      </tr>
                                                    </tbody>
                                                    </table>
                                                  </td>
                                              </tr>
                                              </tbody>
                                          </table>

                                          <div style={{margin: '20px auto 0 auto',width: '260px'}}>
                                            {/* <UiDialogLauncher
																								id="confirm"
																								header="<h4><i class='fa fa-warning'/> 确定更改设置?</h4>"
                                                content={<TableData />}
                                                className="btn btn-primary state-disabled">保存</UiDialogLauncher>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
																						<UiDialogLauncher
																								header="<h4><i class='fa fa-warning'/> 取消设置更改?</h4>"
                                                content={<CancelModify />}
                                                className="btn btn-default">取消</UiDialogLauncher> */}
																					 <button id="save" style={{width:'90px'}} type="submit" className="btn btn-primary" disabled>
                                               保存
                                           </button>&emsp;&emsp;&emsp;&emsp;&emsp;
																					 <button style={{width:'90px'}} type="button" className="btn btn-default">
                                              {/* onclick="window.history.back();" */}
                                                取消
                                            </button>
                                          </div>

                                      {/* </div> */}

                                  </div>
                              </div>
                          </JarvisWidget>
                      </article>
                  </div>
              </WidgetGrid>
          </div>

        )
    }
});

export default SettingTable

let TableData = React.createClass({
		componentDidMount: function(){
			// var innerTable = document.getElementById("meetingroomtbs");
			var innerInput = document.getElementById("meetingroomtbs").getElementsByTagName("input");
			var data = "";
			// for(var i = 0,rows = innerTable.rows.length; i < rows; i++){
			// 	for(var j = 0,cells = innerTable.rows[i].cells.length; j < cells; j++){
			// 		data += innerTable.rows[i].cells[j].getElementsByTagName("input").value() + "  ";
			// 	}
			// 		data += "<br/>";
			// }
			for(var i=0;i<innerInput.length;i++){

					if(innerInput[i].type=='text'){
						if(i!=0 && (i+1)%3 == 0){
							data += innerInput[i].value + "  "+"<br/>";
						}else{
							data += innerInput[i].value + "  ";
						}
					}
			}
			document.getElementById("para").innerHTML = data
		},

    _submitDialog: function (e) {
        console.log('submit stuff');
				this.props.closeDialog(e)
    },
		render: function () {

        return (
            <div id="dialog_simple">
                <form>
                    <pre id="para">

                    </pre>

                    <div>
                        <button className="btn bg-color-green txt-color-white" onClick={this._submitDialog}><i
                            className="fa fa-check"/>&nbsp; 确认
                        </button>
                        <button className="btn btn-default" onClick={this.props.closeDialog}><i
                            className="fa fa-times"/>&nbsp; 取消
                        </button>
                    </div>
                </form>
            </div>

        )
    }
});

let CancelModify = React.createClass({

    _submitDialog: function (e) {
        console.log('submit stuff');
				this.props.closeDialog(e)
    },
		render: function () {

        return (
            <div id="dialog_simple">
                <form>
                    <pre id="para">

                    </pre>

                    <div>
                        <button className="btn bg-color-green txt-color-white" onClick={this._submitDialog}><i
                            className="fa fa-check"/>&nbsp; 确认
                        </button>
                        <button className="btn btn-default" onClick={this.props.closeDialog}><i
                            className="fa fa-times"/>&nbsp; 取消
                        </button>
                    </div>
                </form>
            </div>

        )
    }
});
