(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/companyDetail/companyDetail"],{"0115":function(a,t,n){"use strict";var o=function(){var a=this,t=a.$createElement;a._self._c},e=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return e})},"03ba":function(a,t,n){},"186a":function(a,t,n){"use strict";n.r(t);var o=n("e6b2"),e=n.n(o);for(var c in o)"default"!==c&&function(a){n.d(t,a,function(){return o[a]})}(c);t["default"]=e.a},"776a":function(a,t,n){"use strict";var o=n("03ba"),e=n.n(o);e.a},b8e0:function(a,t,n){"use strict";n.r(t);var o=n("0115"),e=n("186a");for(var c in e)"default"!==c&&function(a){n.d(t,a,function(){return e[a]})}(c);n("776a");var i=n("2877"),u=Object(i["a"])(e["default"],o["a"],o["b"],!1,null,null,null);t["default"]=u.exports},e6b2:function(a,t,n){"use strict";(function(a,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=i(n("a7a3")),c=n("2f62");function i(a){return a&&a.__esModule?a:{default:a}}function u(a){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable}))),o.forEach(function(t){s(a,t,n[t])})}return a}function s(a,t,n){return t in a?Object.defineProperty(a,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):a[t]=n,a}var r={data:function(){return{key:"value",iscompanyshow:0,companyDeatilAry:[],companyListAry:[],companyDeatilInfo:"",isShowx:!0,noData:!1,company_id:"",isFav:"0",companyPhotoAry:[]}},computed:u({},(0,c.mapState)(["token"])),onReachBottom:function(){},onLoad:function(t){var n=this;n.company_id=t.company_id,console.log(a(n.company_id," at pages\\companyDetail\\companyDetail.vue:115")),n.$http.post(e.default.COMPANY_DETAIL,{params:{company_id:n.company_id,token:n.token}}).then(function(t){console.log(a(t," at pages\\companyDetail\\companyDetail.vue:122")),n.companyDeatilAry=t.data.data,n.companyPhotoAry=t.data.data.photos,n.companyDeatilInfo=t.data.data.info,n.isFav=t.data.data.is_fav}).catch(function(t){console.log(a("出错了"," at pages\\companyDetail\\companyDetail.vue:128"))}),n.$http.post(e.default.COMPANY_ACTIVE_JOBS,{params:{company_id:n.company_id,page_pagesize:50}}).then(function(t){t.data.success&&t.data.data?(n.companyListAry=t.data.data,console.log(a(n.companyListAry," at pages\\companyDetail\\companyDetail.vue:140"))):n.noData=!0}).catch(function(a){n.noData=!0})},onShow:function(){},methods:{companyTab:function(a){this.iscompanyshow=0==a?0:1},goBack:function(){o.navigateBack({delta:1})},jobDetail:function(a){o.redirectTo({url:"../jobDetail/jobDetail?job_flag="+a})},companyMap:function(t){var n=this;o.openLocation({latitude:Number(n.companyDeatilAry.map_y),longitude:Number(n.companyDeatilAry.map_x),success:function(){console.log(a("success"," at pages\\companyDetail\\companyDetail.vue:178"))}})},collectCompany:function(){var t=this;console.log(a(t.isFav," at pages\\companyDetail\\companyDetail.vue:185")),"0"==t.isFav?t.$http.post(e.default.FAV_COMPANY,{params:{company_id:t.company_id,token:t.token}}).then(function(a){a.data.success?(o.showToast({title:"关注成功",duration:2e3}),t.isFav="1"):t.isFav="0"}):t.$http.post(e.default.DEL_FAV_COMPANY,{params:{company_id:t.company_id,token:t.token}}).then(function(a){a.data.success?(o.showToast({title:"取消成功",duration:2e3}),t.isFav="0"):t.isFav="1"})},previewImgProject:function(a){o.previewImage({current:this.companyPhotoAry[a],urls:this.companyPhotoAry})},homeBack:function(){o.switchTab({url:"/pages/index/index"})},isShow:function(){this.isShowx=!this.isShowx}}};t.default=r}).call(this,n("0de9")["default"],n("6e42")["default"])},f5e8:function(a,t,n){"use strict";(function(a){n("2887"),n("921b");o(n("66fd"));var t=o(n("b8e0"));function o(a){return a&&a.__esModule?a:{default:a}}a(t.default)}).call(this,n("6e42")["createPage"])}},[["f5e8","common/runtime","common/vendor"]]]);