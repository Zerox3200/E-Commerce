import React from 'react';
import './WishList.scss'
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useQuery } from 'react-query';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useContext, useState } from 'react';
import { IoHeartDislike } from "react-icons/io5";
import { WishListContext } from '../../Context/WishListContext';
import { Carts } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function WishList() {
    const [EnableHandeler, setEnableHandeler] = useState(true);
    const [Loader, SetLoader] = useState(false);
    const { RemoveWishProduct } = useContext(WishListContext);
    const { AddToCart } = useContext(Carts);

    const WishListHandle = () => {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: reactLocalStorage.get("Token")
            }
        }).catch(() => setEnableHandeler(false));
    }


    const { isLoading, data, isError, refetch } = useQuery('WishList', WishListHandle, {
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        enabled: EnableHandeler
    })


    const RemoveWishHandel = async (id) => {
        SetLoader(true)
        await RemoveWishProduct(id);
        refetch().then(() => {
            SetLoader(false)
        })
    }

    const AddToCartHandler = async (product_id) => {
        await AddToCart(product_id);
        toast.success("Added to Cart successfully...");
    }


    return <>
        <div className="WishList row container gap-3 mt-2">
            {isLoading || Loader ? <Loading /> :
                isError ? <div className='Empty'><h1>Your WishList is empty</h1></div> :
                    data?.data.count === 0 ? <div className='Empty'><h1>Your WishList is empty</h1></div> :
                        data?.data.data.map((Wish, index) => <div className="card col-xl-2 col-lg-4 col-md-5" key={index}>
                            <Link to={`/${Wish.id}`}>
                                <img src={Wish.imageCover} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h1 className="card-title h5">Product Title</h1>
                                    <p className="card-text"></p>
                                    <div className="d-flex justify-content-between">
                                        <p className='price'> EG</p>
                                        <p className='d-flex align-items-center'><FaStar className='mx-1 Star' /></p>
                                    </div>
                                </div>
                            </Link>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary w-75" onClick={() => AddToCartHandler(Wish.id)}>
                                    Add to Cart</button>
                                <IoHeartDislike className='Remove' onClick={() => RemoveWishHandel(Wish.id)} />
                            </div>
                        </div>
                        )}
        </div>
    </>
}
