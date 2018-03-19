import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'

import BigBreadcrumbs from '../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../components/tables/Datatable.jsx'

let Projects = React.createClass({

  render: function() {
    let that = this;
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <Visitors/>
            </div>
          </div>
        </WidgetGrid>
      </div>
    )
  }
});

let Visitors = React.createClass({
  getInitialState: function() {
    return {isEdit: "true"}
  },
  componentDidMount: function() {
    //行点击事件
    // $('#sampleTest').on('click', 'td:not(:last-child)', function(event) {
    //   // alert(111)
    //
    //   //获取参数信息
    //   var table = $('#sampleTest').DataTable();
    //   var tr = $(this).closest('tr');
    //   var row = table.row(tr);
    //   var visitor = row.data();
    //   var clickIndex = $(this).parents("tr").find("td").index($(this));
    //   var input = $(this).children().children();
    //   //VisitorActions.isShowVisitorInfo("true",visitor);
    //   if (clickIndex != 0) { //选中除第一列和最后一列以外，tr变色，显示附加信息
    //     var str = '<form  class="smart-form"><fieldset>' +
    //     ' <section class="col col-lg-12"><label class="label" >备注:' + visitor.remarks + '</label></section>' + '</div></fieldset></form>';
    //     //tr变色，显示附加信息
    //     if (row.child.isShown()) {
    //       row.child.hide();
    //       tr.removeClass('shown');
    //     } else {
    //       row.child(str).show();
    //       tr.addClass('shown');
    //     }
    //     //check选中
    //
    //   } else { //设置第一列
    //     // checkbox选中 tr变色
    //     if ($(event.target).prop('type') == 'checkbox') {
    //       if (!input.prop("checked")) {
    //         input.prop("checked", false);
    //         tr.css("background-color", "")
    //       } else {
    //         input.prop("checked", true);
    //         tr.css("background-color", "#FFFFE0")
    //       }
    //     } else {
    //       if (input.prop("checked")) {
    //         input.prop("checked", false);
    //         tr.css("background-color", "")
    //       } else {
    //         input.prop("checked", true);
    //         tr.css("background-color", "#FFFFE0")
    //       }
    //     }
    //
    //   }
    //   // $("input[type='checkbox']").click(function(e){
    //   //     e.stopPropagation();
    //   //     // return false;
    //   // });
    // });
  },


  render: function() {
    let styleTable = {
      textAlign: "center",
      verticalAlign: "middel"
    };
    let options = {
      ajax: 'api/company/visitor.json',
      aLengthMenu: [5],
      order: [
        [4, 'asc']
      ],
      columns: [
        {
          data: "id",
          orderable: false,
          render: function(data) {
            return '<div  style="vertical-align:middel;">' + data + '</div>';
          }
        }, {
          orderable: false,
          data: "name",
          render: function(data) {
            return '<div  style="vertical-align:middel;text-align:left">' + data + '</div>';
          }
        }, {
          data: "company",
          render: function(data) {
            return '<div  style="vertical-align:middel;text-align:left">' + data + '</div>';
          }
        }, {
          data: "device",
          render: function(data) {
            return '<div  style="vertical-align:middel;text-align:left">' + data + '</div>';
          }
        }, {
          data: "ValidTime",
          render: function(data) {
            return '<div  style="vertical-align:middel;text-align:center">' + data + '</div>';
          }
        }, {
          data: "faceImg1",
          render: function(data) {
            return '<div  style="vertical-align:middel;text-align:center"><img src=' + data + ' width="70" ></img></div>';
          }
        }, {
          data: "faceImg2",
          render: function(data) {
            return '<div  style="vertical-align:middel;text-align:center"><img src=' + data + ' width="70" ></img></div>';
          }
        }, {
          data: "score",
          render: function(data) {
            return '<div  style="vertical-align:middel;text-align:center">' + data + '</div>';
          }
        }
      ]
    };
    return (
      <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
        <header>
          <span className="widget-icon">
            <i className="fa fa-table"/>
          </span>
          <h2>访客列表</h2>
        </header>

        <div>
          <div className="widget-body no-padding">
            <Datatable useVsAjax={false} options={options} id="sampleTest" filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
              <thead>
                <tr>
                  <th width="5%">
                    #
                  </th>
                  <th width="7%">
                    <div style={styleTable}>姓名</div>
                  </th>
                  <th width="15%">
                    <div style={styleTable}>公司</div>
                  </th>
                  <th width="20%">
                    <div style={styleTable}>终端(设备序列号)</div>
                  </th>
                  <th width="20%">
                    <div style={styleTable}>识别时刻</div>
                  </th>
                  <th width="8%">
                    <div style={styleTable}>注册图片</div>
                  </th>
                  <th width="8%">
                    <div style={styleTable}>抓拍图片</div>
                  </th>
                  <th>
                    <div style={styleTable}>相似度</div>
                  </th>
                </tr>
              </thead>
            </Datatable>
          </div>
        </div>
      </JarvisWidget>
    )
  }
});

export default Projects
