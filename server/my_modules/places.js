var fs = require( 'fs' );
const jsonFile = 'places.json';

module.exports = {
  ladeJSON:function() {
    return new Promise( function(resolve,reject) {
      fs.readFile( jsonFile, function( error, data) {
        var alleDaten = JSON.parse(data);
        resolve(alleDaten);
      });
    })
  },
  speichereJSON:function(alleDaten) {
    return new Promise( function(resolve,reject) {
      console.log( 'Speichere JSON' );
      fs.writeFile( jsonFile, JSON.stringify(alleDaten), function( error, data) {
        resolve();
      });
    });
  },
  ladeOrte:function( alleDaten ) {
    return new Promise( function( resolve, reject ) {
      resolve( alleDaten.places );
    });
    /*this.ladeJSON().then( function( alleDaten ) {
      callback( alleDaten.places );
    });*/
  },
  entferneOrt:function( alleDaten ) {
    var id = this.id;
    return new Promise( function(resolve,reject) {
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
        reject();
      } else {
        console.log( 'ID '+id+' wurde entfernt.' );
        resolve( alleDaten );
      }
    });
  }
}
