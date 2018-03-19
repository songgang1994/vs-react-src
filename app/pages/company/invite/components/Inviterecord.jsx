import React from 'react'

import _ from 'lodash'

import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import Tagsinput from '../../../../../components/forms/inputs/Tagsinput.jsx'
import SelectCalenderWidget from '../../../../../components/calendar/components/SelectCalenderWidget.jsx'
import Company from '../../../util/components/VisitingCompany.jsx'
import UiTabs from '../../../../../components/ui/UiTabs.jsx'
import DetailActions from '../actions/DetailActions.js'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'

let Inviterecord = React.createClass({

  componentDidMount: function () {

    let nextId = 1;
    let $tabs = $("#tabs").tabs();
    let $tab_template = $("#tab-template");
    $("#inviteList").on("click","button",function(e){
       //是否为详细按钮
      if(e.target.name == "btn-stastic-graph"){

        let newId = 'tab-' + nextId++;
        var $ul = $tabs.find( "ul.tab-title" );
        var $sp = $("<span class='ui-icon ui-icon-close'/>");
        var $li = $( "<li><a href='#" + newId + "'>邀请详细</a></li>" );
        $li.append($sp).appendTo( $ul );


        let $div = $("<div id='" + newId + "'/>").css({
            width: "100%",
            height: "1px"
        });
        $div.appendTo($tabs);

        $("<iframe/>").attr({
          "src": '/#/invite/statis',
          "frameborder": '0',
          "width": '100%',
          "height": '100%',
          "scrolling":'no'

        }).appendTo($div).load(function(){
            var mainheight = $(this).contents().find("body").height()+10;
            $div.height(mainheight);
            $li.find("a").click();
        }); ;

        $tabs.tabs( "refresh" );

        var a = this.parentNode;
        var Id = $(this.parentNode).find("input").val();
        DetailActions.getId(Id);


        $sp.click(function() {
            var key = $(this).prev().attr("href");
            $(key).remove();
            $(this).parent().remove();
            $tabs.tabs( "refresh" );
        })

      }

    });


      $("label[name='labels']").click(function() {
        //checkbox选中的情况
        if($(this).find("input")[0].checked==true){
          //移除未选中样式
          $(this).removeClass("btn btn-default");
          //添加选中样式
          $(this).addClass("btn btn-primary");

        //checkbox未选中的情况
        } else {
          //移除选中样式
          $(this).removeClass("btn-primary");
          //添加未选中样式
          $(this).addClass("btn-default");
          }
       });
  },


  // handleClick:function(){
  //   $("span").remove(".tag.label.label-info");
  //   $("label[name='labels']").prop('class', 'btn btn-primary active');
  //   this.refs.clear.unselect();
  // },

  componentDidMount: function(){
    $(".bootstrap-tagsinput input").css("display","none");
  },
  render: function() {
    let styleTable = {
      textAlign:"center",
      verticalAlign:"middel"
    };
    return (
        <div id="content">
         <UiTabs id="tabs" >
          <ul className="tab-title">
              <li>
                  <a href="#tab-0">邀请一览</a>
              </li>
          </ul>

         <div id="tab-0">

        <form id="order-form" className="smart-form" noValidate="novalidate" >
          <div className="row">
            <article className="col col-2.9">
              <label>统计开始日期 : </label>
              <label className="input">
                <i className="icon-append fa fa-calendar"/>
                <UiDatepicker type="text"  name="startdate" id="startdate" minRestrict="#finishdate" placeholder="开始时间" data-date-format="yy/mm/dd" defaultValue="2017-10-14"/>
              </label>
            </article>

            <article className="col col-3"></article>

            <article className="col col-2.9">
               <label>统计结束日期: </label>
               <label className="input">
                   <i className="icon-append fa fa-calendar"/>
                   <UiDatepicker type="text" name="finishdate" id="finishdate" maxRestrict="#startdate" placeholder="结束时间" data-date-format="yy/mm/dd" defaultValue="2017-11-14"/>
               </label>
            </article>
          </div>
          <br></br><br></br>
        </form>

        <div className="form-group">
          <div className="btn-group" data-toggle="buttons">
            <label id= "nosign" name="labels" className="btn btn-primary">
              <input type="checkbox" id="nosignCheckbox" name="gender" value="male"/>
              未审核(0)
            </label>
            <label id= "asking" name="labels" className="btn btn-primary">
              <input type="checkbox" id="askingCheckbox" name="gender" value="female"/>
              审核通过(0)
            </label>
            <label id="signed" name="labels" className="btn btn-primary">
              <input type="checkbox" id="signedCheckbox" name="gender" value="other"/>
              审核不通过(0)
            </label>
          </div>
        </div>


        <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
          <header>
            <span className="widget-icon">
              <i className="fa fa-table"/>
            </span>
            <h2>邀请人员一览</h2>
          </header>
          <div>
            <div className="widget-body no-padding">
              <Datatable id="inviteList" useVsAjax={false}  options={{
                ajax: 'api/tables/datatables.visit.json',
                columns: [
                  {
                    data: "invitersector"
                  }, {
                    data: "invitername"
                  }, {
                    data: "invitedcompany"
                  }, {
                    data: "invitedname"
                  }, {
                    data: "invitedphone",
                    render: function(data) {
                    return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
                  }
                  }, {
                    data: "invitedreason",
                    render: function(data) {
                    return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
                  }
                  }, {
                    data: "time",
                    render: function(data) {
                    return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
                  }
                  }, {
                    data: "statas",
                    render: function(data) {
                    return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
                  }
                  },
                  {
                    render: function(data) {
                      return "<div style='text-align:center;vertical-align:middel;'><button name='btn-stastic-graph' class='btn btn-info'>详细</button>&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn btn-primary txt-color-white btn-sm' href='#/invitate/create'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-warning'>取消</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-danger btn-sm'>删除</button></div>";
                    }
                  }
                ]
              }} filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
                <thead>
                  <tr>
                    <th><div style={styleTable}>受访部门</div></th>
                    <th><div style={styleTable}>受访人</div></th>
                    <th><div style={styleTable}>来访公司</div></th>
                    <th><div style={styleTable}>来访人</div></th>
                    <th><div style={styleTable}>联系方式</div></th>
                    <th><div style={styleTable}>事由</div></th>
                    <th><div style={styleTable}>预约时间</div></th>
                    <th><div style={styleTable}>状态</div></th>
                    <th><div style={styleTable}>操作</div></th>
                  </tr>
                </thead>
              </Datatable>
            </div>
          </div>
        </JarvisWidget>


      </div>
      </UiTabs>
      </div>
    )
  }
});
export default Inviterecord
