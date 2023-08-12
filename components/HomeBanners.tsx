'use client';
import React, { useEffect, useState } from 'react';
import ToolCard from '@/components/homepage/CardComponent';
import { Carousel, banners } from '@/components/homepage/Carousel';
import { motion } from 'framer-motion';
import { addBodyHoverClass, removeBodyHoverClass } from '@/hooks/HoverBodyClass';

export const HomeBanners = () => {
  const [scrollPosition, setScrollPosition] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(scrollPosition);

  return (
    <>
      <div
        onMouseEnter={addBodyHoverClass}
        onMouseLeave={removeBodyHoverClass}
        className="big-container pt-8 mQ3_iconsb-22">
        <div className="grid mx-auto selection:grid col-span-3 gap-6 grid-cols-3 content-center items-center justify-items-center">
          {banners.map((banner, index) => (
            <motion.div className='w-full card-glow'
              key={index}
              initial={{ scale: 0.8, opacity: 0, y: -40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, transition: { duration: .6 } }}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.5, ease: 'easeInOut' }}
            >
              <ToolCard title={banner.title} description={banner.description} icon={banner.icon} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
