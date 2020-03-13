<template>
	<view class="jobfair_wrap">
		<view class='spotJob'>
			<view class="spotJobz">
				<text class="iconfont icon-icon-svg1" style="font-size:34rpx;"></text>
				<text class="tit2">{{ fairList.send_date }}</text>
			</view>
			<view class="spotJobz">
				<text class="iconfont icon-nearby_navigation_positioningx"></text>
				
				<view class="">
					<view class="tit2">
						{{ fairList.send_area }}
						<text class="tit3">{{ fairList.send_traffic }}</text>
					</view>
				</view>
			</view>
			<view class="spotJobz" v-if="fairList.send_phone || fairList.send_phone">
				<text class="iconfont icon-icon-kuaimi_resume_call_icon" style="font-size:34rpx;"></text>
				<text class="tit2">
					{{ fairList.send_phone[0] }}&nbsp;&nbsp;&nbsp;&nbsp; {{ fairList.send_phone[1] }}
				</text>
			</view>
		</view>
		
		<view class='search_t'>
			<view class='search_s'>
			  <icon type='search' size='14' color='#ccc'></icon>
			  <input type='text' placeholder='' value='' placeholder-style="color:#ccc" @input="onKeyInput" placeholder='输入企业/岗位关键字'></input>
			</view>
			<view class='search_btn' data-go='job' @click="search">搜索</view>
		</view>
		
		<view class='jobfair2_bd'>
		    <view class='jobfair2_list' v-for="(item,index) in faircompanyAry" :key="index" @click="jobFairListBtn(item.fair_service_scene_id,item.company_name,item.jobs.length)">
		      <view class='sub_jobFair01'>
				  展位号：<text>{{ item.booth_ids }}</text>
			  </view>
		      <view class='sub_jobFair02'>{{ item.company_name }}</view>
		      <view class='sub_jobFair03'>
		         <text v-for="(i,n) in item.jobs">{{ i.station }}、</text> 
				 <text v-show="item.jobs.length == 0">暂未发布岗位信息</text>
		      </view>
		      <text class="iconfont iconjob_reward_morex"></text>
		    </view>
			
			<uni-load-more :status="loandMore" v-show="isLoandMore"></uni-load-more>
			
		</view>
		
	</view>
</template>


<script>
	import apiName from '../../static/commonjs/request/apiName.js';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
	components: {uniLoadMore},
	data() {
		return {
			fairList: [],
			faircompanyAry:[],
			loandMore:'more',
			//无数据样式控制
			noData: false,
			page:1,//当前页数
			isLoandMore:false,
			totalPage:1,//总页数
			optionsDate:'',
			inputValue: '',
			optionsTitle:''
		}
	},
	//加载更多
	onReachBottom(){
		this.onReachMore();
	},
	onLoad(options){
		var _this = this;
		_this.optionsDate = options.date;
		_this.optionsTitle = options.title;
		uni.setNavigationBarTitle({
		    title: options.title
		});
		uni.showLoading({
		    title: '加载中'
		});
		_this.$http.post(apiName.FAIR_DETAIL,{
			params:{
				date:options.date,
				page:_this.page,
				page_size:10
			}
		}).then(res => {
			uni.hideLoading();
			if(res.data.success){	
				_this.fairList = res.data.data.page_index_data;
				_this.faircompanyAry = res.data.data.faircompanys;
				_this.totalPage = res.data.data.totalPage;
				if(_this.faircompanyAry.length > 5){
					_this.isLoandMore = true;
				}
			}
		}).catch(err => {
			console.log('出错了');
		})
	},
	methods: {
		onReachMore(){
			var _this = this;
			var totalPage = _this.totalPage;
			var page = _this.page;
			page++;
			if(page <= totalPage){
				_this.loandMore = 'loading';
				_this.$http.post(apiName.FAIR_DETAIL,{
					params:{
						date:_this.optionsDate,
						page:page,
						page_size:10
					}
				}).then(res => {
					_this.faircompanyAry.push(...res.data.data.faircompanys);
					_this.page = page;
					
				}).catch(err => {
					console.log('翻页出错了');
				});
			}else{
				_this.loandMore = 'noMore';
			}
		},
		jobFairListBtn(companyFlag,companyName,jobLth){
			if(jobLth > 0){
				uni.navigateTo({
					url:'../jobFair/jobFairList?date='+this.optionsDate+'&companyFlag='+companyFlag+'&companyName='+companyName
				});
			}
		},
		onKeyInput(event) {
			this.inputValue = event.target.value;
		},
		search(){
			let _this = this;
			uni.navigateTo({
				url:'../jobFair/jobFairSearch?date='+_this.optionsDate+'&jobName='+_this.inputValue+'&title='+_this.optionsTitle
			})
		}
	}
}	
</script>

<style>
	.jobfair_wrap{}
	.spotJob{ overflow: hidden; padding: 30rpx; padding-bottom:0rpx; background: #f6f7f9;}
	.spotJob .spotJobz{overflow: hidden;width:100%; display: flex; justify-content:flex-start; align-items: center; padding-bottom: 20rpx;position: relative}
	.spotJob .iconfont{ color: #0ddfce; font-size: 36rpx; position: absolute;top:0;left: 0;}
	.spotJob .tit2{ font-size: 28rpx; color: #0ddfce; line-height: 36rpx;padding-left: 46rpx;}
	.spotJob .tit3{ display: block; color: #b2b2b2; font-size: 24rpx;}
	.search_t{ padding: 20rpx; overflow: hidden; background: #fff; border-bottom: 1rpx solid #f1f1f1;}
	.search_s{width:88%; background: #f3f3f3; border-radius: 50rpx; height: 60rpx; float: left; overflow:hidden;}
	.search_s icon{ display:block; float: left; margin: 18rpx 10rpx 0 30rpx;}
	.search_s input{ display: block; float: left; height: 50rpx; line-height: 50rpx; font-size: 30rpx; margin-top: 5rpx;width:80%;}
	.search_btn{float: right;width:80rpx; height: 60rpx; line-height: 60rpx; text-align: center; color: #0ddfce;  font-size: 30rpx;} 
	
	.jobfair2_bd{width:100%; overflow: hidden}
	.jobfair2_list{ overflow: hidden; border-bottom: 10rpx solid #f1f1f1; padding: 20rpx 30rpx; position: relative;}
	.jobfair2_list view{ overflow: hidden}
	.sub_jobFair01{ color: #999; font-size: 22rpx;}
	.sub_jobFair01 text{ color: #0ddfce;} 
	.sub_jobFair02{ font-size: 32rpx; color: #333; padding:10rpx 0 15rpx 0;}
	.sub_jobFair03{ color:#999; font-size: 26rpx;line-height: 44rpx;}
	.jobfair2_list text.iconjob_reward_morex{ position: absolute; top: 30rpx; right: 30rpx; color: #ccc; font-size: 24rpx;}
</style>
