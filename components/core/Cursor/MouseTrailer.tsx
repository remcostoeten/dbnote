'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/styles/modules/cursor.module.scss';

const Trailer: React.FC = () => {
    const trailer = useRef<HTMLDivElement>(null);
    const trailerIcon = useRef<HTMLSpanElement>(null);

    const getTrailerClass = (type: string) => {
        switch (type) {
            case 'cursor':
                return 'fa-solid fa-play';
            default:
                return 'fa-solid fa-arrow-up-right';
        }
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const interactable = e.target as HTMLElement;
            const interacting = interactable.classList.contains('cursor-hover');

            const x = e.clientX - (trailer.current?.offsetWidth || 0) / 2;
            const y = e.clientY - (trailer.current?.offsetHeight || 0) / 2;

            if (trailer.current) {
                const keyframes = {
                    transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`
                }

                trailer.current.animate(keyframes, {
                    duration: 1000,
                    fill: "forwards"
                });
            }

            if (trailer.current) {
                trailer.current.dataset.type = interacting ? interactable.dataset.type || "" : "";
            }

            if (interacting && trailerIcon.current) {
                trailerIcon.current.className = getTrailerClass(interactable.dataset.type || "");
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div id={styles.trailer} ref={trailer}>
            <i id={styles.trailerIcon} className="fa-solid fa-arrow-up-right" ref={trailerIcon}></i>
        </div>
    );
};

export default Trailer;
