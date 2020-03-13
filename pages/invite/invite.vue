<template>
	<view class="content">
		<!-- <view class="navigator">
			<i class="getBack iconfont iconbacktrackx" @click='goBack'></i>
			<view class="nav-collect">面试邀请</view>
		</view> -->
			<view class="invite-list" v-if="jobList&&jobList.length>0">
				<view class="wh-remind">仅保存最近30天内的记录</view>
				<view style="position: relative;" v-for="(item,index) in jobList" :key='index' @click="toDetail(item.invite_id)">
					<view class="invite-item">
						<text class="name">{{item.company_name}}</text>
						<view>{{item.station}}</view>
						<text class="time">{{item.auditiontime}}</text>
					</view>
					<i class="iconfont arrow-right">&#xe69e;</i>
				</view>
			</view>
			<view class='noData' v-else>
				<image src="../../static/img/icon_nocontent.png" mode=""></image>
				<text>暂无面试邀请</text>
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
				pageNum:1,
				jobList:[
// 					{
// 						invite_id:'1',
// 						company_name:'信驰科技',
// 						station:'黄泥磅',
// 						auditiontime:'2020-01-10',
// 						
// 					},
// 					{
// 						invite_id:'1',
// 						company_name:'伟鑫科技',
// 						station:'大坪',
// 						auditiontime:'2020-01-12',
// 						
// 					}
				]
			}
		},
		// created() {
		// 	this.getInviteList()
		// },
		onShow() {
			this.getInviteList()
		},
		computed: {
			...mapState(['token','presentAddress','jobCategory','indexSearchJob'])
		},
		methods: {
			
			// onReachBottom(){
			// 	this.getInviteList()
			// },
			toDetail(id){
				uni.navigateTo({
				    url: `/pages/inviteDetail/inviteDetail?id=${id}`
				})
			},
			goBack(){
				uni.navigateBack()
			},
			getInviteList(){
				this.$http.post(apiName.INVITE_LIST,{
					params:{
						// ver:'v1.0',
						// apiname:apiName.INVITE_LIST,
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
			}
		}
	}
</script>

<style scoped>
	@import './css/invite.css';
</style>
