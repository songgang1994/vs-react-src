import React from 'react'
import Reflux from 'reflux'
import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import CompanyStore from '../stores/CompanyStore.js'
import MaskedInput from '../../../../../components/forms/inputs/MaskedInput.jsx'
import Refuse from '../../../util/components/Refuse.jsx'
let EmployeeDetail = React.createClass({
  mixins: [Reflux.connect(CompanyStore)],
  getInitialState: function() {
    return {
      firstIn: true,
      company: {
        name: "",
        id: ""
      }
    }
  },
  _onSubmit: function(e) {
    e.preventDefault();
    console.log('submit stuff')
  },
  toggleChange: function(type) {
    let state = {};
    state[type] = !this.state[type];
    this.setState(state)

  },
  render: function() {
    if (this.state.firstIn) {
      return (null)
    } else {
      return (
        <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
          <header>
            <span className="widget-icon">
              <i className="fa fa-table"/>
            </span>
            <h2>详细</h2>
          </header>
          <div>
            <div className="widget-body">
              <form id="smart-form-register" className="smart-form " noValidate="novalidate">
                <fieldset style={{
                  paddingLeft: '5%',
                  paddingRight: '5%'
                }}>
                  <div className="row">
                    <section className="col col-6">
                      <label className="label">用户ID</label>
                      <label className="input">
                        <i className="icon-append fa  fa-user"/>
                        <input type="text" name="address" placeholder="用户ID" className="form-control" disabled value={this.state.company.idde}/>
                      </label>
                    </section>
                    <section className="col col-6">
                      <label className="label">姓名
                      </label>
                      <label className="input">
                        <i className="icon-append fa  fa-user"/>
                        <input type="text" name="address" placeholder="姓名" className="form-control" value={this.state.company.name} disabled/>
                        <b className="tooltip tooltip-top-right">
                          <i className="fa  fa-user txt-color-teal"/>
                          &nbsp;请输入姓名</b>
                      </label>
                    </section>
                  </div>
                  <div className="row">
                    <section className="col col-6">
                      <label className="label">手机号
                      </label>
                      <label className="input">
                        <i className="icon-append fa  fa-phone"/>
                        <input type="text" name="address" placeholder="手机号" className="form-control" disabled value={this.state.company.phone}/>
                        <b className="tooltip tooltip-top-right">
                          <i className="fa  fa-phone txt-color-teal"/>
                          &nbsp;请输入手机号</b>
                      </label>
                    </section>
                    <section className="col col-6">
                      <label className="label">邮箱
                      </label>
                      <label className="input">
                        <i className="icon-append fa  fa-envelope"/>
                        <input type="text" name="address" placeholder="邮箱" className="form-control" disabled value={this.state.company.Emile}/>
                        <b className="tooltip tooltip-top-right">
                          <i className="fa  fa-envelope txt-color-teal"/>
                          &nbsp;请输入邮箱</b>
                      </label>
                    </section>
                  </div>

                  <div className="row">
                    <section className="col col-6">
                      <label className="label">所属部门
                      </label>
                      <label className="input">
                        <i className="icon-append fa  fa-user"/>
                        <input type="text" name="address" placeholder="所属部门" className="form-control" disabled value={this.state.company.companys}/>
                        <b className="tooltip tooltip-top-right">
                          <i className="fa  fa-user txt-color-teal"/>
                          &nbsp;请选择所属部门</b>
                      </label>
                    </section>
                    <section className="col col-6">
                      <label className="label">角色
                      </label>
                      <label className="input">
                        <i className="icon-append fa  fa-user"/>
                        <input type="text" name="address" placeholder="角色" className="form-control" disabled value={this.state.company.role}/>
                        <b className="tooltip tooltip-top-right">
                          <i className="fa  fa-user txt-color-teal"/>
                          &nbsp;请选择角色</b>
                      </label>
                    </section>
                  </div>

                  <div className="row">
                    <section className="col col-6">
                      <label className="label">头像
                      </label>
                      <label className="input">
                        <img src={this.state.company.path} width="135px" height="180px"/>
                      </label>
                    </section>

                    <section className="col col-6">
                      <label className="label">备注
                      </label>
                      <label className="textarea">
                        <i className="icon-append fa fa-file-text"/>
                        <textarea rows="10" name="info" placeholder="备注" className="form-control" disabled value={this.state.company.note}/>
                        <b className="tooltip tooltip-top-right">
                          <i className="fa fa-file-text txt-color-teal"/>
                          &nbsp;请填写备注</b>
                      </label>
                    </section>
                  </div>

                </fieldset>
                <footer>
                  <button type="submit" className="btn btn-primary">
                    同意
                  </button>
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#refuse">
                    拒绝
                  </button>

                </footer>
              </form>
            </div>
            <Refuse/>
          </div>
        </JarvisWidget>
      )
    }
  }
});

export default EmployeeDetail
