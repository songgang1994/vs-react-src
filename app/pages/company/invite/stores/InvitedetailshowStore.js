/**
 *详细点击按钮存储inviteid的Store
 * Created by caowj on 2017/11/15.
 */
import Reflux from 'reflux'
import DetailActions from '../actions/InvitedetailAction.js'

let InvitedetailshowStore = Reflux.createStore({

    listenables: DetailActions,

    onGetIdCompleted:function(result){
      this.trigger(result);
    }

});
export default InvitedetailshowStore
