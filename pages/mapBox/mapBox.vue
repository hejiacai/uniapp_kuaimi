<template>
	<view>
		<!-- <view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="top_bar">
			<view class="getBack icon iconfont icon-backtrackx _i" @tap="back"></view>
			<view class="title">
				位置名称
			</view>
			<view class="">
				确定
			</view>
		</view>
		<view class="" style="width: 100%; height: 100vh;">
			<map
			id="container" ref="map1"
			style="width: 100%; height: 100vh;"
			:latitude="latitude_a"
			
			:longitude="longitude_a"
			
			:markers="markers"
			
			:show-location="true"
			
			@markertap="markertap"
			
			@updated='mapUpdated'
			
			@bindregionchange='regionChange'
			
			@bindtap='bindMapTap'
			
			@tap='closeMapMarker'></map>
		</view> -->
		<!-- <map style="width: 100%; height: 100vh;" :latitude="latitude_a" :longitude="longitude_a" @tap="fanhui" id="myMap" ref="map1" :show-location="showLoc"></map> -->
	</view>
</template>

<script>
	import amap from "../../js_sdk/js-amap/amap-wx.js";
	export default {
		data() {
			return {
				poisdatas:[],
				markers: [],
				showLoc:true,
				latitude_a:'',
				longitude_a:'',
				nav_map:null,
				mapInfo:'',
				mapKey:'03d8fd1aba2d39d442b58a3c8d8fc88f'
			}
		},
		onReady() {
			//  var nmap = uni.createMapContext("map1",this).$getAppMap();  
			// this.nav_map = nmap; 
		},
		onLoad() {
			uni.chooseLocation({
			    success: function (res) {
			        console.log('位置名称：' + res.name);
			        console.log('详细地址：' + res.address);
			        console.log('纬度：' + res.latitude);
			        console.log('经度：' + res.longitude);
			    }
			});
			return
			 // var amapPlugin = new amap.AMapWX({
			 
			 // key: that.mapKey  //该key 是在高德中申请的微信小程序key
			 
			 // });
			    //为地图注册click事件获取鼠标点击出的经纬度坐标
			  //   amapPlugin.on('click', function(e) {
					// console.log(e)
			  //       document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
			  //   });
			// var nmap = uni.createMapContext("map1",this).moveToLocation()
			// console.log(nmap)
			var that = this;
			var amapPlugin = new amap.AMapWX({
			
			key: that.mapKey  //该key 是在高德中申请的微信小程序key
			
			});
			amapPlugin.getRegeo({
			
			type: 'gcj02', //map 组件使用的经纬度是国测局坐标， type 为 gcj02
			
			success: function(res) {
			
			const latitude = res[0].latitude;
			
			const longitude = res[0].longitude;
			
			that.longitude_a = longitude;
			
			that.latitude_a = latitude;
			console.log('获取的地理位置信息')
			that.mapInfo=res[0];
			
			},
			
			fail: (res) => {
			
			console.log(JSON.stringify(res));
			
			}
			
			});
			 
			       
			//         amapPlugin.getPoiAround({
			//         success: function(data) {
			//         //成功回调
			//         that.markers = data.markers;
			//         that.poisdatas=data.poisData;
			//         var markers_new = [];
			//         that.markers.forEach(function(item, index) {
			//         markers_new.push({
			//         id: item.id,              //marker 序号
			//         width: item.width,        //marker 宽度
			//         height: item.height,      //marker 高度
			//         iconPath: item.iconPath,  //marker 图标路径
			//         latitude: item.latitude,  //marker  纬度
			//         longitude: item.longitude, //marker 经度
			//         //自定义标记点上方的气泡窗口
			//         callout:{
			//         padding:2,        //callout 文本边缘留白
			//         fontSize:15,      //callout  文字大小
			//         bgColor:'blue',   //callout 背景颜色
			//         color:'#6B8E23',  //callout 文字颜色
			//         borderRadius:5,   //边框圆角
			//         display:'BYCLICK',//callout 'BYCLICK':点击显示; 'ALWAYS':常显
			//         content:that.poisdatas[index].name //地理位置名称
			//         }
			//         })
			//         })
			//         that.markers = markers_new;
			//         console.log("data", JSON.stringify(that.poisdatas));
			//         },
			//         fail: function(info) {
			//         //失败回调
			//         console.log("info", info)
			//         }
			//         })
		},
		methods: {
			//定位方法;获取当前的经纬度，也可以通过经纬度来获取当前的地理位置，比如：xx省、xx市、xx镇
			getlocal () {
				let _this = this;
				//显示当前位置
				var map = uni.createMapContext('myMap', this).$getAppMap();
				map.showUserLocation(true);
				//获取当前定位
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						_this.longitude = res.longitude;
						_this.latitude = res.latitude;
					}
				})
			},
			bindMapTap(res){
				console.log('鼠标点击啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊')
			},
			regionChange(res){
				console.log(res)
				console.log('鼠标拖动啊啊啊啊啊啊啊啊啊啊')
			},
			closeMapMarker(){
				
			},
			mapUpdated(){
				console.log()
			},
			markertap(e){
				for (var i = 0; i < this.markers.length; i++) {
				        if (JSON.stringify(e).substring(18, 20) == this.markers[i].id) {
				        console.log("markers" + this.poisdatas[i].name+"   "+this.poisdatas[i].address);
				        uni.showToast({
				        title: this.poisdatas[i].name,
				        mask: false,
				        duration: 1500
				        });
				        }
					}   
			},
			fanhui(res){
				// var _this = this
				var mapContext = uni.createMapContext('myMap',this);
				// uni.createMapContext('map1',_this)
				mapContext.moveToLocation()
				mapContext.getCenterLocation(res=>{
					debugger
					console.log(res)
				})
				// mapContext.translateMarker({  
				//                         markerId:pointdata[0].id,  
				//                         destination:{longitude:116,latitude:40},  
				//                         autoRotate:true,  
				//                         rotate:150,  
				//                         duration:1000,  
				//                         animationEnd:function(){  
				//                             console.log(123)  
				//                         },  
				//                         fail(e) {  
				//                             console.log(e)  
				//                         }  
				//                     }) 
				console.log('返回的坐标',res)
			},
			back() {
				// uni.reLaunch({
				// 	url:'/pages/nearbyJob/nearbyJob'
				// })
				uni.navigateBack({
					delta: 2
				})
			}
		}
		// onLoad(options) {
		// 	this.latitude_a = options.latitude_a
		// 	this.longitude_a = options.longitude_a
		// 	console.log('获取的地理位置',this.latitude_a)
		// }
	}
</script>

<style>
	.status_bar {
	     height: calc(var(--status-bar-height) + 40px) ;
	     width: 100%;
	      position:fixed;
	      top: 0;
	      z-index: 9999;
	      background: #ffffff!important;
	 }
	 .top_view{
			  height: calc(var(--status-bar-height) + 40px) ;
			  width: 100%;
			  position: fixed;
			  top:0;
			  z-index: 999;
	 }
	.top_bar{
		margin-top: calc(var(--status-bar-height) + 40px) ;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 20rpx;
	}
</style>
