<template>
    <view class="eduBox" style="overflow: auto;">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="topBar">
			<view class="getBack icon iconfont icon-backtrackx _i" @tap="back"></view>
		    <view class="">
		    	教育培训
		    </view>
			<view class="aa">
				
			</view>
		</view>
        <view class="edu_content" style="overflow: auto;">
        	<view class="edu_particulars" style="overflow: auto;">
        		<view class="edu_item" @tap="trunTail(item.course_id)" v-for="(item,index) in eduList">
        			<view class="self-support_save" v-if="item.is_course_free==1">
        				免费
        			</view>
                    <image :src="item.picture_url" mode=""></image>
					<!-- v-if="item.train_deposit==1" -->
                    <view class="edu_par_title">
						<image :src="train_deposit_url" mode="" v-if="item.train_deposit==1"></image>
						<view class="edu_par_title_aa">
							{{item.course_name}}
						</view>
                    </view>
        		</view>
                <!-- <view class="edu_item">
                	<view class="self-support_save">
                		免费
                	</view>
                    <image src="../../static/img/zhimingbg.png" mode=""></image>
                    <view class="edu_par_title">
                    	烘焙免费培训,烘焙免费培训
                    </view>
                </view>
                <view class="edu_item">
                	<view class="self-support_save">
                		免费
                	</view>
                    <image src="../../static/img/zhimingbg.png" mode=""></image>
                    <view class="edu_par_title">
                    	烘焙免费培训,烘焙免费培训
                    </view>
                </view>
                <view class="edu_item">
                	<view class="self-support_save">
                		免费
                	</view>
                    <image src="../../static/img/zhimingbg.png" mode=""></image>
                    <view class="edu_par_title">
                    	烘焙免费培训,烘焙免费培训
                    </view>
                </view> -->
        	</view>
        </view>
        <uni-load-more :status="loandMore"></uni-load-more>
    </view>
</template>

<script>
    import {
    		mapState,
    		mapMutations
    	} from 'vuex';
    import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
    import apiName from '../../static/commonjs/request/apiName.js';
   export default {
    	data() {
    		return {
				sort_code:'',
				train_deposit_url:'',
                loandMore:'hide',
    			dataList:'',
                page_pageno:1,
                eduList:[]
    		}
    	},
        components: {
        	uniLoadMore
        },
        onShow() {
        	this.getDataList()
        },
        onReachBottom(){
           this.getDataList()
        },
        computed: {
        	...mapState(['token'])
        },
        methods: {
			back(){
				uni.reLaunch({
					url:'../index/index'
				})
			},
            trunTail(course_id){
                uni.navigateTo({
                	url:'../eduDetail/eduDetail?course_id=' + course_id
                })
            },
        	getDataList() {
                var _this = this
                _this.loandMore='loading';
                // let page_pageno = ++_this.page_pageno
        		_this.$http.post(apiName.COURSELIST,{
        			params: {
        				// token:this.token,
                        page: _this.page_pageno,
                        page_size: 10,
						sort_code:_this.sort_code,
						t:new Date() - 0,
        			}
        		}).then(res=>{
                    _this.loandMore='hide';
        		    if (res.data.success) {
						_this.sort_code = res.data.data.sort_code?res.data.data.sort_code:''
                        _this.page_pageno = ++_this.page_pageno
        		        console.log(res.data.data.data)
						_this.train_deposit_url = res.data.data.train_deposit_url
                        _this.eduList.push(...res.data.data.data)
        		    }else{
        		        _this.$KM.showToast('请求职位列表接口失败')
        		    }
        		}).catch(err => {
        		     _this.loandMore='hide';
        		 });
        	}
        }
        
    }
</script>

<style lang="scss" scoped>
	.topBar{
	    margin-top: var(--status-bar-height);
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    line-height: 88rpx;
	    height: 88rpx;
	    width: 100%;
	    padding: 0 30rpx;
	    box-sizing: border-box;
	    background: #ffffff;
	}
	
	/* #ifdef MP-WEIXIN */
	   .topBar{margin-top: 120rpx;}
	   .imgbox{}
	/* #endif */
    .edu_particulars{
            box-sizing: border-box;
            width: 100%;
            padding: 20rpx 24rpx 0 24rpx;
//             display: flex;
//             flex-wrap: wrap;
             display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
    }
    .edu_item{
        width: 48%;
        height: 270rpx;
        background-color: #fff;
        border-radius: 8rpx;
        margin-bottom: 14rpx;
        position: relative;
        margin-right: 10rpx;
        image{
            width: 100%;
            vertical-align: top;
            height: 182rpx;
            border-radius: 8rpx 8rpx 0 0;
            }
    }
    .self-support_save{
        padding: 0 8rpx;
        height: 34rpx;
        border-radius: 8rpx;
        background-color: #21bfca;
        font-size: 24rpx;
        text-align: center;
        line-height: 34rpx;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .edu_par_title_aa{
            height: 88rpx;
            line-height: 88rpx;
            font-size: 30rpx;
            color: #333333;
            padding-left: 20rpx;
            box-sizing: border-box;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
    }
	.edu_par_title{
		display: flex;
		align-items: center;
		// justify-content: space-between;
	}
	.edu_par_title image{
		height: 34rpx;
		width: 34rpx;
	}
</style>
