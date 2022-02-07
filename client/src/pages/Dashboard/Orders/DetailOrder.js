import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constatns';
import { DashboardNavbar } from '../../../components';
import axios from 'axios';

const DetailOrder = () => {

    const params = useParams();
    const navigate = useNavigate();

    const goToPagoOrder = () => navigate(`/dashboard/orders/payment/${params.id}`)

    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(() => {
        axios.get(
            BASE_URL + `/orders/detail/${params.id}`,
            { headers: { "Authorization": `${localStorage.getItem('token')}` } }
        ).then(response => {
            setOrderDetail(response.data.order);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <DashboardNavbar />
            {orderDetail.map(detail => (
                <div key={detail.id_order}>
                    <div class="card" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <h5 class="card-title">{detail.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Estado: {detail.status}</h6>
                            <p class="card-text">Cantidad: {detail.quantity}</p>
                            <p class="card-text">Total: {detail.total}</p>
                            <button className='btn btn-primary' onClick={goToPagoOrder}>Pagar</button>
                        </div>
                    </div>
                </div>
            ))}

           

        </>
    )
};

export default DetailOrder;
