<template>
	<view class="jobfair_wrap">
		<view class='spotJob'>
			<view class="spotJobz">
				<text class="iconfont icon-icon-svg1" style="font-size:34rpx;"></text>
				<text class="tit2">{{ time }}</text>
			</view>
			<view class="spotJobz">
				<text class="iconfont icon-nearby_navigation_positioningx"></text>
				
				<view class="">
					<view class="tit2">
						{{ address }}
						<text class="tit3">{{ way1 }}</text>
						<text class="tit3">{{ way2 }}</text>
					</view>
				</view>
				
			</view>
			<view class="spotJobz">
				<text class="iconfont icon-icon-kuaimi_tips_icon" style="font-size:34rpx;"></text>
				<text class="tit2">招聘会参会企业、招聘职位、展位号在 前一天18点前公布</text>
			</view>
		</view>
		
		<view class='spotJobx'>
		
			<view class="spotJob_list" :class="item.is_send_emphasis == 1 ? 'spotJob_listx':''" v-for="(item,index) in fairList" :key="index" @click="goFairDt(item.date_url,item.subject)">
				<view class='spotJob_lf'>
					<text>{{ item.week }}</text>
					<text>{{ item.date }}</text>
				</view>
				<view class='spotJob_rt'>
					<text>{{ item.subject }}</text>
					<text class="iconfont icon-job_reward_morex"></text>
				</view>
			</view>
	
		</view>
		
		<view class='noData' v-show="noData">
			<image src="../../static/img/icon_nocontent.png" mode=""></image>
			<text>暂时没有新的招聘会</text>
		</view>
			
	</view>
</template>

<script>
	import {
			mapState,
			mapMutations
		} from 'vuex';
	import apiName from '../../static/commonjs/request/apiName.js';
	export default{
		data() {
			return {
				time: null,
				address: null,
				way1: null,
				way2: null,
				fairList: null,
				noData: false
			}
		},
		computed: {
			...mapState(['token','presentAddress','jobCategory','indexSearchJob'])
		},
		onLoad(){
			var _this = this;
			_this.$http.post(apiName.FAIR_INDEX+'&=',{
			}).then(res => {
				if(res.data.success){
					if(res.data.data.fairs.length < 1){ 
						_this.noData = true;
					}
					_this.fairList = res.data.data.fairs;
					_this.time = res.data.data.time;
					_this.address = res.data.data.address;
					_this.way1 = res.data.data.way1;
					_this.way2 = res.data.data.way2;
				}
			}).catch(err => {
				console.log('出错了');
			})
		},
		methods:{
			goFairDt(dataUrl,title){
				uni.navigateTo({
				    url: '../jobFair/jobFairDetail?date='+dataUrl+'&title='+title
				});
			}
		}
	}
</script>

<style>
	.jobfair_wrap{ padding:30rpx; overflow: hidden; background: #fff; }
	.spotJob{ overflow: hidden;}
	.spotJob .spotJobz{overflow: hidden;width:100%; display: flex; justify-content:flex-start; align-items: center; padding-bottom: 20rpx;position: relative}
	.spotJob .iconfont{ color: #0ddfce; font-size: 36rpx; position: absolute;top:0;left: 0;}
	.spotJob .tit2{ font-size: 28rpx; color: #0ddfce; line-height: 36rpx;padding-left: 46rpx;}
	.spotJob .tit3{ display: block; color: #b2b2b2; font-size: 24rpx;}
	
	.spotJobx{width:100%; overflow: hidden}
	.spotJob_list{width:100%; overflow: hidden; display: flex; justify-content:space-between; background: #fff; border-bottom:1rpx solid #f1f1f1 ; padding:15rpx 0; align-items: center;}
	.spotJob_lf{ width:20%; border-right:1rpx solid #f1f1f1; padding:10rpx 0;}
	.spotJob_lf text:nth-child(1){ display: block; text-align: center; color: #0ddfce; font-size: 26rpx; padding-bottom:2rpx;}
	.spotJob_lf text:nth-child(2){display: block; text-align: center; color: #666; font-size: 24rpx;}
	.spotJob_rt{width:75%; position: relative; box-sizing: border-box; padding-right: 60rpx;}
	.spotJob_rt text:nth-child(1){ font-size: 26rpx; color: #333;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display:-webkit-box;
	    -webkit-box-orient:vertical;
	    -webkit-line-clamp:2;
	}
	.spotJob_rt :nth-child(2){ color: #ccc; font-size: 24rpx; position: absolute; top: 25rpx; right: 30rpx;}
	.spotJob_listx{ background: #fe7214;}
	.spotJob_listx .spotJob_lf text:nth-child(1),.spotJob_listx .spotJob_lf text:nth-child(2),.spotJob_listx .spotJob_rt text:nth-child(1),.spotJob_listx .spotJob_rt text:nth-child(2){ color: #fff}
</style>
