<<<<<<< .mine
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jobFair/jobFairDetail"],{"0685":function(t,a,n){"use strict";(function(t){n("2887"),n("921b");e(n("66fd"));var a=e(n("cb71"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,n("543d")["createPage"])},"13b7":function(t,a,n){},3046:function(t,a,n){"use strict";n.r(a);var e=n("cb1b"),o=n.n(e);for(var i in e)"default"!==i&&function(t){n.d(a,t,function(){return e[t]})}(i);a["default"]=o.a},"6c60":function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},o=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return o})},a1ea:function(t,a,n){"use strict";var e=n("13b7"),o=n.n(e);o.a},cb1b:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=o(n("a7a3"));function o(t){return t&&t.__esModule?t:{default:t}}function i(t){return c(t)||u(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(t){if(Array.isArray(t)){for(var a=0,n=new Array(t.length);a<t.length;a++)n[a]=t[a];return n}}var l=function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"f650"))},s={components:{uniLoadMore:l},data:function(){return{fairList:[],faircompanyAry:[],loandMore:"more",noData:!1,page:1,isLoandMore:!1,totalPage:1,optionsDate:"",inputValue:"",optionsTitle:""}},onReachBottom:function(){this.onReachMore()},onLoad:function(a){var n=this;n.optionsDate=a.date,n.optionsTitle=a.title,t.setNavigationBarTitle({title:a.title}),n.$http.post(e.default.FAIR_DETAIL,{params:{date:a.date,page:n.page,page_size:10}}).then(function(t){t.data.success&&(n.fairList=t.data.data.page_index_data,n.faircompanyAry=t.data.data.faircompanys,n.totalPage=t.data.data.totalPage,n.faircompanyAry.length>5&&(n.isLoandMore=!0))}).catch(function(t){console.log("出错了")})},methods:{onReachMore:function(){var t=this,a=t.totalPage,n=t.page;n++,n<=a?(t.loandMore="loading",t.$http.post(e.default.FAIR_DETAIL,{params:{date:t.optionsDate,page:n,page_size:10}}).then(function(a){var e;(e=t.faircompanyAry).push.apply(e,i(a.data.data.faircompanys)),t.page=n}).catch(function(t){console.log("翻页出错了")})):t.loandMore="noMore"},jobFairListBtn:function(a,n,e){e>0&&t.navigateTo({url:"../jobFair/jobFairList?date="+this.optionsDate+"&companyFlag="+a+"&companyName="+n})},onKeyInput:function(t){this.inputValue=t.target.value},search:function(){var a=this;t.navigateTo({url:"../jobFair/jobFairSearch?date="+a.optionsDate+"&jobName="+a.inputValue+"&title="+a.optionsTitle})}}};a.default=s}).call(this,n("543d")["default"])},cb71:function(t,a,n){"use strict";n.r(a);var e=n("6c60"),o=n("3046");for(var i in o)"default"!==i&&function(t){n.d(a,t,function(){return o[t]})}(i);n("a1ea");var r=n("2877"),u=Object(r["a"])(o["default"],e["a"],e["b"],!1,null,null,null);a["default"]=u.exports}},[["0685","common/runtime","common/vendor"]]]);||||||| .r0
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jobFair/jobFairDetail"],{"0dd9":function(t,a,n){"use strict";n.r(a);var e=n("7226"),o=n.n(e);for(var i in e)"default"!==i&&function(t){n.d(a,t,function(){return e[t]})}(i);a["default"]=o.a},"64b0":function(t,a,n){},7226:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=o(n("2218"));function o(t){return t&&t.__esModule?t:{default:t}}function i(t){return c(t)||u(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(t){if(Array.isArray(t)){for(var a=0,n=new Array(t.length);a<t.length;a++)n[a]=t[a];return n}}var l=function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"e451"))},d={components:{uniLoadMore:l},data:function(){return{fairList:[],faircompanyAry:[],loandMore:"more",noData:!1,page:1,isLoandMore:!1,totalPage:1,optionsDate:"",inputValue:"",optionsTitle:""}},onReachBottom:function(){this.onReachMore()},onLoad:function(a){var n=this;n.optionsDate=a.date,n.optionsTitle=a.title,t.setNavigationBarTitle({title:a.title}),t.showLoading({title:"加载中"}),n.$http.post(e.default.FAIR_DETAIL,{params:{date:a.date,page:n.page,page_size:10}}).then(function(a){t.hideLoading(),a.data.success&&(n.fairList=a.data.data.page_index_data,n.faircompanyAry=a.data.data.faircompanys,n.totalPage=a.data.data.totalPage,n.faircompanyAry.length>5&&(n.isLoandMore=!0))}).catch(function(t){console.log("出错了")})},methods:{onReachMore:function(){var t=this,a=t.totalPage,n=t.page;n++,n<=a?(t.loandMore="loading",t.$http.post(e.default.FAIR_DETAIL,{params:{date:t.optionsDate,page:n,page_size:10}}).then(function(a){var e;(e=t.faircompanyAry).push.apply(e,i(a.data.data.faircompanys)),t.page=n}).catch(function(t){console.log("翻页出错了")})):t.loandMore="noMore"},jobFairListBtn:function(a,n,e){e>0&&t.navigateTo({url:"../jobFair/jobFairList?date="+this.optionsDate+"&companyFlag="+a+"&companyName="+n})},onKeyInput:function(t){this.inputValue=t.target.value},search:function(){var a=this;t.navigateTo({url:"../jobFair/jobFairSearch?date="+a.optionsDate+"&jobName="+a.inputValue+"&title="+a.optionsTitle})}}};a.default=d}).call(this,n("543d")["default"])},"8a49":function(t,a,n){"use strict";var e=n("64b0"),o=n.n(e);o.a},a22c:function(t,a,n){"use strict";(function(t){n("0da9"),n("921b");e(n("66fd"));var a=e(n("f719"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,n("543d")["createPage"])},f0d8:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},o=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return o})},f719:function(t,a,n){"use strict";n.r(a);var e=n("f0d8"),o=n("0dd9");for(var i in o)"default"!==i&&function(t){n.d(a,t,function(){return o[t]})}(i);n("8a49");var r=n("2877"),u=Object(r["a"])(o["default"],e["a"],e["b"],!1,null,null,null);a["default"]=u.exports}},[["a22c","common/runtime","common/vendor"]]]);>>>>>>> .r171536