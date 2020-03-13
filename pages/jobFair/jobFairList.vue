<template>
	
	<view class='jobFair3_wrap'>
	    <view class='jobFair3_bd'>
	        <view class='jobFair3_list' v-for="(item,index) in listAry" :key="index">
	            <view class='sub_jobfair01'>{{ item.station }}</view>
	            <view class='sub_jobfair02'>{{ item.content }}</view>
	        </view>
			
			<view class='noData' v-show="noData">
				<image src="../../static/img/icon_nocontent.png" mode=""></image>
				<text>暂无数据...</text>
			</view>
			
	    </view>
		
		<view class="jobCategoryWap">
			<view class="jobCategory">
				<view class="jobCategoryElect">最多选择<text>5</text>个</view>
				<view class="jobCategoryAdd">
					<view class="jobCategoryAddx" v-for="(item,index) in jobCategoryAdd" :key="index" @click="cateGoryDel(index,item.item1,item.item2)">
						{{ item.name }}<text>x</text>
					</view>
				</view>
			</view>
			<view class="jobCategoryList">
				<view class="jobCategoryListx" v-for="(item,index) in jobCategory" :key="index">
					<text class="jobCategoryTit">{{ item.infoName }}</text>
					<view class="jobCategoryLm" >
						<text v-for="(i,n) in item.infoJob" :class="i.state == 1 ? 'cut':''" @click="cateGoryBtn(index,n,i.id)">{{ i.name }}{{ n }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cateGorySave" @click="cateGorySave">
			<text>保存</text>
		</view>
		<view class="cateGoryInput">
			{{ jobCategorySaveStr }}
		</view>
	    
	</view>
</template>

<script>
	import apiName from '../../static/commonjs/request/apiName.js';
export default {
	data() {
		return {
			isShow:false,
			listAry:null,
			noData: false,
			imgAry:[],
			state:null,
			jobCategory:[
				{
					infoName:'超市/百货/零售',
					infoJob:[
						{
							name:'促销导购',
							id:'1001',
							state:0
						},
						{
							name:'营业员',
							id:'1002',
							state:0
						},
						{
							name:'收银员',
							id:'1003',
							state:0
						},
						{
							name:'理货员',
							id:'1004',
							state:0
						},
						{
							name:'防损员',
							id:'1005',
							state:0
						}
					]
				},
				{
					infoName:'汽车维修/服务',
					infoJob:[
						{
							name:'汽车美容',
							id:'2001',
							state:0
						},
						{
							name:'洗车工',
							id:'2002',
							state:0
						},
						{
							name:'机电维修',
							id:'2003',
							state:0
						},
						{
							name:'维修钣金工',
							id:'2004',
							state:0
						},
						{
							name:'维修漆工',
							id:'2005',
							state:0
						}
					]
				},
				{
					infoName:'休闲/娱乐',
					infoJob:[
						{
							name:'调酒师',
							id:'3001',
							state:0
						},
						{
							name:'按摩师',
							id:'3002',
							state:0
						},
						{
							name:'足疗师',
							id:'3003',
							state:0
						},
						{
							name:'针灸推拿',
							id:'3004',
							state:0
						}
					]
				}
			],
			jobCategoryAdd:[],
			jobCategorySaveStr:''
		}
	},
	onLoad(options){
		var _this = this;
		uni.setNavigationBarTitle({
		    title: options.companyName
		});
		uni.showLoading({
		    title: '加载中'
		});
		_this.$http.post(apiName.FAIR_COMPANYDETAIL,{
			params:{
				date:options.date,
				companyflag:options.companyFlag,
			}
		}).then(res => {
			uni.hideLoading();
			if(res.data.success){
				_this.listAry = res.data.data.all_jobs;
			}else{
				_this.noData = true;
			}
		}).catch(err => {
			console.log('出错了');
		})
	},
	methods: {
		//多个选择
		cateGoryBtn(item1,item2,id){
			let _this = this;
			if(_this.jobCategory[item1].infoJob[item2].state == 0){
				_this.jobCategory[item1].infoJob[item2].state = 1;
				let jobCategoryObj = {
					name: _this.jobCategory[item1].infoJob[item2].name,
					item1:item1,
					item2:item2,
					id:id
				}
				_this.jobCategoryAdd.push(jobCategoryObj);
			}else{
				
				_this.jobCategory[item1].infoJob[item2].state = 0;
				var jobCategoryAdd = _this.jobCategoryAdd;
				for(var i = 0; i < jobCategoryAdd.length;i++){
					if(jobCategoryAdd[i].id == id){
						jobCategoryAdd.splice(i,1);
					}
				}
				_this.jobCategoryAdd = jobCategoryAdd;
			}
			console.log(_this.jobCategoryAdd);
			if(_this.jobCategoryAdd.length > 5){
				this.$KM.showToast('最多只能选择5个类别');
				_this.jobCategory[item1].infoJob[item2].state = 0;
				_this.jobCategoryAdd.splice(5,1);
			}
		},
		//删除当前ID
		cateGoryDel(index,item1,item2){
			this.jobCategoryAdd.splice(index,1);
			this.jobCategory[item1].infoJob[item2].state = 0;
		},
		//保存的数据
		cateGorySave(){
			var cateGorySaveAryx = [];
			for(var i=0;i < this.jobCategoryAdd.length;i++){
				cateGorySaveAryx.push(this.jobCategoryAdd[i].name); 
			}
			var cateGorySaveStrx = cateGorySaveAryx.join(',');
			this.jobCategorySaveStr = cateGorySaveStrx;
		}
	}
}	
</script>

<style>
	.uploadImg{width:200rpx; height:100rpx; border:1rpx solid #eee; text-align: center; line-height: 100rpx; font-size: 24rpx;}
	.choseImg{width:100rpx;height: 100rpx;float: left; background: #eee; margin-right: 20rpx;}
	.choseImg image{ display: block; width:100rpx;height: 100rpx;}
	.choseImg text{font-size: 12px; color:#f00}
.jobFair3_list{ padding-left: 30rpx; overflow: hidden; border-bottom:10rpx solid #f1f1f1;}
.sub_jobfair01{ width:100%; overflow: hidden; padding:15rpx 0; color: #333; font-size: 32rpx; border-bottom: 1rpx solid #f1f1f1;}
.sub_jobfair02{ padding: 20rpx 0; padding-right: 20rpx; color: #666; font-size: 28rpx;}

.jobCategory{ padding: 30rpx; border-bottom: 10rpx solid #f1f1f1; overflow: hidden;}
.jobCategoryElect{ font-size: 28rpx; color: #222;}
.jobCategoryElect text{ color: #fb5958;}
.jobCategoryAdd{ overflow: hidden; padding-top: 20rpx;}
.jobCategoryAddx{ float: left; background: #fb5958; color: #fff; font-size: 28rpx; padding:12rpx 20rpx; border-radius: 50rpx; margin: 0 20rpx 14rpx 0;}
.jobCategoryAddx text{ padding-left: 10rpx;}
.jobCategoryList{ padding: 30rpx; padding-top: 0; overflow: hidden;}
.jobCategoryTit{ display: block;font-size: 30rpx; color: #222; padding:30rpx 0 30rpx 0;} 
.jobCategoryLm{ overflow: hidden;}
.jobCategoryLm text{ display: inline-block; padding: 12rpx 30rpx; background: #eee; color: #222; font-size: 26rpx; margin:0 20rpx 20rpx 0; border-radius: 50rpx;}
.jobCategoryLm text.cut{ background:#fb5958; color: #fff;}
.cateGorySave{ padding: 30rpx; overflow: hidden; border-top: 1rpx solid #f1f1f1;}
.cateGorySave text{ display: block;width:100%; height: 88rpx; line-height: 88rpx; text-align: center; font-size: 34rpx; color: #fff; background: #fb5958; border-radius: 8rpx;}
.cateGoryInput{ margin: 30rpx; border: 1rpx solid #ccc; height: 66rpx; line-height: 66rpx; text-indent: 10rpx;}
</style>
