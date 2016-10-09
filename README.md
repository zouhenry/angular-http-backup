# angular-http-backup

##Replay cached data when network/service fails

####Each successful request is cached in localStorage with url as the key. When the network/service fails, a cached response will be served up

----------------------
Getting Started
----------------------

```
angular
    .module( 'your.module', [ 'httpbackup' ] )
    .config( $httpProvider) {
        $httpProvider.interceptors.push( 'HttpBackupInterceptor' );
    }
```  
