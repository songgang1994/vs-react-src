/**
 * Created by griga on 11/30/15.
 */

import React from 'react'

import WidgetGrid from '../../../components/layout/widgets/WidgetGrid.jsx'

import FullCalendarWidget from '../../../components/calendar/components/FullCalendarWidget.jsx'
import SelectCalendarWidget from '../../../components/calendar/components/SelectCalenderWidget.jsx'



let SampleCal = React.createClass({
    render: function () {
        return (
            <div id="content">

                <WidgetGrid>

                    <div className="row">

                        <article className="col-sm-12 col-md-12 col-lg-6">

                            <SelectCalendarWidget />

                        </article>

                    </div>
                </WidgetGrid>
            </div>
        )
    }
});

export default SampleCal

