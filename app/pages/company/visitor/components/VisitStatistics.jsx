/**
 * 来访统计主画面
 * Created by nicheng on 17/11/6.
 */

// 导入React组件
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import Tagsinput from '../../../../../components/forms/inputs/Tagsinput.jsx'
import SelectCalenderWidget from '../../../../../components/calendar/components/SelectCalenderWidget.jsx'
import UiTabs from '../../../../../components/ui/UiTabs.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import VisitStatisticsAction from './../actions/VisitStatisticsAction.js'
import VisitorTypeStore from './../stores/VisitorTypeStore.js'

let VisitStatistics = React.createClass({
  //画面初始state生成
  getInitialState: function() {
    //获取当前时间
    let nowdate = new Date();
    //字符串拼接当前时间:年月日
    let now = nowdate.getFullYear()+"-"+(nowdate.getMonth()+1)+"-"+nowdate.getDate();
    //获取登录人员类型
    let userType = localStorage.getItem('userType');
    let companyId = JSON.parse(localStorage.getItem('user')).companyId;
    let departId = JSON.parse(localStorage.getItem('user')).departId;
    let staffId = JSON.parse(localStorage.getItem('user')).staffId;
    return {
      //初始化参数对象
      invitevisitor: {
        //公司id
        companyId: companyId,
        //部门id
        departId: departId,
        //员工id
        staffId: staffId,
        //登录用户类型
        userType: userType,
        //预约时间
        inviteDate: now,
        //来访人类型
        visitorType: "0,1"
      },
      //同inviteTypeStr，类型是数组（方便插值和去值）
      visitorTypeList: [0,1],
      VisitorTypeObj:{},

    }
  },
  // 画面渲染之后
  componentDidMount: function() {
    //获取审核状态的store监听，触发回调
    this._registerEventHandler();
    this.unsubscribeLabDone = VisitorTypeStore.listen(this._onVisitorType);
    VisitStatisticsAction.getVisitorType(this.state.invitevisitor);

  },

  componentWillUnmount: function() {
      //解除对审核状态的获取事件的监听
      this.unsubscribeLabDone();
  },
  // 注册画面控件事件处理
  // 事件统一通过jQuery绑定
  // 代替HTML标签中写onXXX={this.XXX}
  _registerEventHandler: function() {
    let me = this;
    let nextId = 1;
    let $tabs = $("#tabs").tabs();
    let $tab_template = $("#tab-template");
    //新增tab页
    $("#btn-stastic-graph").click(function() {
      //tab页id
      let newId = 'tab-' + nextId++;
      //获取tab页标题控件
      var $ul = $tabs.find( "ul.tab-title" );
      //生成标题页
      var $sp = $("<span class='ui-icon ui-icon-close'/>");
      var $li = $( "<li><a href='#" + newId + "'>来访统计图表</a></li>" );
      $li.append($sp).appendTo( $ul );

      // $tab_template.clone().find("#tab_template").attr("id", "tab_" + newId).show().wrap("<div id='" + newId + "' />").appendTo( $tabs );
      let $div = $("<div id='" + newId + "'/>").css({
        width: "100%",
        height: "1px"
      });
      $div.appendTo($tabs);
      //设置iframe控件属性（设置tab页content）
      $("<iframe/>").attr({
        "src": '/#/visitor/statis',
        "frameborder": '0',
        "width": '100%',
        "height": '100%',
        "scrolling":'no'
      }).appendTo($div).load(function(){
        var mainheight = $(this).contents().find("body").height() + 10;
        $div.height(mainheight);
        $li.find("a").click();
      });

      $tabs.tabs( "refresh" );
      //关闭当前tab页
      $sp.click(function() {
        var key = $(this).prev().attr("href");
        $(key).remove();
        $(this).parent().remove();
        $tabs.tabs( "refresh" );
      })
    });

    //checkbox按钮的点击事件（筛选临时访客和邀请访客）
    $("label[name='labels']").click(function() {
      //checkbox选中的情况
      if($(this).find("input")[0].checked==true){
        //移除未选中样式
        $(this).removeClass("btn btn-default");
        //添加选中样式
        $(this).addClass("btn btn-primary");
        //取label的value
        let it=$(this)[0].getAttribute("value");
        me.state.visitorTypeList.push(it);
        //数组的排序
        me.state.visitorTypeList.sort();
        //数组字符串化
        let str=me.state.visitorTypeList.toString();
        me.state.invitevisitor.visitorType=str;
        VisitStatisticsAction.getVisit();
      //checkbox未选中的情况
      } else {
        //移除选中样式
        $(this).removeClass("btn-primary");
        //添加未选中样式
        $(this).addClass("btn-default");
        //取label的value(获取事由类型)
        let it=$(this)[0].getAttribute("value");
        let ivlist=[];
        let iv=me.state.visitorTypeList;
        //移除该label value值
        for(let i=0;i<iv.length;i++){
          if(iv[i]!=it){
            ivlist.push(iv[i]);
           }
        }
        me.state.visitorTypeList=ivlist;
        //数组的排序
        me.state.visitorTypeList.sort();
        let str=me.state.visitorTypeList.toString();
        me.state.invitevisitor.visitorType=str;
        VisitStatisticsAction.getVisit();
       }
     });

     $("#exports").click(function() {
   // _expore: function (JSONData) {

     let JSONData = $('#VisitTable').DataTable().data();
     //let JSONData=me.state.data;
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

  _onVisitorType:function(data){

    let VisitorTypeObj=data;
    this.setState({"VisitorTypeObj":VisitorTypeObj});

  },

  //获取datatable的api
  _getApi: (dtapi) => {
    VisitStatisticsAction.visitViewInited(dtapi);
  },
  //获取datatable的api
  _onAjaxDidReceive: (e, settings, json, xhr) => {

    //返回的列表对象赋给datatable显示
    json.data = json.listData.map((visitInvite) => {
    return {
      visitorImg:visitInvite['visitorImg'],
      departName: visitInvite['departName'],
      staffName: visitInvite['staffName'],
      companyName: visitInvite['companyName'],
      visitorName: visitInvite['visitorName'],
      visitorCellphone: visitInvite['visitorCellphone'],
      inviteType: visitInvite['inviteType'],
      timeSection: visitInvite['timeSection'],
      state: visitInvite['state']};
    })

  },

  //获取子组件（日历）传来的日期值
  _rtnInfo:function(result){
    this.state.invitevisitor.inviteDate=result;
    VisitStatisticsAction.getVisit();
    VisitStatisticsAction.getVisitorType(this.state.invitevisitor);
  },

  render: function() {
    console.log(this.state.VisitorTypeObj.tempvisitorcount);
    let me =this;
    //datatable内容居中样式
    let styleTable = {
      textAlign:"center",
      verticalAlign:"middel"
    };
    //列表参数
    let options = {
    //  ajax: '/visitorInvite/list',
    //发送请求
      ajax: {
        url: '/visitorInvite/list/',
        type: 'POST',
        contentType: 'application/json',
        data: function(data) {
          return _.extend(data, me.state.invitevisitor)
        }
      },
      // data:this.data,
      columns: [
        {
          //来访人头像
          data: "visitorImg",
          render: function(data) {
            let data3 = (data == null
              ? ''
              : data)
            return '<div>' + data3 + '</div>';
          }
        },{
          //来访人
          data: "visitorName"
        },{
          //来访人电话
          data: "visitorCellphone",
          render: function(data) {
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }, {
          //事由
          data: "inviteType",
          render: function(data) {
            if (data == 0) {
              data = "面试"
            } else if (data == 1) {
              data = "商务"
            } else if (data == 2) {
              data = "私人"
            } else {
              data = "其他"
            }
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }, {
          //受访人部门
          data: "departName"
        }, {
          //受访人
          data: "staffName"
        }, {
          //来访公司名
          data: "companyName",
          render: function(data) {
            let data1 = (data == null
              ? ''
              : data)
            return '<div>' + data1 + '</div>';
          }
        }, {
          //预约时间
          data: "timeSection",
          render: function(data) {
            let data2 = (data == null
              ? ''
              : data)
            return '<div style="text-align:center;vertical-align:middel;">' + data2 + '</div>';
          }
        }, {
          //访问状态
          data: "state",
          render: function(data) {
            if (data == 0) {
              data = "未访问"
            } else if (data == 1) {
              data = "访问中"
            } else {
              data = "已访问"
            }
            return '<div style="text-align:center;vertical-align:middel;">' + data + '</div>';
          }
        }
      ],
      //分页:每页最大数组显示
      aLengthMenu: [5],
      //排序
      "order":[[1,'asc']]
    }

    return (
      <div id="content">
        <UiTabs id="tabs" >
          <ul className="tab-title">
            <li>
              <a href="#tab-0">来访统计</a>
            </li>
          </ul>

          <div id="tab-0">
            <WidgetGrid>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-2">
                  <article>
                    <SelectCalenderWidget ref="clear" rtnInfo={this._rtnInfo}/>
                  </article>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-10">
                  <fieldset>
                    <div className="form-group">
                        <div className="btn-group" data-toggle="buttons">
                          <label id="person" name="labels" className="btn btn-primary " value={"1"} >
                            <input type="checkbox" id="temporaryCheckbox" value="临时访客"/>
                            临时访客({this.state.VisitorTypeObj.tempvisitorcount})
                          </label>
                          <label id="others" name="labels" className="btn btn-primary "  value="0">
                            <input type="checkbox" id="orderCheckbox" value="邀请访客"/>
                            邀请访客({this.state.VisitorTypeObj.invitevisitorcount})
                          </label>
                        </div>
                    </div>
                  </fieldset>

                  <WidgetGrid>
                    <div className="row">
                      <article className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                          <header>
                            <span className="widget-icon">
                              <i className="fa fa-table"/>
                            </span>
                            <h2>来访统计一览</h2>
                            <div className="widget-toolbar" >
                              <button type="button" id="exports" className="btn btn-sm btn-primary">导出csv</button>
                            </div>
                           <div className="widget-toolbar" >
                            <button id="btn-stastic-graph" type="button" className="btn btn-sm btn-primary">统计图表</button>
                          </div>
                          </header>
                          <div>
                            <div className="widget-body no-padding">
                              <Datatable  getApi={this._getApi} onAjaxDidReceive={this._onAjaxDidReceive} options={options} filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%" id="VisitTable">
                                <thead>
                                  <tr>
                                    <th width="15%"><div style={styleTable}>图片</div></th>
                                    <th width="7%"><div style={styleTable}>来访人</div></th>
                                    <th width="8%"><div style={styleTable}>联系方式</div></th>
                                    <th width="6%"><div style={styleTable}>事由</div></th>
                                    <th width="10%"><div style={styleTable}>受访部门</div></th>
                                    <th width="11%"><div style={styleTable}>受访人</div></th>
                                    <th width="23%"><div style={styleTable}>来访公司</div></th>
                                    <th width="12%"><div style={styleTable}>预约时间</div></th>
                                    <th width="6%"><div style={styleTable}>状态</div></th>
                                  </tr>
                                </thead>
                              </Datatable>
                            </div>
                          </div>
                        </JarvisWidget>
                      </article>
                    </div>
                  </WidgetGrid>
                </div>
              </div>
            </WidgetGrid>
          </div>
        </UiTabs>
      </div>
    )
  }
});
export default VisitStatistics
