/**
 * Created by griga on 11/30/15.
 */

import React from 'react'



let SampleMap = React.createClass({

  componentDidMount(){
     var BMap = window.BMap;  //取出window中的BMap对象
     var map = new BMap.Map("allmap");
     var point = new BMap.Point(116.331398,39.897445);
     map.centerAndZoom(point,11);

   },

   ss: function(){
          var BMap = window.BMap;  //取出window中的BMap对象
          var map = new BMap.Map("allmap");
          var city = document.getElementById("address1").value;
          // 创建地址解析器实例
        	var myGeo = new BMap.Geocoder();
          if(city != ""){
            // 将地址解析结果显示在地图上,并调整地图视野
          	myGeo.getPoint(city, function(point){
          		if (point) {

          			map.centerAndZoom(point, 11);
                map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
                map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
                var marker = new BMap.Marker(point);// 创建标注
              	map.addOverlay(marker);             // 将标注添加到地图中
                marker.enableDragging();           // 可拖拽
          		}
              // else{
          		// 	alert("您选择地址没有解析到结果!");
          		// }
          // }
       	},"北京市");
          }else{
               alert("地址不能为空!");
               var map = new BMap.Map("allmap");
               var point = new BMap.Point(116.331398,39.897445);
               map.centerAndZoom(point,11);
          }
    },



    render: function () {
         return (
     <div id="content">
         <form id="2"  target="ifr">
         {/* <form id="2" > */}
            <h2>会议地址</h2>
            <br />
            <fieldset>

                 <div id="r-result">
                     <section className="col col-3">
                      <input type="text" id="address1"  name="address1" />
                         <span> </span>
                      <button onClick={this.ss}>设置</button>
                    </section>
                 </div>
                 <div id="allmap"  style={{width:'697px',height:'550px',border:'#ccc solid 1px'}}></div>

           </fieldset>

         </form>
         <iframe name='ifr' id="ifr" style={{display: 'none'}}></iframe>




      </div>
      )
    }
});

export default SampleMap

