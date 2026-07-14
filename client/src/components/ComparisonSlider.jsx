import React, { useState, useRef, useEffect } from 'react';
import './ComparisonSlider.css';

export const ComparisonSlider = ({
  itemOne = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80', // Day Image
  itemTwo = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', // Night Image
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1000);
  const containerRef = useRef(null);

  // Sync website theme based on slider position
  useEffect(() => {
    if (sliderPosition > 50) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [sliderPosition]);

  // Monitor resize to maintain correct image matching width
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Bind window listeners when dragging is active
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    // Prevent default selection / native browser dragging
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`comparison-slider-container ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Light (Day) Image - Base */}
      <img 
        src={itemOne} 
        alt="Day Render" 
        className="slider-image base-image"
        draggable="false"
      />

      {/* Dark (Night) Image - Overlay */}
      <div 
        className="image-overlay"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={itemTwo} 
          alt="Night Render" 
          className="slider-image overlay-image"
          style={{ width: `${containerWidth}px` }}
          draggable="false"
        />
      </div>

      {/* Labels */}
      <div className="slider-label label-left" style={{ opacity: sliderPosition < 10 ? 0 : 1 }}>
        NIGHT
      </div>
      <div className="slider-label label-right" style={{ opacity: sliderPosition > 90 ? 0 : 1 }}>
        DAY
      </div>

      {/* Slider Bar & Handle */}
      <div 
        className="slider-divider"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="8 17 3 12 8 7"></polyline>
            <polyline points="16 17 21 12 16 7"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
