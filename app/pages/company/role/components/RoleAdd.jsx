import React from 'react'
import Reflux from 'reflux'

let RoleAdd = React.createClass({
  // mixins: [Reflux.connect(testStore)],
  // getInitialState: function() {
  //   return testStore.getData()
  // },
  // componentDidMount: function() {
  //   // const id = this.props.params.userId
  //   // var usrid = this.state.id
  //   // console.log(usrid)
  //   var userid = testStore.getUserId();
  //   testActions.edit(userid);
  // },
  render: function() {
    return (
      <div className="modal fade" id="RoleAdd" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h4 className="modal-title" id="myModalLabel">
                新增角色
              </h4>
            </div>
            <div className="modal-body">

              <div className="ibox-content">
                <form className="form-horizontal m-t smart-form" id="signupForm" noValidate="novalidate">
                  <div className="form-group">
                    <label className="col-sm-3 control-label">角色名：<span className="text-danger">&nbsp;* </span></label>
                    <div className="col-sm-8">
                      <label className="input"> <i
                          className="icon-append fa  fa-user"/>
                        <input type="text" name="username" placeholder="角色名"/>
                          <b className="tooltip tooltip-top-right">
                              <i className="fa  fa-user txt-color-teal"/>
                              &nbsp;请输入角色名</b>
                      </label>
                    </div>
                  </div>
                  <div className="form-group" style={{"marginTop":"10px"}}>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-5">
                    <button className="btn btn-primary btn-block" style={{"height":"40px"}} data-toggle="modal"
                       data-target="#RoleAdd">
                      <strong>&nbsp;角色权限设置</strong>
                    </button>
                  </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">确定
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">
                取消
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  }
});

export default RoleAdd
