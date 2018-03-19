import Reflux from 'reflux'

let AdminAction = Reflux.createActions({
    init: {asyncResult: true},
    chooseAdmin : {},
    addAdmin:{},
    showpwd:{}
});

AdminAction.init.listen(function () {
    $.getJSON('api/admin.json').then(function(data){
        this.setState(data)
    }.bind(this))
});

//选择公司(不能删)
AdminAction.chooseAdmin.listen(function (company) {
   //alert(company);
});
AdminAction.addAdmin.listen(function(){
  //alert("addAdmin")
})
AdminAction.showpwd.listen(function(){
  //alert("addAdmin")
})

export default AdminAction
