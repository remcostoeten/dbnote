'use client'
import { useState, useEffect, ReactNode } from 'react';
import useMousePosition from '@/lib/useMousePosition';
import styles from '@/styles/modules/mask-cursor.module.scss';

interface MaskProps {
    children: ReactNode;
    maskSize?: number;
    hoverSize?: number;
}

const Mask: React.FC<MaskProps> = ({ children, maskSize = 40, hoverSize = 400 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });
    const [maskSizeState, setMaskSize] = useState(maskSize);
    const size = isHovered ? hoverSize : maskSize;

    useEffect(() => {
        setMaskPosition({ x: x - size / 2, y: y - size / 2 });
        setMaskSize(size);
    }, [x, y, size]);

    return (
        <div
            className={styles.mask}
            style={{
                WebkitMaskPosition: `${maskPosition.x}px ${maskPosition.y}px`,
                WebkitMaskSize: `${maskSizeState}px`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    );
}

export default Mask;
