<template>
	 <view class="wunei">
		<view class="noData-img">
			<img src="../../static/img/icon_nocontent.png" alt="" style="width: 100px;margin: 0 auto;">
		</view>
		<view class="zwnr">暂无内容</view>
		<view class="kdbr">苦苦等待,不如主动出击</view>
	</view>
</template>

<script>
	export default {
		name:"noData",
	}
</script>

<style scoped>
	.wunei{
	    margin-top:180rpx;
	}
	.noData-img{text-align: center;}
	.zwnr{font-size:34rpx;text-align: center;color: #555;margin-bottom:20rpx}
	.kdbr{    color: #999;
	    font-size: 28rpx;
	    text-align: center;}
</style>
