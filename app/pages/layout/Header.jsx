/**
 * Created by griga on 11/17/15.
 */

import React from 'react'
import Reflux from 'reflux'

import FullScreen from '../../../components/layout/actions/FullScreen.jsx'
import ToggleMenu from '../../../components/layout/actions/ToggleMenu.jsx'
import SpeechButton from '../../../components/layout/actions/SpeechButton.jsx'
import SearchMobile from '../../../components/layout/actions/SearchMobile.jsx'

import DeviceDetect from '../../../components/layout/tools/DeviceDetect.jsx'
import ActivitiesDropdown from '../../../components/activities/ActivitiesDropdown.jsx'
import LanguageSelector from '../../../components/i18n/LanguageSelector.jsx'

import RecentProjects from './header/RecentProjects.jsx'

import LoginAction from '../util/actions/LoginAction'
import LogoutStore from '../util/stores/LogoutStore'

let config = window.SMARTADMIN_GLOBALS;

let Header = React.createClass({
    getInitialState() {
        return {
            userType: localStorage.getItem('userType'),
            user: JSON.parse(localStorage.getItem('user')),
            name: localStorage.getItem('name')
        }
    },
    isShowLoginUserName:function()
    {
       return config.isMobile?"":localStorage.getItem('name')
    },
    componentDidMount: function() {
        this.unsubscribe = LogoutStore.listen(this._onLogoutSuccess);
        this._registerEventHandler();
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    _registerEventHandler: function() {
        $("#a-logout").click(function() {
            LoginAction.logout();
            return false;
        });
    },
    _onLogoutSuccess: function() {
      // 退出后，删除localStorage中的登录信息
      localStorage.removeItem('loginName');
      localStorage.removeItem('keepLogin');
      localStorage.removeItem('user');
      localStorage.removeItem('name');
      // 跳转回登录画面
      let userType = localStorage.getItem('userType')
      localStorage.removeItem('userType')
      if (userType[userType.length - 1] == '0') {
        location.href = "/#/login0";
      } else {
        location.href = "/#/login";
      }
    },
    render: function () {
        return <header id="header">
            <div id="logo-group">
                <span id="logo">
                    <img src="styles/img/logo.png" // place your logo here
                         alt="Face360 访客系统"/>
                </span>
                {/* Note: The activity badge color changes when clicked and resets the number to 0
                 Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications */}

                {/* <ActivitiesDropdown url={'api/activities/activities.json'} /> */}
            </div>

            {/* <RecentProjects /> */}
            <div className="pull-right"  /*pulled right: nav area*/ >


                <ToggleMenu className="btn-header pull-right" />


                {/* #MOBILE */}
                {/*  Top menu profile link : this shows only when top menu is active */}
                <ul id="mobile-profile-img" className="header-dropdown-list hidden-xs padding-5">
                    <li className="">
                        {/* <a href-void className="dropdown-toggle no-margin userdropdown" data-toggle="dropdown">

                            <img src="styles/img/avatars/sunny.png" alt={this.state.name} className="online"/>
                        </a> */}

                        <ul className="dropdown-menu pull-right">
                            {/* <li>
                                <a href-void className="padding-10 padding-top-0 padding-bottom-0"><i
                                    className="fa fa-cog"/> Setting</a>
                            </li>
                            <li className="divider"/>
                            <li>
                                <a href="#/views/profile"
                                   className="padding-10 padding-top-0 padding-bottom-0"> <i className="fa fa-user"/>
                                    <u>P</u>rofile</a>
                            </li>
                            <li className="divider"/>
                            <li>
                                <a href-void className="padding-10 padding-top-0 padding-bottom-0"
                                   data-action="toggleShortcut"><i className="fa fa-arrow-down"/> <u>S</u>hortcut</a>
                            </li>
                            <li className="divider"/>
                            <li>
                                <a href-void className="padding-10 padding-top-0 padding-bottom-0"
                                   data-action="launchFullscreen"><i className="fa fa-arrows-alt"/>全屏</a>
                            </li> */}
                            <li className="divider"/>
                            <li>
                                <a className="padding-10 padding-top-5 padding-bottom-5"
                                   ><i
                                    className="fa fa-sign-out fa-lg"/> <strong>退出</strong></a>
                            </li>
                        </ul>
                    </li>
                </ul>

                {/* logout button */}
                <div className="btn-header transparent pull-right">
                    <span> <a id="a-logout" title="退出"><i
                        className="fa fa-sign-out"/>
                        <span className="hidden-sm hidden-xs">{this.isShowLoginUserName()}</span>
                        </a> </span>
                </div>

                {/* search mobile button (this is hidden till mobile view port) */}
                {/* <SearchMobile className="btn-header transparent pull-right"/> */}


                {/* input: search field */}
                {/* <form action="#/misc/search.html" className="header-search pull-right">
                    <input id="search-fld" type="text" name="param" placeholder="Find reports and more"
                           data-autocomplete='[
					"ActionScript",
					"AppleScript",
					"Asp",
					"BASIC",
					"C",
					"C++",
					"Clojure",
					"COBOL",
					"ColdFusion",
					"Erlang",
					"Fortran",
					"Groovy",
					"Haskell",
					"Java",
					"JavaScript",
					"Lisp",
					"Perl",
					"PHP",
					"Python",
					"Ruby",
					"Scala",
					"Scheme"]'/>
                    <button type="submit">
                        <i className="fa fa-search"/>
                    </button>
                    <a href="$" id="cancel-search-js" title="Cancel Search"><i className="fa fa-times"/></a>
                </form> */}


                {/* <SpeechButton className="btn-header transparent pull-right hidden-sm hidden-xs" /> */}

                <FullScreen className="btn-header transparent pull-right" />


                {/* multiple lang dropdown : find all flags in the flags page */}
                <LanguageSelector />


            </div>
            {/* end pulled right: nav area */}

            <DeviceDetect />


        </header>
    }
});


export default Header
