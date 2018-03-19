import React from 'react'
import Reflux from 'reflux'

let RoleRank = React.createClass({
  // mixins: [Reflux.connect(testStore)],
  // getInitialState: function() {
  //   return testStore.getData()
  // },
  // componentDidMount: function() {
  //   // const id = this.props.params.userId
  //   // var usrid = this.state.id
  //   // console.log(usrid)
  //   var userid = testStore.getUserId();
  //   testActions.edit(userid);
  // },
  _selectAll : function(){
    if($("#allCheckbox")[0].checked == true){
      $("#signupForm label").addClass("btn btn-primary");
    }else{
      $("#signupForm label").removeClass("btn-primary");
    }
    this._rankHide();
  },
  _visite : function(){
    if($("#visiteCheckbox")[0].checked==true){
      this._rankHide();
      $("#visiteRank")[0].style.display = "block";
    } else {
      $("#visiteRank")[0].style.display = "none";
    }
  },
  _invite : function(){
    if($("#inviteCheckbox")[0].checked==true){
      this._rankHide();
      $("#inviteRank")[0].style.display = "block";
    } else {
      $("#inviteRank")[0].style.display = "none";
    }
  },
 _person : function(){
   if($("#personCheckbox")[0].checked==true){
     this._rankHide();
     $("#personRank")[0].style.display = "block";
   } else {
     $("#personRank")[0].style.display = "none";
     $("#staffRank")[0].style.display  = "none";
     $("#visitorRank")[0].style.display = "none";
   }
 },
 _staff : function(){
   if($("#staffCheckbox")[0].checked==true){
     this._rankHide();
     $("#personRank")[0].style.display = "block";
     $("#staffRank")[0].style.display = "block";
   } else {
     $("#staffRank")[0].style.display = "none";
   }
 },
 _visitor : function(){
   if($("#visitorCheckbox")[0].checked==true){
     this._rankHide();
     $("#personRank")[0].style.display = "block";
     $("#visitorRank")[0].style.display = "block";
   } else {
     $("#visitorRank")[0].style.display = "none";
   }
 },
 _rankHide : function(){
   $("#visiteRank")[0].style.display = "none";
   $("#inviteRank")[0].style.display = "none";
   $("#personRank")[0].style.display = "none";
   $("#staffRank")[0].style.display  = "none";
   $("#visitorRank")[0].style.display = "none";
 },
  render: function() {
    return (
      <div className="modal fade" id="RoleRank" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{"width":"400px"}}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h4 className="modal-title" id="myModalLabel">
                权限设置
              </h4>
            </div>
            <div className="modal-body">
              <div className="ibox-content">
                <form className="form-horizontal m-t" id="signupForm" noValidate="novalidate">
                  <fieldset>
                    <div className="form-group">
                      <div className="col-sm-3 col-lg-3">
                        <div className="btn-group" data-toggle="buttons">
                        <label id="selectAll" className="btn btn-default" onClick={this._selectAll}>
                          <input type="checkbox" id="allCheckbox" value="面试" />
                          全选
                        </label>
                      </div>
                      </div>
                      <div className="col-sm-8 col-lg-8">
                        <div className="btn-group" data-toggle="buttons">
                          <label id="approve" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="面试"/>
                            审批
                          </label>
                          <label id="visite" className="btn btn-default" onClick={this._visite}>
                            <input type="checkbox" id="visiteCheckbox" value="商务"/>
                            访客
                          </label>
                          <label id="invite" className="btn btn-default" onClick={this._invite}>
                            <input type="checkbox" id="inviteCheckbox" value="私人"/>
                            邀请
                          </label>
                          <label id="person" className="btn btn-default" onClick={this._person}>
                            <input type="checkbox" id="personCheckbox" value="其他"/>
                            人员
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset id="visiteRank" style={{"display":"none"}}>
                    <div className="form-group">
                      <div className="col-sm-3 col-lg-3"></div>
                      <div className="col-sm-8 col-lg-8">
                        <div className="btn-group" data-toggle="buttons">
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="面试"/>
                            签到&nbsp;/&nbsp;签离
                          </label>
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="商务"/>
                            导出
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset id="inviteRank" style={{"display":"none"}}>
                    <div className="form-group">
                      <div className="col-sm-3 col-lg-3"></div>
                      <div className="col-sm-8 col-lg-8">
                        <div className="btn-group" data-toggle="buttons">
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="面试"/>
                            详细
                          </label>
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="商务"/>
                            编辑
                          </label>
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="商务"/>
                            取消
                          </label>
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="商务"/>
                            删除
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset id="personRank" style={{"display":"none"}}>
                    <div className="form-group">
                      <div className="col-sm-3 col-lg-3"></div>
                      <div className="col-sm-8 col-lg-8">
                        <div className="btn-group" data-toggle="buttons">
                          <label name="staff" className="btn btn-default" onClick={this._staff}>
                            <input type="checkbox" id="staffCheckbox" value="面试"/>
                            员工
                          </label>
                          <label name="visitor" className="btn btn-default" onClick={this._visitor}>
                            <input type="checkbox" id="visitorCheckbox" value="商务"/>
                            访客
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset id="staffRank" style={{"display":"none"}}>
                    <div className="form-group">
                      <div className="col-sm-3 col-lg-3"></div>
                      <div className="col-sm-8 col-lg-8">
                        <div className="btn-group" data-toggle="buttons">
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="面试"/>
                            查看
                          </label>
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="商务"/>
                            编辑
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset id="visitorRank" style={{"display":"none"}}>
                    <div className="form-group">
                      <div className="col-sm-3 col-lg-3"></div>
                      <div className="col-sm-8 col-lg-8">
                        <div className="btn-group" data-toggle="buttons">
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="面试"/>
                            查看
                          </label>
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="商务"/>
                            新增
                          </label>
                          <label name="labels" className="btn btn-default">
                            <input type="checkbox" name="来访事由[]" value="商务"/>
                            编辑
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">确定
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">
                取消
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  }
});

export default RoleRank
