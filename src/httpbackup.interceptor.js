/**
 * Saves previously successful ajax requests in localStorage and replays them back when there’s server response fails/network error
 */

export default HttpBackupInterceptor;

/* @ngInject */
function HttpBackupInterceptor( $q ) {

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