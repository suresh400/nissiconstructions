import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

/* ── Responsive breakpoint hook ── */
const useBreakpoint = () => {
  const get = () => {
    const w = window.innerWidth;
    return { isPhone: w <= 480, isMobile: w <= 768, isTablet: w > 480 && w <= 768 };
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const onResize = () => setBp(get());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return bp;
};

const Footer = () => {
  const { t } = useLanguage();
  const { isPhone, isMobile } = useBreakpoint();

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
    fontSize: isPhone ? '0.88rem' : '0.92rem',
    transition: 'color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    minHeight: '34px',   /* Decent tap target on mobile */
  };

  return (
    <footer style={{
      background: 'var(--footer-bg)',
      borderTop: '1px solid var(--footer-border)',
      padding: isPhone ? '50px 4% 0 4%' : isMobile ? '60px 5% 0 5%' : '100px 5% 0 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Main grid: brand left, links right ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 2fr',
        gap: isMobile ? '36px' : '80px',
        alignItems: 'start',
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        {/* ── Brand Column ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: isPhone ? '36px' : '42px',
              height: isPhone ? '36px' : '42px',
              borderRadius: '10px',
              background: 'var(--accent-gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '800',
              color: '#111111',
              fontSize: isPhone ? '1.2rem' : '1.4rem',
              fontFamily: 'var(--font-heading)',
              flexShrink: 0,
            }}>N</div>
            <span style={{
              fontSize: isPhone ? '1.2rem' : '1.4rem',
              fontWeight: '700',
              color: 'var(--footer-text-heading)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.5px',
            }}>
              {t('Nissi Constructions')}
            </span>
          </div>

          {/* Tagline */}
          <h3 style={{
            fontSize: isPhone ? '1.5rem' : isMobile ? '1.8rem' : '2.2rem',
            fontWeight: '600',
            color: 'var(--footer-text-heading)',
            lineHeight: '1.25',
            margin: '0 0 20px 0',
            fontFamily: 'var(--font-heading)',
            maxWidth: '380px',
          }}>
            {t('Building dreams, elevating lifestyle')}
          </h3>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <a href="tel:+918790420585" style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
              <Phone size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              +91 87904 20585
            </a>
            <a href="mailto:nissixconstructions@gmail.com" style={{ ...linkStyle, wordBreak: 'break-all' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
              <Mail size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              nissixconstructions@gmail.com
            </a>
          </div>

          {/* Sub-label */}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--footer-text-muted)',
            marginTop: 'auto',
            opacity: 0.75,
            fontStyle: 'italic',
          }}>
            {t('Premium construction since 2019')}
          </p>
        </div>

        {/* ── Links Card (3 cols) ── */}
        <div style={{
          border: '1px solid var(--footer-border)',
          display: 'grid',
          /* On phone collapse to 1 col, otherwise stay 3 */
          gridTemplateColumns: isPhone ? '1fr' : isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
          background: 'var(--footer-card-bg)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>

          {/* Column 1 — Services */}
          <div style={{
            padding: isPhone ? '24px 20px' : '36px 28px',
            borderRight: isPhone ? 'none' : '1px solid var(--footer-border)',
            borderBottom: isPhone ? '1px solid var(--footer-border)' : 'none',
          }}>
            <h4 style={{
              color: 'var(--accent-gold)',
              fontSize: '0.72rem',
              fontWeight: '700',
              marginBottom: '18px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-body)',
            }}>
              {t('Services')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                t('Villa Construction'),
                t('Commercial Projects'),
                t('Home Renovations'),
                t('Architectural Planning'),
                t('Interior Finishing'),
              ].map(item => (
                <li key={item}>
                  <a href="#services" onClick={e => handleScroll(e, 'services')}
                    style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: isPhone ? '0.88rem' : '0.9rem', transition: 'color 0.2s', display: 'block', minHeight: '30px', lineHeight: '30px' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                    onMouseLeave={e => e.target.style.color = 'var(--footer-text-muted)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Resources */}
          <div style={{
            padding: isPhone ? '24px 20px' : '36px 28px',
            borderRight: isPhone ? 'none' : '1px solid var(--footer-border)',
            borderBottom: isPhone ? '1px solid var(--footer-border)' : 'none',
          }}>
            <h4 style={{
              color: 'var(--accent-gold)',
              fontSize: '0.72rem',
              fontWeight: '700',
              marginBottom: '18px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-body)',
            }}>
              {t('Resources')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: t('About Us'), id: 'about' },
                { label: t('Home'), id: 'home' },
                { label: t('Services'), id: 'services' },
              ].map(item => (
                <li key={item.label}>
                  <a href={`#${item.id}`} onClick={e => handleScroll(e, item.id)}
                    style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: isPhone ? '0.88rem' : '0.9rem', transition: 'color 0.2s', display: 'block', minHeight: '30px', lineHeight: '30px' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                    onMouseLeave={e => e.target.style.color = 'var(--footer-text-muted)'}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Support */}
          <div style={{ padding: isPhone ? '24px 20px' : '36px 28px' }}>
            <h4 style={{
              color: 'var(--accent-gold)',
              fontSize: '0.72rem',
              fontWeight: '700',
              marginBottom: '18px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-body)',
            }}>
              {t('Support')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#contact" onClick={e => handleScroll(e, 'contact')}
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: isPhone ? '0.88rem' : '0.9rem', transition: 'color 0.2s', display: 'block', minHeight: '30px', lineHeight: '30px' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
                  {t('Contact')}
                </a>
              </li>
              <li>
                <a href="https://wa.me/917601078843" target="_blank" rel="noreferrer"
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: isPhone ? '0.88rem' : '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '5px', minHeight: '30px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
                  WhatsApp <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/ikfTJZtvYbnmybvp7" target="_blank" rel="noreferrer"
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: isPhone ? '0.88rem' : '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '5px', minHeight: '30px' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text-muted)'}>
                  <MapPin size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  {t('Locate on Map')}
                </a>
              </li>
              <li>
                <a href="tel:+917601078843"
                  style={{ color: 'var(--footer-text-muted)', textDecoration: 'none', fontSize: isPhone ? '0.88rem' : '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '5px', minHeight: '30px' }}
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

      {/* ── Giant Watermark ── */}
      <div style={{
        marginTop: isPhone ? '32px' : isMobile ? '50px' : '70px',
        textAlign: 'center',
        userSelect: 'none',
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 11vw, 10rem)',
          fontWeight: '900',
          color: 'var(--watermark-color)',
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          lineHeight: '0.9',
          margin: 0,
          fontFamily: 'var(--font-heading)',
          whiteSpace: 'nowrap',
        }}>
          NISSI CONSTRUCTIONS
        </h2>
      </div>

      {/* ── Copyright Bar ── */}
      <div style={{
        borderTop: '1px solid var(--footer-border)',
        padding: isPhone ? '16px 0' : '20px 0',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        <p style={{ fontSize: isPhone ? '0.78rem' : '0.82rem', color: 'var(--footer-text-muted)', margin: 0 }}>
          © {new Date().getFullYear()} Nissi Constructions. All rights reserved.
        </p>
        <p style={{ fontSize: isPhone ? '0.78rem' : '0.82rem', color: 'var(--footer-text-muted)', margin: 0, opacity: 0.7 }}>
          Built with ❤️ in Hyderabad, Telangana, India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
