import React from 'react'
import Reflux from 'reflux'

import _ from 'lodash'

import SubHeader from '../../layout/SubHeader.jsx'
import BigBreadcrumbs from '../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../components/layout/widgets/JarvisWidget.jsx'
import Select2 from '../../../../components/forms/inputs/Select2.jsx'

import Datatable from '../../../../components/tables/Datatable.jsx'

import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

import SampleActions from '../actions/SampleActions'
import SampleEditStore from '../stores/SampleEditStore'

let SampleEdit = React.createClass({
  mixins: [Reflux.connect(SampleEditStore)],
  componentWillMount: function () {
      if (this.state.isUpd) {
          $("#username").prop("readonly", true);
          SampleActions.edit(this.state.userId);
      }
  },
  getInitialState: function () {

      var userId = this.props.params.userId;
      return {
          isAdd: !userId,
          isUpd: !!userId,
          op: userId ? 'upd' : 'add',
          userId: userId,
          user: {loginName: "", loginPassword: "", role: "admin"},
          newPassword: "",
          confirmPassword: ""
      };
  },
  _createUser: function() {

      var username = $("#username").val().trim();
      var password = $("#password").val().trim();
      var role = $("#role").val();

      var newPassword = $("#new-password").val().trim();
      var confirmPassword = $("#confirm-password").val().trim();

      if (!username || !role) {
          return false;
      }

      if (this.state.op == 'add' && !this.state.user.loginPassword.trim()) {
          return false;
      }

      if (this.state.op == 'upd') {

        if  (newPassword != confirmPassword) {
          return false;
        } else {
          password = newPassword;
        }
      }

      return {
          loginName: username,
          loginPassword: password,
          role: role
      }
  },
  _add: function(e) {

      var user = _createUser();
      SampleActions.add(user);
  },
  _upd: function(e) {

      var user = _createUser();
      user.userId = this.state.userId;

      SampleActions.update(user);
  },
  _submit: function(e) {
      e.preventDefault();
      if (this.state.op == 'add') {
          this._add();
      } else {
          this._upd();
      }
  },
  render: function () {

      let _newPassword = this.state.op == 'upd' ? <div className="row">
          <article className="col-sm-12">
              <div className="col-sm-2">
                  <label htmlFor="new-password">新密码</label>
              </div>

              <div className="col-sm-10">
                  <input id="new-password" type="password" className="form-control" placeholder="请输入新密码"
                      value={this.state.newPassword} />
              </div>
          </article>
      </div> : null;
      let _confirmPassword = this.state.op == 'upd' ? <div className="row">
          <article className="col-sm-12">
              <div className="col-sm-2">
                  <label htmlFor="confirm-password">确认新密码</label>
              </div>

              <div className="col-sm-10">
                  <input id="confirm-password" type="password" className="form-control" placeholder="请再次输入新密码"
                      value={this.state.confirmPassword} />
              </div>
          </article>
      </div> : null;

      let btnText = this.state.op == 'upd' ? "更新" : "添加";

    return (
      <div id="content">
          <div className="row">
              <BigBreadcrumbs items={['E-Commerce', 'Orders']} icon="fa fa-fw fa-shopping-cart"
                              className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
              <SubHeader />
          </div>
          <form>
          <div className="row">
              <article className="col-sm-12">
                  <div className="col-sm-2">
                      <label htmlFor="username">用户名</label>
                  </div>

                  <div className="col-sm-10">
                      <input id="username" type="text" className="form-control" placeholder="请输入用户名"
                          value={this.state.user.loginName} />

                  </div>
              </article>
          </div>

          <div className="row">
              <article className="col-sm-12">
                  <div className="col-sm-2">
                      <label htmlFor="password">密码</label>
                  </div>

                  <div className="col-sm-10">
                      <input id="password" type="password" className="form-control" placeholder="请输入密码"
                          value={this.state.user.loginPassword} />
                  </div>
              </article>
          </div>

          {_newPassword}
          {_confirmPassword}

          <div className="row">
              <article className="col-sm-12">
                  <div className="col-sm-2">
                      <label htmlFor="role">用户角色</label>
                  </div>

                  <div className="col-sm-10">
                    <Select2 id="role" multiple={false} default="normal" style={{width:"100%"}} data-select-search="true">
                        <option value="admin">管理员</option>
                        <option value="normal">普通用户</option>
                    </Select2>
                  </div>
              </article>
          </div>

          <div className="row">
              <article className="col-sm-12">
                <button className="btn btn-default" type="button"
                  onClick={this._submit}>
                    <i className="fa fa-plus"/> {btnText}
                </button>
                <button className="btn btn-cancel" type="button">
                    <i className="fa fa-arrow-left"/> 返回
                </button>
              </article>
          </div>

        </form>
      </div>
    )
  }
});

export default SampleEdit
