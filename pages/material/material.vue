<template>
	<view class="boy_box">
        <!-- icon iconfont icon-morex -->
		<view class="titleB">
			请完善以下资料
		</view>
		<view class="material_list">
			<view class="photo">
				<image :src="photoImg" mode="" @tap="upPhoto" v-if="photoImg&&photoImg.length>0"></image>
				<image src="../../static/img/head.png" mode="" @tap="upPhoto" v-else></image>
				<!-- <image :src="photoImg" mode="" @tap="upPhoto"></image> -->
				<view>点击上传头像</view>
			</view>
			<view class="certifi-item">
				<text class="title">姓名</text>
				<view class="input">
					<input type="text" id="txtUserName" placeholder="请输入姓名" placeholder-class="placeholderStyle" v-model="resumeList.user_name" />
				</view>
			</view>
			<!-- <view class="certifi-item">
				<text class="title">性别</text>
				<view class="secInput">
					<picker :value="obj.genderT" :range="material.sex" range-key="name" @change="pickerChangeVal($event,'genderT')">
						<view class="secBox">{{material.sex[obj.genderT].name}}</view>
					</picker>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view> -->
            <view class="certifi-item">
            	<text class="title">性别</text>
            	<view class="secInput">
            		<picker @change="pickerChangeVal($event,'genderT')" :value="obj.genderT" :range="sexArray" style="width:100%">
                        <view class="qxz" v-if="sexPickerView">请选择</view>
                        <view class="secBox" v-else>{{sexArray[obj.genderT]}}</view>
                    </picker>
            		<view class="icon iconfont icon-morex"></view>
            	</view>
            </view>
			<view class="certifi-item">
				<text class="title">出生日期</text>
				<view class="secInput">
					<picker mode="date" :value="date" :end="endDate" @change="bindDateChange" style="width:100%">
                        <view class="qxz" v-if="sexbirthdayView">请选择</view>
						<view class="secBox" v-else>{{resumeList.birthday}}</view>
					</picker>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
			<view class="certifi-item">
				<text class="title">现居地址</text>
				<view class="secInput" @click="goAddress">
                    <view class="qxz" v-if="curPView">请选择</view>
					<view class="secBox" v-else>{{ resumeList.cur_area_name }}</view>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
			<view class="certifi-item">
				<!-- @change="pickerChange($event,'edu')" -->
				<text class="title">学历</text>
				<view class="secInput">
					<picker :value="obj.edu" :range="material.education" range-key="name" @change="pickerChangeVal($event,'edu')" style="width:100%">
                        <view class="qxz" v-if="educationView">请选择</view>
						<view class="secBox" v-else>{{material.education[obj.edu].name}}</view>
					</picker>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
			<view class="certifi-item">
				<!-- @change="pickerChange($event,'height')" -->
				<text class="title">身高</text>
				<view class="secInput">
					<picker :value="obj.height" :range="material.stature" range-key="value" @change="pickerChangeVal($event,'height')" style="width:100%">
                        <view class="qxz" v-if="statureView">请选择</view>
						<view class="secBox" v-else>{{material.stature[obj.height].value}}</view>
					</picker>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
			<view class="certifi-item">
				<text class="title">体重</text>
				<view class="input">
					<input id="weight" name="weight" placeholder="请输入体重(kg)" placeholder-class="placeholderStyle" v-model="resumeList.weight" type="number"/>
					<!-- <text class="weight_name">kg</text> -->
				</view>
			</view>
			<view class="center_g"></view>
			<view class="certifi-item">
				<!-- @change="pickerChange($event,'money')" -->
				<text class="title">期望职位</text>
				<view class="secInput">
					<!-- <picker  :value="obj.money" :range="material.epxJob" range-key="name">
						<view class="secBox">{{material.epxJob[obj.money].name}}</view>
					</picker>
					<view class="icon iconfont icon-morex"></view> -->
					<view class="secBox" @click="goJobCategory">
                        <view class="qxz" v-if="jobsortView">请选择</view>
						<view v-else>{{resumeList.str_expect_jobsorts}}</view>
						<!-- <view v-for="item in jobsortList" :key="item.jobsort" style="display: inline;">{{ item.jobsort_name }}</view> -->
					</view>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
			<view class="certifi-item">
				<!-- @change="pickerChange($event,'money')" -->
				<text class="title">期望薪资</text>
				<view class="secInput">
					<picker :value="obj.money" :range="material.moneyList" range-key="name" @change="pickerChangeVal($event,'money')" style="width:100%">
                        <view class="qxz" v-if="moneyListView">请选择</view>
						<view class="secBox" v-else>{{material.moneyList[obj.money].name}}</view>
					</picker>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
			<view class="certifi-item">
				<text class="title">工作地点</text>
				<view class="secInput">
					<view class="secBox" @click="workAddress">
                        <view class="qxz" v-if="areasListView">请选择</view>
						<view v-else>{{ resumeList.str_expect_areas }}</view>
					</view>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
		</view>
		<view class="btn">
            <view @tap="savePerInfo">下一步</view>
			<!-- <button type="primary" >下一步</button> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import apiName from '../../static/commonjs/request/apiName.js'
	export default {
		data() {
            const currentDate = this.getDate({
                format: true
            })
			return {
                date: this.getDate({
                	format: true
                }),
                photoName:'',
                jobsortView:true,
                areasListView:true,
                moneyListView:true,
                jobsortsView:true,
                statureView:true,
                educationView:true,
                curPView:true,
                sexPickerView:true,
                sexbirthdayView:true,
                showHeightLst:false,
                is_sync_hb:false,
                sexArray:[],
				photoImg: '',
				// photoImg:'http://192.168.255.5:85/blue_photo/2020-01-03/0103913922.png',
				tempFile: [],
				jobsortList: [],
				startDate: '',
				endDate: this.getDate(),
				resumeList: {
                    birthday:''
                },
				material: {
					epxJob: '',
					seleMoney: '',
					seleSex: '',
					seleEducation: '',
					moneyList: [{
							id: '01',
							name: '1000及以上'
						},
						{
							id: '02',
							name: '1500及以上'
						}
					],
					workPlace: '',
					name: '',
					sex: [{
							id: '1',
							name: '男'
						},
						{
							id: '2',
							name: '女'
						}
					],
					birth: this.getDate(),
					nowLive: '',
					education: [{
							id: '1',
							name: '初中'
						},
						{
							id: '2',
							name: '高中'
						}
					],
					stature: [

					],
					weight: ''
				},
				obj: {
					genderT: 0,
					edu: 0,
					height: 30,
					workStatus: 0,
					money: 0
				}
			};
		},
        created(){
           this.bodyHigh()
           this.get_salary()
           this.getMore()
            this.$nextTick(()=>{
                if(this.addresumeList){
                    this.resumeList = this.addresumeList
                    console.log('保存后的简历',this.addresumeList)
                    setTimeout(()=>{
                         this.save_resumeList()
                    },500)
                }else{
                    setTimeout(()=>{
                       this.get_resume_info() 
                    },500)
                }
            })
        },
        mounted(){
            
        },
		onShow() {
// 			this.bodyHigh()
// 			this.get_salary()
// 			this.getMore()
//             if(this.addresumeList){
//                 this.resumeList = this.addresumeList
//                 console.log('保存后的简历',this.addresumeList)
//                 setTimeout(()=>{
//                      this.save_resumeList()
//                 },500)
//             }else{
//                 setTimeout(()=>{
//                    this.get_resume_info() 
//                 },500)
//             }
//             if(this.personPhoto){
//                 this.photoImg = this.personPhoto
//                 console.log('头像啊啊啊')
//             }
            
// 			console.log('居住地方', this.addnowLive)
// 			console.log('工作地方', this.addworkAddress)
		},
		computed: {
			...mapState(['addnowLive', 'addworkAddress', 'token', 'jobCategory', 'addresumeList','personPhoto'])
		},
		onLoad(options) {
            
            this.is_sync_hb = options.is_sync_hb
            
//             if(options.is_sync_hb=='true'){
//                 uni.showModal({
//                     title: '提示',
//                     content: '为了方便，已帮你将汇博的账号及简历信息同步到快米工作，现在去投递吧~',
//                     showCancel:false,
//                     confirmColor:'#fb5958',
//                     success: function (res) {
//                         if (res.confirm) {
//                             console.log('用户点击确定');
//                         } 
//                     }
//                 });
//             }
			this.getDate()
		},
		methods: {
			...mapMutations(['saveResumeList','savePhoto']),
            get_resume_info(){
            	this.$http.get(apiName.RESUME_INFO,{
            		params: {
            			token: this.token,
            			is_sync_hb: this.is_sync_hb?1:0
            		}
            	}).then(res=> {
                    
                    // return
            		if(res.data.success){
                        this.resumeList = res.data.data
                        console.log('简历信息啊啊',this.resumeList)
            			// this.txtUserName=this.resumeList.user_name   //姓名
            			 this.photoImg = this.resumeList.photo //头像
            			// this.txtUserPhone=this.resumeList.mobile_phone   //电话
//                         if(this.resumeList.hasOwnProperty('sex')&&this.resumeList.sex){
//                             this.showsexPickerViewt = false
//                             this.obj.gender=this.resumeList.sex-1   //性别
//                         }
                         // if()
                         if(this.resumeList.hasOwnProperty("sex")&&this.resumeList.sex){
                             this.sexPickerView = false
                             this.obj.genderT = parseInt(this.resumeList.sex) -1 
                             console.log('选择的性别', this.obj.genderT)
                         }
                          if(this.resumeList.birthday){
                             this.sexbirthdayView = false
                         }
                         // this.obj.genderT=this.resumeList.sex-1
                         // console.log(this.obj.genderT)
            			for(var i=0;i<this.material.education.length;i++){ //学历
            				if(this.material.education[i].id===this.resumeList.max_degree_id){
                                this.educationView = false
                                console.log('是否隐藏学历')
            					this.obj.edu=i
                                console.log(this.obj.edu)
            				}
            			}  
            			for(var i=0;i<this.material.moneyList.length;i++){//薪资
            				if(this.material.moneyList[i].id===this.resumeList.exp_salary){
                                this.moneyListView = false
            					this.obj.money=i
            				}
            			}    
            			// this.resumeWeight= this.resumeList.weight   //体重
                        console.log('简历身高啊啊啊',this.resumeList.stature)
                        if(this.resumeList.stature){
                            for(var i=0;i<this.material.stature.length;i++){ //身高
                                if(this.material.stature[i].value.indexOf(this.resumeList.stature)!==-1){
                                    this.statureView = false
                                    this.obj.height=i
                                    console.log('身高啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊')
                                    // console.log(this.obj.height)
                                }
                            }
                         } 
            			// this.date=this.resumeList.birthday   //出生日期
            			// this.certificateList= res.data.data.certificate_list   //证书
            			// this.workExp = res.data.data.work_data
            			// for(var i=0;i<this.resumeList.expect_jobsort.length-1;i++){
            			// 	this.resumeList.expect_jobsort[i].jobsort_name=this.resumeList.expect_jobsort[i].jobsort_name+','
            			// }
            			// console.log('llllllllllll',this.resumeList.expect_jobsort)
            			if(this.jobCategory){//职位类别
                        console.log('缓存的职位aaaaaaaaaa')
                            this.jobsortList = []
                            if(this.jobCategory.length>0){
                                let aa = []
                                let bb = []
                                this.jobCategory.forEach(item=>{
                                	aa.push(item.jobsort_name)
                                	bb.push(item.jobsort)
                                	this.jobsortList.push(item)
                                })
                                this.resumeList.str_expect_jobsorts = aa.join()
                                this.resumeList.expect_jobsort_ids = bb.join()
                            }else{
                                 if(res.data.data.expect_jobsort&&res.data.data.expect_jobsort.length>0){
                                                 let aa = []
                                                 let bb = []
                                                res.data.data.expect_jobsort.forEach(item=>{
                                                    aa.push(item.jobsort_name)
                                                    bb.push(item.jobsort)
                                                    this.jobsortList.push(item)
                                                })
                                                this.resumeList.str_expect_jobsorts = aa.join()
                                                this.resumeList.expect_jobsort_ids = bb.join()
                                                this.jobsortList=this.resumeList.expect_jobsort
                                }
                            }
                            if(this.resumeList.str_expect_jobsorts){
                                this.jobsortView = false
                            }
                            console.log('期望职位',this.resumeList.str_expect_jobsorts)
//                             else{
//                                 this.resumeList.str_expect_jobsorts = ''
//                                 this.resumeList.expect_jobsort_ids = ''
//                             }
            				// console.log('修改后的职位',this.showjobsortList)
            			}else{
                            // debugger
                            if(res.data.data.expect_jobsort&&res.data.data.expect_jobsort.length>0){
                                let aa = []
                                let bb = []
            				res.data.data.expect_jobsort.forEach(item=>{
            					aa.push(item.jobsort_name)
            					bb.push(item.jobsort)
            					this.jobsortList.push(item)
            				})
            				this.resumeList.str_expect_jobsorts = aa.join()
            				this.resumeList.expect_jobsort_ids = bb.join()
            				this.jobsortList=this.resumeList.expect_jobsort
                           }
                           if(this.resumeList.str_expect_jobsorts){
                               this.jobsortView = false
                           }
            			}
//                         if(this.addworkAddress&&this.addworkAddress.length>0){//城市
//                         	// this.resumeList.expect_areas
//                         	let aa = []
//                         	let bb = []
//                         	this.addworkAddress.forEach(item=>{
//                         		aa.push(item.name)
//                         		bb.push(item.value)
//                         	})
//                         	this.resumeList.str_expect_areas = aa.join()
//                         	this.resumeList.expect_area_ids = bb.join()
//                             this.areasListView =false
//                         	// console.log('修改后的地址',this.resumeList.str_expect_areas)
                        // }
                        if(this.resumeList.str_expect_areas){
                            this.areasListView =false
                        }
//             			if(this.addnowLive&&this.addnowLive.length>0){
//             				this.resumeList.cur_area_id = this.addnowLive[0].value
//             				this.resumeList.cur_area_name = this.addnowLive[0].name
//                             this.curPView = false;
//                             // console.log('展示的居住地址',this.resumeList.cur_area_name)
//             			}
                        if(this.resumeList.cur_area_name){
                            this.curPView = false;
                        }
            		}else {
            			console.log('请求简历失败')
            		}
            	}).catch(err=>{
            		throw err
            	})
            },
            save_resumeList(){
                console.log(this.resumeList)
                // debugger
            			// this.resumeList=res.data.data
//             			this.txtUserName=this.resumeList.user_name   //姓名
                        if(this.personPhoto){
                            this.photoImg = this.personPhoto
                            console.log('头像啊啊啊')
                        }else{
                            this.photoImg = this.resumeList.photo //头像
                        }
//             			this.txtUserPhone=this.resumeList.mobile_phone   //电话
//                         if(this.resumeList.hasOwnProperty("sex")){
//                             this.sexPickerView = false
//                             this.obj.genderT = parseInt(this.resumeList.sex)
//                             console.log('选择的性别',this.resumeList.sex)
//                         }
                        if(this.resumeList.hasOwnProperty("sex")&&this.resumeList.sex){
                            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                            this.sexPickerView = false
                            this.obj.genderT = parseInt(this.resumeList.sex) - 1
                            console.log('选择的性别',this.resumeList.sex)
                        }
                        if(this.resumeList.birthday){
                            this.sexbirthdayView = false
                        }
            			for(var i=0;i<this.material.education.length;i++){ //学历
            				if(this.material.education[i].id===this.resumeList.max_degree_id){
                                this.educationView = false
            					this.obj.edu=i
                                // console.log('保存的学历当前位置',this.obj.edu)
            				}
            			}  
            			for(var i=0;i<this.material.moneyList.length;i++){
            				if(this.material.moneyList[i].id===this.resumeList.exp_salary){
                                this.moneyListView =false
            					this.obj.money=i
            				}
            			}   //薪资   
            			// this.resumeWeight=this.resumeList.weight   //体重
                        if(this.resumeList.stature){ //身高
                            for(var i=0;i<this.material.stature.length;i++){
                                if(this.material.stature[i].value.indexOf(this.resumeList.stature)!==-1){
                                    this.statureView = false
                                    this.obj.height=i
                                    console.log('保存的身高',this.obj.height=i)
                                }
                            }
                         }  
            			if(this.jobCategory&&this.jobCategory.length>0){//职位类别
            				this.jobsortList = []
            				let aa = []
            				let bb = []
            				this.jobCategory.forEach(item=>{
            					aa.push(item.jobsort_name)
            					bb.push(item.jobsort)
            					this.jobsortList.push(item)
            				})
            				this.resumeList.str_expect_jobsorts = aa.join()
            				this.resumeList.expect_jobsort_ids = bb.join()
                            this.jobsortsView = false
            				// console.log('修改后的职位',this.showjobsortList)
            			}else{
            				this.jobsortList=[]   
            			}
                        if(this.resumeList.str_expect_jobsorts){
                            this.jobsortView = false
                        }
            			if(this.addworkAddress&&this.addworkAddress.length>0){//城市
            				// this.resumeList.expect_areas
            				let aa = []
            				let bb = []
            				this.addworkAddress.forEach(item=>{
            					aa.push(item.name)
            					bb.push(item.value)
            				})
            				this.resumeList.str_expect_areas = aa.join()
            				this.resumeList.expect_area_ids = bb.join()
                            this.areasListView =false
            				// console.log('修改后的地址',this.resumeList.str_expect_areas)
            			}
                        if(this.resumeList.str_expect_areas){
                            this.areasListView =false
                        }
            			if(this.addnowLive&&this.addnowLive.length>0){
            				this.resumeList.cur_area_id = this.addnowLive[0].value
            				this.resumeList.cur_area_name = this.addnowLive[0].name
                            this.curPView = false;
                            // console.log('展示的居住地址',this.resumeList.cur_area_name)
            			}
                        if(this.resumeList.cur_area_name){
                            this.curPView = false;
                        }
            },
			upPhoto() {
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
// 							formData: {
// 							 name:tempFilePaths[0]
// 							},
							success: function(uploadFileRes) {
								let data = JSON.parse(uploadFileRes.data)
								_self.photoImg = data.data.url
                                _self.photoName = data.data.name
                                _self.resumeList.photoName = data.data.name
								_self.savePhoto(data.data.url)
								console.log('返回的图片地址aaaaaaaaaaaa', _self.photoName)
								uni.showToast({
									title: '上传成功'
								})
							}
						});
					},
				})

			},
			pickerChangeVal: function(e, val) {
				console.log('获取的值', e)
				console.log('获取的类型', val)
				let idx = e.detail.value
				this.obj[val] = e.target.value
				switch (val) {
					case 'genderT':
                    this.sexPickerView = false ;
                    
                    this.resumeList.sex = parseInt(idx)  + 1
                    console.log('选择的性别啊啊啊啊啊啊啊啊啊啊',this.resumeList.sex)
// 						this.material.sex.forEach((item, index) => {
// 							if (idx == index) {
// 								this.resumeList.sex = idx + 1
// 								console.log('性别的code', this.resumeList.sex)
// 							}
// 						})
						break
					case 'edu':
                        this.educationView = false;
						this.material.education.forEach((item, index) => {
							if (idx == index) {
								this.resumeList.max_degree_id = item.id
								console.log('学历', this.resumeList.max_degree_id)
							}
						})
						break
					case 'money':
                        this.moneyListView = false
						this.material.moneyList.forEach((item, index) => {
							if (idx == index) {
								this.resumeList.exp_salary = item.id
								console.log('薪资', this.resumeList.exp_salary)
							}
						})
						break
						// case 'workStatus':
						// 	this.workStatusList.forEach((item,index)=>{
						// 		if(idx==index){
						// 			this.resumeList.job_state_id = item.id
						// 			console.log('工作状态',this.resumeList.job_state_id)
						// 		}
						// 	})
						// 	break
					case 'height':
                        this.statureView =false
                        this.showHeightLst = true
						this.material.stature.forEach((item, index) => {
							if (idx == index) {
								this.resumeList.stature = item.value
								console.log('选择的身高', this.resumeList.stature)
							}
						})
						break
					default:
						break
				}
			},
			savePerInfo() {
                var han = /^[\u4e00-\u9fa5]+$/;
//                  if (!han.test(this.resumeList.user_name)) {
//                        return uni.showToast({
//                            icon:'none',
//                        	title:'姓名必须是汉字'
//                        })
//                 }
				if(!this.photoImg){
					return uni.showToast({
                        icon:'none',
						title:'请上传头像'
					})
				}
                if(!this.resumeList.user_name){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入姓名'
                	})
                }
                 if (!han.test(this.resumeList.user_name)) {
                      return uni.showToast({
                          icon:'none',
                      	title:'姓名必须是汉字'
                      })
               }
                console.log('性别',this.resumeList.sex)
                // console.log()
                if(!this.resumeList.sex||this.resumeList.sex.length<1){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择性别'
                	})
                }
                if(!this.resumeList.birthday){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择出生日期'
                	})
                }
                if(!this.resumeList.cur_area_id){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择现居地址'
                	})
                }
                if(!this.resumeList.max_degree_id){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择学历'
                	})
                }
                if(!this.resumeList.stature){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择身高'
                	})
                }
                if(!this.resumeList.weight){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入体重'
                	})
                }
                if(!this.resumeList.expect_jobsort_ids){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择期望职位'
                	})
                }
                if(!this.resumeList.exp_salary){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择期望薪资'
                	})
                }
                if(!this.resumeList.expect_area_ids){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择工作地点'
                	})
                }
				this.saveResumeList(this.resumeList)
				// this.showpopup = true
				this.$http.post(apiName.RESUMALTER, {
					params: {
						token: this.token,
						txtExpectAreaPut: this.resumeList.expect_area_ids, //期望地区
						txtExpectPostPut: this.resumeList.expect_jobsort_ids, //期望职位
						authCode: '', //短信验证码
						txtUserName: this.resumeList.user_name, //姓名
						txtGenderPut: parseInt(this.resumeList.sex) , //性别
						txtBirthdayPut: this.resumeList.birthday, //生日
						txtEducationPut: this.resumeList.max_degree_id, //学历
						txtUserPhone:'', //手机号
						txtWorkStatePut:'', //求职状态
						curPlace: this.resumeList.cur_area_id, //现居住地
						stature: this.resumeList.stature.slice(0,3), //身高
						weight: this.resumeList.weight, //体重
						photo: this.resumeList.photoName?this.resumeList.photoName:this.resumeList.photo_base, //头像
						txthidSalaryPut: this.resumeList.exp_salary //薪资
					}
				}).then(res => {
					if (res.data.success) {
                        let aa = 'frommateril'
						// this.showpopup = true
						console.log('ggggggg', res.data)
                        if(this.resumeList.work_data&&this.resumeList.work_data.length>0){
                            uni.switchTab({
                            	url:'../person/resume/resume?is_sync_hb=' + this.is_sync_hb
                            })
                        }else{
                           uni.navigateTo({
                           	url:'../person/resume/workexp/workexp?created=' + aa
                           })   
                        }
//                         if(res.data.data.return_type=='1'){
//                             uni.switchTab({
//                             	url:'../person/resume/resume?is_sync_hb=' + this.is_sync_hb
//                             })
//                         }else{
//                           uni.navigateTo({
//                           	url:'../person/resume/workexp/workexp'
//                           })  
//                         }
// 						uni.switchTab({
// 							url:'../index/index'
// 						})
					} else {
						this.$KM.showToast(res.data.msg)
					}
				})
			},
			getMore() {
				this.$http.post(apiName.MORE_COMMON, {}).then(res => {
					if (res.data.success) {
                        this.sexArray = res.data.data.sexs_list.map(item=>{
                            return item.name
                        })
//                         if(!this.addresumeList){
//                             console.log('ppppppppppppppppppppppp')
//                             this.resumeList.sex = 0
//                         }
                        console.log('性别数组',this.sexArray)
						// this.material.sex = res.data.data.sexs_list
						this.material.education = res.data.data.degree
                        console.log('学历数据字典',this.material.education)
					}
				}).catch(error => {
					console.log(error)
				})
			},
			get_salary() {
				this.$http.post(apiName.SALARY_COMMON, {}).then(res => {
					if (res.data.success) {
						// console.log('期望薪资',res.data)
						this.material.moneyList = res.data.data.salarys
//                         if(!this.addresumeList){
//                             this.resumeList.exp_salary = "01"
//                         }
					}
				}).catch(error => {
					console.log(error)
				})
			},
			goJobCategory() {
				this.saveResumeList(this.resumeList)
				let params = {
					expect_jobsort: this.jobsortList,
					type: 'tianxie'
				}
				console.log('这边的职位点点大', this.jobsortList)
				// return
				params = JSON.stringify(params)
				uni.navigateTo({
					url: `../person/resume/jobCategory/jobCategory?params=${params}`
				})
			},
			workAddress() {
				this.saveResumeList(this.resumeList)
				let aa = []
				if (this.addworkAddress) {
					aa = this.addworkAddress
				}
				let params = {
					type: 'addworkAddress',
					plac: aa
				}
// 				console.log('现在居住的地址',params)
// 				return    
				params = JSON.stringify(params)
				uni.navigateTo({
					url: `../person/resume/presentAddress/presentAddress?params=${params}`
				})
			},
			bindDateChange(e) {
				this.resumeList.birthday = e.target.value
                this.sexbirthdayView = false;
                console.log(e.target.value)
			},
			goAddress() {
				this.saveResumeList(this.resumeList)
				let aa = []
				let bb = {}
				if (this.addnowLive && this.addnowLive.length > 0) {
					aa = this.addnowLive
				} else {
					if(this.resumeList.cur_area_name&&this.resumeList.cur_area_id){
						bb.name = this.resumeList.cur_area_name?this.resumeList.cur_area_name:''
						bb.value = this.resumeList.cur_area_id?this.resumeList.cur_area_id:''
						aa.push(bb)
					}
				}
				let params = {
					type: 'addnowLive',
					plac: aa
				}
				// console.log('现在居住的地址',params)
				// return    
				params = JSON.stringify(params)
				uni.navigateTo({
					url: `../person/resume/presentAddress/presentAddress?params=${params}`
				})
			},
			//创建身高的数组
			bodyHigh() {
				var arrs = []
				var objs = []
				for (var i = 140; i < 221; i++) {
					var obj = {}
					arrs[i] = i + 'cm'
					obj.value = arrs[i]
					objs.push(obj)
				}
				this.material.stature = objs
//                 if(!this.addresumeList){
//                     this.resumeList.stature = "170cm"
//                 }
				console.log('身高数组',this.material.stature )
			},
			getDate(type) {
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
		}
	}
</script>
<!-- 
<style lang="scss" scoped>
	.title{
		margin: 80rpx 0;
		font-size: 34rpx;
		color: #9d845c;
		text-align: center;
	}
<style> -->
<style lang="scss">
    .qxz{
        font-size: 30rpx;
        color: #ccc;
    }
    .boy_box{
        box-sizing: border-box;
        padding-bottom: 300rpx;
    }
    .uni-picker-toggle{
        .uni-picker-action-confirm{
            color:#fb5958!important;
        }
    }
    .secInput{
        display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%!important;
    box-sizing: border-box;
    padding-right: 20rpx;
    }
    .icon-morex{
        color:#ccc!important;
    }
	.photo {
		box-sizing: border-box;
		// padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 240rpx;

		image {
			margin-bottom: 20rpx;
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
		}

		view {
			font-size: 24rpx;
			color: #cdcdcd;
		}
	}

	.btn {
        position: fixed;
        bottom: 0;
        width: 100%;
		margin-top: 50rpx;
		padding: 30rpx;
		box-sizing: border-box;
		view {
			width: 100%;
			height: 90rpx;
			background: #fb5958;
			text-align: center;
			line-height: 90rpx;
			font-size: 34rpx;
			color: #fff;
			margin: 0 auto;
			border-radius: 8rpx;
		}
	}

	.center_g {
		width: 100%;
		height: 10rpx;
		background: #f1f1f1;
	}

	.material_list {
		background-color: #fff;
		width: 100%;
		border-radius: 8rpx;
        // margin-bottom: 300rpx;
	}

	.material_list text {
		display: block;
	}

	.titleB {
		margin: 80rpx 0;
		font-size: 34rpx;
		color: #9d845c;
		text-align: center;
	}

	.xiugai {
		width: 100%;
		height: 160rpx;
		color: #222;
		line-height: 160rpx;
		text-align: center;
	}

	.queding {
		width: 100%;
		height: 100%;
		line-height: 82rpx;
		text-align: center;
		color: #fb5958;
		border-top: 1px solid #f1f1f1;
	}

	.show_pop_box {
		width: 600rpx;
		height: 242rpx;
		background: #FFFFFF;
		margin: 0 auto;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.resume {
		background-color: #f7f7f7;
		width: 100%;
		height: 100%;
	}

	.borderTop {
		border-top: 10rpx solid #f7f7f7;
	}

	.psgSeekHeadx {
		width: 100%;
		height: 328rpx;
		background: linear-gradient(to right, #fb5958, #fd8062);
		padding: 16rpx 104rpx 16rpx 90rpx;
		box-sizing: border-box;
	}

	.psgSeekHeadx text {
		line-height: 56rpx;
		height: 56rpx;
		display: block;
		width: 100%;
		text-align: center;
		font-size: 34rpx;
		color: #fff;
	}

	.psgSeekHeadx .save {
		width: 120rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		position: absolute;
		top: 0;
		right: 0;
	}

	.msg {
		padding: 0 30rpx 30rpx 30rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: -110rpx;
	}

	.personal_infor {
		background-color: #fff;
		width: 100%;
		border-radius: 8rpx;
	}

	.personal_infor text {
		display: block;
	}

	.jiBen {
		position: relative;
	}

	.jiBen switch {
		position: absolute;
		transform: scale(0.6);
		bottom: -12rpx;
		right: -4rpx;
	}

	.gongKai {
		font-size: 26rpx;
		color: #555;
		position: absolute;
		bottom: 0;
		right: 114rpx;
	}

	.certifi-item {
		margin-left: 30rpx;
		border-bottom: 2rpx solid #f3f3f3;
		padding-top: 2rpx;
		display: flex;
		position: relative;
	}

	.certifi-item .title {
		font-size: 30rpx;
		color: #555;
		min-width: 130rpx;
		display: inline-block;
		height: 90rpx;
		line-height: 90rpx;
	}

	.certifi-item .input {
		margin-left: 60rpx;
		margin-right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.certifi-item .input input {
		width: 100%;
		height: 90rpx;
		border: 0rpx;
		text-align: left;
		font-size: 30rpx;
		color: #222;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.placeholderStyle {
		color: #ccc;
	}

	.certifi-item .input image {
		display: block;
		width: 160rpx;
		height: 68rpx;
		position: absolute;
		top: 14rpx;
		right: 30rpx;
	}

	.certifi-item .seedNum input {
		height: 90rpx;
		width: 100%;
		font-size: 30rpx;
	}

	.certifi-item .seedNum .getVerCode {
		height: 50rpx;
		background: none;
		border: none;
		outline: none;
		line-height: 50rpx;
		padding: 0rpx 8rpx;
		color: #22c3aa;
		border-radius: 8rpx;
		margin-right: 30rpx;
		font-size: 30rpx;
		position: absolute;
		top: 20rpx;
		right: 0rpx;
	}

	.certifi-item .secInput {
		margin-left: 60rpx;
		width: 460rpx;
	}

	.certifi-item .secInput .secBox {
		line-height: 90rpx;
		width: 100%;
		height: 90rpx;
		border: 0rpx;
		text-align: left;
		font-size: 30rpx;
		color: #222;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.certifi-item .secInput .i {
		position: absolute;
		top: 34rpx;
		right: 30rpx;
		color: #ccc;
		font-size: 28rpx;
	}

	.certificateList {
		margin-left: 30rpx;
		border-bottom: 2rpx solid #f1f1f1;
	}

	.certificateList .exContent {
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		padding-left: 0;
		position: relative;
	}

	.certificateList .exContent .i {
		position: absolute;
		top: 34rpx;
		right: 30rpx;
		color: #ccc;
		font-size: 28rpx;
	}

	.addCertificate {
		padding: 24rpx 0;
		text-align: center;
		color: #fb5958;
		font-size: 28rpx;
	}

	.addCertificate .i {
		font-size: 28rpx;
		transform: rotate(45deg);
		display: inline-block;
	}

	.addCertificate .addContent {
		display: inline-block;
		padding-left: 10rpx;
	}

	.workExperience {
		border-bottom: 2rpx solid #f1f1f1;
		padding-bottom: 20rpx;
		margin-left: 30rpx;
	}

	.workExperience .workList {
		padding: 10px 15px;
		padding-left: 0;
		position: relative;
	}

	.workExperience .workTime {
		font-size: 28rpx;
		color: #999;
	}

	.workExperience .workName {
		font-size: 30rpx;
		color: #222;
		font-weight: normal;
	}

	.workExperience .workDis {
		color: #999;
		font-size: 28rpx;
		line-height: 50rpx;
	}

	.workExperience .workList .i {
		position: absolute;
		right: 30rpx;
		top: 50rpx;
		color: #ccc;
		font-size: 28rpx;
	}
</style>
<style>
    .uni-simple-toast__text{
        color:#ccc!important;
    }
</style>
