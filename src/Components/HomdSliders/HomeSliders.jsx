import React from 'react';
import './HomeSliders.scss';
import Slider from "react-slick";
import Slide2 from './../../Assets/Images/slider-image-2.jpeg';
import Slide3 from './../../Assets/Images/slider-image-3.jpeg';
import Banner1 from './../../Assets/Images/slider-2.jpeg';
import Banner2 from './../../Assets/Images/grocery-banner-2.jpeg';
import Banner3 from './../../Assets/Images/banner-4.jpeg';
import { useQuery } from 'react-query';
import axios from 'axios';


export default function HomeSliders() {

    let settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        arrows: false
    };

    let CatSlider = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const HandleCatergories = () => {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const { data } = useQuery("Get_Categories", HandleCatergories, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
    return <>
        <div className='HomeSliders row align-items-center justify-content-center w-100'>
            <Slider {...settings} className='col-xl-8 col-md-12 HomeSlider_pt1'>
                <div>
                    <img src={Slide2} alt="" srcSet="" loading='lazy' />
                </div>
                <div>
                    <img src={Slide3} alt="" srcSet="" loading='lazy' />
                </div>
            </Slider>
            <div className="HomeSlider_pt2 col-xl-4 col-md-12">
                <img src={Banner1} alt="..." loading='lazy' />
                <img src={Banner2} alt="..." loading='lazy' />
                <img src={Banner3} alt="..." loading='lazy' />
            </div>
        </div>
        <div className="slider-container">
            <Slider {...CatSlider} >
                {data?.data.data.map((Cat) =>
                    <img src={Cat.image} alt="..." srcSet="" key={Cat._id} loading='lazy' />)}
            </Slider>
        </div>

    </>
}
