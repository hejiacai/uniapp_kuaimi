<<<<<<< .mine
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jobFair/jobFairSearch"],{"17c4":function(t,a,n){"use strict";n.r(a);var e=n("68bb"),o=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(a,t,function(){return e[t]})}(r);a["default"]=o.a},"439b":function(t,a,n){"use strict";var e=n("a3ab"),o=n.n(e);o.a},"68bb":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=o(n("a7a3"));function o(t){return t&&t.__esModule?t:{default:t}}function r(t){return l(t)||u(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function l(t){if(Array.isArray(t)){for(var a=0,n=new Array(t.length);a<t.length;a++)n[a]=t[a];return n}}var c=function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"f650"))},d={components:{uniLoadMore:c},data:function(){return{page:1,totalPage:1,inputValue:"",isLoandMore:!1,noData:!1,jobFairAry:null,loandMore:"more",optionsTitle:"招聘会搜索"}},onReachBottom:function(){this.onReachMore()},onLoad:function(a){var n=this;n.optionsDate=a.date,n.inputValue=a.jobName,n.$http.post(e.default.FAIR_SEARCH,{params:{date:a.date,jobName:a.jobName,page:n.page}}).then(function(a){a.data.success&&a.data.data.job_list?(a.data.data.job_list.length>5&&(n.isLoandMore=!0),t.setNavigationBarTitle({title:a.data.data.fairtitle}),n.jobFairAry=a.data.data.job_list,n.totalPage=a.data.data.totalPage):n.noData=!0}).catch(function(t){console.log("出错了")})},methods:{onReachMore:function(){var t=this,a=t.totalPage,n=t.page;n++,n<=a?(t.loandMore="loading",t.$http.post(e.default.FAIR_SEARCH,{params:{date:t.optionsDate,jobName:t.inputValue,page:n}}).then(function(a){var e;(e=t.jobFairAry).push.apply(e,r(a.data.data.job_list)),t.page=n}).catch(function(t){console.log("翻页出错了")})):t.loandMore="noMore"},onKeyInput:function(t){this.inputValue=t.target.value},search:function(){var a=this;t.redirectTo({url:"../jobFair/jobFairSearch?date="+a.optionsDate+"&jobName="+a.inputValue+"&title="+a.optionsTitle})}}};a.default=d}).call(this,n("543d")["default"])},9570:function(t,a,n){"use strict";n.r(a);var e=n("bae8"),o=n("17c4");for(var r in o)"default"!==r&&function(t){n.d(a,t,function(){return o[t]})}(r);n("439b");var i=n("2877"),u=Object(i["a"])(o["default"],e["a"],e["b"],!1,null,null,null);a["default"]=u.exports},a3ab:function(t,a,n){},bae8:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},o=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return o})},bf0c:function(t,a,n){"use strict";(function(t){n("2887"),n("921b");e(n("66fd"));var a=e(n("9570"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,n("543d")["createPage"])}},[["bf0c","common/runtime","common/vendor"]]]);||||||| .r0
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jobFair/jobFairSearch"],{1933:function(t,a,n){"use strict";(function(t){n("0da9"),n("921b");e(n("66fd"));var a=e(n("def2"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,n("543d")["createPage"])},"1d52":function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},o=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return o})},2453:function(t,a,n){},"73a7":function(t,a,n){"use strict";n.r(a);var e=n("9bc2"),o=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(a,t,function(){return e[t]})}(r);a["default"]=o.a},"9bc2":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=o(n("2218"));function o(t){return t&&t.__esModule?t:{default:t}}function r(t){return c(t)||u(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(t){if(Array.isArray(t)){for(var a=0,n=new Array(t.length);a<t.length;a++)n[a]=t[a];return n}}var l=function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"e451"))},d={components:{uniLoadMore:l},data:function(){return{page:1,totalPage:1,inputValue:"",isLoandMore:!1,noData:!1,jobFairAry:null,loandMore:"more",optionsTitle:"招聘会搜索"}},onReachBottom:function(){this.onReachMore()},onLoad:function(a){var n=this;n.optionsDate=a.date,n.inputValue=a.jobName,t.showLoading({title:"加载中"}),n.$http.post(e.default.FAIR_SEARCH,{params:{date:a.date,jobName:a.jobName,page:n.page}}).then(function(a){t.hideLoading(),a.data.success&&a.data.data.job_list?(a.data.data.job_list.length>5&&(n.isLoandMore=!0),t.setNavigationBarTitle({title:a.data.data.fairtitle}),n.jobFairAry=a.data.data.job_list,n.totalPage=a.data.data.totalPage):n.noData=!0}).catch(function(t){console.log("出错了")})},methods:{onReachMore:function(){var t=this,a=t.totalPage,n=t.page;n++,n<=a?(t.loandMore="loading",t.$http.post(e.default.FAIR_SEARCH,{params:{date:t.optionsDate,jobName:t.inputValue,page:n}}).then(function(a){var e;(e=t.jobFairAry).push.apply(e,r(a.data.data.job_list)),t.page=n}).catch(function(t){console.log("翻页出错了")})):t.loandMore="noMore"},onKeyInput:function(t){this.inputValue=t.target.value},search:function(){var a=this;t.redirectTo({url:"../jobFair/jobFairSearch?date="+a.optionsDate+"&jobName="+a.inputValue+"&title="+a.optionsTitle})}}};a.default=d}).call(this,n("543d")["default"])},c655c:function(t,a,n){"use strict";var e=n("2453"),o=n.n(e);o.a},def2:function(t,a,n){"use strict";n.r(a);var e=n("1d52"),o=n("73a7");for(var r in o)"default"!==r&&function(t){n.d(a,t,function(){return o[t]})}(r);n("c655c");var i=n("2877"),u=Object(i["a"])(o["default"],e["a"],e["b"],!1,null,null,null);a["default"]=u.exports}},[["1933","common/runtime","common/vendor"]]]);>>>>>>> .r171536
