/**
 *平台管理员登录状态下 公司画面
 *Creat by chenfei 2017/11/10
 */
 // 导入React组件
import React from 'react'
// 导入共通组件
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'

// 导入控件
import CompanyDataTable from './CompanyDataTable.jsx'

let Company = React.createClass({

  render: function() {
    return (
      <div id="content">
        <WidgetGrid>
          <div className="col-sm-12 col-md-12 col-lg-12">
            {/* 调用共通组件 */}
            <CompanyDataTable></CompanyDataTable>
          </div>
        </WidgetGrid>
      </div>
    )
  }
});

export default Company
