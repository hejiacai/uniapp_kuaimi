<template>
	<view class="content">
		<!-- <view class="logo-bar">
			<img src="./images/index-download.png"/>
			<text class="download" >下载app</text>
		</view> -->
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<view class="job-detail">
		    <view class="psgSeekBg psgPrecise">
		        <view class="navigator">
					<view @click="back">
						<i class="getBack icon iconfont icon-backtrackx"></i>
					</view>
					<!-- <view class="reportjobdetail"> -->
						<!-- <img src="./images/kuaimigongzuo.png" alt="" width="67px;" height="16px;">
						<i class="iconfont iconhome"></i> -->
						<!-- <img src="../../static/img/report-job.png" class="report-icon" @click="gotoReport"></img> -->
						<!-- <img src="../../static/img/share-job.png" class="share-icon"></img> -->
					<!-- </view> -->
				</view>
		    </view>
			<view class="job-info">
				<view class="job-name">
					<view class="center">
						<text class="job-status">{{jobDetail.station}}</text>
						<!-- <text class="direct-move">直招</text> -->
					</view>
					<!-- <view>
						<i class="iconfont iconjob_navigation_collection_x" v-if="jobDetail.is_fav=='1'"></i>
						<i v-else class="iconfont iconjob_navigation_collectionx"></i>
					</view> -->
					<view @click="getCollect()">
						<i class="star-icon icon iconfont icon-job_navigation_collection_x iconed" v-if="jobDetail.is_fav=='1'"></i>
						<i v-else class="star-icon icon iconfont icon-job_navigation_collectionx"></i>
					</view>
				</view>
				<view class="fivehundred" v-if="jobDetail.is_award == 1 && jobDetail.award_mount != ''">
					<view class="fiveone" @click="checkmore">
						<view style="display: flex;">
							<i class="icon iconfont icon-job_rewardx qianbao"></i>
							<text class="wen_zi">{{ jobDetail.award_mount }}</text>
						</view>
						<i class="icon iconfont icon-job_expandx xiangxia" v-if="!fivehundredtemp"></i>
						<i class="icon iconfont icon-job_collapsex xiangxia" v-else></i>
					</view>
					<view class="fivetwo" v-if="fivehundredtemp">
						<view class="jianglicontent"><text class="jianglidian">●</text>通过快米投递简历参与奖励活动（报名成功后会短信通知您）</view>
						<view class="jianglicontent"><text class="jianglidian">●</text>入职满35天后，快米工作人员会与企业核实，5个工作日将会发放入职奖励；求职者也可通过微信或服务热线了解发放进度。</view>
						<view class="jianglicontent"><text class="jianglidian">●</text>奖励发放方式：本人银行卡或汇博人才市场现场领取</view>
					</view>
				</view>
				<view class="job-require">
					<text>{{jobDetail.job_detail_info}}
						<!-- {{jobDetail.degree_text=='学历不限'?jobDetail.degree_text:jobDetail.degree_text}} -->
					</text>
					<!-- <text v-if="jobDetail.quantity">| {{jobDetail.quantity}}</text>
					<text v-if="jobDetail.sex"></text> -->
					<!-- <text>
						{{jobDetail.job_detail_info}}
					</text> -->
				</view>
				<view class="job-salary">
					<view>
						<text class="pay">{{jobDetail.salary_text}}</text>
						<text class="pay-bg">综合工资</text>
					</view>
					<view class="refresh-time">{{jobDetail.refresh_time}}</view>
				</view>
				<view class="work-address" @click="navigateMap">
					<view style="display: flex;width: 77%;">
						<i class="icon iconfont icon-job_addressx" style="margin-top: 4rpx;margin-right: 8rpx;"></i>
						<text style="width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{jobDetail.address}}</text>
					</view>
					<view class="read-text">
						<text>离我{{dis}}</text>
						<i class="icon iconfont icon-job_reward_morex" style="margin-top: 4rpx;color: #ccc;"></i>
					</view>
				</view>
			</view>
			
		</view>
		<view class="other-benefits">
			<view class="boon" style="margin-bottom: 40rpx;">薪资福利</view>
			<view class="job-boon">
				<text v-for="(item,index) in jobDetail.rewards" :key="index">
					{{item}}
				</text>
			</view>
			<view class="job-deal">
				<view v-if="jobDetail.base_salary" style="line-height: 48rpx;margin-bottom: 24rpx;display: flex;">
					<text style="width: 22%;">底&emsp;&emsp;薪：</text>
					<text class="item-content">{{jobDetail.base_salary}}</text>
				</view>
				<view v-if="jobDetail.royalty_method" style="line-height: 48rpx;margin-bottom: 24rpx;display: flex;">
					<text style="width: 22%;">提&emsp;&emsp;成：</text>
					<text class="item-content">{{jobDetail.royalty_method}}</text>
				</view>
				<view v-if="jobDetail.other_subsidy" style="line-height: 48rpx;display: flex;">
					<text style="width: 22%;">补&emsp;&emsp;贴：</text>
					<text class="item-content">{{jobDetail.other_subsidy}}</text>
				</view>
			</view>
		</view>
		<view class="other-benefits">
			<view class="boon">食宿情况</view>
			<view class="hastb">
				<view class="haszs" style="margin-right: 50rpx;" v-if="jobDetail.is_accommodation && jobDetail.is_accommodation!='不提供住宿'">
					<i class="icon iconfont icon-jobdetails_accommodation hascontent"></i>
					<text class="hastitle">{{jobDetail.is_accommodation}}</text>
				</view>
				<view class="hascy" v-if="jobDetail.working_meal_type!='面试介绍详情' && jobDetail.working_meal_type!='不支持' && jobDetail.working_meal_type!='不提供'">
					<i class="icon iconfont icon-jobdetails_eat hascontent"></i>
					<text class="hastitle">{{jobDetail.working_meal_type}}</text>
				</view>
			</view>
			<view class="list-item resumeRtitx05">
				<view class="list-unit" v-if="jobDetail.accommodation_price">
					<text class="item-name">住宿费用：</text>
					<text class="item-content">{{jobDetail.accommodation_price}}</text>
				</view>
				<view class="list-unit" v-if="jobDetail.accommodation_facility">
					<text class="item-name">住宿条件：</text>
					<text class="item-content">{{jobDetail.accommodation_facility}}</text>
				</view>
				<view class="list-unit" v-if="jobDetail.accommodation_other">
					<text class="item-name">其他费用：</text>
					<text class="item-content">{{jobDetail.accommodation_other}}</text>
				</view>
				<view v-if="jobDetail.working_meal_type!='面试介绍详情' && jobDetail.working_meal_type!='不支持' && jobDetail.working_meal_type!='不提供'" class="food">
					<view v-if="jobDetail.working_meal_reasons" style="display: flex;">
						<text class="item-name">餐饮说明：</text>
						<text class="item-content">{{jobDetail.working_meal_reasons}}</text>
					</view>
				</view>
				<view style="color:#999;padding:0;" v-if="jobDetail.is_accommodation==0 || jobDetail.is_accommodation== '不提供住宿' && jobDetail.working_meal_type=='面试介绍详情' || jobDetail.working_meal_type=='不提供'">
					面试介绍详情
				</view>
			</view>
		</view>
		<view class="other-benefits">
			<view class="boon">工作说明</view>
			<view class="list-item resumeRtitx05">
				<view class="list-unit" v-if="jobDetail.schedule_string||jobDetail.examination||jobDetail.is_dusters==1||jobDetail.work_posture==1" style="display: flex;">
					<text class="item-name" style="width: 22%;">工作时间：</text>
					<text class="item-content">{{jobDetail.schedule_string}}</text>
				</view>
				<view class="list-unit mp30" v-if="jobDetail.content">
					<view class="item-name">岗位说明：</view>
				</view>
				<view style="padding-left: 0;margin-bottom: 36rpx;line-height: 48rpx;">
					<text>{{jobDetail.content}}</text>
				</view>
				<!--其他岗位要求-->
				<view class="mp30" v-if="jobDetail.other_need">
					<view class="item-name">招聘要求：</view>
				</view>
				<view style="padding-left: 0;margin-bottom: 30rpx;line-height: 48rpx;">
					<text>{{jobDetail.other_need}}</text>
				</view>
			</view>
		</view>
		<!-- {/if $reffer_from!='companyjob'/} -->
		<view class="company-introduction" v-if="reffer_from!='companyjob'">
			<view class="company-head">
				<text>{{jobDetail.company_shortname}}</text>
				<text class="to-company"  @click="companydetail">更多信息</text>
			</view>
		    <view class="company-info" :class="[isShow?'':'ellipsis']">{{jobDetail.company_info}}</view>
			<!-- 公司图片 -->
			<!--imgs jobDetail.company_photos item.photo_url"-->
			<block >
				<scroll-view scroll-x="true" >
					<block v-for="(item,index) in jobDetail.company_photos" :key="index">  
						<image :src="item.photo_url" ></image>
					</block>
					 <!-- company_photos -->
				</scroll-view>
			</block>
			<!-- 文字开关 -->
			<view class="closeOther" v-if='isShow'  @click='openWord'>
				<i class="icon iconfont icon-job_collapsex" style="font-size: 12px;"></i>
			</view>
			<view class="closeOther" v-else @click='openWord'>
				<i class="icon iconfont icon-job_expandx" style="font-size: 12px;"></i>
			</view>
			<view class="reportBox">
				<view class="reportTip">
					<view class="icon iconfont icon-jobdetails_note reportIcon"></view>
					<text>求职过程中遇到招聘方有任何收费，扣押证件行为，请</text>
					<text class="reportnavigate" @tap="gotoReport">立即举报</text>
				</view>
			</view>
		</view>
		<view class="other-benefits" v-if="jobDetail.reommend_job_list">
			<view style="display: flex;justify-content: space-between;">
				<view class="boon like-job">相似职位</view>
				<view style="display: flex;color: #ccc;font-size: 24rpx;" @click="gotomore">
					<view style="color: #999;">更多</view>
					<i class="icon iconfont icon-job_reward_morex" style="font-size: 24rpx;margin-top: 4rpx;margin-left: 4rpx;"></i>
				</view>
			</view>
			<view class="resemble-items" v-for="(item,index) in jobDetail.reommend_job_list" :key="index" @click="refreJob(item)">
				<view class="resemble-head">
					<text class="resemble-name">{{item.station}}</text>
					<text class="resemble-money">{{item.salary_text}}</text>
				</view>
				<view class="superqiye">
					<view class="resemble-company">{{item.company_shortname}}</view>
					<view v-for="(item2,index2) in item.company_recruit_type" :key="index2" :class="[item2 == '名企' ? 'mingqi' : item2 == '奖500' ? 'jiang' : 'gaoxin']">{{ item2 }}</view>
				</view>
				<view class="resemble-require">{{item.job_base_info}}</view>
				<view class="job-boon job_boon">
					<text v-for="(items,ind) in item.rewards" :key="ind">
						{{items}}
					</text>
				</view>
			</view>
		</view>
		<view class="jobFooter">
			<text>进厂</text><text class="gang">|</text><text>保安</text><text class="gang">|</text><text>快递员</text><text class="gang">|</text><text>服务员等职位</text><text class="kmgz">快米工作</text><text>更专业</text>
		</view>
		<!-- <view class="bottom-btn">
			<view class="tel">电话报名</view>
			<view class="apply" @click="applyJob">立即申请</view>
            <view class="tdjl">投递简历</view>
		</view> -->
		
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">提示</text>
				<text class="uni-tip-content">您的简历信息不完善，工作经历信息未填写，可能会影响面试机会。</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="goPerfect">去完善</text>
					<text class="uni-tip-button" @click="goOnSend">不，继续投递</text>
				</view>
			</view>
		</uni-popup>
		
        <view class="bottom-btn">
            <view class="dhbm" v-if="jobDetail.apply_tel_phone && jobDetail.is_stop == 0" @click="applyJob">电话报名</view>
            <view class="tdjl" v-if="jobDetail.can_apply == 1 && jobDetail.is_stop == 0" @click="sending">投递简历</view>
			<view class="tdjl" v-else-if="jobDetail.can_apply == 0" @click="sent">已投递</view>
			<view class="tdjl_tz" v-else-if="jobDetail.is_stop == 1">已停招</view>
        </view>
	</view>
</template>

<script>
	// const http = new Request();
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import apiName from '../../static/commonjs/request/apiName.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				reffer_from:'',
				imgs:['https://cdn-media-1.freecodecamp.org/images/kbYsxsxb2D7mBhdlEmUrpMhRmOcQoR79vtT1',
				'https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg',
				'https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg',
				'https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg'],
				jobDetail:{},
				job_flag:'',
				isShow:false,  //是否显示完文字
				dis: '',
				my_x: '',
				my_y: '',
				pageParams: {},
				reommend_job_flag: [],
				fivehundredtemp: false,
				worklength: [],
				type: 'center',
				oldJobDetail: '',
                jobsort_id:[]
			}
		},
        onShow(){
        	var _this = this;
        },
		
		onHide(){
			this.set_isSearchDetail(1);
		},
		onLoad(options) {
			this.$http.post(apiName.RESUME_INFO,{
				params: {
					token: this.token
				}
			}).then(res => {
				this.worklength = res.data.data.work_data.length;
				
			}).catch(err => {
				console.log(err);
			})
			this.job_flag = options.job_flag;
			let _this = this;
			_this.pageParams = {
				...options
			};
			this.$http.post(apiName.GET_JOB_INFO,{
				params:{
					token: this.token,
					job_flag: _this.job_flag,
					reffer_from:''
				}
			}).then(res => {
				_this.jobDetail = res.data.data
                _this.jobsort_id.push(res.data.data.jobsort_id)
                console.log('返回的jobId',_this.jobsort_id)
				for(var i=0;i<res.data.data.reommend_job_list.length;i++){
					if(res.data.data.reommend_job_list[i].rewards.length>4){
						res.data.data.reommend_job_list[i].rewards.splice(4,res.data.data.reommend_job_list[i].rewards.length)
					}
				}
				_this.oldJobDetail = res.data.data.job_flag
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
						_this.my_x = res.longitude
						_this.my_y = res.latitude
						var x = _this.jobDetail.map_x  //公司经度
						var y = _this.jobDetail.map_y  //公司纬度
                        console.log('获取的经度',_this.my_x)
                        console.log('获取的纬度',_this.my_y)
                        console.log('公司经度',x)
                        console.log('公司纬度',y)
						_this.dis = parseInt(_this.distance(_this.my_y, _this.my_x, y, x)) + 'km'
				    },
					fail: function(err){
						console.log('获取位置失败')
					}
				});
			}).catch(err => {
				console.log(err);
			})
		},
		onShow(){
			
		},
		computed: {
			...mapState(['token','_isSearchDetail','_routerBackHistoy','_isJobDetail','_isCompanyDetail','_isCompanyDetailId','jobId','_chooseJobList']),
// 			name() {
// 				return this.jobDetail.company_info.substring(0,100)
// 			}
		},
		onUnload() {
			this.set_routerBackHistoy('');
		},
		onBackPress(event){//监听手机返回键
			let _this = this;
			if(event.backbutton){
				if(this._routerBackHistoy){
					uni.redirectTo({
						url: _this._routerBackHistoy
					})
					return
				}
				uni.navigateBack({
					delta:_this._isSearchDetail
				})
			}
		},
		methods: {
			...mapMutations(['set_chooseJobList','set_isSearchDetail','set_routerBackHistoy','set_isCompanyDetailId','addJobId','spliceJobId']),
			goPerfect() {
				let pages = getCurrentPages();
				let pageRouterLink = (pages[pages.length - 1]).route; 
				let params = this.pageParams
				let callBackPage = {
					url: `/${pageRouterLink}`,
					params: params
				}
				uni.setStorage({
				    key: 'callBackPage',
				    data: callBackPage,
				});
				uni.switchTab({
				 	url:"../person/resume/resume"
				 })
			},
			goOnSend() {
				this.$http.post(apiName.APPLY_JOB,{
					params:{
						token: this.token,
						job_flag: this.job_flag,
						apply_type:1,   //选填：默认1;报名方式 1主动投递 2电话报名
						must_apply: 1
					}
				}).then(res => {
					if(res.data.success){
						uni.showToast({
							title:res.data.msg,
							mask:true
						})
						this.$http.post(apiName.GET_JOB_INFO,{
							params:{
								token: this.token,
								job_flag: this.job_flag,
								reffer_from:''
							}
						}).then(res => {
							this.jobDetail.can_apply = res.data.data.can_apply
						}).catch(err => {
							console.log(err);
						})
					}else{
						uni.showModal({
							title:res.data.msg,
							mask:true,
							showCancel:false
						})
					}
				}).catch(err => {
					console.log(err);
				})
				this.$refs['showtip'].close()
			},
            refreJob(item){
                this.$http.post(apiName.GET_JOB_INFO,{
                	params:{
                		token: this.token,
                		job_flag:item.job_flag,
                		reffer_from:''
                	}
                }).then(res => {
                	this.jobDetail = res.data.data
					// uni.pageScrollTo({
					// 	scrollTop: 0,
					// 	duration: 300
					// });
					uni.setStorageSync('isRefreJob', this.oldJobDetail)
					this.addJobId(this.oldJobDetail)
					console.log(this.jobId)
					uni.removeStorageSync('isIndex')
					uni.removeStorageSync('isSearchDetail')
					uni.navigateTo({
						url: '../jobDetail/jobDetail?job_flag=' + this.jobDetail.job_flag
					})
					
                }).catch(err => {
                	console.log(err);
                })
            },
			applyJob(){
				let pages = getCurrentPages();  
				let pageRouterLink = (pages[pages.length - 1]).route; 
				let params = this.pageParams
				let callBackPage = {
					url: `/${pageRouterLink}`,
					params: params
				}
				uni.setStorage({
				    key: 'callBackPage',
				    data: callBackPage,
				});
				if(this.token==''){
					uni.navigateTo({
						url:`../login/login`
					})
					return;
				}
				uni.makePhoneCall({
				    phoneNumber: this.jobDetail.apply_tel_phone //电话报名
				});
			},
			getCollect(){
				let pages = getCurrentPages();
				let pageRouterLink = (pages[pages.length - 1]).route; 
				let params = this.pageParams
				let callBackPage = {
					url: `/${pageRouterLink}`,
					params: params
				}
				uni.setStorage({
				    key: 'callBackPage',
				    data: callBackPage,
				});
				if(this.token==''){
					uni.navigateTo({
						url:"../login/login"
					})
					return;
				}
				if(this.jobDetail.is_fav==0){    //收藏
					this.$http.post(apiName.DO_JOB_FAVOUR,{
						params:{
							token: this.token,
							job_flag: this.job_flag
						}
					}).then(res => {
						if(res.data.success){
							uni.showToast({
								title:'收藏成功！',
								mask:true
								
							})
							this.jobDetail.is_fav =1
						}else{
							uni.showToast({
								title:res.data.msg,
								mask:true
							})
						}
					}).catch(err => {
						console.log(err);
					})
				}else{ //取消收藏
					this.$http.post(apiName.DEL_JOB_FAVOURITE,{
						params:{
							token: this.token,
							job_flag: this.job_flag
						}
					}).then(res => {
						if(res.data.success){
							uni.showToast({
								title:'已取消收藏！',
								mask:true
								
							})
							this.jobDetail.is_fav =0
						}
					}).catch(err => {
						console.log(err);
					})
				}
			},
			openWord(){
				this.isShow = !this.isShow
			},
			navigateMap(){
				let _this = this;
				uni.openLocation({
					latitude: parseFloat(_this.jobDetail.map_y),
					longitude: parseFloat(_this.jobDetail.map_x),
					fail(error) {
						console.log(error)
					}
				});
			},
			back(){
				const isIndex = uni.getStorageSync('isIndex')
				const isSearchDetail = uni.getStorageSync('isSearchDetail')
				const isRefreJob = uni.getStorageSync('isRefreJob')
				const isCompanyDetail = uni.getStorageSync('isCompanyDetail')
				const isIndexTwo = uni.getStorageSync('isIndexTwo')
				const isSearchDetailTwo = uni.getStorageSync('isSearchDetailTwo')
				const isMyCollection = uni.getStorageSync('isMyCollection')
				const isRecord = uni.getStorageSync('isRecord')
				if(isIndex) {
					uni.switchTab({
					    url: '../index/index'
					});
					uni.removeStorageSync('isIndex')
					uni.removeStorageSync('isIndexTwo')
				}else if(isSearchDetail) {
					uni.navigateTo({
						url: '../searchDetail/searchDetail'
					});
					uni.removeStorageSync('isSearchDetail')
					uni.removeStorageSync('isSearchDetailTwo')
				}else if(this.jobId.length != 0) {
					uni.navigateTo({
						url: '../jobDetail/jobDetail?job_flag=' + this.jobId[this.jobId.length-1]
					})
					this.spliceJobId()
					console.log(this.jobId)
					// this.jobId.pop()
					// uni.setStorageSync('isRefreJob', this.oldJobDetail)
					// uni.removeStorageSync('isRefreJob')
				}else if(isCompanyDetail) {
					uni.navigateTo({
						url:"../companyDetail/companyDetail?company_id="+isCompanyDetail
					})
					uni.removeStorageSync('isCompanyDetail')
				}else if(isIndexTwo && !isIndex) {
					uni.switchTab({
					    url: '../index/index'
					});
					uni.removeStorageSync('isIndexTwo')
				}else if(isSearchDetailTwo && !isSearchDetail) {
					uni.navigateTo({
						url: '../searchDetail/searchDetail'
					});
					uni.removeStorageSync('isSearchDetailTwo')
				}else if(isMyCollection) {
					uni.navigateTo({
						url:"../myCollection/myCollection"
					})
					uni.removeStorageSync('isMyCollection')
				}else if(isRecord) {
					uni.navigateTo({
						url:"../record/record"
					})
					uni.removeStorageSync('isRecord')
				}else {
					uni.navigateBack({
					    delta: 1
					});
				}
			},
			companydetail(){
				// console.log('jobdetail->',this.jobDetail.company_id)
				uni.navigateTo({
					url:"../companyDetail/companyDetail?company_id="+this.jobDetail.company_id
				})
				this.set_isCompanyDetailId(this.jobDetail.company_id)
			},
			gotoReport(){
				let _this = this;
				let pages = getCurrentPages();
				let pageRouterLink = (pages[pages.length - 1]).route; 
				let params = _this.pageParams
				let callBackPage = {
					url: `/${pageRouterLink}`,
					params: params
				}
				uni.setStorage({
				    key: 'callBackPage',
				    data: callBackPage,
				});
				if(this.token==''){
					uni.navigateTo({
						url:"../login/login"
					})
					return;
				}
				uni.navigateTo({
					url: "../jobDetail/postReport?job_flag=" + _this.jobDetail.job_flag + "&job_name=" + encodeURIComponent(_this.jobDetail.station) +"&company_id=" + _this.jobDetail.company_id+"&company_name="+encodeURIComponent(_this.jobDetail.company_name)
				})
			},
			sending(){
				let pages = getCurrentPages();
				let pageRouterLink = (pages[pages.length - 1]).route; 
				let params = this.pageParams
				let callBackPage = {
					url: `/${pageRouterLink}`,
					params: params
				}
				uni.setStorage({
				    key: 'callBackPage',
				    data: callBackPage,
				});
				if(this.token==''){
					uni.navigateTo({
						url:"../login/login"
					})
					return;
				}
				if(this.worklength == 0){
					var that = this
					this.$nextTick(() => {
						this.$refs['showtip'].open()
					})
				}else {
					this.$http.post(apiName.APPLY_JOB,{
						params:{
							token: this.token,
							job_flag: this.job_flag,
							apply_type:1   //选填：默认1;报名方式 1主动投递 2电话报名
						}
					}).then(res => {
						if(res.data.success){
							uni.showToast({
								title:res.data.msg,
								mask:true
							})
							this.$http.post(apiName.GET_JOB_INFO,{
								params:{
									token: this.token,
									job_flag: this.job_flag,
									reffer_from:''
								}
							}).then(res => {
								this.jobDetail.can_apply = res.data.data.can_apply
							}).catch(err => {
								console.log(err);
							})
						}else{
							uni.showModal({
								title:res.data.msg,
								mask:true,
								showCancel:false
							})
						}
					}).catch(err => {
						console.log(err);
					})
				}
			},
			distance(la1, lo1, la2, lo2) {
				var La1 = la1 * Math.PI / 180.0;
				var La2 = la2 * Math.PI / 180.0;
				var La3 = La1 - La2;
				var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				s = s.toFixed(2);
				return s;
			},   //计算距离
			gotomore() {
				// console.log(this.jobDetail.reommend_job_list)
// 				for(var i=0;i<this.jobDetail.reommend_job_list.length;i++){
// 					this.reommend_job_flag.push(this.jobDetail.reommend_job_list[i].job_id)
// 				}
                console.log('相似职位id',this.jobsort_id)
                // return
				// let jobFlag = {
				// 	params: this.reommend_job_flag
				// }
				// uni.setStorage({
				//     key: 'jobFlag',
				//     data: jobFlag,
				// });
				this.set_chooseJobList(this.jobsort_id)
				console.log('保存的职位id',this._chooseJobList)
				uni.navigateTo({
					url:"../searchDetail/searchDetail"
				})
			},
			sent() {
				uni.showModal({
					title:'已经投递过该职位',
					mask:true,
					showCancel:false
				})
			},
			checkmore() {
				this.fivehundredtemp = !this.fivehundredtemp
			},
			initData(){
				
			},
		}
	}
</script>

<style scoped src=''>
	@import './css/jobDetail.css';
</style>
