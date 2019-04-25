var fs = require( 'fs' );
const jsonFile = 'places.json';

module.exports = {
  ladeJSON:function( callback ) {
    fs.readFile( jsonFile, function( error, data) {
      var alleDaten = JSON.parse(data);
      callback( alleDaten );
    });
  },
  speichereJSON:function(data,callback) {
    console.log( 'Speichere JSON' );
    fs.writeFile( jsonFile, JSON.stringify(data), function( error, data) {
      callback();
    });
  },
  ladeOrte:function( callback ) {
    this.ladeJSON( function( alleDaten ) {
      callback( alleDaten.places );
    });
  },
  entferneOrt:function( id, callback ) {
    /* entfernt Ort im JSON */
    this.ladeJSON( function( alleDaten ) {
      var orte = alleDaten.places;
      var foundId = false;
      for ( let i in orte ) {
        if ( orte[i].id == id ) {
          orte.splice( i, 1);
          foundId = true;
        }
      }
      console.log( 'Eintrag gefunden: ' + (foundId?'Ja':'Nein') );

      if ( !foundId ) {
        callback( false );
      } else {
        this.speichereJSON( alleDaten, function() {
            console.log( 'ID '+id+' wurde entfernt.' );
            callback( true );
        });
      }

    }.bind(this) );
  }
}
