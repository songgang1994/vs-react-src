import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import BigBreadcrumbs from '../../../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import UiValidate from '../../../../../components/forms/validation/UiValidate.jsx'
import Admin from './Admin.jsx'
import AdminDetaile from './AdminDetail.jsx'
let SetAccount = React.createClass({
  render:function(){
  return(

        <div id="content">

        <WidgetGrid>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-4">
                    <Admin></Admin>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-8">
                  <AdminDetaile></AdminDetaile>
            </div>
          </div>
        </WidgetGrid>
       </div>

  );
  }
});
export default SetAccount;
