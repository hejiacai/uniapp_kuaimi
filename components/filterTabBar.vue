<template>
	<view :class="['psgExact',isposiFix?'isPoFixStyle':'']">
		<view :class="['psgExact-li', tab_bar_chooseIndex==index?'curBorder':'',tab_bar_chooseList.indexOf(index)>-1 ? 'curBorder':'']" v-for="(item,index) in tab_bar_List" :key="index" @click="chooseTab(index)">
			<view :class="['psgExact-li-name', item == '重庆-周边区县'? 'psgExact-li-name-special':'' ]">{{item}}</view><view :class="['down', tab_bar_chooseIndex==index?'up':'']"></view>
		</view>
		<uni-popup :show="showpopup" :type="type" :masterbgClassName="'popupWhiteBg'" @change="change">
			<view class="FilterContainer">
				<view class="FilterList">
					<view :class="['psgExact-li', tab_bar_chooseIndex==index?'curBorder':'',tab_bar_chooseList.indexOf(index)>-1 ? 'curBorder':'']" v-for="(item,index) in tab_bar_List" :key="index" @click="chooseTab(index)">
						<view class="psgExact-li-name">{{item}}</view><view :class="['down', tab_bar_chooseIndex==index?'up':'']"></view>
					</view>
				</view>
				<!--职位-->
				<view class="jobGroupContainer groupContainer" v-show="showfliterContainerIndex==0">
					<scroll-view scroll-y class="left-aside jobGroup">
						<view :class="['jobGroup-li',jobGropActive==index1 ? 'jobGroup-liCur':'']" v-for="(item1,index1) in groupList" :key="index1" @click="chooseItemActive('job','group',index1)">
							{{item1.name}}
						</view>
					</scroll-view>
					<scroll-view scroll-y class="left-aside jobGroupClass">
						<!-- index2, item2.code, item2.name,item2 -->
						<view :class="['capsule', chooseJobList.indexOf(item2.code) > -1 ? 'capsuleActive':'']" v-for="(item2,index2) in group_list_item_Arr[jobGropActive]" :key="index2" @click="chooseItemActive('job', 'groupClass', index2,item2)">
							{{item2.name}}
						</view>
					</scroll-view>
				</view>
				<!-- 距离-->
				<view class="cityGroupContaine groupContainer" v-show="showfliterContainerIndex==1">
					<view v-if="showfliterContainerIndex==1 && tab_bar_List[1]=='距离'">
						<scroll-view scroll-y class="left-aside salaryGroup">
							<view :class="['salaryGroup-li', distanceGroupActive == indexJ ? 'salaryGroup-liActive':'']" v-for="(itemJ,indexJ) in distance" :key="indexJ" @click="chooseItemActive('distance','group',indexJ,itemJ)">
								{{itemJ}}
								<view v-if="distanceGroupActive==indexJ" class="icon iconfont icon-icon-kuaimi_drop_down_hook_icon chooseSalaryIcon"></view>
							</view>
						</scroll-view>
					</view>
					<view v-else-if="showfliterContainerIndex==1 && tab_bar_List[1] !==''">
						<scroll-view scroll-y class="left-aside cityGroup">
							<view :class="['cityGroup-li', cityGroupActive == index3  ? 'cityGroup-liActive':'']" v-for="(item3,index3) in cityGroup" :key="index3" @click="chooseItemActive('city','group',index3)">
								{{item3.name}}
							</view>
						</scroll-view>
						<scroll-view scroll-y class="left-aside cityGroupList">
							<!-- item4.code,item4.name -->
							<view class="cityGroupList-li" v-for="(item4,index4) in cityGroupList[cityGroupActive]" :key="index4" @click="chooseItemActive('city','groupClass',index4,item4)">
								{{cityGroupActive > 0 && index4==0  ? '(全部)' + item4.name : item4.name}}
								<view v-if="item4.code==cityCode" class="icon iconfont icon-icon-kuaimi_drop_down_hook_icon chooseSalaryIcon"></view>
							</view>
						</scroll-view>
					</view>
				</view>
				<!--城市-->
				<!-- <view class="cityGroupContaine groupContainer" v-if="showfliterContainerIndex==1&&tab_bar_List[1]=='地区'">
					<scroll-view scroll-y class="left-aside cityGroup">
						<view :class="['cityGroup-li', cityGroupActive == index3  ? 'cityGroup-liActive':'']" v-for="(item3,index3) in cityGroup" :key="index3" @click="chooseItemActive('city','group',index3)">
							{{item3.name}}
						</view>
					</scroll-view>
					<scroll-view scroll-y class="left-aside cityGroupList">
						<view class="cityGroupList-li" v-for="(item4,index4) in cityGroupList[cityGroupActive]" :key="index4" @click="chooseItemActive('city','groupClass',index4,item4)">
							{{cityGroupActive > 0 && index4==0  ? '(全部)'+item4.name : item4.name}}
							<view v-if="item4.code==cityCode&&cityActive==index4" class="icon iconfont icon-icon-kuaimi_drop_down_hook_icon chooseSalaryIcon"></view>
						</view>
					</scroll-view>
				</view> -->
				<!--薪资-->
				<view class="salaryGroupContainer groupContainer" v-show="showfliterContainerIndex==2">
					<scroll-view scroll-y class="left-aside salaryGroup">
						<view :class="['salaryGroup-li' , chooseSalaryCode=='' && item5.id == 0 || chooseSalaryCode == item5.id? 'salaryGroup-liActive':'']" v-for="(item5,index5) in salaryGroup" :key="index5" @click="chooseItemActive('salary','group',index5,item5)">
							{{item5.name}}
							<view v-show=" chooseSalaryCode=='' && item5.id == 0 || chooseSalaryCode == item5.id" class="icon iconfont icon-icon-kuaimi_drop_down_hook_icon chooseSalaryIcon"></view>
						</view>
					</scroll-view>
				</view>
				<!--更多-->
				<view class="otherGroupContainer groupContainer" v-show="showfliterContainerIndex==3">
					<scroll-view scroll-y class="left-aside otherGroup">
						<view class="otherGroup-li" v-for="(item6,index6) in otherArr" :key="index6">
							<view class="otherGroup-li-title">{{item6.name}}</view>
							<view :class="['capsule', (item6.name=='性别'&& sexCode== index7) || (item6.name=='年龄'&& ageCode== index7) || (item6.name=='作息时间'&& workTimeCode== index7) ||(item6.name=='行业'&& chooseCallingList.indexOf(item7.code)>-1)||(item6.name=='福利'&& chooseRewardsList.indexOf(item7.code)>-1) ?'capsuleActive':'']"  v-for="(item7,index7) in item6.arr" :key="index7" @click="chooseItemActive('other',item6.name,index7,item7,item6)">
							{{item6.name !='行业' && item6.name !='福利' ? item7 : item7.name}}
							</view>
						</view>
					</scroll-view>
				</view>
				<view  class="btnContainer" v-if="showfliterContainerIndex==0 || showfliterContainerIndex==3 ">
					<view  class="closeBtn" @click="closeChooseList">清空条件</view>
					<view  class="sureBtn" @click="sureChooseBtn">确认</view>
				</view>
			</view>
		</uni-popup>
		<!-- <UniPopup v-if="maskFiltershow"></UniPopup> -->
	</view>
</template>


<script>
	import apiName from './../static/commonjs/request/apiName.js';
	import UniPopup from "./uni-popup/uni-popup";
	import {
			mapState,
			mapMutations
		} from 'vuex';
	export default {
		name: "filterTabBar",
		components:{
			UniPopup,
		},
		props:{
			isposiFix:{
				type:Boolean,
				default:false
			},
			nearbyJob:{
				type:String,
				default:''
			},
			isIndex:{
				type:Boolean,
				default:false
			},
		},
		data() {
			return {
                is_near:false,
                distance:[
                    "不限",
                    "1公里",
                    "3公里",
                    "5公里",
                    "10公里"
                ],
                distanceItme:'',
                distanceGroupActive:'',//距离的下标
                showUp:false,
				cityActive:'',
				workTimeCode:'',//工作时长
				sexCode:'',//性别
				ageCode:'',//年龄
				cityCode:'',
				chooseSalaryCode:'',
				chooseCallingList:[],//选择行业列表
				chooseRewardsList:[],//选择福利列表
				chooseJobList:[],//选择职位列表
				tab_bar_chooseIndex:-1,//选择tab
				tab_bar_List:[],
				swiper_table_clientHeight:'',
				tab_bar_chooseList:[],
				// chooseSexName:'',//性别
				// chooseTimeName:'',//工作时长
				// chooseYearName:'',//性别
				chooseSalaryName:'',//选择薪资的下标
				// chooseSalaryName:'',//选择薪资的下标
				cityChooseName:'',//选择城市名
				showpopup: false,
				type:'',
				content:'',
				apiNameList:['JOB_SORT_COMMON','AREA_COMMON','SALARY_COMMON','MORE_COMMON','CALLING_COMMON','REWARDS_COMMON'],
				requestList_Arr:[],//接口数据缓存
				requestList_Arr1:[],//接口数据缓存
				groupList:[],
				group_list_item_Arr:[],
				jobGropActive:0,//职位类别组的选中下标
				// jobGropClassActive:-1,//二级职位类别列表下标
				cityGroupActive:0,//城市组的选中下标
				cityGroupClassActive:-1,//二级城市列表下标
				otherGroupActive:-1,//其他组下标
				otherNameGroup:'',//二级其他组列表下标
				showfliterContainerIndex:3,//显示筛选容器的下面
				salaryGroupActive:-1,//选择薪资的下标
				salaryGroup:{},//薪资
				cityGroup:[],//城市组名
				cityGroupList:[],//二级城市列表
				otherArr:[],//其他列表
				offtouch:false,
			};
		},
		beforeCreate() {
			uni.$on('reWriteFliter', () => {
				this.isIndexNoChoose();
				this.setState();
				this.closePoP_tabBarChoose();
			});
		},
		created() {
			this.init();
			console.log()
		},
		beforeDestroy() {
			this.closePoP_tabBarChoose();
			this.maskFiltershow = false;
			this.tab_bar_chooseIndex=-1;
			this.showpopup = false;
		},
		watch:{
		},
		computed: {
			...mapState(['token','_tab_bar_List','_keyWordStr','_tab_bar_chooseIndex','_cityGroupActive','_tab_bar_chooseList','_cityCode','_sexCode','_workTimeCode','_chooseSalaryCode','_ageCode','_chooseCallingList','_chooseRewardsList','_chooseJobList'])
		},
		methods:{
			...mapMutations(['set_workTimeCode','set_tab_bar_List','set_cityGroupActive','set_tab_bar_chooseIndex','set_tab_bar_chooseList','set_sexCode','set_ageCode','set_cityCode','set_chooseSalaryCode','set_chooseCallingList','set_chooseRewardsList','set_chooseJobList']),
			chooseTab(index){
					console.log('选择的筛选下标->',index)
				if(this.tab_bar_chooseIndex == index){
					this.closePoP_tabBarChoose();
					this.maskFiltershow = false;
					this.tab_bar_chooseIndex=-1;
					this.showpopup = false;
					return;
				}
				this.closePoP_tabBarChoose();
				this.maskFiltershow = true;
				this.togglePopup('top', 'popup');
				this.showfliterContainerIndex = index;
				this.requestList(index);
				this.showpopup = true
				this.tab_bar_chooseIndex = index;
			},
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
					default:
						break
				}
				this.type = type;
				this['show' + open] = true;
			},
			change(e) {
				if (!e.show) {
					this.showpopup = false
				}
			},
			chooseItemActive(group, groupClass, index,code,name,item){
				// if(this.offtouch){
				// 	return
				// }
				let _this = this;
				switch (group) {
					case 'job':
						if(groupClass=='group'){
							this.jobGropActive = index;
						}
						if(groupClass=='groupClass'){
							let codeIndex = this.chooseJobList.indexOf(code.code);
							if( codeIndex > -1){
								// debugger
								this.chooseJobList.splice(codeIndex,1);
								return;
							}
							if(this.chooseJobList.length < 5){
								// if(this.tab_bar_chooseList.indexOf(0) == -1){
								// 	this.tab_bar_chooseList.push(0);
								// }
								this.chooseJobList.push(code.code);
							}else{
								this.$KM.showToast('最多可选5个职位标签');
							}
						}
						break;
					case 'city':
						if(groupClass=='group'){
							this.cityGroupActive = index;
						}
						if(groupClass=='groupClass'){
							// this.newGroupIndex = this.cityGroupActive
							this.cityActive = index
							this.cityGroupClassActive = index;
							this.cityChooseName = code.name;
							this.cityCode = code.code
							// alert(code)
							
							this.tab_bar_List[1] = this.cityChooseName;
							this.sureChooseBtn();
						}
						break;
                    case 'distance':
                        this.distanceGroupActive = index
                         if(code=='不限'){
                            this.distanceItme = '10000公里'
							let distanceTabbarIndex =  this.tab_bar_chooseList.indexOf(1);
							console.log('选择的下标',distanceTabbarIndex)
							console.log('删除前的数组',this.tab_bar_chooseList)
							this.tab_bar_chooseList.splice(distanceTabbarIndex,1)
							console.log('删除后的数组',this.tab_bar_chooseList)
							// if(distanceTabbarIndex>-1){
							// 	this.tab_bar_chooseList.splice(salaryTabbarIndex,1);
							// }
                        }else{
                           this.distanceItme = code 
                        }
                        console.log('选择的距离',this.distanceItme)
                        this.is_near = true
                        // this.tab_bar_List[2] = this.chooseSalaryName;
//                         let distanceTabbarIndex =  this.tab_bar_chooseList.indexOf(1);
//                         if(distanceTabbarIndex>-1){
//                         	this.tab_bar_chooseList.splice(distanceTabbarIndex,1);
//                         }
                       
//                         this.chooseSalaryName = code.name;
//                         this.chooseSalaryCode = code.id;
//                         this.distanceGroupActive = index
//                         this.distanceItme = code
//                         console.log('选择的薪资id',code.id)
//                         if(JSON.stringify(this.chooseSalaryCode) =='0'){
//                         	this.chooseSalaryCode='';
//                         	this.chooseSalaryName='';
//                         	this.tab_bar_List[2] = '薪资';
//                         	let salaryTabbarIndex =  this.tab_bar_chooseList.indexOf(2);
//                         	if(salaryTabbarIndex>-1){
//                         		this.tab_bar_chooseList.splice(salaryTabbarIndex,1);
//                         	}
//                         }else{
//                         	this.tab_bar_List[2] = this.chooseSalaryName;
//                         }
//                     	this.distanceName = code.name;
//                     	this.distanceCode = code.id
//                     	if(this.chooseSalaryCode==0){
//                     		this.distanceGroupActive=-1;
//                     		this.chooseSalaryName=''
//                     	}else{
//                     		this.distanceGroupActive = index;
//                     		this.tab_bar_List[2] = this.chooseSalaryName;
//                     	}
                    	this.sureChooseBtn('distance');
                    	break;
					case 'salary':
							this.chooseSalaryName = code.name;
							this.chooseSalaryCode = code.id;
                            console.log('选择的薪资id',code.id)
							if(JSON.stringify(this.chooseSalaryCode) =='0'){
								this.chooseSalaryCode='';
								this.chooseSalaryName='';
								this.tab_bar_List[2] = '薪资';
								let salaryTabbarIndex =  this.tab_bar_chooseList.indexOf(2);
								if(salaryTabbarIndex>-1){
									this.tab_bar_chooseList.splice(salaryTabbarIndex,1);
								}
							}else{
								this.tab_bar_List[2] = this.chooseSalaryName;
							}
							this.sureChooseBtn();
							// Object.keys(this.salaryGroup).forEach(item=>{
							// 	if(this.salaryGroup[item]==code){
							// 		this.chooseSalaryCode = item
							// 	}
							// })
							// this.salaryGroup.forEach(item=>{
							// 	if(item.id==code.id){
							// 		this.chooseSalaryCode = item.id
							// 	}
							// })
						break;
					case 'other':
						this.otherNameGroup = groupClass;
					if(groupClass != '行业' && groupClass != '福利' ){
							// this.otherGroupActive = index;
							if(groupClass=='年龄'){
								this.ageCode = this.ageCode==index ? '' : index;
								// Object.keys(name.arr).forEach(item=>{
								// 	if(name.arr[item]==code && this._ageCode != index){
								// 		_this.ageCode = index
								// 		// alert(item)
								// 	}
								// })
							}
							if(groupClass=='性别'){
								this.sexCode = this.sexCode==index ? '' : index;
								// Object.keys(name.arr).forEach(item=>{
								// 	if(name.arr[item]==code && this._sexCode != index){
								// 		_this.sexCode = item
								// 	}
								// })
							}
							if(groupClass=='作息时间'){
							this.workTimeCode = this.workTimeCode==index ? '' : index;
								// Object.keys(name.arr).forEach(item=>{
								// 	if(name.arr[item]==code && _this._workTimeCode !=index){
								// 		_this.workTimeCode = item
								// 		// alert(item)
								// 	}
								// })
							}
						}else if(groupClass == '行业' ){
							let choosedIndex = this.chooseCallingList.indexOf(code.code);
							if(choosedIndex>-1){
								this.chooseCallingList.splice(choosedIndex,1);
							}else{
								this.chooseCallingList.push(code.code);
							}
						}
						else if(groupClass == '福利' ){
							let choosedIndex = this.chooseRewardsList.indexOf(code.code);
							if(choosedIndex>-1){
								this.chooseRewardsList.splice(choosedIndex,1);
							}else{
								this.chooseRewardsList.push(code.code);
							}
						}else{
						}
                        // this.sureChooseBtn();
					break;
					default:
					    break;
				}
			},
			
			closeChooseList(){
				if(this.showfliterContainerIndex==0){
					this.chooseJobList=[];
				}
				if(this.showfliterContainerIndex==3){
					this.chooseCallingList=[];
					this.chooseRewardsList=[];
					this.sexCode='';
					this.ageCode='';
					this.workTimeCode='';
				}
			},
			closePoP_tabBarChoose(){
				let tab_bar0 = this.tab_bar_chooseList.indexOf(0);
				//职位列表
				if(this.chooseJobList.length>0){//已选择职位列表
				// debugger
					if(tab_bar0 == -1){
						this.tab_bar_chooseList.push(0);
					}
				}else{
					if( tab_bar0 > -1){
						this.tab_bar_chooseList.splice(tab_bar0, 1);
					}
				}
				//城市
				if(this.cityCode!=''&& this.tab_bar_chooseList.indexOf(1) == -1){
					this.tab_bar_chooseList.push(1);
				}
                //距离
				if(this.distanceItme=='不限'){
					
				}
                if((this.distanceItme!='')&& this.tab_bar_chooseList.indexOf(1) == -1){
                	if(this.distanceItme=='10000公里'){
						this.tab_bar_chooseList.splice(this.tab_bar_chooseList.indexOf(1));
					}else{
						this.tab_bar_chooseList.push(1);
					}
                }
				//薪资
				let tab_bar2 = this.tab_bar_chooseList.indexOf(2);
				if(this.chooseSalaryCode !=''){
					if( tab_bar2 == -1){
						this.tab_bar_chooseList.push(2);
					}
				}else{
					if(tab_bar2 > -1){
					this.tab_bar_chooseList.splice(tab_bar2, 1);
					}
				}
				//其他
				let tab_bar3 = this.tab_bar_chooseList.indexOf(3);
				if(this.sexCode=="" && this.workTimeCode=="" && this.ageCode=="" && this.chooseCallingList.length==0 && this.chooseRewardsList.length==0){
					if( tab_bar3 > -1){
						this.tab_bar_chooseList.splice(tab_bar3, 1);
					}
				}else{
					if( tab_bar3 == -1){
						this.tab_bar_chooseList.push(3);
					}
				}
				this.tab_bar_chooseIndex=-1;
				
			},
			sureChooseBtn(type=''){
                console.log('进入的类型',this.nearbyJob)
				let _this = this;
				this.showpopup = false;
				this.closePoP_tabBarChoose();
				this.setState();
				if(this.nearbyJob){
					uni.$emit('searchJob_near',{
					    distanceItme:this.distanceItme,
					    chooseJobList:this.chooseJobList,
					    chooseSalaryCode:this.chooseSalaryCode?this.chooseSalaryCode:'',
					    reward_ids:this.chooseRewardsList,
					    calling_id:this.chooseCallingList,
					    ageCode:this.ageCode?this.ageCode:'',
					    schedule:this.workTimeCode?this.workTimeCode:'',
					    sex:this.sexCode?this.sexCode:'',
					    // area_id:this.cityCode?this.cityCode:'',
					    });
				}else{
                  this.searchJob();  
                }
			},
			searchJob(){
				uni.$emit('searchJob');
			},
			init(){
				this.tab_bar_List=this._tab_bar_List;
				this.tab_bar_chooseIndex = this._tab_bar_chooseIndex;
				this.tab_bar_chooseList=this._tab_bar_chooseList;
				this.workTimeCode=this._workTimeCode;
				this.sexCode=this._sexCode;
				this.ageCode=this._ageCode;
				this.cityCode=this._cityCode;
				this.chooseSalaryCode=this._chooseSalaryCode;
				this.chooseCallingList=this._chooseCallingList;
				this.chooseRewardsList=this._chooseRewardsList;
				this.chooseJobList=this._chooseJobList;
				this.cityGroupActive=this._cityGroupActive;
				this.closePoP_tabBarChoose();
			},
			isIndexNoChoose(){
				this.tab_bar_List=[
									'职位类别',
									'地区',
									'薪资',
									'更多',
								];
				this.tab_bar_chooseIndex = -1;
				this.tab_bar_chooseList=[];
				this.workTimeCode='';
				this.sexCode='';
				this.ageCode='';
				this.cityCode='';
				this.chooseSalaryCode='';
				this.chooseCallingList=[];
				this.chooseRewardsList=[];
				this.chooseJobList=[];
				this.cityGroupActive=-1;
			},
			setState(){
				this.set_workTimeCode(this.workTimeCode);
				this.set_sexCode(this.sexCode);
				this.set_ageCode(this.ageCode);
				this.set_cityCode(this.cityCode);
				this.set_chooseSalaryCode(this.chooseSalaryCode);
				this.set_chooseCallingList(this.chooseCallingList);
				this.set_chooseRewardsList(this.chooseRewardsList);
				this.set_chooseJobList(this.chooseJobList);
				
				this.set_tab_bar_chooseList(this.tab_bar_chooseList);
				this.set_tab_bar_chooseIndex(this.tab_bar_chooseIndex);
				this.set_tab_bar_List(this.tab_bar_List);
				this.set_cityGroupActive(this.cityGroupActive)
			},
			requestList(index){
				let _this = this;
				if(index <3){
					_this.$http.get(apiName[this.apiNameList[index]]+'&=').then(res => {
						if(res.data.success){
							let dataList = res.data.data;
							if(_this.requestList_Arr.length>0 && JSON.stringify(_this.requestList_Arr).includes(JSON.stringify(dataList))){
								return;
							}
								_this.requestList_Arr[index]=dataList;
								_this.dealResquestData(index,dataList);
						}else{
							_this.$KM.showToast(res.data.msg);
						}
					}).catch(err => {
						console.log('出错了err->',err);
					})
				}else{
					// for (let i = 3; i < 6; i++) {
						//取人员要求
						_this.$http.get(apiName[this.apiNameList[3]]+'&=').then(res => {
							if(res.data.success){
								//个人信息
								let dataList1 = res.data.data;
								if(_this.requestList_Arr1.length > 0 && JSON.stringify(_this.requestList_Arr1).includes(JSON.stringify(dataList1))){
									return;
								}
								_this.requestList_Arr1[3]=dataList1;
								_this.dealResquestData(3,dataList1);
								//行业
								_this.$http.get(apiName[this.apiNameList[4]]+'&=').then(res => {
									if(res.data.success){
										let dataList2 = res.data.data;
										if(_this.requestList_Arr1.length > 0 && JSON.stringify(_this.requestList_Arr1).includes(JSON.stringify(dataList2))){
											return;
										}
										_this.requestList_Arr1[4]=dataList2;
										_this.dealResquestData(4,dataList2);
										//福利
										_this.$http.get(apiName[this.apiNameList[5]]+'&=').then(res => {
											if(res.data.success){
												let dataList3 = res.data.data;
												if(_this.requestList_Arr1.length > 0 && JSON.stringify(_this.requestList_Arr1).includes(JSON.stringify(dataList3))){
													return;
												}
												_this.requestList_Arr1[5]=dataList3;
												_this.dealResquestData(5,dataList3);
											}else{
												_this.$KM.showToast(res.data.msg);
											}
										}).catch(err => {
											console.log('出错了 err->',err);
										})
									}else{
										_this.$KM.showToast(res.data.msg);
									}
									
								}).catch(err => {
									console.log('出错了 err->',err);
								})
							}else{
								_this.$KM.showToast(res.data.msg);
							}
						}).catch(err => {
							console.log('出错了 err->',err);
						})
					// }
				}
			},
			dealResquestData(index,data){
				switch (index) {
					case 0://行业数据
						for(let i=0;i<data.length;i++){
							let item = data[i];
							let obj = {
								code: item.code,
								name: item.name
							}
							this.groupList.push(obj);
							this.group_list_item_Arr.push(item.children);
						}
						break;
					case 1://地区数据
						for(let i=0;i<data.length;i++){
							let item = data[i];
							let obj = {
								code: item.code,
								name: item.name
							}
							this.cityGroup.push(obj);
							this.cityGroupList.push(item.children);
						}
						break;
					case 2://薪资数据
						this.salaryGroup = data.salarys;
						break;
					case 3://更多数据
						let moreObj_age = {
							name: '年龄',
							arr: data.age
						}
							this.otherArr.push(moreObj_age);
						let moreObj_schedules = {
							name: '作息时间',
							arr: data.schedules
						}
							this.otherArr.push(moreObj_schedules);
						let moreObj_sexs = {
							name: '性别',
							arr: data.sexs
						}
							this.otherArr.push(moreObj_sexs);
						break;
					case 4://行业数据
						let callingObj = {
							name: '行业',
							arr: data
						}
							this.otherArr.push(callingObj);
						break;
					case 5://福利数据
						let rewardsObj = {
							name: '福利',
							arr: data
						}
							this.otherArr.push(rewardsObj);
						break;
					default:
					    break;
				}
			},
		}
	}
</script>

<style>
	/* body{
		overflow: visible!important;
		
	} */
	.aa{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		top:0;
		/* top: var(--window-top); */
		z-index: 99;
	}
	.fxd{
		position: fixed;
		top: 0;
		left: 0;
		margin: 0!important;
	}
	.psgExact{
		width: 100%;
		background: #fff;
		justify-content: space-between;
		margin-top: 20rpx;
		padding: 10rpx;
		box-sizing: border-box;
		align-items: center;
		height: 104rpx;
	}
	.isPoFixStyle{margin-top: 0;}
	.psgExact-li{float: left;color: #333;height: 64rpx;line-height:64rpx;width:24%;margin-right: 1%;background: rgb(247, 247, 247);text-align: center;border-radius:6rpx;}
	.psgExact-li:nth-child(4){margin-right: 0;}
	.psgExact-li-name{display: inline-block;text-align: center;vertical-align: top;font-size: 24rpx;margin-right: 10rpx;}
	.curBorder{border: 1px solid #fb5958;box-sizing: border-box;color: #fb5958;background-color: #FFFFFF;}
	.down{display: inline-block;width: 0;height: 0;border: 10rpx solid transparent;border-top-color: rgb(184, 184, 184);vertical-align: -4rpx;}
	.up{display: inline-block;width: 0;height: 0;border: 10rpx solid transparent;border-bottom-color: #fb5958;vertical-align: 8rpx;}
	
	/*筛选*/
	.FilterList{background: #FFFFFF;height: 154rpx;width: 100%;padding: 20rpx;box-sizing: border-box;}
	/* #ifdef MP-WEIXIN */
	.FilterList{
		padding-top: 70rpx;
	}
	 /* #endif */
	.FilterContainer{width: 100%;height: 1025rpx;}
	.groupContainer{width: 100%;height: 921rpx;background: #FFFFFF;}
	/*职位*/
	.jobGroup{width: 25%;float: left;background: #FFFFFF;height: 921rpx;}
	.jobGroup-ul{height: auto;}
	.jobGroup-li {font-size: 28rpx;text-align: center;line-height: 44rpx;padding: 20rpx;box-sizing: border-box;}
	.jobGroup-liCur{color: #fb5958;background: #f3f3f3;}
	.jobGroupClass{width: 75%;float: left;height: 921rpx;background: #f3f3f3;padding: 20rpx 20rpx 0 20rpx;box-sizing: border-box;}
	/*城市*/
	.cityGroup{width: 40%;float: left;background: #FFFFFF;height: 921rpx;}
	.cityGroup-li{width: 100%;color: #222222;font-size: 28rpx;height: 80rpx;line-height: 80rpx;border-bottom: 1px solid #eaeaea;padding: 0 20rpx;box-sizing: border-box;}
	.cityGroup-liActive{background: #f3f3f3;color: #fb5958;border: 0;}
	
	.cityGroupList{width: 60%;float: left;background: #f3f3f3;height: 921rpx;}
	.cityGroupList-li{display: block;width: 100%;height: 80rpx ;line-height: 80rpx;color: #222222;border-bottom: 1px solid #eaeaea;font-size: 28rpx;padding: 0 20rpx;box-sizing: border-box;}
	/*薪资*/
	.salaryGroupContainer{}
	.salaryGroup{height: 921rpx;padding: 0 20rpx;box-sizing: border-box;}
	.salaryGroup-li{display: block;width: 100%;height: 40px;line-height: 40px;color: #222;border-bottom: 1px solid #f1f1f1;font-size: 14px;}
	.chooseSalaryIcon{color: #fb5958;float: right;line-height: 40px;color: #fb5958;font-size: 10px;padding-right: 10px;}
	.salaryGroup-liActive{color: #fb5958;}
	/*其他*/
	.otherGroup{height: 921rpx;}
	.otherGroup-li{padding: 20rpx 30rpx 6rpx 30rpx;}
	.otherGroup-li-title{padding-bottom: 20rpx;color: #999;font-size: 28rpx;}
	/*提交按钮*/
	.btnContainer{width: 100%;height: 88rpx;background: #FFFFFF;}
	.btnContainer .closeBtn{background: #FFFFFF;text-align: center;float: left;width: 40%;line-height: 88rpx;color: #999999;border-top: 1px solid #f2f2f2;}
	.btnContainer .sureBtn{float: left;width: 60%;text-align: center;line-height: 88rpx;background: #fb5958;color: #FFFFFF;}
	.psgExact-li-name-special{font-size: 21rpx;}
</style>