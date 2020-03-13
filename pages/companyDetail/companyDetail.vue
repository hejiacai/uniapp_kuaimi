<template>
	<view class="companyDetailMain">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<view class="companyDetailTop">
			<view class="icon iconfont icon-backtrackx" @click="goBack"></view>
			
		</view>
		<view class="companyNameWrap">
			<view class="cyRight">
				<image :src="companyDeatilAry.company_logo_path" mode=""></image>
			</view>
			<view class="cyLeft">
				<view class="cyName">
					<text class="cyTit">{{ companyDeatilAry.company_shortname }}</text>
					<view style="display: flex;">
						<text class="cyTag" style="margin-right: 20rpx;" v-for="(item,index) in companyDeatilAry.company_recruit_type">{{ item }}</text>
						<!-- <text class="cyTag" v-if="companyDeatilAry.is_famous == 1">名企</text> -->
					</view>
				</view>
				<view class="cyNamex">
					<text>{{ companyDeatilAry.property_text }}&nbsp;|&nbsp;{{ companyDeatilAry.size_text }}&nbsp;|&nbsp;{{ companyDeatilAry.calling_text }}</text>
				</view>
			</view>
			<view class="topRight">
				<text @click="collectCompany" :class="isFav == 1 ? 'collectCut':''">{{ isFav == 0 ? '+关注':'已关注' }}</text>
				<text class="iconfont iconhome" @click="homeBack"></text>
			</view>
		</view>
		
		<view class="blogGerList">
			<text :class="iscompanyshow == 0 ? 'cut':''" @click="companyTab('0')">企业信息</text>
			<text :class="iscompanyshow == 1 ? 'cut':''" @click="companyTab('1')">在招职位({{!noData ? companyListAry.length:'0'}})</text>
		</view>
		
		<view class="companyshow" v-show="iscompanyshow == 0">
			<view class="cyArea">公司地址</view>
			<view class="companyMap" data-mapx="companyDeatilAry.map_x" data-mapy="companyDeatilAry.map_y" @click="companyMap($event)" >
				<view>
					<text class="icon iconfont icon-job_addressx"></text>
					<text>{{ companyDeatilAry.address }}</text>
				</view>
				<text class="icon iconfont icon-job_reward_morex" style="color: #ccc;"></text>
			</view>
			<view class="cyArea" style="padding-top: 50rpx;">公司简介</view>
			<!-- <view class="content" :class="[companyDeatilInfo.length > 200 ? 'contentHeight':'', isShowx ? '':'contentHeightAuto']">
				{{ companyDeatilAry.info }}
			</view> -->
			<view class="content" :class="[isShow?'':'ellipsis']">{{ companyDeatilAry.info }}</view>
			<!-- 文字开关 -->
			<view class="closeOther" v-if='isShow'  @click='openWord'>
				<i class="icon iconfont icon-job_collapsex" style="font-size: 12px;"></i>
			</view>
			<view class="closeOther" v-else @click='openWord'>
				<i class="icon iconfont icon-job_expandx" style="font-size: 12px;"></i>
			</view>
			<!-- <view class="iconfont  openOther" :class="isShowx ? 'iconjob_expandx':'iconjob_collapsex'" @click="isShow" v-show="companyDeatilInfo.length > 200"></view> -->
			<view v-if="companyPhotoAry.length > 0">
				<view class="cyArea">公司照片</view>
				<view class="companyPhoto">
					<scroll-view scroll-x class='scroll-imgs'>
						<image v-for="(item, index) in companyPhotoAry" :key="index" :src="item" @click="previewImgProject(index)"></image>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 在招职位 -->
		<view class="jobListBd" v-show="iscompanyshow == 1">
			
			<view class="jobRecruit" v-for="(itemx,numx) in companyListAry" :key="numx" @click="jobDetail(itemx.job_flag)">
				<i class="icon iconfont icon-home_new zuixin" v-if="itemx.is_today_issue && initNewSign(itemx.job_flag)"></i>
				<view class="jobListz">
					<view>{{ itemx.station }}</view>
					<text>{{ itemx.salary_text }}</text>
				</view>
				<view class="jobList03">
					 <view>{{ itemx.job_base_info }}</view>		
					<text class="jobRt">{{ itemx.refresh_time }}</text>
				</view>
				<view class="jobList02">
					<text v-for="(itemz,numz) in itemx.rewards">{{ itemz }}</text>
				</view>
			</view>
			
			<view class='noData' v-show="noData">
				<image src="../../static/img/icon_nocontent.png" mode=""></image>
				<text>暂无在招职位</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	
	import apiName from '../../static/commonjs/request/apiName.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				key: 'value',
				iscompanyshow:0,
				companyDeatilAry:[],
				companyListAry:[],
				companyDeatilInfo:'',
				isShowx:true,
				noData:false,
				company_id:'',
				isFav:'0',
				companyPhotoAry:[],
				isShow: false,
				isToday: true,
				noLook : true,
				isCompany: ''
			}
		},
		computed: {
			...mapState(['token'])
		},
		//加载更多
		onReachBottom(){
			// console.log("到底了");
			// if(iscompanyshow == 1){
			// 	this.onReachMore();
			// }
			
		},
		onLoad(options){
			var _this = this;
			_this.company_id = options.company_id;
			_this.$http.post(apiName.COMPANY_DETAIL,{
				params:{
					company_id:_this.company_id,
					token:_this.token
				}
			}).then(res => {
				_this.companyDeatilAry = res.data.data;
				_this.companyPhotoAry = res.data.data.photos;
				_this.companyDeatilInfo = res.data.data.info;
				_this.isFav = res.data.data.is_fav;
				_this.isCompany = res.data.data.company_id
			}).catch(err => {
				console.log('出错了');
			});
			
			_this.$http.post(apiName.COMPANY_ACTIVE_JOBS,{
				params:{
					company_id:_this.company_id,
					page_pagesize:50
				}
			}).then(res => {
				if(res.data.success && res.data.data){
					_this.companyListAry = res.data.data;
					for(var i = 0;i<res.data.data.length;i++){
						if(res.data.data[i].rewards.length>4){
							res.data.data[i].rewards.splice(4,res.data.data[i].rewards.length)
							res.data.data[i].rewards.push('...')
						}
					}
					if(_this.companyListAry.length == 0){
						_this.noData = true;
					}
				}else{
					_this.noData = true;
				}
			}).catch(err => {
				_this.noData = true;
			});
		},
		onShow() {
			
		},
		methods:{
			...mapMutations(['set_isCompanyDetail','set_isCompanyDetailId']),
			companyTab(index){
				if(index == 0){
					this.iscompanyshow = 0;
				}else{
					this.iscompanyshow = 1;
				}
			},
			//返回上一页
			goBack(){
				const isFamousCompany = uni.getStorageSync('isFamousCompany')
				const isMyCollectionC = uni.getStorageSync('isMyCollectionC')
				if(isFamousCompany) {
					uni.navigateTo({
						url:"../famousCompany/famousCompany"
					})
					uni.removeStorageSync('isFamousCompany')
				}else if(isMyCollectionC) {
					uni.navigateTo({
						url:"../myCollection/myCollection"
					})
					uni.removeStorageSync('isMyCollectionC')
				}else {
					uni.navigateBack({
						delta:1
					})
				}
			},
			//跳转到职位详情
			jobDetail(e){
				this.hideNewSign(e);
				uni.redirectTo({
					url: '../jobDetail/jobDetail?job_flag='+e
				});
				// this.set_isCompanyDetail(7)
				uni.setStorageSync('isCompanyDetail', this.isCompany)
				uni.removeStorageSync('isIndex')
				uni.removeStorageSync('isSearchDetail')
			},
			//打开地图
			companyMap(e){
				var _this = this;
				uni.openLocation({
					latitude: Number(_this.companyDeatilAry.map_y),
					longitude: Number(_this.companyDeatilAry.map_x),
					success: function () {
						console.log('success');
					}
				});
			},
			//关注企业
			collectCompany(){
				var _this = this;
				if(this.token==''){
					uni.navigateTo({
						url:"../login/login"
					})
					return;
				}
				console.log(_this.isFav);
				if(_this.isFav == '0'){
					_this.$http.post(apiName.FAV_COMPANY,{
						params:{
							company_id:_this.company_id,
							token:_this.token
						}
					}).then(res => {
						if(res.data.success){
							uni.showToast({
							    title: '关注成功',
							    duration: 2000
							});
							_this.isFav = '1';
						}else{
							_this.isFav = '0';
						}
					});
					
				}else{
					_this.$http.post(apiName.DEL_FAV_COMPANY,{
						params:{
							company_id:_this.company_id,
							token:_this.token
						}
					}).then(res => {
						if(res.data.success){
							uni.showToast({
							    title: '取消成功',
							    duration: 2000
							});
							_this.isFav = '0';
						}else{
							_this.isFav = '1';
						}
					});
				}
				
			},
			previewImgProject(e){
				//预览图片
				uni.previewImage({
				  //当前显示图片
				  current: this.companyPhotoAry[e],
				  urls: this.companyPhotoAry
				})
			},
			homeBack(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			// isShow(){
			// 	this.isShowx = !this.isShowx;
				
			// }
			openWord(){
				this.isShow = !this.isShow
			},
			initNewSign(job_flag){//初始化新标签,查缓存
				let isSignshow = true;
				let jobNewLooked_data = uni.getStorageSync('companyNewLooked');
					if(jobNewLooked_data && JSON.parse(jobNewLooked_data).indexOf(job_flag) > -1){
						isSignshow = false;
					}else{
						isSignshow = true;
					}
				return isSignshow;
			},
			hideNewSign(job_flag){//新标签查看后消失
				uni.getStorage({
					key:"companyNewLooked",
					success:function(res){
						let jobidList =res.data? JSON.parse(res.data):[];
						jobidList.push(job_flag);
						uni.setStorage({
							key: 'companyNewLooked',
							data: JSON.stringify(jobidList)
						});
					},
					fail:function(err){ //data not found
						uni.setStorage({
							key: 'companyNewLooked',
							data: JSON.stringify([job_flag])
						});
						console.log(err)
					}
				})
				
			}
		}
	}
</script>

<style scoped>
     .status_bar {
         height: var(--status-bar-height);
         width: 100%;
    		  position:fixed;
    		  top: 0;
    		  z-index: 9999;
    		  background: #333333!important;
     }
     .top_view{
    		  height: var(--status-bar-height);
    		  width: 100%;
    		  position: fixed;
    		  top:0;
    		  z-index: 999;
     }
.companyDetailMain{ background: #303237; color: #fff;}
.blogGerList{width:100%; background: #fff; border-radius:40rpx 40rpx 0 0; display: flex; border-bottom: 1rpx solid #f1f1f1; }
.blogGerList text{flex: 1; height: 110rpx; line-height: 110rpx; font-size: 34rpx; color: #666; text-align: center; position: relative;}
.blogGerList text:after{ 
	content: '';
	position: absolute;
	bottom: 0;
	left: calc(50% - 20rpx);
	background: #fff;
	height: 8rpx;
	width: 40rpx;
	border-radius: 4rpx;
}
.blogGerList text.cut{ color: #fb5958;}
.blogGerList text.cut:after{
	background: #fb5958;
}
.companyDetailTop{ display: flex; justify-content: space-between; padding: 20rpx 30rpx; align-items: center;margin-top:var(--status-bar-height);}
.companyDetailTop .bank{ font-size: 32rpx;}
.topRight text:nth-child(1){ padding: 4rpx 14rpx; background: #fb5958;  font-size: 24rpx; border-radius: 20rpx; margin-left: 20rpx; }
.topRight text:nth-child(2){ font-size: 40rpx;}
.topRight text.collectCut{ background: #acadaf; color: #fff;}
.companyNameWrap{ display: flex; padding: 40rpx 30rpx 50rpx 30rpx;}
.cyLeft{width:62%;margin-left: 30rpx;}
.cyRight image{ display: block;width:100rpx; height: 100rpx;border-radius: 8rpx;margin-top: 10rpx;}
.cyName .cyTit{ font-size: 46rpx;font-weight: bold;}
.cyName .cyTag{ font-size: 20rpx; background: #acadaf; color: #303237; border-radius: 4rpx;text-align: center;display: block;padding: 0 8rpx;height: 30rpx;line-height: 30rpx;margin-top: 22rpx;}
.cyNamex{ padding-top: 0rpx;line-height: 20rpx;margin-top: 26rpx;}
.cyNamex text{ font-size: 24rpx;}
.cyNamex text.cyLine{ margin: 0 10rpx; font-size: 16rpx;}
.cyArea{ padding: 40rpx 0 20rpx 0; color: #222; font-size: 32rpx;font-weight: bold;}
.companyshow{ background: #fff; color: #222; padding: 0 30rpx 60rpx 30rpx;}
.companyMap{ display: flex; justify-content: space-between; align-items: center; padding:0 0 10rpx 0;}
.companyMap view{width:90%;}
.companyMap text{ font-size: 28rpx; color: #666;}
.companyMap text.iconjob_addressx{ margin-right: 10rpx;}
.companyMap text.iconjob_reward_morex{ float: right;}
.content{ font-size: 28rpx; line-height: 48rpx; color: #666;}
.contentHeight{ height:288rpx; overflow: hidden;}
.contentHeightAuto{ height:auto;}
.openOther{ text-align: center; font-size: 24rpx; color: #999; padding: 16rpx 0 0 0;}

.jobListBd{ background: #fff; color: #222;}
.jobRecruit{ padding: 40rpx 30rpx 40rpx 30rpx; border-bottom: 1rpx solid #f1f1f1;position: relative;}
.jobListz{ display: flex; justify-content: space-between;}
.jobListz view{
	width: 50%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-weight: bold;
	font-size: 34rpx;
}
.jobListz text{
	float: right;
	color: #FB5958;
	font-weight: normal;
	font-size: 30rpx;
	padding-top: 2rpx;
}
.jobList03{ font-size: 26rpx; color: #999; padding-top: 20rpx; display: flex; justify-content: space-between;}
.jobList03 text{ font-size: 22rpx; margin: 0 10rpx; display: inline-block; vertical-align: 0;}
.jobList03 .jobRt{font-size: 24rpx;}
.jobList02{ padding-top: 20rpx;width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}
.jobList02 text{
	    font-size: 12px;
	    margin-right: 8px;
	    background: #f4f5f8;
	    padding: 3px 8px;
	    color: #999;
	    border-radius: 4rpx;
	    margin-bottom: 8px;
}
.companyPhoto{ padding: 20rpx 0;}
.scroll-imgs{width: 100%;white-space:nowrap;display: flex;align-items: center;height: 100px;overflow: hidden;}
.scroll-imgs image{ border-radius: 16rpx; width:236rpx; height: 160rpx; margin-right: 24rpx;}
.ellipsis{
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.closeOther{
		font-size: 24rpx;
		color: #ccc;
		text-align: center;
		margin-top: 26rpx;
	}
	.zuixin {
		position: absolute;
		top: 0;
		right: 0;
		color: #FE8503;
		font-size: 60rpx;
	}
</style>
