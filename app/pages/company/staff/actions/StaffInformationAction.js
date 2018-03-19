/**
 * 员工一览Action
 * Created by Xuwz on 2017/11/16
 */
//导入reflux插件
import Reflux from 'reflux'

//定义Action处理
let StaffInformationAction = Reflux.createActions({
    staff: {
        children: ['completed']
    },
});
//查询员工信息Action
StaffInformationAction.staff.listen(function(staffId) {
    $.VsAjax({
       url: "/staff/search/"+staffId,
       type: "GET",
       data:{
             staffId:staffId
       }
    }).done(this.completed);
});

export default StaffInformationAction
