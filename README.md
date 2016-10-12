# angular-http-backup

Status:
[![npm](https://img.shields.io/npm/dm/localeval.svg?maxAge=2592000)](https://github.com/zouhenry/angular-http-backup)
[![Build Status](https://travis-ci.org/zouhenry/angular-http-backup.svg?branch=master)](https://travis-ci.org/zouhenry/angular-http-backup)
[![codecov](https://codecov.io/gh/zouhenry/angular-http-backup/branch/master/graph/badge.svg)](https://codecov.io/gh/zouhenry/angular-http-backup)

##Replay cached data when network/service fails

####Each successful request is cached in localStorage with url as the key. When the network/service fails, a cached response will be served up

----------------------
Getting Started
----------------------

```
angular
    .module( 'your.module', [ 'httpbackup' ] )
    .config( $httpProvider, httpBackupCacheProvider ) {
        $httpProvider.interceptors.push( 'httpBackupInterceptor' );
        
        // by default all urls are cached,
        // this allows regex to limit what gets cached
        httpBackupCacheProvider.setCachingRules( [
          new RegExp( "^api\/v1" ),
          new RegExp( ".*[^html]$" )
        ] );
    }
```  
