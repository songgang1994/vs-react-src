import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'

import {DropdownButton, MenuItem} from 'react-bootstrap'

import EventStore from '../stores/EventStore'
import EventActions from '../actions/EventActions'

import JarvisWidget from '../../layout/widgets/JarvisWidget.jsx'

let SelectCalenderWidget = React.createClass({
    //mixins: [Reflux.connect(EventStore)],
    //getInitialState: function () {
    //    return EventStore._getData()
    //},
    componentDidMount: function () {
        let self = this;
        let $calendar = $(this.refs.smartCalendar);
        let calendar = $calendar.fullCalendar({
            lang: 'en',
            editable: false,
            draggable: false,
            selectable: true,
            selectHelper: false,
            unselectAuto: false,
            disableResizing: false,
            droppable: true,

            header: {
                left: 'title', //,today
                center: 'prev, next, today',
                right: null
                //'month, agendaWeek, agendaDay' //month, agendaDay,
            },

            //select: function (date) {
            //  callback(this.state.date);
          //  }.bind(this),

            //select: function (start, end, allDay) {
            //    var title = prompt('Event Title:');
            //    if (title) {
            //        calendar.fullCalendar('renderEvent', {
            //                title: title,
            //                start: start,
            //                end: end,
            //                allDay: allDay
            //            }, true // make the event "stick"
            //        );
            //    }
            //    calendar.fullCalendar('unselect');
            //},

            // events: scope.events,

            // events: function (start, end, timezone, callback) {
            //
            //     callback(this.state.events);
            //
            // }.bind(this),
            dayClick:function(date){
                var clickDate = date.format();
                self.props.rtnInfo(clickDate);
                return clickDate;
            },
            eventRender: function (event, element, icon) {
                if (!event.description == "") {
                    element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
                }
                if (!event.icon == "") {
                    element.find('.fc-event-title').append("<i class='air air-top-right fa " + event.icon + " '></i>");
                }
            }
        });

        $('.fc-header-right, .fc-header-center', $calendar).hide();
    },

    unselect:function(){
        $(this.refs.smartCalendar).fullCalendar('unselect');
    },
    _changeView: function (period) {
        $(this.refs.smartCalendar).fullCalendar('changeView', period);
    },
    _next: function () {
        $('.fc-button-next', this.refs.smartCalendar).click();
    },
    _prev: function () {
        $('.fc-button-prev', this.refs.smartCalendar).click();
    },
    _today: function () {
        let me = this;
        $('.fc-button-today', this.refs.smartCalendar).click();
        let nowdate = new Date();
        let now = nowdate.getFullYear()+"-"+(nowdate.getMonth()+1)+"-"+nowdate.getDate();
        me.props.rtnInfo(now);
        return now;

    },
    render: function () {
        return (
            <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                {/* <header>
                    <span className="widget-icon"> <i className="fa fa-calendar"/> </span>

                    <h2>日程选择</h2>


                </header> */}

                {/* widget div*/}
                <div>
                    <div className="widget-body no-padding">
                        {/* content goes here */}
                        <div className="widget-body-toolbar">

                            <div id="calendar-buttons">

                                <div className="btn-group">
                                    <a onClick={this._prev} className="btn btn-default btn-xs"><i
                                        className="fa fa-chevron-left"/></a>
                                    <a onClick={this._today} className="btn btn-default btn-xs">
                                      <strong>今天</strong></a>
                                    <a onClick={this._next} className="btn btn-default btn-xs"><i
                                        className="fa fa-chevron-right"/></a>
                                </div>
                            </div>
                        </div>


                        <div id="calendar" ref="smartCalendar"/>

                        {/* end content */}
                    </div>

                </div>
                {/* end widget div */}
            </JarvisWidget>        )
    }
});

export default SelectCalenderWidget
