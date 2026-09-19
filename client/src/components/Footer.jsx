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

  const linkStyle = {
    color: 'var(--footer-text-muted)',
    textDecoration: 'none',
    fontSize: '0.92rem',
    transition: 'color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <footer style={{
      background: 'var(--footer-bg)',
      borderTop: '1px solid var(--footer-border)',
      padding: isMobile ? '60px 5% 0 5%' : '100px 5% 0 5%',
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
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              color: '#111111',
              fontSize: '1.4rem',
              fontFamily: 'var(--font-heading)',
              flexShrink: 0
            }}>
              N
            </div>
            <span style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              color: 'var(--footer-text-heading)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.5px'
            }}>
              {t('Nissi Constructions')}
            </span>
          </div>

          {/* Tagline */}
          <h3 style={{
            fontSize: isMobile ? '1.7rem' : '2.2rem',
            fontWeight: '600',
            color: 'var(--footer-text-heading)',
            lineHeight: '1.25',
            margin: '0 0 20px 0',
            fontFamily: 'var(--font-heading)',
            maxWidth: '380px'
          }}>
            {t('Building dreams, elevating lifestyle')}
          </h3>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <a href="tel:+918790420585" style={{ ...linkStyle, color: 'var(--footer-text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
              <Phone size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              +91 87904 20585
            </a>
            <a href="mailto:nissixconstructions@gmail.com" style={{ ...linkStyle, color: 'var(--footer-text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
              <Mail size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              nissixconstructions@gmail.com
            </a>
          </div>

          {/* Sub-label */}
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--footer-text-muted)',
            marginTop: isMobile ? '0' : 'auto',
            opacity: 0.75,
            fontStyle: 'italic'
          }}>
            {t('Premium construction since 2019')}
          </p>
        </div>

        {/* Right Side: Divided Table Columns */}
        <div style={{
          border: '1px solid var(--footer-border)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          background: 'var(--footer-card-bg)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          {/* Column 1: Services */}
          <div style={{
            padding: '36px 28px',
            borderRight: isMobile ? 'none' : '1px solid var(--footer-border)',
            borderBottom: isMobile ? '1px solid var(--footer-border)' : 'none'
          }}>
            <h4 style={{
              color: 'var(--accent-gold)',
              fontSize: '0.75rem',
              fontWeight: '700',
              marginBottom: '22px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-body)'
            }}>
              {t('Services')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                t('Villa Construction'),
                t('Commercial Projects'),
                t('Home Renovations'),
                t('Architectural Planning'),
                t('Interior Finishing')
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    onClick={(e) => handleScroll(e, 'services')}
                    style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                    onMouseLeave={e => e.target.style.color = 'var(--footer-text-muted)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div style={{
            padding: '36px 28px',
            borderRight: isMobile ? 'none' : '1px solid var(--footer-border)',
            borderBottom: isMobile ? '1px solid var(--footer-border)' : 'none'
          }}>
            <h4 style={{
              color: 'var(--accent-gold)',
              fontSize: '0.75rem',
              fontWeight: '700',
              marginBottom: '22px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-body)'
            }}>
              {t('Resources')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <a href="#about" onClick={(e) => handleScroll(e, 'about')}
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--footer-text-muted)'}>
                  {t('About Us')}
                </a>
              </li>
              <li>
                <a href="#home" onClick={(e) => handleScroll(e, 'home')}
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--footer-text-muted)'}>
                  {t('Home')}
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--footer-text-muted)'}>
                  {t('Projects')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div style={{ padding: '36px 28px' }}>
            <h4 style={{
              color: 'var(--accent-gold)',
              fontSize: '0.75rem',
              fontWeight: '700',
              marginBottom: '22px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-body)'
            }}>
              {t('Support')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
                  {t('Contact')}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917601078843"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
                  WhatsApp <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/ikfTJZtvYbnmybvp7"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
                  <MapPin size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  {t('Locate on Map')}
                </a>
              </li>
              <li>
                <a href="tel:+917601078843"
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
                  <Phone size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  +91 76010 78843
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant Background Watermark Text */}
      <div style={{
        marginTop: isMobile ? '40px' : '70px',
        textAlign: 'center',
        userSelect: 'none',
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 11vw, 10rem)',
          fontWeight: '900',
          color: 'var(--watermark-color)',
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          lineHeight: '0.9',
          margin: 0,
          fontFamily: 'var(--font-heading)',
          whiteSpace: 'nowrap'
        }}>
          NISSI CONSTRUCTIONS
        </h2>
      </div>

      {/* Bottom Copyright Bar */}
      <div style={{
        borderTop: '1px solid var(--footer-border)',
        marginTop: '0',
        padding: '20px 0',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--footer-text-muted)', margin: 0 }}>
          © {new Date().getFullYear()} Nissi Constructions. All rights reserved.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--footer-text-muted)', margin: 0, opacity: 0.7 }}>
          Built with ❤️ in Hyderabad, Telangana, India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
