/**
 * 部门主画面
 * Created by lihui on 2017/11/2.
 */

// 导入React组件
import React from 'react'

// ----------------------- 引用组件 ------------------------------ //
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'

// ----------------------- 引用自定义组件 ------------------------------ //
import DepartStaffList from './DepartStaffList.jsx'
import DepartList from './DepartList.jsx'
import StaffTable from './../../staff/components/StaffTable.jsx'
import DepartIdStore from './../stores/DepartIdStore'

let Depart = React.createClass({
  getInitialState: function() {
    return {departId: ""}
  },

  componentDidMount: function() {
    //监听departId获取事件，当departId变更时，执行_onDepartIdDone()
    this.unsubscribeDepartId = DepartIdStore.listen(this._onDepartIdDone);

  },

  componentWillUnmount: function() {
    // 1. 解除对departId获取事件的监听
    this.unsubscribeDepartId();
  },

  _onDepartIdDone: function(result) {
    //将获取到的departId存入state里
    this.setState(result)
  },

  //画面渲染
  render: function() {
    return (
      <div id="content">
        {/* WidgetGrid start：整体页面布局设置 */}
        <WidgetGrid>
          <div className="row">
            {/* 树形列表 */}
            <div className="col-sm-3">
              <DepartList/>
            </div>
            {/* 列表画面 */}
            <div className="col-sm-9">
              {/* 列表画面自定义组件调用 */}
              <StaffTable departId={this.state.departId}/>
            </div>
          </div>
        </WidgetGrid>
      </div>
    )
  }
});
export default Depart
