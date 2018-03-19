/**
 * 部门树形列表画面
 * Created by yao on 2017/11/2
 */
import React from 'react'
// 导入部门获取action和store
import DepartTreeAction from '../actions/DepartTreeAction'
import DepartTreeStore from '../stores/DepartTreeStore'

let Department = React.createClass({
  // 画面初始state生成
  getInitialState: function(){
      //全局登录信息
      var companyId = JSON.parse(localStorage.getItem('user')).companyId;

			return {
				data: [],
        fullName:"",
        paramDepartId:0,
        companyId:companyId,
        hiddenDepartId:0
			}
	},

	componentWillMount: function(){
	},

  componentDidMount: function(){
    //1.画面控件事件绑定
		this._registerEventHandler();
    //2.监听部门数据获取事件，触发回调
    this.unsubscribeDepart = DepartTreeStore.listen(this._onDepartDataDone);
    //3.执行DepartTreeAction中的departList方法，发送获取部门数据请求
    DepartTreeAction.departList(this.state.companyId, this.state.paramDepartId);
  },

  componentWillUnmount: function() {
    //解除对_onDepartDataDone事件的监听
    this.unsubscribeDepart();
  },

  // 设置画面控件事件处理
	// 事件统一通过jQuery绑定
	// 代替HTML标签中写onXXX={this.XXX}
	_registerEventHandler: function(){
		//将this关键字换为me，否则报错，在此函数中使用this指向的组件
    let me = this;
    //确认部门赋值于input
    $("#confirmDepart").click(function(){
      $("#bumen").val(me.state.fullName);
      $("#bumen").attr("departId",me.state.hiddenDepartId);
    });

    //获取当前选择部门全名
    $("#jstree_demo").on('select_node.jstree', function(e, node){
      let fullName = node.node.text;   //当前选中节点的文本
      let parents = node.node.parents; //当前选中节点的父节点id数组
      let departId = node.node.id;     //当前选中的部门id
      console.log(node);
      for(let i = 0; i < parents.length; i++){
        if(parents[i] != "#"){
          fullName = $("#"+parents[i]+"_anchor")[0].text + fullName;
        }else{break;}
      }
      me.state.fullName = fullName;
      me.state.hiddenDepartId = departId;
    });

  },

  //部门数据获取
  _onDepartDataDone: function(result) {
    //获取登录用户的部门Id
    var departId = JSON.parse(localStorage.getItem('user')).departId
    //当部门Id不存在时，登录用户为公司管理员
    if (!departId) {
      //将部门Id设置为0
      departId = 0;
    }
    //申明node对象
    function Node(depart) {
      this.id = '';
      this.text = '';
      this.state = [];
      this.depart = depart;
      this.children = [];
    }
    //创建节点
    let nodeList = result.listData.map((depart) => {
      return new Node(depart)
    });
    //循环创建根节点
    let rootList = [];
    nodeList.forEach((node) => {
      //当departId为0时，根节点名称为公司名称
      if (node.depart.departId == departId) {
        rootList.push(node);
        node.id = node.depart.departId;
        node.text = node.depart.departName;
        node.state.opened = true;
      }
    });
    //获取根部门下的下属部门
    nodeList.forEach((node) => {
      for (let i = 0; i < nodeList.length; i++) {
        //当部门id等于部门parentDepartId时；
        if (node.depart.departId == nodeList[i].depart.parentDepartId) {
          node.children.push(nodeList[i]);
          nodeList[i].id = nodeList[i].depart.departId;
          nodeList[i].text = nodeList[i].depart.departName;
        }
      }
    });
    //根据数据，创建树形列表
    this._createTree(rootList);
  },

  //树形列表新建事件
  _createTree: function(RootNode) {
    $('#jstree_demo').jstree({
      //规定树形样式和参数
      "core": {
        "animation": 0,
        "check_callback": true,
        "themes": {
          "stripes": false
        },
        'data': RootNode
      },
      //对树形列表进行排序
      "sort": function(n1, n2) {
        if (!Number.isInteger(n1) || !Number.isInteger(n2)) {
          return -1;
        }
        let ref = $('#jstree_demo').jstree(true)
        let node1 = ref.get_node(n1);
        let node2 = ref.get_node(n2);
        return node1.original.depart.orderId > node2.original.depart.orderId
          ? 1
          : -1;
      },

      "plugins": [ "types", "dnd", "sort"]
    });

  },

  render:function(){
    return(
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content" style={{width:'50%',margin:"0 auto"}}>
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                      &times;
                  </button>
                  <h4 className="modal-title" id="myModalLabel">部门选择</h4>
                </div>

                <div className="custom-scroll table-responsive" style={{height:'500px', overflowY: 'scroll'}}>
                  <div className="widget-body">
                    <div className="tree smart-form">
                      <div id="jstree_demo"></div>  {/* treeview content */}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button id="confirmDepart" type="button" className="btn btn-primary " data-dismiss="modal">
                      确定
                  </button>
                </div>
              </div>
          </div>
      </div>
    )
  }
});
export default Department
