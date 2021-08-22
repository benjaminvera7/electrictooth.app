import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';


const EditProduct = () => {
    const [product, setProduct] = useState({
        product_name: '',
        artist_name: '',
        description: '',
        product_img: '',
        quantity: {
            'xs': 0,
            'sm': 0,
            'md': 0,
            'lg': 0,
            'xl': 0,
            'xxl': 0
        },
        price: 1,
        tags: '',
    });

    const updateProduct = (name, value) => {
        const newProduct = {
            ...product,
            [name]: value,
        };
        setProduct(newProduct);
    };

    const updateProductQuantity = (name, value) => {
        const newProduct = {
            ...product,
            quantity: {
                ...product.quantity,
                [name]: parseInt(value)
            }
        };
        setProduct(newProduct);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('product_name', product.product_name);
        formData.append('price', product.price);
        formData.append('artist_name', product.artist_name);
        formData.append('product_img', product.product_img);
        formData.append('tags', product.tags);
        formData.append('description', product.description);
        formData.append('quantity', JSON.stringify(product.quantity));

        axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/upload/edit_product`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'authorization': localStorage.getItem('admin_token')
                },
            })
            .then((response) => {
                console.log(response);
            });

    }

    console.log(product)

    return (
        <section style={{ margin: '16px' }}>
            <form id='addProduct' onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>product name</label>
                <input
                    type='text'
                    name='product_name'
                    value={product.product_name}
                    required
                    onChange={(e) => updateProduct(e.target.name, e.target.value)}
                />
                <label>description</label>
                <textarea
                    type='text'
                    name='description'
                    value={product.description}
                    required
                    onChange={(e) => updateProduct(e.target.name, e.target.value)}
                />
                <label>tags</label>
                <input
                    type='text'
                    name='tags'
                    value={product.tags}
                    required
                    onChange={(e) => updateProduct(e.target.name, e.target.value)}
                />
                <label>product price</label>
                <input
                    type='text'
                    name='price'
                    value={product.price}
                    required
                    onChange={(e) => updateProduct(e.target.name, e.target.value)}
                />
                <label>artist name</label>
                <input
                    type='text'
                    name='artist_name'
                    value={product.artist_name}
                    required
                    onChange={(e) => updateProduct(e.target.name, e.target.value)}
                />
                <label>product image</label>
                <input
                    type='file'
                    accept='image/*'
                    multiple={false}
                    name='product_img'
                    required
                    onChange={(e) => updateProduct(e.target.name, e.target.files[0])}
                />

                <label><b>quantity</b></label>

                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '16px', marginTop: '8px' }}>
                    <div>xs&nbsp;&nbsp;<input type='number' name='xs' style={{ width: '32px' }} min='0' onChange={(e) => updateProductQuantity(e.target.name, e.target.value)} /></div>
                    <div>sm&nbsp;<input type='number' name='sm' style={{ width: '32px' }} min='0' onChange={(e) => updateProductQuantity(e.target.name, e.target.value)} /></div>
                    <div>md&nbsp;<input type='number' name='md' style={{ width: '32px' }} min='0' onChange={(e) => updateProductQuantity(e.target.name, e.target.value)} /></div>
                    <div>lg&nbsp;&nbsp;&nbsp;<input type='number' name='lg' style={{ width: '32px' }} min='0' onChange={(e) => updateProductQuantity(e.target.name, e.target.value)} /></div>
                    <div>xl&nbsp;&nbsp;&nbsp;<input type='number' name='xl' style={{ width: '32px' }} min='0' onChange={(e) => updateProductQuantity(e.target.name, e.target.value)} /></div>
                    <div>xxl <input type='number' name='xxl' style={{ width: '32px' }} min='0' onChange={(e) => updateProductQuantity(e.target.name, e.target.value)} /></div>
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
}


export default EditProduct;

