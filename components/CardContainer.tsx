
'use client';

import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css'; // Import CSS Module
import ToolCard from './CardComponent';
import FirebaseLogo from './icons/FirebaseLogo';
import NextIcon from './icons/NextIcon';
import ReactIcon from './icons/ReactIcon';
import ShadCn from './icons/ShadCn';
import TailwindIcon from './icons/TailwindIcon';
import TypescriptIcon from './icons/TypescriptIcon';

const Banner = () => {
    const initialBanners = [
        { title: "Firebase", description: "For authentication + storage. Also some MySQL in the mix.", icon: <FirebaseLogo /> },
        { title: "Next.js 13", description: "App dir, Routing, Layouts, Loading UI and API routes.", icon: <NextIcon /> },
        { title: "React 18", description: "App dir, Routing, Layouts, Loading UI and API routes.", icon: <ReactIcon /> },
        { title: "TailwindIcon", description: "Tailwind for styling and some SCSS for animations.", icon: <TailwindIcon /> },
        { title: "ShadCN/ui + Radix", description: "For unstyled out of the box proper components.", icon: <ShadCn /> },
        { title: "Typescript", description: "For type safety and a better developer experience.", icon: <TypescriptIcon /> }
    ];
    const [banners, setBanners] = useState(initialBanners);

    const scrollBanner = () => {
        const newBanners = [...banners];
        const firstBanner = newBanners.shift();
        newBanners.push(firstBanner);
        setBanners(newBanners);
    };

    useEffect(() => {
        const interval = setInterval(scrollBanner, 5000);
        return () => clearInterval(interval);
    }, [banners]);

    return (
        <div className="banner">
            {banners.map((banner, index) => (
                <ToolCard key={index} title={banner.title} description={banner.description} icon={banner.icon} />
            ))}
        </div>
    );
};

export default Banner;
