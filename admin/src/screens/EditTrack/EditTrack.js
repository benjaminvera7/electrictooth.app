import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const EditTrack = () => {
  const [track, setTrack] = useState({
    track_name: '',
    download_price: 1,
    artist_name: '',
    cover_art: '',
    track: '',
    tags: '',
    description: '',
  });

  const updateTrack = (name, value) => {
    const newTrack = {
      ...track,
      [name]: value,
    };
    setTrack(newTrack);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('artist_name', track.artist_name);
    formData.append('track_name', track.track_name);
    formData.append('download_price', track.download_price);
    formData.append('cover_art', track.cover_art);
    formData.append('track', track.track);
    formData.append('tags', track.tags);
    formData.append('description', track.description);

    axios
      .post('https://eletrictooth.app/api/v1/upload/edit_track', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          'authorization': localStorage.getItem('admin_token')
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  console.log(track);
  return (
    <section style={{ marginTop: '16px' }}>
      <form id='addTrack' onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>artist name</label>
        <input
          type='text'
          name='artist_name'
          value={track.artist_name}
          onChange={(e) => updateTrack(e.target.name, e.target.value)}
          required
        />
        <label>description</label>
        <textarea
          type='text'
          name='description'
          value={track.description}
          required
          onChange={(e) => updateTrack(e.target.name, e.target.value)}
        />
        <label>tags</label>
        <input
          type='text'
          name='tags'
          value={track.tags}
          onChange={(e) => updateTrack(e.target.name, e.target.value)}
          required
        />
        <label>cover art</label>
        <input
          type='file'
          accept='image/*'
          multiple={false}
          name='cover_art'
          onChange={(e) => updateTrack(e.target.name, e.target.files[0])}
          required
        />
        <label>track name</label>
        <input
          className='mb'
          type='text'
          name='track_name'
          onChange={(e) => updateTrack(e.target.name, e.target.value)}
          required
        />
        <input
          type='file'
          accept='audio/*'
          multiple={false}
          onChange={(e) => updateTrack('track', e.target.files[0])}
          required
        />

        <button
          type='submit'
          style={{
            margin: '16px',
            backgroundColor: 'aqua',
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

export default EditTrack;
