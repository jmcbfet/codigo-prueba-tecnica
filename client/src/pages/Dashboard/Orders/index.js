import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constatns';
import { DashboardNavbar } from '../../../components';
import axios from 'axios';

const Orders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    const verOrder = (id) => navigate(`/dashboard/orders/${id}`)

    useEffect(() => {
        axios.get(
            BASE_URL + `/orders/listar/${user[0].id_user}`,
            { headers: { "Authorization": `${localStorage.getItem('token')}` } }
        ).then(response => {
            setOrders(response.data.orders);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <DashboardNavbar />

            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Status</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id_order}>
                            <td>{order.id_order}</td>
                            <td>{order.name}</td>
                            <td>{order.status}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => verOrder(order.id_order)}>Ver</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </>

    );
};

export default Orders;
