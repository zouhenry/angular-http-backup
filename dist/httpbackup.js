/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _httpbackup = __webpack_require__(1);
	
	var _httpbackup2 = _interopRequireDefault(_httpbackup);
	
	var _httpbackup3 = __webpack_require__(2);
	
	var _httpbackup4 = _interopRequireDefault(_httpbackup3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by Henry Zou on 10/7/2016.
	 *
	 *
	 * USAGE:
	 * In the config block, register the Interceptor
	 * $httpProvider.interceptors.push( 'HttpBackupInterceptor' );
	 *
	 */
	
	exports.default = angular.module('httpbackup', []).factory('httpBackupInterceptor', _httpbackup2.default).provider('httpBackupCache', _httpbackup4.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = HttpBackupInterceptor;
	/**
	 * Saves previously successful ajax requests in localStorage and replays them back when there’s server response fails/network error
	 */
	
	function HttpBackupInterceptor($q, $rootScope, $httpParamSerializerJQLike, httpBackupCache) {
	
	  return {
	    response: response,
	    responseError: responseError
	  };
	
	  function response(response) {
	    var urlKey = getCacheKey(response.config);
	    // for every successful request, cache the response
	    httpBackupCache.setItem(urlKey, response);
	    $rootScope.$emit('HttpBackup_cached', { url: urlKey, response: response });
	    return response;
	  }
	
	  function responseError(response) {
	    var urlKey = getCacheKey(response.config);
	
	    var cachedResponse = httpBackupCache.getItem(urlKey);
	    if (cachedResponse) {
	      //if response fails and there's cached data
	      $rootScope.$emit('HttpBackup_activated', { url: urlKey, response: cachedResponse });
	      return $q.resolve(cachedResponse);
	    } else {
	      return $q.reject(response);
	    }
	  }
	
	  function getCacheKey(config) {
	    return config.method + ":" + config.url + $httpParamSerializerJQLike(config.params);
	  }
	}
	
	HttpBackupInterceptor.$inject = ['$q', '$rootScope', '$httpParamSerializerJQLike', 'httpBackupCache'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = HttpBackupCache;
	/**
	 * Caching managing
	 */
	
	function HttpBackupCache() {
	  var allowedUrls = [];
	  var storage = window.localStorage;
	  var storageKeys = getItem("HttpBackupCacheKeys") || {};
	
	  return {
	    setCachingRules: setCachingRules, setItem: setItem, getItem: getItem, removeItem: removeItem, clear: clear, checkAllowed: checkAllowed,
	    $get: function $get() {
	      return { setCachingRules: setCachingRules, setItem: setItem, getItem: getItem, removeItem: removeItem, clear: clear, checkAllowed: checkAllowed };
	    }
	  };
	
	  /**
	   * By default, all urls are cached. This allows the application to specify which urls to cache via regex
	   *
	   * @param rules - Array of regular expressions
	   */
	  function setCachingRules(rules) {
	    allowedUrls = rules;
	  }
	
	  function setItem(key, data) {
	    var isAllowed = checkAllowed(key);
	    if (!isAllowed) {
	      return;
	    }
	
	    storage.setItem(key, JSON.stringify(data));
	    if (key !== "HttpBackupCacheKeys") {
	      storageKeys[key] = true;
	      setItem("HttpBackupCacheKeys", storageKeys);
	    }
	  }
	
	  function getItem(key) {
	    var data = storage.getItem(key);
	    try {
	      return JSON.parse(data);
	    } catch (ex) {
	      return null;
	    }
	  }
	
	  function removeItem(key) {
	    storage.removeItem(key);
	
	    delete storageKeys[key];
	    setItem("HttpBackupCacheKeys", storageKeys);
	  }
	
	  function clear() {
	    Object.keys(storageKeys).forEach(function (key) {
	      delete storageKeys[key];
	      removeItem(key);
	    });
	    setItem("HttpBackupCacheKeys", storageKeys);
	  }
	
	  function checkAllowed(url) {
	    if (url === "HttpBackupCacheKeys") {
	      return true;
	    }
	
	    var allAllowed = allowedUrls.reduce(function (allowed, regex) {
	      return allowed && regex.test(url);
	    }, true);
	    return allAllowed;
	  }
	}
	HttpBackupCache.$inject = [];

/***/ }
/******/ ]);
//# sourceMappingURL=httpbackup.js.map