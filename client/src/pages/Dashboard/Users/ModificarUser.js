import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../../constatns'
import { DashboardNavbar } from '../../../components';
import axios from 'axios';
import './styles.css';

const ModificarUser = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        nombre: location.state.user.name,
        correo: location.state.user.email,
        telefono: location.state.user.phone,
        password: location.state.user.password,
        id_rol: location.state.user.id_rol,
    });

    const [roles, setRoles] = useState([]);

    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(
            BASE_URL + `/users/roles`,
            { headers: { "Authorization": `${localStorage.getItem('token')}` } }
        ).then(response => {
            setRoles(response.data.roles);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const { nombre, correo, telefono, password, id_rol } = form;

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
        
        axios.put(
            BASE_URL + `/users/modificar/${location.state.user.id_user}`, {
            nombre,
            correo,
            telefono,
            password,
            id_rol
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                }
            },

        ).then(response => {
            navigate('/dashboard/users');
        }).catch(err => {
            console.log(err);
        })
        

    }

    return (
        <>
            <DashboardNavbar />

            <div className='container w-75'>
                <div className='row'>
                    <div className='col bg-user'>

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
                                    <input type="text" className='form-control' value={form.nombre} name="nombre" onChange={onChange} />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="correo" className='form-label'>Correo</label>
                                    <input type="email" className='form-control' value={form.correo} name="correo" onChange={onChange} />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="telefono" className='form-label'>Telefono</label>
                                    <input type="number" className='form-control' value={form.telefono} name="telefono" onChange={onChange} />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="password" className='form-label'>Contraseña</label>
                                    <input type="password" className='form-control' value={form.password} name="password" onChange={onChange} />
                                </div>
                                <div className='mb-4'>
                                    <label className='form-label'>Rol</label>
                                    <select name="id_rol" style={{ width: "100%", height: 40 }} value={form.id_rol} onChange={onChange}>
                                        {roles.map(rol => (
                                            <option key={rol.id_rol} value={rol.id_rol}>{rol.descripcion}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='d-grid'>
                                    <button type='submit' className='btn btn-primary'>Modificar</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </>

    )
};

export default ModificarUser;
