/**
 * Saves previously successful ajax requests in localStorage and replays them back when there’s server response fails/network error
 */

export default function HttpBackupInterceptor( $q, $rootScope, $httpParamSerializerJQLike, httpBackupCache ) {

  return {
    response     : response,
    responseError: responseError
  };

  function response( response ) {
    // for every successful request, cache the response
    httpBackupCache.setItem( getCacheKey( response.config ), response );
    return response;
  }

  function responseError( response ) {
    console.log( 'before getKey' );
    var data = httpBackupCache.getItem( getCacheKey( response.config ) );
    if ( data ) { //if response fails and there's cached data
      $rootScope.$emit( 'HttpBackup_activated', { url: response.config.url, response: data } );
      return $q.resolve( data );
    } else {
      return $q.reject( response );
    }
  }

  function getCacheKey( config ) {
    return config.url + $httpParamSerializerJQLike( config.params );
  }
}

HttpBackupInterceptor.$inject = ['$q', '$rootScope', '$httpParamSerializerJQLike', 'httpBackupCache'];