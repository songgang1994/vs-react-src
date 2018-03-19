import React from 'react'
import Reflux from 'reflux'
import UserStore from '../stores/UserStore'
import ToggleShortcut from './ToggleShortcut.jsx'


let LoginInfo = React.createClass({
    // mixins: [Reflux.connect(UserStore)],
    getInitialState() {
        return {
            isAdmin: localStorage.getItem('isAdmin') == 'true',
            isStaff: localStorage.getItem('isStaff') == 'true',
            userType: localStorage.getItem('userType'),
            user: JSON.parse(localStorage.getItem('user')),
            name: localStorage.getItem('name'),
            picture: ''
        }
    },
    componentWillMount: function () {
		    UserStore.listen(function (data) {

        }.bind(this))
    },
	render: function(){
		return (

			<div className="login-info">
			    <span>
			        <ToggleShortcut>
			            {/* <img src={this.state.picture} alt="me" className="online" /> */}
                  <span>{this.state.name}</span>
               <i className="fa fa-angle-down" />
             </ToggleShortcut>
			     </span>
			</div>
		)
	}
});

export default LoginInfo
