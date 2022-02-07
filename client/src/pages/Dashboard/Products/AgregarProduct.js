import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constatns'
import { DashboardNavbar } from '../../../components';
import './styles.css';
import axios from 'axios';

const AgregarProduct = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        nombre: '',
        precio: '',
    });

    const [error, setError] = useState('')

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const { nombre, precio } = form;

        if (nombre === '') {
            setError('El nombre es obligatorio');
            return;
        }
        if (precio === '') {
            setError('El correo es obligatorio');
            return;
        }
        
        axios.post(
            BASE_URL + "/products/agregar", {
            nombre,
            precio,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                }
            },

        ).then(response => {
            navigate('/dashboard/products');
        }).catch(err => {
            console.log(err);
        })
        

    }

    return (
        <>
            <DashboardNavbar />

            <div className='container w-75'>
                <div className='row'>
                    <div className='col bg-product'>

                    </div>
                    <div className='col'>

                        <div className='py-5'>

                            {error
                                ?
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                                :
                                null
                            }

                            <form onSubmit={onSubmit}>
                                <div className='mb-4'>
                                    <label htmlFor="nombre" className='form-label'>Producto</label>
                                    <input type="text" className='form-control' name="nombre" onChange={onChange} />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="precio" className='form-label'>Precio</label>
                                    <input type="number" className='form-control' name="precio" onChange={onChange} />
                                </div>
                                <div className='d-grid'>
                                    <button type='submit' className='btn btn-primary'>Agregar</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </>

    )
};

export default AgregarProduct;
