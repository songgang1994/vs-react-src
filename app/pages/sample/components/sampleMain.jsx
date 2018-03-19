import React from 'react'
import Reflux from 'reflux'
import {Dropdown, MenuItem, OverlayTrigger, Tooltip, ProgressBar} from 'react-bootstrap'
import {Link} from 'react-router'
import _ from 'lodash'

import sampleActions from './../actions/sampleActions'
import sampleStore from './../stores/sampleStore'


let sample = React.createClass({
    mixins: [Reflux.connect(sampleStore)],
    getInitialState: function () {
        return sampleStore.getData()
    },
    componentWillMount: function () {
        sampleActions.init();
    },

    render: function () {
        return (
            <div id="content">
                <div className="inbox-nav-bar no-content-padding">

                    <h1 className="page-title txt-color-blueDark hidden-tablet"><i className="fa fa-fw fa-inbox"/> Inbox
                    </h1>


                    <div className="inbox-checkbox-triggered">
                        <div className="btn-group">
                            <OverlayTrigger placement="bottom"
                                            overlay={<Tooltip id="mark0important-tooltip">Mark Important</Tooltip>}>
                                <a className="btn btn-default"><strong><i
                                    className="fa fa-exclamation fa-lg text-danger"/></strong></a>
                            </OverlayTrigger>

                            <OverlayTrigger placement="bottom"
                                            overlay={<Tooltip id="move-to-folder-tooltip">Move to folder</Tooltip>}>
                                <a className="btn btn-default"><strong><i className="fa fa-folder-open fa-lg"/></strong></a>
                            </OverlayTrigger>

                            <OverlayTrigger placement="bottom"
                                            overlay={<Tooltip id="delete-message-tooltip">Delete</Tooltip>}>
                                <a ng-click="deleteSelected()" className="deletebutton btn btn-default"><strong><i
                                    className="fa fa-trash-o fa-lg"/></strong></a>
                            </OverlayTrigger>
                        </div>
                    </div>

                    <a id="compose-mail-mini" className="btn btn-primary pull-right hidden-desktop visible-tablet">
                        <strong><i className="fa fa-file fa-lg"/></strong> </a>

                    <div className="btn-group pull-right inbox-paging">
                        <a className="btn btn-default btn-sm"><strong><i className="fa fa-chevron-left"/></strong></a>
                        <a className="btn btn-default btn-sm"><strong><i className="fa fa-chevron-right"/></strong></a>
                    </div>


                </div>

                <div id="inbox-content" className="inbox-body no-content-padding">

                    <div className="inbox-side-bar">
                        <Link to="/inbox/compose" id="compose-mail" className="btn btn-primary btn-block"><strong>Compose</strong></Link>




                    </div>

                    {this.props.children}

                </div>
            </div>
        )
    }
});

export default sample
