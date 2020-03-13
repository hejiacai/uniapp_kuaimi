<template>
<view class="aaaaaaaaaaaaaaaaaaaaaa">
	<view class="status_bar">
		<view class="top_view"></view>
	</view>
	<view class="search">
		<view class="search-nav-bar">
			<view class="icon iconfont icon-backtrackx _i back" @tap="backIndex"></view>
			<view class="search-input">
				<view class="icon iconfont icon-home_navigation_searchx searchIcon"></view>
				<input type="text" placeholder="搜索职位名称/公司名称" @input="searKey" :value="defaultKey"/>
				<!-- <input type="text" :value="defaultKey" @input="searKey"/> -->
			</view>
			<view class="search-btn" @click="goSearchDetail">搜索</view>
		</view>
		<view class="RecentlySearch" v-if='RecentlySearchList.length>0'>
			<view class="RecentlySearch-title">
				<text>最近搜索</text>
				<view class="icon iconfont icon-icon-AI-_- closeRecentlySearch" @click="closeRecentlySearch"></view>
			</view>
			<view class="RecentlySearchTemp">
				<view class="RecentlySearchItem" v-for="(item,index) in RecentlySearchList" :key="index" @tap="selectJob(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="hotSearchJob">
			<view class="hotSearchJob-title" >热搜职位</view>
			<view class="hotJobList">
				<view class="hotJobItem" v-for="(item,index) in hotJobList" :key="index" @tap="seletHotJob(item)">{{item}}</view>
			</view>
		</view>
	</view>
</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				hotJobList:
				[
					'普工',
					'质检员',
					'操作工',
					'装配工',
					'叉车工',
					'注塑工',
					'冲压工',
					'压铸工',
					'焊工',
					'包装工',
					'搬运工',
			   ],
			   RecentlySearchList:[
					// '叉车工',
					// '注塑工',
					// '普工',
					// '质检员',
					// '操作工'
				],
				keyWordStr:'',
				defaultKey:'',
			}
		},
		computed:{
			...mapState(['token','_keyWordStr'])
		},
		onLoad() {
			
		},
		onShow(){
			this.defaultKey = this._keyWordStr !='' ? this._keyWordStr:'';
			this.keyWordStr = this._keyWordStr !='' ? this._keyWordStr:'';
			this.RecentlySearchList = [];
			try {
			    const value = uni.getStorageSync('RecentlySearchList');
			    if (value) {
					// alert('tttttt')
					this.RecentlySearchList = value
					// value.forEach(item=>{
					// 	if(item){
					// 		this.RecentlySearchList = value
					// 		console.log('最近职位啊啊啊啊啊aaaa',this.RecentlySearchList)
					// 	}
					// }) 
			    }
			} catch (e) {
			    // error
			}
		},
		methods: {
			...mapMutations(['set_keyWordStr']),
			selectJob(e){
				this.set_keyWordStr(e);
				uni.redirectTo({
					url: '../searchDetail/searchDetail'
				});
			},
			seletHotJob(e){
				this.keyWordStr = e;
				if(this.keyWordStr&&this.RecentlySearchList.indexOf(this.keyWordStr) ==-1){
					this.RecentlySearchList.push(this.keyWordStr)
				}
				this.goSearchDetail();
				// uni.navigateTo({
				// 	url: '../searchDetail/searchDetail?keyWordStr=' + e
				// });
			},
			searKey(event){
				this.keyWordStr = event.detail.value;
			},
			backIndex(){
				uni.switchTab({
					 url: '../index/index'
				});
			},
			goSearchDetail(){
				// console.log(this.keyWordStr)
				if(this.keyWordStr && this.RecentlySearchList.indexOf(this.keyWordStr) ==-1){
					this.RecentlySearchList.push(this.keyWordStr)
				}
				// console.log('缓存值',this.RecentlySearchList)
				
				if(this.RecentlySearchList.length>0){
						try {
						    uni.setStorageSync('RecentlySearchList', this.RecentlySearchList);
						} catch (e) {
						    console.log(e)
						}
				}
				console.log(this.keyWordStr)
				this.set_keyWordStr(this.keyWordStr);
				uni.redirectTo({
					url: '../searchDetail/searchDetail?keyWordStr=' + encodeURIComponent(this.keyWordStr)
				});
			},
			closeRecentlySearch(){
				this.RecentlySearchList = [];
				try {
				    uni.removeStorageSync('RecentlySearchList');
				} catch (e) {
				    // error
				}
			}
		}
	}
</script>

<style>
	.status_bar {
	     height: var(--status-bar-height);
	     width: 100%;
			  position:fixed;
			  top: 0;
			  z-index: 9999;
			  background: #ffffff;
	 }
	 .top_view{
			  height: var(--status-bar-height);
			  width: 100%;
			  position: fixed;
			  top:0;
			  z-index: 999;
	 }
/* #ifdef MP-WEIXIN */
    .search{width: 100%;margin-top:130rpx;}
/*  #endif  */
.search{width: 100%;}
.search-nav-bar{width: 100%;height: 62rpx;line-height: 62rpx;border-bottom: 1px solid #f1f1f1;padding: 10rpx 0;}
.back{font-size: 32rpx;width: 76rpx;float: left;margin-right: 20rpx;text-align: center;}
.search-input{box-shadow: 0 0 10px #e8e8e8;float: left;background: #FFFFFF;height: 60rpx;line-height: 60rpx;width: 530rpx;border-radius:10rpx;padding-left: 20rpx;}

.searchIcon{float: left;color: #ccc;font-size: 32rpx;text-align: center;margin-right: 10rpx;}
.search-input input{float: left;font-size: 28rpx;width: 450rpx;height: 40rpx;line-height: 40rpx;padding: 10rpx 0;text-align: left;}

.search-btn{float: left;font-size: 30rpx;line-height: 60rpx;text-align: center;width: 100rpx;}

.hotSearchJob{padding: 20rpx 30rpx;width: 100%;box-sizing: border-box;}
.hotSearchJob-title{color: #222222;margin-bottom: 20rpx;font-size: 26rpx;line-height: 26rpx;}
.hotJobList{width: 100%;}
.hotJobList .hotJobItem{display: inline-block;font-size: 28rpx;line-height: 28rpx;padding: 12rpx 30rpx;border-radius:50rpx;border: 1px solid #ccc;color: #222222;text-align: center;margin: 0 10rpx 20rpx 0;letter-spacing: 2rpx;}
.RecentlySearch{width: 100%;padding: 20rpx 30rpx;box-sizing: border-box;}
/* .RecentlySearchTemp{width: 100%;} */
.RecentlySearchItem{display: inline-block;font-size: 28rpx;line-height: 28rpx;padding: 12rpx 30rpx;border-radius:50rpx;border: 1px solid #ccc;color: #222222;text-align: center;margin: 0 10rpx 20rpx 0;letter-spacing: 2rpx;}
.RecentlySearch-title{color: #222222;margin-bottom: 20rpx;font-size: 26rpx;line-height: 26rpx;}
.closeRecentlySearch{float: right;color: #CCCCCC;font-size: 15px;}
</style>