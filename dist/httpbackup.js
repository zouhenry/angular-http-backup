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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = angular.module('httpbackup', []).factory('httpBackupInterceptor', _httpbackup2.default); /**
	                                                                                                            * Created by Henry Zou on 10/7/2016.
	                                                                                                            *
	                                                                                                            *
	                                                                                                            * USAGE:
	                                                                                                            * In the config block, register the Interceptor
	                                                                                                            * $httpProvider.interceptors.push( 'HttpBackupInterceptor' );
	                                                                                                            *
	                                                                                                            */

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	HttpBackupInterceptor.$inject = ["$q", "$log"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Saves previously successful ajax requests in localStorage and replays them back when there’s server response fails/network error
	 */
	
	exports.default = HttpBackupInterceptor;
	
	/* @ngInject */
	
	function HttpBackupInterceptor($q, $log) {
	
	  return {
	    response: response,
	    responseError: responseError
	  };
	
	  function response(response) {
	    // for every successful request, cache the response
	    window.localStorage.setItem(response.config.url, JSON.stringify(response));
	    return response;
	  }
	
	  function responseError(response) {
	    var data = window.localStorage.getItem(response.config.url);
	    if (data) {
	      //if response fails and there's cached data
	
	      try {
	        // use cached data
	        data = JSON.parse(data);
	        console.debug('using offline cache:', response.config.url);
	        return $q.resolve(data);
	      } catch (ex) {
	        return $q.reject(response);
	      }
	    } else {
	      return $q.reject(response);
	    }
	  }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=httpbackup.js.map