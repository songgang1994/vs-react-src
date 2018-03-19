import React from 'react'
import _ from 'lodash'

// ----------------------- 引用组件 ------------------------------ //
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'

// ----------------------- 引用Action --------------------- //
import CompanyActions from '../actions/CompanyActions.js'

let CompanyList = React.createClass({
  // 初始化函数执行顺序依次为
  //  1. getInitialState
  //  2. componentWillMount
  //  3. render
  //  4. componentDidMount
  // 其他自定义函数前面统一加_

  // 画面渲染之后执行
  componentDidMount: function() {
    this._dataTableEventHandler();
  },

  _dataTableEventHandler: function() {
      $('#CompanyList').on("click", "tr", function() {
        var table = $('#CompanyList').DataTable();
        //获取选中tr
        var tr = $(this).closest('tr');
        var company = table.row(tr).data();
        CompanyActions.chooseCompany(company);

        $(this).css('background-color',"#FFFFE0")
        $('#CompanyList tr').not(this).css('background-color',"")
      });
  },
  handleClick: function(value,event){
      if(value == "add"){
        CompanyActions.addCompany();
      }else if(value == "search"){
        CompanyActions.searchCompany();
      }
  },
  //画面渲染
  render: function() {
    let options = {
      ajax: 'api/company.json',
      columns: [
       {
          data: "agent"
        }, {
          data: "companyName"
        }, {
          data: "flag",
          render: function(data){
              switch(data){
                case "1":
                    return(
                      '<div style="text-align:center"><span class="label label-warning">临时</span></div>'
                    )
                case "2":
                    return (
                      '<div style="text-align:center"><span class="label  label-success">通过</span></div>'
                    )
                case "3":
                    return (
                      '<div style="text-align:center"><span class="label  label-danger">未通过 </span></div>'
                    )
                case "4":
                    return (
                      '<div style="text-align:center"><span class="label  label-default">失效 </span></div>'
                    )
                case "5":
                    return (
                      '<div style="text-align:center"><span class="label  label-primary">未审核 </span></div>'
                    )
              }
          }
        }
      ],
      aLengthMenu: [15],
      "order": [
        [2, 'asc']
      ]
    };

    return (
      <JarvisWidget className="well" editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false} fullscreenbutton={false} sortable={false}>
        <header>
          <span className="widget-icon">
            <i className="fa fa-table"/>
          </span>
          <h2>用户公司
          </h2>
          <div className="widget-toolbar">
            <a href-void className="btn-primary"  onClick={this.handleClick.bind(null,"add")} name="uuser" style={{
              padding: "5px 50px 5px"
            }}>新增</a>
          </div>
        </header>
        <div>
          <div className="widget-body no-padding" style={{
            height: '810px'
          }}>
            <Datatable useVsAjax={false} id="CompanyList" filter={true} autoWidth={true} options={options} className="display projects-table table table-striped table-bordered table-hover " width="100%">
              <thead >
                <tr>
                  <th data-class="expand" style={{
                    "textAlign": "center",
                    width: "30%"
                  }}>上级代理</th>
                  <th style={{
                    "textAlign": "center",
                    width: "30%"
                  }}>公司名</th>
                  <th style={{
                    "textAlign": "center",
                    width: "10%"
                  }}>状态</th>
                </tr>
              </thead>
            </Datatable>
          </div>
        </div>
      </JarvisWidget>
    )
  }
});
export default CompanyList
