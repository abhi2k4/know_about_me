import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

interface ProjectCarouselProps {
  images: string[];
  className?: string;
}

const ProjectCarousel = ({ images, className }: ProjectCarouselProps) => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  }, [
    AutoPlay({ delay: 5000, stopOnInteraction: false })
  ]);

  return (
    <div className={cn("overflow-hidden relative aspect-video rounded-lg", className)} ref={emblaRef}>
      <div className="flex h-full">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="flex-[0_0_100%] min-w-0 relative h-full"
          >
            <img
              src={getOptimizedImageUrl(image, 1000)}
              alt={`Project slide ${index + 1}`}
              className="w-full h-full object-contain bg-secondary/10"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;