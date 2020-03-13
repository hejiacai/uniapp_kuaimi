
/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{参数类型}参数名 参数说明
 *@return {返回值类型} 返回值说明
*/
/*
 * @method showToast
 * @param{string}title 提示的内容，长度与 icon 取值有关。
 * @param{string}position value: top center bottom   5+App 
 * @param{string}icon 图标，value: success loading none
 * @param{string}image 自定义图标的本地路径 5+App、H5、微信小程序、百度小程序
 * @param{string}mask 是否显示透明蒙层，防止触摸穿透，默认：false
 * @param{string}duration 提示的延迟时间，单位毫秒，默认：1500
 */
var showToast = function (title, icon='none', position='center', image='', mask=false, duration=2000) {
	uni.showToast({
		title: title,
		icon: icon,
		position: position,
		image: image,
		mask: mask,
		duration: duration
	})
}
var getStorage = function(name){
	let value = null;
	uni.getStorage({
		key: name,
		success: (res)=>{
			console.log('getStorage->',res.data);
			if(res.data !=''){
				value = res.data
			}
		},
		fail: (err) => {
			console.error('getToken fail msg->',err.errMsg)
		}
	})
	return value;
}
var setStorage = function(name,value){
	uni.setStorage({
		key: name,
		data: value,
		success: (res) => {
			console.log(res.errMsg);
		}
	})
}
export default {
	showToast,
	getStorage,
	setStorage,
}