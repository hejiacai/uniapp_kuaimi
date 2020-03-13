<template>
	<view class="edudatebox">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
        <view class="topBar">
        	<view class="getBack icon iconfont icon-backtrackx _i" @tap="back"></view>
            <view class="">
            	课程详情
            </view>
            <view class="" @tap="jubao">
            	举报
            </view>
        </view>
		<view class="imgbox">
			<image :src="DateilInfo.data.picture_url" mode=""></image>
		</view>
        <view class="edu_detail_title">
        	<view class="title_name" v-if="DateilInfo.data.course_name">
        		{{DateilInfo.data.course_name}}
        	</view>
            <view class="title_fa">
            	<view class="title_fa_l">
            		<view class="title_content">
                        <view class="pxsc">
                        	培训时长:
                        </view>
                        <view class="" v-if="DateilInfo.data.course_time_show==1">
                        	{{DateilInfo.data.course_time}}天
                        </view>  
                        <view class="" v-else>
                        	不限定时长
                        </view>
						<image :src="DateilInfo.train_deposit_url" mode="" v-if="DateilInfo.company_info.train_deposit==1"></image>
            		</view>
            	</view>
				<view class="title_money">
					{{DateilInfo.data.course_price}}
				</view>
            </view>
        </view>
        <view class="edu_detail_explain">
			<view class="explain_unit_title" style="margin-bottom:20rpx" v-if="DateilInfo.data.course_fee_explain">
				<view class="lump">
					
				</view>
			    <view class="lump_title">
			    	费用说明
			    </view>
			</view>
			<view class="" style="font-size:26rpx;color: #888888;margin-bottom: 20rpx;" v-if="DateilInfo.data.course_fee_explain">
				{{DateilInfo.data.course_fee_explain}}
			</view>
            <view class="explain_unit_title" style="margin-bottom:20rpx">
            	<view class="lump">
            		
            	</view>
                <view class="lump_title">
                	课程详情
                </view>
            </view>
            <view class="markDonwcontent" style="font-size:26rpx;color: #888888;" v-if="strings">
            	<u-parse :content="strings"></u-parse>
            </view>
			<!-- <view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
				<rich-text :nodes="strings"></rich-text>
			</view> -->
        </view>
        <view class="edu_footer">
        	<view class="footer_le">
        		<image :src="DateilInfo.company_logo" mode=""></image>
                <view class="classname">
                	{{DateilInfo.company_info.company_name}}
                </view>
        	</view>
            <view class="classnum">
            	课程数{{DateilInfo.course_count}}
            </view>
        </view>
        <view class="edu_apply">
            <view class="edu_apply_temp_t"  v-if="isApply">
            	已预约咨询
            </view>
        	<view class="edu_apply_temp" v-else @tap="referAp">
        		咨询
        	</view>
        </view>
        <uni-popup ref="showtip" :type="type" :mask-click="false">
        	<view class="uni-tip">
        		<text class="uni-tip-title">举报</text>
                <textarea class="uni-tip-content" placeholder="请输入举报内容(限200字)" placeholder-style="color: #ccc;" v-model="jubaoContent"></textarea>
        		<!-- <text class="uni-tip-content">您的简历信息不完善，工作经历信息未填写，可能会影响面试机会。</text> -->
        		<view class="uni-tip-group-button">
        			<text class="uni-tip-button buttonone" @tap="quxiao" style="font-size: 34rpx;color: #999;">取消</text>
        			<text class="uni-tip-button" @tap="queding" style="font-size: 34rpx;color: #fa5657;">确定</text>
        		</view>
        	</view>
        </uni-popup>
	</view>
</template>

<script>
    import {
    		mapState,
    		mapMutations
    	} from 'vuex';
		
        // import marked from 'marked'
        // let rendererMD = new marked.Renderer();
        //     marked.setOptions({
        //         renderer: rendererMD,
        //         gfm: true,
        //         tables: true,
        //         breaks: false,
        //         pedantic: false,
        //         sanitize: false,
        //         smartLists: true,
        //         smartypants: false
        //     });
        import uParse from '@/components/gaoyia-parse/parse.vue'
        import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import apiName from '../../static/commonjs/request/apiName.js';
	export default {
        components: {
        	uniPopup,
            uParse
        },
		data() {
			return {
                loading:false,
				type: 'center',
                isApply:true,
                course_id:'',
                DateilInfo:'',
                strings:'',
                jubaoContent:''
			};
		},
        onShow() {
        	// this.getDataList()
        },
        onLoad(options) {
            var _this = this 
            let course_id = parseInt(options.course_id)
            _this.course_id = options.course_id
            console.log( _this.course_id)
        	_this.$http.post(apiName.COURSEDETAIL,{
        		params: {
        			token:_this.token,
        	        course_id:_this.course_id
        		}
        	}).then(res=>{
        	    console.log('课程详情返回数据',res)
        	    if (res.data.success) {
                    _this.DateilInfo = res.data.data
                    if(res.data.data.has_apply){
                        this.isApply = true
                    }else{
                        this.isApply = false
                    }
                    _this.strings = res.data.data.data.course_content
					// console.log('解析后的内容',_this.strings)
                    console.log('返回的内容',res.data.data.data.course_content)
                    // _this.company_info = res.data.data.company_info 
        	        console.log('成功')
        	    }else{
        	        _this.$KM.showToast('请求职位列表接口失败')
        	    }
        	}).catch(err => {
        	     console.log('失败')
        	 });
        },
        computed: {
        	...mapState(['token'])
        },
        methods: {
            preview(src, e) {
              // do something
            },
            navigate(href, e) {
              // do something
            },
            referAp(){
				if(!this.token){
				    console.log('跳转登录页')
					return uni.reLaunch({
					    url: '../login/login?iseduDetail=true&course_id=' + this.course_id
					})
				}else{
                this.$http.post(apiName.ENTER_COURSE,{
                	params: {
                		token:this.token,
                        course_id:this.course_id
                	}
                }).then(res=>{
                    if (res.data.success) {
                        console.log('成功')
                        this.$KM.showToast('咨询成功,课程老师将尽快联系你')
                        this.isApply = true
                    }else{
                        this.$KM.showToast('请求职位列表接口失败')
                    }
                }).catch(err => {
                     console.log('失败')
                 });
			 }
            },
            quxiao(){
				this.jubaoContent = ''
                this.$refs['showtip'].close()
            },
            queding(){
                if(!this.jubaoContent){
                    return uni.showToast({
                    	icon:'none',
                        title:'举报内容不能为空'
                    })
                }
                this.$http.post(apiName.REPORT_COURSE,{
                	params: {
                		token:this.token,
                        course_id:this.course_id,
                        content:this.jubaoContent
                	}
                }).then(res=>{
                    console.log(res)
                    if (res.data.success) {
                        console.log('成功')
                        this.$refs['showtip'].close()
						this.jubaoContent = ''
                         this.$KM.showToast('举报成功')
                    }else{
                        this.$KM.showToast(res.data.msg)
                    }
                }).catch(err => {
            	     console.log('失败')
            	 });
            },
            getDataList(course_id) {
                var _this = this
            	_this.$http.post(apiName.COURSEDETAIL,{
            		params: {
            			token:this.token,
                        course_id:course_id
            		}
            	}).then(res=>{
                    console.log('课程详情返回数据',res)
            	    if (res.data.success) {
            	        console.log('成功')
            	    }else{
            	        _this.$KM.showToast('请求职位列表接口失败')
            	    }
            	}).catch(err => {
            	     console.log('失败')
            	 });
            },
        	back() {
        		// uni.navigateBack({
        		// 	delta: 1
        		// })
				uni.reLaunch({
					url:'../eduTrain/eduTrain'
				})
        	},
            jubao(){
                console.log('这是token',this.token)
				// this.$refs['showtip'].open()
				// return
                if(!this.token){
                    console.log('跳转登录页')
                	uni.reLaunch({
                	    url: '../login/login?iseduDetail=true&course_id=' + this.course_id
                	})
                }else{
                    this.$refs['showtip'].open()
                }
            }
        },
	}
</script>

<style lang="scss" scoped>
	.markDonwcontent{
		.wxParse .ol>.li, .wxParse .ul>.li{
			// display: none!important;
			display:block!important;
		}
	}
	.uni-tip {
	    width: 460rpx;
	}
    .edu_apply{
            width: 100%;
            height: 130rpx;
            background-color: #fff;
            padding: 20rpx 28rpx 20rpx 28rpx;
            box-sizing: border-box;
    }
    .edu_apply_temp{
            width: 100%;
    height: 100%;
    display: block;
    background-color: #fb5958;
    font-size: 30rpx;
    color: #fff;
    text-align: center;
    border-radius: 8rpx;
    line-height: 80rpx;
    }
    .edu_apply_temp_t{
        width: 100%;
        height: 100%;
        display: block;
        // background-color: #ffffff;
        font-size: 30rpx;
        color: #333333;
        text-align: center;
        border-radius: 8rpx;
        line-height: 80rpx;
		background-color: #f7f7f7;
    }
    .classnum{
            font-size: 24rpx;
    color: #888888;
    }
    .edu_footer{
           height: 124rpx;
    width: 100%;
    background-color: #fff;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    padding: 0 28rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    }
    .footer_le{
        display: flex;
        align-items: center;
        image{
                width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            margin-left: 6rpx;
            margin-right: 20rpx;
        }
    }
    .classname{
        color: #222222;
        font-size: 30rpx;
    }
    .ulboxtow{
        margin-top: 80rpx!important;
        // margin-bottom: 40rpx!important;
    }
    .edudatebox{
        background: #f6f7f9;
    }
    .pxsj{
        margin-right: 20rpx;
    }
    .ulBoxLi{
        display: flex;
        align-items: center;
        font-size: 26rpx;
        color: #888888;
        // justify-content: space-between;
    }
    .ulBox{
        margin: 20rpx 0 20rpx 40rpx;
    }
    .unit_explain{
        font-size: 28rpx;
    color: #888888;
    margin-top: 20rpx;
    word-wrap: break-word;
    word-break: normal;
    line-height: 48rpx;
    }
    .lump{
        width: 6rpx;
    height: 24rpx;
    background-color: #fb5958;
    margin-right: 12rpx;
    }
    .lump_title{
        font-size: 34rpx;
        color: #222222;
    }
    .explain_unit_title{
        display: flex;
    align-items: center;
    }
    .edu_detail_explain{
            margin-top: 10rpx;
        width: 100%;
        background-color: #fff;
        padding: 34rpx 28rpx 0 28rpx;
        box-sizing: border-box;
    }
    .pxsc{
        margin-right: 40rpx;
    }
    .title_fa{
            margin-top: 14rpx;
        display: flex;
        justify-content: space-between;
    }
    .title_fa_l{
            display: flex;
        align-items: center;
    }
    .title_content{
        font-size: 26rpx;
        color: #888888;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
	.title_content image{
		width: 34rpx;
		height: 34rpx;
		margin-left: 10rpx;
	}
    .title_money{
        font-size: 28rpx;
        color: #fb5958;
        font-weight: bold;
    }
    .title_name{
        font-size: 36rpx;
        color: #222222;
        font-weight: bold;
    }
    .edu_detail_title{
            width: 100%;
            height: 148rpx;
            background-color: #fff;
            padding: 20rpx 26rpx 0 26rpx;
            box-sizing: border-box;
    }
    .imgbox{
        width: 100%;
        height: 300rpx;
        image{
            width: 100%;
            vertical-align: top;
            height: 100%;
        }
    }
    .status_bar {
         height: var(--status-bar-height);
         width: 100%;
          position:fixed;
          top: 0;
          z-index: 9999;
          background: #ffffff!important;
     }
     .top_view{
    		  height: var(--status-bar-height);
    		  width: 100%;
    		  position: fixed;
    		  top:0;
    		  z-index: 999;
     }
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
     		/* 提示窗口 */
     	.uni-tip {
     		/* #ifndef APP-NVUE */
     		display: flex;
     		flex-direction: column;
     		/* #endif */
     		padding: 30rpx;
     		width: 460rpx;
     		background-color: #fff;
     		border-radius: 20rpx;
     		margin: 0 auto;
			border: 1rpx solid #f1f1f1;
     	}
		.uni-tip-title{
			border-bottom: 1rpx solid #f1f1f1;
			box-sizing: border-box;
			padding-bottom: 10rpx;
		}
		.uni-tip textarea{
			width: 460rpx;
		}
     	.uni-tip-title {
     		margin-bottom: 10px;
     		text-align: center;
     		font-weight: bold;
     		font-size: 16px;
     		color: #333;
     	}
     
     	.uni-tip-content {
     		/* padding: 15px;
     */
     		font-size: 14px;
     		color: #666;
     	}
     
     	.uni-tip-group-button {
     		/* #ifndef APP-NVUE */
     		display: flex;
     		/* #endif */
     		flex-direction: row;
     		margin-top: 20px;
     	}
		.buttonone{
			border-right: 1rpx solid #f1f1f1;
		}
     	.uni-tip-button {
     		flex: 1;
     		text-align: center;
     		font-size: 14px;
     		color: #3b4144;
     	}
</style>
