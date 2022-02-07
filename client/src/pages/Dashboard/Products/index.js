import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constatns';
import { DashboardNavbar } from '../../../components';
import axios from 'axios'

const Products = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const listarProductos = () => {
    axios.get(
      BASE_URL + `/products/listar`,
      { headers: { "Authorization": `${localStorage.getItem('token')}` } }
    ).then(response => {
      setProducts(response.data.products);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    listarProductos();
  }, [])

  const eliminarProduct = (id) => {
    axios.delete(
      BASE_URL + `/products/eliminar/${id}`,
      { headers: { "Authorization": `${localStorage.getItem('token')}` } }
    ).then(response => {
      listarProductos();
    }).catch(err => {
      console.log(err);
    })
  }

  const goToAddProduct = () => navigate('/dashboard/products/add')
  const goToModificarProduct = (product) => navigate('/dashboard/products/edit', { state: { product } });

  return (
    <>
      <DashboardNavbar />

      <button className='btn btn-primary' type='button' onClick={goToAddProduct}>Agregar</button>

      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id_product}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className='btn btn-danger' onClick={() => eliminarProduct(product.id_product)}>Eliminar</button>
                <button className='btn btn-success' onClick={() => goToModificarProduct(product)}>Modificar</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  );
};

export default Products;
