import React from 'react'
import Reflux from 'reflux'
import {Dropdown, MenuItem, OverlayTrigger, Tooltip, ProgressBar} from 'react-bootstrap'
import {Link} from 'react-router'
import _ from 'lodash'
import SubHeader from '../../../layout/SubHeader.jsx'
import BigBreadcrumbs from '../../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import Tree from './Tree.jsx'
import EmployeeDetail from './EmployeeDetail.jsx'

import CompanyActions from '../actions/CompanyActions.js'
import CompanyStore from '../stores/CompanyStore.js'

let Approve = React.createClass({

  mixins: [Reflux.connect(CompanyStore)],
  getInitialState: function() {
    return {agentCompanys: []}
  },

  componentWillMount: function() {
    $.getJSON('api/Approve/treeview.json').then(function(data) {
      this.setState(data)
    }.bind(this))
  },

  render: function() {
    return (
      <div id="content">
        <div className="row">
          <WidgetGrid>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <Tree></Tree>
            </div>
            <div className="col-sm-8 col-md-8 col-lg-8">
              <EmployeeDetail></EmployeeDetail>
            </div>
          </WidgetGrid>
        </div>
      </div>
    )
  }
});

export default Approve
