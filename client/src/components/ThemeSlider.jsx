import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSlider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return document.body.classList.contains('dark-mode') || localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Single clean render of application content — no DOM duplication, no viewport stretching */}
      {children}

      {/* Luxury Theme Switcher Widget */}
      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to luxury light theme' : 'Switch to obsidian dark theme'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        style={{
          position: 'fixed',
          top: '50%',
          right: '0',
          transform: 'translateY(-50%)',
          zIndex: 99990,
          background: 'var(--card-glass)',
          border: '1.5px solid var(--accent-gold)',
          borderRight: 'none',
          borderTopLeftRadius: '24px',
          borderBottomLeftRadius: '24px',
          padding: '12px 10px 12px 12px',
          boxShadow: '0 8px 25px rgba(212, 175, 55, 0.25), -4px 0 15px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          userSelect: 'none',
          touchAction: 'manipulation',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.paddingLeft = '16px';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.4), -6px 0 20px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.paddingLeft = '12px';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.25), -4px 0 15px rgba(0,0,0,0.1)';
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isDark ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-gold)',
          transition: 'transform 0.4s ease'
        }}>
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </div>
        <span style={{
          fontSize: '0.62rem',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          paddingTop: '4px'
        }}>
          {isDark ? 'LIGHT' : 'DARK'}
        </span>
      </button>
    </div>
  );
};

export default ThemeSlider;
