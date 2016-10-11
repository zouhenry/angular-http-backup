/**
 * Saves previously successful ajax requests in localStorage and replays them back when there’s server response fails/network error
 */

class HttpBackupInterceptor {

  constructor( $q, HttpBackupStorage ) {
    this.$q      = $q;
    this.storage = HttpBackupStorage;
  }

  response( response ) {
    // for every successful request, cache the response
    this.storage.setItem( response.config.url, JSON.stringify( response ) );
    return response;
  }

  responseError( response ) {
    var data = this.storage.getItem( response.config.url );
    if ( data ) { //if response fails and there's cached data
      console.warn( 'using offline cache:', response.config.url );
      return this.$q.resolve( data );
    } else {
      return this.$q.reject( response );
    }
  }
}
HttpBackupInterceptor.$inject = ['$q'];

export default HttpBackupInterceptor;