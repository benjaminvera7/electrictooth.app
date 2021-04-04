import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const Signin = ({ history }) => {
    const [admin, setAdmin] = useState({
        username: '',
        password: ''
    });

    const updateAdmin = (name, value) => {
        const newAdmin = {
            ...admin,
            [name]: value,
        };
        setAdmin(newAdmin);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('username', admin.username);
        formData.append('password', admin.password);

        axios
            .post('http://eletrictooth.app/api/v1/admin/signin', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then(({ data }) => {
                if (data.token) {
                    localStorage.setItem('admin_token', data.token);
                    history.push('/dashboard');
                }
            });
    };

    return (
        <section style={{ marginTop: '16px' }}>
            <form id='admin' onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>username</label>
                <input
                    type='text'
                    name='username'
                    onChange={(e) => updateAdmin(e.target.name, e.target.value)}
                    required
                />
                <label>password</label>
                <input
                    type='password'
                    name='password'
                    required
                    onChange={(e) => updateAdmin(e.target.name, e.target.value)}
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
                    Sign in
                </button>
            </form>
        </section>
    );
};

export default Signin;
