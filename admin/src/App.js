import React, { useState, useRef, useEffect } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FormData from 'form-data';

const App = () => {
  return (
    <>
      <Switch>
        <Route path='/edit_album' component={EditAlbum} />
        <Route path='/edit_track' component={EditTrack} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to='/dashboard' />
      </Switch>
    </>
  );
};

const EditAlbum = () => {
  const [album, setAlbum] = useState({
    album_name: '',
    album_price: 1,
    artist_name: '',
    cover_art: '',
    tracks: [],
  });

  const updateAlbum = (name, value) => {
    const newAlbum = {
      ...album,
      [name]: value,
    };
    setAlbum(newAlbum);
  };

  const updateAlbumTrack = (id, value) => {
    const track_name = document.getElementById(id).value;
    const newAlbum = {
      ...album,
      tracks: [
        ...album.tracks,
        {
          position: album.tracks.length + 1,
          name: track_name,
          track: value,
        },
      ],
    };
    setAlbum(newAlbum);
  };

  const addTrack = () => {
    const form = document.getElementById('addAlbum');
    const tracks = form.querySelector('#tracks');

    const id = `track_${album.tracks.length + 1}`;

    const label = document.createElement('label');
    label.classList.add('small-font');
    label.innerHTML = 'track name';
    tracks.appendChild(label);

    const input = document.createElement('input');
    input.classList.add('mb');
    input.type = 'text';
    input.id = id;
    tracks.appendChild(input);

    const audioInput = document.createElement('input');
    audioInput.type = 'file';
    audioInput.accept = 'audio/*';
    audioInput.multiple = false;
    audioInput.style.cssText = 'padding-bottom: 16px;';
    audioInput.onchange = function (e) {
      e.preventDefault();
      updateAlbumTrack(id, e.target.files[0]);
    };

    tracks.appendChild(audioInput);
    return;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('album_name', album.album_name);
    formData.append('album_price', album.album_price);
    formData.append('artist_name', album.artist_name);
    formData.append('cover_art', album.cover_art);

    for (let i = 0; i < album.tracks.length; i++) {
      formData.append(`${album.tracks[i].name}`, album.tracks[i].track);
    }

    axios
      .post('http://localhost:3090/api/v1/upload/edit_album', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  console.log(album);
  return (
    <section style={{ marginTop: '16px' }}>
      <form id='addAlbum' onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>album name</label>
        <input
          type='text'
          name='album_name'
          value={album.album_name}
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>album price</label>
        <input
          type='text'
          name='album_price'
          value={album.album_price}
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>artist name</label>
        <input
          type='text'
          name='artist_name'
          value={album.artist_name}
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>cover art</label>
        <input
          type='file'
          accept='image/*'
          multiple={false}
          name='cover_art'
          onChange={(e) => updateAlbum(e.target.name, e.target.files[0])}
        />

        <span id='tracks' style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}></span>

        <div style={{ margin: '16px', width: '100px', fontWeight: 'bold', cursor: 'pointer' }} onClick={addTrack}>
          +add track
        </div>

        <button
          type='submit'
          style={{
            margin: '16px',
            backgroundColor: 'green',
            width: '200px',
            height: '50px',
            cursor: 'pointer',
          }}
        >
          Upload
        </button>
      </form>
    </section>
  );
};

const EditTrack = () => {
  return <div>add audio</div>;
};

const Dashboard = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link to='/edit_album' style={{ margin: '8px' }}>
        add album
      </Link>
      <Link to='/edit_track' style={{ margin: '8px' }}>
        add track
      </Link>
    </div>
  );
};

export default App;
