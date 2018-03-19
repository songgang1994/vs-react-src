/*
 * 存储服务器返回会议室数据
 * Created by yao on 17/11/06
 */
 import Reflux from 'reflux'

 import SettingAction from '../actions/SettingAction'

 let MeetingRoomStore = Reflux.createStore({
   //监听SettingAction所有事件
   listenables: SettingAction,

   //成功返回设置信息
   onGetRoomsCompleted:function(result){
     // 从服务器返回的ResultDto中获取会议室列表
     let meetingRooms = result.listData;
     //trigger会导致jsx中_onGetRoomsDone事件执行，事件参数即为此处trigger参数
     this.trigger(meetingRooms);
   }
 });

 export default MeetingRoomStore
