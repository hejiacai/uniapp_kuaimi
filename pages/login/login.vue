<template>
	<view class="login">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
        <view class="companyDetailTop">
        	<view class="icon iconfont icon-backtrackx bank" @click="goBack"></view>
        </view>
		<view class="logo">
			<image class="logo-icon" src="../../static/img/job_kuaimi.png" mode="aspectFit"></image>
			<view class="logo_title" @click="countdown"><text>找工作必备</text></view>
		</view>
		<view class="form">
			<view class="inputTemplate">
                <view class="icon iconfont icon-login_phone rewriteIconStyle"></view>
				<!-- <view class="iconfont iconicon-kuaimi_resume_call_icon rewriteIconStyle"></view> -->
				<view class="inputTem">
					<input class="inputTem-tel" type="number" maxlength="11" v-model="telNum" placeholder="手机号"/>
				</view>
			</view>
			<view class="inputTemplate inputTemplateImgcode">
				<view class="icon iconfont icon-login_password rewriteIconStyle"></view>
				<view class="input-ImgCode inputTem">
					<input class="" type="number" maxlength="4" v-model="imgcode" placeholder="图形验证码"/>
				</view>
				<image class="img-code" @tap="getSeed" :src="codeImage"></image>
			</view>
			<view class="inputTemplate template-imgCode">
				<view class="icon iconfont icon-login_password rewriteIconStyle"></view>
				<view class="inputTem">
					<input class="" type="number" maxlength="6" v-model="verCode" placeholder="验证码"/>
				</view>
				<view :class="['getVerCode', sendVerStatus == 1 ? 'countdownTextColor':'']" @click="getVerCode">{{verText}}</view>
			</view>
			<view class="loginBtn" @click="loginRequest">登录/注册</view>
		</view>
	</view> 
</template>
<script>
	import apiName from './../../static/commonjs/request/apiName.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {objectToUrlParams} from '../../static/commonjs/utils/index.js'
	
	export default {
		data() {
			return {
				course_id:'',
				iseduDetail:false,
				codeImage:'',
				seed:'',
				telNum:'',
				imgcode:'',
				verCode:'',
				cdtime:60,
				verText:'获取验证码',
				vartextArr:['获取验证码','秒后可重新获取','重新获取验证码'],
				sendVerStatus:0,//发送验证码状态 0获取验证码  1 60秒后可重新获取 2重新获取验证码
 				// token:'',//登录后的token值
				is_sweep_red_code:false,//是否参与红包活动
				url:'',//页面跳转url
				register_info_is_sync_hbinfo:false ,//	true:同步自汇博账号 false：不是同步的汇博账号
			}
		},
		onLoad(options){
			// const callBackPage = uni.getStorageSync('callBackPage')
			// if(callBackPage) {
			// 	let params = objectToUrlParams(callBackPage.params)
			// 	setTimeout(()=>{
			// 		uni.navigateTo({
			// 			url: callBackPage.url+params
			// 		})
			// 	},2000)
			// }
			this.iseduDetail = options.iseduDetail
			this.course_id = options.course_id
			let _this = this;
			this.getSeed();
		},
		onShow(){
			let _this= this;
			
		},
		computed: {
			...mapState(['token'])
		},
		methods: {
			...mapMutations(['setToken','set_isSearchDetail']),
			getSeed(){
				let _this = this;
               
				_this.$http.get(apiName.GET_SEED+"&=",{
				}).then(res => {
					if(res.data.success){
						_this.seed = res.data.data.seed;
						_this.codeImage = "https://uniapp.kuaimijob.com/index?ver=v1.0&apiname=getImgCode&seed="+_this.seed;
					}else{
                        uni.showToast({
                        	icon:'none',
                            title:res.data.msg
                        })
					}
				}).catch(err => {
                         uni.showToast({
                         	icon:'none',
                             title:'接口请求失败'
                         })
				})
			},
			getVerCode(){
				let _this = this;
				if(_this.telNum == ''){
					_this.$KM.showToast('请输入手机号');
					return;
				}
				if(_this.imgcode == ''){
					_this.$KM.showToast('请输入图形验证码');
                    return
				}
				if(_this.seed == ''){
					_this.$KM.showToast('seed为空');
                    return
				}
				_this.$http.post(apiName.SEND_LOG_CODE,{
					params:{
						"mobile_phone":parseInt(_this.telNum),
						"imgcode":_this.imgcode,
						"hidSeed":_this.seed
					}
				}).then(res => {
					if(res.data.success){
						_this.sendVerStatus = 1;
						_this.verText = _this.cdtime+_this.vartextArr[_this.sendVerStatus];
						_this.countdown();
					}else{
						_this.getSeed();
						_this.$KM.showToast(res.data.msg);
					}
				}).catch(err => {
					console.error('出错了',err);
				})
			},
            goBack(){
                // uni.switchTab({
                // 	url:'../index/index'
                // })
				
				const callBackPage = uni.getStorageSync('callBackPage')
				if(callBackPage) {
					let params = objectToUrlParams(callBackPage.params)
					uni.navigateTo({
						url: callBackPage.url+params
					})
					uni.removeStorageSync('callBackPage');
					// uni.setStorage({
					//     key: 'isJobDetail',
					//     data: false
					// });
					// uni.setStorageSync('isJobDetail', 'hello');
					// this.set_isSearchDetail(3)
				} else if (this.iseduDetail){
					uni.navigateTo({
						url: '/pages/eduDetail/eduDetail?course_id=' + this.course_id
					})
				}else {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
            },
			loginRequest(){
				let _this = this;
				if(_this.telNum == ''){
					_this.$KM.showToast('请输入手机号');
					return;
				}
				if(_this.verCode == ''){
					_this.$KM.showToast('请输入手机验证码');
                    return
				}
				_this.$http.post(apiName.LOGIN_DO,{
					params:{
						"mobile_phone":_this.telNum,
						"authCode":_this.verCode,
						"fromurl":"",
						"area_id":"0300",
						"is_weixin":"false",
						"weixin_kuaimi_openid":"",
						"weixin_kuaimi_nickname":""
					}
				}).then(res => {
					if(res.data.success){
						let loginedJson = res.data.data;
						// _this.token=res.data.data.token;
						_this.setToken(loginedJson.token);
						_this.is_sweep_red_code = loginedJson.is_sweep_red_code;
						_this.url = loginedJson.url;
						let register_info_is_sync_hbinfo=loginedJson.register_info.is_sync_hbinfo;
						_this.$KM.showToast('登录成功','success');
						 if (_this.iseduDetail){
							 console.log('是来至培训详情页面的')
							uni.navigateTo({
								url: '/pages/eduDetail/eduDetail?course_id=' + this.course_id
							})
						}else{
                        if(loginedJson.register_info.is_sync_hbinfo){
                            uni.setStorageSync('register_info_is_sync_hbinfo','true');
                            uni.switchTab({
                            	url:'../person/resume/resume?is_sync_hb=' + register_info_is_sync_hbinfo
                            })
                        }else{
							switch (res.data.data.return_type){
                                case 1:
                                	uni.navigateTo({
                                		url:'../material/material?is_sync_hb=' + register_info_is_sync_hbinfo
                                	})
                                	break;
								case 5:
									uni.navigateTo({
										url:'../material/material?is_sync_hb=' + register_info_is_sync_hbinfo
									})
									break;
								case 2:
									let params= {
										mode: 'add',
                                        created:'frommateril'
									}
									params=JSON.stringify(params)
									uni.navigateTo({
									    url: `../person/resume/workexp/workexp?params=${params}`
									})
									break;
								default:
									const callBackPage = uni.getStorageSync('callBackPage')
									if(callBackPage) {
										let params = objectToUrlParams(callBackPage.params)
										uni.navigateTo({
											url: callBackPage.url+params
										})
										this.set_isSearchDetail(3)
									} else {
										uni.switchTab({
											url: '/pages/index/index'
										})
									}
									break;
							// }
                        }
                        }
						}
						// _this.goIndex();
					}else{
						console.log('登录失败',res.data.msg);
						// uni.showToast({title: res.data.msg});
						_this.$KM.showToast(res.data.msg);
					}
				}).catch(err => {
					console.error('出错了',err)
					_this.$KM.showToast(res.data.msg);
				})
			},
			//倒计时
			countdown: function(){
				let _this = this;
				var interval_c = setInterval(function () {
				  if(_this.cdtime > 0){
				  	_this.cdtime--;
					_this.verText = _this.cdtime+_this.vartextArr[_this.sendVerStatus];
				  }else{
				  	clearInterval(interval_c);
				  	_this.cdtime = 60;
					_this.sendVerStatus = 2;
					_this.verText = _this.vartextArr[_this.sendVerStatus];
					_this.getSeed();
				  }
				}, 1000);
			},
			goIndex(){
					let _this = this;
					uni.switchTab({
						url: '/pages/index/index'
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
    .companyDetailTop{ display: flex; justify-content: space-between; padding: 20rpx 30rpx; align-items: center;margin-top:var(--status-bar-height);}
    .status_bar {
         height: var(--status-bar-height);
         width: 100%;
    		  position:fixed;
    		  top: 0;
    		  z-index: 9999;
    		  // background: #333333!important;
     }
     .top_view{
    		  height: var(--status-bar-height);
    		  width: 100%;
    		  position: fixed;
    		  top:0;
    		  z-index: 999;
     }
.login{width: 100%;}
.logo{width: 100%;padding-top: 170rpx;height: 214rpx;margin-bottom: 80rpx;}
.logo-icon{width: 148rpx;height: 148rpx;margin: 0 auto;display: block;}
.logo_title{width: 100%;text-align: center;margin-top: 25rpx;font-size: 30rpx;line-height: 30rpx;}

.form{padding:40rpx 80rpx;}
.inputTemplate{padding: 24rpx 20rpx 24rpx 16rpx;border-bottom: 1rpx solid #f1f1f1;height: 56rpx;line-height: 56rpx;}
.rewriteIconStyle{color: #666666;float: left;margin-right: 12rpx;}

.inputTem{float: left;height: 56rpx;line-height: 56rpx;width: 40%;}
.inputTem input{height: 56rpx;line-height: 56rpx;}

.input-ImgCode{float:left;width: 260rpx;margin-right: 16rpx;}
.inputTemplateImgcode{position: relative;}
.template-imgCode{height: 70rpx;}

.img-code{width: 176rpx;height: 56rpx;position: absolute;right: 0;top: 26rpx;}
.getVerCode{color: #22c3aa;font-size: 30rpx;float: right;}
.countdownTextColor{color: #999;}
.loginBtn{background: #fb5958;color:#fff;font-size:$km-btn-fs;height:$km-btn-height;line-height:$km-btn-height;width:90%;text-align: center;margin: 0 auto;border-radius: 4px;margin-top: 100rpx;}
</style>