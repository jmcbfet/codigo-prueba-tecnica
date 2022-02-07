import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constatns'
import axios from 'axios';
import './styles.css';

const AuthPage = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        password: '',
        confirmPassword: ''
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

        const { nombre, correo, telefono, password, confirmPassword } = form;

        if (nombre === '') {
            setError('El nombre es obligatorio');
            return;
        }
        if (correo === '') {
            setError('El correo es obligatorio');
            return;
        }
        if (telefono === '') {
            setError('El telefono es obligatorio');
            return;
        }
        if (password === '') {
            setError('La contraseña es obligatoria');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener 6 caracteres');
            return;
        }
        if (confirmPassword === '') {
            setError('Confirmar contraseña es obligatorio');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }


        axios.post(BASE_URL + '/auth/register', { nombre, correo, telefono, password })
            .then(response => {
                if (response.status === 200) {
                    navigate('/')
                }
            }).catch(err => {
                setError(err.response.data.msg)
            })

    }

    return (
        <div className='container w-75'>
            <div className='row'>
                <div className='col bg'>

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
                                <label htmlFor="nombre" className='form-label'>Nombre completo</label>
                                <input type="text" className='form-control' name="nombre" onChange={onChange} />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="correo" className='form-label'>Correo</label>
                                <input type="email" className='form-control' name="correo" onChange={onChange} />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="telefono" className='form-label'>Telefono</label>
                                <input type="number" className='form-control' name="telefono" onChange={onChange} />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="password" className='form-label'>Contraseña</label>
                                <input type="password" className='form-control' name="password" onChange={onChange} />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="confirmPassword" className='form-label'>Contraseña</label>
                                <input type="password" className='form-control' name="confirmPassword" onChange={onChange} />
                            </div>
                            <div className='d-grid'>
                                <button type='submit' className='btn btn-primary'>Registrarse</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
};

export default AuthPage;
