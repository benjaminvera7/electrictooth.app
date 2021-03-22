- associate new albums & tracks with artists defined in the database (happening in background by artist_name)

- in inital fetch, send object with albums (tracks populated) & artists

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

- artist column on album page w/ artist albums
- simple artist page
- edit track
- edit album
- disable track from homepage (visible flag)
- protect admin page or have it talk to hosted database
- player remembers where music left off
- re-think player transistions
- re-design front page
- thank you email
- player doesn't call next after song ends
