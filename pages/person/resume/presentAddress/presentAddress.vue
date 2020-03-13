<template>
	<view class="presentAddress">
        <view class="status_bar">
        	<view class="top_view"></view>
        </view>
		<view class="psgSeekHead">
			<view class="psgSeekBg">
				<text>{{nav_title}}</text>
				<view class="sure" @tap="seleCity">确定</view>
				<view class="icon iconfont icon-backtrackx back getBack" @click="goback"></view>
			</view>
		</view>
		<view class="ptworkPlace">
			<view class="yiXuan">已选</view>
			<view class="yiAddress" v-for="(item,index) in choosedAddress" :key="index" v-if="choosedAddress.length>0">{{ item.name }}<view class="icon iconfont icon-icon-AI-_-" @click="detAddress(index)"></view></view>
		</view>
		<view class="secAddress">
			<view class="province" v-for="(item,index2) in provinceData" :key="index2" v-if="seleCityGroup== 1 ">
				<view class="province_sm" @click="provinceEvent(item.value,item.not_select,item.label)">{{ item.label }}<view :class="['icon','iconfont',item.not_select?'':'iconjob_reward_morex','i']"></view></view>
			</view>
			<view class="province" v-for="(item,index3) in cityData" :key="index3" v-if="seleCityGroup== 2 ">
				<view class="province_sm" @click="cityEvent(item.value,item.not_select,item.label)">{{ item.label }}<view :class="['icon','iconfont',item.not_select?'':'iconjob_reward_morex','i']"></view></view>
			</view>
			<view class="cityGroupList-li" v-if="seleCityGroup== 3 " v-for="(item,index4) in areaData" :key="index4" @click="areaEvent(item)">{{ item.label }}
				<!-- <view class="province_sm" @click="areaEvent(item)">{{ item.label }}</view> -->
				<view v-show="cityCode.indexOf(item.value)!==-1" class="icon iconfont icon-icon-kuaimi_drop_down_hook_icon chooseSalaryIcon"></view>
                <!-- icon iconfont icon-icon-kuaimi_drop_down_hook_icon chooseSalaryIcon -->
				<!-- &&cityActive==index4 -->
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
                nav_title:'',
				address_type:'',
				cityCode:[],
				seleCityGroup:1,
				choosedAddress: [],
				provinceData: [],
				cityData: [],
				areaData: [],
				proviceShow: true,
				cityShow: false,
				areaShow:false
			}
		},
		onLoad(options) {
            if(options.params){
			var data=JSON.parse(options.params)
            console.log('地址类型',data)
			this.address_type = data.type
            if(data.type=='nowLive'||data.type=='addnowLive'){
                this.nav_title = '现居地址'
            }else{
                this.nav_title = '工作地点'
            }
            if(data.plac&&data.plac.length>0){
                data.plac.forEach(item=>{
                	this.cityCode.push(item.value)
                })
                this.choosedAddress = data.plac
            }
            }
			console.log('最新的地区',this.choosedAddress)
			this.$http.get(apiName.AREACOMMONV2).then(res=>{
				if(res.data.success){
					this.provinceData=res.data.data
					// console.log('请求地区成功',this.provinceData)
				}else {
					console.log('请求地区失败')
				}
			}).catch(err=>{
				throw err
			})
		},
		computed: {
			...mapState(['presentAddress','newLiveAddress','addnowLive','addworkAddress'])
		},
		methods:{
			...mapMutations(['addPresentAddress','addnewLiveAddress','setaddnowLive','setaddworkAddress']),
			seleCity(){
                if(this.choosedAddress.length<1){
                    if(this.nav_title == '现居地址'){
                        return uni.showToast({
                            icon:'none',
                        	title:'请选择现居住地址'
                        }) 
                    }else{
                       return uni.showToast({
                           icon:'none',
                       	title:'请选择工作地点'
                       }) 
                    }
                }
				if(this.address_type=='expec_areas'){
					this.addPresentAddress(this.choosedAddress)
                    uni.setStorageSync('fromSeleAddre', 'true');
						uni.switchTab({
						    url: '../resume?fromSeleAddre=true'
						});
					console.log('现在期望的城市',this.presentAddress)
				}else if(this.address_type=='addworkAddress'){
                    uni.setStorageSync('fromselemateril', 'true');
					this.setaddworkAddress(this.choosedAddress)
						uni.reLaunch({
						    url: '../../../material/material?fromselemateril=true'
						});
					// console.log('现在期望的城市',this.addworkAddress)
				}else if(this.address_type=='addnowLive'){
                    uni.setStorageSync('fromselemateril', 'true');
					this.setaddnowLive(this.choosedAddress)
						uni.reLaunch({
						    url: '../../../material/material?fromselemateril=true'
						});
					// console.log('现在期望的城市',this.addnowLive)
				}else{
					this.addnewLiveAddress(this.choosedAddress)
                    uni.setStorageSync('fromSeleAddre', 'true');
						uni.switchTab({
						    url: '../resume?fromSeleAddre=true'
						});
					console.log('现在居住的城市',this.newLiveAddress)
				}
				
			},
			goback() {
				// uni.navigateBack({
				// 	delta: 1
				// })
				// debugger
				let type = this.seleCityGroup 
				switch (type){
					case 1:
						uni.navigateBack({
							delta: 1
						})
						break;
					case 2:
					this.seleCityGroup = 1
						break;
					case 3:
					this.seleCityGroup = 2
						break;
					default:
						break;
				}
			},
			provinceEvent(value,select,cName) {
				this.$http.get(apiName.AREACOMMONV2,{
					params: {
						p: value
					}
				}).then(res=>{
					if(res.data.success){
						this.cityData=res.data.data
						this.seleCityGroup = 2
						console.log('请求城市成功',this.cityData)
					}else {
						console.log('请求城市失败')
					}
				}).catch(err=>{
					throw err
				})
				this.proviceShow=false
				this.cityShow=true
				// if(select){
				// 	this.addPresentAddress(cName)
				// 	uni.switchTab({
				// 	    url: '../resume'
				// 	});
				// }
				// console.log(this.presentAddress)
			},
			cityEvent(value,select,cName) {
				this.$http.get(apiName.AREACOMMONV2,{
					params: {
						p: value
					}
				}).then(res=>{
					if(res.data.success){
						this.areaData=res.data.data
						this.seleCityGroup = 3
						console.log('请求区县成功',this.areaData)
					}else {
						console.log('请求区县失败')
					}
				}).catch(err=>{
					throw err
				})
				this.cityShow=false
				this.areaShow=true
				// if(select){
				// 	this.addPresentAddress(cName)
				// 	uni.switchTab({
				// 	    url: '../resume'
				// 	});
				// }
				// console.log(this.presentAddress)
			},
			areaEvent(cName) {
				// console.log('选择的区县',cName)
				// console.log('上个页面的城市',this.choosedAddress)
				
				let aa = {}
				aa.value = cName.value
				aa.name = cName.label
				// this.choosedAddress.forEach(item=>{
				// 	if(cName.value == item.value){
				// 		return
				// 	}
				// 	if(this.choosedAddress.length>5){
				// 		this.$KM.showToast('最多只能选择5个')
				// 		this.choosedAddress.splice(5,1)
				// 	}else{
				// 		this.choosedAddress.push(aa) 
				// 	}
				// })
				let dd = Object.assign([],this.choosedAddress)
				let ff = []
				dd.forEach(item=>{
					ff.push(item.value)
				})
				// if(this.address_type=='expec_areas'){
					
						if(this.address_type=='expec_areas'|| this.address_type=='addworkAddress'){
							if(ff.indexOf(aa.value)==-1){
								this.choosedAddress.push(aa)
								if(this.choosedAddress.length>5){
									this.choosedAddress.splice(5,1)
									this.$KM.showToast('最多只能选择5个')
									return
								}
								this.cityCode.push(cName.value)
							}else{
								let idx = ff.indexOf(aa.value)
								this.choosedAddress.splice(idx,1)
								this.cityCode.splice(idx,1)
							}
						}else{
							this.choosedAddress = []
							this.choosedAddress[0] = aa
							this.cityCode = []
							this.cityCode[0] = cName.value
						}	
					
				// }else{
				// 	if(ff.indexOf(aa.value)==-1){
				// 		this.choosedAddress.push(aa)
				// 		if(this.choosedAddress.length>1){
				// 			this.choosedAddress.splice(1,1)
				// 			this.$KM.showToast('居住地只能选择1个')
				// 			return
				// 		}
				// 	}
				// }
				
				console.log(this.choosedAddress)
				// dd.map(item=>{
				// 	ff.push(item.value)
				// 	if(JSON.stringify(aa.value)==item.value){
				// 		return
				// 	}
				// 	this.choosedAddress.push(aa)
				// 	console.log(this.choosedAddress.length)
				// 	if(this.choosedAddress.length>5){
				// 		this.choosedAddress.splice(5,1)
				// 		this.$KM.showToast('最多只能选择5个')
				// 	}
				// })
				
				// uni.switchTab({
				//     url: '../resume'
				// });
				
			},
			detAddress(index) {
				this.choosedAddress.splice(index,1)
				this.cityCode.splice(index,1)
				console.log(this.choosedAddress)
			}
		}
	}
</script>

<style>
	/* .activePro{
		display: flex;
		align-items: center;
		justify-content: space-between;
	} */
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
	.cityGroupList-li{display: block;width: 100%;height: 80rpx ;line-height: 80rpx;color: #222222;border-bottom: 1rpx solid #eaeaea;font-size: 28rpx;padding: 0 20rpx;box-sizing: border-box;}
	.chooseSalaryIcon{float: right;color: #fb5958;line-height: 80rpx;color: #fb5958;font-size: 20rpx;padding-right: 20rpx;}
.psgSeekHead {width: 100%;margin-top:var(--status-bar-height);}
/*  #ifdef MP-WEIXIN */
    .psgSeekHead {width: 100%;margin-top:120rpx;}
/*  #endif  */
.placeholderStyle {color: #ccc;}
.psgSeekHead .psgSeekBg {padding: 16rpx 104rpx 16rpx 90rpx;position: relative;}
.psgSeekHead .psgSeekBg text {line-height: 56rpx;height: 56rpx;width: 100%;text-align: center;font-size: 34rpx;color: #222;display: block;}
.psgSeekHead .psgSeekBg .getBack {display: block;width: 76rpx;height: 84rpx;position: absolute;top: 0rpx;left: 0rpx;font-size: 32rpx;line-height: 84rpx;text-align: center;color: #222;}
.sure {width: 120rpx;text-align: center;position: absolute;top: 0rpx;right: 0rpx;color: #fb5958;line-height: 88rpx;font-size: 30rpx;}
.ptworkPlace {padding: 30rpx;padding-bottom: 14rpx;border-bottom: 1rpx solid #e5e8e8;}
.ptworkPlace .yiXuan {top: 0rpx;left: 0rpx;padding-bottom: 20rpx;font-size: 24rpx;color: #555555;}
.ptworkPlace .yiAddress {position: relative; display: inline-block;padding: 6rpx 60rpx 6rpx 20rpx;background: #fb5958;border: 2rpx solid #fb5958;border-radius: 50rpx;margin: 0 20rpx 4rpx 0rpx;font-size: 28rpx;color: #fff;overflow: hidden;}
.ptworkPlace .yiAddress view {cursor: pointer;position: absolute;top: 4rpx;right: 12rpx;color: #fff;width: 40rpx;height: 44rpx;line-height: 44rpx;display: block;text-align: center;font-size: 30rpx}
.province {
	/* display: flex;
	align-items: center;
	justify-content: space-between; */
	box-sizing: border-box;
	padding-left: 20rpx;
	border-bottom: 1rpx solid #f1f1f1;
	}
.province .province_sm {border-bottom: 1rpx solid #f1f1f1;height: 80rpx;line-height: 80rpx;height: 80rpx;font-size: 28rpx;color: #2b3233;position: relative;}
.province .province_sm .i {position: absolute;top: 0rpx;right: 20rpx;line-height: 80rpx;color: #999;font-size: 28rpx;}

</style>
