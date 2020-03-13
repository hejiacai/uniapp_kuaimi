<template>
	<view class="content">
		<!-- <view class="center mine">我的</view> -->
		<view class="nav-box">
			<navigator v-for="(item,index) in navBars" :key="index" :url="item.navUrl">
				<image :src="require(`./images/${item.imgName}.png`)"></image>
				<text>{{item.text}}</text>
			</navigator>
		</view>
		<view class="fun-box">
			<view v-for="(item,index) in fun" @click="nav(item)" class="fun-items" :key="index">
				<view class="word">
						<i :class="['iconfont',item.unicode]" style="font-size: 34rpx;"></i>
					<!-- <image :src="require(`./images/${item.imgName}.png`)"></image> -->
					<view>{{item.text}}</view>
				</view>
				<text v-if="item.tel" class="tel" @click="telPhone">
					{{item.tel}}
				</text>
				<view v-if="!item.tel" class="arrow-right iconfont icon-job_reward_morex"></view>
			</view>
			<view class="quit-btn center" @tap="loginOut">退出登录</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				navBars:[
					{imgName:'my-delivery',text:'投递进度',navUrl:'/pages/record/record'},
					{imgName:'my-notice',text:'面试邀请',navUrl:'/pages/invite/invite'},
					{imgName:'my-collection',text:'我的收藏',navUrl:'/pages/myCollection/myCollection'}
				],
				fun:[
					{imgName:'advice-icon',text:'意见反馈',navUrl:'/pages/advice/advice',unicode:'icon-my_opinionx'},
					{imgName:'custom-icon',text:'客服电话',navUrl:'',tel:15523927167,unicode:'icon-my_customerx'},
					// {imgName:'share-job',text:'分享APP',navUrl:'',unicode:'iconmy_sharex'}
				]
			}
		},
		created(){
// 			this.$http.post('',{
// 				params:{
// 					ver:'v1.0',
// 					apiname:'get_job_info',
// 					token:'s79hu1192814',
// 					job_flag:'bjobz46d'
// 				}
// 			}).then(res => {
// 				console.log(res)
// 				this.jobDetail = res.data.data
// 			}).catch(err => {
// 				console.log(err);
// 			})
		},
		computed: {
            ...mapState(['token','presentAddress','jobCategory','newLiveAddress','ediresumeList','addresumeList','addworkAddress','addnowLive'])
		},
        onShow() {
        	if(!this.token){
        		uni.reLaunch({
        		    url: '../login/login'
        		})
        	}
        },
		methods: {
			...mapMutations(['closeToken','clearResumelist','clearaddJobCategory','clearworkAddress','clearnowLive']),
			loginOut(){
                 const res = uni.getStorageInfoSync();
                 console.log('当前的缓存信息',res);
//                  console.log('缓存的创建简历',this.addresumeList)
				this.closeToken('token')
                this.clearResumelist('addresumeList')
                this.clearaddJobCategory('jobCategory')
                this.clearworkAddress('addworkAddress')
                this.clearnowLive('addnowLive')
                uni.clearStorageSync()
//                 console.log('清除缓存简历',this.addresumeList)
//                  return
                uni.reLaunch({
                    url: '../login/login'
                })
// 				uni.reLaunch({
// 				    url: '../index/index'
// 				});
			},
			nav(item){
				if(item.navUrl){
					uni.navigateTo({
						url:item.navUrl
					})
				}
				console.log(item)
			},
			telPhone(){
				uni.makePhoneCall({
				    phoneNumber: '15523927167'
				});
			}
		}
	}
</script>

<style scoped>
	@import './css/mine.css';
</style>
