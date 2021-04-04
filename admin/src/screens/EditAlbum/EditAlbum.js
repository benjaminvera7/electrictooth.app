import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const EditAlbum = () => {
  const [album, setAlbum] = useState({
    album_name: '',
    download_price: 1,
    artist_name: '',
    cover_art: '',
    tracks: [],
    tags: '',
    description: '',
  });

  const updateAlbum = (name, value) => {
    const newAlbum = {
      ...album,
      [name]: value,
    };
    setAlbum(newAlbum);
  };

  const updateAlbumTrack = (id, value) => {
    const newAlbum = {
      ...album,
      tracks: [
        ...album.tracks,
        {
          id: id,
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
    input.required = true;
    tracks.appendChild(input);

    const audioInput = document.createElement('input');
    audioInput.type = 'file';
    audioInput.accept = 'audio/*';
    audioInput.multiple = false;
    audioInput.required = true;
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
    formData.append('download_price', album.download_price);
    formData.append('artist_name', album.artist_name);
    formData.append('cover_art', album.cover_art);
    formData.append('tags', album.tags);
    formData.append('description', album.description);

    for (let i = 0; i < album.tracks.length; i++) {
      const track_name = document.getElementById(album.tracks[i].id).value;
      formData.append(track_name, album.tracks[i].track);
    }

    axios
      .post('http://138.197.4.93/api/v1/upload/edit_album', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          'authorization': localStorage.getItem('admin_token')
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
          required
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>description</label>
        <textarea
          type='text'
          name='description'
          value={album.description}
          required
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>tags</label>
        <input
          type='text'
          name='tags'
          value={album.tags}
          required
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>album price</label>
        <input
          type='text'
          name='download_price'
          value={album.download_price}
          required
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>artist name</label>
        <input
          type='text'
          name='artist_name'
          value={album.artist_name}
          required
          onChange={(e) => updateAlbum(e.target.name, e.target.value)}
        />
        <label>cover art</label>
        <input
          type='file'
          accept='image/*'
          multiple={false}
          name='cover_art'
          required
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
            borderRadius: '10px',
          }}
        >
          Upload
        </button>
      </form>
    </section>
  );
};

export default EditAlbum;
