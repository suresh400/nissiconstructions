import React, { useState } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '350px',
      overflow: 'hidden',
      borderRadius: '12px',
      border: '1px solid var(--border-glass)',
      boxShadow: 'var(--shadow-dark)',
      userSelect: 'none'
    }}>
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After construction" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        background: 'rgba(7, 11, 25, 0.7)',
        backdropFilter: 'blur(5px)',
        border: '1px solid var(--border-glass)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        color: 'var(--accent-gold)'
      }}>
        AFTER
      </div>

      {/* Before Image (Overlay - clipped) */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
      }}>
        <img 
          src={beforeImage} 
          alt="Before construction" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '15px',
          background: 'rgba(7, 11, 25, 0.7)',
          backdropFilter: 'blur(5px)',
          border: '1px solid var(--border-glass)',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          color: 'var(--text-light)'
        }}>
          BEFORE
        </div>
      </div>

      {/* Range Input Overlay */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPosition} 
        onChange={handleSliderChange}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          appearance: 'none',
          outline: 'none',
          margin: 0,
          cursor: 'ew-resize',
          zIndex: 10
        }}
      />

      {/* Slider Line & Handle Visual */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${sliderPosition}%`,
        width: '3px',
        backgroundColor: 'var(--accent-gold)',
        pointerEvents: 'none',
        zIndex: 5,
        boxShadow: '0 0 10px var(--accent-gold)'
      }}>
        {/* Handle Grip */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-dark)',
          border: '3px solid var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-gold)',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 0 8px rgba(0,0,0,0.5)'
        }}>
          ↔
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
