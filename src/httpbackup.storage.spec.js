import HttpBackupCache from './httpbackup.storage';


describe( 'HttpBackupCache', ()=> {
  let storage;

  beforeEach( function() {
    storage = new HttpBackupCache( window );
  } );

  afterEach( function() {
    window.localStorage.clear();
  } );

  describe( 'sanity check', function() {
    it( 'should always pass', () => {
      expect( storage ).toBeDefined();
      expect( storage.setItem ).toBeDefined();
      expect( storage.getItem ).toBeDefined();
      expect( storage.removeItem ).toBeDefined();
      expect( storage.clear ).toBeDefined();
    } );
  } );

  describe( 'setItem()', ()=> {

    it( 'should invoke localStorage.setItem', ()=> {
      var myResponse = getResponse();
      spyOn( localStorage, 'setItem' );
      storage.setItem( myResponse.url, myResponse );
      expect( localStorage.setItem ).toHaveBeenCalled();
    } );

    it( 'should stringify data', ()=> {
      var myResponse = getResponse();
      spyOn( localStorage, 'setItem' );
      storage.setItem( myResponse.url, myResponse );
      expect( localStorage.setItem ).toHaveBeenCalledWith( myResponse.url, JSON.stringify( myResponse ) );
    } );

  } );

  describe( 'removeItem ()', ()=> {

    it( 'should invoke localStorage.removeItem', ()=> {
      var myResponse = getResponse();
      spyOn( localStorage, 'removeItem' );
      storage.removeItem( myResponse.url );
      expect( localStorage.removeItem ).toHaveBeenCalledWith( myResponse.url );
    } );

  } );

  describe( 'clear ()', ()=> {

    it( 'should only clear keys set by httpback.storage', function() {
      localStorage.setItem( 'keep', 'me' );
      storage.setItem( 'delete', 'me' );
      storage.clear();
      expect( localStorage.getItem( 'keep' ) ).toBe( 'me' );
      expect( storage.getItem( 'storage' ) ).toBe( null );
    } );

  } );

  describe( 'getItem ()', ()=> {

    it( 'should return "null" if localStorage does not have cache', ()=> {
      storage.removeItem( 'api/v1/status' );
      expect( storage.getItem( 'api/v1/status' ) ).toBeNull();
    } );

    it( 'should return cached object', ()=> {
      var response = getResponse();
      storage.setItem( 'api/v1/status', response );
      expect( storage.getItem( 'api/v1/status' ) ).toEqual( response );
    } );

    it( 'should return "null" if unable to parse json', ()=> {
      storage.setItem( 'api/v1/status', undefined );
      var actual = storage.getItem( 'api/v1/status' );
      console.log( actual );
      expect( storage.getItem( 'api/v1/status' ) ).toBeNull();
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
