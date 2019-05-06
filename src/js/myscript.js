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

var createConfirm = function(lnk, onsuccess) {
  $(lnk).hide();
  $('<span>')
    .insertAfter($(lnk))
    .append('Wirklich löschen?<br>')
    .append(
      $('<a href="#">Ja</a>').on('click', function() {
        $(this).parent().remove();
        onsuccess();
      })
    ).append(' | ')
    .append(
      $('<a href="#">Nein</a>').on('click', function() {
        $(this).parent().remove();
        $(lnk).show();
      })
    );
}

$(document).ready(function() {
  var marker = [];

  var karte = L.map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(karte);

  karte.dragging.disable();
  var locationnamestatus = false;

  $.ajax({
    url: 'http://localhost:26893/places/',
    data: {},
    method: 'get',
    dataFormat: 'json',
    success: function(response) {
      var orte = response.places; // Array
      if (Array.isArray(orte)) {
        console.log(orte);
        if (orte.length == 0) {
          // keine Orte
          karte.setView([48.21, 16.38], 12);
        } else {
          // Orte
          var bounds = [];

          //karte.setView( [  orte[0].lat, orte[0].lng ], 2 );

          var table = $('<table border="1">').css({
            margin: 10
          }).appendTo('#inputcontainer');
          table.append(
            $('<tr>')
            .append($('<th>Bezeichnung</th>'))
            .append($('<th>Lat</th>'))
            .append($('<th>Lng</th>'))
          );


          for (let i in orte) {
            var zeile = $('<tr>').appendTo(table);
            $('<td>').html(orte[i].title).appendTo(zeile);
            $('<td>').html(orte[i].lat).appendTo(zeile);
            $('<td>').html(orte[i].lng).appendTo(zeile);
            $('<td>').append(
              $('<a href="#">').data('i', i).data('id', orte[i].id).html('löschen')
              .on('click', function() {
                var id = $(this).data('id');
                var i = $(this).data('i');

                createConfirm(this, function() {

                  $.ajax({
                    url: 'http://localhost:26893/places/' + id,
                    method: 'delete',
                    success: function(response) {
                      if (response.status == 'success') {
                        toastr["success"]("Ort wurde gelöscht.", "Erfolg");
                        // Tabelle
                        console.log(this);
                        $(this).closest('tr').remove();
                        // Marker
                        marker[i].remove();
                      } else {
                        toastr["error"]("Ort existiert nicht mehr.", "Fehler");
                      }
                    }.bind(this)
                  });
                }.bind(this));
              })
            ).appendTo(zeile);
            var latlng = [
              orte[i].lat,
              orte[i].lng
            ];
            marker.push(L.marker(latlng)
              .addTo(karte)
              .bindPopup(orte[i].title));
            bounds.push(latlng);




          }
          karte.fitBounds(bounds);
          console.log(marker);
        }


      } else {
        toastr["error"]("Datenformat Fehler", "Fehler");
      }
    },
    error: function() {
      toastr["error"]("Verbindunsfehler", "Fehler");
    }
  });

  $('#inputnamemarker').focusout(function() {

    $(this).removeClass('fail');
    if (this !== "") {
      karte.dragging.enable();
      locationnamestatus = true;
    }

  })
  karte.on('click', function(e) {

    if (locationnamestatus == false) {
      console.log('testkakskd');
      $('#inputnamemarker').addClass('fail');
    }

    $("#inputlatcoord").val(e.latlng.lat);
    $("#inputlngcoord").val(e.latlng.lng);
  })

 $('#btnnewLocation').on('click',function(){

   $.ajax({
     url: "http://localhost:26893/places/",
     method: "POST",
     dataFormat: "json",
     data:{
         "title": $('#inputnamemarker').val(),
         "lat": $('#inputlatcoord').val(),
         "lng": $('#inputlngcoord').val()
     },
     success: function(response){

     }




   })

 })





});
