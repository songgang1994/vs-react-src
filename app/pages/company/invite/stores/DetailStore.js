/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'
import DetailActions from '../actions/DetailActions.js'

let DetailStore = Reflux.createStore({

    listenables: DetailActions,
    init: function() {
        this.data = {
            data: []
        }
    },
    // onGetId:function(result){
    //   this.trigger({record:result});
    // }
    getData: function(){
        return this.data
    },
    onGetId:function(result){
      this.trigger({id:result});
      // this.trigger({
      //   isAdd:true
      // }
      // );
    }


});

export default DetailStore
