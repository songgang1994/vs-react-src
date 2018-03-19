import React from 'react'
import _ from 'lodash'
import {OverlayTrigger, Tooltip, Popover} from 'react-bootstrap'

import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import TreeView from '../../../../../components/ui/TreeView.jsx'
import SmartNestable from '../../../../../components/ui/SmartNestable.jsx'
import EasyPieChart from '../../../../../components/graphs/inline/EasyPieChart.jsx'
import AdminAction from '../actions/AdminAction.js'
import AdminStores from '../stores/AdminStores.js'

//公司名右侧显示的标签
let Labels = React.createClass({
  getInitialState: function() {
    return {flag: ''};
  },
  render: function() {
    let flag = this.props.flag;
    switch (flag) {

      case "2":
        return (
          <span className="label pull-right label-default">失效</span>
        )
        default:
          return (
            <span className="label pull-right label-warning"></span>
          )
    }
  }
})

// 显示公司列表
let Items = React.createClass({
  getInitialState: function() {
    return {items: '', company: ''};
  },
  //item点击事件
  handleClick: function(company, event) {
    let that = this;
    // alert(company);
    var item = event.target;
    that.setState({company: company});
    AdminAction.chooseAdmin(company);
    // event.stopPropagation();
    // event.preventDefault()

  },
  render: function() {
    let items = this.props.items;
    let that = this;
    if (items != null && items.length > 0) {
      return (
        // <table className="" style={{
        //   overflow: "auto",
        //   height: '568px'
        // }}>
        //   {items.map(function(company, idx) {
        //     return (
        //       <th className="dd-item" key={idx}>
        //         <div className="dd3-content" onClick={that.handleClick.bind(null, company)}>
        //           {/* 判断标签 */}
        //           <Labels flag={company.flag}/> {/* 公司名 */}
        //           <label>{company.name}</label>
        //         </div>
        //
        //         {/* 递归 */}
        //         <Items items={company.children}/>
        //       </th>
        //     )
        //   })}
        // </table>
        <ol className="dd-list" style={{
          overflow: "auto",
          height: '568px'
        }}>
          {items.map(function(company, idx) {
            return (
              <li className="dd-item" key={idx}>
                <div className="dd3-content" onClick={that.handleClick.bind(null, company)}>
                  {/* 判断标签 */}
                  <Labels flag={company.flag}/> {/* 公司名 */}
                  <label>{company.name}</label>
                </div>

                {/* 递归 */}
                <Items items={company.children}/>
              </li>
            )
          })}
        </ol>
      )
    } else {
      return (null)
    }
  }
})

let Admin = React.createClass({
  getInitialState: function() {
    return {admins: []}
  },
  handleClick: function(value, event) {
    //alert("add");
    if (value == "add") {
      AdminAction.addAdmin();
    }
  },
  componentWillMount: function() {
    $.getJSON('api/admin.json').then(function(data) {
      this.setState(data)
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
          {/* 组件头部标题 */}
          <header>
            <span className="widget-icon">
              <i className="fa fa-bank"/>
            </span>
            <h2>管理员</h2>
            <div className="widget-toolbar">
              <a href-void className="btn-primary" style={{
                padding: "5px 50px 5px"
              }} onClick={this.handleClick.bind(null, "add")}>新增</a>
            </div>
          </header>

          {/* 组件内容 */}
          <div className="col-sm-12 col-lg-12">
            {/* 工具行 新增按钮、搜索框 */}
            <div className="form-inline">
              <div className="input-group pull-left">
                <span className="input-group-addon btn btn-primary ">
                  <span className="fa fa-search"/>
                </span>
                <input type="text" className="form-control "/>
              </div>
            </div>
            {/* 空一行 */}

            {/* 数据（嵌套结构） */}
            <SmartNestable group="1">
              <div className="dd">
                {/* <table >
                  <Items items={this.state.admins}/>
                </table> */}
                 <ol className="dd-list">

                </ol>
                <Items items={this.state.admins}/>
              </div>
            </SmartNestable>
          </div>
        </JarvisWidget>
      </div>
    )
  }
});
export default Admin
