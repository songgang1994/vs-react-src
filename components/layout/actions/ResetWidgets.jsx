import React from 'react'

let ResetWidgets = React.createClass({
    resetWidgets: function(){
        $.SmartMessageBox({
            title : "<i class='fa fa-refresh' style='color:green'></i> 清除本地缓存",
            content : "确定删除本地设置缓存信息吗?",
            buttons : '[否][是]'
        }, function(ButtonPressed) {
            if (ButtonPressed == "是" && localStorage) {
                localStorage.clear();
                location.reload()
            }
        });
    },
    render: function () {
        return (
            <span id="refresh" className="btn btn-ribbon" onClick={this.resetWidgets}>
                <i className="fa fa-refresh" />
            </span>
        )
    }
});

export default ResetWidgets
