(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"17e3":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return o})},"18af":function(e,t,n){},"1c0c":function(e,t,n){"use strict";n.r(t);var a=n("17e3"),o=n("6e1a");for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);n("c599");var s=n("2877"),i=Object(s["a"])(o["default"],a["a"],a["b"],!1,null,"83eb734a",null);t["default"]=i.exports},"2e45":function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(n("a7a3")),r=n("2f62");function s(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){c(e,t,n[t])})}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={data:function(){return{codeImage:"",seed:"",telNum:"",imgcode:"",verCode:"",cdtime:60,verText:"获取验证码",vartextArr:["获取验证码","秒后可重新获取","重新获取验证码"],sendVerStatus:0,is_sweep_red_code:!1,url:"",register_info_is_sync_hbinfo:!1}},onLoad:function(){this.getSeed()},onShow:function(){},computed:i({},(0,r.mapState)(["token"])),methods:i({},(0,r.mapMutations)(["setToken"]),{getSeed:function(){var t=this;t.$http.get(o.default.GET_SEED+"&=",{}).then(function(n){n.data.success?(t.seed=n.data.data.seed,t.codeImage="http://blueuniapp.hb.com/index?ver=v1.0&apiname=getImgCode&seed="+t.seed):console.log(e("出错了",n.data.msg," at pages\\login\\login.vue:78"))}).catch(function(t){console.error(e("出错了",t," at pages\\login\\login.vue:81"))})},getVerCode:function(){var t=this;""!=t.telNum?(""==t.imgcode&&t.$KM.showToast("请输入图片验证码"),""==t.seed&&t.$KM.showToast("seed为空"),t.$http.post(o.default.SEND_LOG_CODE,{params:{mobile_phone:parseInt(t.telNum),imgcode:t.imgcode,hidSeed:t.seed}}).then(function(n){n.data.success?(console.log(e("发送成功",n.data.data," at pages\\login\\login.vue:106")),t.sendVerStatus=1,t.verText=t.cdtime+t.vartextArr[t.sendVerStatus],t.countdown()):(t.getSeed(),t.$KM.showToast(n.data.msg))}).catch(function(t){console.error(e("出错了",t," at pages\\login\\login.vue:116"))})):t.$KM.showToast("请输入手机号")},loginRequest:function(){var t=this;""!=t.telNum?(""==t.verCode&&t.$KM.showToast({title:"请输入手机验证码"}),t.$http.post(o.default.LOGIN_DO,{params:{mobile_phone:t.telNum,authCode:t.verCode,fromurl:"",area_id:"0300",is_weixin:"false",weixin_kuaimi_openid:"",weixin_kuaimi_nickname:""}}).then(function(n){if(console.log(e("登录请求",n.data," at pages\\login\\login.vue:139")),n.data.success){console.log(e("登录成功",n.data," at pages\\login\\login.vue:141"));var o=n.data.data;switch(t.setToken(o.token),console.error(e("stor token",t.token," at pages\\login\\login.vue:145")),t.is_sweep_red_code=o.is_sweep_red_code,t.url=o.url,t.register_info_is_sync_hbinfo=o.register_info.is_sync_hbinfo,t.$KM.showToast("登录成功","success"),n.data.data.return_type){case 1:a.navigateTo({url:"../material/material"});break;case 2:var r={mode:"add"};r=JSON.stringify(r),a.navigateTo({url:"../person/resume/workexp/workexp?params=".concat(r)});break;default:a.switchTab({url:"/pages/index/index"});break}}else console.log(e("登录失败",n.data.msg," at pages\\login\\login.vue:173")),t.$KM.showToast(n.data.msg)}).catch(function(n){console.error(e("出错了",n," at pages\\login\\login.vue:178")),t.$KM.showToast(res.data.msg)})):t.$KM.showToast({title:"请输入手机号"})},countdown:function(){var e=this,t=setInterval(function(){e.cdtime>0?(e.cdtime--,e.verText=e.cdtime+e.vartextArr[e.sendVerStatus]):(clearInterval(t),e.cdtime=60,e.sendVerStatus=2,e.verText=e.vartextArr[e.sendVerStatus],e.getSeed())},1e3)},goIndex:function(){a.switchTab({url:"/pages/index/index"})}})};t.default=u}).call(this,n("0de9")["default"],n("6e42")["default"])},"6e1a":function(e,t,n){"use strict";n.r(t);var a=n("2e45"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=o.a},c599:function(e,t,n){"use strict";var a=n("18af"),o=n.n(a);o.a},ffcc:function(e,t,n){"use strict";(function(e){n("2887"),n("921b");a(n("66fd"));var t=a(n("1c0c"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["ffcc","common/runtime","common/vendor"]]]);