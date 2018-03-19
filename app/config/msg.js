//消息定义
var Msg = {
    SysMsg:{
      //成功
      RTN_CODE_SUCCESS : "成功",
      //未登录
      RTN_CODE_NOT_LOGIN : "您尚未登录，请先登录",
      //连接超时
      RTN_CODE_CONNECT_TIMEOUT : "服务器响应超时",
      //未知错误发生
      RTN_CODE_UNKNOWN : "服务器端未知错误发生，请联系管理员",
      //登录超时(session timeout)
      RTN_CODE_SESSION_TIMEOUT : "会话超时，请重新登录",
      //无权限
      RTN_CODE_NOT_PERMITTED : "您没有权限访问数据",
      //API接口未找到
      RTN_CODE_API_NOT_FOUND : "API接口不存在",
      //返回结果NULL错误
      RTN_CODE_RESULT_NULL : "返回结果NULL",
      //无效的接口参数
      RTN_CODE_INVALID_PARAMS : "无效参数",
      //非法请求客户端
      RTN_CODE_ILLEGAL_REQUEST : "非法请求"
    },
    UtilMsg:{
       Msg001:"登录的用户名不存在!",
       Msg002:"登录密码错误!",
       Msgmail:"邮件发送成功！",
       Msgfail:"未获取正确信息！",
       Msg000:"请输入正确的注册邮箱地址！",
       MsgPwd:"链接错误，重置密码失败！",
       MsgPwd001:"密码修改失败！"
    },
    DepartMsg:{
        Msg001:"部门添加成功!",
        Msg002:"部门添加失败!",
        Msg003:"部门编辑成功!",
        Msg004:"部门编辑失败!",
        Msg005:"部门变更成功!",
        Msg006:"部门变更失败!",
        Msg007:"部门删除成功!",
        Msg008:"部门删除失败!",
        Msg009:"请正确填写部门名称!",
	      Msg010:"部门名称重复!",
        Msg011:"权限不足,无法修改!",
        Msg012:"权限不足,无法删除!"
    },
    StaffMsg:{
      Msg001:"移除成功!",
      Msg002:"移除失败!",
      Msg003:"设置成功!",
      Msg004:"设置失败!",
      Msg005:"至少选中一项!",
      Msg006:"操作失败，无法设置自己的权限!",
      Msg007:"操作失败，无法移除自己!"
    },
    StaffEnrollMsg:{
        Msg001:"注册成功!",
        Msg002:"注册失败!登录名已存在!"

  }
}

module.exports = Msg;
