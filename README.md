# **Songbook API**

Met deze API kunnen songteksten van liedjes opgezocht worden en nummers gefavoriet worden.

#### URL info:
- Base: http://localhost:port
- Default port: 3000

## Inhoudsopgave
Routes en hun functionaliteit in alfabetische volgorde:
- [**Artiesten: artists.js**](https://github.com/VivesMDima/ti-eind-assignment-2223-project-dalipannecoucke/blob/main/README.md#artistsnav)
  - Lijst artiesten
  - Artiest toevoegen
  - Artiest bijwerken
  - Artiest verwijderen
  - Artiest opvragen
- [**Authenticatie: auth.js**](https://github.com/VivesMDima/ti-eind-assignment-2223-project-dalipannecoucke/blob/main/README.md#authnav)
  - Gebruiker inloggen
- [**Muziekgenres: genres.js**](https://github.com/VivesMDima/ti-eind-assignment-2223-project-dalipannecoucke/blob/main/README.md#genresnav)
  - Lijst genres
  - Genre toevoegen
  - Genre bewerken
  - Genre verwijderen
  - Genre opvragen
- [**Liedjes: songs.js**](https://github.com/VivesMDima/ti-eind-assignment-2223-project-dalipannecoucke/blob/main/README.md#songsnav)
  - Lijst liedjes
  - Liedje toevoegen
  - Liedje bijwerken
  - Liedje verwijderen
  - Liedje opvragen
  - Lijst liedjes specifiek genre
  - Lijst liedjes specifieke artiest
- [**Gebruikers: users.js**](https://github.com/VivesMDima/ti-eind-assignment-2223-project-dalipannecoucke/blob/main/README.md#usersnav)
  - Nieuwe gebruiker aanmaken
  - Gebruiker verwijderen
  - Lied toevoegen aan favorieten van gebruiker
  - Lijst favoriete liedjes van gebruiker
  - Lied verwijderen uit favorieten van gebruiker


<a name="artistsnav"></a>
### Artiesten: Artists.js
#### Lijst van artiesten
Retourneert een lijst van alle beschikbare artiesten.

```GET /api/artists```

##### _Parameters_
Geen parameters vereist

##### _Voorbeeld response_
```
[
{
  "name": "Artiest1",
  "birthdate": "0001-01-01",
  "country": "Country",
  "_id": "646d042707ef812b8f411662",
  "__v": 0
},
{
  "name": "Artiest2",
  "birthdate": "0001-01-01",
  "country": "Country",
  "_id": "646d042707ef812b8f411662",
  "__v": 0
}
...
]
```

#### Artiest toevoegen
Voegt een artiest toe aan de lijst van artiesten.

```POST /api/artists```

##### _Parameters_
Body parameters:
- name: String
- birthdate: String
- country: String

Authorization token vereist

##### _Voorbeeld response_
Als succesvol:
```
{
  "name": "Nieuw",
  "birthdate": "0001-01-01",
  "country": "Country",
  "_id": "646d042707ef812b8f411662",
  "__v": 0
}
```
Als artiest reeds in de databank zit:
``` Artist already exists ```

#### Artiest bijwerken
Bewerk de gegevens van een bestaande artiest.

```PUT /api/artists/{{artistId}}```

##### _Parameters_
URL parameter:
- artistId

Body parameters:
- name: String
- birthdate: String
- country: String

Authorization token required

##### _Voorbeeld response_
Als succesvol:
```
{
  "name": "Aangepast",
  "birthdate": "0001-01-01",
  "country": "Country",
  "_id": "646d042707ef812b8f411662",
  "__v": 0
}
```
Als artiest met gegeven ID niet gevonden is:
``` The artist with the given ID was not found. ```

#### Artiest verwijderen
Verwijdert een artiest uit de lijst van artiesten.

```DELETE /api/artists/{{artistId}}```

##### _Parameters_
URL parameter:
- artistId

Authorization token vereist + je moet Admin-gebruiker zijn

##### _Voorbeeld response_
Als succesvol:
```
{
  "_id": "646d064007ef812b8f411664",
  "name": "Verwijderd",
  "birthdate": "0001-01-01",
  "country": "Country",
  "__v": 0
}
```
Als artiest met gegeven ID niet gevonden is:
``` The artist with the given ID was not found. ```


#### Artiest opvragen
Vraagt een specifieke artiest op uit de lijst van artiesten.

```GET /api/artists/{{artistId}}```

##### _Parameters_
URL parameter:
- artistId

##### _Voorbeeld response_
Als succesvol:
```
{
  "_id": "646b6f4112baf9c9e710c4db",
  "name": "Voorbeeld",
  "birthdate": "0001-01-10",
  "country": "Country",
  "__v": 0
}
```
Als artiest met gegeven ID niet gevonden is:
``` 'The artist with the given ID was not found.' ```

<a name="authsnav"></a>
### Authenticatie: auth.js
#### Inloggen als gebruiker
Hiermee kan je inloggen als gebruiker en wordt een token gegenereerd.

```POST /api/auth```

##### _Parameters_
Body parameters:
- email: String
- password: String

##### _Voorbeeld response_
Als succesvol:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY5ZjQ4Zjg3NzRjNzkzNjhjNWQ1MGYiLCJpYXQiOjE2ODQ4NzAwMDF9.3HAqZgXILG5HfteFXjO9TqZj3WLr-AL88fEgWSC1cac
```
Als gebruiker nog niet geregistreerd is, of foutieve inloggegevens meegeeft:
``` Invalid email or password ```

<a name="genresnav"></a>
### Muziekgenres: genres.js
#### Lijst genres
Haalt de lijst van alle beschikbare genres op.

```GET /api/genres```

##### _Parameters_
Geen parameters vereist

##### _Voorbeeld response_
```
[
  {
    "_id": "646b4c32ac464a40bdfd32c5",
    "name": "genre1",
    "__v": 0
  },
  {
    "_id": "646b4d99ac464a40bdfd32c9",
    "name": "genre2",
    "__v": 0
  },
  {
    "_id": "646b4c37ac464a40bdfd32c7",
    "name": "genre3",
    "__v": 0
  },
  ...
 ]
```

#### Genre toevoegen
Voegt een genre toe aan de lijst van genres.

```POST /api/genres```

##### _Parameters_
Body parameters:
- email
- password

##### _Voorbeeld response_
Als succesvol:
```
{
  "name": "rock",
  "_id": "646d152e6a31c077bd213ca4",
  "__v": 0
}
```
Als het genre al bestaat:
``` Genre already exists.  ```

#### Genre bewerken
Bewerkt een bestaand genre in de lijst van genres.

```PUT /api/genres/{{genreId}}```

##### _Parameters_
URL parameters:
- genreId

Authorization token vereist

##### _Voorbeeld response_
Als succesvol:
```
{
  "_id": "646b4d99ac464a40bdfd32c9",
  "name": "aangepast genre",
  "__v": 0
}
```
Als het genreId niet bestaat:
``` The genre with the given ID was not found. ```

#### Genre verwijderen
Verwijdert een genre uit de lijst van genres.

```DELETE /api/genres/{{genreId}}```

##### _Parameters_
URL parameters:
- genreId

Authorization token vereist + je moet admin gebruiker zijn

##### _Voorbeeld response_
Als succesvol:
```
{
  "_id": "646b4d99ac464a40bdfd32c9",
  "name": "verwijderd genre",
  "__v": 0
}
```
Als het genreId niet bestaat:
``` The genre with the given ID was not found. ```


#### Genre opvragen
Vraagt een specifiek genre op uit de lijst van genres.

```GET /api/genres/{{genreId}}```

##### _Parameters_
URL parameters:
- genreId

##### _Voorbeeld response_
Als succesvol:
```
{
  "_id": "646b4c32ac464a40bdfd32c5",
  "name": "genre",
  "__v": 0
}
```
Als het genreId niet bestaat:
``` The genre with the given ID was not found. ```

<a name="songsnav"></a>
### Liedjes: songs.js
#### Lijst liedjes
Haalt een lijst op van alle beschikbare liedjes.

```GET /api/songs```

##### _Parameters_
Geen parameters vereist

##### _Voorbeeld response_
```
[
{
    "_id": "646baf4796b2235c1e80ab5a",
    "title": "Liedje 1",
    "genre": {
      "name": "genre1",
      "_id": "646b4c32ac464a40bdfd32c5"
    },
    "artist": {
      "name": "Artiest1",
      "birthdate": "0001-01-01",
      "country": "Country",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "lorum ipsum",
    "releaseDate": "2016-11-18",
    "duration": "3:20",
    "favoritedBy": [],
    "__v": 0
  },
  {
    "_id": "646baf4796b2235c1e80ab5a",
    "title": "Liedje 2",
    "genre": {
      "name": "genre2",
      "_id": "646b4c32ac464a40bdfd32c5"
    },
    "artist": {
      "name": "Artiest2",
      "birthdate": "0001-01-01",
      "country": "Country",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "la la la",
    "releaseDate": "2020-11-20",
    "duration": "4:02",
    "favoritedBy": [],
    "__v": 0
  }
]
```

#### Liedje toevoegen
Voegt een liedje toe aan de lijst van liedjes.

```POST /api/songs```

##### _Parameters_
Body parameters:
- title: String
- genreId: String
- artistId: String
- album: String
- songtext: String
- releaseDate: String
- duration: String

Authorization token vereist

##### _Voorbeeld response_
Als succesvol:
```
{
  "title": "Ocean Eyes",
  "genre": {
    "name": "country",
    "_id": "646b4c32ac464a40bdfd32c5"
  },
  "artist": {
    "name": "Billie Eilish",
    "birthdate": "2001-12-18",
    "country": "United States",
    "_id": "646b6e5c12baf9c9e710c4d9"
  },
  "album": "none",
  "songtext": "Ive been watchin you for some time ...",
  "releaseDate": "2016-11-18",
  "duration": "3:20",
  "favoritedBy": [],
  "_id": "646d1a17bbdbe3f9aeb71877",
  "__v": 0
}
```
Als liedje al bestaat:
``` Song already exists ```

#### Liedje bijwerken
Bewerkt een bestaand liedje uit de lijst van liedjes.

```PUT /api/songs/{{songId}}```

##### _Parameters_
URL parameter:
- songId

Body parameters:
- title: String
- genreId: String
- artistId: String
- album: String
- songtext: String
- releaseDate: String
- duration: String

Authorization token vereist

##### _Voorbeeld response_
Als succesvol:
```
{
  "favoritedBy": [],
  "_id": "646b85f6651713403a83be82",
  "title": "Ocean Eyes",
  "genre": {
    "name": "pop",
    "_id": "646b4c10ac464a40bdfd32c1"
  },
  "artist": {
    "name": "Billie Eilish",
    "birthdate": "2001-12-18",
    "country": "United States",
    "_id": "646b6e5c12baf9c9e710c4d9"
  },
  "album": "none",
  "songtext": "Bijvoorbeeld aangepaste songtext",
  "releaseDate": "2016-11-18",
  "duration": "3:20",
  "__v": 0
}
```
Als genre niet bestaat:
``` Invalid genre ```
Als artiest niet bestaat:
``` Invalid artist ```
Als liedje niet bestaat:
``` The song with the given ID was not found. ```

#### Liedje verwijderen
Verwijdert een liedje uit de lijst van liedjes.

```DELETE /api/songs/{{songId}}```

##### _Parameters_
URL parameter:
- songId

Authorization token vereist + je moet Admin-gebruiker zijn

##### _Voorbeeld response_
Als succesvol:
```
{
  "_id": "646d1aa32f98ffa5fdece0e8",
  "title": "Verwijderd liedje",
  "genre": {
    "name": "country",
    "_id": "646b4c32ac464a40bdfd32c5"
  },
  "artist": {
    "name": "Billie Eilish",
    "birthdate": "2001-12-18",
    "country": "United States",
    "_id": "646b6e5c12baf9c9e710c4d9"
  },
  "album": "none",
  "songtext": "la la la ...",
  "releaseDate": "2016-11-18",
  "duration": "3:20",
  "favoritedBy": [],
  "__v": 0
}
```
Als liedje niet bestaat:
``` The song with the given ID was not found. ```

#### Liedje opvragen
Verwijdert een liedje uit de lijst van liedjes.

```GET /api/songs/{{songId}}```

##### _Parameters_
URL parameter:
- songId

##### _Voorbeeld response_
Als succesvol:
```
{
  "favoritedBy": [],
  "_id": "646b85f6651713403a83be82",
  "title": "Ocean Eyes",
  "genre": {
    "name": "pop",
    "_id": "646b4c10ac464a40bdfd32c1"
  },
  "artist": {
    "name": "Billie Eilish",
    "birthdate": "2001-12-18",
    "country": "United States",
    "_id": "646b6e5c12baf9c9e710c4d9"
  },
  "album": "none",
  "songtext": "Ive been watchin you for some time  ...",
  "releaseDate": "2016-11-18",
  "duration": "3:20",
  "__v": 0
}
```
Als liedje niet bestaat:
``` The song with the given ID was not found. ```

#### Lijst liedjes specifiek genre
Geeft een lijst van alle liedjes met een specifiek genre.

```GET /api/songs/genres/{{genreId}}```

##### _Parameters_
URL parameter:
- genreId

##### _Voorbeeld response_
Als succesvol:
```
[
  {
    "favoritedBy": [],
    "_id": "646b85f6651713403a83be82",
    "title": "Titel 1",
    "genre": {
      "name": "pop",
      "_id": "646b4c10ac464a40bdfd32c1"
    },
    "artist": {
      "name": "Artiest3",
      "birthdate": "2001-12-18",
      "country": "United States",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "la la la",
    "releaseDate": "2016-11-18",
    "duration": "3:33",
    "__v": 0
  },
  {
    "favoritedBy": [],
    "_id": "646b85f6651713403a83be82",
    "title": "Titel 5",
    "genre": {
      "name": "pop",
      "_id": "646b4c10ac464a40bdfd32c1"
    },
    "artist": {
      "name": "Artiest1",
      "birthdate": "2000-03-22",
      "country": "United Kingdom",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "la la la",
    "releaseDate": "2008-08-18",
    "duration": "2:53",
    "__v": 0
  }
]
```
Als genre niet bestaat:
``` The genre with the given ID was not found. ```


#### Lijst liedjes specifieke artiest
Geeft een lijst van alle liedjes met een specifieke artiest.

```GET /api/songs/artists/{{genreId}}```

##### _Parameters_
URL parameter:
- artistId

##### _Voorbeeld response_
Als succesvol:
```
[
  {
    "favoritedBy": [],
    "_id": "646b85f6651713403a83be82",
    "title": "Titel 1",
    "genre": {
      "name": "country",
      "_id": "646b4c10ac464a40bdfd32c1"
    },
    "artist": {
      "name": "Artiest3",
      "birthdate": "2001-12-18",
      "country": "United States",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "la la la",
    "releaseDate": "2016-11-18",
    "duration": "3:33",
    "__v": 0
  },
  {
    "favoritedBy": [],
    "_id": "646b85f6651713403a83be82",
    "title": "Titel 5",
    "genre": {
      "name": "pop",
      "_id": "646b4c10ac464a40bdfd32c1"
    },
    "artist": {
      "name": "Artiest3",
      "birthdate": "2001-12-18",
      "country": "United States",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "la la la",
    "releaseDate": "2020-08-18",
    "duration": "2:53",
    "__v": 0
  }
]
```
Als artiest niet bestaat:
``` The artist with the given ID was not found. ```

<a name="usersnav"></a>
### Gebruikers: users.js
#### Nieuwe gebruiker aanmaken
Hiermee wordt een gebruiker geregistreerd.

```POST /api/users```

##### _Parameters_
Body parameters:
- name
- email
- password

##### _Voorbeeld response_
```
{
  "_id": "646d2274ca98123c4cbcd091",
  "name": "Vives10",
  "email": "docent10@vives.be"
}
```

#### Gebruiker verwijderen
Hiermee wordt een gebruiker verwijdert.

```POST /api/users/{{userId}}```

##### _Parameters_
URL parameter:
- userId

Authentication token vereist + je moet Admin-gebruiker zijn

##### _Voorbeeld response_
```
{
  "_id": "646d2274ca98123c4cbcd091",
  "name": "Vives10",
  "email": "docent10@vives.be",
  "password": "$2b$10$Hy4bXautO.qEcrBesat7J.bfmizANE2nexMdyGQ.Uscd7WjWfpF8m",
  "favorites": [],
  "__v": 0
}
```

#### Lied toevoegen aan favorieten van gebruiker
Voegt een liedje toe aan de favoriete liedjes van een gebruiker.

```POST /api/users/favorites/{{songId}}```

##### _Parameters_
URL parameter:
- songId

Authentication token vereist

##### _Voorbeeld response_
Als succesvol:
```
[
  {
    "title": "Ocean Eyes",
    "genre": {
      "name": "pop",
      "_id": "646b4c10ac464a40bdfd32c1"
    },
    "artist": {
      "name": "Billie Eilish",
      "birthdate": "2001-12-18",
      "country": "United States",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "Ive been watchin you for some ...",
    "releaseDate": "2016-11-18",
    "duration": "3:20",
    "favoritedBy": [],
    "_id": "646b85f6651713403a83be82",
    "__v": 0
  }
]
```


#### Lijst favoriete liedjes van gebruiker
Haalt een lijst op met de gefavoriete liedjes van een gebruiker.

```GET /api/users/favorites```

##### _Parameters_
Authentication token vereist

##### _Voorbeeld response_
Als succesvol:
```
[
  {
    "title": "Liedje 5",
    "genre": {
      "name": "pop",
      "_id": "646b4c10ac464a40bdfd32c1"
    },
    "artist": {
      "name": "Billie Eilish",
      "birthdate": "2001-12-18",
      "country": "United States",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "Ive been watchin you for some ...",
    "releaseDate": "2016-11-18",
    "duration": "3:20",
    "favoritedBy": [],
    "_id": "646b85f6651713403a83be82",
    "__v": 0
  },
    {
    "title": "Liedje 2",
    "genre": {
      "name": "country",
      "_id": "646b4c10ac464a40bdfd32c1"
    },
    "artist": {
      "name": "Artiest",
      "birthdate": "1999-12-13",
      "country": "United Kingdom",
      "_id": "646b6e5c12baf9c9e710c4d9"
    },
    "album": "none",
    "songtext": "la la la...",
    "releaseDate": "2010-11-18",
    "duration": "3:22",
    "favoritedBy": [],
    "_id": "646b85f6651713403a83be82",
    "__v": 0
  },
  ...
]
```

#### Lied verwijderen uit favorieten van gebruiker
Verwijdert een liedje uit de favorieten van een gebruiker

```GET /api/users/favorites/{{songId}}```

##### _Parameters_
URL parameter:
- songId

Authentication token vereist

##### _Voorbeeld response_
Als succesvol:
```
[]
  
```


