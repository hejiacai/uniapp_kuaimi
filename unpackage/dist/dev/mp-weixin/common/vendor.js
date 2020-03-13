(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 114:
/*!*********************************************************!*\
  !*** E:/uni_mblue/pages/mine/images sync ^\.\/.*\.png$ ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./advice-icon.png": 115,
	"./custom-icon.png": 116,
	"./my-collection.png": 117,
	"./my-delivery.png": 118,
	"./my-notice.png": 119,
	"./report-job.png": 120,
	"./share-job.png": 121
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 114;

/***/ }),

/***/ 115:
/*!******************************************************!*\
  !*** E:/uni_mblue/pages/mine/images/advice-icon.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAABuElEQVRYhe3XvWsUQRiA8d+t5iCKFmpSREJQLAzYqVhpFxCEYKtVLAIqWFkpgp1W4geCWEgK/4HUosHeMmkiauFHQAJREb1AQrTYWZw77nJOZPcs7oGBm5l35n1293Z2pqaZfZjGBEYwoBzWsITneILP7YLO4gt+VVy+htxNnMF6D2SKso5JqGEX3mIoyH3AdbwKt7YMBnActzAa2pZxEC5Epu8jsSoYCjmL/FMZTkYB94JpVSzjblQ/lWE4alisUKbgdfR7OOuBwKb0hbrRF+rG9oTYbTiBHQljvskX2FKEnuJcyuSB2/KV/69IeWTH0l3A0ZTglDt0CVelbUl+4mZZQi9CKZX/7i3rC3WjL9SNDI2ovrsHDnHORob5qOF8xTI0r/7zMI4Nf/a19zFYgcggHkR5NzBeC52PcDEKXgm2m506VnEHL9v0HcEN7O0wth5i9kRtj2OHOmaln6caON2SbAo/EueZDQ5NZLgsP6NtRWonZhLHvsMV0dtePLJWDmG/zh/SOh7iQKiv4mMYV7CAa6GvlTV8wpsO82+JMfkVtrvyGWkbudKkvsv/Qz1lDM8wh8P/OtlvIIe8JSurUP8AAAAASUVORK5CYII="

/***/ }),

/***/ 116:
/*!******************************************************!*\
  !*** E:/uni_mblue/pages/mine/images/custom-icon.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAiCAYAAADcbsCGAAAC8ElEQVRYhcXYW4hVVRgH8J97LJlJuj0llBGYRRgl2ENWUBFUKEJFESkjSJEgaPhUFBlURORDRVovkUbUw0QXsocoKygIuglS2UOBkviQeBko7TrTw+eBb+8558w5+1z6w4J11trff/33Ouu7rD1HfSzBrViOS7EAZ+EkjuJnfIuP8SH+6GGtjjAXa08tOt1FO47nsXBQwm7Cj12KqrY/8RRG+yXqNDyHqcpCJzCB+7AM52MezsQirMJW8fdWRe7DZb0KO0Ocl0x8DI/g7A45CtyOryo8k7ihrrDTsbtC+C7Oq8lXYLNwmAbf78KhusaOirCnMaemsIwrcSjxHtalo6yuCHu4D6IyFuHXxP+ZDl98DAeT4Y4+C2vgGvyV1rm3E6PHksEBzB+QOHg8rXXQLCFmVET3hsEPIsK/jTX6c+YyxpTP33i7h+9WPmvVtrMPAi/Bg3gSm/B64v+kldHl2D+LuGnc0YOwjfi7Dfc/OLdqtFDZe6ZFjFuPmytvt7OmsKvNzDLN2sqq4ftp8niTB1ak+V01xW1PHF+KLPOymZuyR2QmhEvnbb2xCXE/xO1KHKvS+CieUN7VF4iUsjo9+KrwzkHj39Q/KXZxQxq7H4sLXJ8GXxm8rpZ4URQZRN04XohSp4E9Q5dUxrbUv6UQ1UcDU0MWU8XnqX9hgV/SwNIhi6nit9SfXyg7QNv0MQRcnPqHCryRBtapWfz1CXem/jcFPsVHpwbm4j1xmRk2LsAD6febjc5FypF6SgTNtbhWpKzG3Gs1F89BeEUTYd+l+e8xkh9Yqlxktmp31RQ3kTgeEre6xSIAH1POUtc1I1iAt7RO0BPql0wbW3BWq5J7ZiNagi14B1/gA1FGj7QzmgVj2NtG2D49XBV7RYFHK4ImxT+1Rjjj/yJqpZnfV47gqmEKGcE5ohS/Dc9qXl3vVQ64A8e4+H7S7sCfEDeuecMURgTzVqKO4BkRzzpGPw/hS7hCnLFJ/ISvRe7eLS42XeE/C2w5tE2W+voAAAAASUVORK5CYII="

/***/ }),

/***/ 117:
/*!********************************************************!*\
  !*** E:/uni_mblue/pages/mine/images/my-collection.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 118:
/*!******************************************************!*\
  !*** E:/uni_mblue/pages/mine/images/my-delivery.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 119:
/*!****************************************************!*\
  !*** E:/uni_mblue/pages/mine/images/my-notice.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 120:
/*!*****************************************************!*\
  !*** E:/uni_mblue/pages/mine/images/report-job.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAgCAYAAACRpmGNAAACZklEQVRYhcWYP2sUURTFf5lFIYlK7LY0sTIopNFKjIitFtpkLdUPEDDKIhZLWkkR9QtoRLFVMW1MpwFJF/80EiWFCjEGozEkWrw7cnZ3Znfem53NgeEt755775ndd+99LORDBFSAWeAL8NfWWWDM7LuCQ8C8CUp75o3XVQwCK22Exc+K8buCPcCCJP8NTALDwICtk7YfcxbMr3DUJOkmMJrCGzV7zK0VLewEsCUJJ9rwrwt3CzhelLBe4K0ke0n7aixRXzRLFqfjmJYkP2g+5H3ASVsVQ8C6+E53WthZYEcSXEngzJltLsF2VXx3gDOdEjYALEvwpyk8bR9JeC72ZYubGw8k6FegHCiuDHwTzv28wi42JL3QgttOnG+8lijjvqmsb5pFHMAM2X6JlniG3xnJKu4g2c5wKkKqK6s4aK7+y1mFDeL6mG9f8hEHcEf4SX2zCXk6uq+4PjwnzoSQfWehrzhontXX0ojHqL/m1DyShIoDd73S69fRRsJeYFFIr/G/f22Y709Pv8b74RvT8x9VMW4ARzwTgJu3i3hUnmAY+CUaqrGhF1gVw3hA8BhBDdUwLhpWTRfnZXMJV7EheGgxZgL9S8A70XIuAkaE8ALYDgxesfVSoP+25Y8xEgH9svE5MDC4lgDwJ0eMT/K5P8L9vjGGcgSuAu+RwxwAzf8d4DT1t4R9OYLnwQHqb0GnwB3Ej7L5mPCiCEXJ8sYaPgBRjxkrwCMhvwJu45rjeoGi9uNG5A3cKIsxBjxR4j2S/07o9nM36S16gFu4atsNUZvATdORisPAFG4UrRUsaM3yTJHQKf4BVy9PY65vdXUAAAAASUVORK5CYII="

/***/ }),

/***/ 121:
/*!****************************************************!*\
  !*** E:/uni_mblue/pages/mine/images/share-job.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAACc0lEQVRYhbXX24tNURwH8I8Z9wYxeGAST5RLaBSRyxPlL/CA8OIuj95ISXgYEQkPxqNQGqW8iDLhQSS30BByqXGZiVzGeNhnz1nO7HPOPmcf31qdfdbv+z3f71577bXWqVd7bMMBjMdTfCsnGJDQNxarsQwTEuo/0IJzCbXh6EJdwL2A47hRLkyMDfiE3jLtcxF9HdqLaB5gK0aVCrA5hXnc2kr8zhCsx60i2m6cQnMsiB/HNNzHoNz3RziEx6IhDfEbD/Gr1B3lMAebsAoNCfU7WBd/OR0kvY5hKQzSoglb8FbyyPTNrQ9B56waGI/CTtwtYhy2gzAi6Hif0XwY9uJLCvO4zYZJQcfLDAGWoiPB5KfoEe/DWrQGtb7XthYhdokmbGj+AtsxpoB7L+CsrUWIAThaYP4FOzAwgT8v4H0WLW6ZQ+wvCHAbU0rwTwTcY2Gh2hBrCgJcEtxZAhrwNeDPzRpismjli3VXMbiMZn3Av1NYrCZEW6B5psx+kMPNQLMxa4iFAb8HC1JoJgaabozMGuJiwG9NwSeaK+9ympYkQiUhxokWn178wdSUIWLtYvmzRh+S3uVSWCG/017Dkwq0H3OtH/qlKoOlwXWpM0VFqDTE9OC6vUrPRTiD5WFnJXMiPBM0VhnieU7fGXdUOhLh6aizKKs04vCjqw1xN/cZH2Zrhkb5IX5ThtuAlaKDULX4nvPqd0btkl8BmzIYlMNM+RvuKCyGq+BZyX+KsqIOlwOfk4WEJUGxF+dFW+3QGpgPF+0vV/y758xIIh8pCPI/2+5iietxWLQn/C/zHuyR4nHPF82L1zUK1INXoh23WQL+AncQO/WPymhMAAAAAElFTkSuQmCC"

/***/ }),

/***/ 15:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!*****************************************************!*\
  !*** E:/uni_mblue/static/commonjs/request/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.test = exports.http = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 17));
var _apiName = _interopRequireDefault(__webpack_require__(/*! ./apiName */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var test = new _request.default();exports.test = test;
var VERSION = "v1.0";
// const BASE_HOST = "http://appblue.huibo.com/index";
// const BASE_HOST = "http://blueuniapp.hb.com";
var BASE_HOST = "https://uniapp.kuaimijob.com";

test.setConfig(function (config) {/* 设置全局配置 */
  config.baseUrl = BASE_HOST + "?ver=" + VERSION + '&apiname=';
  config.header = _objectSpread({},
  config.header, {
    a: 1,
    b: 2 });

  return config;
});

test.interceptor.request(function (config, cancel) {/* 请求之前拦截器 */
  config.header = _objectSpread({},
  config.header, {
    a: 3

    /*
         if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
           cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
         }
         */ });
  return config;
});

/**
     * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
     * @param { Number } statusCode - 请求响应体statusCode（只读）
     * @return { Boolean } 如果为true,则 resolve, 否则 reject
     */
test.validateStatus = function (statusCode) {
  return statusCode === 200;
};

test.interceptor.response(function (response) {/* 请求之后拦截器 */
  return response;
}, function (response) {// 请求错误做点什么
  return response;
});

var http = new _request.default();exports.http = http;

http.setConfig(function (config) {/* 设置全局配置 */
  config.baseUrl = BASE_HOST + "/index?ver=" + VERSION + '&apiname='; /* 根域名不同 */
  config.header = _objectSpread({},
  config.header);

  return config;
});

/**
     * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
     * @param { Number } statusCode - 请求响应体statusCode（只读）
     * @return { Boolean } 如果为true,则 resolve, 否则 reject
     */
http.validateStatus = function (statusCode) {
  return statusCode === 200;
};

http.interceptor.request(function (config, cancel) {/* 请求之前拦截器 */
  config.header = _objectSpread({},
  config.header);

  /*
                  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
                    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
                  }
                  */
  return config;
});

http.interceptor.response(function (response) {/* 请求之后拦截器 */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  return response;
}, function (response) {// 请求错误做点什么
  return response;
});

/***/ }),

/***/ 164:
/*!**********************************************!*\
  !*** E:/uni_mblue/js_sdk/js-amap/amap-wx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 17:
/*!*******************************************************!*\
  !*** E:/uni_mblue/static/commonjs/request/request.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * Request 1.0.3
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @Class Request
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @description luch-request 1.0.3 http请求插件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @Author lu-ch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @Date 2019-11-01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @Email webwork.s@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * http://ext.dcloud.net.cn/plugin?id=392
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
Request = /*#__PURE__*/function () {function Request() {var _this = this;_classCallCheck(this, Request);_defineProperty(this, "config",
    {
      baseUrl: '',
      header: {
        'content-type': 'application/json;charset=UTF-8' },

      method: 'GET',
      dataType: 'json',
      responseType: 'text' });_defineProperty(this, "interceptor",






















    {
      /**
       * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
       */
      request: function request(cb) {
        if (cb) {
          _this.requestBeforeFun = cb;
        }
      },
      /**
          * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
          * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
          */
      response: function response(cb, ecb) {
        if (cb && ecb) {
          _this.requestComFun = cb;
          _this.requestComFail = ecb;
        }
      } });}_createClass(Request, [{ key: "requestBeforeFun", value: function requestBeforeFun(


    config) {
      return config;
    } }, { key: "requestComFun", value: function requestComFun(

    response) {
      return response;
    } }, { key: "requestComFail", value: function requestComFail(

    response) {
      return response;
    }

    /**
       * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
       * @param { Number } statusCode - 请求响应体statusCode（只读）
       * @return { Boolean } 如果为true,则 resolve, 否则 reject
       */ }, { key: "validateStatus", value: function validateStatus(
    statusCode) {
      return statusCode === 200;
    }

    /**
       * @Function
       * @param {Request~setConfigCallback} f - 设置全局默认配置
       */ }, { key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    }

    /**
       * @Function
       * @param {Object} options - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this2 = this;var options,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                options.baseUrl = this.config.baseUrl;
                options.dataType = options.dataType || this.config.dataType;
                options.responseType = options.responseType || this.config.responseType;
                options.url = options.url || '';
                options.data = options.data || {};
                options.params = options.params || {};
                options.header = options.header || this.config.header;
                options.method = options.method || this.config.method;return _context.abrupt("return",



                new Promise(function (resolve, reject) {
                  var next = true;

                  var handleRe = {};
                  options.complete = function (response) {
                    response.config = handleRe;
                    if (_this2.validateStatus(response.statusCode)) {// 成功
                      response = _this2.requestComFun(response);
                      resolve(response);
                    } else {
                      response = _this2.requestComFail(response);
                      reject(response);
                    }
                  };
                  var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options;
                    var err = {
                      errMsg: t,
                      config: config };

                    reject(err);
                    next = false;
                  };

                  handleRe = _objectSpread({}, _this2.requestBeforeFun(options, cancel));
                  var _config = _objectSpread({}, handleRe);
                  if (!next) return;

                  var mergeUrl = Request.posUrl(options.url) ? options.url : options.baseUrl + options.url;
                  if (JSON.stringify(options.params) !== '{}') {
                    var paramsH = Request.addQueryString(options.params);
                    mergeUrl += mergeUrl.indexOf('?') === -1 ? "?".concat(paramsH) : "&".concat(paramsH);
                  }
                  _config.url = mergeUrl;
                  uni.request(_config);
                }));case 10:case "end":return _context.stop();}}}, _callee, this);}));function request() {return _request.apply(this, arguments);}return request;}() }, { key: "get", value: function get(


    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url, _ref)










    {var _this3 = this;var filePath = _ref.filePath,name = _ref.name,header = _ref.header,formData = _ref.formData;
      return new Promise(function (resolve, reject) {
        var next = true;
        var handleRe = {};
        var globalHeader = _objectSpread({}, _this3.config.header);
        delete globalHeader['content-type'];
        var pubConfig = {
          baseUrl: _this3.config.baseUrl,
          url: url,






          filePath: filePath,
          method: 'UPLOAD',
          name: name,
          header: header || globalHeader,
          formData: formData,
          complete: function complete(response) {
            response.config = handleRe;
            if (response.statusCode === 200) {// 成功
              response = _this3.requestComFun(response);
              resolve(response);
            } else {
              response = _this3.requestComFail(response);
              reject(response);
            }
          } };

        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        handleRe = _objectSpread({}, _this3.requestBeforeFun(pubConfig, cancel));
        var _config = _objectSpread({}, handleRe);
        if (!next) return;
        _config.url = Request.posUrl(url) ? url : _this3.config.baseUrl + url;
        uni.uploadFile(_config);
      });
    } }], [{ key: "posUrl", value: function posUrl(url) {/* 判断url是否为绝对路径 */return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);} }, { key: "addQueryString", value: function addQueryString(params) {var paramsData = '';Object.keys(params).forEach(function (key) {paramsData += key + '=' + encodeURIComponent(params[key]) + '&';});return paramsData.substring(0, paramsData.length - 1);} /**
                                                                                                                                                                                                                                                                                                                                                                                                * @property {Function} request 请求拦截器
                                                                                                                                                                                                                                                                                                                                                                                                * @property {Function} response 响应拦截器
                                                                                                                                                                                                                                                                                                                                                                                                * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
                                                                                                                                                                                                                                                                                                                                                                                                */ }]);return Request;}(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                            * setConfig回调
                                                                                                                                                                                                                                                                                                                                                                                                                            * @return {Object} - 返回操作后的config
                                                                                                                                                                                                                                                                                                                                                                                                                            * @callback Request~setConfigCallback
                                                                                                                                                                                                                                                                                                                                                                                                                            * @param {Object} config - 全局默认config
                                                                                                                                                                                                                                                                                                                                                                                                                            */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                * 请求拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                * @return {Object} - 返回操作后的config
                                                                                                                                                                                                                                                                                                                                                                                                                                * @callback Request~requestCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                * @param {Object} config - 全局config
                                                                                                                                                                                                                                                                                                                                                                                                                                * @param {Function} [cancel] - 取消请求钩子，调用会取消本次请求
                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                    * 响应拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                    * @return {Object} - 返回操作后的response
                                                                                                                                                                                                                                                                                                                                                                                                                                    * @callback Request~responseCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                    * @param {Object} response - 请求结果 response
                                                                                                                                                                                                                                                                                                                                                                                                                                    */
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                        * 响应错误拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                        * @return {Object} - 返回操作后的response
                                                                                                                                                                                                                                                                                                                                                                                                                                        * @callback Request~responseErrCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {Object} response - 请求结果 response
                                                                                                                                                                                                                                                                                                                                                                                                                                        */exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 19);


/***/ }),

/***/ 19:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 20);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 21:
/*!*******************************************************!*\
  !*** E:/uni_mblue/static/commonjs/request/apiName.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                     *文档地址v1.0
                                                                                                     http://blueuniapp.hb.com/doc/
                                                                                                     token:s79hu1192814
                                                                                                     */var _default =

{
  "COURSELIST": "courselist", //课程列表
  "COURSEDETAIL": "coursedetail", //课程详情
  "REPORT_COURSE": "ReportCourse", //课程举报
  "ENTER_COURSE": "EnterCourse", //课程咨询
  "PHOTO_UP": "photo_up", //头像上传
  "DEL_WORKDO": "del_workdo", //删除工作经历
  "MOD_WORKDO": "mod_workdo", //修改工作经历
  "DEL_CERTIFICATE": "del_certificate", //删除证书
  "MOD_CERTIFICATE": "mod_certificate", //添加修改证书
  "RESUMALTER": "resumalter", //修改简历
  "GET_SEED": "getSeed", //获取seed值
  "GET_IMG_CODE": "getImgCode", //获取图片验证码
  "SEND_LOG_CODE": "sendLogCode", //登录/注册短信发送
  "LOGIN_DO": "loginDo", //登录快米(注册)
  "OUT_LOGIN_DO": "outLoginDo", //退出登录
  "RESUME_INFO": "resumeinfo", //获取简历信息（包括基本信息）
  "COMMON_SEARCH": "commonsearch", //首页推荐职位搜索
  "APPLY_JOB": "apply_job", //投递简历
  "JOB_SEARCH": "jobsearch", //职位搜索
  "GET_JOB_INFO": "get_job_info", //职位详情
  "JOB_REPORT": "job_report", //举报职位
  "JOB_FAVOURITE": "job_favourite", //获取收藏的职位
  "DO_JOB_FAVOUR": "do_job_favour", //收藏职位
  "DEL_JOB_FAVOURITE": "del_job_favourite", //删除收藏职位
  "FAMOUS_COMPANY": "famous_company", //知名企业
  "COMPANY_DETAIL": "company_detail", //企业详情
  "COMPANY_ACTIVE_JOBS": "company_active_jobs", //企业在招职位
  "FAV_COMPANY": "fav_company", //收藏企业
  "DEL_FAV_COMPANY": "del_fav_company", //取消企业收藏
  "APPLY_LIST": "apply_list", //求职者投递记录
  "INVITE_LIST": "invite_list", //邀请面试列表
  "GET_INVITE_DETAIL": "get_invite_detail", //面试详情
  "JOBS_COLLECTION": "jobs_collection", //收藏职位列表
  "COMPANY_COLLECTION": "company_collection", //收藏企业列表
  "AREACOMMONV2": "areacommonv2", //全球地区码表
  "FAIR_INDEX": "fair_index", //招聘会
  "FAIR_DETAIL": "fair_detail", //招聘会列表
  "FAIR_SEARCH": "fair_search ", //招聘会搜索

  "FAIR_COMPANYDETAIL": "fair_companydetail ", //招聘会详情
  "CALLBACK_ADVISE": "callback_advise", //意见反馈
  "DEL_APPLY": "del_apply", //取消投递简历


  "JOB_SORT_COMMON": "jobsortcommon", //职位类别码表
  "SALARY_COMMON": "salarycommon", //薪资码表
  "AREA_COMMON": "areacommon", //重庆地区码表
  "CALLING_COMMON": "callingcommon", //行业码表
  "REWARDS_COMMON": "rewardscommon", //福利码表
  "MORE_COMMON": "morecommon", //更多码表：包括 作息、性别、年龄
  "MSGLIST": "msglist", //消息
  "SETEXPJOBSORT": "SetExpJobSort" //期望职位
};exports.default = _default;

/***/ }),

/***/ 22:
/*!***********************************************************!*\
  !*** E:/uni_mblue/static/commonjs/eventList/eventList.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                     *事件常用字段 防止全局污染 v1.0
                                                                                                     */var _default =

{
  GO_TO_JOBDETAIL: 'gotoJobDetail', //跳转到职位详情
  BASE_HOST: "https://uniapp.kuaimijob.com" };exports.default = _default;

/***/ }),

/***/ 23:
/*!***********************************!*\
  !*** E:/uni_mblue/store/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    hasLogin: false,
    loginProvider: "",
    openid: null,
    // token:"8h2p57521738",
    token: '',
    presentAddress: '',
    newLiveAddress: '',
    editCertificate: '',
    addnowLive: '',
    addworkAddress: '',
    addresumeList: '',
    ediresumeList: '',
    indexSearchJob: '',
    jobCategory: [],
    changejobCategory: [],
    personPhoto: '',
    //筛选器缓存
    _cityCode: "", //城市码
    _sexCode: "", //性别码
    _workTimeCode: "", //时间码
    _chooseSalaryCode: "", //薪资码
    _ageCode: "", //年龄段码
    _chooseCallingList: [], //行业
    _chooseRewardsList: [], //福利
    _chooseJobList: [], //职位类别
    __cityGroupActive: -1, //地区左边下标
    _tab_bar_chooseList: [],
    _tab_bar_List: [
    '职位类别',
    '地区',
    '薪资',
    '更多'],

    _tab_bar_chooseIndex: -1,
    _keyWordStr: '', //关键词
    _isSearchDetail: 1, //返回页数 正数返回历史页面 负数特殊处理 已使用-1 跳转搜素列表
    _routerBackHistoy: '',
    _isJobDetail: 1,
    _isCompanyDetail: 1,
    _isJobDetailId: '',
    _isCompanyDetailId: '',
    jobId: [] },

  mutations: {
    clearResumelist: function clearResumelist(state) {
      state.addresumeList = '';
    },
    savePhoto: function savePhoto(state, data) {
      state.personPhoto = data;
    },
    addSearchJob: function addSearchJob(state, data) {
      state.indexSearchJob = data;
    },
    saveEdiResumeList: function saveEdiResumeList(state, data) {
      state.ediresumeList = data;
    },
    saveResumeList: function saveResumeList(state, data) {
      state.addresumeList = data;
    },
    setaddworkAddress: function setaddworkAddress(state, data) {
      state.addworkAddress = data;
    },
    clearworkAddress: function clearworkAddress(state) {
      state.addworkAddress = '';
    },
    setaddnowLive: function setaddnowLive(state, data) {
      state.addnowLive = data;
    },
    clearnowLive: function clearnowLive(state) {
      state.addnowLive = '';
    },
    addJobCategory: function addJobCategory(state, data) {
      // console.log('猪猪组在',data)
      state.jobCategory = data;
    },
    clearaddJobCategory: function clearaddJobCategory(state) {
      state.jobCategory = '';
    },
    changeJobCategory: function changeJobCategory(state, data) {
      state.changejobCategory = data;
    },
    login: function login(state, provider) {
      state.hasLogin = true;

    },
    logout: function logout(state) {
      state.hasLogin = false;
    },
    setToken: function setToken(state, str) {
      state.token = str;
      uni.setStorage({
        key: 'token',
        data: state.token });

    },
    closeToken: function closeToken(state) {
      state.token = '';
      uni.clearStorage('token');
    },
    addPresentAddress: function addPresentAddress(state, value) {
      state.presentAddress = value;
    },
    addnewLiveAddress: function addnewLiveAddress(state, value) {
      state.newLiveAddress = value;
    },
    editCertificateSave: function editCertificateSave(state, value) {
      state.editCertificate = value;
    },
    //关键词
    set_keyWordStr: function set_keyWordStr(state, value) {
      state._keyWordStr = value;
    },
    //赛选器暂行多函数
    savefliterValue: function savefliterValue(state, value) {
      console.log(value);
      for (var i = 0; i < value.stateList.length; i++) {
        state.value.stateList[i] = value.stateListVlaue[i];
      }
    },
    set_workTimeCode: function set_workTimeCode(state, value) {
      state._workTimeCode = value;
    },
    set_sexCode: function set_sexCode(state, value) {
      state._sexCode = value;
    },
    set_ageCode: function set_ageCode(state, value) {
      state._ageCode = value;
    },
    set_cityCode: function set_cityCode(state, value) {
      state._cityCode = value;
    },
    set_chooseSalaryCode: function set_chooseSalaryCode(state, value) {
      state._chooseSalaryCode = value;
    },
    set_chooseCallingList: function set_chooseCallingList(state, value) {
      state._chooseCallingList = value;
    },
    set_chooseRewardsList: function set_chooseRewardsList(state, value) {
      state._chooseRewardsList = value;
    },
    set_chooseJobList: function set_chooseJobList(state, value) {
      state._chooseJobList = value;
      console.log(JSON.stringify(state._chooseJobList));
    },
    set_tab_bar_chooseList: function set_tab_bar_chooseList(state, value) {
      state._tab_bar_chooseList = value;
    },
    set_tab_bar_chooseIndex: function set_tab_bar_chooseIndex(state, value) {
      state._tab_bar_chooseIndex = value;
    },
    set_tab_bar_List: function set_tab_bar_List(state, value) {
      state._tab_bar_List = value;
    },
    set_cityGroupActive: function set_cityGroupActive(state, value) {
      state._cityGroupActive = value;
    },
    //--------------
    set_isSearchDetail: function set_isSearchDetail(state, value) {//需要返回的页面栈数
      state._isSearchDetail = value;
    },
    set_isJobDetail: function set_isJobDetail(state, value) {//需要返回的页面栈数
      state._isJobDetail = value;
    },
    set_isJobDetailId: function set_isJobDetailId(state, value) {//需要返回的页面栈数
      state._isJobDetailId = value;
    },
    set_isCompanyDetail: function set_isCompanyDetail(state, value) {//需要返回的页面栈数
      state._isCompanyDetail = value;
    },
    set_isCompanyDetailId: function set_isCompanyDetailId(state, value) {//需要返回的页面栈数
      state._isCompanyDetailId = value;
    },
    set_routerBackHistoy: function set_routerBackHistoy(state, value) {
      state._routerBackHistoy = value; //上一个页面,应文件结构有同文件不同page所以需全路径 以jobDetail配路径
    },
    addJobId: function addJobId(state, value) {
      state.jobId.push(value);
    },
    spliceJobId: function spliceJobId(state, value) {
      state.jobId.pop();
    } },

  getters: {},


  actions: {} });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!*********************************************!*\
  !*** E:/uni_mblue/static/commonjs/KM/KM.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
/*方法说明
                                                                                                      *@method 方法名
                                                                                                      *@for 所属类名
                                                                                                      *@param{参数类型}参数名 参数说明
                                                                                                      *@return {返回值类型} 返回值说明
                                                                                                     */
/*
                                                                                                         * @method showToast
                                                                                                         * @param{string}title 提示的内容，长度与 icon 取值有关。
                                                                                                         * @param{string}position value: top center bottom   5+App 
                                                                                                         * @param{string}icon 图标，value: success loading none
                                                                                                         * @param{string}image 自定义图标的本地路径 5+App、H5、微信小程序、百度小程序
                                                                                                         * @param{string}mask 是否显示透明蒙层，防止触摸穿透，默认：false
                                                                                                         * @param{string}duration 提示的延迟时间，单位毫秒，默认：1500
                                                                                                         */
var showToast = function showToast(title) {var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'center';var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';var mask = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;var duration = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2000;
  uni.showToast({
    title: title,
    icon: icon,
    position: position,
    image: image,
    mask: mask,
    duration: duration });

};
var getStorage = function getStorage(name) {
  var value = null;
  uni.getStorage({
    key: name,
    success: function success(res) {
      console.log('getStorage->', res.data);
      if (res.data != '') {
        value = res.data;
      }
    },
    fail: function fail(err) {
      console.error('getToken fail msg->', err.errMsg);
    } });

  return value;
};
var setStorage = function setStorage(name, value) {
  uni.setStorage({
    key: name,
    data: value,
    success: function success(res) {
      console.log(res.errMsg);
    } });

};var _default =
{
  showToast: showToast,
  getStorage: getStorage,
  setStorage: setStorage };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 267:
/*!*******************************************!*\
  !*** E:/uni_mblue/static/img/fujinbg.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAE/CAIAAACW9dGKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphMDQ5YjA1Yi1kYWQ3LWVhNDgtYWEwYy0yOWM0YmJjMDE0MTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQ4ODA0QkNFRTQ2MTFFOUI1QTdDOEFGNDUwMUNFRUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDQ4ODA0QkJFRTQ2MTFFOUI1QTdDOEFGNDUwMUNFRUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzMxZmJhMTEtYzRkZS03YjQwLTkwYWQtMDBjYmY0Nzc5NzgxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTZhMWNkNDYtYjQ0MC0xMWU5LWI3MDEt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"

/***/ }),

/***/ 270:
/*!*****************************************************!*\
  !*** E:/uni_mblue/static/commonjs/utils/openMap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _transformCoordinate = _interopRequireDefault(__webpack_require__(/*! ./transformCoordinate.js */ 271));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
function openMapByDefault(latitude, longitude, name) {
  uni.openLocation({
    latitude: latitude,
    longitude: longitude,
    name: name,
    fail: function fail() {
      uni.showModal({
        content: '打开地图失败,请重' });

    } });

}
function openMapByAndroid(latitude, longitude, name) {
  var url = ''; // 回调地址
  var identity = ''; // 程序名称
  if (plus.runtime.isApplicationExist({ pname: 'com.baidu.BaiduMap' })) {// baidumap
    url = "baidumap://map/marker?location=".concat(latitude, ",").concat(longitude, "&title=").concat(name, "&coord_type=gcj02&src=andr.baidu.openAPIdemo");
    identity = 'com.baidu.BaiduMap';
    openURL(url, identity);
  } else
  if (plus.runtime.isApplicationExist({ pname: 'com.autonavi.minimap' })) {// 高德
    url = "androidamap://viewMap?sourceApplication=appname&poiname=".concat(name, "&lat=").concat(latitude, "&lon=").concat(longitude, "&dev=0");
    identity = 'com.autonavi.minimap';
    openURL(url, identity);
  } else
  {
    openMapByDefault(latitude, longitude, name);
  }
}
function openMapByIos(latitude, longitude, name) {
  var url = ''; // 回调地址
  var errorCB = ''; // url失败的回调地址
  var identity = ''; // 程序名称

  if (plus.runtime.isApplicationExist({ action: 'baidumap://' })) {// baidumap
    url = "baidumap://map/marker?location=".concat(latitude, ",").concat(longitude, "&title=").concat(name, "&content=").concat(name, "&src=ios.baidu.openAPIdemo&coord_type=gcj02");
    openURL(url, identity);
  } else
  if (plus.runtime.isApplicationExist({ action: 'iosamap://' })) {// 高德
    url = "iosamap://viewMap?sourceApplication=applicationName&poiname=".concat(name, "&lat=").concat(latitude, "&lon=").concat(longitude, "&dev=0");
    openURL(url, identity);
  } else
  {
    openMapByDefault(latitude, longitude, name);
  }
}
function openURL(url, identity) {
  var newurl = encodeURI(url);
  plus.runtime.openURL(newurl, function (res) {
    uni.showModal({
      content: res.message });

  }, identity);
}
function getCoordByType(longitude, latitude, coord_type) {
  switch (coord_type) {
    case 'gcj02':
      return [longitude, latitude];
      break;
    case 'bd09':
      return _transformCoordinate.default.bd09togcj02(longitude, latitude);
      break;
    case 'wgs84':
      return _transformCoordinate.default.wgs84togcj02(longitude, latitude);
      break;
    default:
      return [longitude, latitude];
      break;}

}var _default =
{
  /* 打开地图 */
  openMap: function openMap(latitude, longitude, name) {var coord_type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'gcj02';
    var arr = getCoordByType(longitude, latitude, coord_type);

















    openMapByDefault(arr[1], arr[0], name);

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 271:
/*!*****************************************************************!*\
  !*** E:/uni_mblue/static/commonjs/utils/transformCoordinate.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * Created by Wandergis on 2015/7/8.
                                                                                                      * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
                                                                                                      */

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
                                  * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
                                  * 即 百度 转 谷歌、高德
                                  * @param bd_lon
                                  * @param bd_lat
                                  * @returns {*[]}
                                  */
function bd09togcj02(bd_lon, bd_lat) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = bd_lon - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat];
}

/**
   * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
   * 即谷歌、高德 转 百度
   * @param lng
   * @param lat
   * @returns {*[]}
   */
function gcj02tobd09(lng, lat) {
  var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng, bd_lat];
}

/**
   * WGS84转GCj02
   * @param lng
   * @param lat
   * @returns {*[]}
   */
function wgs84togcj02(lng, lat) {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  } else
  {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
    dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [mglng, mglat];
  }
}

/**
   * GCJ02 转换为 WGS84
   * @param lng
   * @param lat
   * @returns {*[]}
   */
function gcj02towgs84(lng, lat) {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  } else
  {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
    dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
    mglat = lat + dlat;
    mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat];
  }
}

function transformlat(lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformlng(lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
}

/**
   * 判断是否在国内，不在国内则不做偏移
   * @param lng
   * @param lat
   * @returns {boolean}
   */
function out_of_china(lng, lat) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false;
}var _default =

{
  bd09togcj02: bd09togcj02, // 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
  gcj02tobd09: gcj02tobd09, // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
  wgs84togcj02: wgs84togcj02, // 
  gcj02towgs84: gcj02towgs84 };exports.default = _default;

/***/ }),

/***/ 29:
/*!**************************************************!*\
  !*** E:/uni_mblue/static/img/icon_nocontent.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAADeCAMAAACey+xzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4YmM4MDlkNi01ZjJlLTQxNGQtOTU3My1jODgyYmJmOTE1YmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzM2MkFCQ0NGQTgxMTFFNzk0RjVFNERGRDc2OTk3M0QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzM2MkFCQ0JGQTgxMTFFNzk0RjVFNERGRDc2OTk3M0QiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU4Y2U2NzVlLWQwNDUtOGQ0OC05MWJlLTkwODg2ZmM2OTQ3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4YmM4MDlkNi01ZjJlLTQxNGQtOTU3My1jODgyYmJmOTE1YmIiLz4gPC9y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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 315:
/*!**************************************************************!*\
  !*** E:/uni_mblue/components/gaoyia-parse/libs/html2json.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _wxDiscode = _interopRequireDefault(__webpack_require__(/*! ./wxDiscode */ 316));
var _htmlparser = _interopRequireDefault(__webpack_require__(/*! ./htmlparser */ 317));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                 * html2Json 改造来自: https://github.com/Jxck/html2json
                                                                                                                                                                 *
                                                                                                                                                                 *
                                                                                                                                                                 * author: Di (微信小程序开发工程师)
                                                                                                                                                                 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                 *               垂直微信小程序开发交流社区
                                                                                                                                                                 *
                                                                                                                                                                 * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                 *
                                                                                                                                                                 * for: 微信小程序富文本解析
                                                                                                                                                                 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                 */function makeMap(str) {var obj = {};var items = str.split(',');for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}return obj;} // Block Elements - HTML 5
var block = makeMap('br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');
// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function removeDOCTYPE(html) {
  var isDocument = /<body.*>([^]*)<\/body>/.test(html);
  return isDocument ? RegExp.$1 : html;
}

function trimHtml(html) {
  return html.
  replace(/&amp;nbsp;/gi, '')
  //     .replace(/&lt;/gi,'')
  //     .replace(/br&gt;&lt;p&gt;&lt;/gi,'')
  //     .replace(/p&gt;&lt;p&gt;/gi,'')
  .replace(/<!--.*?-->/gi, '').
  replace(/\/\*.*?\*\//gi, '').
  replace(/[ ]+</gi, '<').
  replace(/<script[^]*<\/script>/gi, '').
  replace(/<style[^]*<\/style>/gi, '');
}

function getScreenInfo() {
  var screen = {};
  wx.getSystemInfo({
    success: function success(res) {
      screen.width = res.windowWidth;
      screen.height = res.windowHeight;
    } });

  return screen;
}

function html2json(html, customHandler, imageProp, host) {
  // 处理字符串
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = _wxDiscode.default.strDiscode(html);
  // 生成node节点
  var bufArray = [];
  var results = {
    nodes: [],
    imageUrls: [] };


  var screen = getScreenInfo();
  function Node(tag) {
    this.node = 'element';
    this.tag = tag;

    this.$screen = screen;
  }

  (0, _htmlparser.default)(html, {
    start: function start(tag, attrs, unary) {
      // node for this element
      var node = new Node(tag);

      if (bufArray.length !== 0) {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      node.attr = attrs.reduce(function (pre, attr) {var
        name = attr.name;var
        value = attr.value;
        if (name === 'class') {
          node.classStr = value;
        }
        // has multi attibutes
        // make it array of attribute
        if (name === 'style') {
          node.styleStr = value;
        }
        if (value.match(/ /)) {
          value = value.split(' ');
        }

        // if attr already exists
        // merge it
        if (pre[name]) {
          if (Array.isArray(pre[name])) {
            // already array, push to last
            pre[name].push(value);
          } else {
            // single value, make it array
            pre[name] = [pre[name], value];
          }
        } else {
          // not exist, put it
          pre[name] = value;
        }

        return pre;
      }, {});

      // 优化样式相关属性
      if (node.classStr) {
        node.classStr += " ".concat(node.tag);
      } else {
        node.classStr = node.tag;
      }
      if (node.tagType === 'inline') {
        node.classStr += ' inline';
      }

      // 对img添加额外数据
      if (node.tag === 'img') {
        var imgUrl = node.attr.src;
        imgUrl = _wxDiscode.default.urlToHttpUrl(imgUrl, imageProp.domain);
        Object.assign(node.attr, imageProp, {
          src: imgUrl || '' });

        if (imgUrl) {
          results.imageUrls.push(imgUrl);
        }
      }

      // 处理a标签属性
      if (node.tag === 'a') {
        node.attr.href = node.attr.href || '';
      }

      // 处理font标签样式属性
      if (node.tag === 'font') {
        var fontSize = [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        '-webkit-xxx-large'];

        var styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size' };

        if (!node.styleStr) node.styleStr = '';
        Object.keys(styleAttrs).forEach(function (key) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.styleStr += "".concat(styleAttrs[key], ": ").concat(value, ";");
          }
        });
      }

      // 临时记录source资源
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (customHandler.start) {
        customHandler.start(node, results);
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var _parent = bufArray[0] || results;
        if (_parent.nodes === undefined) {
          _parent.nodes = [];
        }
        _parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function end(tag) {
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) {
        console.error('invalid state: mismatch end tag');
      }

      // 当有缓存source资源时于于video补上src资源
      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (customHandler.end) {
        customHandler.end(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (!parent.nodes) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars: function chars(text) {
      if (!text.trim()) return;

      var node = {
        node: 'text',
        text: text };


      if (customHandler.chars) {
        customHandler.chars(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    } });


  return results;
}var _default =

html2json;exports.default = _default;

/***/ }),

/***/ 316:
/*!**************************************************************!*\
  !*** E:/uni_mblue/components/gaoyia-parse/libs/wxDiscode.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // HTML 支持的数学符号
function strNumDiscode(str) {
  str = str.replace(/&forall;|&#8704;|&#x2200;/g, '∀');
  str = str.replace(/&part;|&#8706;|&#x2202;/g, '∂');
  str = str.replace(/&exist;|&#8707;|&#x2203;/g, '∃');
  str = str.replace(/&empty;|&#8709;|&#x2205;/g, '∅');
  str = str.replace(/&nabla;|&#8711;|&#x2207;/g, '∇');
  str = str.replace(/&isin;|&#8712;|&#x2208;/g, '∈');
  str = str.replace(/&notin;|&#8713;|&#x2209;/g, '∉');
  str = str.replace(/&ni;|&#8715;|&#x220b;/g, '∋');
  str = str.replace(/&prod;|&#8719;|&#x220f;/g, '∏');
  str = str.replace(/&sum;|&#8721;|&#x2211;/g, '∑');
  str = str.replace(/&minus;|&#8722;|&#x2212;/g, '−');
  str = str.replace(/&lowast;|&#8727;|&#x2217;/g, '∗');
  str = str.replace(/&radic;|&#8730;|&#x221a;/g, '√');
  str = str.replace(/&prop;|&#8733;|&#x221d;/g, '∝');
  str = str.replace(/&infin;|&#8734;|&#x221e;/g, '∞');
  str = str.replace(/&ang;|&#8736;|&#x2220;/g, '∠');
  str = str.replace(/&and;|&#8743;|&#x2227;/g, '∧');
  str = str.replace(/&or;|&#8744;|&#x2228;/g, '∨');
  str = str.replace(/&cap;|&#8745;|&#x2229;/g, '∩');
  str = str.replace(/&cup;|&#8746;|&#x222a;/g, '∪');
  str = str.replace(/&int;|&#8747;|&#x222b;/g, '∫');
  str = str.replace(/&there4;|&#8756;|&#x2234;/g, '∴');
  str = str.replace(/&sim;|&#8764;|&#x223c;/g, '∼');
  str = str.replace(/&cong;|&#8773;|&#x2245;/g, '≅');
  str = str.replace(/&asymp;|&#8776;|&#x2248;/g, '≈');
  str = str.replace(/&ne;|&#8800;|&#x2260;/g, '≠');
  str = str.replace(/&le;|&#8804;|&#x2264;/g, '≤');
  str = str.replace(/&ge;|&#8805;|&#x2265;/g, '≥');
  str = str.replace(/&sub;|&#8834;|&#x2282;/g, '⊂');
  str = str.replace(/&sup;|&#8835;|&#x2283;/g, '⊃');
  str = str.replace(/&nsub;|&#8836;|&#x2284;/g, '⊄');
  str = str.replace(/&sube;|&#8838;|&#x2286;/g, '⊆');
  str = str.replace(/&supe;|&#8839;|&#x2287;/g, '⊇');
  str = str.replace(/&oplus;|&#8853;|&#x2295;/g, '⊕');
  str = str.replace(/&otimes;|&#8855;|&#x2297;/g, '⊗');
  str = str.replace(/&perp;|&#8869;|&#x22a5;/g, '⊥');
  str = str.replace(/&sdot;|&#8901;|&#x22c5;/g, '⋅');
  return str;
}

// HTML 支持的希腊字母
function strGreeceDiscode(str) {
  str = str.replace(/&Alpha;|&#913;|&#x391;/g, 'Α');
  str = str.replace(/&Beta;|&#914;|&#x392;/g, 'Β');
  str = str.replace(/&Gamma;|&#915;|&#x393;/g, 'Γ');
  str = str.replace(/&Delta;|&#916;|&#x394;/g, 'Δ');
  str = str.replace(/&Epsilon;|&#917;|&#x395;/g, 'Ε');
  str = str.replace(/&Zeta;|&#918;|&#x396;/g, 'Ζ');
  str = str.replace(/&Eta;|&#919;|&#x397;/g, 'Η');
  str = str.replace(/&Theta;|&#920;|&#x398;/g, 'Θ');
  str = str.replace(/&Iota;|&#921;|&#x399;/g, 'Ι');
  str = str.replace(/&Kappa;|&#922;|&#x39a;/g, 'Κ');
  str = str.replace(/&Lambda;|&#923;|&#x39b;/g, 'Λ');
  str = str.replace(/&Mu;|&#924;|&#x39c;/g, 'Μ');
  str = str.replace(/&Nu;|&#925;|&#x39d;/g, 'Ν');
  str = str.replace(/&Xi;|&#925;|&#x39d;/g, 'Ν');
  str = str.replace(/&Omicron;|&#927;|&#x39f;/g, 'Ο');
  str = str.replace(/&Pi;|&#928;|&#x3a0;/g, 'Π');
  str = str.replace(/&Rho;|&#929;|&#x3a1;/g, 'Ρ');
  str = str.replace(/&Sigma;|&#931;|&#x3a3;/g, 'Σ');
  str = str.replace(/&Tau;|&#932;|&#x3a4;/g, 'Τ');
  str = str.replace(/&Upsilon;|&#933;|&#x3a5;/g, 'Υ');
  str = str.replace(/&Phi;|&#934;|&#x3a6;/g, 'Φ');
  str = str.replace(/&Chi;|&#935;|&#x3a7;/g, 'Χ');
  str = str.replace(/&Psi;|&#936;|&#x3a8;/g, 'Ψ');
  str = str.replace(/&Omega;|&#937;|&#x3a9;/g, 'Ω');

  str = str.replace(/&alpha;|&#945;|&#x3b1;/g, 'α');
  str = str.replace(/&beta;|&#946;|&#x3b2;/g, 'β');
  str = str.replace(/&gamma;|&#947;|&#x3b3;/g, 'γ');
  str = str.replace(/&delta;|&#948;|&#x3b4;/g, 'δ');
  str = str.replace(/&epsilon;|&#949;|&#x3b5;/g, 'ε');
  str = str.replace(/&zeta;|&#950;|&#x3b6;/g, 'ζ');
  str = str.replace(/&eta;|&#951;|&#x3b7;/g, 'η');
  str = str.replace(/&theta;|&#952;|&#x3b8;/g, 'θ');
  str = str.replace(/&iota;|&#953;|&#x3b9;/g, 'ι');
  str = str.replace(/&kappa;|&#954;|&#x3ba;/g, 'κ');
  str = str.replace(/&lambda;|&#955;|&#x3bb;/g, 'λ');
  str = str.replace(/&mu;|&#956;|&#x3bc;/g, 'μ');
  str = str.replace(/&nu;|&#957;|&#x3bd;/g, 'ν');
  str = str.replace(/&xi;|&#958;|&#x3be;/g, 'ξ');
  str = str.replace(/&omicron;|&#959;|&#x3bf;/g, 'ο');
  str = str.replace(/&pi;|&#960;|&#x3c0;/g, 'π');
  str = str.replace(/&rho;|&#961;|&#x3c1;/g, 'ρ');
  str = str.replace(/&sigmaf;|&#962;|&#x3c2;/g, 'ς');
  str = str.replace(/&sigma;|&#963;|&#x3c3;/g, 'σ');
  str = str.replace(/&tau;|&#964;|&#x3c4;/g, 'τ');
  str = str.replace(/&upsilon;|&#965;|&#x3c5;/g, 'υ');
  str = str.replace(/&phi;|&#966;|&#x3c6;/g, 'φ');
  str = str.replace(/&chi;|&#967;|&#x3c7;/g, 'χ');
  str = str.replace(/&psi;|&#968;|&#x3c8;/g, 'ψ');
  str = str.replace(/&omega;|&#969;|&#x3c9;/g, 'ω');
  str = str.replace(/&thetasym;|&#977;|&#x3d1;/g, 'ϑ');
  str = str.replace(/&upsih;|&#978;|&#x3d2;/g, 'ϒ');
  str = str.replace(/&piv;|&#982;|&#x3d6;/g, 'ϖ');
  str = str.replace(/&middot;|&#183;|&#xb7;/g, '·');
  return str;
}

function strcharacterDiscode(str) {
  // 加入常用解析

  // str = str.replace(/&nbsp;|&#32;|&#x20;/g, "&nbsp;");
  // str = str.replace(/&ensp;|&#8194;|&#x2002;/g, '&ensp;');
  // str = str.replace(/&#12288;|&#x3000;/g, '<span class=\'spaceshow\'>　</span>');
  // str = str.replace(/&emsp;|&#8195;|&#x2003;/g, '&emsp;');
  // str = str.replace(/&quot;|&#34;|&#x22;/g, "\"");
  // str = str.replace(/&apos;|&#39;|&#x27;/g, "&apos;");
  // str = str.replace(/&acute;|&#180;|&#xB4;/g, "´");
  // str = str.replace(/&times;|&#215;|&#xD7;/g, "×");
  // str = str.replace(/&divide;|&#247;|&#xF7;/g, "÷");
  // str = str.replace(/&amp;|&#38;|&#x26;/g, '&amp;');
  // str = str.replace(/&lt;|&#60;|&#x3c;/g, '&lt;');
  // str = str.replace(/&gt;|&#62;|&#x3e;/g, '&gt;');




  str = str.replace(/&nbsp;|&#32;|&#x20;/g, "<span class='spaceshow'> </span>");
  str = str.replace(/&ensp;|&#8194;|&#x2002;/g, '<span class=\'spaceshow\'> </span>');
  str = str.replace(/&#12288;|&#x3000;/g, '<span class=\'spaceshow\'>　</span>');
  str = str.replace(/&emsp;|&#8195;|&#x2003;/g, '<span class=\'spaceshow\'> </span>');
  str = str.replace(/&quot;|&#34;|&#x22;/g, "\"");
  str = str.replace(/&quot;|&#39;|&#x27;/g, "'");
  str = str.replace(/&acute;|&#180;|&#xB4;/g, "´");
  str = str.replace(/&times;|&#215;|&#xD7;/g, "×");
  str = str.replace(/&divide;|&#247;|&#xF7;/g, "÷");
  str = str.replace(/&amp;|&#38;|&#x26;/g, '&');
  str = str.replace(/&lt;|&#60;|&#x3c;/g, '<');
  str = str.replace(/&gt;|&#62;|&#x3e;/g, '>');
  return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str) {
  str = str.replace(/&OElig;|&#338;|&#x152;/g, 'Œ');
  str = str.replace(/&oelig;|&#339;|&#x153;/g, 'œ');
  str = str.replace(/&Scaron;|&#352;|&#x160;/g, 'Š');
  str = str.replace(/&scaron;|&#353;|&#x161;/g, 'š');
  str = str.replace(/&Yuml;|&#376;|&#x178;/g, 'Ÿ');
  str = str.replace(/&fnof;|&#402;|&#x192;/g, 'ƒ');
  str = str.replace(/&circ;|&#710;|&#x2c6;/g, 'ˆ');
  str = str.replace(/&tilde;|&#732;|&#x2dc;/g, '˜');
  str = str.replace(/&thinsp;|$#8201;|&#x2009;/g, '<span class=\'spaceshow\'> </span>');
  str = str.replace(/&zwnj;|&#8204;|&#x200C;/g, '<span class=\'spaceshow\'>‌</span>');
  str = str.replace(/&zwj;|$#8205;|&#x200D;/g, '<span class=\'spaceshow\'>‍</span>');
  str = str.replace(/&lrm;|$#8206;|&#x200E;/g, '<span class=\'spaceshow\'>‎</span>');
  str = str.replace(/&rlm;|&#8207;|&#x200F;/g, '<span class=\'spaceshow\'>‏</span>');
  str = str.replace(/&ndash;|&#8211;|&#x2013;/g, '–');
  str = str.replace(/&mdash;|&#8212;|&#x2014;/g, '—');
  str = str.replace(/&lsquo;|&#8216;|&#x2018;/g, '‘');
  str = str.replace(/&rsquo;|&#8217;|&#x2019;/g, '’');
  str = str.replace(/&sbquo;|&#8218;|&#x201a;/g, '‚');
  str = str.replace(/&ldquo;|&#8220;|&#x201c;/g, '“');
  str = str.replace(/&rdquo;|&#8221;|&#x201d;/g, '”');
  str = str.replace(/&bdquo;|&#8222;|&#x201e;/g, '„');
  str = str.replace(/&dagger;|&#8224;|&#x2020;/g, '†');
  str = str.replace(/&Dagger;|&#8225;|&#x2021;/g, '‡');
  str = str.replace(/&bull;|&#8226;|&#x2022;/g, '•');
  str = str.replace(/&hellip;|&#8230;|&#x2026;/g, '…');
  str = str.replace(/&permil;|&#8240;|&#x2030;/g, '‰');
  str = str.replace(/&prime;|&#8242;|&#x2032;/g, '′');
  str = str.replace(/&Prime;|&#8243;|&#x2033;/g, '″');
  str = str.replace(/&lsaquo;|&#8249;|&#x2039;/g, '‹');
  str = str.replace(/&rsaquo;|&#8250;|&#x203a;/g, '›');
  str = str.replace(/&oline;|&#8254;|&#x203e;/g, '‾');
  str = str.replace(/&euro;|&#8364;|&#x20ac;/g, '€');
  str = str.replace(/&trade;|&#8482;|&#x2122;/g, '™');
  str = str.replace(/&larr;|&#8592;|&#x2190;/g, '←');
  str = str.replace(/&uarr;|&#8593;|&#x2191;/g, '↑');
  str = str.replace(/&rarr;|&#8594;|&#x2192;/g, '→');
  str = str.replace(/&darr;|&#8595;|&#x2193;/g, '↓');
  str = str.replace(/&harr;|&#8596;|&#x2194;/g, '↔');
  str = str.replace(/&crarr;|&#8629;|&#x21b5;/g, '↵');
  str = str.replace(/&lceil;|&#8968;|&#x2308;/g, '⌈');
  str = str.replace(/&rceil;|&#8969;|&#x2309;/g, '⌉');
  str = str.replace(/&lfloor;|&#8970;|&#x230a;/g, '⌊');
  str = str.replace(/&rfloor;|&#8971;|&#x230b;/g, '⌋');
  str = str.replace(/&loz;|&#9674;|&#x25ca;/g, '◊');
  str = str.replace(/&spades;|&#9824;|&#x2660;/g, '♠');
  str = str.replace(/&clubs;|&#9827;|&#x2663;/g, '♣');
  str = str.replace(/&hearts;|&#9829;|&#x2665;/g, '♥');
  str = str.replace(/&diams;|&#9830;|&#x2666;/g, '♦');
  return str;
}

function strDiscode(str) {
  str = strNumDiscode(str);
  str = strGreeceDiscode(str);
  str = strcharacterDiscode(str);
  str = strOtherDiscode(str);
  return str;
}

function urlToHttpUrl(url, domain) {
  if (/^\/\//.test(url)) {
    return "https:".concat(url);
  } else if (/^\//.test(url)) {
    return "https://".concat(domain).concat(url);
  }
  return url;
}var _default =

{
  strDiscode: strDiscode,
  urlToHttpUrl: urlToHttpUrl };exports.default = _default;

/***/ }),

/***/ 317:
/*!***************************************************************!*\
  !*** E:/uni_mblue/components/gaoyia-parse/libs/htmlparser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      *
                                                                                                      * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
                                                                                                      *
                                                                                                      * author: Di (微信小程序开发工程师)
                                                                                                      * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                      *               垂直微信小程序开发交流社区
                                                                                                      *
                                                                                                      * github地址: https://github.com/icindy/wxParse
                                                                                                      *
                                                                                                      * for: 微信小程序富文本解析
                                                                                                      * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                      */
// Regular Expressions for parsing tags and attributes

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

function makeMap(str) {
  var obj = {};
  var items = str.split(',');
  for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}
  return obj;
}

// Empty Elements - HTML 5
var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr');

// Block Elements - HTML 5
var block = makeMap('address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

// Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var last = html;
  var stack = [];

  stack.last = function () {return stack[stack.length - 1];};

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    var pos;
    if (!tagName) {
      pos = 0;
    } else {
      // Find the closest opened tag of the same type
      tagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos -= 1) {
        if (stack[pos] === tagName) break;
      }
    }
    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i -= 1) {
        if (handler.end) handler.end(stack[i]);
      }

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() === tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function genAttr(matches, name) {
        var value = arguments[2] || arguments[3] || arguments[4] || (fillAttrs[name] ? name : '');

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"') // "
        });
      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  while (html) {
    chars = true;

    if (html.indexOf('</') === 0) {
      match = html.match(endTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(endTag, parseEndTag);
        chars = false;
      }

      // start tag
    } else if (html.indexOf('<') === 0) {
      match = html.match(startTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(startTag, parseStartTag);
        chars = false;
      }
    }

    if (chars) {
      index = html.indexOf('<');
      var text = '';
      while (index === 0) {
        text += '<';
        html = html.substring(1);
        index = html.indexOf('<');
      }
      text += index < 0 ? html : html.substring(0, index);
      html = index < 0 ? '' : html.substring(index);

      if (handler.chars) handler.chars(text);
    }

    if (html === last) throw new Error("Parse Error: ".concat(html));
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();
}var _default =

HTMLParser;exports.default = _default;

/***/ }),

/***/ 323:
/*!**************************************************!*\
  !*** E:/uni_mblue/components/uni-icons/icons.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 4:
/*!*******************************!*\
  !*** E:/uni_mblue/pages.json ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 40:
/*!***************************************************!*\
  !*** E:/uni_mblue/static/commonjs/utils/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.objectToUrlParams = void 0;var objectToUrlParams = function objectToUrlParams(data) {
  var _result = [];
  for (var key in data) {
    var value = data[key];
    if (value.constructor == Array) {
      value.forEach(function (_value) {
        _result.push(key + "=" + _value);
      });
    } else {
      _result.push(key + '=' + value);
    }
  }
  return '?' + _result.join('&');
};exports.objectToUrlParams = objectToUrlParams;

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-23720191024001","_inBundle":false,"_integrity":"sha512-vJEk493Vdb8KueNzR2otzDi23rfyRcQBo/t1R41MwNGPk+AUB94gh10+HVLo98DRcvMzkuVofz3KXTAfEx24iw==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-23720191024001.tgz","_shasum":"18272814446a9bc6053bc92666ec7064a1767588","_spec":"@dcloudio/uni-stat@next","_where":"/Users/fxy/Documents/DCloud/HbuilderX-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a725c04ef762e5df78a9a69d140c2666e0de05fc","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-23720191024001"};

/***/ }),

/***/ 7:
/*!************************************************!*\
  !*** E:/uni_mblue/pages.json?{"type":"style"} ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationStyle": "custom" }, "pages/person/resume/resume": { "navigationStyle": "custom" }, "pages/person/msg/msg": { "navigationBarTitleText": "消息" }, "pages/jobFair/jobFair": { "navigationBarTitleText": "招聘会" }, "pages/companyDetail/companyDetail": { "navigationStyle": "custom" }, "pages/jobFair/jobFairList": { "navigationBarTitleText": "招聘会列表" }, "pages/jobFair/jobFairDetail": { "navigationBarTitleText": "招聘会详情" }, "pages/jobFair/jobFairSearch": { "navigationBarTitleText": "招聘会搜索" }, "pages/famousCompany/famousCompany": { "navigationStyle": "custom" }, "pages/jobDetail/jobDetail": { "navigationStyle": "custom" }, "pages/mine/mine": { "navigationBarTitleText": "我的", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#fb5958" }, "pages/myCollection/myCollection": { "navigationStyle": "custom" }, "pages/advice/advice": { "navigationStyle": "custom" }, "pages/record/record": { "navigationStyle": "custom" }, "pages/invite/invite": { "navigationBarTitleText": "面试邀请", "navigationBarBackgroundColor": "#FFFFFF" }, "pages/mapBox/mapBox": { "navigationStyle": "custom" }, "pages/inviteDetail/inviteDetail": { "navigationBarTitleText": "面试邀请", "navigationBarBackgroundColor": "#FFFFFF" }, "pages/eduTrain/eduTrain": { "navigationStyle": "custom" }, "pages/eduDetail/eduDetail": { "navigationStyle": "custom" }, "pages/login/login": { "navigationStyle": "custom" }, "pages/search/search": { "navigationStyle": "custom" }, "pages/person/my/my": { "navigationStyle": "custom" }, "pages/person/resume/certificate/certificate": { "navigationStyle": "custom" }, "pages/person/resume/workexp/workexp": { "navigationStyle": "custom" }, "pages/person/resume/presentAddress/presentAddress": { "navigationStyle": "custom" }, "pages/person/resume/jobCategory/jobCategory": { "navigationStyle": "custom" }, "pages/jobDetail/postReport": { "navigationStyle": "custom" }, "pages/material/material": { "navigationStyle": "custom" }, "pages/nearbyJob/nearbyJob": { "navigationStyle": "custom" }, "pages/searchDetail/searchDetail": { "navigationStyle": "custom" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "kuaimi", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!***********************************************!*\
  !*** E:/uni_mblue/pages.json?{"type":"stat"} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__3E5D214" };exports.default = _default;

/***/ }),

/***/ 97:
/*!*********************************************!*\
  !*** E:/uni_mblue/static/img/zhimingbg.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/zhimingbg.5c23b1fb.png";

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map