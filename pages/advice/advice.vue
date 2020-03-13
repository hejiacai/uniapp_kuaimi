<template>
	<view class="content">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<view class="navigator">
			<i class="getBack iconfont icon-backtrackx" @click='goBack'></i>
			<view class="nav-collect">意见反馈</view>
		</view>
		<view class="input-box">
			<view>
				<textarea placeholder="请输入您的宝贵意见" v-model="message" maxlength=500></textarea>
				<view class="num">{{num}}/500</view>
			</view>
		</view>
		<view class="btn-width90" @click="submit">提交</view>
	</view>
</template>

<script>
	import apiName from './../../static/commonjs/request/apiName.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return {
				message:''
			}
		},
		computed: {
			num(){
				return this.message.length
			},
			...mapState(['token'])
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			submit(){
				var _this = this;
				_this.$http.post(apiName.CALLBACK_ADVISE,{
					params:{
						token:_this.token,
						content:_this.message
					}
				}).then(res => {
					if(_this.message == ''){
						return uni.showToast({
						    icon:'none',
							title:'请输入内容'
						})
						
					}
					if(res.data.success){
						uni.showToast({
							title:res.data.msg,
							mask:true,
							success: function () {
							      setTimeout(function() {
							        uni.navigateBack();
							      }, 2000);
							}
						});
					}
				}).catch(err => {
					console.log(err);
				});
				
			}
		}
	}
</script>

<style scoped>
	@import './css/advice.css';
</style>
