import Reflux from 'reflux'
import UserActions from '../actions/UserActions'
import LoginAction from '../../../app/pages/util/actions/LoginAction'

let UserStore = Reflux.createStore({
    listenables: [LoginAction],
    init: function() {
        this.data = {
            userType: '',
            user: {}
        }
    },
    onLoginSucceed: function (data) {
        this.data = {
            userType: data.userType,
            user: data.user
        };
    },
    isAdmin: function() {
        return this.data.userType == 'admin';
    },
    isStaff: function() {
        return this.data.userType == 'staff';
    },
    getUserType: function() {
        return this.data.userType;
    },
    getUser: function() {
        return this.data.user;
    },
    getUserName: function() {
        return this.isAdmin() ? this.data.user.adminName : this.data.user.staffName;
    }
});

export default UserStore
