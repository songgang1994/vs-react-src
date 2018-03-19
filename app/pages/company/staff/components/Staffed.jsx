/**
 * 员工画面一览画面
 * Created by ninglong on 2017/11/15.
 */
 // 导入React组件
import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
// ----------------------- 引用组件 ------------------------------ //
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import BatchImport from '../../../util/components/BatchImport.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
//引用的store
import StaffSettingDBStore from './../stores/StaffSettingDBStore'
import StaffedAction from './../actions/StaffedAction'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//消息参数
let config = window.SMARTADMIN_GLOBALS;
let StaffMsg = window.MSG_GLOBALS.StaffMsg;
// ----------------------- 引用自定义组件 ------------------------------ //
import StaffTable from './StaffTable.jsx'
let Staffed = React.createClass({
  render: function() {
    return (
      <div id="content">
      <StaffTable/>
      </div>
    )
  }
});

export default Staffed
