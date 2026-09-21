import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sun, Moon, ChevronRight, ChevronLeft } from 'lucide-react';

const ThemeSlider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  const getInitialDragX = () => {
    const isDark = document.body.classList.contains('dark-mode') || localStorage.getItem('theme') === 'dark';
    return isDark ? window.innerWidth : 0;
  };

  const [dragX, setDragX] = useState(getInitialDragX);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const initialDragXVal = useRef(0);
  const rafRef = useRef(null);

  /* Sync window size on resize — snap to correct edge */
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setDragX(prev => (prev > w / 2 ? w : 0));
    };
    window.addEventListener('resize', handleResize, { passive: true });

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSnapComplete = useCallback((finalX) => {
    if (finalX > windowWidth / 2) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [windowWidth]);

  const handleStart = useCallback((clientX) => {
    setIsDragging(true);
    startX.current = clientX;
    initialDragXVal.current = dragX;
    document.body.classList.add('is-theme-dragging');
  }, [dragX]);

  const handleMove = useCallback((clientX) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const delta = clientX - startX.current;
      const nextX = Math.max(0, Math.min(windowWidth, initialDragXVal.current + delta));
      setDragX(nextX);
    });
  }, [windowWidth]);

  const handleEnd = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsDragging(false);
    document.body.classList.remove('is-theme-dragging');
    const snapTarget = dragX > windowWidth / 2 ? windowWidth : 0;
    setDragX(snapTarget);
    handleSnapComplete(snapTarget);
  }, [dragX, windowWidth, handleSnapComplete]);

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = e => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = e => {
      if (e.touches?.[0]) handleMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const transition = isDragging
    ? 'none'
    : 'left 0.6s cubic-bezier(0.16,1,0.3,1), clip-path 0.6s cubic-bezier(0.16,1,0.3,1)';

  const isSnappedLeft  = dragX === 0;
  const isSnappedRight = dragX === windowWidth;

  /* ── Handle sizing & position — safe across all screen widths ── */
  const handleSize   = 36;  /* px, the narrow/tall handle */
  const handleWidth  = isSnappedLeft || isSnappedRight ? handleSize : 46;
  const handleHeight = isSnappedLeft || isSnappedRight ? 76 : 46;

  /* Clamp so handle never goes off-screen */
  const handleLeft = Math.min(Math.max(0, dragX), windowWidth);

  const handleStyle = {
    position: 'fixed',
    top: '50%',
    left: `${handleLeft}px`,
    zIndex: 100000,
    cursor: isDragging ? 'grabbing' : 'grab',
    transition,
    background: 'var(--accent-gold)',
    color: '#111111',
    boxShadow: '0 4px 20px rgba(212,175,55,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    touchAction: 'none',
    /* Shape transitions */
    ...(isSnappedLeft ? {
      width: `${handleWidth}px`,
      height: `${handleHeight}px`,
      borderTopRightRadius: '16px',
      borderBottomRightRadius: '16px',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      transform: 'translateY(-50%)',
      paddingLeft: '4px',
    } : isSnappedRight ? {
      width: `${handleWidth}px`,
      height: `${handleHeight}px`,
      borderTopLeftRadius: '16px',
      borderBottomLeftRadius: '16px',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      /* Pull exactly into right edge regardless of screen width */
      transform: 'translate(-100%, -50%)',
      paddingRight: '4px',
    } : {
      width: `${handleWidth}px`,
      height: `${handleHeight}px`,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
    }),
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Light Theme Layer (Base) */}
      <div className="theme-light-wrapper" style={{ width: '100%' }}>
        {children}
      </div>

      {/* Dark Theme Layer (Clip-path overlay) */}
      <div
        className="theme-dark-wrapper"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          clipPath: `polygon(0 0, ${dragX}px 0, ${dragX}px 100%, 0 100%)`,
          pointerEvents: isDragging ? 'none' : 'auto',
          transition,
          zIndex: 999,
        }}
      >
        {children}
      </div>

      {/* Splitter Line */}
      <div
        style={{
          position: 'fixed',
          top: 0, bottom: 0,
          left: `${dragX}px`,
          width: '2px',
          background: 'var(--accent-gold)',
          zIndex: 99999,
          pointerEvents: 'none',
          transition,
          boxShadow: '0 0 10px var(--accent-gold)',
          opacity: isSnappedLeft || isSnappedRight ? 0 : 1,
        }}
      />

      {/* Drag Handle */}
      <div
        onMouseDown={e => { e.preventDefault(); handleStart(e.clientX); }}
        onTouchStart={e => { if (e.touches?.[0]) handleStart(e.touches[0].clientX); }}
        style={handleStyle}
        aria-label={isSnappedLeft ? 'Switch to dark mode' : isSnappedRight ? 'Switch to light mode' : 'Drag to adjust theme'}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            const snap = isSnappedLeft ? windowWidth : 0;
            setDragX(snap);
            handleSnapComplete(snap);
          }
        }}
      >
        {isSnappedLeft ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Moon size={13} style={{ color: '#111111' }} />
            <ChevronRight size={11} style={{ color: '#111111' }} />
          </div>
        ) : isSnappedRight ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Sun size={13} style={{ color: '#111111' }} />
            <ChevronLeft size={11} style={{ color: '#111111' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <ChevronLeft size={11} style={{ color: '#111111' }} />
            {dragX > windowWidth / 2
              ? <Moon size={13} style={{ color: '#111111' }} />
              : <Sun size={13} style={{ color: '#111111' }} />}
            <ChevronRight size={11} style={{ color: '#111111' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSlider;
