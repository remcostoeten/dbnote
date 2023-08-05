'use client'; import React, { useEffect, useRef } from 'react';

interface AutoScrollComponentProps {
  children: React.ReactNode;
}

const AutoScrollComponent: React.FC<AutoScrollComponentProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      startAutoScroll();
    }
  }, []);

  const startAutoScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      if (scrollWidth > clientWidth) {
        let scrollLeft = 0;
        const scrollStep = 1;
        const scrollInterval = 10;

        const scroll = () => {
          scrollLeft += scrollStep;
          if (scrollLeft >= scrollWidth - clientWidth) {
            scrollLeft = 0;
          }
          scrollContainer.scrollLeft = scrollLeft;
        };

        let intervalId = setInterval(scroll, scrollInterval);

        scrollContainer.addEventListener('mouseenter', () => {
          clearInterval(intervalId);
        });

        scrollContainer.addEventListener('mouseleave', () => {
          intervalId = setInterval(scroll, scrollInterval);
        });
      }
    }
  };

  return (
    <div className="auto-scroll-container" ref={scrollContainerRef}>
      <div className="auto-scroll-content">{children}</div>
    </div>
  );
};

export default AutoScrollComponent;
