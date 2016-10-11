/**
 * Created by Henry Zou on 10/7/2016.
 *
 *
 * USAGE:
 * In the config block, register the Interceptor
 * $httpProvider.interceptors.push( 'HttpBackupInterceptor' );
 *
 */

import HttpBackupInterceptor from './httpbackup.interceptor';
import HttpBackupCache from './httpbackup.cache';

export default
angular.module( 'httpbackup', [] )
  .factory( 'httpBackupInterceptor', HttpBackupInterceptor )
  .provider( 'httpBackupCache', HttpBackupCache );

