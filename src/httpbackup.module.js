/**
 * Created by Henry Zou on 10/7/2016.
 *
 *
 * USAGE:
 * In the config block, register the Interceptor
 * $httpProvider.interceptors.push( 'HttpBackupInterceptor' );
 *
 */

import httpbackupInterceptor from './httpbackup.interceptor';

angular.module( 'httpbackup', [] )
  .factory( 'HttpBackupInterceptor', httpbackupInterceptor );

