<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="navigator">
			<i class="getBack icon iconfont icon-backtrackx" @click='goBack'></i>
			<view class="nav-collect">投递记录</view>
		</view>
        <view v-if="jobList&&jobList.length>0">
		<view class="deliverycords-item" v-for="(item,index) in jobList" :key="index">
			<view style="position: relative;">
				<text class="create-time">{{item.create_time}}</text>
				<text class="iconfont icon-completematerial_deletex close" @click="delRecord(item.apply_id)"></text>
			</view>
			<view class="company-info" @click="toDetail(item.job_flag)">
				<view class="company-name">{{item.company_name}}</view>
				<view class="company-job">{{item.station}}</view>
				<view class="company-date" v-for="(items,ind) in item.apply_during" :key="ind">
					{{items.time}}{{items.text}}
				</view>
			</view>
		</view>
        </view>
       <view class="wunei" v-else="">
		   <image src="../../static/img/icon_nocontent.png" mode=""></image>
           <view class="zwnr">暂无内容</view>
           <view class="kdbr">苦苦等待,不如主动出击</view>
       </view>
	</view>
</template>

<script>
	import {
			mapState,
			mapMutations
		} from 'vuex';
	import apiName from '../../static/commonjs/request/apiName.js'
	export default {
		data() {
			return {
				jobList:[
// 					{
// 						create_time:'2020-01-10',
// 						apply_id:'01',
// 						job_flag:'0310',
// 						company_name:'信驰科技',
// 						station:'茶园',
// 						apply_during:[
// 							{
// 								time:'2020-01-01',
// 								text:'一般般'
// 							}
// 						]
// 					},
// 					{
// 						create_time:'2020-01-11',
// 						apply_id:'02',
// 						job_flag:'0311',
// 						company_name:'伟鑫科技',
// 						station:'大坪',
// 						apply_during:[
// 							{
// 								time:'2020-01-02',
// 								text:'很一般'
// 							}
// 						]
// 					}
				],
				pageNum:1
			}
		},
		created() {
			this.getJobs()
		},
		computed: {
			...mapState(['token','presentAddress','jobCategory','indexSearchJob'])
		},
		methods: {
			toDetail(job_flag){
				uni.navigateTo({
					url: `/pages/jobDetail/jobDetail?job_flag=${job_flag}`
				})
				uni.setStorageSync('isRecord', 'hello')
			},
			goBack(){
				uni.switchTab({
				    url: '../mine/mine'
				});
			},
			onReachBottom(){
				this.getJobs()
			},
			getJobs(){
				this.$http.post(apiName.APPLY_LIST,{
					params:{
						// ver:'v1.0',
						// apiname:'apply_list',
						token:this.token,
						page_pageno:this.pageNum,
						page_pagesize:10
					}
				}).then(res => {
					if(res.data.data){
						let data = res.data.data
						let list = this.jobList
						this.pageNum = this.pageNum + 1
						this.jobList = list.concat(data)
					}
				}).catch(err => {
					console.log(err);
				})
			},
			delRecord(id){
				let that = this
				uni.showModal({
					title:'提示',
					content:'撤销后7日内不能再次投递哟，投递后如需修改简历请在简历处直接修改，系统将自动同步给企业？',
					cancelColor:'#999',
					confirmColor:'#fa5657',
					success(res){
						if(res.confirm){
							that.$http.post(apiName.DEL_APPLY,{
								params:{
									// ver:'v1.0',
									// apiname:apiName.DEL_APPLY,
									token:that.token,
									apply_id:id
								}
							}).then(res => {
								if(res.data.success){
									uni.showToast({
										title:res.data.msg,
										mask:true
									})
									that.jobList = []
									that.pageNum = 0
									that.getJobs()
								}
								
							}).catch(err => {
								console.log(err);
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	@import './css/record.css';
</style>
