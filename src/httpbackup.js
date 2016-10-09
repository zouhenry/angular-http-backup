/**
 * Created by Henry Zou on 10/7/2016.
 * 
 * 
 * USAGE: 
 * In the config block, register the Interceptor
 * $httpProvider.interceptors.push( 'HttpBackupInterceptor' );
 * 
 */

(function() {
  'use strict';

  angular.module( 'httpbackup', [] )
    .factory( 'HttpBackupInterceptor', iscHttpBackupInterceptor );

  /**
   * Saves previously successful ajax requests in localstorage and replays them back when there’s server response fails/network error
   *
   */
  /* @ngInject */
  function iscHttpBackupInterceptor(  $q ) {//jshint ignore:line

    return {
      response     : response,
      responseError: responseError
    };


    function response( response ) {
      // for every successful request, cache the response
      window.localStorage.setItem( response.config.url, JSON.stringify( response ) );
      return response;
    }

    function responseError( response ) {
      var data = window.localStorage.getItem( response.config.url );
      if ( data ) { //if response fails and there's cached data
        try {
          // use cached data
          data = JSON.parse( data );
          console.warn( 'using offline cache:', response.config.url );
          return $q.resolve( data );
        } catch ( ex ) {
          return $q.reject( response );
        }
      } else {
        return $q.reject( response );
      }
    }
  }

})();
