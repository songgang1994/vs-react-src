/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'
import CompanyActions from '../actions/CompanyActions.js'

let CompanyStore = Reflux.createStore({
    listenables: CompanyActions,
    init: function() {
        this.data = {
            loginName: ""
        }
    },
    onChooseCompany: function(result) {
        // 当选择公司时，刷新公司详细信息
        this.trigger({company: result,
          firstIn: false
        }
      );
    },
    onAddCompany: function(){
        this.trigger({
            company: [],
            firstIn: false
          });
    }

});

export default CompanyStore
