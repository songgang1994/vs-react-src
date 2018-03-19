import React from 'react'
import _ from 'lodash'

import ScriptLoader from '../utils/mixins/ScriptLoader.jsx'
import ElementHolder from '../utils/mixins/ElementHolder.jsx'

import AjaxActions from '../actions/AjaxActions'

let Datatable = React.createClass({
  mixins: [
    ScriptLoader, ElementHolder
  ],
  getInitialState: function() {
    return {$Datatable: null}
  },
  componentDidMount: function() {
    this.loadScript('/vendor.datatables.js').then(function() {
      this._datatable()
      if (typeof this.props.getApi == 'function') {
        this.props.getApi(this.state.$Datatable)
      }
    }.bind(this))
  },
  getApi: function() {
    return this.state.$Datatable;
  },
  _onAjaxWillSend: function() {
    return (e, settings, json) => {
      console.log('DT AJAX REQ!')
      json["--use-vs-ajax"] = this.props.useVsAjax !== false
      console.log(arguments);
    };
  },
  _datatable: function() {
    var element = $(this.getHold());
    element.on('preXhr.dt', this._onAjaxWillSend());
    if (typeof this.props.onAjaxDidReceive == 'function') {
      element.on('xhr.dt', this.props.onAjaxDidReceive);
    }

    var options = this.props.options || {}

    let toolbar = '';
    if (options.buttons)
      toolbar += 'B';
    if (this.props.paginationLength)
      toolbar += 'l';
    if (this.props.columnsHide)
      toolbar += 'C';

    // TODO: 禁用 cache 处理，未添加 ?_=......
    if (typeof options.ajax == "object") {
      let url = options.ajax.url;
      options.ajax = {
        url: url,
        type: 'POST',
        contentType: 'application/json',
        dataSrc: "listData",
        data: options.ajax.data,
        complete: function(xhr) {
          AjaxActions.contentLoaded(xhr)
        }
      }
    } else if (typeof options.ajax === 'string'){
        //modify by guwei 2017/10/13
        //  let url = options.ajax;
        let url = options.ajax;
        options.ajax = {
            url: url,
            data:options.data,
            dataSrc: "listData",
            complete: function(xhr){
                AjaxActions.contentLoaded(xhr)
            }
        }
    }

    options = _.extend(options, {

      "dom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'" + toolbar + ">r>" + "t" + "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
      aLengthMenu: [
        [
          5, 10, 25, -1
        ],
        [5, 10, 25, "全部"]
      ],
      oLanguage: {
        "sSearch": "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
        "sLengthMenu": "_MENU_",
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sUrl": "",
        "sEmptyTable": "数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
          "sFirst": "首页",
          "sPrevious": "上页",
          "sNext": "下页",
          "sLast": "末页"
        },
        "oAria": {
          "sSortAscending": ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
      },
      "autoWidth": false,
      renderer: "bootstrap",
      retrieve: true,
      // select: true,
      responsive: true
    });

    var _dataTable;
    _dataTable = element.DataTable(options);
    this.state.$Datatable = _dataTable;

    if (this.props.filter) {
      // Apply the filter
      element.on('keyup change', 'thead th input[type=text]', function() {
        _dataTable.column($(this).parent().index() + ':visible').search(this.value).draw();

      });
    }

    // if (!toolbar) {
    //     element.parent().find(".dt-toolbar").append('<div class="text-right"><img src="styles/img/logo.png" alt="SmartAdmin" style="width: 111px; margin-top: 3px; margin-right: 10px;"></div>');
    // }

    if (this.props.detailsFormat) {
      let format = this.props.detailsFormat
      element.on('click', 'td', function(e) {
        var tr = $(this).closest('tr');
        var row = _dataTable.row(tr);

        let checkbox = $(this).find("input[type=checkbox]")
        let button = $(this).find("button")
        // let columnLength = $(this).parents("tr").find("td").length //总列数

        if (checkbox.length > 0) { //含有checkbox列
          // 点击checkbox及checkbox以外，实现tr变色 TODO:第一次点击checkbox，无效
          // $(checkbox).click(function(e) {// 防止checkbox冒泡
          //   if (!checkbox.prop("checked")) {
          //     checkbox.prop("checked", false);
          //     tr.css("background-color", "")
          //   } else {
          //     checkbox.prop("checked", true);
          //     tr.css("background-color", "#FFFFE0")
          //   }
          //   e.stopPropagation();
          // });
          // if (checkbox.prop("checked")) {//设置变色选中
          //   checkbox.prop("checked", false);
          //   tr.css("background-color", "")
          // } else {
          //   checkbox.prop("checked", true);
          //   tr.css("background-color", "#FFFFE0")
          // }

          //  点击checkbox选中，实现tr变色
          if (!checkbox.prop("checked")) {
            checkbox.prop("checked", false);
            tr.css("background-color", "")
          } else {
            checkbox.prop("checked", true);
            tr.css("background-color", "#FFFFE0")
          }
        } else if (button.length > 0) { //含有button列

        } else { //不含button checkbox列  点击显示附加信息
          if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
          } else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
          }
        }

      })
    }
  },
  render: function() {
    let {
      children,
      ...props
    } = this.props;
    return (
      <table {...props}>
        {children}
      </table>
    )
  }
});

export default Datatable
