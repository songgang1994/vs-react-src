/**
 *部门树形列表画面的Store
 * Created by yao on 17/11/6.
 */

import Reflux from 'reflux'

import DepartTreeAction from '../actions/DepartTreeAction'

let DepartTreeStore = Reflux.createStore({
  listenables: DepartTreeAction,
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

export default DepartTreeStore
