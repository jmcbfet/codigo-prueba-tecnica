import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../constatns';
import { Navbar } from '../../components';
import axios from 'axios';

const Home = () => {

  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const verDetalleProducto = (id) => navigate(`/product/${id}`)

  useEffect(() => {
    axios.get(
      BASE_URL + '/products/listar',
      { headers: { "Authorization": `${localStorage.getItem('token')}` } }
    ).then(response => {
      setProducts(response.data.products);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className='container'>
      <h5 className='mb-5'>productos</h5>
      <Navbar />
      {products.map(product => (
        <div key={product.id_product}>

          <div class="card">
            <div class="card-body">
              <h1>Nombre producto: {product.name}</h1>
              <h1>Precio: {product.price}</h1>
              <button className='btn btn-primary' onClick={() => verDetalleProducto(product.id_product)}>Ver mas</button>
            </div>
          </div>

        </div>
      ))}
    </div>
  )
};

export default Home;
