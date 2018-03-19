/**
 *平台管理员登录状态下 公司审批画面   公司datatable组件
 *Creat by chenfei 2017/11/8
 */
 // 导入React组件
 import React from 'react'
 import Reflux from 'reflux'
 import _ from 'lodash'

import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import RefuseModal from '../../../util/components/Refuse.jsx'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

import ApproveDataTableAction from '../actions/ApproveDataTableAction.js'
import ApproveDataTableDBStore from '../stores/ApproveDataTableDBStore.js'

//datatable显示区域的组件
 let ApproveDataTable = React.createClass({
   // 画面初始state生成
   getInitialState: function() {
     return{
       //模态框
       modal: {}
     }
   },

   // 画面渲染之后
   componentDidMount: function() {

     // 画面控件事件绑定
     this._registerEventHandler();

     // 监听公司信息更改，执行_onApproveDataTableDBStoreListen()
     this.unsubscribeDB = ApproveDataTableDBStore.listen(this._onApproveDataTableDBStoreListen);
   },

   componentWillUnmount: function() {
       // 解除对事件的监听
       this.unsubscribeDB();
   },

   _selectAll(e) {
     let checked = e.target.checked;
     var input = $('input:checkbox[type="checkbox"]');
     var tr = $(input).closest('tr');
     if(input.prop("checked")){
       input.prop("checked", false);
       tr.css("background-color", "")
     }else{
       input.prop("checked", true);
       tr.css("background-color", "#FFFFE0")
     }
   },

   // 注册画面控件事件处理
   // 事件统一通过jQuery绑定
   // 代替HTML标签中写onXXX={this.XXX}
   _registerEventHandler: function() {
     let me = this;

     //dataTable 行点击事件
     $('#ApproveDataTable').on('click', 'td:not(:last-child)', function(event) {
         //获取参数信息
         var table = $('#ApproveDataTable').DataTable();
         var tr = $(this).closest('tr');
         var row = table.row( tr );
         var company = row.data();
         var clickIndex = $(this).parents("tr").find("td").index($(this));
         var input = $(this).children().children();
         //点击区域判断
         if( clickIndex != 0  ){//选中除第一列和最后一列以外，tr变色，显示附加信息
           var str = '<form class="smart-form" ><fieldset>'+
                     '<section><label class="label">公司地址:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+company.companyAddress+'</label></section>'+
                     '<section ><label class="label">联系人邮箱:&nbsp;'+company.contactsMail+' </label></section>'+
                     '<section ><label class="label">联系人座机:&nbsp;'+company.contactsTelephone+'</label> </section>'+
                     '</section></fieldset>'+
                     '</form>';
            if ( row.child.isShown() ) {
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                row.child( str ).show();
                tr.addClass('shown');
            }
          }else{  //设置第一列
            // checkbox选中 tr变色
            if($(event.target).prop('type')=='checkbox'){
              if(!input.prop("checked")){
                input.prop("checked", false);
                tr.css("background-color", "")
              }else{
                input.prop("checked", true);
                tr.css("background-color", "#FFFFE0")
              }
            }else{
              if(input.prop("checked")){
                input.prop("checked", false);
                tr.css("background-color", "")
              }else{
                input.prop("checked", true);
                tr.css("background-color", "#FFFFE0")
              }
            }
          }
       });

       //  对DataTable 动态生成的button 进行监听
       $('#ApproveDataTable').on('click', 'button', function(event) {
         //  获取参数信息
         var table = $('#ApproveDataTable').DataTable();
         var tr = $(this).closest('tr');
         var row = table.row(tr);
         var company = row.data();
         //  获取当前舰艇按钮名称
         let button = event.target.name;
         //  companyId获取
         let ids = [];
         ids.push(company.companyId);
         let userId = JSON.parse(localStorage.getItem('user')).adminId;
         if (button == "refuse") { //  拒绝按钮
           me.setState({
             modal: {
               url: "/company/state",
               data:ids,
               traditional:true,
               state:2,
               userId:userId
             }
           });
         } else if (button == "agree") { //  同意按钮
           ApproveDataTableAction.changeCompanyState(ids,1,userId);
         } else {
           //  预留表单其他按钮
         }
       });


       //  <a /> 标签监听
       $("a").click(function(event) {
         //  获取实际点击的<a />标签
         let modal = event.target.dataset.toggle;
         let a = event.target.name;
         //  获取所有选中的checkbox
         let ids = [];
         $.each($('input:checkbox[name="checkbox"]:checked'), function() {
           ids.push($(this).val())
         });
         //  未选中任何 checkbox，不弹出 modal ，并提示message
         if (ids.length == 0) {
           modal = ""; //  取消modal属性
           if (a == "refuse" || a == "agree") {
             VsUtil.ShowHintDialog({content: "未选中公司"});
             return false;
           }
         }

         let userId = JSON.parse(localStorage.getItem('user')).adminId;

         //  选中checkbox
         if (a == "refuse") { // 拒绝
           me.setState({
             modal: {
               url: "/company/state",
               data:ids,
               traditional:true,
               state:2,
               userId:userId
             }
           });
         } else if (a == "agree") { // 同意
           ApproveDataTableAction.changeCompanyState(ids,1,userId);
         } else {
           //  预留页面其他<a />点击事件
         }
       });

   },

   //  同意和拒绝返回后的操作
   _onApproveDataTableDBStoreListen:function(result){
     switch (result.data.bizCode) {
       case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
         //  showMsg
         VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
         //  DataTable reload
         let table = $('#ApproveDataTable').DataTable();
         table.ajax.reload();
         break;
       case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
           VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
         break;
       }
   },

   render: function() {
     let styleTable = {
       textAlign:"center",
       verticalAlign:"middel"
     };
     let options = {
       ajax: '/company/approveList',
       aLengthMenu:[5],
       order: [[1, 'asc']],  //必须加，否则checkbox列头上的排序图标去除不掉
       columns: [
         {
           orderable: false,
           data: "companyId",
           render: function(data) {
             return '<div style="text-align:center;vertical-align:middel;"><input type="checkbox" className="checkboxs" name="checkbox" value = "' + data + '"/></div>';
           }
         }, {
           data: "companyName",
           render: function(data) {
             return '<div style="vertical-align:middel;">'+data+'</div>';
           }
         }, {
           data: "contactsName",
           render: function(data) {
             return '<div style="vertical-align:middel;">'+data+'</div>';
           }
         }, {
           data: "contactsCellphone",
           render: function(data) {
             return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
           }
         }, {
           render: function(data, type, row, meta) {
             return '<div style="text-align:center;vertical-align:middel;">' +row.validityStartTime+ ' ~ ' +row.validityEndTime+ '</div>';
           }
         }, {
           data: "ispaid",
           // 将0和1改成 相应的 字符
           render: function(data) {
             if(data == 1){
               data = "已结清"
             }else{
               data = "未结清"
             }
             return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
           }
         }, {
           data: "agentCompanyName",
           // 如果没有代理公司，就显示"无"
           render: function(data) {
             if(data == null){
               data = "无"
             }
             return '<div  style="vertical-align:middel;">'+data+'</div>';
           }
         }, {
           orderable: false,
           data: "companyId",
           render: function(data) {
             return '<div class="col-md-12" style="text-align:center;vertical-align:middel;"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#refuseModal"  name="refuse">拒绝</button> \n <button type="button" name="agree" class="btn btn-primary btn-sm" >同意</button></div>';
           }
         }
       ],
     };
     return (
       // 模块控件
       <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
         {/* 模块标题行 */}
         <header>
           <span className="widget-icon">
             <i className="fa fa-table"/>
           </span>
           <h2>公司列表</h2>

           <div className="widget-toolbar">
             <a className="btn-primary" name="agree" style={{
               padding: "5px 50px 5px"
             }} >同意</a>
           </div>
           <div className="widget-toolbar">
             <a href-void className="btn-primary" name="refuse" data-toggle="modal" data-target="#refuseModal" style={{
               padding: "5px 50px 5px"
             }}>拒绝</a>
           </div>
         </header>

         {/* 正文内容 */}
         <div>

           <div className="widget-body no-padding">
             {/* 以datatable形式显示 */}
             <Datatable options={options} id="ApproveDataTable" filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
               <thead>
                 <tr>
                   <th width="5%">
                     <input type='checkbox' className="checkboxs" onChange={this._selectAll}/></th>
                   <th  width="20%"><div style={styleTable}>公司名</div></th>
                   <th width="5%"><div style={styleTable}>联系人</div></th>
                   <th width="10%"><div style={styleTable}>联系人手机</div></th>
                   <th width="20%"><div style={styleTable}>有效时间</div></th>
                   <th width="10%"><div style={styleTable}>费用状态</div></th>
                   <th width="20%"><div style={styleTable}>上级代理公司</div></th>
                   <th width="10%"><div style={styleTable}>操作</div></th>
                 </tr>
               </thead>
             </Datatable>
           </div>
         </div>

         <RefuseModal extraParam={this.state.modal}  rtnModal={this._onApproveDataTableDBStoreListen}/>

       </JarvisWidget>
       // 模块控件结束
     )
   }
 });

 export default ApproveDataTable
