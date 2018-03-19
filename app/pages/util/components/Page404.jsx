import React from 'react'


let Page404 = React.createClass({
    render: function () {
        return (
            <div id="content">
                {/* row */}
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="text-center error-box">
                                    <h1 className="error-text-2 bounceInDown animated"> Error 404 <span className="particle particle--c"/><span className="particle particle--a"/><span className="particle particle--b"/></h1>

                                    <h2 className="font-xl"><strong><i className="fa fa-fw fa-warning fa-lg text-warning"/> 页面不存在</strong></h2>
                                    <br/>

                                    <p className="lead">
                                      找不到您所要求的页面，请联系您的网站管理员或再试一次。<br />
                                      使用你的浏览器<b>回退</b>按钮来浏览你的前一个页面。
                                    </p>

                                    {/* <p className="font-md">
                                        <b>... That didn't work on you? Dang. May we suggest a search, then?</b>
                                    </p> */}
                                    <br/>

                                    {/* <div className="error-search well well-lg padding-10">
                                        <div className="input-group">
                                            <input className="form-control input-lg" type="text" placeholder="let's try this again" id="search-error"/>
                                            <span className="input-group-addon"><i className="fa fa-fw fa-lg fa-search"/></span>
                                        </div>
                                    </div> */}
                                    {/* <div className="row">
                                        <div className="col-sm-12">
                                            <ul className="list-inline">
                                                <li>
                                                    &#xA0;<a href-void="">Dashbaord</a>&#xA0;
                                                </li>
                                                <li>
                                                    .
                                                </li>
                                                <li>
                                                    &#xA0;<a href-void="">Inbox (14)</a>&#xA0;
                                                </li>
                                                <li>
                                                    .
                                                </li>
                                                <li>
                                                    &#xA0;<a href-void="">Calendar</a>&#xA0;
                                                </li>
                                                <li>
                                                    .
                                                </li>
                                                <li>
                                                    &#xA0;<a href-void="">Gallery</a>&#xA0;
                                                </li>
                                                <li>
                                                    .
                                                </li>
                                                <li>
                                                    &#xA0;<a href-void="">My Profile</a>&#xA0;
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end row */}
                </div>
            </div>
        )
    }
});

export default Page404
