//共通基础Ajax
//导入共通函数
import VsUtil from './vs-util';
//共通配置参数
let Config = window.SMARTADMIN_GLOBALS;
//消息参数
let SysMsg = window.MSG_GLOBALS.SysMsg;

let realAjax = $.ajax;
$.VsAjax = function(options) {
    //API地址组合
    options.url = Config.apiRootUrl + options.url;
    //设置可以跨域访问
    options.crossDomain = true;
    //设置API返回数据格式
    options.dataType = 'json';
    //设置请求超时时间（毫秒）
    options.timeout = 10000;
    //设置不缓存请求结果
    options.cache = false;
    //针对json数据提交的场合，自动将要发送的JSON data字符串化
    if (options.contentType == 'application/json' &&
        $.isPlainObject(options.data)) {
        options.data = JSON.stringify(options.data);
    }
    //跨域请求时，服务器端session使用可
    if (typeof options.xhrFields == 'undefined') {
      	options.xhrFields = {
      		  withCredentials: true
      	};
    } else {
    	 options.xhrFields.withCredentials = true;
    }

    // TODO: Ajax发送前回调
    // return:
    //    false 取消发送
    //    true  继续发送
    let _beforeSend = function(jqXHR, settings) {
      //遮罩处理
       showMask();
        return true;
    };

    if (typeof options.beforeSend == 'undefined') {
        options.beforeSend = _beforeSend;
    } else if (typeof options.beforeSend == 'function') {
        let _userBeforeSend = options.beforeSend;
        options.beforeSend = function(jqXH, settings) {
            return _userBeforeSend(jqXH, settings) && _beforeSend(jqXH, settings);
        }
    }

    //Ajax对象
    let promise = realAjax.call($, options)

    //API返回错误Key数组对象
    let errCodeKeys = {};
    //API返回错误value数组对象
    let errCodeVals = {};
    //回调函数名数组对象
    let callBackFuns = {};

    // 回调函数表
    let cbMap = {};

    $.each(Config.API_ERR_CODE, function(codeName, code) {
        // 根据RESULT_XXXXX获取驼峰命名法函数名
        let funcName = codeName.toLowerCase()
            .replace(/_[a-z]/g, function($1) {return $1.toUpperCase()[1]});
        callBackFuns[code] = funcName;

        errCodeKeys[code] = codeName;
        errCodeVals[funcName] = code;
    });

    //默认回调处理
    function CallBackDefaultHandler(result) {
        if (result.rtnCode != null) {
          let msg = SysMsg[errCodeKeys[result.rtnCode]];
          if (result.message != null) {
              msg += ": [" + result.message + "]";
          }
          //log出力
          console.log(msg);
          VsUtil.ShowHintDialog({content: msg});
          // alert(msg);
        } else {
          //log出力
          console.log(result.message)
          VsUtil.ShowHintDialog({content: result.message});
          // alert(result.message)
        }
    }

    // 回调分支处理
    let CBFactory = {
        get: function(code) {
            switch (code) {
                case Config.API_ERR_CODE.RTN_CODE_NOT_LOGIN:
                    //未登录的场合
                    return (result) => {
                        CallBackDefaultHandler(result);
                        location.href = "/#/login"
                    }
                default:
                    //其他场合
                    return CallBackDefaultHandler;
            }
        }
    }

    $.each(Config.API_ERR_CODE, function(codeName, code) {
        cbMap["cb_" + callBackFuns[code]] = CBFactory.get(code);
    });

    let realDone = promise.done;
    // Ajax调用正常时的回调函数
    promise.done = function(funcMap) {
        let cbFuncMap = {};

        if (typeof funcMap == 'function') {
            cbFuncMap['cb_rtnCodeSuccess'] = funcMap;
        } else {
            for (let k in funcMap) {
                cbFuncMap["cb_" + k] = funcMap[k];
            }
        }
        $.extend(cbMap, cbFuncMap);

        realDone.call(promise, function(result) {
            switch (result.rtnCode) {
                case Config.API_ERR_CODE.RTN_CODE_SUCCESS:
                case Config.API_ERR_CODE.RTN_CODE_NOT_LOGIN:
                case Config.API_ERR_CODE.RTN_CODE_NOT_PERMITTED:
                case Config.API_ERR_CODE.RTN_CODE_INVALID_PARAMS:
                    cbMap["cb_" + callBackFuns[result.rtnCode]](result);
                    return;
                case Config.API_ERR_CODE.RTN_CODE_UNKNOWN:
                    cbMap['cb_rtnCodeUnknown']({
                        rtnCode: Config.API_ERR_CODE.RTN_CODE_UNKNOWN,
                        message: null});
                    return;
            }

        });
        return promise;
    };

    // Ajax调用异常时的回调函数
    promise.fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        //Ajax的ERR返回值判断
        switch(jqXHR.status) {
            case 404://API URL不存在
                cbMap['cb_rtnCodeApiNotFound']({
                  rtnCode: Config.API_ERR_CODE.RTN_CODE_API_NOT_FOUND,
                  message: null});
                return;
            case 400:
                cbMap['cb_rtnCodeIllegalRequest']({
                  rtnCode: Config.API_ERR_CODE.RTN_CODE_ILLEGAL_REQUEST,
                  message: "请求参数异常"});
                return;
            case 500:
                cbMap['cb_rtnCodeUnknown']({
                  rtnCode: Config.API_ERR_CODE.RTN_CODE_UNKNOWN,
                  message: "服务器内部异常发生"});
                return;
        }
        //jquery的ERR返回值判断
        switch (jqXHR.statusText) {
            case "timeout"://请求超时
                cbMap['cb_rtnCodeConnectTimeout']({
                  rtnCode: Config.API_ERR_CODE.RTN_CODE_CONNECT_TIMEOUT,
                  message: null});
                return;
            case "error"://未知错误
                cbMap['cb_rtnCodeUnknown']({
                  rtnCode: Config.API_ERR_CODE.RTN_CODE_UNKNOWN,
                  message: "未知错误发生jqXHR.statusText:" + jqXHR.statusText});
                return;
            case "parsererror"://数据格式错误
                cbMap['cb_rtnCodeDataParserError']({
                  rtnCode: Config.API_ERR_CODE.RTN_CODE_DATA_PARSER_ERROR,
                  message: "服务器返回数据格式错误"});
                return;
            default://其他错误
                cbMap['cb_rtnCodeUnknown']({
                  rtnCode: Config.API_ERR_CODE.RTN_CODE_UNKNOWN,
                  message: "其他未知错误发生jqXHR.statusText:" + jqXHR.statusText});
        }
    });

    // TODO: Ajax调用完成，成功或失败都会调用
    promise.always(function() {
      //去除遮罩
      hideMask();
    });

    return promise;
};

// 重写$.ajax，拦截底层jQuery Ajax调用
// 原因：某些组件内部会调用$.ajax获取服务端数据，将该类调用定向到$.VsAjax发送和统一处理
//      对前端框架本身包含的$.ajax调用默认不做处理，直接调用底层$.ajax
$.ajax = function() {
    // 根据$.ajax传参个数，获取options对象
    switch (arguments.length) {
    case 1:
        var options = arguments[0]
        break;
    case 2:
        var options = arguments[1];
        break;
    default:
        // 例外情况，不管
        return realAjax.apply($, arguments)
    }

    // 如果options中包含了[--caller-component]参数，调用定向到$.VsAjax
    if (typeof options == 'object' && typeof options.data == 'object' && options.data['--use-vs-ajax'] === true) {
        // delete options.data['--caller-component'];
        return $.VsAjax.apply($, arguments);
    } else {
        return realAjax.apply($, arguments);
    }
}

module.exports = $;
