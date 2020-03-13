<template>
	<view class="certificate">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<view class="psgSeekHead">
			<view class="psgSeekBg">
				<text>证书</text>
				<view class="icon iconfont icon-backtrackx back getBack" @click="goback"></view>
			</view>
		</view>
		<view class="personal_infor">
			<view class="certifi-item">
				<view class="title">证书</view>
				<view class="secInput">
					<input type="text" name="certificateName" id="certificateName" placeholder="请输入" placeholder-style="color: #ccc;font-size:30rpx;" v-model="cValue" />
				</view>
			</view>
			<view class="certifi-item">
				<view class="title">获取时间</view>
				<view class="secInput">
					<picker @change="pickerChange" value="" :range="timeList" range-key="value" style="width:100%">
						<view class="secBox" v-if="gain_time">{{gain_time}}</view>
                        <view class="qxz" v-else>请选择</view>
					</picker>
					<view class="icon iconfont icon-morex"></view>
				</view>
			</view>
			<view class="fSave">
				<view class="save" @click="saveCer" v-if="isSave">保 存</view>
				<view class="bbox" v-else>
					<view class="delt" @click="deltCer">删 除</view>
					<view class="modi" @click="modiCer">修 改</view>
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
            const currentDate = this.getDate({
                format: true
            })
			return {
				certificateInfo:'',
				gain_time:'',
				isSave:false,
				// obj: {
				// 	getTime: 0,
				// },
				timeList: [],
				cValue: '',
				mode: '',
				lib: {
					params: {}
				},
				blag: false,
				glab: false
			}
		},
		onLoad(options) {
			// mode":"edit",
			// "id":"116",
			// "person_id":"2105506",
			// "certificate_name":"毕业证",
			// "gain_time":"2014",
			// "create_time":"2019-12-17 16:22:33"
			this.cTime()
			// var data=JSON.parse(options.params)
//             if(options.params){
//                 
//             }
			this.certificateInfo = JSON.parse(options.params)
			console.log('证书信息',this.certificateInfo)
			// var times=this.cTime()
			if(options.params&&JSON.parse(options.params).mode==='edit'){
				this.gain_time = JSON.parse(options.params).gain_time + "年"
				this.cValue=JSON.parse(options.params).certificate_name
				console.log('证书名',this.certificate_name)
				// this.lib.params=data
				// var res = times.filter((item, index) => {
				// 	return item.value == data.time
				// })
				// this.obj.getTime=res[0].index
				// this.glab=true
			}else{
				this.isSave = true
			}
            if(options.params&&JSON.parse(options.params).mode){
                this.mode=JSON.parse(options.params).mode
            }
		},
		computed:{
			...mapState(['token'])
		},
		methods: {
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
            },
			//创建证书时间数组
			cTime() {
				var date=new Date()
				var year=date.getFullYear()
				var arrs=[]
				var objs=[]
				for(var i=year;i>1944;i--){
					var obj={}
					arrs[i]=i+'年'
					obj.value=arrs[i]
					obj.index=year-i
					objs.push(obj)
				}
				this.timeList=objs
				console.log('返回的时间啊啊啊啊啊啊啊啊啊啊',objs)
				return objs
			},
			pickerChange: function(e,val) {
				let aa = Object.assign([],this.timeList)
				aa.forEach(item=>{
					if(item.index==e.target.value){
						this.gain_time = item.value
						console.log(item.value)
					}
				})
				// console.log('获取时间',e)
				// this.gain_time = e.detail 
			},
			goback() {
				uni.navigateBack({
				    delta: 1
				})
			},
			saveCer() {
                if(!this.cValue){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入证书'
                	})
                }
                if(this.cValue.length<2||this.cValue.length>20){
                    return uni.showToast({
                        icon:'none',
                    	title:'请输入证书字数在2-20以内'
                    })
                }
                if(!this.gain_time){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择获取时间'
                	})
                }
				this.$http.get(apiName.MOD_CERTIFICATE,{
					params: {
						token:this.token?this.token:'',
						name:this.cValue,
						time:this.gain_time
					}
				}).then(res=>{
					if(res.data.success){
						console.log(res)
						uni.switchTab({
						    url: '/pages/person/resume/resume'
						});
					}
				})
				// var name=this.cValue
				// var time=this.timeList[this.obj.getTime].value
				// var mode=this.mode
				// var list=sessionStorage.getItem('certificateList')
				// var certificateList=list?JSON.parse(list):[]
				// if(mode==='add'){
				// 	certificateList.push({
				// 		id: parseInt(Math.random() * 600),
				// 		certificate_name: name,
				// 		gain_time: time
				// 	})
				// }else {
				// 	certificateList.map(item=>{
				// 		if(item.id==this.lib.params.id){
				// 			item.certificate_name=name,
				// 			item.gain_time=time
				// 		}
				// 	})
				// }
				// sessionStorage.setItem('certificateList',JSON.stringify(certificateList))
				// uni.navigateBack({
				//     delta: 1
				// })
			},
			modiCer() {
                if(!this.cValue){
                	return uni.showToast({
                        icon:'none',
                		title:'请输入证书'
                	})
                }
                if(this.cValue.length<2||this.cValue.length>20){
                    return uni.showToast({
                        icon:'none',
                    	title:'请输入证书字数在2-20以内'
                    })
                }
                if(!this.gain_time){
                	return uni.showToast({
                        icon:'none',
                		title:'请选择获取时间'
                	})
                }
				this.$http.get(apiName.MOD_CERTIFICATE,{
					params: {
						token:this.token?this.token:'',
						id:parseInt(this.certificateInfo.id),
						name:this.cValue,
						time:this.gain_time
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
					}
				})
				// var time=this.timeList[this.obj.getTime].value
				// var mode=this.mode
				// var list=sessionStorage.getItem('certificateList')
				// var certificateList=list?JSON.parse(list):[]
				// if(mode==='add'){
				// 	certificateList.push({
				// 		id: parseInt(Math.random() * 600),
				// 		certificate_name: this.cValue,
				// 		gain_time: this.gain_time
				// 	})
				// }else {
				// 	certificateList.map(item=>{
				// 		if(item.id==this.lib.params.id){
				// 			item.certificate_name=name,
				// 			item.gain_time=time
				// 		}
				// 	})
				// }
				// sessionStorage.setItem('certificateList',JSON.stringify(certificateList))
				// uni.navigateBack({
				//     delta: 1
				// })
			},
			deltCer() {
				this.$http.get(apiName.DEL_CERTIFICATE,{
					params: {
						token:this.token?this.token:'',
						id:parseInt(this.certificateInfo.id)
					}
				}).then(res=>{
					if(res.data.success){
						console.log(res)
						uni.switchTab({
						    url: '/pages/person/resume/resume'
						});
					}
				})
				// var name=this.cValue
				// var time=this.timeList[this.obj.getTime].value
				// var mode=this.mode
				// var list=sessionStorage.getItem('certificateList')
				// var certificateList=list?JSON.parse(list):[]
				// certificateList=certificateList.filter(item=>{
				// 	return item.certificate_name!=name
				// })
				// sessionStorage.setItem('certificateList',JSON.stringify(certificateList))
				// uni.navigateBack({
				//     delta: 1
				// })
			}
		}
	}
</script>

<style scoped>
    .title:after {
            content: '';
            width: 100%;
            display: inline-block;
        }
    .qxz{
    font-size: 30rpx;
    color: #ccc;
    }
    .icon-morex{
        color: #ccc!important;
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
.psgSeekHead {width: 100%; margin-top:var(--status-bar-height);}
.placeholderStyle {color: #ccc;}
.psgSeekHead .psgSeekBg {padding: 16rpx 104rpx 16rpx 90rpx;position: relative;}
.psgSeekHead .psgSeekBg text {line-height: 56rpx;height: 56rpx;width: 100%;text-align: center;font-size: 34rpx;color: #222;display: block;}
.psgSeekHead .psgSeekBg .getBack {display: block;width: 76rpx;height: 84rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 32rpx;line-height: 84rpx;text-align: center;color: #222;}
.certifi-item {margin-left: 30rpx;border-bottom: 2rpx solid #f3f3f3;padding-top: 2rpx;display: flex;position: relative;}
.certifi-item .title {font-size: 30rpx;color: #555;width: 180rpx;display: inline-block;height: 90rpx;line-height: 90rpx;text-align:justify;text-align-last:justify}
.certifi-item .input {margin-left: 60rpx;margin-right: 30rpx;width: 460rpx;}
.certifi-item .input input {width: 100%;height: 90rpx;border: 0rpx;text-align: left;font-size: 30rpx;color: #222;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
/* .certifi-item .secInput {margin-left: 60rpx;width: 460rpx;} */
.secInput{
        padding-left: 30px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    width: 100% !important;
    box-sizing: border-box;
    padding-right: 10px;
}
.certifi-item .secInput .secBox {line-height: 90rpx; width: 100%;height: 90rpx;border: 0rpx;text-align: left;font-size: 30rpx;color: #222;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.certifi-item .secInput .i {position: absolute;top: 34rpx;right: 30rpx;color: #ccc;font-size: 28rpx;}
.personal_infor .fSave {padding: 80rpx 30rpx 0 30rpx;}
.personal_infor .save {width: 100%;background-color: #fb5958;height: 90rpx;text-align: center;line-height: 90rpx;border-radius: 8rpx;font-size: 34rpx;color: #fff;}
.personal_infor .delt {width: 40%;height: 90rpx;line-height: 90rpx;text-align: center;font-size: 34rpx;color: #666;background: #f7f7f7;border-radius: 8rpx;}
.personal_infor .modi {width: 55%;height: 90rpx;line-height: 90rpx;text-align: center;font-size: 34rpx;background-color: #fb5958;color: #fff;border-radius: 8rpx;}
.personal_infor .bbox {display: flex;justify-content: space-between;}
</style>
