/**
 * 访客信息画面用Store
 * Created by songgang on 10/26/17.
 */
import Reflux from 'reflux'
import VisitorFormActions from '../actions/VisitorFormActions.js'

let VisitorInfoStore = Reflux.createStore({
  listenables: VisitorFormActions,

  onGetVisitorInfoSuccess: function(result) {
    this.trigger(result);
  }

});

export default VisitorInfoStore
