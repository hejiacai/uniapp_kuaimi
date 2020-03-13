<template>
	<view class="resume">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<uni-popup :show="showpopup" :type="type">
			<view class="show_pop_box">
				<view class="xiugai">保存成功</view>
				<view class="queding" @tap="close_pop">确定</view>
			</view>
		</uni-popup>
		<uni-popup :show="change_resume_state_show" :type="type">
			<view class="show_pop_box_t">
				<view class="show_pop_title">提示</view>
				<view class="show_pop_content">隐藏后只有投递的简历才能被企业看到,所有企业将不能搜索到你的简历</view>
				<view class="show_pop_footer">
					<view class="cancel_change" @tap="cancel_resume_state">取消</view>
					<view class="queding" @tap="change_resume_state">确定</view>
				</view>
			</view>
		</uni-popup>
        <view class="popContent"></view>
        <view class="xinxiTop">
            <text class="grxx">个人信息</text>
            <text class="save" @tap="savePerInfo">保存</text>
        </view>
		<view class="psgSeekHeadx">
            <!-- <view class="photo">
            	<image :src="photoImg" mode="" @tap="upPhoto" v-if="photoImg" class="pppppp"></image>
            	<image src="../../../static/img/head.png" mode="" @tap="upPhoto" v-else></image>
            	<view>点击上传头像</view>
            </view> -->
		<view :class="['msg',showCode?'codeMsg':'']">
			<view class="personal_infor">
				<view class="photo">
					<image :src="photoImg" mode="" @tap="upPhoto" v-if="photoImg" class="pppppp"></image>
					<image src="../../../static/img/head.png" mode="" @tap="upPhoto" v-else></image>
					<view>点击上传头像</view>
				</view>
				<!-- 基本信息 -->
				<view class="personalTit jbjlx">
					<text class="jbxx">基本信息</text>
                    <view class="gkjl">
                    	<text class="gongKai">{{switchText}}</text>
                        <view class="icon iconfont icon-gz_home_open" v-if="isChecked" @tap="modi_resume_state" style="color:#fb5958"></view>
                        <view class="icon iconfont icon-gz_home_off" v-else @tap="modi_resume_state" style="color:#ccc"></view>
                    	<!-- <switch :checked="isChecked" color="#20ceb3" @change="modi_resume_state" v-if="isshowOne" class="swtlc_cc" /> -->
                    </view>
				</view>
				<view class="certifi-item">
					<text class="title">姓名</text>
					<view class="input">
						<input type="text" id="txtUserName" placeholder="请输入姓名" placeholder-style="color: #ccc;" v-model="resumeList.user_name" />
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">手机号</text>
					<view class="input">
						<input type="number" @focus="showPhoneCode" maxlength="11" name="txtUserPhone" id="txtUserPhone" v-model="resumeList.mobile_phone" placeholder="请输入手机号" placeholder-style="color: #ccc;" value="" />
                        <view class="icon iconfont icon-morex"></view>
                    </view>
				</view>
				<view class="certifi-item yanzhengma" v-if="showCode">
					<text class="title">验证码</text>
					<view class="input">
						<input type="text" maxlength="4" name="txtCatcha" id="imgCode" v-model="imgCode" placeholder="图形验证码" placeholder-class="placeholderStyle" value="" />
						
					</view>
                    <image :src="codeImage" @tap="getSeed"></image>
				</view>
				<view class="certifi-item huoqucode" v-if="showCode">    
					<view class="seedNum">
						<input type="number" maxlength="6" v-model="verCode" placeholder="请输入验证码" placeholder-class="placeholderStyle" value="" />
						
					</view>
                    <view class="getVerCode" @tap="getVerCode">{{ verText }}</view>
				</view>
				<view class="certifi-item">
					<text class="title">性别</text>
					<!-- <picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{array[index].name}}</view>
					</picker> -->
					<view class="secInput">
						<!-- :value="obj.gender" -->
						<picker @change="pickerChange($event,'gender')" :value="obj.gender" :range="genderList" range-key="name" style="width:100%">
                            <view class="qxz" v-if="showsexPickerViewt">请选择</view>
							<view class="secBox" v-else>{{genderList[obj.gender].name}}</view>
						</picker>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">出生日期</text>
					<view class="secInput">
						<picker style="width:100%" mode="date" :value="resumeList.birthday" :start="startDate" :end="endDate" @change="bindDateChange" class="timePick">
							<view class="secBox" v-if="resumeList.birthday">{{resumeList.birthday}}</view>
                            <view class="qxz" v-else>请选择</view>
						</picker>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">现居地址</text>
					<view class="secInput" @click="goAddress">
						<view class="secBox" v-if="resumeList.cur_area_name">{{ resumeList.cur_area_name }}</view>
                        <view class="qxz" v-else>请选择</view>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">学历</text>
					<view class="secInput">
						<picker style="width:100%" @change="pickerChange($event,'edu')" :value="obj.edu" :range="eduList" range-key="name">
                            <view class="qxz" v-if="eduListPickerViewt">请选择</view>
							<view class="secBox" v-else>{{eduList[obj.edu].name}}</view>
						</picker>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">身高</text>
					<view class="secInput">
						<picker style="width:100%" @change="pickerChange($event,'height')" :value="obj.height" :range="heightList" range-key="value">
                            <view class="qxz" v-if="heightPickerViewt">请选择</view>
							<view class="secBox" v-else>{{heightList[obj.height].value}}</view>
						</picker>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">体重</text>
					<view class="input">
						<input type="text" id="weight" name="weight" placeholder="请输入体重(kg)" placeholder-style="color: #ccc;" v-model="resumeList.weight" />
						<!-- <text class="weight_name">kg</text> -->
					</view>
				</view>
				<!-- 求职意向 -->
				<view class="personalTit borderTop">
					<text class="jiBen">求职意向</text>
				</view>
				<view class="certifi-item">
					<text class="title">工作状态</text>
					<view class="secInput">
						<picker style="width:100%" @change="pickerChange($event,'workStatus')" :value="obj.workStatus" :range="workStatusList" range-key="name">
                            <view class="qxz" v-if="workStatusPickerViewt">请选择</view>
							<view class="secBox" v-else>{{workStatusList[obj.workStatus].name}}</view>
						</picker>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item" v-if="referJob">
					<text class="title">职位类别</text>
					<view class="secInput" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
						<view class="secBox" @click="goJobCategory">
							<view v-if="resumeList.str_expect_jobsorts">{{resumeList.str_expect_jobsorts}}</view>
                            <view class="qxz" v-else>请选择</view>
							<!-- <view v-for="item in jobsortList" :key="item.jobsort" style="display: inline;">{{ item.jobsort_name }}</view> -->
						</view>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">期望薪资</text>
					<view class="secInput">
						<picker style="width:100%" @change="pickerChange($event,'money')" :value="obj.money" :range="moneyList" range-key="name">
                            <view class="qxz" v-if="moneyPickerViewt">请选择</view>
							<view class="secBox" v-else>{{moneyList[obj.money].name}}</view>
						</picker>
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
				<view class="certifi-item">
					<text class="title">期望地点</text>
					<view class="secInput" @click="goExAddress" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
						<view class="secBox" v-if="resumeList.str_expect_areas">{{ resumeList.str_expect_areas }}</view>
                        <view class="qxz" v-else>请选择</view>
						<!-- <view class="secBox">{{ expectPlace }}</view> -->
						<view class="icon iconfont icon-morex"></view>
					</view>
				</view>
            </view>
        </view>
        </view>
				<!-- 证书 -->
                <view :class="['certificBox',showCode?'codecertificBox':'']">
                	
                
				<view class="personalTit borderTop">
					<text class="jiBen">证书</text>
				</view>
				<view class="certificateList">
					<view>
						<block v-for="(item,index) in certificateList" :key="item.id">
							<view class="exContent" @tap="modiCer(item)">
                                <view>{{ item.gain_time }}/{{ item.certificate_name }}</view>
                                <view class="icon iconfont icon-morex"></view>
                            </view>
						</block>
					</view>
				</view>
				<view class="addCertificate" @click="addCertificate">
					<view class="icon iconfont icon-resume_add"></view>
					<view class="addContent">添加证书</view>
				</view>
                </view>
                <view class="workBox">
                	
                
				<!-- 工作经历 -->
				<view class="personalTit borderTop">
					<text class="jiBen">工作经历</text>
                    <!-- <view class="icon iconfont icon-morex"></view> -->
				</view>
				<view class="workExperience">
					<view class="workList" v-for="(item2,index2) in workExp" @tap="ediWorkxp(item2)">
						<view class="workTime">{{item2.start_time}}~{{item2.end_time==getnowDate()?'至今':item2.end_time}}</view>
						<view class="workName">
                            <view>{{item2.station}}/{{item2.company_name}}</view>
                            <view class="icon iconfont icon-morex"></view>
                        </view>
						<view class="workDis">{{item2.workExpDescribe}}</view>
						<!-- <view class="icon iconfont iconjob_reward_morex i"></view> -->
					</view>
				</view>
                
				<view class="addCertificate" @click="addWorkexp">
					<view class="icon iconfont icon-resume_add"></view>
					<view class="addContent">添加工作经历</view>
				</view>
                </view>
                <view class="footBottonm">
                	
                </view>
        
	</view>
	
</template>

<script>
// import apiName from './../../static/commonjs/request/apiName.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import apiName from '../../../static/commonjs/request/apiName.js'
import {
		mapState,
		mapMutations
	} from 'vuex';
import {objectToUrlParams} from '../../../static/commonjs/utils/index.js'
function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}

export default {
	components: {
		uniPopup
	},
	data() {
		return {
            switchText:'简历已公开',
            photoName:'',
            moneyPickerViewt:true,
            workStatusPickerViewt:true,
            heightPickerViewt:true,
            eduListPickerViewt:true,
            showsexPickerViewt:true,
            hideNowlive:true,
			isshowOne:true,
			isChecked:'',
			change_resume_state_show:false,
			photoImg:'',
			workExp:'',
			showCode:false,
			content:'修改成功',
			showpopup:false,
			type:'center',
			curPlace:'',
			showjobsortList:'',
			referJob:true,
			resumeWeight:'',
			txtUserName:'',
			txtUserPhone: '',
			imgCode: '',
			verCode: '',
			codeImage: '',
			seed: '',
			cdtime:60,
			verText: '获取验证码',
			vartextArr: ['获取验证码','秒后可重新获取','重新获取验证码'],
			sendVerStatus: 0,//发送验证码状态 0 获取验证码 1 60秒后可重新获取 2 重新获取验证码
			genderList: [{id:'1',name:'男'},{id:'2',name: '女'}],
			eduList: [
				{id:'1',name:'初中'},
				{id:'2',name: '高中'}],
			heightList: [],
			workStatusList: [
				{id:'1',name: '不在职，正在找工作'},
				{id:'2',name: '在职，打算近期换工作'}
				],
			moneyList: [{id:'01',name: '1000及以上'},{id:'02',name: '1500及以上'}],
			obj: {
				gender: 0,
				edu: 0,
				height: 0,
				workStatus: 0,
				money: 0
			},
			date: getDate({
				format: true
			}),
			startDate:getDate('start'),
			endDate:getDate('end'),
			certificateList: [],      //获取证书的返回数组，如没有则为空
			resumeList: {},
			jobsortList: [],
            isfromSeleAddre:false,
            fromSeleAddre:'',
            open_mode:''
		}
	},
	onReady(){
		
	},
	onLoad(options){
         this.is_sync_hb = options.is_sync_hb
        // debugger
        if(options.is_sync_hb=='true'){ 
            uni.showModal({
                    title: '提示',
                    content: '为了方便，已帮你将汇博的账号及简历信息同步到快米工作，现在去投递吧~',
                    showCancel:false,
                    confirmColor:'#fb5958',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        } 
                    }
                });
            }
//             if(options.fromSeleAddre){
//                 this.isfromSeleAddre = true
//             }
//             
		// console.log('aaaaaaaaaaaaaaaa',this.jobCategory)
		// console.log('bbbbbbbbbbbbbbbb',this.jobsortList)
		// if(this.jobCategory&&this.jobCategory.length>0){
		// 	let aa = Object.assign([],this.jobCategory)
		// 	console.log(aa)
		// 	aa = this.jobsortList
		// 	this.jobsortList = JSON.parse(JSON.stringify(this.jobsortList))
		// 	console.log('现在的职位',this.jobsortList)
		// }
		// let requestArr = []
		// Promise.all(requestArr).then(resArr=>{
			
		// })
// 		this.getSeed()
// 		this.bodyHigh()
		// this.$http.get(apiName.RESUME_INFO,{
		// 	params: {
		// 		token: this.token,
		// 		is_sync_hb: 0
		// 	}
		// }).then(res=> {
		// 	if(res.data.success){
		// 		this.resumeList=res.data.data
		// 		console.log('请求简历成功',this.resumeList)
		// 		this.txtUserName=this.resumeList.user_name   //姓名
		// 		this.txtUserPhone=this.resumeList.mobile_phone   //电话
		// 		this.obj.gender=this.resumeList.sex-1   //性别
		// 		for(var i=0;i<this.eduList.length;i++){
		// 			if(this.eduList[i].value===this.resumeList.degree){
		// 				this.obj.edu=i
		// 			}
		// 		}   //学历
		// 		for(var i=0;i<this.moneyList.length;i++){
		// 			if(this.moneyList[i].value===this.resumeList.salary){
		// 				this.obj.money=i
		// 			}
		// 		}   //薪资
		// 		for(var i=0;i<this.workStatusList.length;i++){
		// 			if(this.workStatusList[i].value===this.resumeList.job_state){
		// 				this.obj.workStatus=i
		// 			}
		// 		}   //工作状态
		// 		this.resumeWeight=this.resumeList.weight   //体重
		// 		for(var i=0;i<this.heightList.length;i++){
		// 			if(this.heightList[i].value===this.resumeList.stature+'cm'){
		// 				this.obj.height=i
		// 			}
		// 		}   //身高
		// 		this.date=this.resumeList.birthday   //出生日期
		// 		this.certificateList=this.resumeList.certificate_list   //证书
		// 		// for(var i=0;i<this.resumeList.expect_jobsort.length-1;i++){
		// 		// 	this.resumeList.expect_jobsort[i].jobsort_name=this.resumeList.expect_jobsort[i].jobsort_name+','
		// 		// }
		// 		// console.log('llllllllllll',this.resumeList.expect_jobsort)
		// 		let aa = []
		// 		res.data.data.expect_jobsort.forEach(item=>{
					
		// 			aa.push(item.jobsort_name)
		// 		})
		// 		this.showjobsortList =aa.join()
		// 		this.jobsortList=this.resumeList.expect_jobsort   //职位类别
		// 		// console.log('eeeeeeeeeeeee',this.jobsortList)
		// 	}else {
		// 		console.log('请求简历失败')
		// 	}
		// }).catch(err=>{
		// 	throw err
		// })
	},
    created(){
        this.initData()
        let register_info_is_sync_hbinfo = uni.getStorageSync('register_info_is_sync_hbinfo');
        if(register_info_is_sync_hbinfo){
            uni.showModal({
                    title: '提示',
                    content: '为了方便，已帮你将汇博的账号及简历信息同步到快米工作，现在去投递吧~',
                    showCancel:false,
                    confirmColor:'#fb5958',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        } 
                    }
            });
        }
//         this.getMore()
//         this.get_salary()
//         this.getSeed()
//         this.bodyHigh()
//         this.$nextTick(()=>{
//             this.get_resume_info()
//         })
    },
    mounted(){
//        this.getMore()
//        this.get_salary()
//        this.getSeed()
//        this.bodyHigh()
//        this.$nextTick(()=>{
//            this.get_resume_info()
//        })
    },
	onShow() {
		if(!this.token){
			uni.reLaunch({
			    url: '../../login/login'
			})
		}
        this.showCode = false
        let fromSeleAddre = uni.getStorageSync('fromSeleAddre');
        this.fromSeleAddre = fromSeleAddre
        // let fromSeleAddre = res.keys.fromSeleAddre
        console.log('缓存的key值',fromSeleAddre)
        if(fromSeleAddre){
             this.getMore()
            this.get_salary()
            this.getSeed()
            this.bodyHigh()
            this.$nextTick(()=>{
            this.save_resume_info()
             })
             console.log('缓存的数据')
        }else{
            console.log('初始化数据')
           this.initData()
        }
         uni.removeStorageSync('fromSeleAddre');
//         this.getMore()
//         this.get_salary()
//         this.getSeed()
//         this.bodyHigh()
//         setTimeout(()=>{
//             this.get_resume_info()
//         },500)
		// this.$http.get(apiName.RESUME_INFO,{
		// 	params: {
		// 		token: this.token,
		// 		is_sync_hb: 0
		// 	}
		// }).then(res=> {
		// 	if(res.data.success){
		// 		this.resumeList=res.data.data
		// 		console.log('请求简历成功',this.resumeList)
		// 		this.txtUserName=this.resumeList.user_name   //姓名
		// 		this.txtUserPhone=this.resumeList.mobile_phone   //电话
		// 		this.obj.gender=this.resumeList.sex-1   //性别
		// 		for(var i=0;i<this.eduList.length;i++){ //学历
		// 			if(this.eduList[i].name===this.resumeList.degree){
		// 				this.obj.edu=i
		// 			}
		// 		}  
		// 		for(var i=0;i<this.moneyList.length;i++){
		// 			if(this.moneyList[i].id===this.resumeList.exp_salary){
		// 				this.obj.money=i
		// 			}
		// 		}   //薪资
		// 		for(var i=0;i<this.workStatusList.length;i++){//工作状态
		// 			if(this.workStatusList[i].name===this.resumeList.job_state){
		// 				this.obj.workStatus=i
		// 			}
		// 		}   
		// 		this.resumeWeight=this.resumeList.weight + 'kg'   //体重
		// 		for(var i=0;i<this.heightList.length;i++){
		// 			if(this.heightList[i].value===this.resumeList.stature+'cm'){
		// 				this.obj.height=i
		// 			}
		// 		}   //身高
		// 		this.date=this.resumeList.birthday   //出生日期
		// 		this.certificateList=this.resumeList.certificate_list   //证书
		// 		// for(var i=0;i<this.resumeList.expect_jobsort.length-1;i++){
		// 		// 	this.resumeList.expect_jobsort[i].jobsort_name=this.resumeList.expect_jobsort[i].jobsort_name+','
		// 		// }
		// 		// console.log('llllllllllll',this.resumeList.expect_jobsort)
		// 		if(this.jobCategory&&this.jobCategory.length>0){//职位类别
		// 			this.jobsortList = []
		// 			let aa = []
		// 			let bb = []
		// 			this.jobCategory.forEach(item=>{
		// 				aa.push(item.jobsort_name)
		// 				bb.push(item.jobsort)
		// 				this.jobsortList.push(item)
		// 			})
		// 			this.resumeList.str_expect_jobsorts = aa.join()
		// 			this.resumeList.expect_jobsort_ids = bb.join()
		// 			console.log('修改后的职位',this.showjobsortList)
		// 		}else{
		// 			// let aa = []
		// 			// res.data.data.expect_jobsort.forEach(item=>{
						
		// 			// 	aa.push(item.jobsort_name)
		// 			// })
		// 			// this.showjobsortList =aa.join()
		// 			this.jobsortList=this.resumeList.expect_jobsort   
		// 		}
		// 		if(this.presentAddress&&this.presentAddress.length>0){//城市
		// 			// this.resumeList.expect_areas
		// 			let aa = []
		// 			let bb = []
		// 			this.presentAddress.forEach(item=>{
		// 				aa.push(item.name)
		// 				bb.push(item.value)
		// 			})
		// 			this.resumeList.str_expect_areas = aa.join()
		// 			this.resumeList.expect_area_ids = bb.join()
		// 			console.log('修改后的地址',this.resumeList.str_expect_areas)
		// 		}
		// 		if(this.newLiveAddress&&this.newLiveAddress.length>0){
		// 			this.resumeList.cur_area_id = this.newLiveAddress[0].value
		// 			this.resumeList.cur_area_name = this.newLiveAddress[0].name
		// 		}
		// 	}else {
		// 		console.log('请求简历失败')
		// 	}
		// }).catch(err=>{
		// 	throw err
		// })
		// alert(this.token)
		
		// console.log('aaaaaaaaaaaaaaaa',_this.jobCategory)
		// console.log('bbbbbbbbbbbbbbbb',_this.jobsortList)
		// if(this.jobCategory&&this.jobCategory.length>0){
		// 	this.jobsortList = []
		// 	let aa = []
		// 	this.jobCategory.forEach(item=>{
		// 		aa.push(item.jobsort_name)
		// 		this.jobsortList.push(item)
		// 	})
		// 	this.showjobsortList = aa.join()
		// 	console.log('修改后的职位',this.showjobsortList)
		// }
		// this.init()
		
		// console.log('修改后的地址',this.presentAddress)
		// if(this.presentAddress){
		// 	// this.resumeList.expect_areas
		// 	let aa = []
		// 	this.presentAddress.forEach(item=>{
		// 		aa.push(item.name)
		// 	})
		// 	this.resumeList.str_expect_areas = aa.join()
		// }
		// console.log('修改后的地址',this.resumeList.str_expect_areas)
		// if(!this.presentAddress==''){
		// 	this.resumeList.cur_area_name=this.presentAddress
		// }
		// if(this.jobCategory.length!=0){
		// 	this.resumeList.expect_jobsort=this.jobCategory
		// 	this.jobsortList=this.resumeList.expect_jobsort
		// }
	},
	computed: {
		...mapState(['token','presentAddress','jobCategory','newLiveAddress','ediresumeList','changejobCategory'])
	},
	methods: {
		...mapMutations(['saveEdiResumeList','set_isSearchDetail']),
		showPhoneCode(){
			this.showCode = true
		},
        initData(){
            this.getMore()
            this.get_salary()
            this.getSeed()
            this.bodyHigh()
            this.$nextTick(()=>{
                this.get_resume_info()
            })
        },
        getnowDate(type) {
                        const date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
        //                 if (type === 'start') {
        //                     year = year - 60;
        //                 } else if (type === 'end') {
        //                     year = year + 2;
        //                 }
                        month = month > 9 ? month : '0' + month;;
                        day = day > 9 ? day : '0' + day;
                        return `${year}-${month}-${day}`;
        },
		cancel_resume_state(){
			// this.$nextTick(function(){
				this.isshowOne = false
				this.isChecked = ''
				// debugger
				this.isChecked = true
				this.isshowOne = true
				this.resumeList.open_mode = '1'
				this.change_resume_state_show = false
				console.log('状态',this.isChecked)
			// })
		},
		change_resume_state(){
			this.isChecked = ''
			this.isChecked = false,
			this.change_resume_state_show = false
			this.resumeList.open_mode = '0'
			console.log('简历状态',this.resumeList.open_mode)
		},
		modi_resume_state(e){
			console.log(e.target.value)
            var _this = this
			if(_this.resumeList.open_mode=='1'){
				// this.change_resume_state_show = true
                 uni.showModal({
                    title: '提示',
                    content: '隐藏后只有投递的简历才能被企业看到,所有企业将不能搜索到你的简历',
                    // showCancel:false,
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                           _this.isChecked = ''
                           _this.isChecked = false,
                           // this.change_resume_state_show = false
                           _this.resumeList.open_mode = '0'
                           _this.switchText = '简历已隐藏'
                           _this.openResume()
                           console.log('隐藏了啊')
                           console.log('简历状态',_this.resumeList.open_mode)
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                            _this.isshowOne = false
                            _this.isChecked = ''
                            // debugger
                            _this.isChecked = true
                            _this.isshowOne = true
                            _this.resumeList.open_mode = '1'
                            _this.switchText = '简历已公开'
                            _this.openResume()
                            // this.change_resume_state_show = false
                        }
                    }
                });
			}else{
				_this.isChecked = ''
				_this.isChecked = true,
				_this.resumeList.open_mode = '1'
                this.switchText = '简历已公开'
                setTimeout(()=>{
                    _this.openResume()
                },500)
				console.log('简历状态',_this.resumeList.open_mode)
			}
		},
		upload() {
            // console.log(GlobalV.BASE_HOST)
			let _self = this;
            let BASE_HOST = _self.$GlobalV.BASE_HOST
			// let tempFilePaths = []
			uni.chooseImage({
				count: 1,
				// count: this.imageLength - this.imageList.length,
				// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// sourceType: ['album'], //从相册选择
				success: function(res) {
					console.log('上传的图片', res)
					let timer = new Date() - 0
					const url = BASE_HOST + '/index?ver=v1.0&apiname=photo_up&token=' + _self.token + '&FILE:' + res.tempFilePaths[
						0] + '&t=' + timer
					const tempFilePaths = res.tempFilePaths;
					console.log('上传的图片', _self.tempFile)
					const uploadTask = uni.uploadFile({
						// header:{
						//  'Authorization': _self.token,
						//  'content-type':'multipart/form-data'
						//  },
						url: url, //PHOTO_UP
						filePath: tempFilePaths[0],
						name: 'file',
						// fileType:'',
						// formData: {
						//  token:_self.token,
						//  voucher:voucher
						// },
						success: function(uploadFileRes) {
							let data = JSON.parse(uploadFileRes.data)
                            _self.photoName = data.data.name
							_self.photoImg = data.data.url
							console.log('返回的图片地址', _self.photoImg)
							uni.showToast({
								title: '上传成功'
							})
						}
					});
				},
			})
		
		},
		// upload(){
		//    // _self = this;
		//    uni.chooseImage({
		// 	   count:1,
		// 	// count: this.imageLength - this.imageList.length,
		// 	// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		// 	// sourceType: ['album'], //从相册选择
		// 	success: function (res) {
		// 			// this.imageList = this.imageList.concat(res.tempFilePaths);
		// 			console.log('上传的图片',res.tempFilePaths)
		// 			var voucher = JSON.stringify(res.tempFilePaths);
		// 			 const tempFilePaths = res.tempFilePaths;
		// 			 // const uploadTask = uni.uploadFile({
		// 			 //  url :'' ,
		// 			 //  filePath: tempFilePaths[0],
		// 			 //  name: 'file',
		// 			 //  formData: {
		// 			 //   // 'user': 'test',
		// 			 //   token:token,
		// 			 //   voucher:voucher
		// 			 //  },
		// 			 //  success: function (uploadFileRes) {
		// 				//   console.log(uploadFileRes)
		// 			 //   uni.showToast({
		// 				// title:'上传成功'
		// 			 //   })
		// 			 //  }
		// 			 // });
		// 		},
		// 	})
		// },
		upPhoto(){
			this.upload()
		},
		close_pop(){
			this.showpopup = false
			this.get_resume_info()
		},
        save_resume_info(){
            
                                this.showCode = false
                                this.resumeList = this.ediresumeList
            					// this.resumeList=res.data.data
            					// console.log('请求简历成功',res.data.data)
//             					if(this.ediresumeList){
//             						// console.log('现在的所有数据',this.ediresumeList)
//             						this.resumeList = ''
//             						this.resumeList = this.ediresumeList
//             					}else{
//             						this.resumeList = res.data.data
//                                     if(res.data.data.cur_area_name){
//                                         this.hideNowlive = false
//                                     }
//             					}
                                if(this.resumeList.cur_area_name){
                                    this.hideNowlive = false
                                }
            					if(this.resumeList.open_mode=='1'){
            						this.isChecked = true
                                    this.switchText = '简历已公开'
            					}else{
            						this.isChecked = false
                                    this.switchText = '简历已隐藏'
            					}
            					this.txtUserName=this.resumeList.user_name   //姓名
            					 this.photoImg = this.resumeList.photo //头像
            					this.txtUserPhone=this.resumeList.mobile_phone   //电话
                                if(this.resumeList.hasOwnProperty('sex')&&this.resumeList.sex){
                                    this.showsexPickerViewt = false
                                    this.obj.gender=this.resumeList.sex-1   //性别
                                }
            					for(var i=0;i<this.eduList.length;i++){ //学历
            						if(this.eduList[i].id===this.resumeList.max_degree_id){
                                        this.eduListPickerViewt = false
                                        console.log('是否隐藏学历')
            							this.obj.edu=i
            						}
            					}  
            					for(var i=0;i<this.moneyList.length;i++){//薪资
            						if(this.moneyList[i].id===this.resumeList.exp_salary){
                                        this.moneyPickerViewt = false
            							this.obj.money=i
            						}
            					}   
            					for(var i=0;i<this.workStatusList.length;i++){//工作状态
            						if(this.workStatusList[i].id==this.resumeList.job_state_id){
                                        this.workStatusPickerViewt =false
            							this.obj.workStatus=i
            						}
            					}   
            					// this.resumeWeight=this.resumeList.weight   //体重
            					for(var i=0;i<this.heightList.length;i++){ //身高
            						if(this.heightList[i].value.indexOf(this.resumeList.stature)!==-1){
                                        this.heightPickerViewt = false
            							this.obj.height=i
            						}
            					}   //身高
            					// this.date=this.resumeList.birthday   //出生日期
            					this.certificateList= this.resumeList.certificate_list   //证书
            					this.workExp = this.resumeList.work_data
            					// for(var i=0;i<this.resumeList.expect_jobsort.length-1;i++){
            					// 	this.resumeList.expect_jobsort[i].jobsort_name=this.resumeList.expect_jobsort[i].jobsort_name+','
            					// }
            					// console.log('llllllllllll',this.resumeList.expect_jobsort)
            					if(this.changejobCategory&&this.changejobCategory.length>0){//职位类别
                                console.log('职位类别有缓存')
                                console.log(this.changejobCategory)
                                    this.jobsortList = []
                                    // if(this.changejobCategory.length>0){
                                        let aa = []
                                        let bb = []
                                        this.changejobCategory.forEach(item=>{
                                        	aa.push(item.jobsort_name)
                                        	bb.push(item.jobsort)
                                        	this.jobsortList.push(item)
                                        })
                                        this.resumeList.str_expect_jobsorts = aa.join()
                                        this.resumeList.expect_jobsort_ids = bb.join()
            					}
//                                 else{
//                                     let aa = []
//                                     let bb = []
//                                     this.resumeList.expect_jobsort.forEach(item=>{
//                                     	aa.push(item.jobsort_name)
//                                     	bb.push(item.jobsort)
//                                     	this.jobsortList.push(item)
//                                     })
//                                     this.resumeList.str_expect_jobsorts = aa.join()
//                                     this.resumeList.expect_jobsort_ids = bb.join()   
//             					}
            					if(this.presentAddress&&this.presentAddress.length>0){//城市
            						// this.resumeList.expect_areas
            						let aa = []
            						let bb = []
            						this.presentAddress.forEach(item=>{
            							aa.push(item.name)
            							bb.push(item.value)
            						})
            						this.resumeList.str_expect_areas = aa.join()
            						this.resumeList.expect_area_ids = bb.join()
            						console.log('修改后的地址',this.resumeList.str_expect_areas)
            					}
            					if(this.newLiveAddress&&this.newLiveAddress.length>0){
            						this.resumeList.cur_area_id = this.newLiveAddress[0].value
            						this.resumeList.cur_area_name = this.newLiveAddress[0].name
            					}
            				// }
//                             else {
//             					console.log('请求简历失败')
//             				}
//             			}).catch(err=>{
//             				throw err
//             			})
        },
		get_resume_info(){
			this.$http.get(apiName.RESUME_INFO,{
				params: {
					token: this.token,
					is_sync_hb: 0,
                    t:new Date() - 0,
				}
			}).then(res=> {
				if(res.data.success){
                    this.showCode = false
					// this.resumeList=res.data.data
					// console.log('请求简历成功',res.data.data)
// 					if(this.ediresumeList){
// 						// console.log('现在的所有数据',this.ediresumeList)
// 						this.resumeList = ''
// 						this.resumeList = this.ediresumeList
// 					}else{
// 						this.resumeList = res.data.data
//                         if(res.data.data.cur_area_name){
//                             this.hideNowlive = false
//                         }
// 					}
                    this.resumeList = res.data.data
                    if(res.data.data.cur_area_name){
                        this.hideNowlive = false
                    }
					if(this.resumeList.open_mode=='1'){
						this.isChecked = true
                        this.switchText = '简历已公开'
					}else{
						this.isChecked = false
                        this.switchText = '简历已隐藏'
					}
					this.txtUserName=this.resumeList.user_name   //姓名
					 this.photoImg = this.resumeList.photo //头像
					this.txtUserPhone=this.resumeList.mobile_phone   //电话
                    if(this.resumeList.hasOwnProperty('sex')&&this.resumeList.sex){
                        this.showsexPickerViewt = false
                        this.obj.gender=this.resumeList.sex-1   //性别
                    }
					for(var i=0;i<this.eduList.length;i++){ //学历
						if(this.eduList[i].id===this.resumeList.max_degree_id){
                            this.eduListPickerViewt = false
                            console.log('是否隐藏学历')
							this.obj.edu=i
						}
					}  
					for(var i=0;i<this.moneyList.length;i++){//薪资
						if(this.moneyList[i].id===this.resumeList.exp_salary){
                            this.moneyPickerViewt = false
							this.obj.money=i
						}
					}   
					for(var i=0;i<this.workStatusList.length;i++){//工作状态
						if(this.workStatusList[i].id==this.resumeList.job_state_id){
                            this.workStatusPickerViewt =false
							this.obj.workStatus=i
						}
					}   
					// this.resumeWeight=this.resumeList.weight   //体重
					for(var i=0;i<this.heightList.length;i++){ //身高
						if(this.heightList[i].value.indexOf(this.resumeList.stature)!==-1){
                            this.heightPickerViewt = false
							this.obj.height=i
						}
					}   //身高
					// this.date=this.resumeList.birthday   //出生日期
					this.certificateList= res.data.data.certificate_list   //证书
					this.workExp = res.data.data.work_data
					// for(var i=0;i<this.resumeList.expect_jobsort.length-1;i++){
					// 	this.resumeList.expect_jobsort[i].jobsort_name=this.resumeList.expect_jobsort[i].jobsort_name+','
					// }
					// console.log('llllllllllll',this.resumeList.expect_jobsort)
// 					if(this.changejobCategory&&this.changejobCategory.length>0){//职位类别
//                     console.log('职位类别有缓存')
//                     console.log(this.changejobCategory)
//                         this.jobsortList = []
//                         // if(this.changejobCategory.length>0){
//                             let aa = []
//                             let bb = []
//                             this.changejobCategory.forEach(item=>{
//                             	aa.push(item.jobsort_name)
//                             	bb.push(item.jobsort)
//                             	this.jobsortList.push(item)
//                             })
//                             this.resumeList.str_expect_jobsorts = aa.join()
//                             this.resumeList.expect_jobsort_ids = bb.join()
// 					}else{
                        let aa = []
                        let bb = []
                        // jobsort
                        // jobsort_name
                        res.data.data.expect_jobsort.forEach(item=>{
                        	aa.push(item.jobsort_name)
                        	bb.push(item.jobsort)
//                             this.jobsortList.forEach(item2=>{
//                                 if(item2.jobsort==item.jobsort){
//                                     console.log('qq')
//                                 }else{
//                                     this.jobsortList.push(item)
//                                 }
//                             })
                        })
                         this.jobsortList = []
                         this.jobsortList = res.data.data.expect_jobsort
                        console.log('初始化期望职位',this.jobsortList)
                        this.resumeList.str_expect_jobsorts = aa.join()
                        this.resumeList.expect_jobsort_ids = bb.join()
						// this.jobsortList=this.resumeList.expect_jobsort   
					// }
// 					if(this.presentAddress&&this.presentAddress.length>0){//城市
// 						// this.resumeList.expect_areas
// 						let aa = []
// 						let bb = []
// 						this.presentAddress.forEach(item=>{
// 							aa.push(item.name)
// 							bb.push(item.value)
// 						})
// 						this.resumeList.str_expect_areas = aa.join()
// 						this.resumeList.expect_area_ids = bb.join()
// 						console.log('修改后的地址',this.resumeList.str_expect_areas)
// 					}
// 					if(this.newLiveAddress&&this.newLiveAddress.length>0){
// 						this.resumeList.cur_area_id = this.newLiveAddress[0].value
// 						this.resumeList.cur_area_name = this.newLiveAddress[0].name
// 					}
				}else {
					console.log('请求简历失败')
				}
			}).catch(err=>{
				throw err
			})
		},
		get_salary(){
			this.$http.post(apiName.SALARY_COMMON,{}).then(res=>{
				if(res.data.success){
					// console.log('期望薪资',res.data)
					this.moneyList = res.data.data.salarys
				}
			}).catch(error=>{
				console.log(error)
			})
		},
		getMore(){
			this.$http.post(apiName.MORE_COMMON,{}).then(res=>{
				if(res.data.success){
					// console.log(res.data)
					// console.log('请求数组字典成功')
					this.genderList = res.data.data.sexs_list
					this.eduList = res.data.data.degree
					this.workStatusList = res.data.data.job_status
					// let aa = Object.assign(res.data.data.sexs)
					// let bb = []
					// Object.keys(aa).forEach(item=>{
					// 	let cc = {}
					// 	cc[item] = aa[item]
					// 	bb.push(cc)
					// })
					// this.genderList = bb
					// console.log('处理过的数组',bb)
				}
			}).catch(error=>{
				console.log(error)
			})
		},
		ediWorkxp(obj){
			this.saveEdiResumeList(this.resumeList)
			var params= {
				mode: 'edit',
				...obj
			}
			params=JSON.stringify(params)
			uni.navigateTo({
			    url: `./workexp/workexp?params=${params}`
			})
		},
        openResume(){
            this.$http.post(apiName.RESUMALTER,{
            	params: {
            		token: this.token,
            		txtExpectAreaPut:this.resumeList.expect_area_ids,//期望地区
            		txtExpectPostPut:this.resumeList.expect_jobsort_ids,//期望职位
            		authCode:this.verCode?this.verCode:'',//短信验证码
            		txtUserName:this.resumeList.user_name,//姓名
            		txtGenderPut:this.resumeList.sex,//性别
            		txtBirthdayPut:this.resumeList.birthday,//生日
            		txtEducationPut:this.resumeList.max_degree_id,//学历
            		txtUserPhone:this.resumeList.mobile_phone,//手机号
            		txtWorkStatePut:this.resumeList.job_state_id?this.resumeList.job_state_id:'',//求职状态
            		curPlace:this.resumeList.cur_area_id,//现居住地
            		stature:this.resumeList.stature,//身高
            		weight:this.resumeList.weight,//体重
            		photo:this.photoName?this.photoName:this.resumeList.photo_base,//头像
            		txthidSalaryPut:this.resumeList.exp_salary,//薪资
                    open_mode:this.resumeList.open_mode
            	}
            }).then(res=>{
                if(res.data.success){
                    console.log('成功')
                }else{
					this.$KM.showToast(res.data.msg)
				}
            })
        },
		savePerInfo(){
			// this.showpopup = true
            const callBackPage = uni.getStorageSync('callBackPage')
            
			this.$http.post(apiName.RESUMALTER,{
				params: {
					token: this.token,
					txtExpectAreaPut:this.resumeList.expect_area_ids,//期望地区
					txtExpectPostPut:this.resumeList.expect_jobsort_ids,//期望职位
					authCode:this.verCode?this.verCode:'',//短信验证码
					txtUserName:this.resumeList.user_name,//姓名
					txtGenderPut:this.resumeList.sex,//性别
					txtBirthdayPut:this.resumeList.birthday,//生日
					txtEducationPut:this.resumeList.max_degree_id,//学历
					txtUserPhone:this.resumeList.mobile_phone,//手机号
					txtWorkStatePut:this.resumeList.job_state_id?this.resumeList.job_state_id:'',//求职状态
					curPlace:this.resumeList.cur_area_id,//现居住地
					stature:this.resumeList.stature,//身高
					weight:this.resumeList.weight,//体重
					photo:this.photoName?this.photoName:this.resumeList.photo_base,//头像
					txthidSalaryPut:this.resumeList.exp_salary,//薪资
                    open_mode:this.resumeList.open_mode
				}
			}).then(res=>{
				if(res.data.success){
					// this.showpopup = true
					let that = this
					console.log('ggggggg',res.data)
					that.get_resume_info()
                    uni.showModal({
                        // title: '提示',
                        content: '保存成功',
                        showCancel:false,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定');
								if(callBackPage) {
									let params = objectToUrlParams(callBackPage.params)
									uni.navigateTo({
										url: callBackPage.url+params
									})
								}
								uni.removeStorageSync('callBackPage');
								that.set_isSearchDetail(3)
                            } else if (res.cancel) {
                                console.log('用户点击取消');
                            }
                        }
                    });
				}else{
					this.$KM.showToast(res.data.msg)
				}
			})
		},
		goAddress() {
			this.saveEdiResumeList(this.resumeList)
			let aa = []
			let bb = {}
			if(this.fromSeleAddre){
				aa = this.newLiveAddress
			}else{
                if(this.resumeList.cur_area_name&&this.resumeList.cur_area_id){
                  bb.name = this.resumeList.cur_area_name
                  bb.value = this.resumeList.cur_area_id
                  aa.push(bb)  
                }
			}
//             if(this.fromSeleAddre){
//                 aa = this.presentAddress
//             }else{
//                 aa = this.resumeList.expect_areas
//             }
			let params = {
				type:'nowLive',
				plac:aa
			}
			params = JSON.stringify(params)
			uni.navigateTo({
				url: `./presentAddress/presentAddress?params=${params}`
			})
		},
		goExAddress() {
			this.saveEdiResumeList(this.resumeList)
			// var params= {
			// 	str_expect_areas: this.resumeList.str_expect_areas,
			// 	expect_area_ids: this.resumeList.expect_area_ids,
			// 	mode: 'exPlace'
			// }
			// console.log(this.resumeList)
			// return
			let aa = []
// 			if(this.presentAddress){
// 				aa = this.presentAddress
// 			}else{
// 				aa = this.resumeList.expect_areas
// 			}
            if(this.fromSeleAddre){
                aa = this.presentAddress
            }else{
                aa = this.resumeList.expect_areas
            }
			let params = {
				type:'expec_areas',
				plac:aa
			}
			params=JSON.stringify(params)
			uni.navigateTo({
				url: `./presentAddress/presentAddress?params=${params}`
			})
		},
		goJobCategory() {
			this.saveEdiResumeList(this.resumeList)
			// console.log('--------->',this.resumeList)
			// return
			// for(var i=0;i<this.resumeList.expect_jobsort.length-1;i++){
			// 	this.resumeList.expect_jobsort[i].jobsort_name=this.resumeList.expect_jobsort[i].jobsort_name.replace(',','')
			// }
			let params= {
				expect_jobsort: this.jobsortList
			}
			console.log('这边的职位点点大',this.jobsortList)
			// return
			params=JSON.stringify(params)
			uni.navigateTo({
				url: `./jobCategory/jobCategory?params=${params}`
			})
		},
		pickerChange: function(e,val) {
			console.log('获取的值',e)
			console.log('获取的类型',val)
			let idx = e.detail.value
			this.obj[val] = e.target.value
			switch(val){
				case 'gender':
                this.showsexPickerViewt = false
					this.genderList.forEach((item,index)=>{
						if(idx==index){
							this.resumeList.sex = idx + 1
							console.log('性别的code',this.resumeList.sex)
						}
					})
					break
				case 'edu':
                    this.eduListPickerViewt = false
					this.eduList.forEach((item,index)=>{
						if(idx==index){
							this.resumeList.max_degree_id = item.id
							console.log('学历',this.resumeList.max_degree_id)
						}
					})
					break
				case 'money':
                    this.moneyPickerViewt = false
					this.moneyList.forEach((item,index)=>{
						if(idx==index){
							this.resumeList.exp_salary = item.id
							console.log('薪资',this.resumeList.exp_salary)
						}
					})
					break
				case 'workStatus':
                    this.workStatusPickerViewt = false
					this.workStatusList.forEach((item,index)=>{
						if(idx==index){
							this.resumeList.job_state_id = item.id
							console.log('工作状态',this.resumeList.job_state_id)
						}
					})
					break
				case 'height':
                    this.heightPickerViewt = false;
					this.heightList.forEach((item,index)=>{
						if(idx==index){
							this.resumeList.stature = item.value.slice(0,3)
							console.log('选择的身高',this.resumeList.stature)
						}
					})
					break
				default:
					break
			}
		},
		bindDateChange: function(e) {
			this.resumeList.birthday = e.target.value
			// this.date = e.target.value
		},
		getSeed() {
            let BASE_HOST = this.$GlobalV.BASE_HOST
            
			this.$http.get(apiName.GET_SEED+'&=').then(res=>{
                console.log('获取二维码信息')
				if(res.data.code===1){
					this.seed=res.data.data.seed
					this.codeImage= BASE_HOST + '/index?ver=v1.0&apiname=getImgCode&seed='+this.seed
                    console.log('获取的验证码',this.codeImage)
				}
			}).catch(err=>{
				throw err
			})
		},
		getVerCode() {
            let BASE_HOST = this.$GlobalV.BASE_HOST
			if(this.resumeList.mobile_phone===''){
				this.$KM.showToast('请输入手机号')
				return
			}
			if(this.imgCode===''){
				this.$KM.showToast('请输入图形验证码')
				return
			}
            this.$http.post(apiName.SEND_LOG_CODE,{
                params: {
                	mobile_phone: this.resumeList.mobile_phone,
                    imgcode: this.imgCode,
                    hidSeed: this.seed
                }
            }).then(res=>{
                console.log('进来了啊啊啊啊啊啊啊啊')
            	if(res.data.success){
                    this.sendVerStatus=1
                    this.verText = this.cdtime+this.vartextArr[this.sendVerStatus]
                    this.countDown()
                    this.$KM.showToast('发送成功')
                }else {
                    console.log('发送失败')
                    // this.$KM.showToast('wwwwwwwww')
                    this.$KM.showToast(res.data.msg)
                }
            }).catch(err=>{
            	throw err
            })
// 			uni.request({
// 				url: BASE_HOST + '/index?ver=v1.0&apiname=sendLogCode&mobile_phone='+this.resumeList.mobile_phone+'&imgcode='+this.imgCode+'&hidSeed='+this.seed,
// 				method: 'POST',
// 				data: {
// 					"mobile_phone": this.resumeList.mobile_phone,
// 					"imgcode": this.imgCode,
// 					"hidSeed": this.seed
// 				},
// 				success: res=> {
// 					if(res.data.success){
// 						this.sendVerStatus=1
// 						this.verText = this.cdtime+this.vartextArr[this.sendVerStatus]
// 						this.countDown()
// 						this.$KM.showToast('发送成功')
// 					}else {
//                         console.log('发送失败')
// 						// this.$KM.showToast('wwwwwwwww')
// 						this.$KM.showToast(res.data.msg)
// 					}
// 				},
// 				fail: err=> {
//                     console.log('调用验证码接口失败')
// 					throw err
// 				}
// 			})
		},
		//倒计时
		countDown() {
			var _this=this
			var timeId=setInterval(function(){
				if(_this.cdtime>1) {
					_this.cdtime--
					_this.verText = _this.cdtime+_this.vartextArr[_this.sendVerStatus]
				}else {
					clearInterval(timeId)
					_this.cdtime=60
					_this.sendVerStatus = 2
					_this.verText = _this.vartextArr[_this.sendVerStatus]
					_this.getSeed()
				}
			},1000)
		},
		//创建身高的数组
		bodyHigh() {
			var arrs=[]
			var objs=[]
			for(var i=140;i<221;i++){
				var obj={}
				arrs[i]=i+'cm'
				obj.value=arrs[i]
				objs.push(obj)
			}
			this.heightList=objs
			console.log('身高数组',this.heightList)
		},
		addCertificate() {
			this.saveEdiResumeList(this.resumeList)
			var params= {
				mode: 'add'
			}
			params=JSON.stringify(params)
			uni.navigateTo({
			    url: `./certificate/certificate?params=${params}`
			})
		}, 
		modiCer(data) {
			this.saveEdiResumeList(this.resumeList)
			var params= {
				mode: 'edit',
				...data
			}
			params=JSON.stringify(params)
			uni.navigateTo({
			    url: `./certificate/certificate?params=${params}`
			})
		},
		init() {
			// this.saveCertificateList
			this.certificateList=JSON.parse(sessionStorage.getItem('certificateList')) || []
		},
		addWorkexp() {
			this.saveEdiResumeList(this.resumeList)
			var params= {
				mode: 'add'
			}
			params=JSON.stringify(params)
			uni.navigateTo({
			    url: `./workexp/workexp?params=${params}`
			})
			// uni.navigateTo({
			//     url: './workexp/workexp'
			// })
		}
	}
};
</script>

<style lang="scss" scoped>
    .yanzhengma{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right:20rpx;
        box-sizing:border-box;
    }
    .yanzhengma image{width: 160rpx;height: 68rpx;}
    .huoqucode{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .footBottonm{
        width: 100%;
        height: 20rpx;
        background: #f7f7f7;
    }
    .qxz{
//          position: absolute;
//         top: 22rpx;
        font-size: 30rpx;
        color: #ccc;
    }
    .popContent{
        margin-top:var(--status-bar-height);
        background: #fb5958;
        width: 100%;
        height: 80rpx;
    }
    .xinxiTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fb5958;
        // padding: 16rpx 104rpx 16rpx 90rpx;
        box-sizing: border-box;
        padding-left: 90rpx;
        padding-right: 20rpx;
        width: 100%;
        margin: -1px 0;
    }
    .certificBox{
        margin: 0 auto;
        margin-top:1400rpx; 
    width: 92%;
    background: rgb(255, 255, 255);
    border-radius: 8rpx;
    }
    .codecertificBox{
        margin: 0 auto;
            margin-top:1580rpx; 
        width: 92%;
        background: rgb(255, 255, 255);
        border-radius: 8rpx;
    }
    .workBox{
         margin: 0 auto;
         margin-top:4rpx;
        width: 92%;
        background: rgb(255, 255, 255);
        border-radius: 8rpx;
        // margin-bottom: 40rpx;
        box-sizing: border-box;
        // padding-bottom: 20rpx;
    }
//     .certificenter{
//         width: 100%;
//         height: 40rpx;
//     }
    .title:after {
            content: '';
            width: 100%;
            display: inline-block;
        }
    .iconfont{
        font-size: 28rpx;
    }
    .jbxx{
        width: 180rpx!important;
    display: inline-block!important;
    color: #333!important;
    font-size: 30rpx!important;
//     text-align: justify;
//     text-align-last: justify;
    // text-align: left;
    }
    .icon-morex{
        color: #ccc!important;
    }
    .uni-picker-action-confirm{
        color: #fb5958!important;
    }
    .jbjlx{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .gkjl{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .gkjl .swtlc_cc{
        transform:scale(0.6);
    }
    .status_bar {
         height: var(--status-bar-height);
         width: 100%;
    		  position:fixed;
    		  top: 0;
    		  z-index: 9999;
    		  background: #fb5958!important;
     }
     .top_view{
    		  height: var(--status-bar-height);
    		  width: 100%;
    		  position: fixed;
    		  top:0;
    		  z-index: 999;
     }
	.show_pop_box_t{
		height: 344rpx!important;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.show_pop_title{
			font-size: 34rpx;
			    color: #222;
			    padding-top: 40rpx;
			    text-align: center;
		}
		.show_pop_content{
			// display: block;
			box-sizing: border-box;
			    text-align: center;
			    color: #555;
			    font-size: 28rpx;
			    padding: 40rpx 30rpx;
		}
		.show_pop_footer{
			display: flex;
			align-content: center;
			justify-content: space-between;
			border-top:1rpx solid #f1f1f1;
			width: 100%;
			height: 102rpx;
			view{
				width: 50%;
				height: 100%;
				line-height: 102rpx;
				font-size: 34rpx;
			}
			.cancel_change{
				color: #999;
				text-align: center;
				border-right: 1rpx solid #f1f1f1;
			}
		}
	}
	.photo{
//         position:absolute;
//         bottom: -60px;
//     left: 0;
		box-sizing: border-box;
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 240rpx;
		image{
			margin-bottom: 20rpx;
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
		}
		view{
			font-size: 24rpx;
			color: #cdcdcd;
		} 
		}
	.xiugai{width: 100%;height: 160rpx;color: #222;line-height: 160rpx;text-align: center;}
	.queding{width: 100%;height: 100%;line-height: 82rpx;text-align: center;color: #fb5958;border-top: 1px solid #f1f1f1;}
.show_pop_box,.show_pop_box_t{width: 600rpx;height: 242rpx;background: #FFFFFF;margin: 0 auto;border-radius: 8rpx;display: flex;flex-direction: column;align-items: center;justify-content: space-between;}
.resume {background-color: #f7f7f7;width: 100%;height: 100%;}
.borderTop {border-top: 10rpx solid #f7f7f7;}
.psgSeekHeadx {width: 100%;height: 260rpx;background: #fb5958;padding: 16rpx 104rpx 16rpx 90rpx;box-sizing: border-box;position:relative;}
.grxx {line-height: 84rpx;height: 84rpx;display: block;width: 100%;text-align: center;font-size: 34rpx;color: #fff;}
.save {color: #fff;width: 120rpx;height: 84rpx;text-align: center;line-height: 84rpx;font-size: 30rpx;}
/*  #ifdef MP-WEIXIN */
   
/*  #endif  */
.msg {padding: 0 30rpx 120rpx 30rpx;width: 100%;box-sizing: border-box;position: absolute;bottom: -1520rpx;left:0;}
.codeMsg{padding: 0 30rpx 120rpx 30rpx;width: 100%;box-sizing: border-box;position: absolute;bottom: -1700rpx;left:0;}
.personal_infor {background-color: #fff;width: 100%;border-radius: 8rpx;}
// .personal_infor text {display: block;}
.personalTit {padding: 50rpx 30rpx 20rpx 30rpx;font-size: 30rpx;display: flex;align-items: center;justify-content: space-between;}
.jiBen {position: relative;display: inline-block}
// .personalTit .jiBen .swtlc_cc {position: absolute;transform:scale(0.6);bottom: -12rpx;right: -4rpx;}
.personalTit .gongKai {font-size: 26rpx;color: #555;margin-right: 20rpx}
.personal_infor .certifi-item {margin-left: 30rpx;border-bottom: 2rpx solid #f3f3f3;padding-top: 2rpx;display: flex;position: relative;}
.certifi-item .title {font-size: 30rpx;color: #555;width: 180rpx;display: inline-block;height: 90rpx;line-height: 90rpx;text-align:justify;text-align-last:justify}
.certifi-item .input {display: flex;align-items: center;justify-content: space-between;width: 100%;box-sizing: border-box;
    padding-left: 60rpx;
    padding-right: 20rpx;
    }
.certifi-item .input input {width: 100%;height: 90rpx;border: 0rpx;text-align: left;font-size: 30rpx;color: #222;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.placeholderStyle {color: #ccc;}
.seedNum{width:800rpx;}
// .certifi-item .input image {display: block;width: 160rpx;height: 68rpx;position: absolute;top: 14rpx;right: 30rpx;}
.certifi-item .seedNum input {height: 90rpx;width: 100%;font-size: 30rpx;}
 .getVerCode {
                height: 50rpx;
            background: none;
            border: none;
            outline: none;
            line-height: 50rpx;
            padding: 0rpx 26rpx 0rpx 0rpx;
            color: #22c3aa;
            border-radius: 8rpx;
            // margin-right: 30rpx;w
            font-size: 30rpx;
            box-sizing: border-box;
            // width: auto
            width:100%;
            text-align: right;
            // height: 100%;
//             position: absolute;
//             top: 20rpx;
//             right: 0rpx;
            }
// .certifi-item .secInput {margin-left: 60rpx;width: 460rpx;}
.secInput{
    // box-sizing: border-box;
    padding-left: 60rpx;
        display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%!important;
    box-sizing: border-box;
    padding-right: 20rpx;
    }
.certifi-item .secInput .secBox {line-height: 90rpx; width: 100%;height: 90rpx;border: 0rpx;text-align: left;font-size: 30rpx;color: #222;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.certifi-item .secInput .i {position: absolute;top: 34rpx;right: 30rpx;color: #ccc;font-size: 28rpx;}

.certificateList {margin-left: 30rpx;border-bottom: 2rpx solid #f1f1f1;}
.certificateList .exContent {padding: 20rpx 20rpx;font-size: 28rpx;padding-left: 0;position: relative;display: flex;align-items: center;
    justify-content: space-between;}
.certificateList .exContent .i {position: absolute;top: 34rpx;right: 30rpx;color: #ccc;font-size: 28rpx;}
.addCertificate {padding: 24rpx 0;text-align: center;color: #fb5958;font-size: 28rpx;display: flex;align-items: center;justify-content: center;}
.addCertificate .i {font-size: 28rpx;transform: rotate(45deg);display: inline-block;}
.addCertificate .addContent {display: inline-block;padding-left: 10rpx;}

.workExperience {border-bottom: 2rpx solid #f1f1f1;padding-bottom: 20rpx;margin-left: 30rpx;}
.workExperience .workList {padding: 10px 15px;padding-left: 0;position: relative;}
.workExperience .workTime {font-size: 28rpx;color: #999;margin-bottom: 10rpx}
.workExperience .workName {font-size: 30rpx;color: #222;font-weight: normal;display: flex;align-items: center;justify-content: space-between;}
.workExperience .workDis {color: #999;font-size: 28rpx;line-height: 50rpx;}
.workExperience .workList .i {position: absolute;right: 30rpx;top: 50rpx;color: #ccc;font-size: 28rpx;}
</style>
<style lang="scss">
    .timePick{
         .uni-picker-action-confirm {
            color: #fb5958!important;
        }
    }
</style>
