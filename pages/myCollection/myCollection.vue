<template>
	<view class="content">
		<!-- <view class="navigator">
			<i class="getBack iconfont iconbacktrackx" @click='goBack'></i>
			<view class="nav-collect">我的收藏</view>
		</view> -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="psgSeekBg psgPrecise">
		    <view class="navigatorr">
				<view @click="collectionback">
					<i class="icon iconfont icon-backtrackx collectionback"></i>
				</view>
				<text class="minetitle">我的收藏</text>
			</view>
		</view>
		<view class="nav-title">
			<view class="collect" :class="{active:item.status}" v-for="(item,index) in titles" @click="checkHead(item)" :key="index">{{item.name}}</view>
		</view>
        <view v-if="jobs&&jobs.length>0">
        <view v-if="apiName=='JOBS_COLLECTION'">
            <view class="resemble-items" v-for="(item,index) in jobs" :key="index" @click="toDetail(item.job_flag)">
                <view class="resemble-head">
                    <text class="resemble-name">{{item.station}}</text>
                    <text class="resemble-money">{{item.salary_text}}</text>
                </view>
                <view class="resemble-company">
				{{item.company_name}}
				<text v-for="(item2,index2) in item.company_recruit_type" :class="[item2 != '名企'?'tit2':'',item2 == '奖500'?'tit3':'']" :key="index2">{{item2}}</text>
				</view>
                <view class="resemble-require">{{item.job_base_info}}</view>
                <view class="job-boon">
                    <text v-for="(items,ind) in item.rewards" :key="ind">
                        {{items}}
                    </text>
                </view>
				<text class="resemble-dataTime">{{ item.refresh_time }}</text>
            </view>
        </view>
		<view class="company-content" v-else>
			<view class="company-item" v-for="(item,index) in jobs" :key="index" @click="companydetail(item.company_id)">
				<image :src="item.company_photo ? item.company_photo:default_photo"></image>
				<view class="company-detail">
					<view class="name-info">
						<view class="company-name">
							{{item.company_shortname}}
							<text v-for="(item2,index2) in item.company_recruit_type" :class="item2 != '名企'?'tit2':''" :key="index2">{{item2}}</text>
						</view>
					</view>
					<view class="resemble-require">{{item.company_base_info}}</view>
					<view class="job-boon">
						<text v-for="(items,ind) in item.jobsort_names" :key="ind">
							{{items}}
						</text>
					</view>
				</view>
			</view>
		</view>
        </view>
        <view class="wunei" v-else>
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
				titles:[
					{name:'职位收藏',status:true,apiName:'JOBS_COLLECTION'},
					{name:'企业收藏',status:false,apiName:'COMPANY_COLLECTION'}
				],
				jobs:[],
				apiName:'JOBS_COLLECTION',
				pageNum:1,
				default_photo:'//assets.huibo.com/img/blue/com_default.png'
			}
		},
		onShow(){
			this.collect()
		},
		onLoad(){
			this.collect()
		},
		computed: {
			...mapState(['token','presentAddress','jobCategory','indexSearchJob'])
		},
		methods: {
			collectionback() {
				uni.switchTab({
				    url: '../mine/mine'
				});
			},
			toDetail(job_flag){
				uni.navigateTo({
					url: `/pages/jobDetail/jobDetail?job_flag=${job_flag}`
				})
				uni.setStorageSync('isMyCollection', 'hello')
			},
			companydetail(company_id){
				uni.navigateTo({
					url:"../companyDetail/companyDetail?token="+this.token+'&company_id='+company_id
				})
				uni.setStorageSync('isMyCollectionC', 'hello')
			},
			goBack(){
				uni.navigateBack()
			},
			nav(item){
				console.log(item)
			},
			checkHead(item){
				this.titles.map((items)=>{
					if(items.name == item.name){
						items.status = true
					}else{
						items.status = false
					}
				});
				
				this.apiName = item.apiName
				this.pageNum = 1
				this.jobs = []
				this.collect()
			},
			collect(){
				var _this = this;
				var apiNamex = _this.apiName;
				if(apiNamex == 'JOBS_COLLECTION'){
					_this.$http.post(apiName.JOBS_COLLECTION,{
						params:{
							token:_this.token,
							page_pageno:1,
							page_pagesize:20
						}
					}).then(res => {
						if(res.data.data){
							console.log(res);
                            _this.jobs = res.data.data
						}
					}).catch(err => {
						console.log(err);
					})
				}else{
					_this.$http.post(apiName.COMPANY_COLLECTION,{
						params:{
							token:_this.token,
							page_pageno:1,
							page_pagesize:20
						}
					}).then(res => {
						console.log(res);
						if(res.data.data){
                            _this.jobs = res.data.data
						}
					}).catch(err => {
						console.log(err);
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	@import './css/myCollection.css';
</style>
