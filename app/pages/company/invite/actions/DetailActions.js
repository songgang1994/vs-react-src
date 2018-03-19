/**
 * Created by chenfei on 10/26/17.
 */

import Reflux from 'reflux'

let DetailActions = Reflux.createActions({
    init: {asyncResult: true},
    getId: {}
});

// DetailActions.init.listen(function () {
//     $.getJSON('api/companys.json').then(function(data){
//         this.setState(data)
//     }.bind(this))
//
// });

DetailActions.getId.listen(function (id) {

});


export default DetailActions
