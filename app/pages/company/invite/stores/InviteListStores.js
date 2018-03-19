/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'
import InviteListAction from '../actions/InviteListAction.js'

let InviteListStore = Reflux.createStore({
    listenables: InviteListAction,
    init: function() {
        this.data = {
            loginName: ""
        }
    },
    // getMeetingId: function(result) {
    //     this.trigger({isEdit: result});
    // },
    // onIsShowVisitorInfo: function(result) {
    //     this.trigger({isEdit: result});
    // },
    onChangeDataTableInfo:function(result){
      this.trigger({inviteId: result});
    },
    getData: function(){
        return this.data
    }
});

export default InviteListStore
