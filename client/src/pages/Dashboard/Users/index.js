import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constatns';
import { DashboardNavbar } from '../../../components';
import axios from 'axios';

const Users = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const listarUsuarios = () => {
        axios.get(
            BASE_URL + `/users/listar`,
            { headers: { "Authorization": `${localStorage.getItem('token')}` } }
        ).then(response => {
            setUsers(response.data.users);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        listarUsuarios();
    }, []);

    const eliminarUser = (id) => {
        axios.delete(
            BASE_URL + `/users/eliminar/${id}`,
            { headers: { "Authorization": `${localStorage.getItem('token')}` } }
        ).then(response => {
            listarUsuarios();
        }).catch(err => {
            console.log(err);
        })
    }

    const goToAddUser = () => navigate('/dashboard/users/add')
    const goToModificarUser = (user) => navigate('/dashboard/users/edit', {state: { user }});

    return (
        <>
            <DashboardNavbar />

            <button className='btn btn-primary' type='button' onClick={goToAddUser}>Agregar</button>

            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id_user}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.descripcion}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => eliminarUser(user.id_user)}>Eliminar</button>
                                <button className='btn btn-success' onClick={() => goToModificarUser(user)}>Modificar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    );
};

export default Users;
