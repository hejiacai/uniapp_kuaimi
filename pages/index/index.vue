<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>	
		<!-- <view class="mblueDownloand">
			<image src="../../static/img/uni_home_down.png" mode=""></image>
		</view> -->
		<view class="publicHeight"></view>
		<view class="setHeadBdPop">
			<view class="setHeadBd" @click="searchPop">
				<i class="iconfont icon-home_navigation_searchx"></i><text>搜索职位名称/公司名称</text>
			</view>
			<view class="icon iconfont icon-home_message setHeadz" @click="trunMsg">
				<view class="redtip" v-if="has_msg"></view>
			</view>
			<text class="setHeadMsg" v-if="false">1</text>
		</view> 
		<view class="swiper-tab" style="display: none;">
			<swiper :indicator-dots="true" :autoplay="true" indicator-color="#fff" indicator-active-color="#fb5958" :interval="3000"
			 :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image src="//imgs.huibo.com/CompanyImages/a_dv_img/full0102519935.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="//imgs.huibo.com/CompanyImages/a_dv_img/full0102696338.jpg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="homeNav">
			<view class="nav-item" @tap="searchSeleJob('普工')" data-name="我是附近职位哦" data-age="18" data-big="小咕咕">
				<image src="../../static/img/home_pugong.png" mode=""></image>
				<text>普工</text>
			</view>
			<view class="nav-item" @tap="searchSeleJob('保安')">
				<image src="../../static/img/home_security.png" mode=""></image>
				<text>保安</text>
			</view>
			<view class="nav-item" @tap="searchSeleJob('临时工')">
				<image src="../../static/img/casual.png" mode=""></image>
				<text>临时工</text>
			</view>
			<view class="nav-item" @tap="searchSeleJob('服务员')">
				<image src="../../static/img/home_waiter.png" mode=""></image>
				<text>服务员</text>
			</view>
		</view>

		<view class="jobHot">
			<view class="hotx01" @tap="nearbyJob">
				<text class="sub_t01">附近职位</text>
				<text class="sub_t02">离家近</text>
				<image src="../../static/img/uni_icon01.png" mode=""></image>
			</view>
			<view class="hotx02" @click="famousCompany">
				<text class="sub_t01">知名企业</text>
				<text class="sub_t02">福利好</text>
				<image src="../../static/img/uni_icon02.png" mode=""></image>
			</view>
			<view class="hotx03" @click="jobFairBack">
				<text class="sub_t01">招聘会</text>
				<text class="sub_t02">机会多</text>
				<image src="../../static/img/uni_icon03.png" mode=""></image>
			</view>
			<view class="hotx04" @click="educationalTraining">
				<text class="sub_t01">教育培训</text>
				<text class="sub_t02">能力提升</text>
				<image src="../../static/img/uni_icon04.png" mode=""></image>
			</view>
		</view>
		<view class="activeListBd">
			<view class="activeList" v-for="(item,index) in ceshiAry" :key="index">
				<image :src="item.company_photo?item.company_photo:defaultImg"></image>
				<view class="">
					{{ item.station }}
					<view>
						{{ item.age_text }}
					</view>
				</view>
			</view>
		</view>
		<view class="intenPoz" v-if="token">
			<text class="intention">{{seletJob}}</text>
			<button @tap="changeJob"><text class="iconfont icon-home_edit"></text>修改</button>
		</view>
		<!-- <filterTabBar ref="filterTabBar"></filterTabBar> -->
		<view class="isPosiFix" v-show="isPosiFix">
			<view class="search-nav-bar">
				<view class="search-input" @click="searchPop(true)">
					<view class="icon iconfont icon-home_navigation_searchx searchIcon"></view>
					<input type="text" value="" placeholder="搜索职位名称/公司名称" disabled/>
				</view>
				<view class="icon iconfont icon-home_navigation_messagex setHeadz" @click="trunMsg">
					<view class="redtip" v-if="has_msg"></view>
				</view>
			</view>
			<filterTabBar :isposiFix="true" :isIndex="isSearchDetailBack"></filterTabBar>
		</view>
		<!-- <jobitemCard v-for="(jobItem,index) in jobList" :key="index" :jobItem="jobItem"></jobitemCard> -->
		<view class="job_Lsit_item">
		<filterTabBar ref="filterTabBar" :isIndex="isSearchDetailBack"></filterTabBar>
        <view v-if="!waitA">
            <jobitemCard v-for="(jobItem,index) in jobList" :key="index" :jobItem="jobItem"></jobitemCard>
        </view>
		<!-- <noData v-else></noData> -->
        <view class="wunei" v-else>
            <view class="imgv">
                <img src="../../static/img/icon_nocontent.png" alt="" style="display: block;margin: 0 auto;">
            </view>
            <view class="zwnr">暂无内容</view>
            <view class="kdbr">苦苦等待,不如主动出击</view>
        </view>
		<uni-load-more :status="loandMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
			mapState,
			mapMutations
		} from 'vuex';
	import filterTabBar from './../../components/filterTabBar';
	import jobitemCard from "./../../components/jobItemCard";
	// import noData from "./../../components/noData";
	import apiName from '../../static/commonjs/request/apiName.js';
	import eventList from '../../static/commonjs/eventList/eventList.js';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	export default {
		data() {
			return {
                waitA:false,
				page_pageno:1,
				loandMore:'hide',
				jobsortList:[],
				seletJob:'设置意向职位即可...',
				isFixed: false,
				swiper_table_clientHeight: '',
				scrollTop: '',
				ceshiAry: [],
				indicatorColor: "#ffffff",
				defaultImg: '//assets.huibo.com/img/mobile/enterprise_img_@2x.png',
				jobList: [],
				isPosiFix: false,
				filterTabBarTop: 0,
				has_msg:false,
				offtouch:false,
				isSearchDetailBack:false,
			}
		},
		
		onPageScroll(opt) {
			if (opt.scrollTop >= this.filterTabBarTop) {
				this.isPosiFix = true;
			} else {
				this.isPosiFix = false;
			}
		},
		components: {
			uniLoadMore,
			filterTabBar,
			jobitemCard,
		},
		onShow() {
				this.initData();
				this.set_keyWordStr('');
				this.getCommonJob();
				let _this = this;
				this.seletJob = this.jobCategory.join('  |  ');
				uni.$on(eventList.GO_TO_JOBDETAIL, (data) => {
					// console.log('首页执行跳转');
					uni.navigateTo({
						url: '../jobDetail/jobDetail?job_flag=' + data.job_flag
					});
					uni.setStorageSync('isIndex', 'hello')
					uni.setStorageSync('isIndexTwo', 'hello')
				});
				uni.$on('searchJob', (data) => {
					uni.navigateTo({
						url: '../searchDetail/searchDetail'
					})
				});
				uni.$on('savaJobCategory', (data) => {
					this.$http.get(apiName.SETEXPJOBSORT,{
						params: {
							token:this.token,
							exp_jobsorts:data.length>0?data.join(','):'',
						}
					}).then(res=>{
						if(res.data.success){
							_this.$KM.showToast('请求职位成功','success');
						}else {
							_this.$KM.showToast(res.data.msg)
						}
					}).catch(err=> {
						throw err
					})
				});
				uni.$emit('reWriteFliter');
		},
		onUnload() {
			uni.$off('searchJob');
			uni.$off(eventList.GO_TO_JOBDETAIL);
			uni.$off('savaJobCategory');
		},
		onHide(){
			uni.$off('searchJob');
			uni.$off(eventList.GO_TO_JOBDETAIL);
			uni.$off('savaJobCategory');
		},
		onReady(){
			//#ifndef H5
			this.$location('.job_Lsit_item').then(res=>{
				this.filterTabBarTop = res.top - 20 
			})
			//#endif
		},
		computed:{
			...mapState(['token','_keyWordStr'])
		},
		mounted() {
			//#ifdef H5
				this.filterTabBarTop = this.$refs.filterTabBar.$el.offsetTop;
			//#endif
			// this.filterTabBarTop = this.$refs.filterTabBar.$el.offsetTop;
		},

		//加载更多
		onReachBottom(){
            if(this.waitA){
                this.isLoandMore = false;
				this.loandMore='hide';
                return;
            }else{
                this.onReachMore();
            }
		},
		computed: {
			...mapState(['token','presentAddress','jobCategory','indexSearchJob','_cityCode','_sexCode','_workTimeCode','_chooseSalaryCode','_ageCode','_chooseCallingList','_chooseRewardsList','_chooseJobList'])
		},
		methods: {
			...mapMutations(['set_keyWordStr','set_routerBackHistoy']),
            trunMsg(){
                if(!this.token){
                     uni.navigateTo({
                    	url:'../login/login'
                    })
                }else{
                   uni.navigateTo({
                   	url:'../person/msg/msg'
                   }) 
                }
            },
			onReachMore(){
				var _this = this;
				_this.loandMore='loading';
					let job_sorts = ''
					let aa = []
					if(_this.indexSearchJob&&_this.indexSearchJob.length>0){
						_this.indexSearchJob.forEach(item=>{
							aa.push(item.jobsort)
						})
						job_sorts = aa.join()
					}
					_this.$http.post(apiName.COMMON_SEARCH,{
						params: {
							isOnshow:false,
							token:this.token,
							page_pageno: ++this.page_pageno,
							page_pagesize: 8,
							keyword: "",
							area_id:'',
							sex:'',
							schedule:'',
							salary:'',
							age:'',
							calling_id:'',
							reward_ids:'',
							job_sorts:'',
							is_neer: false,
							map_x: "",
							map_y: "",
							map_d: "",
						}
					}).then(res => {
						if (res.data.success) {
							_this.page_pageno = res.data.data.cur_page;
							if(res.data.data.job_list.length==0){
								_this.loandMore='noMore';
							}else{
								let setT = setTimeout(()=>{
									_this.loandMore='hide';
									clearTimeout(setT);
								},500)
							}
						_this.jobList.push(...res.data.data.job_list);
						// _this.page_isnextpage = res.data.page.page_isnextpage;
						}else{
							_this.$KM.showToast('请求职位列表接口失败')
						}
					}).catch(err => {
						_this.loandMore='hide';
					});
				// }else{
				// 	_this.loandMore = 'noMore';
				// }
			},
			searchSeleJob(keyWordStr){
				this.set_keyWordStr(keyWordStr);
				this.set_routerBackHistoy('../searchDetail/searchDetail');
				uni.navigateTo({
					url: '../searchDetail/searchDetail'
				});
			},
			changeJob(){
				// console.log('搜索的职位哦哦哦哦哦',this.jobsortList)
				let params= {
					type:'index',
					expect_jobsort: this.jobsortList
				}
				params = JSON.stringify(params)
				uni.navigateTo({
					url: `../person/resume/jobCategory/jobCategory?params=${params}`
				})
			},
			getCommonJob(){
				var _this = this;
				let job_sorts = ''
				let aa = []
				if(_this.indexSearchJob&&_this.indexSearchJob.length>0){
					_this.indexSearchJob.forEach(item=>{
						aa.push(item.jobsort)
					})
					job_sorts = aa.join()
				}
				_this.loandMore='loading';
				_this.$http.post(apiName.COMMON_SEARCH, {
					params: {
						token: this.token,
						page_pageno: _this.page_pageno,
						page_pagesize: 8,
						keyword: "",
						area_id:'',
						sex:'',
						schedule:'',
						salary:'',
						age:'',
						calling_id:'',
						reward_ids:'',
						job_sorts: '',
						is_neer: false,
						map_x: "",
						map_y: "",
						map_d: "",
					}
				}).then(res => {
					_this.loandMore='hide';
					if (res.data.success == true) {
						_this.page_pageno = res.data.data.cur_page;
						let aa = []
						if(_this.indexSearchJob && _this.indexSearchJob.length>0){
							// debugger
							_this.jobsortList = []
							_this.jobsortList = _this.indexSearchJob
							aa = _this.indexSearchJob
						}else{
							_this.jobsortList = res.data.data.expect_jobsort?res.data.data.expect_jobsort:''
							aa = res.data.data.expect_jobsort
						}
						let bb = []
						if(res.data.data.expect_jobsort&&res.data.data.expect_jobsort.length>0){
							aa.forEach(item=>{
								bb.push(item.jobsort_name)
							})
							_this.seletJob = bb.join('  |  ')
						}
						_this.has_msg = res.data.data.has_msg;
						// _this.seletJob = res.data.data.exp_desc_str
						_this.jobList.push(...res.data.data.job_list)
					} else {
						_this.$KM.showToast(res.data.msg);
					}
				}).catch(err => {
					_this.loandMore='hide';
					_this.$KM.showToast(err);
				})
			},
			searchJob(e) {
				// this.jobList = e
				// console.log('返回的职位搜索', e)
			},
			nearbyJob(){
				uni.navigateTo({
					url: '../nearbyJob/nearbyJob?type=nearbyJob'
				})
			},
			searchPop(isFix = false) {
				if (isFix) {
					this.isPosiFix = false
				};
				uni.navigateTo({
					url: '../search/search'
				})
			},
			famousCompany() {
				uni.navigateTo({
					url: '../famousCompany/famousCompany'
				});
			},
			jobFairBack() {
				uni.navigateTo({
					url: '../jobFair/jobFair'
				});
			},
            // this.$KM.showToast('敬请期待');
			educationalTraining() {
                uni.navigateTo({
                	url:"../eduTrain/eduTrain"
                })
			},
			thisTit(e) {
				// console.log(e.currentTarget.dataset.name);
				// console.log(e.currentTarget.dataset.age);
				// console.log(e.currentTarget.dataset.big);
			},
			getJobList() {
				let _this = this;
				_this.$http.post('', {

				}).then(res => {
					if (res.data.success) {
						_this.seed = res.data.data.seed;
					}
				}).catch(err => {
					console.error('出错了', err)
				})
			},
			jubao() {
				uni.navigateTo({
					url: '../jobDetail/postReport'
				})
			},
			initData(){ //防止 物理按键返回onshow 执行
				this.page_pageno = 1;
				this.jobList = [];
			},
			// getSeletJob(){
			// 	this.$http.get(apiName.RESUME_INFO,{
			// 		params: {
			// 			token: this.token,
			// 			is_sync_hb: 0
			// 		}
			// 	}).then(res=>{
			// 		if(res.data.success){
			// 			console.log('登陆者的求职意向',res.data.data.expect_jobsort_ids)
			// 			if(res.data.data.expect_jobsort&&res.data.data.expect_jobsort.length>0){
			// 				this.seletJob =
			// 				res.data.data.expect_jobsort
			// 			}
			// 			this.getCommonJob(res.data.data.expect_jobsort_ids)
			// 		}else{
			// 			this.$KM.showToast(res.data.msg)
			// 		}
			// 	}).catch(error=>{
			// 		console.log(error)
			// 	})
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.publicHeight{ background: #FB5958;}
    .imgv{text-align: center;}
    .wunei{
        margin-top:20rpx;
    }
    .zwnr{font-size:34rpx;text-align: center;color: #555;margin-bottom:20rpx}
    .kdbr{    color: #999;
        font-size: 28rpx;
        text-align: center;}
	.status_bar {
	     height: var(--status-bar-height);
	     width: 100%;
			  position:fixed;
			  top: 0;
			  z-index: 9999;
			  background: #ffffff!important;
	 }
	 .top_view{
			  height: var(--status-bar-height);
			  width: 100%;
			  position: fixed;
			  top:0;
			  z-index: 999;
	 }
	.job_Lsit_item{
		width: 100%;
		height: auto;
		overflow: auto;
	}
	.intenPoz .iconfont{ font-size: 28rpx; display:inline-block;vertical-align: middle; margin-right: 10rpx;}
	.intenPoz{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 44px;
		border-bottom: 1px solid #f3f3f3;
		box-sizing: border-box;
		padding: 0 30rpx;
		.intention{
			font-weight: normal;
			font-size: 30rpx;
			color: #666666;
		}
		button{
			    // margin-right: 15px;
			    padding: 0 12rpx;
			    border-radius: 30rpx;
			    // float: right;
			    height: 42rpx;
			    line-height: 42rpx;
				width: 120rpx;
			    color: #fa5858;
			    text-align: center;
			    border: 1px solid #fa5858!important;
			    font-size: 24rpx;
				margin: 0!important;
				background-color: #FFFFFF;
			    // margin-top: 11px;
		}
		button::after{
			border: 0;
		}
	}
	uni-button:after {
	    border: 0!important;
	}
	.uni-toast{
		width: 100rpx!important;
		height: 100rpx!important;
		.uni-icon_toast{
			width: 50rpx!important;
			height: 50rpx!important;
		}
		.uni-toast__content{
			
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.mblueDownloand {
		width: 100%;
		margin-top: var(--status-bar-height);
	}

	.mblueDownloand image {
		display: block;
		width: 100%;
		height: 120rpx;
	}

	.swiper-tab {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.setHeadBdPop {
		width: 100%;
		height: 213rpx;
		background: url(../../static/img/uni_home_bg.jpg) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.setHeadBd {
		background: #fff;
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #c5c5c5;
		text-align: center;
		margin: 129rpx auto 0 auto;
		box-shadow: 0 0 20rpx #e8e8e8;
	}

	.setHeadBd i {
		display: inline-block;
		line-height: 60rpx;
		margin: 0 10rpx 0 30rpx;
	}

	.setHeadz {
		font-size: 48rpx;
		line-height: 48rpx;
		height: 48rpx;
		color: #fff;
		position: absolute;
		top: 44rpx;
		right: 30rpx;
	}
	.redtip{
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #FF0000;
		position: absolute;
		right: 2rpx;
		top: 0;
	}
	.setHeadMsg {
		font-size: 20rpx;
		color: #fb5958;
		background: #fff;
		position: absolute;
		top: 37rpx;
		right: 20rpx;
		border-radius: 50%;
		padding: 4rpx 8rpx;
		line-height: 22rpx;
		height: 22rpx;
	}

	.divHeight {
		height: 100rpx;
	}

	.swiper-tab swiper {
		width: 100%;
		height: 180rpx;
	}

	.swiper-item {
		width: 100%;
		height: 180rpx;
	}

	.swiper-item image {
		display: block;
		width: 100%;
		height: 180rpx;
	}

	.homeNav {
		padding: 40rpx 30rpx 20rpx 30rpx;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.homeNav .nav-item {
		width: 25%;
		flex: 1;
		text-align: center;
	}

	.homeNav .nav-item image {
		display: block;
		width: 88rpx;
		height: 74rpx;
		margin: 0 auto;
	}

	.homeNav .nav-item text {
		color: #222;
		font-size: 24rpx;
	}

	.jobHot {
		padding: 30rpx;
		padding-bottom: 50rpx;
		border-bottom: 10rpx solid #f6f8fa;
		width: 100%;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.jobHot view {
		width: 31%;
		background: #eee;
		border-radius: 8rpx;
	}

	.jobHot .hotx01 {
		background: linear-gradient(to bottom right, #fff, #ffe6dd);
	}

	.jobHot .hotx02 {
		background: linear-gradient(to bottom right, #fff, #fef1cf);
	}

	.jobHot .hotx03 {
		background: linear-gradient(to bottom right, #fff, #d3edff);
	}

	.jobHot .hotx04 {
		background: linear-gradient(to bottom right, #fff, #d4f7e9);
	}
	.jobHot view{overflow: hidden;}
	.jobHot view .sub_t01 {
		font-size: 28rpx;
		color: #333;
		padding: 14rpx 0 0 25rpx;
		font-weight: bold;
		display: block;
	}

	.jobHot view .sub_t02 {
		display: block;
		font-size: 20rpx;
		color: #222;
		padding: 4rpx 0 0rpx 25rpx;
	}

	.jobHot view image {
		display: block;
		float: right;
		margin-right: 9rpx;
		height: 38rpx;
	}

	.jobHot .hotx01 image {
		width: 33rpx;
	}

	.jobHot .hotx02 image {
		width: 37rpx;
	}

	.jobHot .hotx03 image {
		width: 37rpx;
	}

	.jobHot .hotx04 image {
		width: 48rpx;
	}

	.search-nav-bar {
		width: 100%;
		height: 82rpx;
		line-height: 62rpx;
		padding: 10rpx 110rpx 10rpx 20rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	// .isPosiFix {
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	background: #FFFFFF;
	// 	height: 164rpx;
	// 	z-index: 998;
	// }
	.isPosiFix {
		top:var(--status-bar-height);
		position: fixed;
		// top:var(--status-bar-height);
		left: 0;
		width: 100%;
		background: #FFFFFF;
		height: 164rpx;
		z-index: 998;
		padding-top: 80rpx;
	}

	.search-input {
		box-shadow: 0 0 10px #e8e8e8;
		float: left;
		background: #FFFFFF;
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		border-radius: 10rpx;
		align-items: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.searchIcon {
		float: left;
		color: #ccc;
		font-size: 32rpx;
		text-align: center;
		margin-right: 10rpx;
	}

	.search-input input {
		float: left;
		font-size: 28rpx;
		width: 450rpx;
		height: 40rpx;
		line-height: 40rpx;
		padding: 10rpx 0;
		text-align: left;
	}

	.activeListBd {
		width: 100%;
		box-sizing: border-box;
	}

	.activeList {
		padding: 30rpx;
		background: #fff;
		margin-bottom: 10rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 10rpx solid #eee;
	}

	.activeList image {
		display: block;
		width: 88rpx;
		height: 88rpx;
		margin-right: 20rpx;
		border-radius: 50%;
	}

	.activeList view {
		width: 80%;
		font-size: 24rpx;
		color: #222;
		line-height: 48rpx;
	}

	.isPosiFix .setHeadz {
		color: #222222;
		top: 44px;
	}
</style>
