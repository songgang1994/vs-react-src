//-----------------------------共通模块导入 ----------------------------
import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'
import VsUtil from './com/vs-util'



import Layout from './pages/layout/Layout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'

import Inbox from './pages/inbox/components/Inbox.jsx'
import InboxFolder from './pages/inbox/components/InboxFolder.jsx'
import InboxCompose from './pages/inbox/components/InboxCompose.jsx'
import InboxDetail from './pages/inbox/components/InboxDetail.jsx'
import InboxReplay from './pages/inbox/components/InboxReplay.jsx'

import FlotCharts from './pages/graphs/FlotCharts.jsx'
import SparklineCharts from './pages/graphs/SparklineCharts.jsx'
import EasyPieCharts from './pages/graphs/EasyPieCharts.jsx'
import ChartJs from './pages/graphs/ChartJs.jsx'
import MorrisCharts from './pages/graphs/MorrisCharts.jsx'
import Dygraphs from './pages/graphs/Dygraphs.jsx'
import HighchartTables from './pages/graphs/HighchartTables.jsx'

import Datatables from './pages/tables/Datatables.jsx'

import UiGeneral from './pages/ui/UiGeneral.jsx'

import FlagIcons from './pages/ui/icons/FlagIcons.jsx'
import FontAwesomeIcons from './pages/ui/icons/FontAwesomeIcons.jsx'
import Glyphicons from './pages/ui/icons/Glyphicons.jsx'
import TreeViews from './pages/ui/TreeViews.jsx'
import NestableLists from './pages/ui/NestableLists.jsx'
import JQueryUi from './pages/ui/JQueryUi.jsx'

import FormElements from './pages/forms/FormElements.jsx'
import FormPlugins from './pages/forms/FormPlugins.jsx'
import ImageEditor from './pages/forms/ImageEditor.jsx'
import BootstrapEditors from './pages/forms/BootstrapEditors.jsx'
import FormLayouts from './pages/forms/FormLayouts.jsx'
import BootstrapValidation from './pages/forms/BootstrapValidation.jsx'
import Wizards from './pages/forms/Wizards.jsx'
import DropzoneDemo from './pages/forms/DropzoneDemo.jsx'

import CalendarPage from './pages/calendar/CalendarPage.jsx'

import Projects from './pages/app-views/Projects.jsx'
import Gallery from './pages/app-views/Gallery.jsx'

import Maps from './pages/maps/Maps.jsx'
import MapView from './pages/maps/MapView.jsx'

import Widgets from './pages/widgets/Widgets.jsx'
import StaticPageLoader from './pages/layout/tools/StaticPageLoader.jsx'

import Page404 from './pages/misc/Page404.jsx'
import Page500 from './pages/misc/Page500.jsx'
import BlankPage from './pages/misc/BlankPage.jsx'
import LockedScreen from './pages/misc/LockedScreen.jsx'
import Login from './pages/util/components/Login.jsx'
import FindPwd from './pages/util/components/FIndPwd.jsx'
import ResetPwd from './pages/util/components/ResetPwd.jsx'
import NotFoundPage from './pages/util/components/Page404.jsx'
import Forgot from './pages/misc/Forgot.jsx'
import Register from './pages/util/components/Register.jsx'
import CKEditorDemo from './pages/misc/CKEditorDemo.jsx'
import SelectApprover from './pages/util/components/SelectApprover.jsx' //审批人选择
import Refuse from './pages/util/components/Refuse.jsx'

import Orders from './pages/e-commerce/Orders.jsx'

//-----------------------------平台管理员 ----------------------------
import PlatformCompanyApprove from './pages/platform/company/components/Approve.jsx' //公司审批
import PlatformCompanyUser from './pages/platform/company/components/Company.jsx' //用户
import AccountManagement from './pages/platform/config/components/SetAccount.jsx' //账号管理

//-----------------------------代理管理员 -----------------------------
//import AgentPwdRetrieval from './pages/util/components/FindPwd.jsx' //找回密码
//import AgentPwdReset from './pages/util/components/ResetPwd.jsx' //重置密码
import AgentCompany from './pages/agent/company/components/Company.jsx' //公司

//-----------------------------公司管理员 -----------------------------
import CompanyApprove from './pages/company/approve/components/StaffApprove.jsx' //员工审批
import CompanyVisitStatistics from './pages/company/visitor/components/VisitStatistics.jsx' //拜访状况统计
// import CompanyVisitChart from './pages/company/visitor/components/VisitChart.jsx' //拜访状况统计图表
import CompanyInviteRecord from './pages/company/invite/components/Inviterecord.jsx' //邀请记录
import CompanyInviteDetail from './pages/company/invite/components/Invitedetail.jsx' //邀请详细

import CompanyEdit from './pages/company/config/components/Company.jsx' //公司编辑
import CompanyDepart from './pages/company/depart/components/Depart.jsx' //公司部门
import CompanyStaff from './pages/company/staff/components/Staffed.jsx' //公司员工
import CompanyVisitor from './pages/company/visitor/components/Visitors.jsx' //公司访客
import CompanyRole from './pages/company/role/components/RoleMain.jsx' //公司角色
import CompanyConfig from './pages/company/config/components/Setting.jsx' //系统设置

//-----------------------------部门领导 -----------------------------
import DepartVisitorApprove from './pages/company/approve/components/VisitorApprove.jsx' //访客审批
import DepartStaffApprove from './pages/company/approve/components/StaffApprove.jsx' //员工审批
import DepartInviteApprove from './pages/company/approve/components/InviteApprove.jsx' //邀请审批
import DepartReservationApprove from './pages/company/approve/components/ReservationCheck.jsx' //邀请审批
import DepartVisitStatistics from './pages/company/visitor/components/VisitStatistics.jsx' //拜访状况统计
// import DepartVisitChart from './pages/company/visitor/components/VisitChart.jsx' //拜访状况统计图表
import DepartInviteTab from './pages/company/invite/components/Invitetab.jsx' //邀请tab
import DepartInviteCreate from './pages/company/invite/components/Invitecreate.jsx' //发起邀请
import DepartInviteRecord from './pages/company/invite/components/Inviterecord.jsx' //邀请记录
import DepartInviteDetail from './pages/company/invite/components/Invitedetail.jsx' //邀请详细
import DepartReservation from './pages/company/invite/components/Reservation.jsx' //会议室预约
import DepartVisitorsInfo from './pages/company/invite/components/Visitors.jsx' //访客信息完善
import DepartStaffed from './pages/company/staff/components/Staffed.jsx' //员工
import DepartVisitors from './pages/company/visitor/components/Visitors.jsx' //访客

//-----------------------------公司员工 -----------------------------
import StaffVisitorApprove from './pages/company/approve/components/VisitorApprove.jsx' //访客审批
import StaffVisitStatistics from './pages/company/visitor/components/VisitStatistics.jsx' //拜访状况统计
// import StaffVisitChart from './pages/company/visitor/components/VisitChart.jsx' //拜访状况统计图表
import StaffInviteTab from './pages/company/invite/components/Invitetab.jsx' //邀请tab
import StaffInviteCreate from './pages/company/invite/components/Invitecreate.jsx' //发起邀请
import StaffInviteRecord from './pages/company/invite/components/Inviterecord.jsx' //邀请记录
import StaffInviteDetail from './pages/company/invite/components/Invitedetail.jsx' //邀请详细
import StaffReservation from './pages/company/invite/components/Reservation.jsx' //会议室预约
import StaffVisitorsInfo from './pages/company/invite/components/Visitors.jsx' //访客信息完善
//import SelectApprover from './pages/util/compoents/SelectApprover.jsx' //审批人选择
import StaffPersonal from './pages/company/staff/components/StaffInformation.jsx' //个人信息
import StaffVisitor from './pages/company/visitor/components/Visitors.jsx' //访客

//前台
import ReceptionVisitStatistics from './pages/company/visitor/components/VisitStatistics.jsx' //拜访状况统计
// import ReceptionVisitChart from './pages/company/visitor/components/VisitChart.jsx' //拜访状况统计图表
import ReceptionPersonal from './pages/company/staff/components/StaffInformation.jsx' //个人信息
import ReceptionVisitor from './pages/company/visitor/components/Visitors.jsx' //访客


import VisitChart from './pages/company/visitor/components/VisitChart.jsx'
import InviteHistTab from './pages/company/invite/components/Invitedetail.jsx'
import InviteCreateTab from './pages/company/invite/components/Invitecreate.jsx'
import InviteRecordTab from './pages/company/invite/components/Inviterecord.jsx'



//****************************************** 临时 ************************************************
import Login0 from './pages/util/components/Login0.jsx'

import RealData from './pages/sample/RealData.jsx'
import Reservationinfo from './pages/sample/Reservationinfo.jsx'
import VisitorChoose from './pages/sample/VisitorChoose.jsx'

//手机端
import InviteApprove from './pages/phone/approve/components/InviteApprove.jsx'
import StaffRegister from './pages/phone/information/components/StaffRegister.jsx'
import InviteRecord  from './pages/phone/invite/components/InviteRecord.jsx'
import VisitorApprover  from './pages/phone/approve/components/VisitorApprover.jsx'
import StaffApprover  from './pages/phone/approve/components/StaffApprover.jsx'
import Invite        from './pages/phone/invite/components/Invite.jsx'
import InviteAppoint  from './pages/phone/invite/components/InviteAppoint.jsx'
import VisitorInvite  from './pages/phone/invite/components/VisitorInvite.jsx'
import MyInformation from './pages/phone/information/components/MyInformation.jsx'
import VisitorInformation from './pages/phone/information/components/VisitorInformation.jsx'

const Routes = (

  <Route>
    {/************************************* 临时 **********************************/}
    <Route path="/login0" component={Login0}/>
    <Redirect from="/redirect/company-admin0" to="/company/approve" />
    <Redirect from="/redirect/company-depart-leader0" to="/depart/approve/invite" />
    <Redirect from="/redirect/company-staff0" to="/staff/check/reservation" />
    <Redirect from="/redirect/company-receptionist0" to="/recp/realdata" />



    {/************************************* 共通部分 **********************************/}
    <Route path="/login" component={Login}/>
    <Route path="/visitor/statis" component={VisitChart} />
	  <Route path="/invite/statis" component={InviteHistTab} />
    <Route path="/invite/create" component={InviteCreateTab} />
    <Route path="/invite/record" component={InviteRecordTab} />
    <Route path="/findpwd" component={FindPwd}/>
    <Route path="/resetpwd/:id/:userType/:sign" component={ResetPwd}/>
    <Route path="/selectapprover" component={SelectApprover}/>
    {/* <Route path="/" component={Layout} onEnter={VsUtil.IsLoginCheck}> TODO：正式发布时 放开 */}

    {/* 各类型用户登录后跳转到其首页 */}
    <Redirect from="/redirect/agent" to="/agent/company" />
    <Redirect from="/redirect/platform-admin" to="/platform/approve" />
    <Redirect from="/redirect/company-admin" to="/company/approve" />
    <Redirect from="/redirect/company-depart-leader" to="/depart/approve/invite" />
    <Redirect from="/redirect/company-staff" to="/staff/approve" />
    <Redirect from="/redirect/company-receptionist" to="/reception/visit/detail" />

    <Route path="/" component={Layout}>
      {/************************************* 临时 **********************************/}
      <Route path="recp/realdata" component={RealData} />
      <Route path="recp/reservation" component={VisitorChoose} />
      <Route path="recp/notification" component={Reservationinfo} />


      <Route path="phone">
          <Route path="InviteApprove" component={InviteApprove}></Route>
          <Route path="StaffRegister" component={StaffRegister}></Route>
          <Route path="InviteRecord" component={InviteRecord}></Route>
          <Route path="VisitorApprover" component={VisitorApprover}></Route>
          <Route path="StaffApprover" component={StaffApprover}></Route>
          <Route path="Invite" component={Invite}></Route>
          <Route path="InviteAppoint" component={InviteAppoint}></Route>
          <Route path="MyInformation" component={MyInformation}></Route>
          <Route path="VisitorInvite" component={VisitorInvite}></Route>
          <Route path="VisitorInformation" component={VisitorInformation}></Route>

      </Route>


      {/************************************* 权限部分 **********************************/}
      {/* 平台管理员权限 */}
      <Route path="platform">
        {/* 公司审批 */}
        <Route path="approve" component={PlatformCompanyApprove}></Route>
        {/* 用户 */}
        <Route path="company" component={PlatformCompanyUser}></Route>
        {/* 平台配置 */}
        {/* <Route path="config" component={CompanyCustomSetting} ></Route> */}
        {/* 账号管理 */}
        <Route path="account" component={AccountManagement}></Route>
      </Route>

      {/* 代理权限 */}
      <Route path="agent">
        {/* 公司 */}
        <Route path="company" component={AgentCompany}></Route>
      </Route>

      {/* 公司管理员权限 */}
      <Route path="company">
        {/* 审批 */}
        <Route path="approve" component={CompanyApprove}></Route>
        {/* 访客 */}
        <Route path="visit">
          {/* 拜访状况统计 */}
          <Route path="detail" component={CompanyVisitStatistics}></Route>
          {/* 拜访状况统计图表 */}
          {/* <Route path="chart" component={CompanyVisitChart}></Route> */}
        </Route>
        {/* 邀请 */}
        <Route path="invite">
          {/* 邀请记录 */}
          <Route path="record" component={CompanyInviteRecord}></Route>
          {/* 邀请详细 */}
          <Route path="detail" component={CompanyInviteDetail}></Route>
        </Route>
        {/* 公司 */}
        <Route path="company">
          {/* 公司 */}
          <Route path="info" component={CompanyEdit}></Route>
          {/* 部门 */}
          <Route path="depart" component={CompanyDepart}></Route>
          {/* 员工 */}
          <Route path="staff" component={CompanyStaff}></Route>
          {/* 访客 */}
          <Route path="visitor" component={CompanyVisitor}></Route>
          {/* 角色 */}
          <Route path="role" component={CompanyRole}></Route>
          {/* 自定义设置 */}
          <Route path="config" component={CompanyConfig}></Route>
        </Route>
      </Route>

      {/* 部门领导权限 */}
      <Route path="depart">
        {/* 审批 */}
        <Route path="approve">
          {/* 邀请审批 */}
          <Route path="invite" component={DepartInviteApprove}></Route>
          {/* 访客审批 */}
          <Route path="visitor" component={DepartVisitorApprove}></Route>
          {/* 员工审批 */}
          <Route path="staff" component={DepartStaffApprove}></Route>
        </Route>
          {/* 确认 */}
          <Route path="check">
            {/* 预约确认*/}
            <Route path="reservation" component={DepartReservationApprove}></Route>
            {/* 访客确认 */}
            <Route path="visitor" component={DepartVisitorApprove}></Route>
          </Route>
        {/* 访客 */}
        <Route path="visit">
          {/* 拜访状况统计 */}
          <Route path="detail" component={DepartVisitStatistics}></Route>
          {/* 拜访状况统计图表 */}
          {/* <Route path="chart" component={DepartVisitChart}></Route> */}
        </Route>
        {/* 邀请 */}
        <Route path="invite">
          {/* 邀请Tab */}
          <Route path="tab" component={DepartInviteTab}></Route>
          {/* 发起邀请 */}
          <Route path="create" component={DepartInviteCreate}></Route>
          {/* 邀请记录 */}
          <Route path="record" component={DepartInviteRecord}></Route>
          {/* 邀请详细 */}
          <Route path="detail" component={DepartInviteDetail}></Route>
          {/* 会议室预约 */}
          <Route path="reserve" component={DepartReservation}></Route>
          {/* 访客信息完善 */}
          <Route path="info" component={DepartVisitorsInfo}></Route>
        </Route>
        {/* 人员 */}
        <Route path="staff">
          {/* 员工 */}
          <Route path="personal" component={DepartStaffed}></Route>
          {/* 访客 */}
          <Route path="visitor" component={DepartVisitors}></Route>
        </Route>
      </Route>

      {/* 公司员工权限 */}
      <Route path="staff">
        {/* 审批 */}
        <Route path="approve" component={StaffVisitorApprove}></Route>
        {/* 确认 */}
        <Route path="check">
          {/* 预约确认*/}
          <Route path="reservation" component={DepartReservationApprove}></Route>
          {/* 访客确认 */}
          <Route path="visitor" component={DepartVisitorApprove}></Route>
        </Route>
        {/* 访客 */}
        <Route path="visit">
          {/* 拜访状况统计 */}
          <Route path="detail" component={StaffVisitStatistics}></Route>
          {/* 拜访状况统计图表 */}
          {/* <Route path="chart" component={StaffVisitChart}></Route> */}
        </Route>
        {/* 邀请 */}
        <Route path="invite">
          {/* 邀请Tab */}
          <Route path="tab" component={StaffInviteTab}></Route>
          {/* 发起邀请 */}
          <Route path="create" component={StaffInviteCreate}></Route>
          {/* 邀请记录 */}
          <Route path="record" component={StaffInviteRecord}></Route>
          {/* 邀请详细 */}
          <Route path="detail" component={StaffInviteDetail}></Route>
          {/* 会议室预约 */}
          <Route path="reserve" component={StaffReservation}></Route>
          {/* 访客信息完善 */}
          <Route path="info" component={StaffVisitorsInfo}></Route>
        </Route>
        {/* 人员 */}
        <Route path="staff">
          {/* 员工 */}
          <Route path="personal" component={StaffPersonal}></Route>
          {/* 访客 */}
          <Route path="visitor" component={StaffVisitor}></Route>
        </Route>
      </Route>

      {/* 前台权限 */}
      <Route path="reception">
        {/* 访客 */}
        <Route path="visit">
          {/* 拜访状况统计 */}
          <Route path="detail" component={ReceptionVisitStatistics}></Route>
          {/* 拜访状况统计图表 */}
          {/* <Route path="chart" component={ReceptionVisitChart}></Route> */}
        </Route>
        {/* 人员 */}
        <Route path="staff">
          {/* 员工 */}
          <Route path="personal" component={ReceptionPersonal}></Route>
          {/* 访客 */}
          <Route path="visitor" component={ReceptionVisitor}></Route>
        </Route>
      </Route>

      {/*************************************  **********************************/}

      <Redirect from="/" to="/dashboard"/>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="dashboard/social-wall.html" component={StaticPageLoader} subHeader={false}/>

      <Redirect from="inbox" to="/inbox/folder/inbox"/>
      <Route path="inbox" component={Inbox}>
        <Route path="folder/:folder" component={InboxFolder}/>
        <Route path="compose" component={InboxCompose}/>
        <Route path="detail/:messageId" component={InboxDetail}/>
        <Route path="replay/:messageId" component={InboxReplay}/>
      </Route>

      <Redirect from="graphs" to="/graphs/chartjs"/>
      <Route path="graphs">
        <Route path="flot" component={FlotCharts}/>
        <Route path="easy-pie-charts" component={EasyPieCharts}/>
        <Route path="sparklines" component={SparklineCharts}/>
        <Route path="chartjs" component={ChartJs}/>
        <Route path="morris" component={MorrisCharts}/>
        <Route path="dygraphs" component={Dygraphs}/>
        <Route path="highchart-table" component={HighchartTables}/>
      </Route>

      <Redirect from="tables" to="/tables/normal"/>
      <Route path="tables">
        <Route path="normal.html" component={StaticPageLoader}/>
        <Route path="datatables" component={Datatables}/>
      </Route>

      <Redirect from="forms" to="/forms/elements"/>
      <Route path="forms">
        <Route path="elements" component={FormElements}/>
        <Route path="layouts" component={FormLayouts}/>
        <Route path="form-validation.html" component={StaticPageLoader}/>
        <Route path="plugins" component={FormPlugins}/>
        <Route path="wizards" component={Wizards}/>
        <Route path="dropzone" component={DropzoneDemo}/>
        <Route path="image-editor" component={ImageEditor}/>
        <Route path="bootstrap-validation" component={BootstrapValidation}/>
        <Route path="bootstrap-editors" component={BootstrapEditors}/>
        <Route path="bootstrap-form-elements.html" component={StaticPageLoader}/>
      </Route>

      <Redirect from="ui" to="/ui/general"/>
      <Route path="ui">

        <Route path="general" component={UiGeneral}/>
        <Route path="buttons.html" component={StaticPageLoader}/>
        <Route path="icons">
          <Route path="font-awesome" component={FontAwesomeIcons}/>
          <Route path="glyphicons" component={Glyphicons}/>
          <Route path="flags" component={FlagIcons}/>
        </Route>

        <Route path="jquery-ui" component={JQueryUi}/>
        <Route path="tree-view" component={TreeViews}/>
        <Route path="nestable-lists" component={NestableLists}/>
        <Route path="grid.html" component={StaticPageLoader}/>
        <Route path="typography.html" component={StaticPageLoader}/>
      </Route>

      <Route path="calendar" component={CalendarPage}/>

      <Redirect from="maps" to="/maps/colorful"/>
      <Route path="maps" component={Maps}>
        <Route path=":style" component={MapView}/>
      </Route>

      <Route path="widgets" component={Widgets}/>

      <Route path="views">
        <Route path="projects" component={Projects}/>
        <Route path="blog.html" component={StaticPageLoader}/>
        <Route path="timeline.html" component={StaticPageLoader}/>
        <Route path="profile.html" component={StaticPageLoader}/>
        <Route path="gallery" component={Gallery}/>
        <Route path="forum">
          <Route path="general.html" component={StaticPageLoader}/>
          <Route path="topic.html" component={StaticPageLoader}/>
          <Route path="post.html" component={StaticPageLoader}/>
        </Route>

      </Route>
      <Route path="refuse" component={Refuse} />
      <Route path="misc">
        <Route path="pricing-tables.html" component={StaticPageLoader}/>
        <Route path="invoice.html" component={StaticPageLoader}/>
        <Route path="search.html" component={StaticPageLoader}/>
        <Route path="email-template.html" component={StaticPageLoader}/>

        <Route path="404" component={Page404}/>
        <Route path="500" component={Page500}/>
        <Route path="blank" component={BlankPage}/>
        <Route path="ck-editor" component={CKEditorDemo}/>

      </Route>

      <Route path="e-commerce">
        <Route path="orders" component={Orders}/>
        <Route path="products-view.html" component={StaticPageLoader} subHeader={false}/>
        <Route path="products-detail.html" component={StaticPageLoader} subHeader={false}/>

      </Route>
      <Route path="smartadmin/app-layouts.html" component={StaticPageLoader} subHeader={false}/>
      <Route path="smartadmin/skins.html" component={StaticPageLoader} subHeader={false}/>
    </Route>
    <Route path="lock" component={LockedScreen}/>

    <Route path="forgot" component={Forgot}/>
    <Route path="register" component={Register}/> {/*放在所有Route的最后 */}
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default Routes
