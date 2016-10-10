// import httpbackup from './httpbackup.module';
import httpbackupInterceptor from './httpbackup.interceptor';
import { noop }  from 'lodash';

describe( 'httpbackupInterceptor', ()=> {
  let $q;
  let interceptor;

  beforeEach( function() {
    $q          = { resolve: noop, reject: noop };
    interceptor = httpbackupInterceptor( $q );
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

      expect( localStorage.getItem( 'api/v1/status' ) ).toBeNull();
      interceptor.response( myResponse );
      expect( localStorage.getItem( 'api/v1/status' ) ).toEqual( JSON.stringify( myResponse ) );
    } );
  } );


  describe( 'responseError ()', ()=> {

    it( 'should return error if localStorage does not have cache', ()=> {
      var myResponse = getResponse();
      spyOn( $q, "reject" );

      expect( localStorage.getItem( 'api/v1/status' ) ).toBeNull();
      interceptor.responseError( myResponse );
      expect( $q.reject ).toHaveBeenCalledWith( myResponse );
    } );

    it( 'should return cached object', ()=> {
      var responseError = getResponseError();
      var response      = getResponse();
      spyOn( $q, "resolve" );
      localStorage.setItem( 'api/v1/status', JSON.stringify( response ) );
      expect( localStorage.getItem( 'api/v1/status' ) ).not.toBeNull();
      interceptor.responseError( responseError );
      expect( $q.resolve ).toHaveBeenCalledWith( jasmine.objectContaining( response ) );
    } );

    it( 'should reject if unable to parse json', ()=> {
      var responseError = getResponseError();
      var response      = getResponse();
      spyOn( $q, "reject" );
      localStorage.setItem( 'api/v1/status', undefined );
      expect( localStorage.getItem( 'api/v1/status' ) ).not.toBeNull();
      interceptor.responseError( responseError );
      expect( $q.reject ).toHaveBeenCalledWith( jasmine.objectContaining( responseError ) );
    } );

  } );

  function getResponse() {
    var myResponse = {
      config: {
        url: "api/v1/status"
      },
      data  : { EID: 123456789, Description: "Fake Enterprise ID" }
    };
    return myResponse;
  }

  function getResponseError() {
    var myResponse = {
      config: {
        url: "api/v1/status"
      },
      data  : { EID: "response-error", Description: "Error - 12345" }
    };
    return myResponse;
  }
} );
