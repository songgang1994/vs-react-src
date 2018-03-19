/**
 *部门树形列表画面的Store
 * Created by lihui on 17/11/6.
 */

import Reflux from 'reflux'

import departAction from './../actions/DepartListAction'

let departListStore = Reflux.createStore({
  listenables: departAction,
  init: function() {
    this.data = {
      data: []
    }
  },
  onDepartListCompleted: function(result) {
    this.trigger(result);
  },
  getData: function() {
    return this.data
  }
});

export default departListStore
