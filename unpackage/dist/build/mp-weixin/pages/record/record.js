<<<<<<< .mine
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/record/record"],{"036d":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})},4135:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=o(e("a7a3"));function o(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{jobList:[],pageNum:1}},created:function(){this.getJobs()},computed:{},methods:{toDetail:function(n){t.navigateTo({url:"/pages/jobDetail/jobDetail?job_flag=".concat(n)})},goBack:function(){t.navigateBack()},onReachBottom:function(){this.getJobs()},getJobs:function(){var t=this;this.$http.post("",{params:{ver:"v1.0",apiname:"apply_list",token:"s79hu1192814",page_pageno:this.pageNum,page_pagesize:10}}).then(function(n){var e=n.data.data,a=t.jobList;t.pageNum=t.pageNum+1,t.jobList=a.concat(e)}).catch(function(t){console.log(t)})},delRecord:function(n){var e=this;t.showModal({title:"提示",content:"撤销后7日内不能再次投递哟，投递后如需修改简历请在简历处直接修改，系统将自动同步给企业？",cancelColor:"#999",confirmColor:"#fa5657",success:function(o){o.confirm&&e.$http.post("",{params:{ver:"v1.0",apiname:a.default.DEL_APPLY,token:"s79hu1192814",apply_id:n}}).then(function(n){n.data.success&&(t.showToast({title:n.data.msg,mask:!0}),e.jobList=[],e.pageNum=0,e.getJobs())}).catch(function(t){console.log(t)})}})}}};n.default=c}).call(this,e("543d")["default"])},"43b2":function(t,n,e){},6113:function(t,n,e){"use strict";var a=e("43b2"),o=e.n(a);o.a},"8e21":function(t,n,e){"use strict";e.r(n);var a=e("4135"),o=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,function(){return a[t]})}(c);n["default"]=o.a},afb5:function(t,n,e){"use strict";e.r(n);var a=e("036d"),o=e("8e21");for(var c in o)"default"!==c&&function(t){e.d(n,t,function(){return o[t]})}(c);e("6113");var u=e("2877"),i=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,"78819fe0",null);n["default"]=i.exports},c865:function(t,n,e){"use strict";(function(t){e("2887"),e("921b");a(e("66fd"));var n=a(e("afb5"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["c865","common/runtime","common/vendor"]]]);||||||| .r0
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/record/record"],{"3adc":function(t,e,n){"use strict";n.r(e);var a=n("be07"),o=n("8e57");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("7621");var r=n("2877"),i=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"a3b4f6f4",null);e["default"]=i.exports},"69a7":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2f62"),o=c(n("2218"));function c(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){i(t,e,n[e])})}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={data:function(){return{jobList:[{create_time:"2020-01-10",apply_id:"01",job_flag:"0310",company_name:"信驰科技",station:"茶园",apply_during:[{time:"2020-01-01",text:"一般般"}]},{create_time:"2020-01-11",apply_id:"02",job_flag:"0311",company_name:"伟鑫科技",station:"大坪",apply_during:[{time:"2020-01-02",text:"很一般"}]}],pageNum:1}},created:function(){this.getJobs()},computed:r({},(0,a.mapState)(["token","presentAddress","jobCategory","indexSearchJob"])),methods:{toDetail:function(e){t.navigateTo({url:"/pages/jobDetail/jobDetail?job_flag=".concat(e)})},goBack:function(){t.navigateBack()},onReachBottom:function(){this.getJobs()},getJobs:function(){var t=this;this.$http.post(o.default.APPLY_LIST,{params:{token:this.token,page_pageno:this.pageNum,page_pagesize:10}}).then(function(e){if(e.data.data){var n=e.data.data,a=t.jobList;t.pageNum=t.pageNum+1,t.jobList=a.concat(n)}}).catch(function(t){console.log(t)})},delRecord:function(e){var n=this;t.showModal({title:"提示",content:"撤销后7日内不能再次投递哟，投递后如需修改简历请在简历处直接修改，系统将自动同步给企业？",cancelColor:"#999",confirmColor:"#fa5657",success:function(a){a.confirm&&n.$http.post(o.default.DEL_APPLY,{params:{token:n.token,apply_id:e}}).then(function(e){e.data.success&&(t.showToast({title:e.data.msg,mask:!0}),n.jobList=[],n.pageNum=0,n.getJobs())}).catch(function(t){console.log(t)})}})}}};e.default=u}).call(this,n("543d")["default"])},7621:function(t,e,n){"use strict";var a=n("bb97"),o=n.n(a);o.a},"8e57":function(t,e,n){"use strict";n.r(e);var a=n("69a7"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=o.a},bb97:function(t,e,n){},be07:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},fd79:function(t,e,n){"use strict";(function(t){n("0da9"),n("921b");a(n("66fd"));var e=a(n("3adc"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["fd79","common/runtime","common/vendor"]]]);>>>>>>> .r171536
