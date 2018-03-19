/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'

let InboxActions = Reflux.createActions({
    init: {asyncResult: true},
});

InboxActions.init.listen(function () {
    $.getJSON('api/inbox/inbox.json')
        .then(this.completed, this.failed)

        // $.getJSON('http://10.30.100.54:8088/vs-api/util/login/init')
        //     .then(this.completed, this.failed)
});


export default InboxActions
