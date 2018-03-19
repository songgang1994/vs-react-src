import React from 'react'

import _ from 'lodash'

import Reflux from 'reflux'
import BigBreadcrumbs from '../../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import UiTabs from '../../../../../components/ui/UiTabs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import Tagsinput from '../../../../../components/forms/inputs/Tagsinput.jsx'
import Company from '../../../util/components/VisitingCompany.jsx'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'

import Invitelistchild from './Invitelistchild.jsx'
import Invitecreate from './Invitecreate.jsx'
import Invitecalendar from './Invitecalendar.jsx'

let Invitetab = React.createClass({

  componentDidMount: function () {

    this._registerEventHandler();

    // let nextId = 1;
    // let $tabs = $("#tabs").tabs();
    // let $tab_template = $("#tab-template");
    //
    //   $("#inviteList").on("click","button",function(e){
    //   //是否为详细按钮
    //   if(e.target.name == "btn-stastic-graph"){
    //     let newId = 'tab-' + nextId++;
    //     var $ul = $tabs.find( "ul.tab-title" );
    //     var $sp = $("<span class='ui-icon ui-icon-close'/>");
    //     var $li = $( "<li><a href='#" + newId + "'>邀请详细</a></li>" );
    //     $li.append($sp).appendTo( $ul );
    //
    //     let $div = $("<div id='" + newId + "'/>").css({
    //         width: "100%",
    //         height: "1px"
    //     });
    //     $div.appendTo($tabs);
    //
    //     $("<iframe/>").attr({
    //       "src": '/#/invite/statis',
    //       "frameborder": '0',
    //       "width": '100%',
    //       "height": '100%',
    //       "scrolling":'no'
    //
    //     }).appendTo($div).load(function(){
    //         var mainheight = $(this).contents().find("body").height()+10;
    //
    //         $div.height(mainheight);
    //         $li.find("a").click();
    //     }); ;
    //
    //     $tabs.tabs( "refresh" );
    //     //取当前信息的id值
    //     // var a = this.parentNode;
    //     // var Id = $(this.parentNode).find("input").val();
    //     //tab画面关闭
    //     $sp.click(function() {
    //         var key = $(this).prev().attr("href");
    //         $(key).remove();
    //         $(this).parent().remove();
    //         $tabs.tabs( "refresh" );
    //     })
    //   }
    //
    // });;

    // $("#btn_InviteEdit").on("click",function(){
    //   let newId = 'tab-' + nextId++;
    //   var $ul = $tabs.find( "ul.tab-title" );
    //   var $sp = $("<span class='ui-icon ui-icon-close'/>");
    //   var $li = $( "<li><a href='#" + newId + "'>邀请编辑</a></li>" );
    //   $li.append($sp).appendTo( $ul );
    //
    //   let $div = $("<div id='" + newId + "'/>").css({
    //       width: "100%",
    //       height: "1px"
    //   });
    //   $div.appendTo($tabs);
    //
    //   $("<iframe/>").attr({
    //     "src": '/#/invite/create',
    //     "frameborder": '0',
    //     "width": '100%',
    //     "height": '100%',
    //     "scrolling":'no'
    //
    //   }).appendTo($div).load(function(){
    //       var mainheight = $(this).contents().find("body").height()+10;
    //       $div.height(mainheight);
    //       $li.find("a").click();
    //   }); ;
    //
    //   $tabs.tabs( "refresh" );
    //   //取当前信息的id值
    //   // var a = this.parentNode;
    //   // var Id = $(this.parentNode).find("input").val();
    //   //tab画面关闭
    //   $sp.click(function() {
    //       var key = $(this).prev().attr("href");
    //       $(key).remove();
    //       $(this).parent().remove();
    //       $tabs.tabs( "refresh" );
    //   })
    // });
    //
    // $("#button_InviteAdd").on("click",function(){
    //   let newId = 'tab-' + nextId++;
    //   var $ul = $tabs.find( "ul.tab-title" );
    //   var $sp = $("<span class='ui-icon ui-icon-close'/>");
    //   var $li = $( "<li><a href='#" + newId + "'>发送邀请</a></li>" );
    //   $li.append($sp).appendTo( $ul );
    //
    //   let $div = $("<div id='" + newId + "'/>").css({
    //       width: "100%",
    //       height: "1px"
    //   });
    //   $div.appendTo($tabs);
    //
    //   $("<iframe/>").attr({
    //     "src": '/#/invite/create',
    //     "frameborder": '0',
    //     "width": '100%',
    //     "height": '100%',
    //     "scrolling":'no'
    //
    //   }).appendTo($div).load(function(){
    //       var mainheight = $(this).contents().find("body").height()+10;
    //       $div.height(mainheight);
    //       $li.find("a").click();
    //   }); ;
    //
    //   $tabs.tabs( "refresh" );
    //   //取当前信息的id值
    //   // var a = this.parentNode;
    //   // var Id = $(this.parentNode).find("input").val();
    //   //tab画面关闭
    //   $sp.click(function() {
    //       var key = $(this).prev().attr("href");
    //       $(key).remove();
    //       $(this).parent().remove();
    //       $tabs.tabs( "refresh" );
    //   })
    // });
    //
    // $("#button_InviteRecord").on("click",function(){
    //   let newId = 'tab-' + nextId++;
    //   var $ul = $tabs.find( "ul.tab-title" );
    //   var $sp = $("<span class='ui-icon ui-icon-close'/>");
    //   var $li = $( "<li><a href='#" + newId + "'>邀请一览</a></li>" );
    //   $li.append($sp).appendTo( $ul );
    //
    //   let $div = $("<div id='" + newId + "'/>").css({
    //       width: "100%",
    //       height: "1px"
    //   });
    //   $div.appendTo($tabs);
    //
    //   $("<iframe/>").attr({
    //     "src": '/#/invite/record',
    //     "frameborder": '0',
    //     "width": '100%',
    //     "height": '100%',
    //     "scrolling":'no'
    //
    //   }).appendTo($div).load(function(){
    //       var mainheight = $(this).contents().find("body").height()+10;
    //       $div.height(mainheight);
    //       $li.find("a").click();
    //
    //       $("#inviteList",$(this).contents().find("body")).on("click","button",function(e){
    //       //是否为详细按钮
    //       if(e.target.name == "btn-stastic-graph"){
    //         let newId = 'tab-' + nextId++;
    //         var $ul = $tabs.find( "ul.tab-title" );
    //         var $sp = $("<span class='ui-icon ui-icon-close'/>");
    //         var $li = $( "<li><a href='#" + newId + "'>邀请详细</a></li>" );
    //         $li.append($sp).appendTo( $ul );
    //
    //         let $div = $("<div id='" + newId + "'/>").css({
    //             width: "100%",
    //             height: "1px"
    //         });
    //         $div.appendTo($tabs);
    //
    //         $("<iframe/>").attr({
    //           "src": '/#/invite/statis',
    //           "frameborder": '0',
    //           "width": '100%',
    //           "height": '100%',
    //           "scrolling":'no'
    //
    //         }).appendTo($div).load(function(){
    //             var mainheight = $(this).contents().find("body").height()+10;
    //
    //             $div.height(mainheight);
    //             $li.find("a").click();
    //         }); ;
    //
    //         $tabs.tabs( "refresh" );
    //         //取当前信息的id值
    //         // var a = this.parentNode;
    //         // var Id = $(this.parentNode).find("input").val();
    //         //tab画面关闭
    //         $sp.click(function() {
    //             var key = $(this).prev().attr("href");
    //             $(key).remove();
    //             $(this).parent().remove();
    //             $tabs.tabs( "refresh" );
    //         })
    //       }
    //
    //     });;
    //   }); ;
    //
    //   $tabs.tabs( "refresh" );
    //   //取当前信息的id值
    //   // var a = this.parentNode;
    //   // var Id = $(this.parentNode).find("input").val();
    //   //tab画面关闭
    //   $sp.click(function() {
    //       var key = $(this).prev().attr("href");
    //       $(key).remove();
    //       $(this).parent().remove();
    //       $tabs.tabs( "refresh" );
    //   })
    // });

    },

    _registerEventHandler: function() {
      let me = this;
      let nextId = 1;
      let $tabs = $("#tabs").tabs();
      let $tab_template = $("#tab-template");

      $("#inviteList").on("click","button",function(e){
      //是否为详细按钮
      let table = $('#inviteList').DataTable();
      let tr = $(this).closest('tr');
      let Id = table.row(tr).data().inviteId;

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
          "src": '/#/invite/statis/'+Id,
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
        //取当前信息的id值
        // var a = this.parentNode;
        // var Id = $(this.parentNode).find("input").val();
        //tab画面关闭
        $sp.click(function() {
            var key = $(this).prev().attr("href");
            $(key).remove();
            $(this).parent().remove();
            $tabs.tabs( "refresh" );
        })
      }

    });
  },

       // handleClick:function(){
       //   $("span").remove(".tag.label.label-info");
       //   $("label[name='labels']").prop('class', 'btn btn-primary active');
       //   this.refs.clear.unselect();
       // },

    render: function () {
      let styleTable = {
        textAlign:"center",
        verticalAlign:"middel"
      };
        return (
            <div id="content">
                <div className="well well-sm well-light">

                    <UiTabs id="tabs" >
                        <ul  className="tab-title">
                            <li>
                                <a href="#tabs-c">邀请记录</a>
                            </li>
                            <li>
                                <a href="#tabs-a">发送邀请</a>
                            </li>
                            <li>
                                <a href="#tabs-b">邀请一览</a>
                            </li>
                        </ul>

                        <div id="tabs-c">
                          <Invitecalendar/>
                        </div>

                        <div id="tabs-a">
                          <Invitecreate/>
                        </div>

                        <div id="tabs-b">
                          <Invitelistchild/>
                        </div>


                      </UiTabs>

                      <hr className="simple"/>
                    </div>
                  </div>

  )
}
});






export default Invitetab
