x associate new albums & tracks with artists defined in the database (happening in background by artist_name)

x in inital fetch, send object with albums (tracks populated) & artists

```
{
  data: {
    albums: [
      ...
      tracks: [
        ...
      ]
    ],
    artists: [
      ...
    ]
  }
}
```

x artist column on album page w/ artist albums
x simple artist page
- share page, redeem stream coins
- edit track
- edit album
- disable track from homepage (visible flag)
- protect admin page or have it talk to hosted database
- player remembers where music left off
- re-think player transistions
- re-design front page
- thank you email
x player doesn't call next after song ends
- player options: repeat, shuffle
- player volume
