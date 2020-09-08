import React, { useState, useRef } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FormData from 'form-data';

const App = ({ history }) => {
  let image;
  let audio;
  const [auth, setAuth] = useState(false);
  const formRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3090/admin').then((response) => {
      if (response.data.result === 'success') {
        setAuth(true);
        history.push('/dashboard');
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('image', image);
    formData.append('audio', audio);
    formData.append('artist_name', formRef.current.artist_name.value);
    formData.append('album_name', formRef.current.album_name.value);
    formData.append('description', formRef.current.description.value);
    formData.append('download_price', formRef.current.download_price.value);
    formData.append('type', formRef.current.type.value);

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

  return (
    <>
      <Switch>
        <Route
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
        />
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
                    <select name='type' id='product_type' className='mb'>
                      <option selected='selected' value='album'>
                        Album/LP/EP
                      </option>
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
                      type='file'
                      accept='audio/*'
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
        <Redirect to='/login' />
      </Switch>
    </>
  );
};

export default App;
