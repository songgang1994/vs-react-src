/**
 * 邀请详细画面
 * Created by caowj on 2017/11/15.
 */
import React from 'react'

import Reflux from 'reflux'
import UiTabs from '../../../../../components/ui/UiTabs.jsx'
import WidgetGrid from '../../../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../../../components/layout/widgets/JarvisWidget.jsx'
import DetailStore from '../stores/DetailStore.js'
import UiDatepicker from '../../../../../components/forms/inputs/UiDatepicker.jsx'
import Datatable from '../../../../../components/tables/Datatable.jsx'
import InvitedetailshowStore from '../stores/InvitedetailshowStore'
import InvitedetailAction from './../actions/InvitedetailAction.js'

let Invitedetail = React.createClass({

  getInitialState: function() {
    return {id: ""}
  },

  componentWillMount:function(){
     //取邀请一览画面的inviteid
     let  Id = this.props.params.Id;
     InvitedetailAction.getId(Id);
  },
  // 画面渲染之后
  componentDidMount:function(){

     this.unsubscribe = InvitedetailshowStore.listen(this._onGetIdCompleted);

  },

  componentWillUnmount: function() {
    // 解除对inviteId获取事件的监听
    this.unsubscribe();
  },

  _onGetIdCompleted:function(result){
      //取除datable的值
      let departname = result.data.departName;
      let staffname = result.data.staffName;
      let address = result.data.address ;
      let memo = result.data.memo;
      let invitetype =result.data.inviteType;
      let roomname = result.data.roomName;
      let invitedate = result.data.inviteDate;
      let invitestart = result.data.inviteBeginTime;
      let inviteend = result.data.inviteEndTime;
      let roomstart = result.data.roomStarttime;
      roomstart =roomstart.substring(0,16);
      let roomend = result.data.roomEndtime;
      roomend = roomend.substring(11,16);
      let listdata = result.data.visitorInfo;
      let inviteid = result.data.inviteId;
      let type;
      if (invitetype == 0) {
        type = "面试"
      } else if (invitetype == 1) {
        type = "商务"
      } else if (invitetype == 2) {
        type = "私人"
      } else if (invitetype == 3) {
        type = "其他"
      }
     let checkstatus;
     let checkstate =result.data.checkstate;
     if (checkstate == 0) {
       checkstatus = "未审核"
     } else if (checkstate == 1) {
       checkstatus = "审核通过"
     } else if (checkstate == 2) {
       checkstatus = "审核不通过"
     }
      this.setState({departname:departname});
      this.setState({staffname:staffname});
      this.setState({address:address});
      this.setState({memo:memo});
      this.setState({type:type});
      this.setState({checkstatus:checkstatus});
      this.setState({roomname:roomname});
      this.setState({invitedate:invitedate});
      this.setState({invitestart:invitestart});
      this.setState({inviteend:inviteend});
      this.setState({roomstart:roomstart});
      this.setState({roomend:roomend});
      this.setState({listdata:listdata});
      this.setState({inviteid:inviteid});
  },

  render: function() {
    let Id = this.props.params.Id;
    let styleTable = {
      textAlign:"center",
      verticalAlign:"middel"
    };

    return (
      <div className="well well-sm well-light">
        <form id="order-form" className="smart-form" noValidate="novalidate">
          <div className="row">
            <section className="col col-4">
              <label>邀请部门：{this.state.departname}</label>
            </section>
            <section className="col col-4">
              <label>邀请人姓名：{this.state.staffname}</label>
            </section>
          </div>

          <div className="row">
            <section className="col col-4">
              <label>邀请事由：{this.state.type}</label>
            </section>
            <section className="col col-4">
              <label>状态：{this.state.checkstatus}</label>
            </section>
          </div>

          <div className="row">
            <section className="col col-4">
              <label>邀请时间：{this.state.invitedate} {this.state.invitestart} ~ {this.state.inviteend}</label>
            </section>
            <section className="col col-6">
              <label>会议室：{this.state.roomname}</label>
            </section>
          </div>

          <div className="row">
            <section className="col col-4">
              <label>备注：{this.state.memo}</label>
            </section>
            <section className="col col-4">
              <label>会议时间：{this.state.roomstart} ~ {this.state.roomend}</label>
            </section>
          </div>
        </form>

        <JarvisWidget className="well" colorbutton={false} sortable={true} editbutton={false} deletebutton={false} togglebutton={false} fullscreenbutton={false}>
          <header>
            <span className="widget-icon">
              <i className="fa fa-table"/>
            </span>
            <h2>受邀人一览</h2>
          </header>
          <div>
            <div className="widget-body no-padding">
              <Datatable id="inviteList"   options={{
                ajax: '/invitedetail/list',
                aLengthMenu: [5],
                data: {
                  Id: this.props.params.Id
                },
                columns: [
                  {
                    data: "companyName",
                    render: function(data) {
                    return '<div style="vertical-align:middel;">'+ data +'</div>';
                  }
                  }, {
                    data: "visitorName",
                    render: function(data) {
                    return '<div style="vertical-align:middel;">'+data+'</div>';
                  }
                  }, {
                    data: "visitorCellphone",
                    render: function(data) {
                    return '<div style="text-align:center;vertical-align:middel;">'+data+'</div>';
                  }
                  }
                ]
              }} filter={true} autoWidth={false} className="display projects-table table table-striped table-bordered table-hover" width="100%">
                <thead>
                  <tr>
                    <th><div style={styleTable} width="30%" >受邀人公司</div></th>
                    <th><div style={styleTable} width="25%" >受邀人姓名</div></th>
                    <th><div style={styleTable} >受邀人手机号</div></th>
                  </tr>
                </thead>
              </Datatable>
            </div>
          </div>
        </JarvisWidget>

        <div className="row">
          <article className="col-sm-12 col-md-12 col-lg-12">
            <label>会议地址：{this.state.address}</label>
          </article>
        </div>

        <div className="row">
            <article className="col-sm-12 col-md-12 col-lg-12">
              <Map address={this.state.address}/>
            </article>
        </div>
      </div>
    )
  }
});

let Map = React.createClass({
  render: function() {
    let address = this.props.address;
    var BMap = window.BMap; //取出window中的BMap对象
    var map = new BMap.Map("allmap");
    var city = this.props.address;
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(city, function(point) {
      if (point) {
        map.centerAndZoom(point, 11);
        var marker = new BMap.Marker(point);// 创建标注
        map.addOverlay(marker);             // 将标注添加到地图中
      }
    }, "北京市");
    return (
      <div id="allmap" style={{
        width: '697px',
        height: '550px',
        border: '#ccc solid 1px'
      }}></div>
    )
  }
});

export default Invitedetail
