import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import {Link} from 'react-router'
// import DepartStore from './../stores/DepartStore'
import BigBreadcrumbs from '../../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
// import DepartEdit from './DepartEdit.jsx'
import RoleAdd from './RoleAdd.jsx'
import RoleEdit from './RoleEdit.jsx'
import RoleRank from './RoleRank.jsx'
// import StaffStore from '../../staff/stores/StaffStore'
// import StaffAction from '../../staff/actions/StaffAction'
import DepartStaffList from '../../depart/components/DepartStaffList.jsx'
let Projects = React.createClass({
  getInitialState:function(){
    return { data:[]}
  },
  componentWillMount: function(){
      $.getJSON('api/company/role.json').then(function(data){
          this.setState(data)
      }.bind(this))
  },
  componentDidMount : function() {
 },

  render: function() {
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <div className="col-sm-3">
              <article >
                  <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
                      <header>
                          <span className="widget-icon"> <i className="fa fa-sitemap"/> </span>
                          <h2>公司信息 </h2>
                      </header>

                      <div>
                        <div className="row " style={{"margin":"5px"}}>
                          <RoleAdd/>
                          <RoleEdit/>
                          <RoleRank/>
                          <div className="col-sm-6">
                             <button className="btn btn-primary btn-block" data-toggle="modal"
                                data-target="#RoleAdd">
                               <i className="fa fa-plus fa-lg"></i>
                               <strong>&nbsp;新增角色</strong>
                             </button>
                          </div>
                          <div className="col-sm-6">
                            <button className="btn btn-primary btn-block" data-toggle="modal"
                              data-target="#RoleEdit">
                              <i className="fa fa-pencil fa-lg"></i>
                              <strong>&nbsp;编辑角色</strong>
                            </button>
                          </div>
                        </div>
                        <div className="row " style={{"margin":"5px"}}>
                          <div className="col-sm-6">
                             <button className="btn btn-primary btn-block" data-toggle="modal"
                                data-target="#RoleRank">
                               <i className="fa fa-pencil fa-lg"></i>
                               <strong>&nbsp;权限设置</strong>
                             </button>
                          </div>
                          <div className="col-sm-6">
                            <button className="btn btn-primary btn-block" data-toggle="modal"
                              data-target="#Role">
                              <i className="fa fa-trash-o fa-lg"></i>
                              <strong>&nbsp;删除角色</strong>
                            </button>
                          </div>
                        </div>
                          <div className="widget-body no-padding" style={{height: '420px'}}>
                            <div >
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <p></p>
                              <div className="input-group pull-left ">
                                  <input type="text" className="form-control "/>
                                  <span className="input-group-addon btn btn-primary ">
                                      <span className="fa fa-search"/>
                                  </span>
                              </div>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-12">  <p></p></div>
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <ul className="list-group">
                              {
                                this.state.data.map(function(dat){
                                  return (
                                    <li className="list-group-item"  >{dat.roleName}</li>
                                  )
                                })
                              }
                            </ul>
                          </div>

                          </div>
                          </div>
                          {/* end widget content */}
                      </div>
                      {/* end widget div */}
                  </JarvisWidget>
                  {/* end widget */}
              </article>
            </div>
            <div className="col-sm-9">
              <DepartStaffList/>
            </div>
          </div>
        </WidgetGrid>

      </div>
    )
  }
});
export default Projects
