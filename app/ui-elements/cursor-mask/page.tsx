'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '@/lib/useMousePosition';
import styles from '@/styles/modules/mask-cursor.module.scss';

export default function Home() {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const size = isHovered ? 400 : 40;

    if (x === null || y === null) { return null; }

    return (
        <main className={styles.main}>
            <motion.div
                className={styles.mask}
                animate={{
                    WebkitMaskPosition: `${x - size / 2 - 930}px ${y - size / 2 - 200}px`,
                    WebkitMaskSize: `${size}px`,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
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
            </motion.div>

            <div className={styles.body}>
                <p>
                    I'm a <span>selectively skilled</span> product designer with a strong focus on producing high-quality and impactful digital experiences.
                </p>
            </div>
        </main>
    );
}
