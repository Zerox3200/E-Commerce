import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.scss';
import axios from 'axios';
import { useQuery } from 'react-query'
import { FaStar } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner';
import { useContext, useEffect } from 'react';
import { Carts } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { reactLocalStorage } from 'reactjs-localstorage';
import HomeSliders from '../../Components/HomdSliders/HomeSliders';
import { MdOutlineFavorite } from "react-icons/md";
import { WishListContext } from '../../Context/WishListContext';

export default function Home() {
    const navigate = useNavigate();
    const { AddToWishList, GetAllWishList, WishList, RemoveWishProduct } = useContext(WishListContext);

    const GetProducts = () => {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }

    const { AddToCart, Status } = useContext(Carts);

    let { data, isLoading } = useQuery("FeaturedProducts", GetProducts, {
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        staleTime: 500000
    });

    const CartAdding = async (id) => {
        if (!reactLocalStorage.get("Token")) {
            navigate("Login")
            return;
        }
        await AddToCart(id);
        if (Status) {
            toast.success(`Product added successfully to your cart`)
        } else {
            toast.error(`Can't add this products`)
        }
    }

    const AddToWishListHnadler = async (id) => {
        await AddToWishList(id);
        toast.success("Added to your WishList successfully...")
        GetAllWishListHandeler();
    }

    const RemoveWishListHandeler = async (id) => {
        await RemoveWishProduct(id);
        GetAllWishList();
        toast('Removed');
    }

    const GetAllWishListHandeler = async () => {
        await GetAllWishList();
    }

    useEffect(() => {
        GetAllWishListHandeler();
    }, []);


    return <>
        <HomeSliders />
        <div className='Home d-flex flex-wrap p-4 row-gap-5 column-gap-5 justify-content-center'>
            {isLoading ? <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /> : data?.data.data.map((product) => <div key={product.id} className="card col-xl-2 col-lg-4 col-md-5">
                <Link to={`/${product.id}`}>
                    <img src={product.imageCover} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h1 className="card-title h5">{product.title.split(" ").splice(0, 2).join(" ")}</h1>
                        <p className="card-text">{product.description.split(" ").splice(0, 2).join(" ")}</p>
                        <div className="d-flex justify-content-between">
                            <p className='price'>{product.price} EG</p>
                            <p className='d-flex align-items-center'><FaStar className='mx-1' /> {product.ratingsQuantity} </p>
                        </div>
                    </div>
                </Link>
                <button className="btn btn-primary w-75" onClick={() => CartAdding(product.id)}>Add to Cart</button>
                {WishList?.find(({ id }) => id === product.id) ?
                    <MdOutlineFavorite className='WishAdd Added' onClick={() => RemoveWishListHandeler(product.id)} /> :
                    <MdOutlineFavorite className='WishAdd' onClick={() => AddToWishListHnadler(product.id)} />}
            </div>
            )}

        </div>
    </>
}
