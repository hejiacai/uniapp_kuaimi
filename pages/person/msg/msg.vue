<template>
	<view class="msg">
		<view class="msgItem" v-for="(item,index) in msgList" :key="index">
			<view class="msgItem-time">{{ item.create_time }}</view>
			<view class="msgItem-info">
				<image src="../../../static/img/tips_icon.png" mode=""></image>
				<view class="msgItem-info-con">
					{{ item.content }}
				</view>
			</view>
		</view>
		<view class="wunei" v-show="is_not">
			<view class="imgv">
				<img src="../../../static/img/icon_nocontent.png" alt="" style="display: block;margin: 0 auto;">
			</view>
			<view class="zwnr">暂无通知</view>
		</view>
	</view>
</template>

<script>
	import {
			mapState,
			mapMutations
		} from 'vuex';
	import apiName from '../../../static/commonjs/request/apiName.js'
    export default {
    	data() {
    		return {
    			is_not:false,
				msgList:[],
    		}
    	},
        created(){
        	// this.collect()
        },
        onLoad() {
			this.messageClick()
        },
        computed: {
        	...mapState(['token','presentAddress','jobCategory','indexSearchJob'])
        },
        methods: {
			messageClick(){
				var _this = this;
				_this.$http.post(apiName.MSGLIST,{
					params:{
						token:_this.token,
						// token:'soz55e26558',
						page:1,
						page_size:50
					}
				}).then(res => {
					if(res.data.data){
						console.log(res);
						_this.msgList = res.data.data.msg_list;
						if(_this.msgList.length <= 0){
							_this.is_not = true;
						}
					}
				}).catch(err => {
					console.log(err);
				})
			}
        }
    }
</script>
    
<style scoped lang="scss">
	.msg{
		width: 100%;
		background-color: #f6f7f9;
		height: 100vh;
	}
	.msgItem{
		
	}
	.msgItem-time{
		text-align: center;
		font-size: 24rpx;
		color: #999999;
		padding: 30rpx 0;
	}
	.msgItem-info{
		overflow: hidden;
		position: relative;
		padding-left: 140rpx;
		box-sizing: border-box;
	}
	.msgItem-info-con{
		display: inline-block;
		max-width: 80%;
		font-size: 24rpx;
		padding: 30rpx 20rpx;
		background: #f3f3f3;
		color: #999999;
	}
	.msgItem-info image{
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		left: 30rpx;
		top: 20rpx;
	}
	
    .imgv{text-align: center;}
    .wunei{
        padding-top:200rpx;
    }
	
    .zwnr{font-size:34rpx;text-align: center;color: #555;margin-bottom:20rpx}
    .kdbr{    color: #999;
        font-size: 28rpx;
        text-align: center;}
</style>
    