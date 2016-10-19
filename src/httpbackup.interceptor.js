/**
 * Saves previously successful ajax requests in localStorage and replays them back when there’s server response fails/network error
 */

export default function HttpBackupInterceptor( $q, $rootScope, httpBackupCache ) {
  return {
    response     : response,
    responseError: responseError
  };

  function response( response ) {
    // for every successful request, cache the response
    httpBackupCache.setItem( response.config.url, response );
    return response;
  }

  function responseError( response ) {
    var data = httpBackupCache.getItem( response.config.url );
    if ( data ) { //if response fails and there's cached data
      console.warn( 'using offline cache:', response.config.url );
      $rootScope.$emit( 'HttpBackup_activated', { url: response.config.url, response: data } );
      return $q.resolve( data );
    } else {
      return $q.reject( response );
    }
  }
}
HttpBackupInterceptor.$inject = ['$q', '$rootScope', 'httpBackupCache'];