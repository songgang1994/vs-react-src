/**
 * 预约信息画面
 * Created by songgang on 2017/11/11.
 */
import React from 'react'
import {Alert} from 'react-bootstrap'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'

import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import Timepicker from '../../../../../components/forms/inputs/Timepicker.jsx'
//表单验证组件
import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
//导入共通函数
import Visitors from '../../../company/visitor/components/Visitors.jsx'

let Reservationinfo = React.createClass({

  render: function () {

    return (

        <div id="Conte">
          <WidgetGrid>
            <div className="row  col-md-12">
              {/* <article className="col-sm-12"> */}
                <JarvisWidget editbutton={false} colorbutton={false} sortable={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                  <header>
                    <h2>预约信息通知</h2>
                  </header>
                  <div>
                    <div className="widget-body">
                        <form id="smart-form-register" className="smart-form" noValidate="novalidate" onSubmit={this._onSubmit}>
                          <fieldset >
                            <section>

                              <div className="row">
                                      <section className="col col-6">
                                          <label className="input">
                                            <i className="fa fa-exclamation"/> &nbsp;&nbsp;
                                            通知：手机号码为15888888888的访客李晓明的预约信息已被被访人同意!
                                          </label>
                                      </section>
                                      <section className="col col-6">
                                        <label className="input">
                                            2017-09-08  09:36
                                        </label>
                                      </section>
                              </div>

                                <div className="row">
                                        <section className="col col-6">
                                            <label className="input">
                                              <i className="fa fa-exclamation"/> &nbsp;&nbsp;
                                              通知：手机号码为15888888888的访客李晓明的预约信息已被被访人同意!
                                            </label>
                                        </section>
                                        <section className="col col-6">
                                          <label className="input">
                                              2017-09-08  09:36
                                          </label>
                                        </section>
                                </div>

                                <div className="row">
                                        <section className="col col-6">
                                            <label className="input">
                                              <i className="fa fa-exclamation"/> &nbsp;&nbsp;
                                              通知：手机号码为15888888888的访客李晓明的预约信息已被被访人同意!
                                            </label>
                                        </section>
                                        <section className="col col-6">
                                          <label className="input">
                                              2017-09-08  09:36
                                          </label>
                                        </section>
                                </div>

                                <div className="row">
                                        <section className="col col-6">
                                            <label className="input">
                                              <i className="fa fa-exclamation"/> &nbsp;&nbsp;
                                              通知：手机号码为15888888888的访客李晓明的预约信息已被被访人同意!
                                            </label>
                                        </section>
                                        <section className="col col-6">
                                          <label className="input">
                                              2017-09-08  09:36
                                          </label>
                                        </section>
                                </div>

                                <div className="row">
                                        <section className="col col-6">
                                            <label className="input">
                                              <i className="fa fa-exclamation"/> &nbsp;&nbsp;
                                              通知：手机号码为15888888888的访客李晓明的预约信息已被被访人同意!
                                            </label>
                                        </section>
                                        <section className="col col-6">
                                          <label className="input">
                                              2017-09-08  09:36
                                          </label>
                                        </section>
                                </div>

                            </section>
                          </fieldset>
                        </form>

                		</div>
                  </div>
                </JarvisWidget>
              {/* </article> */}
            </div>
          </WidgetGrid>
        </div>

    )
  }
});
export default Reservationinfo
