import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constatns';
import { Navbar } from '../../components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Product = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState([]);
    const [cantidad, setCantidad] = useState(1)

    const aumentarCantidad = () => setCantidad(cantidad + 1);
    const disminuirCantidad = () => cantidad > 1 ? setCantidad(cantidad - 1) : setCantidad(cantidad)

    const user = JSON.parse(localStorage.getItem('user'));

    const agregarProductoALaOrder = (precioTotal) => {

        axios.post(
            BASE_URL + `/orders/agregar`, {
                id_user: user[0].id_user,
                id_product: params.id,
                status: "CREATED",
                quantity: cantidad,
                total: precioTotal
            },
            { headers: { 
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}` } },

        ).then(response => {
            navigate('/home')
        }).catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {
        axios.get(
            BASE_URL + `/products/${params.id}`,
            { headers: { "Authorization": `${localStorage.getItem('token')}` } }
        ).then(response => {
            setProduct(response.data.product);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <div className='container'>
            <Navbar />
            <h1 className='mb-5'>Descripcion del producto {params.id}</h1>

            {product.map(product => (
                <div key={product.id_product}>
                    <h2>{product.name}</h2>
                    <h2>Precio unitario: {product.price}</h2>
                    <h2>Precio total: {product.price * cantidad}</h2>
                    <button className='btn btn-primary' onClick={aumentarCantidad}>+</button>
                    <button className='btn btn-primary' onClick={disminuirCantidad}>-</button>
                    <h2>Cantidad: {cantidad}</h2>
                    <button className='btn btn-success' onClick={() => agregarProductoALaOrder(product.price * cantidad)}>Agregar a la order</button>
                </div>
            ))}
        </div>
    );
};

export default Product;
