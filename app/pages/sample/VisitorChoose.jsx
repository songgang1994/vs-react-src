/**
 * 访客画面
 * Created by songgang on 2017/11/11.
 */
import React from 'react'
import {Alert} from 'react-bootstrap'
import WidgetGrid from '../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../components/layout/widgets/JarvisWidget.jsx'

import UiDatepicker from '../../../components/forms/inputs/UiDatepicker.jsx'
import Timepicker from '../../../components/forms/inputs/Timepicker.jsx'
//表单验证组件
// import UiValidate from '../../../components/forms/validation/UiValidate.jsx'
//导入共通函数
import Visitors from '../company/visitor/components/Visitors.jsx'


let VisitorAdd = React.createClass({
  memberadd: function(){
      var visitorname=$('#visitorname').val();
      var visitorTelNum=$('#visitorTelNum').val();
      var visitorComp=$('#visitorComp').val();
      var visitorMail=$('#visitorMail').val();
  },

  render: function() {
    return (
      <div className="modal fade" id="VisitorAdd" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{dialogWidth:"20"}}>
        <div className="modal-dialog" style={{width: '1200px'}}>
          <div className="modal-content" style={{width: '1200px'}}>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h4 className="modal-title" id="myModalLabel">
                访客选择
              </h4>
            </div>
            <div className="modal-body">
                    <Visitors/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.memberadd} data-dismiss="modal">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});


let Visitor = React.createClass({
  getNowFormatDate:function () {
     var date = new Date();
     var seperator1 = "-";
     var month = date.getMonth() + 1;
     var strDate = date.getDate();
     if (month >= 1 && month <= 9) {
         month = "0" + month;
     }
     if (strDate >= 0 && strDate <= 9) {
         strDate = "0" + strDate;
     }
     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

     return(currentdate);
 },
  render: function () {

    return (
      <div id="content" className="container">
        <div className="row">
            <div className="col-sm-2 col-md-2"></div>
          <div className="col-sm-8 col-sm-8">
            <div className="well no-padding"> <VisitorAdd/>

                <form id="forms" className="smart-form client-form">
                  <header>
                    填写访客相关信息，即可生成现场预约
                  </header>
                  <fieldset>
                        <div className="row">
                              <section className="col col-10">
                                  <label>访客姓名<span className="text-danger">&nbsp;* </span></label>
                                  <label className="input"> <i className="icon-append fa  fa-user"/>
                                  <input type="text" name="username" />
                                  </label>
                              </section>
                              <section className="col col-2">
                                  <label></label>
                                  <label className="input">
                                  <a href-void data-toggle="modal" data-target="#VisitorAdd" className="btn btn-primary btn-sm">选择访客</a>
                                  </label>
                              </section>
                        </div>

                        <div className="row">
                              <section className="col col-10">
                                  <label>访客电话<span className="text-danger">&nbsp;* </span></label>
                                  <label className="input"><i className="icon-append fa  fa-phone"/>
                                  <input type="text" name="usermoblie" />
                                  </label>
                              </section>
                        </div>

                        <div className="row">
                             <section className="col col-10">
                                  <label>访客公司</label>
                                  <label className="input"><i className="icon-append fa fa-briefcase"/>
                                  <input type="text" name="company" />
                                  </label>
                            </section>
                      </div>

                      <div className="row">
                              <section className="col col-10">
                                  <label>访客邮箱</label>
                                  <label className="input"> <i className="icon-append fa  fa-envelope"/>
                                  <input type="text" name="email" />
                                  </label>
                              </section>
                      </div>

                      <div className="row">
                              <section className="col col-10">
                                  <label>访客身份证号</label>
                                  <label className="input"> <i className="icon-append fa fa-credit-card"/>
                                  <input type="text" name="credicard" />
                                  </label>
                              </section>
                      </div>

                      <div className="row">
                          <section className="col col-4">
                          <label>来访事由<span className="text-danger">&nbsp;* </span></label>
                                <div className="btn-group" data-toggle="buttons">
                                  <label className="btn btn-default btn-sm active">
                                    <input type="radio" name="reason" value="0"/>
                                    面试</label>
                                  <label className="btn btn-default btn-sm">
                                    <input type="radio" name="reason" value="1"/>
                                    商务</label>
                                  <label className="btn btn-default btn-sm">
                                    <input type="radio" name="reason" value="2"/>
                                    私人</label>
                                  <label className="btn btn-default btn-sm">
                                    <input type="radio" name="reason" value="3"/>
                                  其他</label>
                              </div>
                          </section>
                          <section className="col col-2">
                           <label></label>
                          </section>
                      </div>

                       <div className="row">
                            <section className="col col-5">
                                  <label>拜访日期</label>
                                  <label className="input">
                                  <i className="icon-append fa fa-calendar"/>
                                  <UiDatepicker className="form-control datepicker" id="visitdate" defaultValue={this.getNowFormatDate()} dateFormat="yy/mm/dd" />
                                  </label>
                              </section>
                        </div>

                        <div className="row">
                               <section className="col col-5">
                                    <label>拜访开始时间</label>
                                     <label className="input">
                                       <i className="icon-append fa fa-clock-o"/>
                                       <Timepicker className="form-control"  id="visittimestart" placeholder="Select time"/>
                                     </label>
                               </section>
                               <section className="col col-5">
                                    <label>拜访结束时间</label>
                                   <label className="input">
                                    <i className="icon-append fa fa-clock-o"/>
                                    <Timepicker className="form-control"  id="visittimeend" placeholder="Select time"/>
                                    </label>
                               </section>
                         </div>

                        <div className="row">
                              <section className="col col-10"  >
                                    <label>被访人部门<span className="text-danger">&nbsp;* </span></label>
                                    <div className="selectContainer">
                                      <select className="form-control" name="depart">
                                            <option value="0">训练部</option>
                                            <option value="1">院务部</option>
                                            <option value="2">军务处</option>
                                      </select>
                                    </div>
                              </section>
                        </div>

                        <div className="row">
                              <section className="col col-10"  >
                                <label>被访人姓名<span className="text-danger">&nbsp;* </span></label>
                                <div className="selectContainer">
                                <select className="form-control" name="person">
                                            <option value="0">李丽</option>
                                            <option value="1">王辉</option>
                                </select>
                                </div>
                              </section>
                          </div>
                  </fieldset>

                  <footer>
                    <button type="submit" className="btn btn-primary">
                        确定
                     </button>
                    <button  className="btn btn-primary">
                      取消
                    </button>
                  </footer>
                </form>
            </div>
          </div>
        </div>
      </div>


    )
  }
});
export default Visitor
