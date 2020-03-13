<template>
	<!-- <a href="http://m.kuaimi.huibo.com/zhiwei/bjobmll04.html"> -->
	<view class="jobItem" @tap="navigateJobDetail(jobItem.job_flag)">
		<!-- <navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover"> -->
		<view class="icon iconfont icon-home_new fresh_signnew" v-if="jobItem.is_today_issue && initNewSign(jobItem.job_flag)"></view>
			<view class="jobItemTitle">
				<view class="jobItemName wordEllipsis">{{jobItem.station}}</view>
				<view class="jobSalary">{{jobItem.salary_text}}</view>
			</view>
			<view class="jobItemCompany">
				<view class="jobItemCompany-top">
					<text class="jobItemCompany-name">{{jobItem.company_shortname}}</text>
					<text class="jobItemCompany-refreshTime" v-if="nearbyJob">{{jobItem.distant}}</text>
                    <text class="jobItemCompany-refreshTime" v-else>{{jobItem.refresh_time}}</text>
				</view>
				<text class="sign famousCompany" v-if="jobItem.is_famous == '1'">名企</text>
				<text class="sign bonusMoney" v-if="jobItem.is_award=='1'">奖{{jobItem.award_mount}}</text>
				<text class="sign topCompany" v-if="jobItem.company_tags.length>0" v-for="(item,index) in jobItem.company_tags" :key="index">{{item}}</text>	<!-- <em class="straightCompany">直招</em> -->
				<!-- <text class="jobItem-refresh" v-if="jobItem.is_tody_refresh">今天</text> -->
			</view>
			<view class="jobItemMap">
				{{jobItem.area_name}}<text>|</text>{{jobItem.age_sex_text}}
			</view>
			<view class="jobItemWarfe">
				<text v-for="(rewardItem,index) in jobItem.rewards" :key="index" v-if="index<4">{{rewardItem}}</text>
				<text v-else-if="index==4">...</text>
			</view>
		<!-- </navigator> -->
	</view>
</template>

<script>
	// import eventList from '../static/commonjs/eventList/eventList.js';
	export default {
		name:"jobItemCard",
		props:["jobItem","nearbyJob"],
		data() {
			return {
				// rewardList: [],
				noLook : true,
				allowClick:false,
				itemJobid:'',
			}
		},
		created(){
			let _this = this;
			
			
		},
		beforeDestroy() {
		},
		methods:{
			navigateJobDetail(job_flag){
				this.hideNewSign(job_flag);
				let _this = this;
				if(this.allowClick){
					// console.log('禁止禁止this.allowClick->',this.allowClick)
					return
				}
				this.allowClick = true;
				// console.log('第一次进this.allowClick->',this.allowClick)
				uni.$emit(this.$GlobalV.GO_TO_JOBDETAIL,{job_flag: this.jobItem.job_flag});
				setTimeout(function(){
					_this.allowClick = false;
					console.log('计时器恢复this.allowClick->',_this.allowClick)
				},500)
			},
			initNewSign(job_flag){//初始化新标签,查缓存
				let isSignshow = true;
				let jobNewLooked_data = uni.getStorageSync('jobNewLooked');
					if(jobNewLooked_data && JSON.parse(jobNewLooked_data).indexOf(job_flag) > -1){
						isSignshow = false;
					}else{
						isSignshow = true;
					}
				return isSignshow;
			},
			hideNewSign(job_flag){//新标签查看后消失
				uni.getStorage({
					key:"jobNewLooked",
					success:function(res){
						// console.log('click getStorage res.data>',res.data)
						let jobidList =res.data ? JSON.parse(res.data) : [];
						jobidList.push(job_flag);
						uni.setStorage({
							key: 'jobNewLooked',
							data: JSON.stringify(jobidList)
						});
					},
					fail:function(err){
						uni.setStorage({
							key: 'jobNewLooked',
							data: JSON.stringify([job_flag])
						});
						console.log(err)
					}
				})
			}
		},
		
	}
</script>

<style scoped>
.jobItem{width: 100%;padding: 40rpx 30rpx;box-sizing: border-box;background: #fff;border-bottom: 10rpx solid #f6f8fa;position: relative;}
.fresh_signnew{position: absolute;color: #FE8503;right: 0;top:0;font-size: 60rpx}
.jobItemTitle{color:#222;height: 34rpx;}
.jobItemTitle .jobItemName{font-size: 34rpx;line-height: 36rpx;width: 50%;float: left;font-weight: bold;}
.wordEllipsis{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.jobSalary{font-size: 30rpx;line-height: 30rpx;float: right;color: #FB5958;text-align: right;}
.jobItemCompany{margin-top: 20rpx;font-size: 30rpx;line-height: 30rpx;}
.jobItemCompany{height: 30rpx;line-height: 30rpx;}
.jobItemCompany-name{font-size: 30rpx;line-height: 30rpx;color: #333;float: left;}
.jobItemCompany-refreshTime{float: right;color: #CCCCCC;font-size: 24rpx;line-height: 30rpx;}
/* .jobItem-famousCompany{background: #E4E8FD;color: #5E74F0;} /*名企*/ 
/* .jobItem-topCompany{} */ /*急招*//*国有企业*/
.jobItem-refresh{float: right;font-size: 24rpx;color: #ccc;}
.sign{background: #FFF7EC;color: #FE8503;display: inline-block;padding: 0 8rpx;vertical-align: middle;border-radius: 4rpx;font-size: 24rpx;margin-left: 10rpx;line-height: 32rpx;height: 32rpx;}
.jobItemMap{color: #999;font-size: 26rpx;line-height: 26rpx;margin-top: 30rpx;}
.jobItemMap text{color: #888;margin: 0 5px;}
.jobItemWarfe{padding-bottom: 0;margin-top: 30rpx;}
.jobItemWarfe text{font-size: 24rpx;line-height: 24rpx;margin-right: 16rpx;background: #f4f5f8;padding: 6rpx 16rpx;color: #999;border-radius: 8rpx;margin-bottom: 10px;}
/*名企小标签*/
.famousCompany{
	background: #E4E8FD;
	color:#5E74F0;
}
/*急招小标签*/
.topCompany{
	background: #FFF7EC;
	color:#FE8503;
}
/*直招小标签*/
.straightCompany{
	background: #E1FBFC;
	color:#21BFCA;
}
/*奖励小标签*/
.bonusMoney{
	background: #27BD90;
	color:#fff;
}
</style>
