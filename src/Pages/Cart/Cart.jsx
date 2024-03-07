import React from 'react';
import axios from 'axios'
import './Cart.scss'
import { useQuery } from 'react-query'
import { reactLocalStorage } from 'reactjs-localstorage'
import { ThreeDots } from 'react-loader-spinner'
import { FaTrashAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react'
import { Carts } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'


export default function Cart() {
    const { UpdateQuantatiy, DeletCart } = useContext(Carts);
    const [Loading, setLoading] = useState(false);
    const [queryEnabled, setQueryEnabled] = useState(true);

    const GetCart = async () => {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: reactLocalStorage.get("Token")
            }
        }).catch(() => setQueryEnabled(false))
    }

    const { data, isLoading, refetch, isError } = useQuery("Carts", GetCart, {
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        enabled: queryEnabled,
    });
    const CartNumber = data?.data.numOfCartItems;
    const CarTotalPrice = data?.data.data.totalCartPrice;
    const CartId = data?.data.data._id;

    const HandleUpdateCart = async (id, count) => {
        if (count === 0) {
            toast.error("You can't make cart lower that 1");
            return;
        };
        setLoading(true)
        await UpdateQuantatiy(id, count);
        refetch().then(() => {
            setLoading(false);
            toast.success("Product Added successfully")
        })
    }

    const HandleDelete = async (id) => {
        setLoading(true)
        await DeletCart(id);
        refetch().then(() => {
            setLoading(false)
        });
    }

    useEffect(() => {
        setQueryEnabled(true);
    }, []);

    return (
        <div className='Cart container mt-3'>
            <h1 className='h2'>Shop Cart</h1>
            {isLoading || Loading ? <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="CartLoader"
            /> : isError ? <span>Cart Number is : 0</span> : !data ? <span>Cart Number is : 0</span> : <>
                <span>Number of carts is :{CartNumber}</span> <br />
                <span>Total Price : {CarTotalPrice} EG</span>
                {data?.data.data.products.map((Cart, index) => <div key={index}
                    className="CartDesc w-100 row justify-content-between align-items-center mb-5">
                    <div className="CartDesc_pt1 col-md-8">
                        <img src={Cart.product.imageCover} alt="" />
                        <div className="CartDesc_pt1_Details d-flex flex-column row-gap-2 mx-3 pt-4">
                            <p>{Cart.product.title.split(' ').splice(0, 2).join(' ')} </p>
                            <p>Price : {Cart.price} EG</p>
                            <p onClick={() => HandleDelete(Cart.product.id)}><FaTrashAlt /> Remove</p>
                        </div>
                    </div>
                    <div className="CartDesc_pt2 d-flex justify-content-center align-items-center col-md-4">
                        <span onClick={() => HandleUpdateCart(Cart.product.id, Cart.count + 1)}>+</span>
                        <p>{Cart.count}</p>
                        <span onClick={() => HandleUpdateCart(Cart.product.id, Cart.count - 1)}>-</span>
                    </div>
                </div>
                )}
                <div className="CheckOut">
                    <Link to={`/Shipping/${CartId}`} className='btn w-50'>Book Order</Link>
                </div>
            </>}
        </div>
    )
}
