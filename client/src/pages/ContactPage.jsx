import React, { useState } from 'react';
import { api } from '../utils/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { sendEmailNotification } from '../utils/emailService';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Save to local database via API
      await api.post('/consultations', {
        name,
        email,
        phone,
        serviceType,
        message,
        type: 'callback'
      });

      // 2. Trigger EmailJS notification
      await sendEmailNotification({
        name,
        email,
        phone,
        serviceType,
        message,
        type: 'callback'
      });

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      alert('Failed to send message. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
        textAlign: 'center',
        padding: '80px 5%'
      }}>
        <div className="container">
          <span className="section-tag">Get In Touch</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Contact Nissi Constructions desk</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Book a site assessment visit, request a blueprint estimate, or ask questions about land purchases.
          </p>
        </div>
      </section>

      {/* Main Info & Form */}
      <section className="section">
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '50px',
          alignItems: 'start'
        }}>
          {/* Info Side */}
          <div className="glass-card" style={{ padding: '35px' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '25px', color: 'var(--white)' }}>Head Office Information</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Our design and estimation desk is headquartered in Hyderabad, Telangana. We welcome visits by prospective plot owners and commercial buyers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-gold)' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--white)', marginBottom: '5px' }}>Office Address</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Jagathgirigutta, Hyderabad, Telangana - 500037
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-gold)' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--white)', marginBottom: '5px' }}>Direct Hotlines</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    +91 87904 20585 (Call Desk)<br />
                    +91 76010 78843 (WhatsApp Desk)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-gold)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--white)', marginBottom: '5px' }}>Email Desk</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    nissixconstructions@gmail.com
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-gold)' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--white)', marginBottom: '5px' }}>Working Desk Hours</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Monday - Saturday: 09:00 AM - 07:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-card" style={{ padding: '35px' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '25px', color: 'var(--white)' }}>Send Message</h3>

            {success ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#10B981',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <CheckCircle2 size={40} style={{ color: '#10B981', margin: '0 auto 10px auto' }} />
                <h4 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Message Submitted!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  We will reach out as soon as possible.
                </p>
              </div>
            ) : null}

            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Area</label>
                <select
                  className="form-control"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="General Inquiry">General Inquiry / Greeting</option>
                  <option value="Residential Construction">Residential Construction</option>
                  <option value="Villa Cost Estimate">Villa Cost Estimate</option>
                  <option value="Commercial Complex">Commercial Complex</option>
                  <option value="Career/Job application">Career / Job vacancy</option>
                  <option value="Property Selling / Ownership">Listing my property</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea
                  className="form-control"
                  rows="4"
                  required
                  placeholder="Tell us about your plot dimension, area specs, budget, or general questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={loading}>
                <Send size={16} /> {loading ? 'Sending Message...' : 'Submit Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '0 5% 80px 5%' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '100%',
            height: '450px',
            border: '1px solid var(--border-glass)',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'var(--shadow-dark)',
            background: 'var(--primary-dark)'
          }}>
            <iframe
              src="https://maps.google.com/maps?q=Nissi%20Constructions,%20Jagathgiri%20Gutta,%20Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                filter: 'grayscale(1) invert(0.9) contrast(1.2) opacity(0.85)',
                mixBlendMode: 'luminosity'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nissi Constructions Office Location"
            ></iframe>
          </div>
          <a
            href="https://share.google/fAxUOnrcoij8sr2aW"
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold-outline"
            style={{ 
              padding: '12px 25px', 
              fontSize: '0.9rem', 
              fontWeight: '600',
              borderColor: 'var(--accent-gold)',
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
