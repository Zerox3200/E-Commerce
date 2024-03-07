import React from 'react';
import axios from 'axios';
import './Orders.scss';
import { useQuery } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../Context/UserContext';
import Loading from '../../Components/Loading/Loading';

export default function Orders() {
    const [EnableError, setEnableError] = useState(false);
    const { UserToken } = useContext(UserContext)
    const [UserId, setUserId] = useState();

    const GetAllOrders = async () => {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`)
            .catch(() => setEnableError(false))
    }

    const { data, isLoading, isError } = useQuery('Orders', GetAllOrders, {
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        enabled: EnableError
    })

    useEffect(() => {
        if (UserToken) {
            const decodedToken = jwtDecode(UserToken);
            setUserId(decodedToken.id);
            setEnableError(true);
        } else {
            setUserId(null);
            setEnableError(false);
        }
    }, [UserToken]);


    return <>

        <div className="Orders container">
            {isLoading ? <Loading /> :
                data?.data.length === 0 ? <div className='Empty'><h1>Your WishList is empty</h1></div> :
                    isError ? <div className='Empty'><h1>Your WishList is empty</h1></div> :
                        data?.data.map((Shipping, index) => <div className="Order mt-2 row gap-2 p-3" key={index}>
                            <h1 className='Main_Title'>Total Price : {Shipping.totalOrderPrice} EG</h1>
                            {Shipping.cartItems.map((Order, index) => <div className="card col-xl-5 col-md-8" key={index}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={Order.product.imageCover} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body d-flex flex-column justify-content-center h-100">
                                            <h1 className="card-title h5">{Order.product.title}</h1>
                                            <p className="card-text Price">Price: {Order.price} EG
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>)}

                        </div>
                        )}
        </div>
    </>
}
