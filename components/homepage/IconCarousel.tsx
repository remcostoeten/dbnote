'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import FirebaseLogo from '../icons/FirebaseLogo';
import NextIcon from '../icons/NextIcon';
import ReactIcon from '../icons/ReactIcon';
import ShadCn from '../icons/ShadCn';
import TailwindIcon from '../icons/TailwindIcon';
import BootstrapIcon from "@/components/icons/BootstrapIcon";
import GitICon from "@/components/icons/GitICon";
import LinkedIn from "@/components/icons/LinkedIn";
import Magento from "@/components/icons/Magento";
import Mui from "@/components/icons/Mui";
import Next from "@/components/icons/Next";
import Photoshop from "@/components/icons/PhotoshopIcon";
import Sass from "@/components/icons/Sass";
import Sketch from "@/components/icons/Sketch";
import Vim from "@/components/icons/Vim";
import Vue from "@/components/icons/Vue";
const banners = [
    { icon: <BootstrapIcon /> },
    { icon: <GitICon /> },
    { icon: <LinkedIn /> },
    { icon: <Magento /> },
    { icon: <Mui /> },
    { icon: <Next /> },
    { icon: <Photoshop /> },
    { icon: <Sass /> },
    { icon: <Sketch /> },
    { icon: <Vim /> },
    { icon: <Vue /> },
    { icon: <FirebaseLogo /> },
    { icon: <NextIcon /> },
    { icon: <ReactIcon /> },
    { icon: <ShadCn /> },
    { icon: <TailwindIcon /> },
];


const IconCarousel = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const settings = {
        dots: false,
        navigator: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 14,
        autoplay: true,
        autoplaySpeed: 100,
        cssEase: 'linear',
        swipeToSlide: false,
        touchThreshold: 10,
        responsive: [
        ],
        rtl: scrollPosition > 400 ? false : true,
    };

    return (
        <Slider {...settings}>
            {banners.map((banner, index) => (
                <div key={index}>
                    {banner.icon}
                </div>
            ))}
        </Slider>
    );
};

export { IconCarousel };
