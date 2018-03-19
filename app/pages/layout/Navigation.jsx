/**
 * Created by griga on 11/24/15.
 */

import React from 'react'

import SmartMenu from '../../../components/layout/navigation/components/SmartMenu.jsx'

import MinifyMenu from '../../../components/layout/actions/MinifyMenu.jsx'

import LoginInfo from '../../../components/user/components/LoginInfo.jsx'

import AsideChat from '../../../components/chat/components/AsideChat.jsx'

let Navigation = React.createClass({
    getInitialState: function() {
        return {
            rawItems: null
        }
    },
    componentWillMount() {
        let UserTypeMap = {
            "agent": "-agent",
            "company-admin": "-company-admin",
            "company-depart-leader": "-company-depart-leader",
            "company-receptionist": "-company-receptionist",
            "company-staff": "-company-staff",
            "platform-admin": "-platform-admin",
            "company-admin0": "-company-admin0",
            "company-depart-leader0": "-company-depart-leader0",
            "company-staff0": "-company-staff0",
            "company-receptionist0": "-company-receptionist0",
            get: function(key) {
                return this[key] || ('-' + key) || '';
            }
        }

        let userType = localStorage.getItem('userType');
        this.state.rawItems = require('json!../../config/menu-items' + UserTypeMap.get(userType) + '.json').items;
    },

    render: function () {
        return (
            <aside id="left-panel">
                <LoginInfo />
                <nav>
                    <SmartMenu rawItems={this.state.rawItems} />
                    {/* <AsideChat /> */}
                </nav>
                <MinifyMenu />
            </aside>
        )
    }
});


export default Navigation
