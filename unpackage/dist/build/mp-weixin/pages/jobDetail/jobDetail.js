<<<<<<< .mine
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jobDetail/jobDetail"],{"0a94":function(t,o,e){"use strict";var a=e("5284"),n=e.n(a);n.a},"114e":function(t,o,e){"use strict";e.r(o);var a=e("bcc2"),n=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(o,t,function(){return a[t]})}(i);o["default"]=n.a},"41f6":function(t,o,e){"use strict";e.r(o);var a=e("aecf"),n=e("114e");for(var i in n)"default"!==i&&function(t){e.d(o,t,function(){return n[t]})}(i);e("0a94");var c=e("2877"),s=Object(c["a"])(n["default"],a["a"],a["b"],!1,null,"63d49c1e",null);o["default"]=s.exports},5284:function(t,o,e){},a497:function(t,o,e){"use strict";(function(t){e("2887"),e("921b");a(e("66fd"));var o=a(e("41f6"));function a(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,e("543d")["createPage"])},aecf:function(t,o,e){"use strict";var a=function(){var t=this,o=t.$createElement;t._self._c},n=[];e.d(o,"a",function(){return a}),e.d(o,"b",function(){return n})},bcc2:function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=i(e("a7a3")),n=e("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var o=1;o<arguments.length;o++){var e=null!=arguments[o]?arguments[o]:{},a=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.forEach(function(o){s(t,o,e[o])})}return t}function s(t,o,e){return o in t?Object.defineProperty(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}var l={data:function(){return{reffer_from:"",imgs:["https://cdn-media-1.freecodecamp.org/images/kbYsxsxb2D7mBhdlEmUrpMhRmOcQoR79vtT1","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg"],jobDetail:{},job_flag:"",isShow:!1}},created:function(){},onLoad:function(t){var o=this;this.job_flag=t.job_flag,console.log(this.job_flag),console.log("token->",this.token);var e=this;this.$http.post(a.default.GET_JOB_INFO,{params:{token:this.token,job_flag:e.job_flag,reffer_from:""}}).then(function(t){console.log(t.data),o.jobDetail=t.data.data}).catch(function(t){console.log(t)})},computed:c({},(0,n.mapState)(["token"]),{name:function(){return this.jobDetail.company_info.substring(0,100)}}),methods:{applyJob:function(){this.$http.post(a.default.APPLY_JOB,{params:{token:this.token,job_flag:this.job_flag,apply_type:1}}).then(function(o){o.data.success?t.showToast({title:o.data.msg,mask:!0}):t.showModal({title:o.data.msg,mask:!0,showCancel:!1})}).catch(function(t){console.log(t)})},getCollect:function(){var o=this;0==this.jobDetail.is_fav?this.$http.post(a.default.DO_JOB_FAVOUR,{params:{token:this.token,job_flag:this.job_flag}}).then(function(e){e.data.success&&(t.showToast({title:"收藏成功！",mask:!0}),o.jobDetail.is_fav=1)}).catch(function(t){console.log(t)}):this.$http.post(a.default.DEL_JOB_FAVOURITE,{params:{token:this.token,job_flag:this.job_flag}}).then(function(e){e.data.success&&(t.showToast({title:"已取消收藏！",mask:!0}),o.jobDetail.is_fav=0)}).catch(function(t){console.log(t)}),console.log(2222)},openWord:function(){this.isShow=!this.isShow},navigateMap:function(){var o=this;t.openLocation({latitude:parseFloat(o.jobDetail.map_y),longitude:parseFloat(o.jobDetail.map_x),fail:function(t){console.log(t)}})},back:function(){t.navigateBack({delta:1})},companydetail:function(){console.log("jobdetail->",this.jobDetail.company_id),t.navigateTo({url:"../companyDetail/companyDetail?company_id="+this.jobDetail.company_id})},gotoReport:function(){t.navigateTo({url:"../jobDetail/postReport?job_flag="+this.jobDetail.job_flag+"&job_name="+encodeURIComponent(this.jobDetail.job_name)+"&company_id="+this.jobDetail.company_id})}}};o.default=l}).call(this,e("543d")["default"])}},[["a497","common/runtime","common/vendor"]]]);||||||| .r0
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jobDetail/jobDetail"],{"0758":function(t,o,e){"use strict";e.r(o);var a=e("b9ae"),n=e("b354");for(var i in n)"default"!==i&&function(t){e.d(o,t,function(){return n[t]})}(i);e("31a2");var c=e("2877"),s=Object(c["a"])(n["default"],a["a"],a["b"],!1,null,"0f5c3564",null);o["default"]=s.exports},2282:function(t,o,e){"use strict";(function(t){e("0da9"),e("921b");a(e("66fd"));var o=a(e("0758"));function a(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,e("543d")["createPage"])},"2c91":function(t,o,e){},"31a2":function(t,o,e){"use strict";var a=e("2c91"),n=e.n(a);n.a},b354:function(t,o,e){"use strict";e.r(o);var a=e("c655"),n=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(o,t,function(){return a[t]})}(i);o["default"]=n.a},b9ae:function(t,o,e){"use strict";var a=function(){var t=this,o=t.$createElement;t._self._c},n=[];e.d(o,"a",function(){return a}),e.d(o,"b",function(){return n})},c655:function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=i(e("2218")),n=e("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var o=1;o<arguments.length;o++){var e=null!=arguments[o]?arguments[o]:{},a=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.forEach(function(o){s(t,o,e[o])})}return t}function s(t,o,e){return o in t?Object.defineProperty(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}var l={data:function(){return{reffer_from:"",imgs:["https://cdn-media-1.freecodecamp.org/images/kbYsxsxb2D7mBhdlEmUrpMhRmOcQoR79vtT1","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg"],jobDetail:{},job_flag:"",isShow:!1}},created:function(){},onLoad:function(t){var o=this;this.job_flag=t.job_flag,console.log(this.job_flag),console.log("token->",this.token);var e=this;this.$http.post(a.default.GET_JOB_INFO,{params:{token:this.token,job_flag:e.job_flag,reffer_from:""}}).then(function(t){console.log(t.data),o.jobDetail=t.data.data}).catch(function(t){console.log(t)})},computed:c({},(0,n.mapState)(["token"]),{name:function(){return this.jobDetail.company_info.substring(0,100)}}),methods:{applyJob:function(){this.$http.post(a.default.APPLY_JOB,{params:{token:this.token,job_flag:this.job_flag,apply_type:1}}).then(function(o){o.data.success?t.showToast({title:o.data.msg,mask:!0}):t.showModal({title:o.data.msg,mask:!0,showCancel:!1})}).catch(function(t){console.log(t)})},getCollect:function(){var o=this;0==this.jobDetail.is_fav?this.$http.post(a.default.DO_JOB_FAVOUR,{params:{token:this.token,job_flag:this.job_flag}}).then(function(e){e.data.success&&(t.showToast({title:"收藏成功！",mask:!0}),o.jobDetail.is_fav=1)}).catch(function(t){console.log(t)}):this.$http.post(a.default.DEL_JOB_FAVOURITE,{params:{token:this.token,job_flag:this.job_flag}}).then(function(e){e.data.success&&(t.showToast({title:"已取消收藏！",mask:!0}),o.jobDetail.is_fav=0)}).catch(function(t){console.log(t)}),console.log(2222)},openWord:function(){this.isShow=!this.isShow},navigateMap:function(){var o=this;t.openLocation({latitude:parseFloat(o.jobDetail.map_y),longitude:parseFloat(o.jobDetail.map_x),fail:function(t){console.log(t)}})},back:function(){t.navigateBack({delta:1})},companydetail:function(){t.navigateTo({url:"../companyDetail/companyDetail?company_id="+this.jobDetail.company_id})},gotoReport:function(){t.navigateTo({url:"../jobDetail/postReport?job_flag="+this.jobDetail.job_flag+"&job_name="+encodeURIComponent(this.jobDetail.job_name)+"&company_id="+this.jobDetail.company_id})}}};o.default=l}).call(this,e("543d")["default"])}},[["2282","common/runtime","common/vendor"]]]);>>>>>>> .r171536
