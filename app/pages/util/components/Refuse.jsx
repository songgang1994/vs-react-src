/**
 * 拒绝 modal
 * Created by songgang on 2017/11/2.
 */
// 导入React组件
import React from 'react'
// 导入RefuseAction
import RefuseAction from '../actions/RefuseAction'
// 导入RefuseStore
import RefuseStore from '../stores/RefuseDBStore'

let Refuse = React.createClass({

  // 画面初始state生成
  getInitialState: function() {
    return {
      //拒绝原因
      reason: "",
      rtnRefuse: ""
    }
  },

  // 画面渲染之后
  componentDidMount: function() {
    //画面控件绑定
    this._registerEventHandler();
    //  监听同意访客事件，执行_onAgreeVisitorInvitationSuccess()
    this.unsubscribeRefuse = RefuseStore.listen(this._onRefuseSuccess);
  },

  // 画面渲染之后
  componentWillUnmount: function() {
    //  解除对拒绝事件的监听
    this.unsubscribeRefuse();
  },

  // 注册画面控件事件处理
  _registerEventHandler: function() {
    let me = this;
    //  全局 button 监听
    $('button').click(function(event) {
      //  获取选中按钮名称
      var button = event.target.name;
      if ("submit" == button) { // 当表单提交时触发事件
        // 防止表单默认提交
        event.preventDefault();
        // 表单数据获取
        // 拒绝理由
        let reason = $("#reason").val().trim();
        //  参数
        let param = me.props.extraParam;
        // 调用登录Action
        RefuseAction.refuse(param);
      }
      $('#refuseModal').modal('hide');
    });
  },

  _onRefuseSuccess: function(result) {
    this.props.rtnModal(result);
  },

  //画面渲染
  render: function() {
    // UiValidate在验证时默认会忽略掉隐藏的表单项，即options.ignore = ":hidden"
    // Select2组件会生成隐藏的<select>标签用于存放实际选择值
    // 所以此处将ignore设置成空字符串，不忽略任何元素
    let options = {
      ignore: ""
    };
    return (
      <div>
        <div className="modal fade" id="refuseModal" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" style={{
            paddingLeft: '10%'
          }}>
            <div className="modal-content " style={{
              width: '80%'
            }}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" aria-hidden="true" name="cancel">
                    &times;
                  </button>
                  <h4 className="modal-title" id="myModalLabel">拒绝原因</h4>
                </div>
                <form className="smart-form">
                  <div className="modal-body">
                    <fieldset style={{
                      paddingLeft: '5%',
                      paddingRight: '5%'
                    }}>
                      <section>
                        <div className="col-md-12">
                          <section>
                            <label htmlFor="selectAdd" className="label"></label>
                            <label className="textarea">
                              <textarea id="reason" type="text" name="reason" data-smart-validate-input="" data-required="" data-message-required="请输入您的拒绝原因" rows="10"/>
                              <b className="tooltip tooltip-top-right"><i className="fa fa-file-text txt-color-teal"/>&nbsp; 请输入拒绝原因</b>
                            </label>
                          </section>
                        </div>
                      </section>
                    </fieldset>
                  </div>
                  <footer>
                    <button type="button" id="btn-reason" name="submit" className="btn btn-primary">
                      保存
                    </button>
                    <button type="button" name="cancel" className="btn btn-primary">取消</button>
                  </footer>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
export default Refuse
