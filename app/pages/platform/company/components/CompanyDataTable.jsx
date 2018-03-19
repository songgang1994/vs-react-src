/**
 *平台管理员/公司管理员  登录状态下 公司画面   公司datatable组件
 *Creat by chenfei 2017/11/10
 */
 // 导入React组件
 import React from 'react'
 import Reflux from 'reflux'
 import _ from 'lodash'

// 导入公共组件
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

//导入自定义控件
import CompanyModal from './CompanyModal.jsx'

//导入Action和Store
import CompanyDataTableAction from '../actions/CompanyDataTableAction.js'
import CompanyDataTableDBStore from '../stores/CompanyDataTableDBStore.js'

//datatable显示区域的组件
let CompanyDataTable = React.createClass({
  // 画面初始state生成
  getInitialState: function() {
   return{
     //不能删
     //传给模态form的参数集合
     modal: {
       isAdd:true,
       company: {
         companyId:"",
         companyName:"",
         companyAddress:"",
         contactsId:"",
         contactsName:"",
         contactsMail:"",
         contactsTelephone:"", // 联系人座机
         contactsCellphone:"", // 联系人手机
         termOfValidityBegin:"", // 有效开始时间
         termOfValidityEnd:"", // 有效结束时间
         isAgent:"",          //代理
         isPaid:"",					  //费用状态
      	 agentcompanyId:"",		//上级代理
      	 checkState:"",			//审核状态(0:未审核,1：审核通过,2：审核不通过)
      	 checkOpinion:"",	//审核意见
      	 checkTime:"",		//审核时间
      	 memo:"",
         isvalid:"",
         contactsLoginpassword:"",
         updateid:"",
         creatid:""
       }
     },
     //准备的空数据
     company: {
       companyId:"",
       companyName:"",
       companyAddress:"",
       contactsId:"",
       contactsName:"",
       contactsMail:"",
       contactsTelephone:"", // 联系人座机
       contactsCellphone:"", // 联系人手机
       termOfValidityBegin:"", // 有效开始时间
       termOfValidityEnd:"", // 有效结束时间
       isAgent:"",          //代理
       isPaid:"",					  //费用状态
       agentcompanyId:"",		//上级代理
       checkState:"",			//审核状态(0:未审核,1：审核通过,2：审核不通过)
       checkOpinion:"",	//审核意见
       checkTime:"",		//审核时间
       memo:"",
       isvalid:"",
       contactsLoginpassword:"",
       updateid:"",
       creatid:""
     }
   }
  },

  // 画面渲染之后
  componentDidMount: function() {
   // 画面控件事件绑定
   this._registerEventHandler();
  },

  //监听控件事件函数
  _registerEventHandler: function() {
    let me = this;

    //dataTable 行点击事件
    $('#CompanyDataTable').on('click', 'td:not(:last-child)', function(event) {
      //获取参数信息
      let table = $('#CompanyDataTable').DataTable();
      let tr = $(this).closest('tr');
      let row = table.row( tr );
      let company = row.data();

      // 行 子列中显示内容准备
      let str = '<form class="smart-form" ><fieldset>'+
               '<section><label class="label">公司地址:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+company.companyAddress+'</label></section>'+
               '<section ><label class="label">联系人邮箱:&nbsp;'+company.contactsMail+' </label></section>'+
               '<section ><label class="label">联系人座机:&nbsp;'+company.contactsTelephone+'</label> </section>'+
               '</section></fieldset>'+
               '</form>';

      // 行 点中 背景色切换
      if ( row.child.isShown() ) {
          row.child.hide();
          tr.removeClass('shown');
      }else {
          row.child( str ).show();
          tr.addClass('shown');
      }

    });


    //  对DataTable 动态生成的button 进行监听
    $('#CompanyDataTable').on('click', 'button', function(event) {
      //  获取参数信息
      let table = $('#CompanyDataTable').DataTable();
      let tr = $(this).closest('tr');
      let row = table.row(tr);
      let company = row.data();

      //  获取当前监听按钮名称
      let button = event.target.name;
      if (button == "edit") { //  编辑按钮
        //给弹出的模态框传数据
        me.setState({
         modal: {
           isAdd:false,
           company:company,
         }
        });
        //弹出模态框
        $('#companyModal').modal('show');
      }
    });

    //右上角添加按钮
    //  <a /> 标签监听
    $("a").click(function(event) {
     //  获取当前监听a标签名称
     let name = event.target.name;
     if (name == "add") { // 新增
       //给弹出的模态框传数据
       me.setState({
         modal: {
           isAdd:true,
           company:me.state.company,  //传递空数据
         }
       });
       //弹出模态框
       $('#companyModal').modal('show');
     }
    });

  },

  //  新增和修改返回后的操作
  _onCompanyDataTableDBStoreListen:function(result){
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        //  showMsg
        VsUtil.ShowHintDialog({content: result.data.bizExeMsgs[0]});
        //  DataTable reload
        let table = $('#CompanyDataTable').DataTable();
        table.ajax.reload();
        break;
      case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
        break;
     }
  },

  //渲染
  render: function() {
    //表格内式样
    let styleTable = {
      textAlign:"center",
      verticalAlign:"middel"
    };
    //datatable的options
    let options = {
      ajax: '/company/companyInfoDto',
      aLengthMenu:[5],
      order: [[1, 'asc']],  //必须加，否则checkbox列头上的排序图标去除不掉
      columns: [
        {
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
          data: "checkState",
          render: function(data) {
            if(data == null){
              data = "无"
            }else if(data == "2"){
              data = "审核不通过"
            }else if(data == "1"){
              data = "审核通过"
            }else{
              data = "未审核"
            }
            return '<div  style="text-align:center;vertical-align:middel;">'+data+'</div>';
          }
        }, {
          orderable: false,
          data: "companyId",
          render: function(data) {
            return '<div class="col-md-12" style="text-align:center;vertical-align:middel;"><button type="button" class="btn btn-primary btn-sm"  name="edit">编辑</button></div>';
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
             <a href-void className="btn-primary" name="add" data-toggle="modal" data-target="#companyModal" style={{
               padding: "5px 50px 5px"
             }}>添加公司</a>
           </div>
         </header>

         {/* 正文内容 */}
         <div>

           <div className="widget-body no-padding">
             {/* 以datatable形式显示 */}
             <Datatable options={options} id="CompanyDataTable" filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
               <thead>
                 <tr>
                   <th width="20%"><div style={styleTable}>公司名</div></th>
                   <th width="8%"><div style={styleTable}>联系人</div></th>
                   <th width="10%"><div style={styleTable}>联系人手机</div></th>
                   <th width="20%"><div style={styleTable}>有效时间</div></th>
                   <th width="8%"><div style={styleTable}>费用状态</div></th>
                   <th width="20%"><div style={styleTable}>上级代理公司</div></th>
                   <th width="8%"><div style={styleTable}>审核状态</div></th>
                   <th width="5%"><div style={styleTable}>操作</div></th>
                 </tr>
               </thead>
             </Datatable>
           </div>
         </div>

         {/* 模态form */}
         <CompanyModal extraParam={this.state.modal} rtnModal={this._onCompanyDataTableDBStoreListen}/>

       </JarvisWidget>
     )
   }
 });

 export default CompanyDataTable
