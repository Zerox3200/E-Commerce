import React from 'react';

import { useParams } from 'react-router-dom';
import './Details.scss';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import { ThreeDots } from 'react-loader-spinner';
import { FaStar } from 'react-icons/fa';
import { useContext } from 'react';
import { Carts } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Details() {
    const { AddToCart } = useContext(Carts);
    const { id } = useParams();

    const GetProductDetails = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { data, isLoading } = useQuery("ProductDetails", GetProductDetails, {
        cacheTime: 0,
    })
    const Product = data?.data.data;
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        arrows: false,
        autoplay: true
    };

    const AddToCartHandler = async (id) => {
        await AddToCart(id);
        toast.success("Added To Cart Successfully");
    }
    return <>
        {isLoading ? <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="DetailsLoading"
        /> : <div className='Details d-flex mt-5'>
            <div className="DetailsSlider col-md-4 col-sm-8 col-sm-8">
                <Slider {...settings} >
                    {Product.images?.map((productImage, index) => <div key={index}>
                        <img src={productImage} alt='...' loading='lazy' />
                    </div>
                    )}
                </Slider>
            </div>
            <div className="Details_Description col-md-8 col-sm-8 d-flex flex-column">
                <h1 className='h2'>{Product.title}</h1>
                <p className='lead'>{Product.description}
                </p>
                <p className='blockquote'>Category : {Product.category.name}</p>
                <p className='blockquote'>Brand : {Product.brand.name}</p>
                <p className='blockquote'>Quantity : {Product.quantity}</p>
                <div className="d-flex justify-content-between">
                    <p className='price'>{Product.price} EG</p>
                    <p className='d-flex align-items-center px-5'><FaStar className='mx-1 rateStar' />{Product.ratingsQuantity} </p>
                </div>
                <button className='btn align-self-center'
                    onClick={() => AddToCartHandler(Product.id)}>Add To Cart</button>
            </div>
        </div>}

    </>
}
