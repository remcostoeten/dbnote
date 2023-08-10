'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ToolCard from './CardComponent';
import FirebaseLogo from '../icons/FirebaseLogo';
import NextIcon from '../icons/NextIcon';
import ReactIcon from '../icons/ReactIcon';
import ShadCn from '../icons/ShadCn';
import TailwindIcon from '../icons/TailwindIcon';
import TypescriptIcon from '../icons/TypescriptIcon';

const banners = [
    { title: 'Firebase', description: 'For authentication + storage. Also some MySQL in the mix.', icon: <FirebaseLogo /> },
    { title: 'Next.js 13', description: 'App dir, Routing, Layouts, Loading UI and API routes.', icon: <NextIcon /> },
    { title: 'React 18', description: 'App dir, Routing, Layouts, Loading UI and API routes.', icon: <ReactIcon /> },
    { title: 'TailwindIcon', description: 'Tailwind for styling and some SCSS for animations.', icon: <TailwindIcon /> },
    { title: 'ShadCN/ui + Radix', description: 'For unstyled out of the box proper components.', icon: <ShadCn /> },
    { title: 'Typescript', description: 'For type safety and a better developer experience.', icon: <TypescriptIcon /> },
];

const Carousel = () => {
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
        infinite: true,
        speed: 5000,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 100,
        cssEase: 'linear',
        swipeToSlide: false,
        touchThreshold: 10,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        rtl: scrollPosition > 400 ? false : true,
    };

    return (
        <Slider className="mt-4" {...settings}>
            {banners.map((banner, index) => (
                <div key={index}>
                    <ToolCard title={banner.title} description={banner.description} icon={banner.icon} />
                </div>
            ))}
        </Slider>
    );
};

export { Carousel, banners };
