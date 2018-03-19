/**
 * 公司管理员下 公司详细画面  主画面
 *Creat by chenfei 2017/11/3
 */

// 导入React组件
import React from 'react'
import Reflux from 'reflux'

// 导入共通组件
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'

// 导入公司详细组件
import CompanyDetail from './CompanyDetail.jsx'

// 导入Action和Store
import CompanyDetailAction from '../actions/CompanyDetailAction.js'
import CompanyDetailStore from '../stores/CompanyDetailStore.js'

let Company = React.createClass({
  mixins: [Reflux.connect(CompanyDetailStore)],

  getInitialState: function(){
      return {}
  },

  componentWillMount: function(){
  },

  //渲染
  render: function() {
    return (
      // 画面显示区域
      <div id="content">
        <div className="row" >
          <WidgetGrid>
            <div className="col-sm-12 col-md-12 col-lg-8  col-lg-offset-2 col-md-offset-2 ">
              {/* 显示公司详细 */}
              <CompanyDetail ></CompanyDetail>
            </div>
          </WidgetGrid>
        </div>
      </div>
    )
  }
});

export default Company
