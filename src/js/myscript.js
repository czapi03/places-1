$( document ).ready( function() {

    var karte = L.map( 'map' ).setView( [ 48.21, 16.38 ], 11 );
    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    } ).addTo( karte );

    $.ajax({
      url:'http://localhost:26893',
      data:{},
      method:'get',
      success:function( response ) {
        alert( response );
      },
      error:function() {
        alert( 'ERROR' );
      }
    });

});
