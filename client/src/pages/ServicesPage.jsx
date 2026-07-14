import React, { useState, useEffect } from 'react';
import { 
  HardHat, Home, Bath, Grid, Wrench, Paintbrush, Layers, Square, Hammer, 
  Database, Building2, PlusCircle, Castle, RefreshCw, Palette, Shield, 
  ChefHat, Droplets, Layout, Triangle, CloudRain, Activity, ShieldAlert,
  CheckCircle2, ChevronRight, ChevronDown, Phone, PhoneCall, HelpCircle, FileCheck2, ArrowUpRight, X
} from 'lucide-react';
import { api } from '../utils/api';
import { sendEmailNotification } from '../utils/emailService';

const ServiceIcon = ({ iconName, size = 28, className, style }) => {
  const IconComponent = {
    HardHat, Home, Bath, Grid, Wrench, Paintbrush, Layers, Square, Hammer, 
    Database, Building2, PlusCircle, Castle, RefreshCw, Palette, Shield, 
    ChefHat, Droplets, Layout, Triangle, CloudRain, Activity, ShieldAlert
  }[iconName] || HardHat;
  
  return <IconComponent size={size} className={className} style={style} />;
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // for mobile drawer overlay
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Lead Booking Form State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        const sorted = (res.data || []).sort((a, b) => a.title.localeCompare(b.title));
        setServices(sorted);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const serviceToBook = selectedService || services.find(s => s._id === hoveredService);
    if (!serviceToBook) return;

    try {
      // 1. Submit lead details to DB
      console.log('[Lead Submit] Sending to database...');
      await api.post('/consultations', {
        name,
        email,
        phone,
        serviceType: serviceToBook.title,
        message: message || `Client requested consultation for service: ${serviceToBook.title}`,
        type: 'booking',
      });
      console.log('[Lead Submit] Saved in DB successfully!');

      // 2. Trigger EmailJS notification (optional, will not block if fails)
      try {
        await sendEmailNotification({
          name,
          email,
          phone,
          serviceType: serviceToBook.title,
          message: message || `Client requested consultation for service: ${serviceToBook.title}`,
          type: 'booking'
        });
      } catch (emailErr) {
        console.error('[Lead Submit] EmailJS error (non-blocking):', emailErr);
      }

      setFormSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('[Lead Submit] Connection/Server error:', err);
      alert(`Lead submission failed: ${err.message || 'Please try again.'}`);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--primary-dark)', color: 'var(--text-light)' }}>
      {/* Header banner */}
      <section className="section" style={{
        background: 'linear-gradient(to bottom, var(--secondary-dark) 0%, var(--primary-dark) 100%)',
        textAlign: 'center',
        padding: '60px 5% 40px 5%',
        borderBottom: '1px solid var(--border-glass)'
      }}>
        <div className="container">
          <span className="section-tag" style={{ letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Expertise Directory</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: '800', color: 'var(--white)' }}>Our Construction Services</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
            {isMobile 
              ? 'Tap any service name below to view workflow details and book consultations.' 
              : 'Hover over any service name below to view builder expertise, benefits, and details.'}
          </p>
        </div>
      </section>

      {/* Services Main Panel */}
      <section className="section" style={{ padding: '60px 0', background: 'var(--primary-dark)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px',
            alignItems: 'start'
          }}>
            {services.map(service => {
              const isHovered = hoveredService === service._id;
              return (
                <div 
                  key={service._id} 
                  style={{
                    position: 'relative',
                    height: '62px',
                  }}
                  onMouseEnter={() => {
                    if (!isMobile) setHoveredService(service._id);
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) setHoveredService(null);
                  }}
                >
                  {/* Collapsible / Expandable Service Card */}
                  <div
                    onClick={() => {
                      if (isMobile) {
                        setSelectedService(service);
                        setFormSuccess(false);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      padding: '18px 24px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass)',
                      background: isHovered ? 'var(--secondary-dark)' : 'var(--primary-dark)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      borderColor: isHovered ? 'var(--accent-gold)' : 'var(--border-glass)',
                      boxShadow: isHovered ? '0 15px 35px rgba(0,0,0,0.3), 0 0 20px rgba(212, 175, 55, 0.1)' : 'none',
                      zIndex: isHovered ? 100 : 1,
                      overflow: 'hidden',
                      maxHeight: isHovered ? '600px' : '62px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Header / Collapsed State */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      minHeight: '24px'
                    }}>
                      <span style={{ 
                        fontWeight: isHovered ? '600' : '400',
                        color: isHovered ? 'var(--accent-gold)' : 'var(--text-light)',
                        fontSize: '0.98rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {service.title}
                      </span>
                      <ChevronDown size={16} style={{ 
                        color: isHovered ? 'var(--accent-gold)' : 'var(--text-muted)',
                        transform: isHovered ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease'
                      }} />
                    </div>

                    {/* Expanded Content */}
                    {isHovered && (
                      <div style={{
                        marginTop: '15px',
                        animation: 'fadeIn 0.2s ease-out',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        {/* About Service Description */}
                        <p style={{ 
                          color: 'var(--text-light)', 
                          fontSize: '0.85rem', 
                          lineHeight: '1.4', 
                          margin: 0,
                          opacity: 0.9 
                        }}>
                          {service.description}
                        </p>

                        {/* Contact Helpline */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          borderTop: '1px solid var(--border-glass)',
                          paddingTop: '10px'
                        }}>
                          <Phone size={12} style={{ color: 'var(--accent-gold)' }} />
                          <span>Direct Support: <strong style={{ color: 'var(--white)' }}>+91 87904 20585</strong></span>
                        </div>

                        {/* Actions Button Bar */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation();
                              setSelectedService(service);
                              setShowBookingModal(true); 
                              setFormSuccess(false); 
                            }} 
                            className="btn btn-primary"
                            style={{ 
                              padding: '8px 12px', 
                              fontSize: '0.75rem', 
                              flex: 1, 
                              fontWeight: '600'
                            }}
                          >
                            Book Call
                          </button>
                          <a 
                            href={`https://wa.me/917601078843?text=Hello%20Nissi%20Constructions,%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20services.`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-secondary"
                            style={{ 
                              padding: '8px 12px', 
                              fontSize: '0.75rem', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              gap: '4px', 
                              textDecoration: 'none',
                              fontWeight: '600' 
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            WhatsApp <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Detailed Drawer Modal (Mobile Only) */}
      {isMobile && selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ flexGrow: 1 }} onClick={() => setSelectedService(null)} />
          
          <div style={{
            width: '100%',
            maxWidth: '680px',
            background: 'var(--card-glass)',
            borderLeft: '1px solid var(--border-glass)',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {/* Image Header with Close Button */}
            <div style={{ position: 'relative', height: '240px' }}>
              <img 
                src={selectedService.image} 
                alt={selectedService.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)'
              }} />
              
              <button 
                onClick={() => setSelectedService(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  border: '1px solid var(--border-glass)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <X size={20} />
              </button>

              <div style={{ position: 'absolute', bottom: '20px', left: '30px', right: '30px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {selectedService.category}
                </span>
                <h2 style={{ fontSize: '1.8rem', color: '#fff', fontWeight: '800', marginTop: '5px' }}>
                  {selectedService.title}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '30px 30px 40px 30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Description */}
              <div>
                <p style={{ color: 'var(--text-light)', fontSize: '1.02rem', lineHeight: '1.7', margin: 0 }}>
                  {selectedService.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  <button 
                    onClick={() => { setShowBookingModal(true); setFormSuccess(false); }} 
                    className="btn btn-primary"
                    style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    Request Consultation <PhoneCall size={16} />
                  </button>
                  <a 
                    href={`https://wa.me/917601078843?text=Hello,%20I%20am%20interested%20in%20your%20${encodeURIComponent(selectedService.title)}%20services.`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-secondary"
                    style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    Chat via WhatsApp <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Key Benefits */}
              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                    <FileCheck2 size={18} /> Key Benefits & Standards
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    {selectedService.benefits.map((benefit, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Execution Process Steps */}
              {selectedService.process && selectedService.process.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                    <HelpCircle size={18} /> Execution Workflow
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {selectedService.process.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                        <div style={{
                          background: 'rgba(212, 175, 55, 0.1)',
                          color: 'var(--accent-gold)',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          flexShrink: 0
                        }}>
                          {step.stepNumber || idx + 1}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: '600', marginBottom: '2px' }}>{step.title}</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal Overlay */}
      {showBookingModal && (selectedService || activeService) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="modal-content glass-card" style={{ padding: '40px', maxWidth: '500px', width: '100%', position: 'relative', background: 'var(--card-glass)' }}>
            <button 
              className="modal-close" 
              onClick={() => setShowBookingModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '10px', textAlign: 'center', color: 'var(--white)', fontWeight: '700' }}>Inquire for Service</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px', textAlign: 'center' }}>
              Confirming a callback session for: <strong style={{ color: 'var(--accent-gold)' }}>{(selectedService || activeService).title}</strong>.
            </p>

            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={50} style={{ color: '#10B981', margin: '0 auto 15px auto' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--white)' }}>Consultation Request Placed</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Our project desk supervisor will reach out to you shortly.
                </p>
                <button 
                  onClick={() => setShowBookingModal(false)} 
                  className="btn btn-primary" 
                  style={{ marginTop: '20px', width: '100%' }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="e.g. Suresh Kumar"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    required 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="e.g. +91 87904 20585"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="e.g. suresh@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Inquiry Message</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Describe your project, timeline, location specifications..."
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={formLoading}>
                  {formLoading ? 'Submitting Details...' : 'Request Callback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Inline Keyframes style injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}} />
    </div>
  );
};

export default ServicesPage;
