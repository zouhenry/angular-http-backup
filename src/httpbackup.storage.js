/**
 * Caching managing
 */

/* @ngInject */
class HttpBackupStorage {

  constructor( $window ) {
    this.storage     = $window.localStorage;
    this.storageKeys = this.getItem( "HttpBackupStorageKeys" ) || {};
  }

  setItem( key, data ) {
    this.storage.setItem( key, JSON.stringify( data ) );
    if ( key !== "HttpBackupStorageKeys" ) {
      this.storageKeys[key] = true;
      this.storage.setItem( "HttpBackupStorageKeys", this.storageKeys );
    }
  }

  getItem( key ) {
    var data = this.storage.getItem( key );
    try {
      return JSON.parse( data );
    } catch ( ex ) {
      return null;
    }
  }

  removeItem( key ) {
    this.storage.removeItem( key );

    delete this.storageKeys[key];
    this.storage.setItem( "HttpBackupStorageKeys", this.storageKeys );
  }

  clear() {
    Object.keys( this.storageKeys ).forEach( ( key )=> {
      delete this.storageKeys[key];
      this.removeItem( key );
    } );
  }
}
HttpBackupStorage.$inject = ['$window'];

export default HttpBackupStorage;