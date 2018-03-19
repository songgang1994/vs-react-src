/**
 * 邀请预约画面
 * Created by caowj on 2017/11/21.
 */
import React from 'react'

import _ from 'lodash'

import Reflux from 'reflux'

import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'

import Datatable from '../../../../../components/tables/Datatable.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import Timepicker from '../../../../../components/forms/inputs/Timepicker.jsx'
// import ExampleCalendar from '../../../../../components/calendar/components/ExampleCalendar.jsx'
import Reservation from '../../../company/invite/components/Reservation.jsx'
import Visitors from '../../../company/visitor/components/Visitors.jsx'
import SelectApprover from '../../../util/components/SelectApprover.jsx'

import InviteListStores from '../../../company/invite/stores/InviteListStores'
// import InviteListAction from '../../../company/invite/actions/InviteListAction'
import Calendar from '../../commons/components/Calendar.jsx'
import EventStore2 from '../../../../../components/calendar/stores/EventStore2'
import Commons from '../../commons/components/commons.jsx'

let InviteAppoint = React.createClass({
  mixins: [Reflux.connect(EventStore2)],
  getInitialState: function () {
      isEdit: false;
      return EventStore2._getData()
  },

    render: function(){
      return (
        <div id="content">
          <WidgetGrid>
             <div id="content">
                <WidgetGrid>
                    <div className="row" >
                      <Calendar events={this.state.events}/>
                    </div>
               </WidgetGrid>
           </div>
            <Commons/>
        </WidgetGrid>
      </div>
  )
}
});







export default InviteAppoint
