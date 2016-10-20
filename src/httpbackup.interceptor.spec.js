import HttpBackupInterceptor from './httpbackup.interceptor';
import HttpBackupCache from './httpbackup.cache';

import { noop }  from 'lodash';

describe( 'HttpBackupInterceptor', ()=> {
  let $q;
  let interceptor;
  let storage;
  let $rootScope;

  function $httpParamSerializerJQLike( params ) {
    return "";
  }

  // console.log( angular.mock );
  // console.log( angular.mock.inject );
  // console.log(HttpBackup);
  beforeEach( function() {
    $q         = { resolve: noop, reject: noop };
    storage    = new HttpBackupCache( window );
    $rootScope = { $emit: noop };

    interceptor = new HttpBackupInterceptor( $q, $rootScope, $httpParamSerializerJQLike, storage );
  } );

  afterEach( function() {
    window.localStorage.clear();
  } );

  describe( 'sanity check', function() {
    it( 'should always pass', () => {
      expect( interceptor ).toBeDefined();
      expect( interceptor.response ).toBeDefined();
      expect( interceptor.responseError ).toBeDefined();
    } );
  } );

  describe( 'response ()', ()=> {

    it( 'should add response to localStorage with url as key', ()=> {
      var myResponse = getResponse();

      expect( storage.getItem( 'api/v1/status' ) ).toBeNull();
      interceptor.response( myResponse );
      expect( storage.getItem( 'api/v1/status' ) ).toEqual( myResponse );
    } );
  } );


  describe( 'responseError ()', ()=> {

    it( 'should return error if localStorage does not have cache', ()=> {
      var myResponse = getResponse();
      spyOn( $q, "reject" );

      expect( storage.getItem( 'api/v1/status' ) ).toBeNull();
      interceptor.responseError( myResponse );
      expect( $q.reject ).toHaveBeenCalledWith( myResponse );
    } );

    it( 'should return cached object', ()=> {
      var responseError = getResponseError();
      var response      = getResponse();
      spyOn( $q, "resolve" );
      storage.setItem( 'api/v1/status', response );
      expect( storage.getItem( 'api/v1/status' ) ).not.toBeNull();
      interceptor.responseError( responseError );
      expect( $q.resolve ).toHaveBeenCalledWith( jasmine.objectContaining( response ) );
    } );

    it( 'should reject if unable to parse json', ()=> {
      var responseError = getResponseError();
      var response      = getResponse();
      spyOn( $q, "reject" );
      storage.setItem( 'api/v1/status', undefined );
      expect( storage.getItem( 'api/v1/status' ) ).toBeNull();
      interceptor.responseError( responseError );
      expect( $q.reject ).toHaveBeenCalledWith( jasmine.objectContaining( responseError ) );
    } );

  } );

  function getResponse() {
    var myResponse = {
      config: {
        url   : "api/v1/status",
        params: {}
      },
      data  : { EID: 123456789, Description: "Fake Enterprise ID" }
    };
    return myResponse;
  }

  function getResponseError() {
    var myResponse = {
      config: {
        url   : "api/v1/status",
        params: {}
      },
      data  : { EID: "response-error", Description: "Error - 12345" }
    };
    return myResponse;
  }
} );
