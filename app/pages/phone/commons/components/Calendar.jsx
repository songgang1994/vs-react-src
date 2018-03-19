import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'

import {DropdownButton, MenuItem} from 'react-bootstrap'

import EventStore from  '../../../../../components/calendar/stores/EventStore'
import EventActions from '../../../../../components/calendar/actions/EventActions'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'


let Calendar = React.createClass({

    componentDidMount: function () {
        let me = this;
        let self = this;
        let $calendar = $(this.refs.smartCalendar);
        let calendar = $calendar.fullCalendar({
            // lang: 'zh-cn',
            editable: false,
            draggable: false,
            selectable: true,
            selectHelper: true,
            unselectAuto: false,
            disableResizing: true,
            droppable: false,
            // defaultView: "agendaWeek",
             defaultView: "agendaDay",
            aspectRatio: 1.5,
            allDaySlot:false,
            minTime:"09:00:00",
            maxTime:"18:30:00",
            axisFormat: 'H:mm',


            // header: {
            //     // left: 'title', //,today
            //     center: 'prev, next, today',
            //     right: 'month, agendaWeek, agendaDay' //month, agendaDay,
            // },


            select: function (start, end) {
                // document.getElementById("meetingId").value = "";
                // document.getElementById("inviteId").value = "";

                document.getElementById("detail").style.display = 'none';
                  // this.state.isEdit=false;
                calendar.fullCalendar('unselect');
            },
            // events: scope.events,

            events: function (start, end, timezone, callback) {
              // console.log(this.props.events);

                // document.getElementById("detail").style = 'none';
                callback(this.props.events);

            }.bind(this),

            eventClick: function(event) {
              // this.state.isDisplay=true;
              //   document.getElementById("meetingId").value = event._id;
                document.getElementById("detail").style.display = 'block';

            },


            eventRender: function (event, element) {
                if (!event.description == "") {
                    if(!event.room == ""){
                        element.find('.fc-event-time').append("<span class='ultra-light'>&nbsp;&nbsp;" + event.room + "</span>");
                        element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
                    }
                }else{
                    if(!event.room == ""){
                        element.find('.fc-event-time').append("<span class='ultra-light'>" + event.room + "</span><br/>");
                    }
                }
            },

        });
        $('.fc-header-right, .fc-header-center', $calendar).hide();
    },
    componentWillReceiveProps:function(){
        if(!this.props.calisload){
            $(this.refs.smartCalendar).fullCalendar('render');
            // this.state.calisload = true;
        };
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
        $('.fc-button-today', this.refs.smartCalendar).click();
    },
    render: function () {
        return (
        <div id="content">
          <div>
            <JarvisWidget editbutton={false} colorbutton={false} togglebutton={false} deletebutton={false}
                             sortable={false}>
                {/* <header>
                  <span className="widget-icon"> <i className="fa fa-calendar"/> </span>

                  <h2>日程事件</h2>

                  <div className="widget-toolbar">

                  </div>

                </header> */}

                {/* widget div*/}
                <div className="col-md-8"  >
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


                        <div id="calendar" ref="smartCalendar">
                        <input type="hidden" name="id" id="eventId"/>


                        </div>

                        {/* end content */}
                    </div>

                </div>
                {/* end widget div */}
            </JarvisWidget>
          </div>
        </div>
          )
    }
});


export default Calendar
