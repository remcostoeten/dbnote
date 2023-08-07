import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ToolCard from './CardComponent';
import FirebaseLogo from './icons/FirebaseLogo';
import NextIcon from './icons/NextIcon';
import ReactIcon from './icons/ReactIcon';
import ShadCn from './icons/ShadCn';
import TailwindIcon from './icons/TailwindIcon';
import TypescriptIcon from './icons/TypescriptIcon';

interface Banner {
    title: string;
    description: string;
    icon: JSX.Element;
}

const Carousel: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data asynchronously
        const fetchData = async () => {
            try {
                // Mimic the data fetching process
                const response = await fetch('/api/banners');
                const data = await response.json();
                setBanners(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Handle rendering while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle empty banners
    if (banners.length === 0) {
        return <div>No banners available.</div>;
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 4,
        autoplay: true,
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
