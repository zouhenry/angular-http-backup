# angular-http-backup

Status:
[![npm downloads](https://img.shields.io/npm/dm/angular-http-backup.svg?style=flat-square)](http://npm-stat.com/charts.html?package=angular-http-backup)
[![Build Status](https://travis-ci.org/zouhenry/angular-http-backup.svg?branch=master)](https://travis-ci.org/zouhenry/angular-http-backup)
[![codecov](https://codecov.io/gh/zouhenry/angular-http-backup/branch/master/graph/badge.svg)](https://codecov.io/gh/zouhenry/angular-http-backup)

##Replay cached data when network/service fails

####Each successful request is cached in localStorage with url as the key. When the network/service fails, a cached response will be served up

----------------------
Getting Started
----------------------
```
npm install --save angular-http-backup
```
```
bower install --save angular-http-backup
```

----------------------
usage
----------------------
```
angular
    .module( 'your.module', [ 'httpbackup' ] )
    .config( $httpProvider, httpBackupCacheProvider ) {
        $httpProvider.interceptors.push( 'httpBackupInterceptor' );
        
        // by default all urls are cached,
        // this allows regex to limit what gets cached
        httpBackupCacheProvider.setCachingRules( [
          new RegExp( "^api\/v1" ),        //cache request urls starting with "api/v1"
          new RegExp("^(?!.*[.]html$).*$") //ignore request urls ending with ".html"
        ] );
    }
```  

### Resetting cache
```
// inject httpBackupCache
function controller(httpBackupCache){
    //reset all keys
    httpBackupCache.clear();
    
    // remove individual key 
    httpBackupCache.removeItem('GET:api/v1/auth/login');
    httpBackupCache.removeItem('POST:api/v1/auth/status');
    httpBackupCache.removeItem('PUT:api/v1/auth/ping');
}
```

### Events
```
    // event $emitted on $rootScope when a response is cached
    $rootScope.$on( 'HttpBackup_cached', function( event, data ) {
        console.log(data.url);      // request url
        console.log(data.response); // cached response
    }    
    
    // event $emitted on $rootScope when a cached response is used
    $rootScope.$on( 'HttpBackup_activated', function( event, data ) {
        console.log(data.url);      // request url
        console.log(data.response); // cached response
    }
```