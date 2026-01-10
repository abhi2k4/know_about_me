import { useEffect, useState } from 'react';

interface CustomCursorOptions {
  outerSize?: number;
  innerSize?: number;
  outerColor?: string;
  innerColor?: string;
}

export function useCustomCursor(options: CustomCursorOptions = {}) {
  const {
    outerSize = 40,
    innerSize = 8,
    outerColor = 'rgba(0, 0, 0, 0.1)',
    innerColor = 'rgba(0, 0, 0, 0.5)',
  } = options;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      setTimeout(() => {
        setOuterPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const cursorStyle = {
    outer: {
      position: 'fixed' as const,
      left: outerPosition.x - outerSize / 2,
      top: outerPosition.y - outerSize / 2,
      width: outerSize,
      height: outerSize,
      borderRadius: '50%',
      backgroundColor: outerColor,
      pointerEvents: 'none' as const,
      transition: isHovering ? 'all 0.2s ease' : 'all 0.1s ease',
      transform: isHovering ? 'scale(1.5)' : 'scale(1)',
      zIndex: 9999,
    },
    inner: {
      position: 'fixed' as const,
      left: position.x - innerSize / 2,
      top: position.y - innerSize / 2,
      width: innerSize,
      height: innerSize,
      borderRadius: '50%',
      backgroundColor: innerColor,
      pointerEvents: 'none' as const,
      transition: isClicking ? 'all 0.1s ease' : 'all 0.05s ease',
      transform: isClicking ? 'scale(0.5)' : 'scale(1)',
      zIndex: 10000,
    },
  };

  return { cursorStyle, setIsHovering };
}
