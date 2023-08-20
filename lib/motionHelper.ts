type MotionVariants = {
  opacity?: number;
  y?: number;
  skewX?: number;
};

export const defaultInitial: MotionVariants = {
  opacity: 0,
  y: 20,
  skewX: 0,
};

export const defaultAnimate: MotionVariants = {
  opacity: 1,
  y: 0,
  skewX: 0,
};

export function getDefaultTransition(delayMultiplier: number = 1, duration: number = 0.5): object {
  return {
    delay: 0.1 * delayMultiplier,
    duration,
  };
}
