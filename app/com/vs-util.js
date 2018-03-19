// //共通函数
// //导入提示消息模块
// import toastr from 'toastr'
// // import confirm from 'jquery-confirm'
// //消息显示全局配置
// toastr.options = {
//   "closeButton": false, //是否显示关闭按钮
//   "timeOut": "4000", //展现时间
//   "positionClass":"toast-top-center",//弹出的位置
//   "showEasing":"swing",//显示时的动画缓冲方式
//   "hideEasing":"linear",//消失时的动画缓冲方式
//   "showMethod":"fadeIn",//显示时的动画方式
//   "hideMethod":"fadeOut",//消失时的动画方式
//   "preventDuplicates":true,
//   //"progressBar":true
// }
//
// //确认消息窗口显示全局配置
// $.confirm.options = {
//     text: "确定操作吗?",
//     title: "",
//     confirmButton: "确定",
//     cancelButton: "取消",
//     post: false,
//     submitForm: false,
//     confirmButtonClass: "btn-danger",
//     cancelButtonClass: "btn-info",
//     dialogClass: "modal-dialog"
// }

var VsUtil = {
  // 判断用户是否已登录
  // 未登录的情况下重定向到登录画面
  IsLoginCheck: function(nextState, replace, next) {
    if (localStorage.getItem('isLogin') == 'true') {
        next()
    } else {
        replace({pathname: '/login', query: ''}, '/login')
        next()
    }
  },
  //确认窗口
  Confirm:function(msg,confirmCallback,cancelCallback)
  {
      $.confirm.options.text = msg;
      $.confirm({
        confirm: function() {
           confirmCallback();
        },
        cancel: function() {
          cancelCallback();
        }
      });
  },
  //操作消息框提示
  //操作成功时，消息显示用
  ToastrSuccess:function(msg)
  {
    toastr.success(msg.content);
  },
  //操作后，提示消息显示用
  ToastrInfo:function(msg)
  {
    toastr.info(msg.content);
  },
  //操作后，警告消息显示用
  ToastrWarning:function(msg)
  {
    toastr.warning(msg.content);
  },
  //操作后，错误消息显示用
  ToastrError:function(msg)
  {
    toastr.error(msg.content);
  },
  //提示框显示
   ShowHintDialog:function(options)
   {
     options = this.HintDialogDefValConfig(options);
     if ($("#divSmallBoxes").html() === "") {
       $.smallBox(options);
     }
   },
   //提示框属性默认值设置
   HintDialogDefValConfig:function(options)
   {
       if (typeof options.title == 'undefined') {
         options.title = "Face360访客系统";
       }
       if (typeof options.color == 'undefined') {
         options.color = "#296191";
       }
       if (typeof options.iconSmall == 'undefined') {
         options.iconSmall = "fa fa-thumbs-up bounce animated";
       }
       if (typeof options.iconSmall == 'undefined') {
         options.iconSmall = "fa fa-thumbs-up bounce animated";
       }
       if (typeof options.timeout == 'undefined') {
         options.timeout = 4000;
       }
       options.content = "<i class='fa fa-clock-o'></i> <i>" + options.content +"</i>";

      return options;
   }

}

export default VsUtil
