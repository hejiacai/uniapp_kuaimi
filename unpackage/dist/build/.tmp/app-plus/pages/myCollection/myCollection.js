(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myCollection/myCollection"],{"22ee":function(t,e,n){"use strict";(function(t){n("2887"),n("921b");a(n("66fd"));var e=a(n("7559"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},4099:function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{titles:[{name:"职位收藏",status:!0,apiName:"jobs_collection"},{name:"企业收藏",status:!1,apiName:"company_collection"}],jobs:[],apiName:"jobs_collection",pageNum:1}},created:function(){this.collect()},onLoad:function(){},computed:{},methods:{toDetail:function(e){console.log(t(e," at pages\\myCollection\\myCollection.vue:65")),n.navigateTo({url:"/pages/jobDetail/jobDetail?job_flag=".concat(e)})},goBack:function(){n.navigateBack()},onReachBottom:function(){this.collect()},nav:function(e){console.log(t(e," at pages\\myCollection\\myCollection.vue:77"))},checkHead:function(t){this.titles.map(function(e){e.name==t.name?e.status=!0:e.status=!1}),this.apiName=t.apiName,this.pageNum=1,this.jobs=[],this.collect()},collect:function(){var e=this;this.$http.post("",{params:{ver:"v1.0",apiname:this.apiName,token:"s79hu1192814",page_pageno:this.pageNum,page_pagesize:10}}).then(function(t){var n=t.data.data,a=e.jobs;e.pageNum=e.pageNum+1,e.jobs=a.concat(n)}).catch(function(e){console.log(t(e," at pages\\myCollection\\myCollection.vue:107"))})}}};e.default=a}).call(this,n("0de9")["default"],n("6e42")["default"])},6029:function(t,e,n){},7559:function(t,e,n){"use strict";n.r(e);var a=n("7dd0"),o=n("b989");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("7f39");var i=n("2877"),u=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"7d4a2a08",null);e["default"]=u.exports},"7dd0":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"7f39":function(t,e,n){"use strict";var a=n("6029"),o=n.n(a);o.a},b989:function(t,e,n){"use strict";n.r(e);var a=n("4099"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=o.a}},[["22ee","common/runtime","common/vendor"]]]);