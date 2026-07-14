import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer style={{
      background: 'var(--footer-bg)',
      borderTop: '1px solid var(--border-glass)',
      padding: isMobile ? '60px 5% 40px 5%' : '100px 5% 40px 5%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Footer Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 2fr',
        gap: isMobile ? '40px' : '80px',
        alignItems: 'start',
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Left Side: Brand, Tagline & Sub-Label */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Logo Container */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              color: 'var(--primary-dark)',
              fontSize: '1.4rem',
              fontFamily: 'var(--font-heading)'
            }}>
              N
            </div>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'var(--white)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.5px'
            }}>
              {t('Nissi Constructions')}
            </span>
          </div>

          {/* Tagline */}
          <h3 style={{
            fontSize: isMobile ? '1.8rem' : '2.4rem',
            fontWeight: '600',
            color: 'var(--white)',
            lineHeight: '1.25',
            margin: '0 0 20px 0',
            fontFamily: 'var(--font-heading)',
            maxWidth: '450px'
          }}>
            {t('Building dreams, elevating lifestyle')}
          </h3>

          {/* Sub-label */}
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginTop: isMobile ? '20px' : 'auto',
            opacity: 0.8
          }}>
            {t('Premium construction since 2019')}
          </p>
        </div>

        {/* Right Side: Divided Table Columns */}
        <div style={{
          border: '1px solid var(--border-glass)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          background: 'var(--card-glass)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Column 1: Services */}
          <div style={{
            padding: '40px 30px',
            borderRight: isMobile ? 'none' : '1px solid var(--border-glass)',
            borderBottom: isMobile ? '1px solid var(--border-glass)' : 'none'
          }}>
            <h4 style={{
              color: 'var(--white)',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {t('Services')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li>
                <a href="#services" onClick={(e) => handleScroll(e, 'services')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  {t('Villa Construction')}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScroll(e, 'services')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  {t('Commercial Projects')}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScroll(e, 'services')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  {t('Home Renovations')}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScroll(e, 'services')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  {t('Architectural Planning')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div style={{
            padding: '40px 30px',
            borderRight: isMobile ? 'none' : '1px solid var(--border-glass)',
            borderBottom: isMobile ? '1px solid var(--border-glass)' : 'none'
          }}>
            <h4 style={{
              color: 'var(--white)',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {t('Resources')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li>
                <a href="#about" onClick={(e) => handleScroll(e, 'about')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  {t('About Us')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div style={{
            padding: '40px 30px'
          }}>
            <h4 style={{
              color: 'var(--white)',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {t('Support')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  {t('Contact')}
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.app.goo.gl/ikfTJZtvYbnmybvp7" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    color: 'var(--text-muted)', 
                    textDecoration: 'none', 
                    fontSize: '0.92rem', 
                    transition: 'color 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                  {t('Locate on Map')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant Background Watermark Text */}
      <div style={{
        marginTop: isMobile ? '40px' : '80px',
        textAlign: 'center',
        userSelect: 'none',
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <h2 style={{
          fontSize: '11vw',
          fontWeight: '900',
          color: 'var(--watermark-color)',
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          lineHeight: '0.9',
          margin: 0,
          fontFamily: 'var(--font-heading)'
        }}>
          NISSI CONSTRUCTIONS
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
