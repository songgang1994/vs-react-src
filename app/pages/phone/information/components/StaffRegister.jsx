/**
 * 员工注册画面
 * Created by Xuwz on 2017/11/17.
 */
 // 导入React组件
import React from 'react'
import Select2 from '../../../../../components/forms/inputs/Select2.jsx'
 // ----------------------- 引用组件 ------------------------------ //
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import Commons from '../../commons/components/commons.jsx'



let StaffRegister = React.createClass({
  // 画面渲染之前
  componentWillMount: function() {

  },
  // 画面渲染之后
  componentDidMount: function() {
      //画面控件绑定
      this._registerEventHandler();
      //页面刷新默认选中员工单选框
      $("#radio-staff").attr("checked",true);
  },
  // 画面控件事件处理
  _registerEventHandler: function() {
    //访客点击事件
    $("input[name='radio']").on("change",function(){
      if($("#radio-visitor").is(':checked')){
        $("#staf").css("display","none");
        $("#visito").css("display","block")
      }else{
        $("#staf").css("display","block");
        $("#visito").css("display","none")
      }
    })


  },
   //画面渲染
   render: function() {
     return (
       <div id="content" >
         <div className="row">
           <div className="col-sm-12 col-lg-12 col-xs-12">
             <div >
                 <input type="radio" id="radio-staff" value="1" name="radio"/><label>员工</label>
                   &nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" id="radio-visitor" value="2" name="radio" /><label>访客</label>
             </div>
             <div  id="staf" style={{"display": "block"}}>
             <form id="forms" className="smart-form client-form">
               <fieldset>
                 <div className="row" style={{marginTop:"-5%"}}>
                   <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                     <label className="label">所属公司 </label>
                     <label className="select">
                      <div id="visitor-depart">
                      <Select2  style={{width: '100%'}} >
                      <option value=""></option>
                      <option value="">开发部</option>
                      </Select2>
                      </div>
                     </label>
                   </section>
                 </div>
                 <div className="row">
                   <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                     <label className="label">登录名</label>
                     <label className="input">
                       <i className="icon-append fa  fa-user"/>
                       <input type="text" id="loginName" className="form-control" />
                     </label>
                   </section>
                 </div>
                 <div className="row">
                   <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                     <label className="label">密码<span className="text-danger">&nbsp;*
                     </span>
                   </label>
                   <label className="input">
                     <i className="icon-append fa  fa-lock"/>
                     <input type="visitorPassword" id="visitorPassword" name="visitorPassword" className="form-control" ></input>
                   </label>
                 </section>
                 </div>
                 <div className="row">
                  <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                    <label className="label">用户ID<span className="text-danger">&nbsp;*
                    </span>
                    </label>
                    <label className="input">
                    <i className="icon-append fa  fa-user"/>
                    <input type="text" id="visitorUid" name="visitorUid" className="form-control" />
                   </label>
                  </section>
                 </div>
                 <div className="row">
                  <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                    <label className="label">姓名
                    <span className="text-danger">&nbsp;*
                    </span>
                    </label>
                    <label className="input">
                    <i className="icon-append fa  fa-user"/>
                    <input type="text" id="visitorName" name="visitorName" className="form-control" />
                    </label>
                   </section>
                 </div>
                 <div className="row">
                  <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                   <label className="label">手机号<span className="text-danger">&nbsp;*
                   </span>
                   </label>
                   <label className="input">
                   <i className="icon-append fa  fa-phone"/>
                   <input type="text" id="cellphone" name="cellphone" className="form-control" ></input>
                   </label>
                  </section>
                 </div>
                 <div className="row">
                  <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                   <label className="label">邮箱<span className="text-danger">&nbsp;*
                   </span>
                   </label>
                   <label className="input">
                    <i className="icon-append fa  fa-envelope"/>
                    <input type="text" id="visitorMail" name="visitorMail" className="form-control" ></input>
                   </label>
                  </section>
                 </div>
                 <div className="row">
                  <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                   <label className="label">所属部门<span className="text-danger">&nbsp;*
                   </span>
                   </label>
                   <label className="select">
                    <div id="visitor-depart">
                    <Select2  style={{width: '100%'}} >
                    <option value="开发部">开发部</option>
                    </Select2>
                    </div>
                   </label>
                 </section>
                </div>
                <div className="row">
                <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
                 <label className="label">角色<span className="text-danger">&nbsp;*
                 </span>
                 </label>
                 <label className="select">
                   <div id="visitor-role">
                   <Select2 style={{  width: '100%'}} >
                   <option value="普通员工">普通员工</option>
                   </Select2>
                 </div>
               </label>
             </section>
           </div>
           <div style={{marginTop: '2%'}}>
             <div className="row">
                 <section className="col-xs-5">
                    <img id="pic" src="/styles/img/demo/toxiang1.png" width="135px" height="180px"/>
                 </section>
                 <section className="col-xs-7" style={{marginTop:"10%"}}>
                    <input type="file" /><br/>
                    请上传一张您的照片<br/>
                    这张照片将用于人脸签到<br/>
                    请保持五官端正
                </section>
             </div>
          </div>
          <div >
           <div style={{float:"left",marginLeft:"30%"}}>
             <button type="button" className="btn btn-info  btn-default btn-sm">取消</button>
           </div>
           <div style={{float:"left",marginLeft:"10%"}}>
             <button type="button" className="btn btn-info btn-default btn-sm">确定</button>
           </div>
          </div>
       </fieldset>
     </form>
   </div>
   <div  id="visito" style={{"display": "none"}}>
   <form id="forms" className="smart-form client-form">
     <fieldset>
       <div className="row" style={{marginTop:"-5%"}}>
         <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
           <label className="label">姓名</label>
           <label className="input">
             <i className="icon-append fa  fa-user"/>
             <input type="text" id="visitorName"  className="form-control"/>
           </label>
         </section>
       </div>
       <div className="row">
         <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
           <label className="label">身份证号</label>
           <label className="input">
             <i className="icon-append fa  fa-user"/>
             <input type="text" id="visitorNumb" className="form-control" />
           </label>
         </section>
       </div>
       <div className="row">
         <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
           <label className="label">手机号<span className="text-danger">&nbsp;*
           </span>
         </label>
         <label className="input">
           <i className="icon-append fa  fa-phone"/>
           <input type="password" id="visitorPhone"  className="form-control" ></input>
         </label>
       </section>
       </div>
       <div className="row">
        <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
         <label className="label">邮箱<span className="text-danger">&nbsp;*
         </span>
         </label>
         <label className="input">
          <i className="icon-append fa  fa-envelope"/>
          <input type="text" id="visitorMail"  className="form-control"></input>
         </label>
        </section>
       </div>
       <div className="row">
        <section className="col col-sm-12 col-md-12 col-lg-12 col-xs-12">
          <label className="label">所属公司<span className="text-danger">&nbsp;*
          </span>
          </label>
          <label className="input">
          <i className="icon-append fa  fa-user"/>
          <input type="text" id="visitorCompany"  className="form-control" />
         </label>
        </section>
       </div>
       <div style={{marginTop: '2%'}}>
           <div className="row">
               <section className="col-xs-5">
                     <img id="pic" src="/styles/img/demo/toxiang1.png" width="135px" height="180px"/>
               </section>
               <section className="col-xs-7" style={{marginTop:"10%"}}>
                     <input type="file" /><br/>
                     请上传一张您的照片<br/>
                     这张照片将用于人脸签到<br/>
                     请保持五官端正
              </section>
          </div>
       </div>
       <div style={{float:"left",marginLeft:"30%"}}>
               <button type="button" className="btn btn-info  btn-default btn-sm">取消</button>
       </div>
       <div style={{float:"left",marginLeft:"10%"}}>
             <button type="button" className="btn btn-info btn-default btn-sm">确定</button>
      </div>
     </fieldset>
    </form>
   </div>
   </div>
   </div>
  <Commons/>
 </div>
    //    <div>
    //    <div style={{marginLeft: '7%',marginRight:'7%'}}>
    //      <div >
    //         <input type="radio" id="radio-staff" value="1" name="radio"/><label>员工</label>
    //         &nbsp;&nbsp;&nbsp;&nbsp;
    //         <input type="radio" id="radio-visitor" value="2" name="radio" /><label>访客</label>
    //      </div>
    //      <div  id="staf" style={{"display": "block"}}>
    //      <div style={{marginTop: '0.1%'}}>
    //         所属公司<br/>
    //        {/* <input type="text" id="visitor"  style={{width: '100%'}}/> */}
    //        <Select2 id="staff"  style={{width: '100%'}} >
    //           <option value="">员工</option>
    //         </Select2>
    //      </div>
    //      <div style={{marginTop: '1%'}}>
    //           *如果您已经是系统用户<br/>
    //           只需输入登录名密码，我们会为您关联用户信息
    //      </div>
    //      <form>
    //      <div style={{marginTop: '2%'}}>
    //          登录名：<br/>
    //          <input type="text" id="login-name" style={{width: '100%'}}/>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          密码：<br/>
    //          <input type="text" id="login-password" style={{width: '100%'}}/>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          用户ID：<br/>
    //          <input type="text" id="user-id" style={{width: '100%'}}/>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          姓名：<br/>
    //          <input type="text" id="user-name" style={{width: '100%'}}/>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          手机号：<br/>
    //          <input type="text" id="phone" style={{width: '100%'}}/>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          邮箱：<br/>
    //          <input type="text" id="mail" style={{width: '100%'}}/>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          所属部门：<br/>
    //          <Select2 id="depart"   style={{width: '100%'}} >
    //            <option value="">部门</option>
    //          </Select2>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          角色：<br/>
    //          <Select2 id="role"   style={{width: '100%'}} >
    //            <option value="">角色</option>
    //          </Select2>
    //      </div>
    //      <div style={{marginTop: '2%'}}>
    //          审批人：<br/>
    //          <Select2  id="approver"  style={{width: '100%'}} >
    //            <option value="">审批人</option>
    //          </Select2>
    //      </div>
    //
    //      <div style={{marginTop: '2%'}}>
    //        <div className="row">
    //            <section className="col-xs-5">
    //               <img id="pic" src="/styles/img/demo/toxiang1.png" width="135px" height="180px"/>
    //            </section>
    //            <section className="col-xs-7 ">
    //               <input type="file" /><br/>
    //               请上传一张您的照片<br/>
    //               这张照片将用于人脸签到<br/>
    //               请保持五官端正
    //           </section>
    //        </div>
    //     </div>
    //     <div className="text-center" style={{marginTop: '5%'}}>
    //          <button id="confirm" type="button" className="btn btn-primary ">确定</button>
    //     </div>
    //     </form>
    //     </div>
    //     <form>
    //     <div  id="visito" style={{"display": "none"}}>
    //       <div style={{marginTop: '2%'}}>
    //           姓名：<br/>
    //           <input type="text" id="visitor-name" style={{width: '100%'}}/>
    //       </div>
    //       <div style={{marginTop: '2%'}}>
    //            身份证号：<br/>
    //           <input type="text" id="visitor-number" style={{width: '100%'}}/>
    //       </div>
    //       <div style={{marginTop: '2%'}}>
    //            手机：<br/>
    //           <input type="text" id="visitor-phone" style={{width: '100%'}}/>
    //       </div>
    //       <div style={{marginTop: '2%'}}>
    //            邮箱：<br/>
    //           <input type="text" id="visitor-mail" style={{width: '100%'}}/>
    //       </div>
    //       <div style={{marginTop: '2%'}}>
    //            所属公司：<br/>
    //           <input type="text" id="visitor-company" style={{width: '100%'}}/>
    //       </div>
    //       <div style={{marginTop: '2%'}}>
    //         <div className="row">
    //             <section className="col-xs-5">
    //                <img id="pic" src="/styles/img/demo/toxiang1.png" width="135px" height="180px"/>
    //             </section>
    //             <section className="col-xs-7 ">
    //                <input type="file" /><br/>
    //                请上传一张您的照片<br/>
    //                这张照片将用于人脸签到<br/>
    //                请保持五官端正
    //            </section>
    //         </div>
    //      </div>
    //      <div className="text-center" style={{marginTop: '5%'}}>
    //           <button type="button" className="btn btn-primary ">确定</button>
    //      </div>
    //     </div>
    //     </form>
    //    </div>
    //    <Commons/>
    // </div>
    )
  }
});
 export default StaffRegister
