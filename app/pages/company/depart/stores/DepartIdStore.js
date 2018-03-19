/**
 *树形列表，节点点击存储departId的Store
 * Created by lihui on 17/11/6.
 */
import Reflux from 'reflux'


let departIdStore = Reflux.createStore({
    SetDepartId:function(departId){
      this.trigger({departId:departId});
    }
});


export default departIdStore
