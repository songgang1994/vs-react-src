import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import {OverlayTrigger, Tooltip, Popover} from 'react-bootstrap'
import {findDOMNode} from 'react-dom'
import ReactDOM from 'react-dom'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import TreeView from '../../../../../components/ui/TreeView.jsx'
import SmartNestable from '../../../../../components/ui/SmartNestable.jsx'
import EasyPieChart from '../../../../../components/graphs/inline/EasyPieChart.jsx'
import CompanyActions from '../actions/CompanyActions.js'
import ScriptLoader from '../../../../../components/utils/mixins/ScriptLoader.jsx'
import CompanyStore from '../stores/CompanyStore.js'
// 显示公司列表
let Items = React.createClass({
  getInitialState: function() {
    return {items: '', company: ''};
  },

  handleClick: function(company, event) {
    var item = event.target;
    this.setState({company: company});
    CompanyActions.chooseCompany(company);
    event.stopPropagation();
    event.preventDefault()
  },

  render: function() {
    let items = this.props.items;
    let o = this;
    if (items != null && items.length > 0) {
      return (
        <ol className="dd-list" id="ddddd">
          {items.map(function(company, idx) {
            return (
              <li className="dd-item" key={idx}>
                <div  className="dd3-content">
                    <strong>{company.company}</strong>
                <div name="dd" onClick={o.handleClick.bind(null, company)}>
                  <span >{company.name}</span>
                </div>
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

let Tree = React.createClass({
  mixins: [ScriptLoader],
  mixins: [Reflux.connect(CompanyStore)],
  getInitialState: function() {
    return {agentCompanys: []}
  },
  componentWillMount: function() {
    $.getJSON('api/Approve/treeview.json').then(function(data) {
      this.setState(data)
    }.bind(this))
  },
  componentDidMount: function() {
    ScriptLoader.loadScript('/vendor.ui.js').then(function() {
      //所有折叠列表默认折叠
      $('.dd').nestable('collapseAll');
      //动态设置list的高度
      changeMargin();
      //  画面改变监听
      window.onresize = function() {
        changeMargin();
      };
      function changeMargin() {
        var listDiv = $('#listDiv');
        // 先获取适合的高度
        listDiv.css("padding-bottom", "110%");
        var listDivHeight = listDiv.css('padding-bottom');
        // 再设置最大高度
        listDiv.css("max-height", listDivHeight);
        //最后把padding去掉
        listDiv.css("padding-bottom", "0%");
      }
    }.bind(this));
  },
  handleClick: function(value, event) {
    if (value == "add") {
      CompanyActions.addCompany();
    } else if (value == "search") {
      CompanyActions.searchCompany();
    }
  },
  render: function() {
    return (

      <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
        {/* 组件头部标题 */}
        <header>
          <span className="widget-icon">
            <i className="fa fa-table"/>
          </span>
          <h2>
            人员审批
          </h2>
        </header>

        {/* 组件内容 */}
        <div className="col-sm-12 col-lg-12">
          {/* 搜索框 */}
          <div className="form-inline">

            <div className="input-group pull-left">
              <span className="input-group-addon btn btn-primary " onClick={this.handleClick.bind(null, "search")}>
                <span className="fa fa-search"/>
              </span>
              <input type="text" className="form-control "/>
            </div>

          </div>
          {/* 空一行 */}
          <p></p>
          {/* 数据（嵌套结构） */}
          <SmartNestable group="1">
            <div id="listDiv" className="dd" style={{
              overflow: "auto",
              height: '511px'
            }}>
              {/* 显示列表 */}
              <Items  items={this.state.agentCompanys}/>
            </div>
          </SmartNestable>
        </div>
      </JarvisWidget>

    )
  }
});

export default Tree
