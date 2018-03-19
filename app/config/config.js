/**
 * Created by griga on 11/30/15.
 */

var config = {
    isMobile:false,
    menu_speed: 200,

    smartSkin: "smart-style-0",

     apiRootUrl: "http://58.241.166.82:8088/vs-api-ctrl",
    //  apiRootUrl: "http://10.30.100.63:8088/vs-api-ctrl",
    // apiRootUrl: "http://localhost:8088/vs-api-ctrl",

    API_ERR_CODE: {
        //成功
        RTN_CODE_SUCCESS : 100,
        //未登录
        RTN_CODE_NOT_LOGIN : 200,
        //连接超时
        RTN_CODE_CONNECT_TIMEOUT : 201,
        //未知错误发生
        RTN_CODE_UNKNOWN : 202,
        //登录超时(session timeout)
        RTN_CODE_SESSION_TIMEOUT : 203,
        //无权限
        RTN_CODE_NOT_PERMITTED : 204,
        //API接口未找到
        RTN_CODE_API_NOT_FOUND : 205,
        //返回结果NULL错误
        RTN_CODE_RESULT_NULL : 206,
        //无效的接口参数
        RTN_CODE_INVALID_PARAMS : 207,
        //非法请求客户端
        RTN_CODE_ILLEGAL_REQUEST : 208,
        //服务器端返回的数据格式错误
        RTN_CODE_DATA_PARSER_ERROR : 209
    },
    API_BIZ_CODE: {
        //业务处理成功
        BIZ_CODE_SUCCESS : 100,
        //接口参数不正
        BIZ_CODE_INVALID_PARAMS : 101,
        //记录0条
        BIZ_CODE_RECORD_0 : 102,
        //添加记录成功
        BIZ_CODE_INSERT_SUCCESS : 103,
        //更新记录成功
        BIZ_CODE_UPDATE_SUCCESS : 104,
        //删除记录成功
        BIZ_CODE_DELETE_SUCCESS : 105,
        // 登录验证失败错误
        BIZ_CODE_LOGIN_AUTH_FAILED : 106
    },
    // RTN_ERR_CODE_HINT : {
    //     //成功
    //     RTN_CODE_SUCCESS : "成功",
    //     //未登录
    //     RTN_CODE_NOT_LOGIN : "您尚未登录，请先登录",
    //     //连接超时
    //     RTN_CODE_CONNECT_TIMEOUT : "服务器响应超时",
    //     //未知错误发生
    //     RTN_CODE_UNKNOWN : "发生未知异常",
    //     //登录超时(session timeout)
    //     RTN_CODE_SESSION_TIMEOUT : "会话超时，请重新登录",
    //     //无权限
    //     RTN_CODE_NOT_PERMITTED : "您没有权限访问数据",
    //     //API接口未找到
    //     RTN_CODE_API_NOT_FOUND : "访问的API接口不存在",
    //     //返回结果NULL错误
    //     RTN_CODE_RESULT_NULL : "返回结果NULL",
    //     //无效的接口参数
    //     RTN_CODE_INVALID_PARAMS : "无效参数",
    //     //非法请求客户端
    //     RTN_CODE_ILLEGAL_REQUEST : "非法请求"
    // },

    buildUrl: "build",
    skins: [
        {
            name: "smart-style-0",
            logo: "styles/img/logo.png",
            class: "btn btn-block btn-xs txt-color-white margin-right-5",
            style: {
                backgroundColor: '#4E463F'
            },
            label: "默认皮肤"
        }
        // ,

        // {
        //     name: "smart-style-1",
        //     logo: "styles/img/logo-white.png",
        //     class: "btn btn-block btn-xs txt-color-white",
        //     style: {
        //         background: '#3A4558'
        //     },
        //     label: "黑暗优雅"
        // },
        //
        // {
        //     name: "smart-style-2",
        //     logo: "styles/img/logo-blue.png",
        //     class: "btn btn-xs btn-block txt-color-darken margin-top-5",
        //     style: {
        //         background: '#fff'
        //     },
        //     label: "超轻明亮"
        // },
        //
        // {
        //     name: "smart-style-3",
        //     logo: "styles/img/logo-pale.png",
        //     class: "btn btn-xs btn-block txt-color-white margin-top-5",
        //     style: {
        //         background: '#f78c40'
        //     },
        //     label: "谷歌皮肤"
        // },
        //
        // {
        //     name: "smart-style-4",
        //     logo: "styles/img/logo-pale.png",
        //     class: "btn btn-xs btn-block txt-color-white margin-top-5",
        //     style: {
        //         background: '#bbc0cf',
        //         border: '1px solid #59779E',
        //         color: '#17273D !important'
        //     },
        //     label: "像素撞击"
        // },
        //
        // {
        //     name: "smart-style-5",
        //     logo: "styles/img/logo-pale.png",
        //     class: "btn btn-xs btn-block txt-color-white margin-top-5",
        //     style: {
        //         background: 'rgba(153, 179, 204, 0.2)',
        //         border: '1px solid rgba(121, 161, 221, 0.8)',
        //         color: '#17273D !important'
        //     },
        //     label: "玻璃皮肤"
        // },
        //
        // {
        //     name: "smart-style-6",
        //     logo: "styles/img/logo-pale.png",
        //     class: "btn btn-xs btn-block txt-color-white margin-top-5",
        //     style: {
        //         background: 'rgba(153, 179, 204, 0.2)',
        //         border: '1px solid rgba(121, 161, 221, 0.8)',
        //         color: '#17273D !important'
        //     },
        //     beta: true,
        //     label: "材料设计"
        // }
    ]
};

config.sound_path = "sound/";
config.sound_on = true;


/*
 * DEBUGGING MODE
 * debugState = true; will spit all debuging message inside browser console.
 * The colors are best displayed in chrome browser.
 */


config.debugState = true;//TODO 发布时改成false
config.debugStyle = 'font-weight: bold; color: #00f;';
config.debugStyle_green = 'font-weight: bold; font-style:italic; color: #46C246;';
config.debugStyle_red = 'font-weight: bold; color: #ed1c24;';
config.debugStyle_warning = 'background-color:yellow';
config.debugStyle_success = 'background-color:green; font-weight:bold; color:#fff;';
config.debugStyle_error = 'background-color:#ed1c24; font-weight:bold; color:#fff;';


config.voice_command = true;
config.voice_command_auto = false;

/*
 *  Sets the language to the default 'en-US'. (supports over 50 languages
 *  by google)
 *
 *  Afrikaans         ['af-ZA']
 *  Bahasa Indonesia  ['id-ID']
 *  Bahasa Melayu     ['ms-MY']
 *  CatalГ            ['ca-ES']
 *  ДЊeЕЎtina         ['cs-CZ']
 *  Deutsch           ['de-DE']
 *  English           ['en-AU', 'Australia']
 *                    ['en-CA', 'Canada']
 *                    ['en-IN', 'India']
 *                    ['en-NZ', 'New Zealand']
 *                    ['en-ZA', 'South Africa']
 *                    ['en-GB', 'United Kingdom']
 *                    ['en-US', 'United States']
 *  EspaГ±ol          ['es-AR', 'Argentina']
 *                    ['es-BO', 'Bolivia']
 *                    ['es-CL', 'Chile']
 *                    ['es-CO', 'Colombia']
 *                    ['es-CR', 'Costa Rica']
 *                    ['es-EC', 'Ecuador']
 *                    ['es-SV', 'El Salvador']
 *                    ['es-ES', 'EspaГ±a']
 *                    ['es-US', 'Estados Unidos']
 *                    ['es-GT', 'Guatemala']
 *                    ['es-HN', 'Honduras']
 *                    ['es-MX', 'MГ©xico']
 *                    ['es-NI', 'Nicaragua']
 *                    ['es-PA', 'PanamГЎ']
 *                    ['es-PY', 'Paraguay']
 *                    ['es-PE', 'PerГє']
 *                    ['es-PR', 'Puerto Rico']
 *                    ['es-DO', 'RepГєblica Dominicana']
 *                    ['es-UY', 'Uruguay']
 *                    ['es-VE', 'Venezuela']
 *  Euskara           ['eu-ES']
 *  FranГ§ais         ['fr-FR']
 *  Galego            ['gl-ES']
 *  Hrvatski          ['hr_HR']
 *  IsiZulu           ['zu-ZA']
 *  ГЌslenska         ['is-IS']
 *  Italiano          ['it-IT', 'Italia']
 *                    ['it-CH', 'Svizzera']
 *  Magyar            ['hu-HU']
 *  Nederlands        ['nl-NL']
 *  Norsk bokmГҐl     ['nb-NO']
 *  Polski            ['pl-PL']
 *  PortuguГЄs        ['pt-BR', 'Brasil']
 *                    ['pt-PT', 'Portugal']
 *  RomГўnДѓ          ['ro-RO']
 *  SlovenДЌina       ['sk-SK']
 *  Suomi             ['fi-FI']
 *  Svenska           ['sv-SE']
 *  TГјrkГ§e          ['tr-TR']
 *  Р±СЉР»РіР°СЂСЃРєРё['bg-BG']
 *  PСѓСЃСЃРєРёР№     ['ru-RU']
 *  РЎСЂРїСЃРєРё      ['sr-RS']
 *  н•њкµ­м–ґ         ['ko-KR']
 *  дё­ж–‡            ['cmn-Hans-CN', 'ж™®йЂљиЇќ (дё­е›Ѕе¤§й™†)']
 *                    ['cmn-Hans-HK', 'ж™®йЂљиЇќ (й¦™жёЇ)']
 *                    ['cmn-Hant-TW', 'дё­ж–‡ (еЏ°зЃЈ)']
 *                    ['yue-Hant-HK', 'зІµиЄћ (й¦™жёЇ)']
 *  ж—Ґжњ¬иЄћ         ['ja-JP']
 *  Lingua latД«na    ['la']
 */
config.voice_command_lang = 'en-US';
/*
 *  Use localstorage to remember on/off (best used with HTML Version)
 */
config.voice_localStorage = false;
/*
 * Voice Commands
 * Defines all voice command variables and functions
 */
if (config.voice_command) {

    config.commands = {

        'show dashboard' : function() { window.location.hash = "dashboard" },
        'show inbox' : function() {  window.location.hash = "inbox/" },
        'show graphs' : function() {  window.location.hash = "graphs/flot" },
        'show flotchart' : function() { window.location.hash = "graphs/flot" },
        'show morris chart' : function() { window.location.hash = "graphs/morris" },
        'show inline chart' : function() { window.location.hash = "graphs/inline-charts" },
        'show dygraphs' : function() { window.location.hash = "graphs/dygraphs" },
        'show tables' : function() { window.location.hash = "tables/table" },
        'show data table' : function() { window.location.hash = "tables/datatable" },
        'show jquery grid' : function() { window.location.hash = "tables/jqgrid" },
        'show form' : function() { window.location.hash = "forms/form-elements" },
        'show form layouts' : function() { window.location.hash = "forms/form-templates" },
        'show form validation' : function() { window.location.hash = "forms/validation" },
        'show form elements' : function() { window.location.hash = "forms/bootstrap-forms" },
        'show form plugins' : function() { window.location.hash = "forms/plugins" },
        'show form wizards' : function() { window.location.hash = "forms/wizards" },
        'show bootstrap editor' : function() { window.location.hash = "forms/other-editors" },
        'show dropzone' : function() { window.location.hash = "forms/dropzone" },
        'show image cropping' : function() { window.location.hash = "forms/image-editor" },
        'show general elements' : function() { window.location.hash = "ui/general-elements" },
        'show buttons' : function() { window.location.hash = "ui/buttons" },
        'show fontawesome' : function() { window.location.hash = "ui/icons/fa" },
        'show glyph icons' : function() { window.location.hash = "ui/icons/glyph" },
        'show flags' : function() { window.location.hash = "ui/icons/flags" },
        'show grid' : function() { window.location.hash = "ui/grid" },
        'show tree view' : function() { window.location.hash = "ui/treeview" },
        'show nestable lists' : function() { window.location.hash = "ui/nestable-list" },
        'show jquery U I' : function() { window.location.hash = "ui/jqui" },
        'show typography' : function() { window.location.hash = "ui/typography" },
        'show calendar' : function() { window.location.hash = "calendar" },
        'show widgets' : function() { window.location.hash = "widgets" },
        'show gallery' : function() { window.location.hash = "gallery" },
        'show maps' : function() { window.location.hash = "gmap-xml" },
        'go back' :  function() { history.back(1); },
        'scroll up' : function () { $('html, body').animate({ scrollTop: 0 }, 100); },
        'scroll down' : function () { $('html, body').animate({ scrollTop: $(document).height() }, 100);},
        'hide navigation' : function() {
            if ($( ":root" ).hasClass("container") && !$( ":root" ).hasClass("menu-on-top")){
                $('span.minifyme').trigger("click");
            } else {
                $('#hide-menu > span > a').trigger("click");
            }
        },
        'show navigation' : function() {
            if ($( ":root" ).hasClass("container") && !$( ":root" ).hasClass("menu-on-top")){
                $('span.minifyme').trigger("click");
            } else {
                $('#hide-menu > span > a').trigger("click");
            }
        },
        'mute' : function() {
            config.sound_on = false;
            $.smallBox({
                title : "MUTE",
                content : "All sounds have been muted!",
                color : "#a90329",
                timeout: 4000,
                icon : "fa fa-volume-off"
            });
        },
        'sound on' : function() {
            config.sound_on = true;
            $.speechApp.playConfirmation();
            $.smallBox({
                title : "UNMUTE",
                content : "All sounds have been turned on!",
                color : "#40ac2b",
                sound_file: 'voice_alert',
                timeout: 5000,
                icon : "fa fa-volume-up"
            });
        },
        'stop' : function() {
            smartSpeechRecognition.abort();
            $( ":root" ).removeClass("voice-command-active");
            $.smallBox({
                title : "VOICE COMMAND OFF",
                content : "Your voice commands has been successfully turned off. Click on the <i class='fa fa-microphone fa-lg fa-fw'></i> icon to turn it back on.",
                color : "#40ac2b",
                sound_file: 'voice_off',
                timeout: 8000,
                icon : "fa fa-microphone-slash"
            });
            if ($('#speech-btn .popover').is(':visible')) {
                $('#speech-btn .popover').fadeOut(250);
            }
        },
        'help' : function() {

            $('#voiceModal').removeData('modal').modal( {
                remote: "html/layout/voice-commands.html",
                show: true } );
            if ($('#speech-btn .popover').is(':visible')) {
                $('#speech-btn .popover').fadeOut(250);
            }

        },
        'got it' : function() {
            $('#voiceModal').modal('hide');
        },
        'logout' : function() {
            $.speechApp.stop();
            window.location = $('#logout > span > a').attr("href");
        }
    };
};

module.exports = config;
