'use client';
import React, { useState, useEffect } from 'react';
import useMousePosition from '@/lib/useMousePosition';
import styles from '@/styles/modules/mask-cursor.module.scss';

export default function Home() {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const [size, setSize] = useState(40);
    const [maskPosition, setMaskPosition] = useState({ x: - size / 2, y: - size / 2 });
    const [maskSize, setMaskSize] = useState(size);

    useEffect(() => {
        setSize(isHovered ? 400 : 40);
        setMaskPosition({ x: - size / 2, y: - size / 2 });
        setMaskSize(size);
    }, [x, y, isHovered]);

    return (
        <main className={styles.main}>
            <div
                className={styles.mask}
                style={{
                    WebkitMaskPosition: `${maskPosition.x}px ${maskPosition.y}px`,
                    WebkitMaskSize: `${maskSize}px`,
                    transition: 'all 0.5s ease-out'
                }}
            >
                <p
                    onMouseEnter={() => {
                        setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false);
                    }}
                >
                    A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is equally good.
                </p>
            </div>

            <div className={styles.body}>
                <p>
                    I'm a <span>selectively skilled</span> product designer with a strong focus on producing high-quality & impactful digital experiences.
                </p>
            </div>
        </main>
    );
}
