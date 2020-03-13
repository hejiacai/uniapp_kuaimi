<template>
	<view class="workexp">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<view class="psgSeekHead">
			<view class="psgSeekBg">
				<text>工作经历</text>
				<view class="icon iconfont icon-backtrackx back getBack" @click="goback" v-if="!showZhu"></view>
			</view>
		</view>
		<view class="personal_infor">
			<view class="certifi-item">
				<view class="title">岗位名称</view>
				<view class="input">
					<input type="text" name="certificateName" id="certificateName" placeholder="请输入岗位名称" placeholder-class="placeholderStyle" v-model="workEp.station" />
				</view>
			</view>
			<view class="certifi-item">
				<view class="title">公司名称</view>
				<view class="input">
					<input type="text" name="certificateName" id="certificateName" placeholder="请输入公司名称" placeholder-class="placeholderStyle" v-model="workEp.company_name" />
				</view>
			</view>
			<view class="certifi-item">
				<view class="title">入职时间</view>
				<view class="secInput xauznhe">
					<picker mode="date" @change="comeInChange" style="width:100%">
                        <view class="qxz" v-if="showPickerView">请选择</view>
						<view class="secBox">{{workEp.start_time}}</view>
					</picker>
					
				</view>
                <view class="icon iconfont icon-morex tbjz"></view>
			</view>
			<view class="certifi-item">
				<view class="title">离职时间</view>
				<view class="secInput xauznhe">
                    <!-- <picker @change="pickerChange" value="" :range="timeList" range-key="value">
                    	<view class="secBox">{{gain_time}}</view>
                    </picker> -->
					<picker mode="date" @change="outBackChange" style="width:100%">
                        <view class="qxz" v-if="showPickerViewt">请选择</view>
						<view class="secBox" v-if="isSoFar">{{workEp.end_time}}</view>
						<!-- <view class="baiban" v-else></view> -->
					</picker>
                    <!-- isSoFar?'icon-completematerial_selectedx':'iconcompletematerial_selectedx' -->
					<view :class="[isSoFar?'soFar':'newSoFar']" @click="soFar">
                        <!-- icon iconfont icon-completematerial_unselectedx -->
						<view :class="['icon','iconfont','icon-completematerial_unselectedx',isSoFar?'ipoint':['newIpoint','icon-completematerial_selectedx']]"></view>
						<view>至今</view>
                        <!-- ipoint -->
					</view>
					
				</view>
                <view class="icon iconfont icon-morex tbjz"></view>
			</view>
			<view class="certifi-item workDes">
				<view class="title">工作描述</view>
			</view>
			<!-- @blur="hideHolder" -->
			<!-- v-model="workEp.workExpDescribe" -->
			<!-- :placeholder="workEp.workHolder" -->
			<textarea v-if="isshow" name="workExpDescribe" id="workExpDescribe" :placeholder="workEp.workHolder" placeholder-style="color: #ccc;" v-model="workEp.workExpDescribe" maxlength="2001"></textarea>
			<!-- <button type="warn" class="save">保 存</button> -->
			<view class="zhubiao" style="font-size:30rpx;color:#ccc;margin-left:30rpx;margin-top:10rpx;" v-if="showZhu">
				注：进入平台后可在简历中心添加更多工作经历
			</view>
            <view class="fSave">
				<view class="save" @click="saveCer" v-if="isSave">保 存</view>
				<view class="bbox" v-else>
					<view class="delt" @click="deltWork">删 除</view>
					<view class="modi" @click="modiWork">修 改</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import apiName from '../../../../static/commonjs/request/apiName.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				// workDsc:'',
				// placehol:'例子：1、负责钻机的具体操作，完成生产任务;2、负责钻机设备运转与维护.',
				// comeIn:'',
				// outBack:'',
                showZhu:false,
				isshow:true,
                showPickerView:true,
                showPickerViewt:true,
				workEp:{
					mode:'',
					work_id:'',
					person_id:'',
					station:'',
					company_name:'',
					start_time:'',
					end_time:'',
					workHolder:'',
					workExpDescribe:''
				},
				isSave:false,
				isSoFar: true,
				obj: {
					inTime: 0
				},
				inTimeList: [{value: '2019年'},{value: '2018年'},{value: '2017年'},{value: '2016年'},{value: '2015年'},],
				date: this.getnowDate({
					format: true
				}),
				startDate:this.getnowDate(),
				endDate:this.getnowDate()
			}
		},
		onLoad(options) {
			var data= options.params
			if(options.params&&JSON.parse(options.params).mode==='edit'){
                this.showPickerView = false
                this.showPickerViewt = false
                // console.log(JSON.parse(options.params))
				this.workEp = JSON.parse(options.params)
                if(this.getnowDate()==this.workEp.end_time){
                    console.log('这是当前时间哦')
                    this.isSoFar = false
                }
                if(JSON.parse(options.params).workExpDescribe.length<1){
                    // this.workEp.workHolder = JSON.parse(options.params).workExpDescribe
                    // this.workEp.workExpDescribe = '例子：1、负责钻机的具体操作，完成生产任务;2、负责钻机设备运转与维护.'
                    this.workEp.workHolder = '例子：1、负责钻机的具体操作，完成生产任务;2、负责钻机设备运转与维护.'
                }else{
                    
                    // this.workEp.workExpDescribe = JSON.parse(options.params).workExpDescribe
                    this.workEp.workHolder = JSON.parse(options.params).workExpDescribe
                }
//                 if(this.workEp.end_time==this.getnowDate()){
//                     this.isSoFar = true
//                 }
                console.log('工作经历',this.workEp)
				// this.comeIn = data.start_time?data.start_time:''
				// this.outBack = data.end_time?data.end_time:''
				// this.placehol = data.summary
			}else{
                this.workEp.workHolder = '例子：1、负责钻机的具体操作，完成生产任务;2、负责钻机设备运转与维护.'
				this.isSave = true
			}
            if(options.params&&JSON.parse(options.params).created){
                this.showZhu = true
            }
            if(options.created){
                this.showZhu = true
            }
			// console.log('最新的地区',this.choosedAddress)
			// this.$http.get(apiName.AREACOMMONV2).then(res=>{
			// 	if(res.data.success){
			// 		this.provinceData=res.data.data
			// 		// console.log('请求地区成功',this.provinceData)
			// 	}else {
			// 		console.log('请求地区失败')
			// 	}
			// }).catch(err=>{
			// 	throw err
			// })
		},
		computed:{
			...mapState(['token'])
		},
		methods: {
			// hideHolder(e){
			// 	console.log(e)
			// 	this.workEp.workExpDescribe = e.detail.value
			// },
			saveCer(){
                
                // console.log(this.workEp.workExpDescribe.length)
                if(!this.workEp.station){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入岗位名称'
                	})
                }
                if(this.workEp.station.length<2||this.workEp.station.length>20){
                    return uni.showToast({
                        icon:'none',
                    	title:'岗位名称为2-20字'
                    })
                }
                if(!this.workEp.company_name){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入公司名称'
                	})
                }
                if(this.workEp.company_name.length<2||this.workEp.company_name.length>20){
                    return uni.showToast({
                        icon:'none',
                    	title:'公司名称为2-20字'
                    })
                }
                if(!this.workEp.start_time){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择入职时间'
                	})
                }
//                 if(!this.workEp.end_time){
//                 	return uni.showToast({
//                         icon:'none',
//                 		title:'请选择离职时间'
//                 	})
//                 }
                if(this.isSoFar&&!this.workEp.end_time){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择离职时间'
                	})
                }
                if(this.workEp.workExpDescribe.length<10||this.workEp.workExpDescribe.length>2000){
                     return uni.showModal({
                            // title: '提示',
                            content: '请输入10-2000字的工作内容',
                            showCancel:false,
                            confirmColor:'#fb5958',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定');
                                } 
                            }
                        });
                    console.log('b')
                }
				this.$http.get(apiName.MOD_WORKDO,{
					params: {
						token:this.token?this.token:'',
						txtLeavePutDay:this.isSoFar?0:1,//	int
						company_name:this.workEp.company_name,
						station:this.workEp.station,
						start_time:this.workEp.start_time,
						end_time:this.workEp.end_time,
						workExpDescribe:this.workEp.workExpDescribe,
						work_id:this.workEp.work_id//string
					}
				}).then(res=>{
					if(res.data.success){
						console.log(res)
						uni.switchTab({
						    url: '/pages/person/resume/resume'
						});
					}else{
                        return uni.showToast({
                            icon:'none',
                        	title:res.data.msg
                        })
                    }
				})
			},
			deltWork(){
                var _this = this
                uni.showModal({
                    // title: '提示',
                    content: '确定删除?',
                    showCancel:true,
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            _this.$http.get(apiName.DEL_WORKDO,{
                            	params: {
                            		token:_this.token?_this.token:'',
                            		work_id:_this.workEp.work_id
                            	}
                            }).then(res=>{
                            	if(res.data.success){
                            		console.log(res)
                            		uni.switchTab({
                            		    url: '/pages/person/resume/resume'
                            		});
                            	}
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
				
			},
			modiWork(){
                if(!this.workEp.station){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入岗位名称'
                	})
                }
                if(this.workEp.station.length<2||this.workEp.station.length>20){
                    return uni.showToast({
                        icon:'none',
                    	title:'岗位名称为2-20字'
                    })
                }
                if(!this.workEp.company_name){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入公司名称'
                	})
                }
                if(this.workEp.company_name.length<2||this.workEp.company_name.length>20){
                    return uni.showToast({
                        icon:'none',
                    	title:'公司名称为2-20字'
                    })
                }
                if(!this.workEp.start_time){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择入职时间'
                	})
                }
                console.log(!this.isSoFar)
                console.log(!this.workEp.end_time)
                if(this.isSoFar&&!this.workEp.end_time){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择离职时间'
                	})
                }
                if(this.workEp.workExpDescribe.length<10||this.workEp.workExpDescribe.length>2000){
                     return uni.showModal({
                            // title: '提示',
                            content: '请输入10-2000字的工作内容',
                            showCancel:false,
                            confirmColor:'#fb5958',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定');
                                } 
                            }
                        });
                    console.log('b')
                }
				this.$http.get(apiName.MOD_WORKDO,{
					params: {
						token:this.token?this.token:'',
						txtLeavePutDay:this.isSoFar?0:1,//	int
						company_name:this.workEp.company_name,
						station:this.workEp.station,
						start_time:this.workEp.start_time,
						end_time:this.workEp.end_time,
						workExpDescribe:this.workEp.workExpDescribe,
						work_id:this.workEp.work_id//string
						// id:parseInt(this.certificateInfo.id),
						// name:this.cValue,
						// time:this.gain_time
					}
				}).then(res=>{
					if(res.data.success){
						console.log(res)
						// uni.navigateBack({
						//     delta: 1
						// })
						uni.switchTab({
						    url: '/pages/person/resume/resume'
						});
					}else{
                        return uni.showToast({
                            icon:'none',
                        	title:res.data.msg
                        })
                    }
				})
			},
// 			 getDate() {
// 				const date = new Date();
// 			
// 				let year = date.getFullYear();
// 				let month = date.getMonth() + 1;
// 			
// 				// if (type === 'start') {
// 				// 	year = year - 60;
// 				// } else if (type === 'end') {
// 				// 	year = year + 2;
// 				// }
// 				month = month > 9 ? month : '0' + month;
// 			
// 				return `${year}-${month}`;
// 			},
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
			comeInChange: function(e,val) {
                this.showPickerView = false
				this.workEp.start_time = e.target.value
                console.log('入职时间',e.target.value)
                console.log(typeof(e.target.value))
			},
			outBackChange: function(e){
                this.showPickerViewt = false
				this.workEp.end_time = e.target.value
                console.log('离职时间',e.target.value)
                console.log(typeof(e.target.value))
			},
			goback() {
				uni.navigateBack({
				    delta: 1
				})
			},
			soFar() {
				this.isSoFar = !this.isSoFar
				if(!this.isSoFar){
					this.workEp.end_time = ''
                    console.log('至今时间',this.workEp.end_time)
                    console.log(typeof(this.workEp.end_time))
                    this.showPickerViewt = false
				}else{
                    this.workEp.end_time = ''
                    this.showPickerViewt = true
                }
			}
		}
	}
</script>

<style>
    .changemore{margin-top:70rpx;}
    .xauznhe{
        /* position:relative; */
    }
    .qxz{
        position: absolute;
    top: 22rpx;
    font-size: 30rpx;
    color: #ccc;
    }
    .iconfont{
        font-size: 28rpx;
    }
    .areT{
        color:#ccc;
    }
    .icon-morex{
        color:#ccc!important;
    }
    .tbjz{
        text-align: center;
    align-self: center;
    }
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
	.baiban{background: #FFFFFF;width: 100%;
    height: 90rpx;}
	 .fSave {padding: 80rpx 30rpx 0 30rpx;}
	 .save {width: 100%;background-color: #fb5958;height: 90rpx;text-align: center;line-height: 90rpx;border-radius: 8rpx;font-size: 34rpx;color: #fff;}
	 .delt {width: 40%;height: 90rpx;line-height: 90rpx;text-align: center;font-size: 34rpx;color: #666;background: #f7f7f7;border-radius: 8rpx;}
	.modi {width: 55%;height: 90rpx;line-height: 90rpx;text-align: center;font-size: 34rpx;background-color: #fb5958;color: #fff;border-radius: 8rpx;}
	 .bbox {display: flex;justify-content: space-between;}
.psgSeekHead {width: 100%; margin-top:var(--status-bar-height);}
.placeholderStyle {color: #ccc;}
.psgSeekHead .psgSeekBg {padding: 16rpx 104rpx 16rpx 90rpx;position: relative;}
.psgSeekHead .psgSeekBg text {line-height: 56rpx;height: 56rpx;width: 100%;text-align: center;font-size: 34rpx;color: #222;display: block;}
.psgSeekHead .psgSeekBg .getBack {display: block;width: 76rpx;height: 84rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 32rpx;line-height: 84rpx;text-align: center;color: #222;}
.certifi-item {margin-left: 30rpx;border-bottom: 2rpx solid #f3f3f3;padding-top: 2rpx;display: flex;position: relative;}
.certifi-item .title {font-size: 30rpx;color: #555;width: 130rpx;display: inline-block;height: 90rpx;line-height: 90rpx;}
.certifi-item .input {margin-left: 60rpx;margin-right: 30rpx;width: 460rpx;}
.certifi-item .input input {width: 100%;height: 90rpx;border: 0rpx;text-align: left;font-size: 30rpx;color: #222;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.certifi-item .secInput {margin-left: 60rpx;width: 460rpx;display: flex;
    align-items: center;
    justify-content: space-between;}
.certifi-item .secInput .secBox {line-height: 90rpx; width: 100%;height: 90rpx;border: 0rpx;text-align: left;font-size: 30rpx;color: #222;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.certifi-item .secInput .i {position: absolute;top: 34rpx;right: 30rpx;color: #ccc;font-size: 28rpx;}
/* .personal_infor .save {margin: 80rpx 30rpx 0 30rpx;} */
.certifi-item .secInput .soFar {margin-right: 10rpx;display: flex;line-height: 92rpx;width: 120rpx;height: 90rpx;font-size: 30rpx;color: #555;font-weight: normal;position: absolute;top: 0rpx;right: 36rpx;}
.certifi-item .secInput .newSoFar {margin-right:10rpx; display: flex;line-height: 92rpx;width: 120rpx;height: 90rpx;font-size: 30rpx;color: #fb5958;font-weight: normal;position: absolute;top: 0rpx;right: 36rpx;}
.certifi-item .secInput .soFar .ipoint {padding-right: 10rpx;font-size: 26rpx;line-height: 94rpx;}
.certifi-item .secInput .newIpoint {padding-right: 10rpx;font-size: 26rpx;line-height: 94rpx;color: #fb5958;}
.workDes {border-bottom: none;}
#workExpDescribe {display: block;width: calc(100% - 60rpx);padding: 30rpx;box-sizing: border-box;border: 2rpx solid #F1F1F1;height: 280rpx;margin: auto;font-size: 30rpx;line-height: 1.5;}
</style>
