/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'

import sampleActions from './../actions/sampleActions'

let sampleStore = Reflux.createStore({
    listenables: sampleActions,
    init: function(){
        this.data = {
            data: []
        }
    },
    onInitCompleted: function(data){
        this.data = data
        this.trigger(this.data)
    },
    getData: function(){
        return this.data
    }
});


export default sampleStore
