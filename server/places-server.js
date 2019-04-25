console.log( 'Places Server Script' );

// npm install express <- wenn nicht vorhanden
var express = require( 'express' );

var fs = require( 'fs' );
var bp = require( 'body-parser' );

var app = express();

var places = require( './my_modules/places' );

var server = app.listen( 26893, function() {
  console.log( 'Places Server running on port 26893' );
});

app.use( function( request, response, next) {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.setHeader( 'Access-Control-Allow-Methods', 'GET, DELETE, POST, PUT' );
  response.setHeader( 'Content-Type', 'application/json' );
  next();
});

/*
app.get('/', function( request, response ) {
  response.end( 'Ich bins, dein Server!' );
});
*/

app.get('/places/', function( request, response ) {
  console.log( '-\nLade alle Orte' );
  places.ladeOrte( function( orte ){ // orte -> ARRAY
    var responseObjekt = {
      'places':orte
    }
    response.end( JSON.stringify(responseObjekt) );
  } );
});

app.delete('/places/:id', function( request, response ) {
  console.log( '-\nStart entferne ID: ' +  request.params.id );
  places.entferneOrt(  request.params.id, function( deleted ) {
      var responseObjekt = {};
      if ( deleted ) {
        responseObjekt.status = 'success';
      } else {
        responseObjekt.status = 'error';
        responseObjekt.code = 404;
        responseObjekt.message = 'Ort existiert nicht.';
      }
      response.end( JSON.stringify(responseObjekt) );
  });
});
