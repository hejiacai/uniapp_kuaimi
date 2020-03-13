import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null,
		// token:"8h2p57521738",
		token:'',
		presentAddress: '',
		newLiveAddress:'',
		editCertificate:'',
		addnowLive:'',
		addworkAddress:'',
		addresumeList:'',
		ediresumeList:'',
		indexSearchJob:'',
		jobCategory:[],
        changejobCategory:[],
		personPhoto:'',
		//筛选器缓存
		_cityCode:"",//城市码
		_sexCode:"",//性别码
		_workTimeCode:"",//时间码
		_chooseSalaryCode:"",//薪资码
		_ageCode:"",//年龄段码
		_chooseCallingList:[],//行业
		_chooseRewardsList:[],//福利
		_chooseJobList:[],//职位类别
		__cityGroupActive:-1,//地区左边下标
		_tab_bar_chooseList:[],
		_tab_bar_List:[
			'职位类别',
			'地区',
			'薪资',
			'更多',
		],
		_tab_bar_chooseIndex:-1,
		_keyWordStr:'',//关键词
		_isSearchDetail: 1,//返回页数 正数返回历史页面 负数特殊处理 已使用-1 跳转搜素列表
		_routerBackHistoy:'',
		_isJobDetail: 1,
		_isCompanyDetail: 1,
		_isJobDetailId: '',
		_isCompanyDetailId: '',
		jobId: []
	},
	mutations: {
        clearResumelist(state){
            state.addresumeList = ''
        },
		savePhoto(state,data){
			state.personPhoto = data
		},
		addSearchJob(state,data){
			state.indexSearchJob = data
		},
		saveEdiResumeList(state,data){
			state.ediresumeList = data
		},
		saveResumeList(state,data){
			state.addresumeList = data
		},
		setaddworkAddress(state,data){
			state.addworkAddress = data
		},
        clearworkAddress(state){
            state.addworkAddress = ''
        },
		setaddnowLive(state,data){
			state.addnowLive = data
		},
        clearnowLive(state){
            state.addnowLive = ''
        },
		addJobCategory(state,data){
			// console.log('猪猪组在',data)
			state.jobCategory = data
		},
        clearaddJobCategory(state){
            state.jobCategory = ''
        },
        changeJobCategory(state,data){
            state.changejobCategory = data
        },
		login(state, provider) {
			state.hasLogin = true;
			
		},
		logout(state) {
			state.hasLogin = false
		},
		setToken(state, str){
			state.token = str;
			uni.setStorage({
			    key: 'token',
			    data: state.token,
			});
		},
		closeToken(state){
			state.token = '';
			uni.clearStorage('token');
		},
		addPresentAddress(state,value) {
			state.presentAddress=value
		},
		addnewLiveAddress(state,value) {
			state.newLiveAddress=value
		},
		editCertificateSave(state,value) {
			state.editCertificate=value
		},
		//关键词
		set_keyWordStr(state,value){
			state._keyWordStr = value
		},
		//赛选器暂行多函数
		savefliterValue(state,value){
			console.log(value)
			for (var i = 0; i < value.stateList.length; i++) {
				state.value.stateList[i] = value.stateListVlaue[i]
			}
		},
		set_workTimeCode(state,value) {
			state._workTimeCode=value
		},
		set_sexCode(state,value) {
			state._sexCode=value
		},
		set_ageCode(state,value) {
			state._ageCode=value
		},
		set_cityCode(state,value) {
			state._cityCode=value
		},
		set_chooseSalaryCode(state,value) {
			state._chooseSalaryCode=value
		},
		set_chooseCallingList(state,value) {
			state._chooseCallingList=value
		},
		set_chooseRewardsList(state,value) {
			state._chooseRewardsList=value
		},
		set_chooseJobList(state,value) {
			state._chooseJobList=value
			console.log(JSON.stringify(state._chooseJobList))
		},
		set_tab_bar_chooseList(state,value) {
			state._tab_bar_chooseList=value
		},
		set_tab_bar_chooseIndex(state,value) {
			state._tab_bar_chooseIndex=value
		},
		set_tab_bar_List(state,value){
			state._tab_bar_List=value
		},
		set_cityGroupActive(state,value){
			state._cityGroupActive=value
		},
		//--------------
		set_isSearchDetail(state,value){ //需要返回的页面栈数
			state._isSearchDetail=value
		},
		set_isJobDetail(state,value){ //需要返回的页面栈数
			state._isJobDetail=value
		},
		set_isJobDetailId(state,value){ //需要返回的页面栈数
			state._isJobDetailId=value
		},
		set_isCompanyDetail(state,value){ //需要返回的页面栈数
			state._isCompanyDetail=value
		},
		set_isCompanyDetailId(state,value){ //需要返回的页面栈数
			state._isCompanyDetailId=value
		},
		set_routerBackHistoy(state,value){
			state._routerBackHistoy = value //上一个页面,应文件结构有同文件不同page所以需全路径 以jobDetail配路径
		},
		addJobId(state,value){
			state.jobId.push(value)
		},
		spliceJobId(state,value){
			state.jobId.pop()
		}
	},
    getters:{
        
    },
	actions: {
		
	}
})

export default store
