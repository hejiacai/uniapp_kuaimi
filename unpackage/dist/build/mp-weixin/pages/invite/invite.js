<<<<<<< .mine
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/invite/invite"],{"360f":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},"3d4d":function(t,n,e){"use strict";var a=e("3dc4"),i=e.n(a);i.a},"3dc4":function(t,n,e){},"9cef":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("a7a3"));function i(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{pageNum:1,jobList:[]}},created:function(){this.getInviteList()},computed:{},methods:{onReachBottom:function(){this.getInviteList()},toDetail:function(n){t.navigateTo({url:"/pages/inviteDetail/inviteDetail?id=".concat(n)})},goBack:function(){t.navigateBack()},getInviteList:function(){var t=this;this.$http.post("",{params:{ver:"v1.0",apiname:a.default.INVITE_LIST,token:"s79hu1192814",page_pageno:this.pageNum,page_pagesize:10}}).then(function(n){var e=n.data.data,a=t.jobList;t.pageNum=t.pageNum+1,t.jobList=a.concat(e)}).catch(function(t){console.log(t)})}}};n.default=u}).call(this,e("543d")["default"])},a009:function(t,n,e){"use strict";e.r(n);var a=e("9cef"),i=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=i.a},dd11:function(t,n,e){"use strict";e.r(n);var a=e("360f"),i=e("a009");for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);e("3d4d");var c=e("2877"),o=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,"cab3aff8",null);n["default"]=o.exports},fafc:function(t,n,e){"use strict";(function(t){e("2887"),e("921b");a(e("66fd"));var n=a(e("dd11"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["fafc","common/runtime","common/vendor"]]]);||||||| .r0
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/invite/invite"],{"0454":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"0d0d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2f62"),i=o(n("2218"));function o(t){return t&&t.__esModule?t:{default:t}}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){r(t,e,n[e])})}return t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={data:function(){return{pageNum:1,jobList:[{invite_id:"1",company_name:"信驰科技",station:"黄泥磅",auditiontime:"2020-01-10"},{invite_id:"1",company_name:"伟鑫科技",station:"大坪",auditiontime:"2020-01-12"}]}},onShow:function(){this.getInviteList()},computed:u({},(0,a.mapState)(["token","presentAddress","jobCategory","indexSearchJob"])),methods:{toDetail:function(e){t.navigateTo({url:"/pages/inviteDetail/inviteDetail?id=".concat(e)})},goBack:function(){t.navigateBack()},getInviteList:function(){var t=this;this.$http.post(i.default.INVITE_LIST,{params:{token:this.token,page_pageno:this.pageNum,page_pagesize:10}}).then(function(e){if(e.data.data){var n=e.data.data,a=t.jobList;t.pageNum=t.pageNum+1,t.jobList=a.concat(n)}}).catch(function(t){console.log(t)})}}};e.default=c}).call(this,n("543d")["default"])},"2b69":function(t,e,n){"use strict";(function(t){n("0da9"),n("921b");a(n("66fd"));var e=a(n("c37e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},8436:function(t,e,n){"use strict";n.r(e);var a=n("0d0d"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},aa73:function(t,e,n){},b5d9:function(t,e,n){"use strict";var a=n("aa73"),i=n.n(a);i.a},c37e:function(t,e,n){"use strict";n.r(e);var a=n("0454"),i=n("8436");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("b5d9");var u=n("2877"),r=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,"68a4a080",null);e["default"]=r.exports}},[["2b69","common/runtime","common/vendor"]]]);>>>>>>> .r171536
