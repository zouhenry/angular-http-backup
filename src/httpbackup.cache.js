/**
 * Caching managing
 */

export default function HttpBackupCache() {
  let allowedUrls = [];
  let storage     = window.localStorage;
  let storageKeys = getItem( "HttpBackupCacheKeys" ) || {};

  return {
    setCachingRules, setItem, getItem, removeItem, clear, checkAllowed,
    $get: ()=> {
      return { setCachingRules, setItem, getItem, removeItem, clear, checkAllowed };
    }
  };

  /**
   * By default, all urls are cached. This allows the application to specify which urls to cache via regex
   *
   * @param rules - Array of regular expressions
   */
  function setCachingRules( rules ) {
    allowedUrls = rules;
  }

  function setItem( key, data ) {
    var isAllowed = checkAllowed( key );
    if ( !isAllowed ) {
      return;
    }

    storage.setItem( key, JSON.stringify( data ) );
    if ( key !== "HttpBackupCacheKeys" ) {
      storageKeys[key] = true;
      setItem( "HttpBackupCacheKeys", storageKeys );
    }
  }

  function getItem( key ) {
    var data = storage.getItem( key );
    try {
      return JSON.parse( data );
    } catch ( ex ) {
      return null;
    }
  }

  function removeItem( key ) {
    storage.removeItem( key );

    delete storageKeys[key];
    setItem( "HttpBackupCacheKeys", storageKeys );
  }

  function clear() {
    Object.keys( storageKeys ).forEach( ( key )=> {
      delete storageKeys[key];
      removeItem( key );
    } );
    setItem( "HttpBackupCacheKeys", storageKeys );
  }

  function checkAllowed( url ) {
    if ( url === "HttpBackupCacheKeys" ) {
      return true;
    }

    var allAllowed = allowedUrls.reduce( ( allowed, regex ) => {
      return allowed && regex.test( url );
    }, true );
    return allAllowed;
  }
}
HttpBackupCache.$inject = [];
