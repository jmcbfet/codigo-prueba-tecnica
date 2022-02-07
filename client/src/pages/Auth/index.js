import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constatns'
import axios from 'axios';
import './styles.css';

const AuthPage = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        correo: '',
        password: '',
    });

    const [error, setError] = useState('')

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const goToRegister = () => navigate('/register')

    const onSubmit = (e) => {
        e.preventDefault();

        const { correo, password } = form;

        if (correo === '') {
            setError('El correo es obligatorio');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener 6 caracteres');
            return;
        }

        axios.post(BASE_URL + '/auth/login', { correo, password })
            .then(response => {
                if (response.status === 200){
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    navigate('/home')
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
                                <label htmlFor="correo" className='form-label'>Correo</label>
                                <input type="email" className='form-control' name="correo" onChange={onChange} />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="password" className='form-label'>Contraseña</label>
                                <input type="password" className='form-control' name="password" onChange={onChange} />
                            </div>
                            <div className='d-grid'>
                                <button type='submit' className='btn btn-primary'>Iniciar Sesión</button>
                            </div>
                            <div className='d-grid'>
                                <button type='button' className='btn btn-primary' onClick={goToRegister}>Registrarse</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
};

export default AuthPage;
