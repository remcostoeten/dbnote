'use client';
import React from 'react';
import Slider from 'react-slick';
import FirebaseLogo from '@/components/icons/FirebaseLogo';
import NextIcon from '@/components/icons/NextIcon';
import ReactIcon from '@/components/icons/ReactIcon';
import ShadCn from '@/components/icons/ShadCn';
import TailwindIcon from '@/components/icons/TailwindIcon';
import TypescriptIcon from '@/components/icons/TypescriptIcon';
import ToolCard from '../CardComponent';


const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    swipeToSlide: true,
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
  };

  const banners = [
    { title: "Firebase", description: "For authentication + storage. Also some MySQL in the mix.", icon: <FirebaseLogo /> },
    { title: "Next.js 13", description: "App dir, Routing, Layouts, Loading UI and API routes.", icon: <NextIcon /> },
    { title: "React 18", description: "App dir, Routing, Layouts, Loading UI and API routes.", icon: <ReactIcon /> },
    { title: "TailwindIcon", description: "Tailwind for styling and some SCSS for animations.", icon: <TailwindIcon /> },
    { title: "ShadCN/ui + Radix", description: "For unstyled out of the box proper components.", icon: <ShadCn /> },
    { title: "Typescript", description: "For type safety and a better developer experience.", icon: <TypescriptIcon /> }
  ];

  return (
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <div key={index}>
          <ToolCard title={banner.title} description={banner.description} icon={banner.icon} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
