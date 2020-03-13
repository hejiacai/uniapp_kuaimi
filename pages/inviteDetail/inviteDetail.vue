<template>
	<view class="content">
		<!-- <view class="navigator">
			<i class="getBack iconfont iconbacktrackx" @click='goBack'></i>
			<view class="nav-collect">邀请详情</view>
		</view> -->
		<view class="wh-remind">{{info.user_name}}你好，非常荣幸邀请你参加面试，以下是面试的详细信息。如果有问题，请及时和我们联系。</view>
		<view class="inviteDetail-info">
			<text>面试时间：{{info.auditiontime}}</text>
			<view class="tel-line">
				<view>面试方式：{{is_audition_type}}</view>
			</view>
			<view class="tel-line">
				<view>联系电话：{{info.link_tel}}</view>
				<i class="icon iconfont icon-icon-kuaimi_resume_call_icon" @click="telPhone(info.link_tel)"></i>
			</view>
		</view>
		<view class="work-addr">
			<view class="invite-position">
				<text>{{info.station}}</text>
				<text class="tit3">{{info.salary}}</text>
			</view>
			<view class="addr-detail">
				<view class="address-msg">
					<text class="iconfont icon-job_addressx"></text>
					<text class="address">{{info.audition_address}}</text>
				</view>
				<i class="icon iconfont icon-job_reward_morex"></i>
				<view class="read-text" @click="navigateMap">
					<view>点击查</view>
					<view>看地图</view>
				</view>
			</view>
		</view>
		<view class="hint-text">
			<text>温馨提示：</text>
			请按时参加面试，如果有事不能到达，请及时与HR进行沟通
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
				info:{},
				is_audition_type:''
			}
		},
		computed: {
			...mapState(['token','presentAddress','jobCategory','indexSearchJob'])
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			onLoad(options){
				this.getInfo(options.id)
			},
			navigateMap(){
				let _this = this;
				uni.openLocation({
					latitude: parseFloat(_this.info.map_y),
					longitude: parseFloat(_this.info.map_x),
					fail(error) {
						console.log(error)
					}
				});
			},
			telPhone(num){
				uni.makePhoneCall({
				    phoneNumber:num
				});
			},
			getInfo(id){
                this.$http.post(apiName.GET_INVITE_DETAIL,{
                	params:{
                		token:this.token,
                		invite_id:id
                	}
                }).then(res => {
					console.log(res);
					this.info = res.data.data;
					if(res.data.data.audition_type == 1){
						this.is_audition_type = '现场面试'
					}else{
						this.is_audition_type = '视频面试'
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	@import './css/inviteDetail.css';
</style>
