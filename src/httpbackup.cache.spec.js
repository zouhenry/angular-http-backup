import HttpBackupCache from './httpbackup.cache';


describe( 'HttpBackupCache', ()=> {
  let cache;

  beforeEach( function() {
    cache = new HttpBackupCache( window );
  } );

  afterEach( function() {
    window.localStorage.clear();
  } );

  describe( 'sanity check', function() {
    it( 'should always pass', () => {
      expect( cache ).toBeDefined();
      expect( cache.setItem ).toBeDefined();
      expect( cache.getItem ).toBeDefined();
      expect( cache.removeItem ).toBeDefined();
      expect( cache.clear ).toBeDefined();
    } );
  } );

  describe( 'setItem()', ()=> {

    it( 'should invoke localStorage.setItem', ()=> {
      var myResponse = getResponse();
      spyOn( localStorage, 'setItem' );
      cache.setItem( myResponse.url, myResponse );
      expect( localStorage.setItem ).toHaveBeenCalled();
    } );

    it( 'should stringify data', ()=> {
      var myResponse = getResponse();
      spyOn( localStorage, 'setItem' );
      cache.setItem( myResponse.url, myResponse );
      expect( localStorage.setItem ).toHaveBeenCalledWith( myResponse.url, JSON.stringify( myResponse ) );
    } );

  } );

  describe( 'removeItem ()', ()=> {

    it( 'should invoke localStorage.removeItem', ()=> {
      var myResponse = getResponse();
      spyOn( localStorage, 'removeItem' );
      cache.removeItem( myResponse.url );
      expect( localStorage.removeItem ).toHaveBeenCalledWith( myResponse.url );
    } );

  } );

  describe( 'clear ()', ()=> {

    it( 'should only clear keys set by httpback.storage', function() {
      localStorage.setItem( 'keep', 'me' );
      cache.setItem( 'delete', 'me' );
      cache.clear();
      expect( localStorage.getItem( 'keep' ) ).toBe( 'me' );
      expect( cache.getItem( 'storage' ) ).toBe( null );
    } );

  } );

  describe( 'getItem ()', ()=> {

    it( 'should return "null" if localStorage does not have cache', ()=> {
      cache.removeItem( 'api/v1/status' );
      expect( cache.getItem( 'api/v1/status' ) ).toBeNull();
    } );

    it( 'should return cached object', ()=> {
      var response = getResponse();
      cache.setItem( 'api/v1/status', response );
      expect( cache.getItem( 'api/v1/status' ) ).toEqual( response );
    } );

    it( 'should return "null" if unable to parse json', ()=> {
      cache.setItem( 'api/v1/status', undefined );
      var actual = cache.getItem( 'api/v1/status' );
      console.log( actual );
      expect( cache.getItem( 'api/v1/status' ) ).toBeNull();
    } );

  } );

  describe( '$get ()', ()=> {
    it( 'should have these methods', function() {
      var factory = cache.$get();
      expect( factory.setCachingRules ).toBeDefined();
      expect( factory.setItem ).toBeDefined();
      expect( factory.getItem ).toBeDefined();
      expect( factory.removeItem ).toBeDefined();
      expect( factory.clear ).toBeDefined();
    } );
  } );

  describe( 'checkAllowed ()', ()=> {

    it( 'should pass all', ()=> {
      var actual = cache.checkAllowed( 'api/v1' );
      expect( actual ).toBe( true );

      actual = cache.checkAllowed( 'mytemplate.html' );
      expect( actual ).toBe( true );
    } );

    it( 'should pass api/v1', ()=> {
      cache.setCachingRules( [
        new RegExp( "^api\/v1" )
      ] );
      var actual = cache.checkAllowed( 'api/v1' );
      expect( actual ).toBe( true );
    } );

    it( 'should not pass *.html', () => {
      cache.setCachingRules( [
        new RegExp( ".*[^html]$" )
      ] );

      var actual = cache.checkAllowed( 'mytemplate.html' );
      expect( actual ).toBe( false );
    } );

    it( 'should not pass api/v1*.html', () => {
      cache.setCachingRules( [
        new RegExp( "^api\/v1" ),
        new RegExp( ".*[^html]$" )
      ] );

      var actual = cache.checkAllowed( 'api/v1/myFakeUrlPath/mytemplate.html' );
      expect( actual ).toBe( false );
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

} );
