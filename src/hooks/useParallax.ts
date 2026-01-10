import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  disabled?: boolean;
}

export function useParallax({ speed = 0.5, disabled = false }: ParallaxOptions = {}) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffsetY(scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, disabled]);

  return offsetY;
}

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(element?: React.RefObject<HTMLElement>) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (element?.current) {
        const rect = element.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [element]);

  return mousePosition;
}
