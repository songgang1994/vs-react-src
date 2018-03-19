import React from 'react'

import _ from 'lodash'

import SubHeader from '../layout/SubHeader.jsx'
import BigBreadcrumbs from '../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../components/layout/widgets/JarvisWidget.jsx'

import Datatable from '../../../components/tables/Datatable.jsx'


export default ()=>(
    <div id="content">
        <div className="row">
            <BigBreadcrumbs items={['E-Commerce', 'Orders']} icon="fa fa-fw fa-shopping-cart"
                            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
            <SubHeader />
        </div>

        <WidgetGrid>


            <div className="row">
                <article className="col-sm-12">

                    <JarvisWidget editbutton={false} color="blueDark">
                        <header><span className="widget-icon"> <i className="fa fa-table"/> </span> <h2>Column
                            Filters </h2></header>
                        <div>
                            <div className="widget-body no-padding"><Datatable
                                options={{
                                    ajax: 'http://10.30.100.54:8088/vs-api/util/login/init',
                                     columns: [
                                     {data: "loginName"},
                                     {data: "loginPassword"}
                                      ]
                                  }}
                                filter={true} className="table table-striped table-bordered" width="100%">

                                <thead>
                                <tr>
                                    <th className="hasinput" style={{width:'10%'}}>
                                        <input type="text" className="form-control" placeholder="Find loginName"/>
                                    </th>
                                    <th className="hasinput" style={{width:'12%'}}>
                                        <input type="text" className="form-control" placeholder="Filter loginPassword"/>
                                    </th>


                                </tr>
                                <tr>
                                    <th data-class="expand">loginName</th>
                                    <th>loginPassword</th>
                                </tr>
                                </thead>
                            </Datatable>
                            </div>
                        </div>
                    </JarvisWidget>
                </article>
            </div>
        </WidgetGrid>
    </div>

)
