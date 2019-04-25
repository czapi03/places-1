toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}


$( document ).ready( function() {

    var karte = L.map( 'map' ).setView( [ 48.21, 16.38 ], 11 );
    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    } ).addTo( karte );



    $.ajax({
      url:'http://localhost:26893/places/',
      data:{},
      method:'get',
      dataFormat: 'json',
      success:function( response ) {
        var orte = response.places; // Array
        if ( Array.isArray( orte ) ) {
          console.log( orte );
        } else {
          toastr["error"]("Datenformat Fehler", "Fehler");
        }
      },
      error:function() {
        toastr["error"]("Verbindunsfehler", "Fehler");
      }
    });

});
