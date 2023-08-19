import { useEffect } from 'react';
import { motion, AnimationControls, MotionProps } from 'framer-motion';

type UseOnLoadAnimation = (delay?: number, duration?: number) => AnimationControls;

const useOnLoadAnimation: UseOnLoadAnimation = (delay = 0, duration = 0.5) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      skewX: 0,
      opacity: 1,
      y: 0,
      transition: { delay, duration },
    });
  }, [controls, delay, duration]);

  return controls;
};

export default useOnLoadAnimation;
