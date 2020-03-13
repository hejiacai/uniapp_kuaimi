<template>
	<view>
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="psgSeekBg psgPrecise">
		    <view class="navigator">
				<view @click="back">
					<i class="getBack icon iconfont icon-backtrackx"></i>
				</view>
			</view>
		</view>
		<view class="famousTop">
			<img src="../../static/img/zhimingbg.png" alt="">
			<text>知名企业</text>
			<text class="tit2">入职名企、有保障、福利好</text>
		</view>
		<view class="jobListBd">
			<view class="kuaimiCompanyItem" v-for="(item,index) in famousCompanyAry" :key="index" @tap="turnCompanyDetail(item.company_id)">
				<view class="companyLeft">
					<image :src="item.company_photo ? item.company_photo:default_photo" mode=""></image>
				</view>
				<view class="companyRight">
					<view class="companyName">
						{{item.company_shortname}}
						<text class="famousLabel" v-for="(itemx,list) in item.company_recruit_type" :key="list">{{ itemx }}</text>
					</view>
					<view class="companyInfo">
						{{item.company_base_info}}
					</view>
					<view class="companyJob">
						<text v-for="(itemx,indexn) in item.jobsort_names">{{itemx}}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loandMore" v-show="isLoandMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import apiName from '../../static/commonjs/request/apiName.js';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default{
		components: {uniLoadMore},
		data() {
			return {
				famousCompanyAry:[],
				page_pageno:1,//第几页
				page_isnextpage:false,//是否翻页
				isLoandMore:false,
				loandMore:'more',
				default_photo:'//assets.huibo.com/img/blue/com_default.png'
			}
		},
		//加载更多
		onReachBottom(){
			// console.log("到底了");
			this.onReachMore();
		},
		computed: {
			...mapState(['token'])
		},
		onShow(){
			var _this = this;
			_this.$http.post(apiName.FAMOUS_COMPANY,{
				params:{
					page_pageno:_this.page_pageno,
					token:_this.token,
					page_pagesize:10
				}
			}).then(res => {
				_this.famousCompanyAry = res.data.data;
				_this.page_isnextpage = res.data.page.page_isnextpage;
				if(_this.page_isnextpage){
					_this.isLoandMore = true;
				}
			}).catch(err => {
				console.log('翻页出错了');
			});
		},
		onLoad() {
				
		},
		methods: {
			back() {
				uni.switchTab({
				    url: '../index/index'
				});
			},
			turnCompanyDetail(id){
				uni.navigateTo({
					url:'../companyDetail/companyDetail?company_id=' + id
				})
				uni.setStorageSync('isFamousCompany', 'hello')
			},
			onReachMore(){
				var _this = this;
				var page_isnextpage = _this.page_isnextpage;
				var page_pageno = _this.page_pageno
				if(page_isnextpage){
					page_pageno++;
					_this.loandMore = 'loading';
					_this.$http.post(apiName.FAMOUS_COMPANY,{
						params:{
							page_pageno:page_pageno,
							token:_this.token,
							page_pagesize:10
						} 
					}).then(res => {
						_this.famousCompanyAry.push(...res.data.data);
						_this.page_pageno = page_pageno;
						_this.page_isnextpage = res.data.page.page_isnextpage;
						
					}).catch(err => {
						console.log('翻页出错了');
					});
				}else{
					_this.loandMore = 'noMore';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// background: url(../../static/img/zhimingbg.png) no-repeat 0 0 100% 100%;
.famousTop{width:100%; height:319rpx;  padding-left: 60rpx; box-sizing: border-box;position: relative}
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
        padding: 2rpx 8rpx;
        border-radius: 4rpx;
        background: #FFF7EC;
        color: #FE8503;
		vertical-align: 4rpx;
		font-weight:300;
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
.navigator{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 20rpx;
	}
	.status_bar {
	         height: var(--status-bar-height);
	         width: 100%;
	    		  position:fixed;
	    		  top: 0;
	    		  z-index: 9999;
	    		  /* background: #333333!important; */
	     }
	     .top_view{
	    		  height: var(--status-bar-height);
	    		  width: 100%;
	    		  position: fixed;
	    		  top:0;
	    		  z-index: 999;
	     }
		 .psgSeekBg {
			 margin-top:var(--status-bar-height);
		 }
</style>
