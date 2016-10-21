/**
 * Saves previously successful ajax requests in localStorage and replays them back when there’s server response fails/network error
 */

export default function HttpBackupInterceptor( $q, $rootScope, $httpParamSerializerJQLike, httpBackupCache ) {

  return {
    response     : response,
    responseError: responseError
  };

  function response( response ) {
    var urlKey = getCacheKey( response.config );
    // for every successful request, cache the response
    httpBackupCache.setItem( urlKey, response );
    $rootScope.$emit( 'HttpBackup_cached', { url: urlKey, response: response } );
    return response;
  }

  function responseError( response ) {
    var urlKey = getCacheKey( response.config );

    var cachedResponse = httpBackupCache.getItem( urlKey );
    if ( cachedResponse ) { //if response fails and there's cached data
      $rootScope.$emit( 'HttpBackup_activated', { url: urlKey, response: cachedResponse } );
      return $q.resolve( cachedResponse );
    } else {
      return $q.reject( response );
    }
  }

  function getCacheKey( config ) {
    return config.url + $httpParamSerializerJQLike( config.params );
  }
}

HttpBackupInterceptor.$inject = ['$q', '$rootScope', '$httpParamSerializerJQLike', 'httpBackupCache'];