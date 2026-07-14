import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, ChevronRight, ChevronLeft } from 'lucide-react';

const ThemeSlider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Helper to determine initial position from localStorage
  const getInitialDragX = () => {
    const isDark = document.body.classList.contains('dark-mode') || localStorage.getItem('theme') === 'dark';
    return isDark ? window.innerWidth : 0;
  };

  const [dragX, setDragX] = useState(getInitialDragX);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const initialDragXVal = useRef(0);

  // Sync window size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setDragX((prev) => {
        // Keep it snapped to the new bounds
        return prev > window.innerWidth / 2 ? window.innerWidth : 0;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update theme classes on snap completion
  const handleSnapComplete = (finalX) => {
    if (finalX > windowWidth / 2) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleStart = (clientX) => {
    setIsDragging(true);
    startX.current = clientX;
    initialDragXVal.current = dragX;
    document.body.classList.add('is-theme-dragging');
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX.current;
    const nextX = Math.max(0, Math.min(windowWidth, initialDragXVal.current + deltaX));
    setDragX(nextX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    document.body.classList.remove('is-theme-dragging');

    // Snap to left or right depending on midpoint
    const snapTarget = dragX > windowWidth / 2 ? windowWidth : 0;
    setDragX(snapTarget);
    handleSnapComplete(snapTarget);
  };

  useEffect(() => {
    const onMouseMove = (e) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, dragX, windowWidth]);

  // Transition style for smooth snapping
  const transitionStyle = isDragging 
    ? 'none' 
    : 'left 0.6s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

  // Determine handle representation
  const isSnappedLeft = dragX === 0;
  const isSnappedRight = dragX === windowWidth;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Light Theme Layer (Base) */}
      <div className="theme-light-wrapper" style={{ width: '100%' }}>
        {children}
      </div>

      {/* Dark Theme Layer (Overlay) */}
      <div 
        className="theme-dark-wrapper" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          clipPath: `polygon(0 0, ${dragX}px 0, ${dragX}px 100%, 0 100%)`,
          pointerEvents: isDragging ? 'none' : 'auto',
          transition: transitionStyle,
          zIndex: 999
        }}
      >
        {children}
      </div>

      {/* Vertical Splitter Line */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: `${dragX}px`,
          width: '2px',
          background: 'var(--accent-gold)',
          zIndex: 99999,
          pointerEvents: 'none',
          transition: transitionStyle,
          boxShadow: '0 0 10px var(--accent-gold)',
          opacity: isSnappedLeft || isSnappedRight ? 0 : 1
        }}
      />

      {/* Grab Handle/Tab */}
      <div
        onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
        onTouchStart={(e) => {
          if (e.touches && e.touches[0]) {
            handleStart(e.touches[0].clientX);
          }
        }}
        style={{
          position: 'fixed',
          top: '50%',
          left: `${dragX}px`,
          transform: isSnappedRight ? 'translate(-100%, -50%)' : 'translate(-50%, -50%)',
          zIndex: 100000,
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: transitionStyle,
          
          // Theme slider branding
          background: 'var(--accent-gold)',
          color: '#111111',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',

          ...(isSnappedLeft ? {
            width: '36px',
            height: '80px',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
            left: '0px',
            transform: 'translateY(-50%)',
            paddingLeft: '4px'
          } : isSnappedRight ? {
            width: '36px',
            height: '80px',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            left: `${windowWidth}px`,
            paddingRight: '4px'
          } : {
            width: '46px',
            height: '46px',
            borderRadius: '50%'
          })
        }}
      >
        {isSnappedLeft ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Moon size={14} style={{ color: '#111111' }} />
            <ChevronRight size={12} style={{ color: '#111111' }} />
          </div>
        ) : isSnappedRight ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Sun size={14} style={{ color: '#111111' }} />
            <ChevronLeft size={12} style={{ color: '#111111' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <ChevronLeft size={12} style={{ color: '#111111' }} />
            {dragX > windowWidth / 2 ? <Moon size={14} style={{ color: '#111111' }} /> : <Sun size={14} style={{ color: '#111111' }} />}
            <ChevronRight size={12} style={{ color: '#111111' }} />
          </div>
        )}
      </div>

    </div>
  );
};

export default ThemeSlider;
