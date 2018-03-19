import React from 'react'

import UiValidate from '../../../components/forms/validation/UiValidate.jsx'
import LoadHtml from '../../../components/utils/LoadHtml.jsx'

let Register = React.createClass({
    render: function () {
        return (
            <div id="extr-page" >
                <header id="header" className="animated fadeInDown">

                    <div id="logo-group">
                        <span id="logo"> <img src="styles/img/logo.png" alt="SmartAdmin"/> </span>
                    </div>

    <span id="extr-page-header-space">
        <span className="hidden-mobile hiddex-xs">已经注册过?</span>&nbsp;<a href="#login" className="btn btn-danger">登录</a> </span>

                </header>
                <div id="main" role="main" className="animated fadeInDown">

                    {/* MAIN CONTENT */}
                    <div id="content" className="container">

                        <div className="row">
                            {/* <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 hidden-xs hidden-sm">
                                <h1 className="txt-color-red login-header-big">SmartAdmin</h1>
                                <div className="hero">

                                    <div className="pull-left login-desc-box-l">
                                        <h4 className="paragraph-header">It's Okay to be Smart. Experience the simplicity of SmartAdmin, everywhere you go!</h4>
                                        <div className="login-app-icons">
                                            <a href="#/dashboard" className="btn btn-danger btn-sm">Frontend Template</a>
                                            <span> </span>
                                            <a href="#/smartadmin/different-versions.html" className="btn btn-danger btn-sm">Find out more</a>
                                        </div>
                                    </div>

                                    <img src="styles/img/demo/iphoneview.png" alt="" className="pull-right display-image" style={{width:'210px'}}/>

                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        <h5 className="about-heading">About SmartAdmin - Are you up to date?</h5>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        <h5 className="about-heading">Not just your average template!</h5>
                                        <p>
                                            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi voluptatem accusantium!
                                        </p>
                                    </div>
                                </div>

                            </div> */}
                            <div>
                                <div className="well no-padding">

                                    <form action="#/dashboard" id="smart-form-register" className="smart-form client-form">
                                        <header>
                                            公司员工注册
                                        </header>

                                        <fieldset>
                                          <section>
                                              <label className="label">选择公司</label>
                                              <label className="select">
                                                  <select className="input-lg">
                                                      <option value="0">南通苏慧信息技术有限公司</option>
                                                      <option value="1">新晨海</option>
                                                      <option value="2">慧识永创</option>
                                                  </select> <i/> </label>
                                          </section>

                                          <section>
                                              <label className="label">选择部门</label>
                                              <label className="select">
                                                  <select className="input-lg">
                                                      <option value="0">营业部</option>
                                                      <option value="1">开发部</option>
                                                      <option value="2">其他</option>
                                                  </select> <i/> </label>
                                          </section>

                                            <section>
                                                <label className="input"> <i className="icon-append fa fa-user"/>
                                                    <input type="text" name="username" placeholder="登录用户名"/>
                                                    <b className="tooltip tooltip-bottom-right">用户登录时使用</b> </label>
                                            </section>

                                            <section>
                                                <label className="input"> <i className="icon-append fa fa-lock"/>
                                                    <input type="password" name="password" placeholder="登录密码" id="password"/>
                                                    <b className="tooltip tooltip-bottom-right">用户登录时使用</b> </label>
                                            </section>

                                            <section>
                                                <label className="input"> <i className="icon-append fa fa-lock"/>
                                                    <input type="password" name="passwordConfirm" placeholder="确认密码"/>
                                                    <b className="tooltip tooltip-bottom-right">请与上面输入的密码一致</b> </label>
                                            </section>

                                            <section>
                                                <label className="input">
                                                    <input type="text" name="truename" placeholder="真实姓名"/>
                                                    <b className="tooltip tooltip-bottom-right">请输入真实姓名，以便顺利通过公司管理员审核</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="input"> <i className="icon-append fa fa-envelope"/>
                                                    <input type="email" name="email" placeholder="电子邮箱"/>
                                                    <b className="tooltip tooltip-bottom-right">验证账户，忘记密码时使用</b> </label>
                                            </section>

                                            <section>
                                                <label className="input"> <i className="icon-append fa fa-envelope"/>
                                                    <input type="email" name="email" placeholder="手机号"/>
                                                    <b className="tooltip tooltip-bottom-right">手机号</b> </label>
                                            </section>

                                            <section>
                                                <label className="label">头像照片</label>

                                                <div className="input input-file">
                                                    <span className="button"><input type="file" id="file"
                                                                                    name="file"
                                                                                    onchange="this.parentNode.nextSibling.value = this.value"/>浏览</span><input
                                                    type="text" placeholder="头像照片文件" readOnly/>
                                                </div>
                                            </section>

                                            <section>

                                            <img name="preview" src="" id="preview" width="200px" height="250px"/>
                                            </section>


                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                {/* <section>
                                                    <label className="input">
                                                        <input type="text" name="truename" placeholder="真实姓名"/>
                                                    </label>
                                                </section> */}
                                                {/* <section className="col col-6">
                                                    <label className="input">
                                                        <input type="text" name="lastname" placeholder="Last name"/>
                                                    </label>
                                                </section> */}
                                            </div>

                                            {/* <div className="row">
                                                <section className="col col-6">
                                                    <label className="select">
                                                        <select name="gender" defaultValue={"0"}>
                                                            <option value="0" disabled={true}>Gender</option>
                                                            <option value="1">Male</option>
                                                            <option value="2">Female</option>
                                                            <option value="3">Prefer not to answer</option>
                                                        </select> <i/> </label>
                                                </section>
                                                <section className="col col-6">
                                                    <label className="input"> <i className="icon-append fa fa-calendar"/>
                                                        <input type="text" name="request" placeholder="Request activation on" className="datepicker" data-dateformat="dd/mm/yy"/>
                                                    </label>
                                                </section>
                                            </div> */}

                                            <section>
                                                {/* <label className="checkbox">
                                                    <input type="checkbox" name="subscription" id="subscription"/>
                                                    <i/>I want to receive news and special offers</label> */}
                                                <label className="checkbox">
                                                    <input type="checkbox" name="terms" id="terms"/>
                                                    <i/>我同意 <a href="#" data-toggle="modal" data-target="#myModal"> 条款和条件 </a></label>
                                            </section>
                                        </fieldset>
                                        <footer>
                                            <button type="submit" className="btn btn-primary">
                                                注册
                                            </button>
                                        </footer>

                                        <div className="message">
                                            <i className="fa fa-check"/>
                                            <p>
                                                谢谢您的注册!
                                            </p>
                                        </div>
                                    </form>

                                </div>
                                {/* <p className="note text-center">*FREE Registration ends on October 2015.</p> */}
                                {/* <h5 className="text-center">- Or sign in using -</h5>
                                <ul className="list-inline text-center">
                                    <li>
                                        <a href-void="" className="btn btn-primary btn-circle"><i className="fa fa-facebook"/></a>
                                    </li>
                                    <li>
                                        <a href-void="" className="btn btn-info btn-circle"><i className="fa fa-twitter"/></a>
                                    </li>
                                    <li>
                                        <a href-void="" className="btn btn-warning btn-circle"><i className="fa fa-linkedin"/></a>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Modal */}
                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    &times;
                                </button>
                                <h4 className="modal-title" id="myModalLabel">条款 & 条件</h4>
                            </div>
                            <div className="modal-body custom-scroll terms-body">

                                <LoadHtml url="html/smartadmin/terms-and-conditions.html" />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" id="i-agree">
                                    <i className="fa fa-check"/> 我同意
                                </button>

                                <button type="button" className="btn btn-danger pull-left" id="print">
                                    <i className="fa fa-print"/> 打印
                                </button>
                            </div>
                        </div>{/* /.modal-content */}
                    </div>{/* /.modal-dialog */}
                </div>{/* /.modal */}
            </div>
        )
    }
});

export default Register
