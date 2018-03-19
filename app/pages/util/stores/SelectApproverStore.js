/**
 * 选择审批人Store
 * Created by Xuwz on 2017/11/10
 */

import Reflux from 'reflux'

import SelectApproverAction from '../actions/SelectApproverAction'


let SelectApproverStore = Reflux.createStore({
    // 监听LoginAction的所有事件
    listenables: SelectApproverAction,

    // 当审批人成功返回时
    onSelectSuccess: function(result) {
        // 从服务器返回的ResultDto中获取审批人列表
        let selectapprover = result.listData;
        this.trigger({
          selectapprover: selectapprover.map((approver, index) => {
            return {staffId: approver.staffId, staffName: approver.staffName};
          })
        });
    }
});
export default SelectApproverStore
