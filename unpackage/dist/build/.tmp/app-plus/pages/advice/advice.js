(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/advice/advice"],{"1b13":function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=c(n("a7a3"));function c(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{message:""}},computed:{num:function(){return this.message.length}},methods:{goBack:function(){t.navigateBack()},submit:function(){this.$http.post("",{params:{ver:"v1.0",apiname:u.default.CALLBACK_ADVISE,token:"s79hu1192814",content:this.message}}).then(function(e){e.data.success&&t.showToast({title:e.data.msg,mask:!0})}).catch(function(t){console.log(a(t," at pages\\advice\\advice.vue:50"))})}}};e.default=o}).call(this,n("6e42")["default"],n("0de9")["default"])},"1ea4":function(t,e,n){"use strict";n.r(e);var a=n("1b13"),u=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=u.a},"4ca8":function(t,e,n){},"67be":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},"950e":function(t,e,n){"use strict";(function(t){n("2887"),n("921b");a(n("66fd"));var e=a(n("bc27"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},bc27:function(t,e,n){"use strict";n.r(e);var a=n("67be"),u=n("1ea4");for(var c in u)"default"!==c&&function(t){n.d(e,t,function(){return u[t]})}(c);n("ea35");var o=n("2877"),i=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,"36c11587",null);e["default"]=i.exports},ea35:function(t,e,n){"use strict";var a=n("4ca8"),u=n.n(a);u.a}},[["950e","common/runtime","common/vendor"]]]);