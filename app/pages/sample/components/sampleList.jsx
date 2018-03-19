import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import {Link} from 'react-router'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import classnames from 'classnames'

import Moment from '../../../../components/utils/Moment.jsx'

import sampleActions from './../actions/sampleActions'
import sampleStore from './../stores/sampleStore'

let sampleList = React.createClass({
    mixins: [Reflux.connect(sampleStore)],
    getInitialState: function(){
        return sampleStore.getData()
    },

    render: function () {
      return (
        <div className="table-wrap custom-scroll">
            <table  className="table table-striped table-hover">
                <thead>
                  <tr>
                      <th></th>
                      <th data-class="expand">loginName</th>
                      <th>loginPassword</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.data.map(function (dat) {
                        return (
                            <tr key={dat.userId} id="msg1">
                                <td className="inbox-table-icon">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox"
                                                   className="checkbox style-2"/>
                                            <span/>
                                        </label>
                                    </div>
                                </td>
                                <td className="inbox-data-from hidden-xs hidden-sm">
                                    <Link to={'sample/upd/' + dat.userId}>
                                        <div>
                                            {dat.loginName}?
                                        </div>
                                    </Link>
                                </td>
                                <td className="inbox-data-message">
                                        <div>
                                            <span>
                                                {dat.loginPassword}
                                            </span>
                                        </div>
                                </td>
                            </tr>
                          )
                    }.bind(this)
                )}

                </tbody>
            </table>
          </div>
      )
    }
});

export default sampleList
