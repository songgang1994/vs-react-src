/**
 * 部门树形列表画面
 * Created by lihui on 2017/11/2.
 */

// 导入React组件
import React from 'react'

// ----------------------- 引用组件 ------------------------------ //
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'

//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';
//共通配置参数
let config = window.SMARTADMIN_GLOBALS;
//消息参数
let DepartMsg = window.MSG_GLOBALS.DepartMsg;

// ----------------------- 引用Action和Store --------------------- //
import DepartListStore from './../stores/DepartListStore'
import DepartIdStore from './../stores/DepartIdStore'
import DepartListAction from './../actions/DepartListAction'
let DepartList = React.createClass({

  // 画面初始state生成
  getInitialState: function() {
    return {data: []}
  },

  //画面渲染之后执行
  componentDidMount: function() {
    //监听部门数据处理事件
    this.unsubscribeDepart = DepartListStore.listen(this._onDepartDataDone);
    //根据登录公司id和部门id，获取树形列表数据
    let companyId = JSON.parse(localStorage.getItem('user')).companyId
    let departId = JSON.parse(localStorage.getItem('user')).departId
    let userType = localStorage.getItem('userType');
    if(!departId&&userType == "company-admin"){
      departId = 0;
    }
    DepartListAction.departList(companyId, departId);
  },

  componentWillUnmount: function() {
    // 1. 解除对_onDepartDataDone事件的监听
    this.unsubscribeDepart();
  },

  //部门数据处理
  _onDepartDataDone: function(result) {
    //获取登录用户的部门Id
    let departId = JSON.parse(localStorage.getItem('user')).departId
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
    })
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
          "stripes": true
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
      //右击菜单设置
      'contextmenu': {
        "items": {
          "Create": {
            "label": "新增",
            "action": function(data) {
              let ref = $('#jstree_demo').jstree(true),
                //获取点击节点主键
                sel = ref.get_selected();
              //当为空时，返回false
              if (!sel.length) {
                return false;
              }
              //新建子节点
              let nodeId = ref.create_node(sel[0]);
              if (nodeId) {
                ref.edit(nodeId);
              }
            }
          },
          "Edit": {
            "label": "修改",
            "action": function(data) {
              let ref = $('#jstree_demo').jstree(true),
                sel = ref.get_selected();
              if (!sel.length) {
                return false;
              }
              let nodeId = sel[0];
              //rename_node方法结束后，进入编辑事件
              NodeEdit(ref, nodeId);
            }
          },
          "Delete": {
            "label": "删除",
            "action": function(data) {
              let ref = $('#jstree_demo').jstree(true),
                sel = ref.get_selected();
              if (!sel.length) {
                return false;
              }
              //执行删除事件
              ref.delete_node(sel[0]);
            }
          }
        }
      },
      "plugins": ["contextmenu", "types", "dnd", "sort"]
    })
    //节点点击事件
    $("#jstree_demo").on("changed.jstree", function(e, data) {
      //当点击节点存在的场合
      if (data.selected.length) {
        //传递点击节点的departId
        DepartIdStore.SetDepartId(data.selected[0]);
      } //输出点击的内容
    });
    //节点新增事件
    $("#jstree_demo").on("create_node.jstree", function(e, data) {
      //获取树节点
      let ref = $('#jstree_demo').jstree(true);
      //获取node数据
      let node = data.node;
      node.original['vs-state'] = "temp",
      //rename_node结束后执行，新增
      node.original['vs-callback'] = function(departName, node) {
        // 获取父节点Id
        let parentDepartId = data.parent;
        //当父节点Id不是number型，将id设为0
        if (!Number.isInteger(parseInt(parentDepartId))) {
          parentDepartId = "0";
        }
        //获取登录公司Id
        let companyId = JSON.parse(localStorage.getItem('user')).companyId
        let depart = {
          parentDepartId: parentDepartId,
          departName: departName,
          companyId: companyId
        }
        //执行新增Action
        DepartListAction.departAdd(depart, function(result) {
          switch (result.rtnCode) {
              //后台执行成功的场合，设置新增节点Id
            case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
              let newDepart = result.data
              //将新增节点Id设置为后台返回Id
              ref.set_id(node, newDepart.departId);
              node.original.text = newDepart.departName;
              node.original.depart = newDepart;
              delete node.original['vs-state'];
              delete node.original['vs-callback'];
              VsUtil.ShowHintDialog({content: DepartMsg.Msg001});
              break;
            default:
              //后台验证失败的场合，删除节点
              ref.delete_node(nodeId);
              VsUtil.ShowHintDialog({content: DepartMsg.Msg002});
          }
        }, function() {
          //执行失败的场合，删除节点
          ref.delete_node(nodeId);
          VsUtil.ShowHintDialog({content: DepartMsg.Msg002});
        })
      }
    });
    //修改节点事件
    let NodeEdit = function(ref, nodeId) {
      let departId = JSON.parse(localStorage.getItem('user')).departId
      //当nodeId不是整数时，为公司名称节点
      if (!Number.isInteger(parseInt(nodeId)) || nodeId == departId) {
        VsUtil.ShowHintDialog({content: DepartMsg.Msg011});
        return;
      }
      //rename_node结束后执行，修改事件
      ref.edit(nodeId, null, function(node, succeed, canceled) {
        //获取修改节点
        let orig = node.original;
        //获取修改前名称
        let origDepartName = orig.text;
        //获取修改后名称
        let newDepartName = node.text.trim();
        //判断名称是否重复
        if (isDuplicated(newDepartName, node) || newDepartName.length > 64) {
          //如果名称重复，返回原名称
          VsUtil.ShowHintDialog({content: DepartMsg.Msg009});
          ref.set_text(nodeId, origDepartName);
          return;
        }
        //当修改成功确认，且新编辑名称与原名称不同的场合
        if (succeed && !canceled && newDepartName != origDepartName) {
          //连接后台，修改数据
          DepartListAction.departUpd(node.id, newDepartName, function(result) {
            switch (result.rtnCode) {
              case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
                VsUtil.ShowHintDialog({content: DepartMsg.Msg003});
                break;
              default:
                VsUtil.ShowHintDialog({content: DepartMsg.Msg004});
                //当修改验证失败的场合，返回
                ref.set_text(nodeId, origDepartName);
            }
          }, function() {
            VsUtil.ShowHintDialog({content: DepartMsg.Msg004});
            //执行失败的场合
            ref.set_text(nodeId, origDepartName);
          });
        }
      });
    }
    //拖拽事件处理
    $("#jstree_demo").on("move_node.jstree", function(e, data) {
      //获取主键id
      let departId = data.node.id;
      //获取拖拽后parentid
      let newParentDepartId = data.parent == '#'
        ? 0
        : data.parent;
      //获取拖拽前parentid
      let oldParentDepartId = data.old_parent == '#'
        ? 0
        : data.old_parent;
      //获取拖拽前orderId
      let oldOrderId = data.old_position;
      //获取拖拽后orderId
      let newOrderId = data.position;
      // 重复判断
      if (isDuplicated(data.node.text.trim(), data.node)) {
        //节点名称重复的场合，删除节点
        VsUtil.ShowHintDialog({content: DepartMsg.Msg010});
        data.instance.refresh();
        return;
      }
      //执行拖拽数据操作
      let companyId = JSON.parse(localStorage.getItem('user')).companyId
      let departDto = {
        departId: departId,
        oldParentDepartId: oldParentDepartId,
        newParentDepartId: newParentDepartId,
        oldOrderId: oldOrderId,
        newOrderId: newOrderId,
        companyId: companyId
      }
      //执行拖拽Action
      DepartListAction.departDrag(departDto, function(result) {
        switch (result.rtnCode) {
          case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
            VsUtil.ShowHintDialog({content: DepartMsg.Msg005});
            break;
          default:
            VsUtil.ShowHintDialog({content: DepartMsg.Msg006});
            data.instance.refresh();
        }
      }, function() {
        //失败的场合，刷新列表
        VsUtil.ShowHintDialog({content: DepartMsg.Msg006});
        data.instance.refresh();
      });
    })
    //删除事件处理
    $("#jstree_demo").on("delete_node.jstree", function(e, data) {
      let loginId = JSON.parse(localStorage.getItem('user')).departId
      let node = data.node;
      let departId = data.node.id
      let departName = node.text.trim();
      //当执行删除操作
      if (Number.isInteger(parseInt(departId))&&departId != loginId) {
        DepartListAction.departDelete(departId, function(result) {
          switch (result.rtnCode) {
            case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
              VsUtil.ShowHintDialog({content: DepartMsg.Msg007});
              break;
            default:
              //当删除失败的场合，回复删除节点
              ref.set_text(departId, departName);
              VsUtil.ShowHintDialog({content: DepartMsg.Msg008});
              return;
          }
        }, function() {
          //当删除失败的场合，回复删除节点
          ref.set_text(departId, departName);
          VsUtil.ShowHintDialog({content: DepartMsg.Msg008});
          return;
        })
      } else{
        VsUtil.ShowHintDialog({content: DepartMsg.Msg012});
        data.instance.refresh();
        return;
      }
    });
    //节点名称重复判断
    let isDuplicated = function(departName, node) {
      let ref = $('#jstree_demo').jstree(true);
      let texts = [];
      //获取同级所有节点名称
      ref.get_node(node.parent).children.forEach(function(e) {
        texts.push(ref.get_node(e).text);
      })
      let cnt = 0;
      //计算同名个数
      texts.forEach(function(e) {
        if (e == departName) {
          cnt++;
        }
      })
      return cnt > 1;
    }
    //节点名称编辑事件
    $("#jstree_demo").on("rename_node.jstree", function(e, data) {
      let ref = $('#jstree_demo').jstree(true);
      let node = data.node;
      //判断vs-state
      if ($.isPlainObject(node.original) && node.original['vs-state'] == 'temp') {
        //获取输入节点名称
        let departName = node.text.trim();
        // 重复判断以及名称长度判断
        if (isDuplicated(departName, node) || departName.length > 64) {
          //节点名称重复的场合，删除节点
          data.instance.refresh();
          VsUtil.ShowHintDialog({content: DepartMsg.Msg009});
          return;
        }
        // node.original.text = data.old
        //将输入名称与原名称，返回到修改或编辑事件
        node.original['vs-callback'](departName, node);
      }
      //当名称未做修改时
      if(node.text.trim() == data.old){
        node.original.text = data.old;
      }
    });
  },

  //画面渲染
  render: function() {
    return (
      <div>
        {/* JarvisWidget start：局部页面设置 */}
        <JarvisWidget className="well" colorbutton={false} sortable={false} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
          {/*header start:画面头部设计 */}
          <header>
            <span className="widget-icon">
              <i className="fa fa-sitemap"/>
            </span>
            <h2>部门</h2>
          </header>
          {/*header end */}
          {/* body start*/}
          <div style={{
            padding: "7px 2px 0"
          }}>
            {/* 设置下拉功能 */}
            <div className="widget-body" style={{
              overflow: "auto",
              height: '554px'
            }}>
              <div id="jstree_demo"></div>
            </div>
          </div>
          {/* body end*/}
        </JarvisWidget>
        {/* JarvisWidget end */}
      </div>
    )
  }
});
export default DepartList
