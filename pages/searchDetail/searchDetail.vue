<template>
	<!-- <view class="">-->
	<view class="searchDetail">
		<view class="status_bar">
			<view class="top_view"></view>
		</view> 
		<view class="searchTop">
			<view class="search-nav-bar">
				<view class="icon iconfont icon-backtrackx back" @tap="backIndex"></view>
				<view class="search-input" @tap="turnSearch" >
					<view class="icon iconfont icon-home_navigation_searchx searchIcon"></view>
					<input type="text" :placeholder="defaultKey" disabled/>
				</view>
			</view>
			<filterTabBar></filterTabBar>
		</view>
		<view class="jobList">
            <view v-if="!noData">
                <jobitemCard v-for="(jobItem,index) in jobList" :key="index" :jobItem="jobItem"></jobitemCard>
            </view>
		   <view class="wunei" v-else>
		       <view class="imgv">
		           <img src="../../static/img/icon_nocontent.png" alt="" style="margin: 0 auto;margin-top: 100rpx;">
		       </view>
		       <view class="zwnr">暂无内容</view>
		       <view class="kdbr">苦苦等待,不如主动出击</view>
		   </view>
            <uni-load-more :status="loandMore"></uni-load-more>
			<!-- <uni-load-more :loadingType="1" v-show="isLoandMore"></uni-load-more> -->
		</view>
	</view>
	<!-- </view> -->

</template>

<script>
    import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	// import noData from "./../../components/noData";
	import filterTabBar from './../../components/filterTabBar';
	import jobitemCard from "./../../components/jobItemCard";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import apiName from './../../static/commonjs/request/apiName.js';
	import eventList from '../../static/commonjs/eventList/eventList.js';
	export default {
		data() {
			return {
                loandMore:'hide',
                page_pageno:1,
				jobList: [],
				noData:false,
				defaultKey:'搜索职位名称/公司名称',
			};
		},
		computed: {
			...mapState(['token','presentAddress','_keyWordStr','jobCategory','indexSearchJob','_cityCode','_sexCode','_workTimeCode','_chooseSalaryCode','_ageCode','_chooseCallingList','_chooseRewardsList','_chooseJobList'])
		},
		
		components: {
			filterTabBar,
			jobitemCard,
			uniLoadMore
			// noData,
		},
        //加载更多
        onReachBottom(){
        	this.onReachMore();
        },
		onShow(){
			let _this = this;
			uni.$on('searchJob', () => {
				_this.page_pageno=1;//搜索重置页码
				_this.jobList=[];//重置数据
				_this.filterTabbar_searchJob();
			});
			uni.$on(eventList.GO_TO_JOBDETAIL, (data) => {
				_this.set_routerBackHistoy('../searchDetail/searchDetail');
				uni.navigateTo({
					url: '../jobDetail/jobDetail?job_flag=' + data.job_flag
				});
				uni.setStorageSync('isSearchDetail', 'hello')
				uni.setStorageSync('isSearchDetailTwo', 'hello')
			});
			
		},
		onHide(){
			uni.$off('searchJob');
			uni.$off(eventList.GO_TO_JOBDETAIL);
		},
		onUnload() {
			uni.$off('searchJob');
			uni.$off(eventList.GO_TO_JOBDETAIL);
		},
		onLoad() {
			let _this = this;
			this.defaultKey = this._keyWordStr=="" ? '搜索职位名称/公司名称' : this._keyWordStr;
			_this.loandMore='loading';
			// if(page_isnextpage){
			_this.$http.post(apiName.JOB_SEARCH, {
				params: {
					token: this.token?this.token:'',
					page_pageno: this.page_pageno,
					page_pagesize: 8,
					keyword: this._keyWordStr,
					area_id:this._cityCode?this._cityCode:'',
					sex:this._sexCode?this._sexCode:'',
					schedule:this._workTimeCode?this._workTimeCode:'',
					salary:this._chooseSalaryCode?this._chooseSalaryCode:'',
					age:this._ageCode?this._ageCode:'',
					calling_id:this._chooseCallingList.length>0?this._chooseCallingList.join(','):'',
					reward_ids:this._chooseRewardsList.length>0?this._chooseRewardsList.join(','):'',
					job_sorts:this._chooseJobList.length>0?this._chooseJobList.join(','):'',
					is_neer: false,
					map_x: "",
					map_y: "",
					map_d: "",
				}
			}).then(res => {
				_this.loandMore = 'hide';
				if (res.data.success) {
					_this.page_pageno= res.data.data.cur_page;
					_this.jobList = res.data.data.job_list;
					if(_this.jobList.length<1){
						_this.noData = true
					}else{
						_this.noData = false
					}
				} else {
					// console.log('首页职位列表请求成功',res.data.data.job_list);
					_this.$KM.showToast(res.data.msg);
				}
			}).catch(err => {
				_this.loandMore = 'hide';
				console.error('出错了');
			})
		},
		methods: {
			...mapMutations(['set_routerBackHistoy','set_isJobDetail','set_isJobDetailId']),
            onReachMore(){
            	var _this = this;
            	// var page_isnextpage = _this.page_isnextpage;
            		this.loandMore = 'loading';
            		this.$http.post(apiName.JOB_SEARCH,{
            			params: {
            				token: this.token?this.token:'',
            				page_pageno: ++this.page_pageno,
            				page_pagesize: 8,
            				keyword: this._keyWordStr,
            				area_id:this._cityCode?this._cityCode:'',
            				sex:this._sexCode?this._sexCode:'',
            				schedule:this._workTimeCode?this._workTimeCode:'',
            				salary:this._chooseSalaryCode?this._chooseSalaryCode:'',
            				age:this._ageCode?this._ageCode:'',
            				calling_id:this._chooseCallingList.length>0?this._chooseCallingList.join(','):'',
            				reward_ids:this._chooseRewardsList.length>0?this._chooseRewardsList.join(','):'',
            				job_sorts:this._chooseJobList.length>0?this._chooseJobList.join(','):'',
            				is_neer: false,
            				map_x: "",
            				map_y: "",
            				map_d: "",
            			}
            		}).then(res => {
						_this.loandMore = 'hide';
            			if (res.data.success) {
							_this.jobList.push(...res.data.data.job_list);
							_this.page_pageno = res.data.data.cur_page;
							if(res.data.data.job_list.length==0){
								_this.loandMore='noMore';
							}
            			}else{
            				_this.$KM.showToast(res.data.msg);
            			}
            		}).catch(err => {
						_this.loandMore = 'hide';
            			console.log('翻页出错了');
            		});
            	// }else{
            	// 	_this.loandMore = 'noMore';
            	// }
            },
			backIndex() {
				uni.switchTab({
					url: '../index/index'
				});
			},
			turnSearch(){
				uni.redirectTo({
					url:'../search/search'
				})
			},
			filterTabbar_searchJob(){
				let fliterData = [];
				let _this = this;
				this.loandMore = 'loading';
				this.$http.post(apiName.JOB_SEARCH,{
					params:{
						token:this.token?this.token:'',
						page_pageno: this.page_pageno,
						page_pagesize: 8,
						keyword: this._keyWordStr,
						area_id:this._cityCode?this._cityCode:'',
						sex:this._sexCode?this._sexCode:'',
						schedule:this._workTimeCode?this._workTimeCode:'',
						salary:this._chooseSalaryCode?this._chooseSalaryCode:'',
						age:this._ageCode?this._ageCode:'',
						calling_id:this._chooseCallingList.length>0?this._chooseCallingList.join(','):'',
						reward_ids:this._chooseRewardsList.length>0?this._chooseRewardsList.join(','):'',
						job_sorts:this._chooseJobList.length>0?this._chooseJobList.join(','):'',
						is_neer: false,
						map_x: "",
						map_y: "",
						map_d: "",
					}
				}).then(res=>{
					_this.loandMore = 'hide';
					// console.log('多选返回的结果',res.statusCode)
					if(res.data.success){
						_this.page_pageno = res.data.data.cur_page;
						_this.jobList = res.data.data.job_list;
						if(_this.jobList.length<1){
						    _this.noData = true
						}else{
						    _this.noData = false
						}
					}else{
						this.$KM.showToast(res.data.msg)
					}
				}).catch(error=>{
					_this.loandMore = 'hide';
					console.log(error)
				})
			},
			initdata(){
				this.loandMore='hide';
				this.page_pageno=1;
				this.jobList=[];
			},
		},

	}
</script>
<style lang="scss">
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
	.searchTop{
		width: 100%;
		height: auto;
		position: fixed;
		top:var(--status-bar-height);
		padding-top: 70rpx;
		z-index: 999;
		background: #ffffff;
	}
	.searchDetail {
		width: 100%;
	}

	.searchDetail {
		.search-nav-bar {
			width: 100%;
			height: 62rpx;
			line-height: 62rpx;
			border-bottom: 1px solid #f1f1f1;
			padding: 10rpx 0;
		}

		.back {
			font-size: 32rpx;
			width: 76rpx;
			float: left;
			margin-right: 20rpx;
			text-align: center;
		}

		.search-input {
			box-shadow: 0 0 10px #e8e8e8;
			float: left;
			background: #FFFFFF;
			height: 60rpx;
			line-height: 60rpx;
			width: 530rpx;
			border-radius: 10rpx;
			align-items: center;
			padding-left: 20rpx;
		}

		.searchIcon {
			float: left;
			color: #ccc;
			font-size: 32rpx;
			text-align: center;
			margin-right: 10rpx;
		}

		.search-input input {
            // box-sz
            box-sizing: border-box;
			float: left;
			font-size: 28rpx;
			width: 450rpx;
			height: 100%;
			line-height: 40rpx;
			text-align: left;
		}

		.search-btn {
			float: left;
			font-size: 30rpx;
			line-height: 60rpx;
			text-align: center;
			width: 100rpx;
		}
	}

	//职位卡片模块
	.jobList {
		width: 100%;
		overflow: hidden;
		margin-top: 328rpx;
	}

	.jobList {}
	.imgv{text-align: center;}
	.wunei{
	    margin-top:20rpx;
	}
	.zwnr{font-size:34rpx;text-align: center;color: #555;margin-bottom:20rpx}
	.kdbr{    color: #999;
	    font-size: 28rpx;
	    text-align: center;}
</style>