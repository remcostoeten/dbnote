'use client'; import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverStatus, setHoverStatus] = useState(false);

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    }
  }

  const onMouseHover = () => setHoverStatus(true);
  const onMouseLeave = () => setHoverStatus(false);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.querySelectorAll(".hover-reverse").forEach(hoverElement => {
      hoverElement.addEventListener("mouseover", onMouseHover);
      hoverElement.addEventListener("mouseout", onMouseLeave);
    });
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll(".hover-reverse").forEach(hoverElement => {
        hoverElement.removeEventListener("mouseover", onMouseHover);
        hoverElement.removeEventListener("mouseout", onMouseLeave);
      });
    }
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-transform duration-300 ease-out transform ${hoverStatus ? 'scale-250 bg-black text-white' : 'scale-100 bg-white text-black'
        }`}
      style={{ width: '10px', height: '10px', borderRadius: '50%', top: '-5px', left: '-5px' }}
      ref={cursorRef}
    />
  )
}
