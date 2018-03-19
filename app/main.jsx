window.jQuery = window.$ =  require("jquery");
window._ =  require("lodash");

require("jquery-ui");
require("jstree");
require("toastr");
require("jquery-confirm");
require("bootstrap");
require("fastclick");
require("moment");
require("moment-timezone");
require("fullcalendar");
require("notification");
require("smartwidgets");
require("easy-pie");
require("sparkline");
require('jvectormap');
require('jvectormap-world-mill-en');

window.SMARTADMIN_GLOBALS = require('./config/config');
window.MSG_GLOBALS = require('./config/msg');

require.ensure([], function(require){
    require('./Router.jsx');
});
