<template>
	<view class="postReportCon">
		<view class="nav">
			<view class="icon iconfont icon-backtrackx back" @tap="back"></view>
			<view class="title">举报</view>
		</view>
		<view class="jobInfo">
			<view class="jobName"><text>举报职位 : </text>{{job_name}}</view>
			<view class="companyName"><text>发布公司 : </text>{{company_name}}</view>
		</view>
		<view class="form">
			<view class="form-radioList">
				<view :class="['form-li',isCheckIndex==index ? 'cur':'']"  v-for="(item,index) in items" :key="index" @click="chooseItem(index,item.value)">
					<view class="report-content-info">
						<view :class="['icon','iconfont','radionIcon', isCheckIndex==index ? 'icon-completematerial_selectedx' : 'icon-completematerial_unselectedx']">
						</view>
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="textareaContainer">
				<textarea class="textareaCon" :value="textareaValue" placeholder="请输入举报的详细原因" />
			</view>
			<view class="btn-width90" @click="postReport">保存</view>
		</view>
		
		
	</view>
</template>
<style scoped >
	.postReportCon{width: 100%;padding-top: 100rpx;}
	.nav{height: 88rpx;line-height: 88rpx;}
	.back{float: left;margin-left: 20rpx;}
	.title{text-align: center;width: 100%;}
	.jobInfo{padding: 20rpx 30rpx;box-sizing: border-box;}
	.jobName,.companyName{color: #222222;font-size: 30rpx;line-height: 52rpx;text-align: left;}
	.jobName text,.companyName text{color: #999;padding-right: 20rpx;}
	.form{width: 100%;padding: 40rpx 30rpx;box-sizing: border-box;border-top: 5px solid #f3f3f3;}
	.form-radioList{overflow: hidden;}
	.form-li{width: 50%;float: left;margin-bottom: 20rpx;padding-right: 20rpx;box-sizing: border-box;}
	.report-content-info{font-size: 26rpx;line-height: 36rpx;color: #222222;}
	.radionIcon{display: inline-block;padding-right: 10rpx;}
	.textareaContainer{border: 1px solid #f1f1f1;border-radius: 4px;padding: 5px;margin-top: 5px;}
	.form-radioList .cur .report-content-info{color:#fb5958;}
	.textareaContainer textarea{
		font-size: 28rpx;
		min-height: 130px;
		width: 100%;
		display: block;
		border: none;
		outline: none;
		overflow: hidden;
	}
</style>

<script>
	// const http = new Request();
	import apiName from '../../static/commonjs/request/apiName.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		
		data() {
			return {
					isCheckIndex: -1,
					jobInfo:{},
					job_name:"",
					company_name:"",
					current: 0,
					textareaValue:'',
					report_type:0,
					job_flag:'',
					items: [{
			                    value: 6,
			                    name: '以服装、培训、介绍工作等为由变相欺诈收费'
			                },
			                {
			                    value: 7,
			                    name: '娱乐会所、博彩等涉嫌赌博、色情',
			                },
			                {
			                    value: 8,
			                    name: '已经停止招聘的信息'
			                },
			                {
			                    value: 9,
			                    name: '假招聘转招生行为'
			                },
			                {
			                    value: 2,
			                    name: '冒用该公司名义招聘'
			                },
			                {
			                    value: 10,
			                    name: '招聘过程有违规行为'
			                },
							{
							    value: 5,
							    name: '保险代理人'
							},
							{
							    value: 11,
							    name: '挂着不招人'
							},
							{
							    value: 12,
							    name: '职位描述与实际不符'
							},
							{
							    value: 4,
							    name: '其他'
							},
			            ],
			            
			}
		},
		created(index){
			
		},
		onLoad(options) {
			this.job_flag= options.job_flag;
			this.company_id= options.company_id;
			this.job_name = decodeURIComponent(options.job_name);
			this.company_name = decodeURIComponent(options.company_name);
		},
		computed: {
			...mapState(['token']),
		},
		methods: {
			chooseItem(index,value){
				this.isCheckIndex = index;
				this.report_type = value;
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			postReport(){
				let _this = this;
				if(this.report_type == 0){
					_this.$KM.showToast('请选择举报类型');
					return;
				}
				this.$http.post(apiName.JOB_REPORT,{
					params:{
						token:_this.token,
						job_flag:_this.job_flag,
						content:_this.textareaValue,
						report_type:_this.report_type,
						}
				}).then(res => {
					if(res.data.success){
						console.log('举报成功',res);
						_this.$KM.showToast('举报成功');
						let setInter = setInterval(function(){
							_this.back();
							clearInterval(setInter)
						},2000)
						_this.seed = res.data.data.seed;
						
					}else{
						_this.$KM.showToast(res.data.msg);
					}
					
				}).catch(err => {
					
					console.error('出错了',err)
				
				})
			}
			
		}
	}
</script>

