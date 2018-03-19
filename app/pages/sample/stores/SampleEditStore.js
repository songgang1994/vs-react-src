/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'

import SampleActions from './../actions/SampleActions'

let SampleEditStore = Reflux.createStore({
    listenables: SampleActions,
    init: function() {
        this.data = {}
    },
    onEditCompleted: function(result) {
        if (result.code == 0) {
            this.trigger({user: result.data});
        }
    },
    onEditFailed: function(err) {
        console.log(err);
    }
});

export default SampleEditStore
