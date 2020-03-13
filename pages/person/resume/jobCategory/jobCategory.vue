<template>
	<view class="jobCategory">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<view class="psgSeekHead">
			<view class="psgSeekBg">
				<text>请选择职位类别</text>
				<view class="sure" @click="sure">确定</view>
				<view class="icon iconfont icon-backtrackx back getBack" @click="goback"></view>
			</view>
		</view>
		<view class="ptworkPlace">
			<view class="yiXuan">最多选<text class="count">5</text>个</view>
			<view class="yiAddress" v-for="(item,index) in showJob" :key="index">
            {{ item.jobsort_name }}
            <view class="icon iconfont icon-icon-AI-_-" @click="detJob(index)"></view>
            </view>
		</view>
		<view v-for="(item,index1) in jobList" :key="item.code">
			<view class="more-title">{{ item.name }}</view>
			<view class="more-label">
				<view :class="['work',chooseJobListCode.indexOf(itemc.code)===-1?'':'red']" v-for="(itemc,index2) in item.children" :key="itemc.code" @click="chooseJob(itemc.code,index1,index2,itemc.name,itemc)">{{ itemc.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
    import apiName from '../../../../static/commonjs/request/apiName.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				type:'',
				jobList: [],
				chooseJobListCode: [],
				showJob: []
			}
		},
		onLoad(options) {
			var data=JSON.parse(options.params)
			this.type = data.type?data.type:''
			console.log('oooooooooooo',data)
			if(data.expect_jobsort){
				this.showJob=data.expect_jobsort
				for(var i=0;i<data.expect_jobsort.length;i++){
					this.chooseJobListCode.push(data.expect_jobsort[i].jobsort)
				}
			}
            // blueuniapp.hb.com
            // this.$http.get('https://uniapp.kuaimijob.com/index?ver=v1.0&apiname=jobsortcommon&=')
            this.$http.get(apiName.JOB_SORT_COMMON,{
            	
            }).then(res=>{
				if(res.data.success){
					this.jobList=res.data.data
					console.log('请求职位成功',this.jobList)
				}else {
					console.log('请求简历失败')
				}
			}).catch(err=> {
				throw err
			})
		},
		computed: {
			...mapState(['jobCategory','indexSearchJob','changejobCategory','token'])
		},
		methods: {
			...mapMutations(['addJobCategory','addSearchJob','changeJobCategory']),
			goback() {
				uni.navigateBack({
				    delta: 1
				})
			},
			chooseJob(code,index1,index2,name,item) {
				// console.log('选择的职位',item)
                if(this.chooseJobListCode.indexOf(this.jobList[index1].children[index2].code)==-1){
				this.chooseJobListCode.push(this.jobList[index1].children[index2].code)
				// console.log('职位code',this.chooseJobListCode)
				var obj={}
				obj.jobsort_name=this.jobList[index1].children[index2].name
				obj.jobsort=this.jobList[index1].children[index2].code
				this.showJob.push(obj)
				// console.log('所有职位',this.showJob)
				if(this.chooseJobListCode.length>5){
					this.$KM.showToast('最多只能选择5个类别')
					this.chooseJobListCode.splice(5,1)
					this.showJob.splice(5,1)
				}
                }
			},
			detJob(index) {
				this.showJob.splice(index,1)
				this.chooseJobListCode.splice(index,1)
			},
			sure() {
				let _this = this;
                if(this.chooseJobListCode.length<1){
                    return uni.showToast({
                        icon:'none',
                		title:'期望职位不能为空'
                	})
                }
				// for(var i=0;i<this.showJob.length-1;i++){
				// 	this.showJob[i].jobsort_name.replace(/,/g,'')
				// 	this.showJob[i].jobsort_name=this.showJob[i].jobsort_name+','
				// }
				// console.log('保存的数据啊啊啊啊啊啊啊啊啊啊',this.showJob)
				// this.addJobCategory(this.showJob)
				// console.log(this.jobCategory)
				// return
				// uni.$emit('savaJobCategory',this.chooseJobListCode);
				// this.saveJobSort(this.chooseJobListCode);
				this.$http.get(apiName.SETEXPJOBSORT,{
					params: {
						token:this.token,
						exp_jobsorts:this.chooseJobListCode.length>0?this.chooseJobListCode.join(','):'',
					}
				}).then(res=>{
					if(res.data.success){
						console.log('修改成功');
						// _this.$KM.showToast('请求职位成功','success');
						// console.log('请求职位成功',res.data.msg);
					}else {
						console.log(res.data.msg);
						// _this.$KM.showToast(res.data.msg)
					}
				}).catch(err=> {
					throw err
				})
				if(this.type=='tianxie'){
					this.addJobCategory(this.showJob)
                     uni.setStorageSync('fromselemateril', 'true');
					uni.navigateTo({
						url: '../../../material/material?fromselemateril=true'
					})
				}else if(this.type=='index'){
					this.addSearchJob(this.showJob);
					setTimeout(function(){
						uni.switchTab({
						    url: '../../../index/index'
						});
					},500)
				}else{
					this.changeJobCategory(this.showJob)
                    uni.setStorageSync('fromSeleAddre', 'true');
					uni.switchTab({
					    url: '../resume'
					});
				}
				// console.log('保存的数据啊啊啊啊啊啊啊啊啊啊',this.jobCategory)
				// console.log('首页搜索的职位名称',this.indexSearchJob)
			},
			saveJobSort(data){
				this.$http.get(apiName.SETEXPJOBSORT,{
					params: {
						token:this.token,
						exp_jobsorts:data.length>0?data.join(','):'',
					}
				}).then(res=>{
					if(res.data.success){
						_this.$KM.showToast('请求职位成功','success');
						// console.log('请求职位成功',res.data.msg);
					}else {
						// console.log(res.data.msg);
						_this.$KM.showToast(res.data.msg)
					}
				}).catch(err=> {
					throw err
				})
			}
		}
	}
</script>

<style scoped>
    .status_bar {
         height: var(--status-bar-height);
         width: 100%;
    		  position:fixed;
    		  top: 0;
    		  z-index: 9999;
    		  /* background: #333333!important; */
     }
     .top_view{
    		  height: var(--status-bar-height);
    		  width: 100%;
    		  position: fixed;
    		  top:0;
    		  z-index: 999;
     }
	.count{font-weight: normal;
    color: #fb5958;}

.psgSeekHead {width: 100%;margin-top:var(--status-bar-height);}
 /* #ifdef MP-WEIXIN */
     .psgSeekHead {width: 100%;margin-top:110rpx;}
 /*  #endif  */
.placeholderStyle {color: #ccc;}
.psgSeekHead .psgSeekBg {padding: 16rpx 104rpx 16rpx 90rpx;position: relative;}
.psgSeekHead .psgSeekBg text {line-height: 56rpx;height: 56rpx;width: 100%;text-align: center;font-size: 34rpx;color: #222;display: block;}
.psgSeekHead .psgSeekBg .getBack {display: block;width: 76rpx;height: 84rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 32rpx;line-height: 84rpx;text-align: center;color: #222;}
.sure {width: 120rpx;text-align: center;position: absolute;top: 0rpx;right: 0rpx;color: #fb5958;line-height: 88rpx;font-size: 30rpx;}
.ptworkPlace {padding: 30rpx;padding-bottom: 14rpx;border-bottom: 2rpx solid #e5e8e8;}
.ptworkPlace .yiXuan {top: 0rpx;left: 0rpx;padding-bottom: 20rpx;font-size: 24rpx;color: #555555;}
.ptworkPlace .yiAddress {position: relative; display: inline-block;padding: 6rpx 60rpx 6rpx 20rpx;background: #fb5958;border: 2rpx solid #fb5958;border-radius: 50rpx;margin: 0 20rpx 4rpx 0rpx;font-size: 28rpx;color: #fff;overflow: hidden;}
.ptworkPlace .yiAddress view {cursor: pointer;position: absolute;top: 4rpx;right: 12rpx;color: #fff;width: 40rpx;height: 44rpx;line-height: 44rpx;display: block;text-align: center;font-size: 30rpx}
.more-title {font-size: 30rpx;color: #222;margin-top: 20rpx;padding-left: 30rpx;font-weight: bold;}
.more-label {padding: 20rpx 30rpx;}
.more-label .work {display: inline-block; padding: 8rpx 30rpx;font-size: 26rpx;color: #222;border: 2rpx solid #ccc;border-radius: 50rpx;margin-bottom: 20rpx;margin-right: 20rpx;}
.more-label .red {border: 2rpx solid #fb5958;color: #fff;background: #fb5958;}
</style>
