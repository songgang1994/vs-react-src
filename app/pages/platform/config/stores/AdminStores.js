/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'
import AdminAction from '../actions/AdminAction.js'

let AdminStores = Reflux.createStore({
    listenables: AdminAction,
    init: function() {
        this.data = {
            loginName: ""
        }
    },
      onChooseAdmin: function(result) {
      //alert(result)
        // 当选择公司时，刷新公司详细信息
        this.trigger({
          company: result,
          isAdd:false,
          firstIn:false,
          updatepwd:false
        });
    },
    onAddAdmin:function(){
      //alert("store")
      this.trigger({
        company:"",
        isAdd:true,
        firstIn:false,
        updatepwd:false
      }
      );
    },
    onShowpwd:function(){
      //alert("store")
      this.trigger({
        updatePwd:false
      }
      );
    }
});

export default AdminStores
