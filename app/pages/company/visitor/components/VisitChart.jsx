import React from 'react'

import Reflux from 'reflux'

import BigBreadcrumbs from '../../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import FlotChart from '../../../../../components/graphs/flot/FlotChart.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'

let actions = Reflux.createActions({
    init: {asyncResult: true}
});
actions.init.listen(function () {
    $.getJSON('api/tables/tabledata.json').then(this.completed, this.failed)
});

// Update the store when the init action's promise is completed
let store1 = Reflux.createStore({
    listenables: actions,
    onInitCompleted: function (data) {
        this.trigger(data)
    }
});

let VisitHistTab = React.createClass({
    mixins: [Reflux.connect(store1)],

    componentWillMount: function () {
            actions.init()
        },

    componentDidMount: function () {
            this._exporeEventHander();
        },

    _exporeEventHander: function(){
      let me = this;
      $("#expore").click(function() {

    // _expore: function (JSONData) {
      let JSONData=me.state.data;
      var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
           var CSV = '';

           var row = "";
           for (var index in arrData[0]) {
               row += index + ',';
           }
           row = row.slice(0, -1);
           CSV += row + '\r\n';

           for (var i = 0; i < arrData.length; i++) {
               var row = "";
               for (var index in arrData[i]) {
                   var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
                   row += arrValue + ',';
               }
               row.slice(0, row.length - 1);
               CSV += row + '\r\n';
           }
           if (CSV == '') {
               growl.error("无效的数据");
               return;
           }
           var fileName = "data_csv";
           var blob = new Blob([('\ufeff'+ CSV)], { type: 'text/csv,charset=UTF-8'});
           var uri = URL.createObjectURL(blob);
          // var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
           //var uri = 'data:application/csv;charset=utf-8,\ufeff' + encodeURI(CSV);
           var link = document.createElement("a");
           link.href = uri;
           link.style = "visibility:hidden";
           link.download = fileName + ".csv";
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);

    });
},

    render: function () {

        return (
            // <div id="content">

                <div className="well well-sm well-light">

                  <form id="order-form" className="smart-form" noValidate="novalidate" >

                      <div className="row">
                         <article className="col col-2.9">
                             <label>统计开始日期 : </label>

                             <label className="input">
                                 <i className="icon-append fa fa-calendar"/>

                                 <UiDatepicker type="text"  name="startdate" id="startdate" minRestrict="#finishdate" placeholder="开始时间" data-date-format="yy/mm/dd" defaultValue="2017-09-02"/>
                             </label>
                         </article>

                         <article className="col col-3"></article>

                         <article className="col col-2.9">
                             <label>统计结束日期: </label>

                             <label className="input">
                                 <i className="icon-append fa fa-calendar"/>
                                 <UiDatepicker type="text" name="finishdate" id="finishdate" maxRestrict="#startdate" placeholder="结束时间" data-date-format="yy/mm/dd" defaultValue="2017-11-02"/>
                             </label>
                         </article>
                      </div>
                     <br></br><br></br>
                  </form>


                      <div className="row">
                          <article className="col-sm-12 col-md-12 col-lg-12">
                              <JarvisWidget className="well" colorbutton={false} sortable={true} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                                  <header>
                                      <span className="widget-icon"> <i className="fa fa-bar-chart-o"/> </span>
                                      <h2>日期—人数统计图</h2>
                                  </header>
                                  <div>
                                      <div className="widget-body no-padding" >
                                          <FlotChart data={this.state.visitChartData}
                                                     options={visitChartDemoOptions}/>
                                      </div>
                                  </div>
                              </JarvisWidget>
                           </article>
                       </div>

                           <JarvisWidget className="well"  colorbutton={false} sortable={true} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                               <header><span className="widget-icon"> <i className="fa fa-table"/> </span> <h2>统计一览</h2>
                                  <div className="widget-toolbar" >
                                  <button id="expore"  className="btn btn-success" >
                                        导出
                                    </button>
                                  </div>
                               </header>
                                   <div>
                                   <div className="widget-body no-padding">
                                       <Datatable
                                           useVsAjax={false}
                                           options={{
                                           ajax: 'api/tables/tabledata.json',
                                           aLengthMenu:[5],
                                           order: [[ 0, 'desc' ]],

                                           columns: [
                                             {data: "date",

                                             render: function(data) {
                                             return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
                                             }},
                                             {data: "inter_dep"},
                                             {data: "visit_reason",
                                             render: function(data) {
                                             return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
                                             }},
                                             {data: "visit_company"},
                                             {data: "plan_visit",
                                             render: function(data) {
                                             return '<div style="text-align:right;vertical-align:middel;">'+data+'</div>';
                                             }},
                                             {data: "visiting",
                                             render: function(data) {
                                             return '<div style="text-align:right;vertical-align:middel;">'+data+'</div>';
                                             }},
                                             {data: "no_visit",
                                             render: function(data) {
                                             return '<div style="text-align:right;vertical-align:middel;">'+data+'</div>';
                                             }},
                                             {data: "visited",
                                             render: function(data) {
                                             return '<div style="text-align:right;vertical-align:middel;">'+data+'</div>';
                                             }}
                                             ]
                                            }}
                                           className="display projects-table table table-striped table-bordered table-hover" style={{"textAlign":"left"}}
                                           width="100%">
                                               <thead>
                                                   <tr>
                                                       <th  rowSpan="2" className="text-center" width="10%">
                                                           日期
                                                       </th>
                                                       <th  rowSpan="2" className="text-center" width="15%">
                                                           受访部门
                                                       </th>
                                                       <th  rowSpan="2" className="text-center" >
                                                           来访事由
                                                       </th>
                                                       <th  rowSpan="2" className="text-center" width="40%">
                                                           来访公司
                                                       </th>
                                                       <th  colSpan="4" className="text-center" >
                                                           人数统计
                                                       </th>
                                                   </tr>
                                                   <tr>
                                                       <th  className="text-center" width="6%" >
                                                           计划访问
                                                       </th>
                                                       <th  className="text-center" width="6%">
                                                           访问中
                                                       </th>
                                                       <th  className="text-center" width="6%">
                                                           未访问
                                                       </th>
                                                       <th  className="text-center" width="6%">
                                                           已访问
                                                       </th>
                                                   </tr>
                                               </thead>
                                           </Datatable>
                                   </div>
                                   </div>
                           </JarvisWidget>

                      <hr className="simple"/>

                </div>

            // </div>
        )
    }
});

let colors = {
    "chartBorderColor": "#efefef",
    "chartGridColor": "#DDD",
    "charMain": "#E24913",
    "chartSecond": "#6595b4",
    "chartThird": "#FF9F01",
    "chartFourth": "#7e9d3a",
    "chartFifth": "#BD362F",
    "chartMono": "#000"
};

let visitChartDemoOptions = {
    series: {
        lines: {
            show: true
        },
        points: {
            show: true
        }
    },
    grid: {
        hoverable: true,
        clickable: true,
        tickColor: colors.chartBorderColor,
        borderWidth: 0,
        borderColor: colors.chartBorderColor
    },
    tooltip: true,
    tooltipOpts: {
        //content : "Value <b>$x</b> Value <span>$y</span>",
        defaultTheme: false
    },
    colors: [colors.chartSecond, colors.chartFourth],
    yaxis: {
        min: 0,
        max: 16,
        ticks : 8
    },
    xaxis: {
        labelAngle:-45,
        mode: "time" ,
        timeformat: "%Y/%m/%d",
        minTickSize:[1,"day"],
        min:new Date("2017-10-10"),
        max:new Date("2017-10-16"),
        tickLength :0
    }
};


export default VisitHistTab
