import React, { useState } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FormData from 'form-data';

const App = ({ history }) => {
  let signinForm;
  let imageRef;
  let image;
  const [auth, setAuth] = useState(false);

  return (
    <>
      <Switch>
        <Route
          path='/login'
          component={() => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form
                  ref={(r) => (signinForm = r)}
                  onSubmit={(e) => {
                    e.preventDefault();
                    axios.post('http://localhost:3090/admin').then((response) => {
                      if (response.data.result === 'success') {
                        setAuth(true);
                        history.push('/dashboard');
                      }
                    });
                  }}
                >
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
            if (auth) {
              return (
                <section>
                  <h1>add music</h1>
                  <form>
                    <input
                      type='file'
                      ref={(r) => (imageRef = r)}
                      accept='image/*'
                      multiple={false}
                      onChange={(e) => {
                        e.preventDefault();
                        image = e.target.files[0];
                      }}
                    />
                  </form>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(image);
                      let formData = new FormData();
                      formData.append('image', image);
                      formData.append('name', 'ben');

                      axios
                        .post('http://localhost:3090/admin/upload', formData, {
                          headers: {
                            'content-type': 'multipart/form-data',
                          },
                        })
                        .then((response) => {
                          console.log(response);
                        });
                    }}
                  >
                    upload
                  </button>
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
