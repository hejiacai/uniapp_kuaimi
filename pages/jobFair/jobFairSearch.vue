<template>
	<view class="jobfair4_wrap">
		<view class='search_t'>
			<view class='search_s'>
			  <icon type='search' size='14' color='#ccc'></icon>
			  <input type='text' placeholder='' :value='inputValue' placeholder-style="color:#ccc" @input="onKeyInput" placeholder='输入企业/岗位关键字'></input>
			  </view>
			  <view class='search_btn' data-go='job' @click="search">搜索</view>
		</view>
		
		<view class='jobfair2_bd'>
		    <view class='jobfair2_list' v-for="(item,index) in jobFairAry" :key="index">
		      <view class='sub_jobFair01'>
				  <text>{{ item.company_name }}</text>
				  <text>展位号:{{ item.booth_ids == false ? '待安排': item.booth_ids}}</text>
			  </view>
		      <view class='sub_jobFair02'>{{ item.station }}</view>
		      <view class='sub_jobFair03'>
		        {{ item.content }}
		      </view>
		    </view>
			
			<uni-load-more :status="loandMore" v-show="isLoandMore"></uni-load-more>
			
			<view class='noData' v-show="noData">
				<image src="../../static/img/icon_nocontent.png" mode=""></image>
				<text>未找到相关岗位，<br />您可以更换关键词试试看！</text>
			</view>
			
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
			page:1,
			totalPage:1,
			inputValue:'',
			isLoandMore:false,
			noData:false,
			jobFairAry:null,
			loandMore:'more',
			optionsTitle:'招聘会搜索'
		}
	},
	//加载更多
	onReachBottom(){
		this.onReachMore();
	},
	onLoad(options){
		var _this = this;
		_this.optionsDate = options.date;
		_this.inputValue = options.jobName;
		uni.showLoading({
		    title: '加载中'
		});
		_this.$http.post(apiName.FAIR_SEARCH,{
			params:{
				date:options.date,
				jobName:options.jobName,
				page:_this.page
			}
		}).then(res => {
			uni.hideLoading();
			if(res.data.success && res.data.data.job_list){	
				if(res.data.data.job_list.length > 5){
					_this.isLoandMore = true;
				}
				uni.setNavigationBarTitle({
					title: res.data.data.fairtitle
				});
				_this.jobFairAry = res.data.data.job_list;
				_this.totalPage = res.data.data.totalPage;
			}else{
				_this.noData = true;
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
				_this.$http.post(apiName.FAIR_SEARCH,{
					params:{
						date:_this.optionsDate,
						jobName:_this.inputValue,
						page:page
					}
				}).then(res => {
					_this.jobFairAry.push(...res.data.data.job_list);
					_this.page = page;
					
				}).catch(err => {
					console.log('翻页出错了');
				});
			}else{
				_this.loandMore = 'noMore';
			}
		},
		onKeyInput(event) {
			this.inputValue = event.target.value;
		},
		search(){
			let _this = this;
			uni.redirectTo({
				url:'../jobFair/jobFairSearch?date='+_this.optionsDate+'&jobName='+_this.inputValue+'&title='+_this.optionsTitle
			})
		}
	}
}	
</script>

<style>
.search_t{ padding: 20rpx; overflow: hidden; background: #fff; border-bottom: 1rpx solid #f1f1f1;}
	.search_s{width:88%; background: #f3f3f3; border-radius: 50rpx; height: 60rpx; float: left; overflow:hidden;}
	.search_s icon{ display:block; float: left; margin: 18rpx 10rpx 0 30rpx;}
	.search_s input{ display: block; float: left; height: 50rpx; line-height: 50rpx; font-size: 30rpx; margin-top: 5rpx;width:80%;}
	.search_btn{float: right;width:80rpx; height: 60rpx; line-height: 60rpx; text-align: center; color: #0ddfce;  font-size: 30rpx;} 
	
	.jobfair2_bd{width:100%; overflow: hidden}
	.jobfair2_list{ overflow: hidden; border-bottom: 10rpx solid #f1f1f1; padding: 20rpx 30rpx; position: relative;}
	.jobfair2_list view{ overflow: hidden}
	.sub_jobFair01{ color: #999; font-size: 22rpx; display: flex; justify-content: space-between;}
	.sub_jobFair01 text:nth-child(1){ color: #666;width:65%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;}
	.sub_jobFair01 text:nth-child(2){float: right; color: #0ddfce;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 30%;text-align: right;margin-left: 5%;}
	.sub_jobFair02{ font-size: 32rpx; color: #333; padding:10rpx 0 15rpx 0;}
	.sub_jobFair03{ color:#999; font-size: 26rpx;line-height: 44rpx;}
	
</style>
