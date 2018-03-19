import React from 'react'
import TreeView from '../../../../components/ui/TreeView.jsx'
let Company = React.createClass({
  getInitialState: function(){
			return {
				visitCompany: []
			}
	},

	componentWillMount: function(){
			$.getJSON('api/ui/treeview.json').then(function(data){
					this.setState(data)
			}.bind(this))
	},

  componentDidMount: function(){
    $("#confirmVisitingCo").click(function(){
      var companys = $("#companyList input");
      $("#co div").empty();
      for(var i = 0; i < companys.length; i++){
        if(companys[i].checked == true){
          $("#co div").prepend("<span class='tag label label-info'>"+companys[i].value+"<span data-role='remove'></span></span>");
        }
      }
      $("#co div .label-info span").click(function(){
        var endIndex = $(this).parent()[0].innerHTML.indexOf("<");
        var tagContent = $(this).parent()[0].innerHTML.substr(0,endIndex);
        $(this).parent().remove();
        var companys = $("#companyList input");
        for(var i = 0; i < companys.length; i++){
          if(companys[i].value == tagContent){
            companys[i].checked = false;
            document.getElementById("selectAllCompany").checked = false;
            break;
          }
        }
      });
    });

    $("#companyList").change(function(e){
      var counter = 0;
      var companys = $("#companyList input");
      var box = document.getElementById("selectAllCompany");
      for(var i = 0; i < companys.length; i++){
        if(companys[i].checked == true){
          counter++;
        }
      }

      if(counter == companys.length){
        box.checked = true;
      }else{
        box.checked = false;
      }
    });
  },
  selectAll:function(e){
    let checked = e.target.checked;    
    $('input:checkbox[name="checkbox-inline"]').prop('checked', checked);
		// var companys = $("#companyList input");
		// var box = document.getElementById("selectAllCompany");
		// if(box.checked){
		// 	// 展开节点以全部check上
		// 	for(var i = 0; i < companys.length; i++){
		// 		companys[i].checked = true;
		// 	}
		// }else{
		// 	for(var i = 0; i < companys.length; i++){
		// 		companys[i].checked = false;
		// 	}
		// }
	},
  render:function(){
    return(
      <div className="modal fade" id="visitCompany" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog">
							<div className="modal-content" style={{width:'50%',margin:"0 auto"}}>
									<div className="modal-header">
											<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
													&times;
											</button>
											<h4 className="modal-title" id="myModalLabel">来访公司选择</h4>
									</div>

									<div className="custom-scroll table-responsive" style={{height:'500px', overflowY: 'scroll'}}>            {/* treeview content */}
											<div className="widget-body">
													<div className="tree smart-form">
														<label style={{marginLeft:'5%'}} className="checkbox">
																<input id="selectAllCompany" onChange={this.selectAll} type="checkbox" name="checkbox-inline"/><i></i>全选</label>
																<TreeView id="companyList" items={this.state.visitCompany} role="tree" />
													</div>
											</div>
											{/* end treeview content */}
									</div>
									<div className="modal-footer">
											{/* <button type="button" className="btn btn-default" data-dismiss="modal">
													Cancel
											</button> */}
											<button id="confirmVisitingCo" type="button" className="btn btn-primary " data-dismiss="modal">
													确定
											</button>
									</div>
							</div>
					</div>
			</div>
    )
  }
});
export default Company
