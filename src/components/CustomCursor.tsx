import React from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';

const CustomCursor = () => {
  const { cursorStyle, setIsHovering } = useCustomCursor();

  React.useEffect(() => {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
    });

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };
  }, [setIsHovering]);

  return (
    <>
      <div style={cursorStyle.outer} />
      <div style={cursorStyle.inner} />
    </>
  );
};

export default CustomCursor;
