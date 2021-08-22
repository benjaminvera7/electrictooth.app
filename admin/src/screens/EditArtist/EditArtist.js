import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const EditArtist = () => {
  const [artist, setArtist] = useState({
    artist_name: '',
    artist_bio: '',
    artist_img: '',
  });

  const [data, setData] = useState([]);
  const [newArtist, setNewArtist] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/music/artists`);
      setData(result.data);
    };

    if (data.length === 0) {
      fetchData();
      console.log('fetching...');
    }
  }, [data.length]);

  const updateArtist = (name, value) => {
    const newArtist = {
      ...artist,
      [name]: value,
    };
    setArtist(newArtist);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('artist_name', artist.artist_name);
    formData.append('artist_bio', artist.artist_bio);
    formData.append('artist_img', artist.artist_img);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/upload/edit_artist`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          'authorization': localStorage.getItem('admin_token')
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const artistSelect = async (e) => {
    const [artist] = data.filter((a) => a.artist_name === e.target.value);
    const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/music/artist?id=${artist._id}`);

    clearFile();

    setArtist({
      artist_name: resp.data.artist_name,
      artist_bio: resp.data.artist_bio,
      artist_img: data.artist_img ? data.artist_img : '',
    });
  };

  const clearFile = () => {
    document.getElementById('upload-files').value = '';
  };

  const resetDropdown = () => {
    document.getElementById('artist_list').value = 'SELECT ARTIST';
  };

  console.log(artist);

  return (
    <section style={{ marginTop: '16px' }}>
      <input
        type='checkbox'
        checked={newArtist}
        onChange={() => {
          setNewArtist(!newArtist);
          resetDropdown();
          setArtist({ artist_name: '', artist_bio: '', artist_img: '' });
        }}
        style={{ margin: '16px', width: 'auto' }}
      />{' '}
      New Artist <br />
      <select
        name='artist_list'
        id='artist_list'
        style={{ marginBottom: '16px', marginLeft: '16px' }}
        onChange={artistSelect}
        disabled={newArtist}
      >
        <option>SELECT ARTIST</option>
        {data.length > 0 &&
          data.map((a) => (
            <option value={`${a.artist_name}`} key={`${a._id}`}>
              {a.artist_name}
            </option>
          ))}
      </select>
      <form id='addArtist' onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>artist name</label>
        <input
          type='text'
          name='artist_name'
          value={artist.artist_name}
          onChange={(e) => updateArtist(e.target.name, e.target.value)}
        />
        <label>artist bio</label>
        <textarea
          type='text'
          name='artist_bio'
          value={artist.artist_bio}
          onChange={(e) => updateArtist(e.target.name, e.target.value)}
        />
        <label>artist image</label>
        <input
          type='file'
          accept='image/*'
          multiple={false}
          name='artist_img'
          id='upload-files'
          onChange={(e) => updateArtist(e.target.name, e.target.files[0])}
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
          {newArtist ? 'Add' : 'Save'}
        </button>
      </form>
    </section>
  );
};

export default EditArtist;
