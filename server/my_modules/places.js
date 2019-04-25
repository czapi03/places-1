var fs = require( 'fs' );

module.exports = {
  ladeOrte:function( callback ) {
    fs.readFile( 'places.json', function( error, data) {
      var alleDaten = JSON.parse(data);
      //return alleDaten.places; <-- NEIN, weil async
      callback( alleDaten.places );
    });



  }
}
