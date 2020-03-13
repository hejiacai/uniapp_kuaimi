import Vue from 'vue'
import App from './App'
import {
	http
} from '@/static/commonjs/request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改

import GlobalV from '@/static/commonjs/eventList/eventList.js'

Vue.prototype.$GlobalV = GlobalV
Vue.prototype.$http = http
Vue.config.productionTip = false

import store from './store'
Vue.prototype.$store = store

import KM from '@/static/commonjs/KM/KM.js';
Vue.prototype.$KM = KM
App.mpType = 'app'

Vue.prototype.$scrollOffset = function(){
	return new Promise((resolve,reject)=>{
		uni.createSelectorQuery().selectViewport().scrollOffset(res => res ? resolve(res):reject('获取滚动距离失败')
		  // console.log("竖直滚动位置" + res.scrollTop);
		).exec();
	})
}
Vue.prototype.$location = function(selector) { // 获取元素宽高位置信息
	return new Promise((resolve, reject) => {
		uni.createSelectorQuery().in(this).select(selector).boundingClientRect(data => data ? resolve(data) : reject(
			'元素不存在')).exec()
	})
}
const app = new Vue({
	KM,
	store,
	...App
})
app.$mount()
