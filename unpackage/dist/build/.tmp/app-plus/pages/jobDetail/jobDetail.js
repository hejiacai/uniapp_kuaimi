(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jobDetail/jobDetail"],{"0a94":function(t,e,a){"use strict";var o=a("5284"),n=a.n(o);n.a},"114e":function(t,e,a){"use strict";a.r(e);var o=a("bcc2"),n=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);e["default"]=n.a},"41f6":function(t,e,a){"use strict";a.r(e);var o=a("aecf"),n=a("114e");for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a("0a94");var l=a("2877"),c=Object(l["a"])(n["default"],o["a"],o["b"],!1,null,"63d49c1e",null);e["default"]=c.exports},5284:function(t,e,a){},a497:function(t,e,a){"use strict";(function(t){a("2887"),a("921b");o(a("66fd"));var e=o(a("41f6"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},aecf:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"a",function(){return o}),a.d(e,"b",function(){return n})},bcc2:function(t,e,a){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=l(a("a7a3")),i=a("2f62");function l(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},o=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),o.forEach(function(e){s(t,e,a[e])})}return t}function s(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var u={data:function(){return{reffer_from:"",imgs:["https://cdn-media-1.freecodecamp.org/images/kbYsxsxb2D7mBhdlEmUrpMhRmOcQoR79vtT1","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg","https://cdn-media-1.freecodecamp.org/images/1*D9VZ47bgutne4M7LBKmvWg.jpeg"],jobDetail:{},job_flag:"",isShow:!1}},created:function(){},onLoad:function(e){var a=this;this.job_flag=e.job_flag,console.log(t(this.job_flag," at pages\\jobDetail\\jobDetail.vue:230")),console.log(t("token->",this.token," at pages\\jobDetail\\jobDetail.vue:231"));var o=this;this.$http.post(n.default.GET_JOB_INFO,{params:{token:this.token,job_flag:o.job_flag,reffer_from:""}}).then(function(e){console.log(t(e.data," at pages\\jobDetail\\jobDetail.vue:240")),a.jobDetail=e.data.data}).catch(function(e){console.log(t(e," at pages\\jobDetail\\jobDetail.vue:243"))})},computed:c({},(0,i.mapState)(["token"]),{name:function(){return this.jobDetail.company_info.substring(0,100)}}),methods:{applyJob:function(){this.$http.post(n.default.APPLY_JOB,{params:{token:this.token,job_flag:this.job_flag,apply_type:1}}).then(function(t){t.data.success?o.showToast({title:t.data.msg,mask:!0}):o.showModal({title:t.data.msg,mask:!0,showCancel:!1})}).catch(function(e){console.log(t(e," at pages\\jobDetail\\jobDetail.vue:274"))})},getCollect:function(){var e=this;0==this.jobDetail.is_fav?this.$http.post(n.default.DO_JOB_FAVOUR,{params:{token:this.token,job_flag:this.job_flag}}).then(function(t){t.data.success&&(o.showToast({title:"收藏成功！",mask:!0}),e.jobDetail.is_fav=1)}).catch(function(e){console.log(t(e," at pages\\jobDetail\\jobDetail.vue:294"))}):this.$http.post(n.default.DEL_JOB_FAVOURITE,{params:{token:this.token,job_flag:this.job_flag}}).then(function(t){t.data.success&&(o.showToast({title:"已取消收藏！",mask:!0}),e.jobDetail.is_fav=0)}).catch(function(e){console.log(t(e," at pages\\jobDetail\\jobDetail.vue:312"))}),console.log(t(2222," at pages\\jobDetail\\jobDetail.vue:315"))},openWord:function(){this.isShow=!this.isShow},navigateMap:function(){var e=this;o.openLocation({latitude:parseFloat(e.jobDetail.map_y),longitude:parseFloat(e.jobDetail.map_x),fail:function(e){console.log(t(e," at pages\\jobDetail\\jobDetail.vue:326"))}})},back:function(){o.navigateBack({delta:1})},companydetail:function(){console.log(t("jobdetail->",this.jobDetail.company_id," at pages\\jobDetail\\jobDetail.vue:336")),o.navigateTo({url:"../companyDetail/companyDetail?company_id="+this.jobDetail.company_id})},gotoReport:function(){o.navigateTo({url:"../jobDetail/postReport?job_flag="+this.jobDetail.job_flag+"&job_name="+encodeURIComponent(this.jobDetail.job_name)+"&company_id="+this.jobDetail.company_id})}}};e.default=u}).call(this,a("0de9")["default"],a("6e42")["default"])}},[["a497","common/runtime","common/vendor"]]]);