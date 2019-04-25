# Places - RESTful
## Allgemein
PlacesObjects
```
{
  "id": INTEGER,
  "title": STRING,
  "lat": FLOAT,
  "lng": FLOAT  
}
```

## Daten abrufen alle
- URL: http://localhost:26893/places/
- Methode: GET
- Request-Daten: {}
- Response-Format: JSON
- Response-Daten:
```
{
  "places": ARRAY mit PlacesObjects
}
```

## neuen Ort anlegen
- URL: http://localhost:26893/places/
- Methode: POST
- Request-Datenformat: x-www-urlencoded (normale POST-Daten)
- Request-Daten:
```
{
    "title": STRING,
    "lat": FLOAT,
    "lng": FLOAT
}
```

- Response-Format: JSON

### erfolgreich
- Response-Daten:
```
{
  "status": "success",
  "id": INTEGER
}
```

### nicht erfolgreich - Duplikat
- Response-Daten:
```
{
  "status": "error",
  "code": 601,
  "message": "Ort existiert bereits."
}
```

## Daten löschen
- URL: http://localhost:26893/places/{id}
- Methode: DELETE
- Request-Daten: {}
- Response-Format: JSON

### erfolgreich
- Response-Daten:
```
{
  "status": "success"
}
```

### nicht erfolgreich - existiert nicht
- Response-Daten:
```
{
  "status": "error",
  "code": 404,
  "message": "Ort existiert nicht."
}
```

## Appendix

| Error Code | Erklärung |
| ------------- |-------------|
| *404* | Ort existiert nicht |
| *601* | Duplikat in Daten gefunden |
