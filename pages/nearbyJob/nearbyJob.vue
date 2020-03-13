<template>
	<view class="nearByJob">
        <!-- #ifdef MP-WEIXIN -->
            <view class="aaaaaaaaaaaaaaaaaaaaaaa">
            	
            </view>
        <!-- #endif -->
		<!-- <view class="status_bar">
			<view class="top_view"></view>
		</view> -->
		<!-- <view class="uni-navbar__content">
			<view class="uni-navbar-btn-icon-left uni-navbar__header-btns-left">
				
			</view>
		</view> -->
		<!-- <view class="search_item" v-if="isPosiFix">
			<uni-nav-bar left-icon="arrowleft" title="附近职位" right-text="菜单" @clickLeft="back" right-icon="location" size='40' @turnLaction="turnLaction">
			</uni-nav-bar>
		</view> -->
		<!-- <uni-nav-bar left-icon="arrowleft" fixed="true" title="附近职位" right-text="菜单" @clickLeft="back" right-icon="location" size='40' @turnLaction="turnLaction">
		</uni-nav-bar> -->
		<view :class="['nearByjob-tab-bar',isPosiFix?'tabFicxed':'']">
			<view class="getBack icon iconfont icon-backtrackx _i" @tap="back"></view>
            <view class="fjzw" v-if="isPosiFix">
            	附近职位
            </view>
			<view class="icon iconfont icon-nearby_navigation_positioningx positionLaction" @tap="turnLaction" v-if="true">
				
			</view>
			<!-- <map style="width: 100%; height: 289rpx;" :latitude="latitude_a" :longitude="longitude_a" :markers="covers" @tap="turnLaction"></map> -->
			
		</view>
		<view class="famousTop">
			<img src="../../static/img/fujinbg.png" alt="">
			<text>附近职位</text>
			<text class="tit2">离家近、上班省力、每天睡到自然醒</text>
		</view>
		<!-- <view class="jobListBd"> -->
            <view :class="['search_item',isPosiFix?'fixedFilter':'']">
            	<filterTabBar class="fffffffff" :nearbyJob="nearbyJob"></filterTabBar>
            </view>
            <view v-if="!waitA">
                <jobitemCard v-for="(jobItem,index) in jobList" :key="index" :jobItem="jobItem" :nearbyJob="isNearbyJob"></jobitemCard>
            </view>
             <view class="wunei" v-else>
                <view class="imgv">
                    <img src="../../static/img/icon_nocontent.png" alt="" style="display: block;margin: 0 auto;">
                </view>
                <view class="zwnr">暂无内容</view>
                <view class="kdbr">苦苦等待,不如主动出击</view>
            </view>
			<uni-load-more :status="loandMore" v-show="isLoandMore"></uni-load-more>
		<!-- </view> -->
	</view>
</template>

<script>
	import {
			mapState,
			mapMutations
		} from 'vuex';
		import openMap from '../../static/commonjs/utils/openMap.js'
        import eventList from '../../static/commonjs/eventList/eventList.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import filterTabBar from './../../components/filterTabBar';
	import jobitemCard from "./../../components/jobItemCard";
	import apiName from '../../static/commonjs/request/apiName.js';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	export default{
		components: {
			uniIcons,
			uniNavBar,
			uniLoadMore,
			filterTabBar,
			jobitemCard
		},
		// components: {
		// 	filterTabBar,
		// 	jobitemCard,
		// },
		data() {
			return {
				isNearbyJob:true,
                waitA:false,
                near_tab_bar_List:[
                    '职位类别',
                    '距离',
                    '薪资',
                    '其他',
                ],
				covers: [
				
				      {
				
				        latitude: '',//纬度，范围为-90~90，负数表示南纬
				
				        longitude: '',//经度，范围为-180~180，负数表示西经
				
				      }
				
				    ],
				isPosiFix: false,
				filterTabBarTop:0,
				latitude_a:'',
				longitude_a:'',
				nearbyJob:'',
				isFixed:true,
				jobList:[],
				jobItem:'',
				famousCompanyAry:[],
				page_pageno:1,//第几页
                page_pageno_aa:1,
				page_isnextpage:false,//是否翻页
				isLoandMore:false,
				loandMore:'more',
				default_photo:'//assets.huibo.com/img/blue/com_default.png',
                distanceItme:'',
                chooseJobList:'',
                chooseSalaryCode:'',
                _workTimeCode:'',
                _ageCode:'',
                _chooseCallingList:[],
                _chooseRewardsList:[],
                reward_ids:'',
                calling_id:'',
                ageCode:'',
                schedule:'',
                sex:'',
                area_id:'',
                isSearch:false
			}
		},
		//加载更多
		onReachBottom(){
			// console.log("到底了");
            if(this.isSearch){
                this.onReachMore();
            }else{
               this.getCommonJob() 
            }
		},
		onPageScroll(opt) {
			if (opt.scrollTop >= this.filterTabBarTop) {
				// console.log("浮动顶部", opt.scrollTop,this.$refs.filterTabBar.$el.offsetTop);
				this.isPosiFix = true;
			} else {
				this.isPosiFix = false;
			}
		},
        created(){
          this.init_bar_List();
		  uni.$on('searchJob_near', (data) => {
                 this.isSearch = true
                  this.page_pageno_aa = 1
              console.log('返回的搜索条件',data)
              if(data){
                 this.distanceItme = data.distanceItme
                 this.chooseJobList = data.chooseJobList
                 this.chooseSalaryCode = data.chooseSalaryCode 
                 this.reward_ids = data.reward_ids
                 this.calling_id = data.calling_id
                 this.ageCode = data.ageCode
                 this.schedule = data.schedule
                 this.sex = data.sex
                 // this.area_id = data.area_id
                 
              }
              console.log('切割距离字符串',this.distanceItme.split('公里'))
		  	this.filterTabbar_searchJob();
		  });
        },
		onUnload(){
          this.close_bar_List();
			uni.$off('searchJob');
        },
        onReady() {
        	// var _this = this;
        	// this.getnewLocation()
        },
        onUnload() {
        	uni.$off(eventList.GO_TO_JOBDETAIL);
        },
        onHide(){
        	uni.$off(eventList.GO_TO_JOBDETAIL);
        },
		onShow(){
			var _this = this;
			// _this.getCommonJob()
            // _this.init_bar_List()
			if(_this.latitude_a&&_this.longitude_a){
				_this.jobList = []
				// debugger
				if(_this.isSearch){
					// debugger
				    _this.onReachMore();
				}else{
					// debugger
				   _this.getCommonJob() 
				}
			}else{
				// debugger
				_this.getnewLocation()
			}
            uni.$on(eventList.GO_TO_JOBDETAIL, (data) => {
            	// console.log('首页执行跳转');
            	uni.navigateTo({
            		url: '../jobDetail/jobDetail?job_flag=' + data.job_flag
            	});
//             	uni.setStorageSync('isIndex', 'hello')
//             	uni.setStorageSync('isIndexTwo', 'hello')
            });
// 			_this.$http.post(apiName.FAMOUS_COMPANY,{
// 				params:{
// 					page_pageno:_this.page_pageno,
// 					token:this.token,
// 					page_pagesize:10
// 				}
// 			}).then(res => {
// 				_this.famousCompanyAry = res.data.data;
// 				_this.page_isnextpage = res.data.page.page_isnextpage;
// 				console.log(_this.page_isnextpage);
// 				if(_this.page_isnextpage){
// 					_this.isLoandMore = true;
// 				}
// 				
// 			}).catch(err => {
// 				console.log('翻页出错了');
// 			});
		},
		onReady(){
				//#ifndef H5
				// this.filterTabBarTop = this.$refs.filterTabBar.$el.offsetTop;
				this.$location('.search_item').then(res=>{
					this.filterTabBarTop = res.top - 20 
				})
				//#endif
		},
		mounted() {
			//#ifdef H5
				this.filterTabBarTop = this.$refs.filterTabBar.$el.offsetTop;
			//#endif
			// this.filterTabBarTop = this.$refs.filterTabBar.$el.offsetTop;
		},
		onLoad(options) {
			// alert(options.type)
			this.nearbyJob = options.type;
			uni.$emit('searchJob');
			// if(options.keyWordStr){
			// 	console.log(options.keyWordStr)
			// }
			// let keyWordStr = options.keyWordStr;
			// var _this = this;
			// _this.$http.post(apiName.JOB_SEARCH, {
			// 	params: {
			// 		token: _this.token?_this.token:'',
			// 		page_pageno: 1,
			// 		page_pagesize: 8,
			// 		keyword: keyWordStr,
			// 		area_id: "",
			// 		sex: '',
			// 		schedule: "",
			// 		salary: "",
			// 		age: "",
			// 		calling_id: "",
			// 		reward_ids: "",
			// 		job_sorts: "",
			// 		is_neer: false,
			// 		map_x: "",
			// 		map_y: "",
			// 		map_d: "",
			// 	}
			// }).then(res => {
			// 	if (res.data.success) {
			// 		console.log('搜索内容列表请求成功', res.data.data.job_list);
			// 		_this.jobList.push(...res.data.data.job_list)
			// 	} else {
			// 		// console.log('首页职位列表请求成功',res.data.data.job_list);
			// 		_this.$KM.showToast(res.data.msg);
			// 	}
			// }).catch(err => {
			// 	console.error('出错了');
			// })
			
				
					// plus.geolocation.getCurrentPosition( function(position){
					// // plus.nativeUI.alert(JSON.stringify(position));
					// console.log('获取的定位信息',position)
					// }, 
					// function ( e ) {
					// plus.nativeUI.alert( "获取定位位置信息失败："+e.message );
					// },{geocode:true},
					// );
		},
		computed: {
			...mapState(['token','presentAddress','jobCategory','indexSearchJob'])
		},
		methods: {
            ...mapMutations(['set_tab_bar_List']),
            init_bar_List(){
                // debugger
                this.set_tab_bar_List(this.near_tab_bar_List)
            },
			close_bar_List(){
			    // debugger
			    this.set_tab_bar_List(['职位类别','地区','薪资','其他'])
			},
            getAuthorizeInfo(){
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
					console.log('允许授权')
						that.getLocationInfo();
					},
					fail(){    // 拒绝授权
						that.openConfirm();
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
        // 获取地理位置
         getLocationInfo(){
             let _this = this
            uni.getLocation({
                type: 'gcj02',
                success (res) {
                    _this.latitude_a = res.latitude
                    _this.longitude_a = res.longitude
                    console.log('返回得地理位置信息',res);
                    if(_this.isSearch){
                        _this.onReachMore();
                    }else{
                       _this.getCommonJob() 
                    }
                    // _this.getCommonJob()
                }
            });
        },
         // 再次获取授权
        // 当用户第一次拒绝后再次请求授权
        openConfirm(){
            uni.showModal({
                title: '请求授权当前位置',
                content: '需要获取您的地理位置，请确认授权',
                success: (res)=> {
                    if (res.confirm) {
                        uni.openSetting();// 打开地图权限设置
                    } else if (res.cancel) {
                        uni.showToast({
                            title: '你拒绝了授权，无法获得周边信息',
                            icon: 'none',
                            duration: 1000
                        })
                    }
                }
            });
        },
			getnewLocation(){
				let _this = this
                console.log('获取地理位置信息啊啊啊啊啊啊')
				// #ifdef MP-WEIXIN
                console.log('进来了吗')
                _this.getAuthorizeInfo()
// 					wx.getLocation({
// 					 type: 'gcj02 ',
// 					 success (res) {
// 					   _this.latitude_a = res.latitude
// 					   _this.longitude_a = res.longitude
// 					   console.log('返回得地理位置信息',res)
// 					   _this.getCommonJob()
// 					 }
// 					})
				// #endif
			},
			turnLaction(){
				var _this = this 
				uni.chooseLocation({
				    success: function (res) {
						console.log('选择后的地理位置信息',res)
						_this.latitude_a = res.latitude
						_this.longitude_a = res.longitude
				        console.log('位置名称啊啊啊啊：' + res.name);
				        console.log('详细地址啊啊啊：' + res.address);
				        console.log('纬度啊啊啊：' + res.latitude);
				        console.log('经度啊啊啊啊：' + res.longitude);
						// debugger
						
				    }
				});
				if(_this.latitude_a&&_this.longitude_a){
					if(_this.isSearch){
					    _this.onReachMore();
					}else{
					   _this.getCommonJob() 
					}
				}else{
					_this.getnewLocation()
				}
				// _this.getCommonJob()
				// return
				// openMap.openMap(this.latitude_a,this.longitude_a)
				// uni.navigateTo({
				// 	url:'../mapBox/mapBox?latitude_a=' + this.latitude_a + '&longitude_a=' + this.longitude_a
				// })
				// let _this = this;
				// // #ifdef APP-PLUS
				
				// plus.geolocation.getCurrentPosition( function(position){
				// // plus.nativeUI.alert(JSON.stringify(position));
				// console.log('获取的地图信息',position)
				// }, function ( e ) {
				// plus.nativeUI.alert( "获取定位位置信息失败："+e.message );
				// },{geocode:true});
				// // #endif
				// // #ifdef MP-WEIXIN
				// 	wx.openLocation({
				// 	 latitude:_this.latitude_a,
				// 	 longitude:_this.longitude_a,
				// 	 scale: 18
				//    })
				// // #endif
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			getCommonJob(){
				var _this = this;
				_this.loandMore='loading';
				_this.$http.post(apiName.JOB_SEARCH, {
					params: {
						token: _this.token,
						page_pageno: _this.page_pageno,
						page_pagesize: 8,
						keyword: "",
						area_id: "",
						sex: "",
						schedule: "",
						salary: "",
						age: "",
						calling_id: "",
						reward_ids: "",
						job_sorts: "",
						is_neer: true,
						map_x: _this.latitude_a,
						map_y: _this.longitude_a,
						map_d: "",
						t:new Date() - 0
					}
				}).then(res => {
					if (res.data.success == true) {
                        _this.page_pageno = ++_this.page_pageno
						console.log('首页职位列表请求成功', res.data.data.job_list);
						if(res.data.data.job_list.length==0){
							_this.loandMore='noMore';
						}else{
							let setT = setTimeout(()=>{
								_this.loandMore='hide';
								clearTimeout(setT);
							},500)
						}
						// _this.seletJob = res.data.data.exp_desc_str
						_this.jobList.push(...res.data.data.job_list)
					} else {
						_this.$KM.showToast('请求职位列表接口失败');
					}
				}).catch(err => {
					_this.$KM.showToast('请求职位列表接口失败');
				})
			},
			onReachMore(){
                this.filterTabbar_searchJob()
// 				var _this = this;
//                 _this.isLoandMore = true
// 				var page_pageno = _this.page_pageno
// 					page_pageno++;
// 					_this.$http.post(apiName.FAMOUS_COMPANY,{
// 						params:{
// 							page_pageno:page_pageno,
// 							token:this.token,
// 							page_pagesize:10
// 						}
// 					}).then(res => {
// 						// console.log('ooooooo',res.data)
// 						if(!res.data.page.page_isnextpage){
// 							_this.loandMore = 'noMore'
// 						}
// 						_this.famousCompanyAry.push(...res.data.data);
// 						_this.page_pageno = page_pageno;
// 						_this.page_isnextpage = res.data.page.page_isnextpage;
//                         console.log('关闭加载图标')
//                         setTimeout(()=>{
//                         	_this.isLoandMore = false
//                         },500)
// 					}).catch(err => {
// 						console.log('翻页出错了');
// 					});
			},
			filterTabbar_searchJob(){
				let fliterData = [];
				let _this = this;
				_this.loandMore='loading';
//                 var page_pageno = _this.page_pageno
//                 page_pageno++;
                // this._chooseCallingList.length>0?this._chooseCallingList.join(','):
                // this._chooseRewardsList.length>0?this._chooseRewardsList.join(','):
				_this.$http.post(apiName.JOB_SEARCH,{
					params:{
						token:_this.token,
						page_pageno: this.page_pageno_aa,
						page_pagesize: 8,
						keyword: "",
						area_id:this.area_id?this.area_id:'',//按地区搜索
						sex:this.sex?this.sex:'',
						schedule:this.schedule?this.schedule:'',//作息
						salary:this.chooseSalaryCode?this.chooseSalaryCode:'',
						age:this.ageCode?this.ageCode:'',
						calling_id:this.calling_id?this.calling_id:'',//行业
						reward_ids:this.reward_ids?this.reward_ids:'',//福利
						job_sorts:this.chooseJobList.length>0?this.chooseJobList.join(','):'',//职位类别
						is_neer: true,
						map_x: _this.latitude_a,
						map_y: _this.longitude_a,
						map_d:this.distanceItme.split('公里')[0],
						t:new Date() - 0
					}
				}).then(res=>{
					// console.log('多选返回的结果',res.statusCode)
					if(res.data.success){
                        if(this.page_pageno_aa==1){
                            _this.jobList = []
							if(res.data.data.job_list.length<1){
							    _this.waitA = true
								// _this.loandMore='hide';
							}else{
							    _this.waitA = false
							}
                        }
						console.log('搜索内容得到data->',res.data.data);
                        _this.jobList.push(...res.data.data.job_list)
						if(res.data.data.job_list.length==0){
							if(this.page_pageno_aa==1){
								_this.loandMore='hide';
								// _this.isLoandMore = false
							}else{
								_this.loandMore='noMore';
							}
						}else{
							let setT = setTimeout(()=>{
								_this.loandMore='hide';
								clearTimeout(setT);
							},500)
						}
      //                   _this.loandMore='hide';
						this.page_pageno_aa = ++this.page_pageno_aa
                        _this.page_pageno = page_pageno;
						console.log('返回的职位搜索', _this.jobList)
					}else{
						this.$KM.showToast(res.data.msg)
					}
				}).catch(error=>{
                    console.log('搜索接口出错了')
					// console.log(error)
				})
			}
		}
	}
</script>

<style lang="scss">
    .tabFicxed{
        background: #FFFFFF;
    }
    .fixedFilter{
        position: fixed;
        top:208rpx;
        z-index: 999;
        width: 100%;
        background: #FFFFFF;
    }
    .wunei{
        margin-top:20rpx;
    }
    .zwnr{font-size:34rpx;text-align: center;color: #555;margin-bottom:20rpx}
    .kdbr{    color: #999;
        font-size: 28rpx;
        text-align: center;}
	.nearByJob{
		width: 100%;
	}
	// #ifdef MP-WEIXIN
	.aaaaaaaaaaaaaaaaaaaaaaa{
		height: 120rpx;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
        background: #ffffff;
	}
	// #endif
	.nearByjob-tab-bar{
		width: 100%;
		padding: 0 30rpx;
		line-height: 88rpx;
		height: 88rpx ;
		box-sizing: border-box;
        position: fixed;
        top: 120rpx;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: space-between;
	}
	.getBack{
		float: left;
		font-size: 32rpx;
	}
	.positionLaction{
		float: right;
		font-size: 40rpx;
	}
	.status_bar {
	     height: var(--status-bar-height);
	     width: 100%;
			  position:fixed;
			  top: 0;
			  z-index: 9999;
			  background: #ffffff;
	 }
	 .top_view{
			  height: var(--status-bar-height);
			  width: 100%;
			  position: fixed;
			  top:0;
			  z-index: 999;
	 }
	.uni-navbar{
		.uni-navbar__content{
		    border-bottom: 0!important;
		}
	}
// 	.fffffffff{
// 		/* #ifndef APP-PLUS-NVUE */
// 		display: flex;
// 		position: -webkit-sticky;
// 		/* #endif */
// 		position: sticky;
// 		top:88rpx;
// 		z-index: 998;
// 	}
.famousTop{width:100%; height:319rpx;  padding-left: 60rpx; box-sizing: border-box;position: relative;margin-top: 88rpx;}
.famousTop i{position:absolute; top:0rpx; left:0rpx; width:90rpx; height:90rpx; display: block; text-align: center; font-size:28rpx; line-height: 90rpx; color:#222;}
.famousTop img{position: absolute;width: 100%;height: 319rpx;top:0;left: 0}
.famousTop text{ display: block; position:absolute; top:120rpx; left:60rpx; color:#222; font-weight: bold; font-size:40rpx;}
.famousTop text.tit2{
	top:200rpx;
	font-size: 24rpx;
	color: #666;
	font-weight: inherit;
}
.kuaimiCompanyItem {
  border-bottom: 2rpx solid #F1F1F1;
  margin: 0 30rpx;
  padding-top: 30rpx;
  font-size: 0; }
  .kuaimiCompanyItem .companyLeft {
    width: 90rpx;
    display: inline-block;
    margin-right: 30rpx;
    vertical-align: top; }
    .kuaimiCompanyItem .companyLeft image {
      width: 90rpx;
      height: 90rpx;
      border-radius: 8rpx; }
  .kuaimiCompanyItem .companyRight {
    width: calc(100% - 120rpx);
    display: inline-block;
    margin-bottom: 24rpx; }
    .kuaimiCompanyItem .companyRight .companyName {
      font-size: 34rpx;
      margin-top: 20rpx;
      color: #222;
      text-align: left;
      margin: 0 0 20rpx 0;
      font-weight: bold; }
      .kuaimiCompanyItem .companyRight .companyName .famousLabel {
        display: inline-block;
        font-size: 24rpx;
        line-height: 30rpx;
        padding: 0 8rpx;
        border-radius: 4rpx;
        background: #FFF7EC;
        color: #FE8503;
		 margin-left: 10rpx;}
    .kuaimiCompanyItem .companyRight .companyInfo {
      font-size: 26rpx;
      color: #999;
      margin: 0 0 20rpx 0; }
      .kuaimiCompanyItem .companyRight .companyInfo text {
        text-decoration: none;
        margin: 0 10rpx; }
    .companyJob text {
      display: inline-block;
      font-size: 26rpx;
      color: #999;
      background: #F7F7F7;
      line-height: 48rpx;
      padding: 0 20rpx;
      max-height: 100rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0 16rpx 16rpx 0;
	   border-radius:8rpx;}
.moreLoad{ padding: 20rpx 0; text-align: center; color: #ccc; display: block;}
</style>
