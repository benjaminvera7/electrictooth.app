import React, { useState, useRef, useEffect } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FormData from 'form-data';

const App = ({ history }) => {
  let image;
  let audio = [];
  let count = 1;
  const [auth, setAuth] = useState(true);
  const [newArtist, setNewArtist] = useState(true);
  const [type, setType] = useState('album');

  const [data, setData] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3090/api/v1/artists');
      setData(result.data);
    };

    fetchData();
  }, []);

  // const signIn = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:3090/admin').then((response) => {
  //     if (response.data.result === 'success') {
  //       setAuth(true);
  //       history.push('/dashboard');
  //     }
  //   });
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(audio);
    let formData = new FormData();
    formData.append('image', image);

    for (let i = 0; i < audio.length; i++) {
      formData.append(`track_${i + 1}`, audio[i]);
    }

    if (newArtist) {
      formData.append('artist_name', formRef.current.artist_name.value);
      formData.append('new_artist', true);
    } else {
      formData.append('artist_list', formRef.current.artist_list.value);
    }

    formData.append('album_name', formRef.current.album_name.value);
    formData.append('product_type', formRef.current.product_type.value);
    //formData.append('description', formRef.current.description.value);
    formData.append('download_price', formRef.current.download_price.value);
    //formData.append('type', formRef.current.type.value);

    axios
      .post('http://localhost:3090/admin/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const addTrack = () => {
    const form = document.getElementById('productForm');

    let label = document.createElement('label');
    label.classList.add('small-font');
    label.innerHTML = 'track name';
    form.appendChild(label);

    let input = document.createElement('input');
    input.classList.add('mb');
    input.type = 'text';
    input.name = `track_name_${count}`;
    count = count + 1;
    form.appendChild(input);

    let audioInput = document.createElement('input');
    audioInput.type = 'file';
    audioInput.accept = 'audio/*';
    audioInput.multiple = false;
    audioInput.style.cssText = 'padding-bottom: 16px;';
    audioInput.onchange = function (e) {
      e.preventDefault();
      audio.push(e.target.files[0]);
    };

    form.appendChild(audioInput);
    return;
  };

  console.log(data);

  return (
    <>
      <Switch>
        {/* <Route
          path='/login'
          component={() => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={signIn}>
                  <input
                    placeholder='email'
                    type='text'
                    name='email'
                    defaultValue='ben'
                    style={{ marginTop: '16px' }}
                  />{' '}
                  <br />
                  <input
                    placeholder='password'
                    type='password'
                    name='password'
                    defaultValue='123'
                    style={{ marginTop: '8px' }}
                  />{' '}
                  <br />
                  <button style={{ width: '100%', marginTop: '8px' }}>admin login</button>
                </form>
              </div>
            );
          }}
        /> */}
        <Route
          path='/dashboard'
          component={() => (
            <section style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>Add album</h1>

              <section>
                <form
                  id='productForm'
                  ref={formRef}
                  onSubmit={onSubmit}
                  style={{ display: 'flex', flexDirection: 'column', margin: 'auto', width: '500px' }}
                >
                  <span style={{ marginBottom: '32px' }}>
                    <input
                      type='checkbox'
                      id='vehicle1'
                      name='vehicle1'
                      value='Bike'
                      checked={newArtist}
                      onClick={() => setNewArtist(!newArtist)}
                    />{' '}
                    New Artist
                  </span>

                  <select name='product_type' id='productType' style={{ marginBottom: '32px' }}>
                    <option value='album'>Album</option>
                    <option value='single'>Single</option>
                  </select>

                  {newArtist ? (
                    <>
                      <label className='small-font'>Arist Name</label>
                      <input type='text' name='artist_name' className='mb' />
                    </>
                  ) : (
                    <>
                      <label className='small-font'>Artist Select</label>
                      <select name='artist_list' id='artist_list' style={{ marginBottom: '8px' }}>
                        {data.length > 0 &&
                          data.map((a) => (
                            <option value={`${a.name}`} key={`${a._id}`}>
                              {a.name}
                            </option>
                          ))}
                      </select>
                    </>
                  )}

                  <label className='small-font'>Album Name</label>
                  <input type='text' name='album_name' className='mb' />
                  <label className='small-font'>Download Price (USD)</label>
                  <input
                    type='number'
                    name='download_price'
                    min='1'
                    max='20'
                    className='mb'
                    defaultValue='1'
                    step='1'
                  />
                  <label className='small-font'>Upload artwork</label>
                  <input
                    type='file'
                    //accept='.png'
                    accept='image/*'
                    multiple={false}
                    onChange={(e) => {
                      e.preventDefault();
                      image = e.target.files[0];
                    }}
                    style={{ paddingBottom: '32px' }}
                  />
                  <hr style={{ width: '100%', height: '1px', backgroundColor: 'black', marginBottom: '32px' }} />
                  <button
                    type='submit'
                    style={{
                      marginBottom: '16px',
                      backgroundColor: 'green',
                      position: 'fixed',
                      bottom: 0,
                      width: '500px',
                      height: '50px',
                      cursor: 'pointer',
                    }}
                  >
                    Upload
                  </button>
                </form>
                <button
                  onClick={addTrack}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                    width: '500px',
                    height: '50px',
                    position: 'fixed',
                    bottom: 100,
                  }}
                >
                  Add Track
                </button>
              </section>
            </section>
          )}
        />
        <Redirect to='/dashboard' />
      </Switch>
    </>
  );
};

/*
        <Route
          path='/dashboard'
          component={() => {
            if (!auth) {
            return (
              <section style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Add Product</h1>
                <form
                  id='productForm'
                  ref={formRef}
                  onSubmit={onSubmit}
                  style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}
                >
                  <label className='small-font'>Arist Name</label>
                  <input type='text' name='artist_name' className='mb' />
                  <label className='small-font'>Album Name</label>
                  <input type='text' name='album_name' className='mb' />
                  <label className='small-font'>Product Type</label>
                  <select
                    name='type'
                    id='product_type'
                    className='mb'
                    onChange={(e) => {
                      let t = document.getElementById('product_type').value;
                      setType(t);
                    }}
                  >
                    <option value='album'>Album/LP/EP</option>
                    <option value='single'>Single</option>
                  </select>
                  <label className='small-font'>Download Price (USD)</label>
                  <input
                    type='number'
                    name='download_price'
                    min='1'
                    max='20'
                    className='mb'
                    defaultValue='1'
                    step='1'
                  />
                  <label className='small-font'>Description</label>
                  <textarea name='description' form='productForm' className='mb' />
                  <label className='small-font'>Upload artwork</label>
                  <input
                    type='file'
                    accept='.png'
                    multiple={false}
                    onChange={(e) => {
                      e.preventDefault();
                      image = e.target.files[0];
                    }}
                    style={{ paddingBottom: '16px' }}
                  />
                  <label className='small-font'>Upload music</label>
                  <input
                    id='audio-upload'
                    type='file'
                    accept={type === 'album' ? '.zip' : '.mp3'}
                    multiple={false}
                    onChange={(e) => {
                      e.preventDefault();
                      audio = e.target.files[0];
                    }}
                    style={{ paddingBottom: '16px' }}
                  />

                  <button type='submit'>Upload</button>
                </form>
              </section>
            );
            }
            history.push('/login');
            return <></>;
          }}
        />
*/

export default App;
