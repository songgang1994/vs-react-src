/**
 * 选择审批人画面
 * Created by Xuwz on 2017/11/10
 */

//导入react
import React from 'react'
import Select2 from '../../../../components/forms/inputs/Select2.jsx'
import SelectApproverAction from '../actions/SelectApproverAction'
import SelectApproverStore from '../stores/SelectApproverStore'
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;


let SelectApprover = React.createClass({
  _closeAdd: function() {
    $('#selectapprover').modal('hide');
  },
  _addSubmit: function() {
    $('#selectapprover').modal('hide');
  },


  // 画面渲染之前
  componentWillMount: function() {
    //获取想要的公司id和部门id
    let companyId = JSON.parse(localStorage.getItem('user')).companyId;
    let departId = JSON.parse(localStorage.getItem('user')).departId;
    //调用选择审批人的Action
    SelectApproverAction.select(companyId,departId);

  },
  // 画面渲染之后
  componentDidMount: function() {
    //画面控件绑定
    this._registerEventHandler();
    //  监听审批人列表获取事件，当获取到审批人列表时，执行_onselectApproverDone()
    this.unsubscribeApprover = SelectApproverStore.listen(this._onselectApproverDone);
  },

  componentWillUnmount: function() {
      // 解除对审批人列表获取事件的监听
      this.unsubscribeApprover();

  },

  // 画面控件事件处理
  _registerEventHandler: function() {
    let me = this;
    $("#user-type").on("change", function() {
      if($("#user-type").val()!=""){
        //获取下拉框中的companyid
        let staffId = $("#user-type").select2('data').id;
        //获取下拉框中的人员姓名
        let staffName = $("#user-type").select2('data').text;
      }
    });

     //当点击保存按钮时,触发相应事件

      $("#btn-save").click(function() {
        //获取下拉框中的companyid
        let staffId = $("#user-type").select2('data').id;
        //将id传给父组件
        me.props.rtnModal(staffId);

      });
   },


  _onselectApproverDone: function(data) {

      data.selectapprover.forEach(function(approver, index) {
          $("#user-type").append(new Option(approver.staffName, approver.staffId)).trigger('change');
      })
          $("#user-type").change();
  },


  render: function() {
    return (
      <div>

        <div className="modal fade" id="selectapprover" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
              <div className="modal-dialog" >
                <div className="modal-content" style={{width: '100%'}}>
                  <div className="modal-header">
                    <button type="button" className="close" aria-hidden="true" onClick={this._closeAdd}>
                      &times;
                    </button>
                    <h4 className="modal-title" id="myModalLabel">审批人选择</h4>
                  </div>
                  <form onSubmit={this._addSubmit} encType="multipart/form-data" className="smart-form">
                  <div className="modal-body">
                    <fieldset style={{paddingLeft: '5%',paddingRight: '5%',  paddingTop: '10%',  paddingBottom: '10%'  }}>
                      <section>
                        <label className="select">
                          <i className="icon-append fa fa-user"/>
                          <div id=''>
                            <Select2 ref="selUser" id="user-type" multiple={false} style={{width: '100%'}} data-select-search="false" data-language="zh-CN" data-minimum-results-for-search="Infinity" data-placeholder="请选择审批人" name="usertype" defaultValue="" data-smart-validate-input="" data-required="" data-message-required="">
                              <option value=""></option>
                            </Select2>
                          </div>
                        </label>
                      </section>
                    </fieldset>
                    <footer>
                      <button id="btn-save" type="button" className="btn btn-primary" onClick={this._addSubmit}>
                        保存
                      </button>
                      <button type="button" className="btn btn-primary" onClick={this._closeAdd}>取消</button>
                    </footer>
                  </div>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
});
export default SelectApprover
