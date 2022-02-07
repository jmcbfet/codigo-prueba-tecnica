import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { DashboardNavbar } from '../../../components';
import { BASE_URL } from '../../../constatns';
import axios from 'axios';

const PagoOrder = () => {

    const params = useParams();
    const navigate = useNavigate();

    const stripePromise = loadStripe("pk_test_51KPBGZC2h6wBxe0qFv9kRUNm69aG2an3hDyyVCQ2gK35yktZsUVf1JywP9ZY1OSeJBXAlldE2Zu80etMQa7Rb65m00F084BnQc")

    const [orderDetail, setOrderDetail] = useState([]);

    const CheckoutForm = () => {

        const stripe = useStripe();
        const elements = useElements();

        const onSubmit = async (e) => {
            e.preventDefault();

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })

            if (!error) {
                const { id } = paymentMethod;

                axios.post(
                    BASE_URL + "/orders/checkout", {
                    id,
                    amount: orderDetail[0].total,
                    id_order: params.id,
                    producto: orderDetail[0].name
                },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${localStorage.getItem('token')}`
                        }
                    },

                ).then(response => {
                    
                }).catch(err => {
                    console.log(err);
                })
            }

            navigate(`/dashboard/orders`);

        }

        return (
            <>
                <DashboardNavbar />
                <div class="card" style={{ width: "50%" }}>
                    <div class="card-body">
                        <form onSubmit={onSubmit}>
                            <CardElement />
                            <button className='btn btn-primary' type='submit'>Comprar</button>
                        </form>
                    </div>
                </div>
            </>


        )
    }

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
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    )
};

export default PagoOrder;
