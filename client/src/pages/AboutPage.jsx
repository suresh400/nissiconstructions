import React from 'react';
import { Target, Compass, Sparkles, Award, Shield, Hourglass, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const coreValues = [
    { icon: <Award size={36} />, title: 'Uncompromising Quality', desc: 'From concrete grades to premium teak woods, we select only RERA-approved grade materials.' },
    { icon: <Shield size={36} />, title: 'Absolue Transparency', desc: 'No hidden bills. We share live digital spreadsheets detailing procurement and contractor payouts.' },
    { icon: <Compass size={36} />, title: 'Vastu Excellence', desc: 'Our architectural design templates are 100% compliant with ancient Vastu science standards.' },
    { icon: <Sparkles size={36} />, title: 'Luxury Innovation', desc: 'Specialists in modern architectural profiles, glass facades, and automated home smart rigs.' },
  ];

  const timelineSteps = [
    { year: 'Phase 1', title: 'Consultation & Soil Test', desc: 'Soil load assessment checks, architectural draft approvals, and structural steel designs.' },
    { year: 'Phase 2', title: 'Foundation & Framing', desc: 'Excavation, anti-termite treatment, plinth beam casting, and concrete columns erection.' },
    { year: 'Phase 3', title: 'Masonry & Conduits', desc: 'Brickwork layering, window framing, slab wiring conduits placement, and internal plumbing loops.' },
    { year: 'Phase 4', title: 'Finishes & Handover', desc: 'Italian marble diamond polishing, wood paneling, modular fittings, dynamic lighting, and punchlist handoff.' },
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Page Header banner */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
        textAlign: 'center',
        padding: '80px 5%'
      }}>
        <div className="container">
          <span className="section-tag">Corporate Profile</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>About Nissi Constructions</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            A forward-thinking construction and property marketplace firm redefining luxury building standards in India.
          </p>
        </div>
      </section>

      {/* Corporate Story */}
      <section className="section">
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>Building Landmarks with Structural Integrity</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.7' }}>
              Nissi Constructions was established with a singular focus: to close the trust gap in the private residential sector. Over the years, we have scaled our operations from private custom homes to multi-story commercial properties and gated villa societies.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.7' }}>
              We employ dedicated skilled construction workers, modular carpenters, and plumbing supervisors to execute tasks without outsourcing to sub-standard contractors.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" 
              alt="Engineering inspection on construction site" 
              style={{
                width: '100%',
                borderRadius: '16px',
                border: '1px solid var(--border-glass)',
                boxShadow: 'var(--shadow-dark)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ background: '#fafafa' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px'
        }}>
          <div className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(212,175,55,0.1)', padding: '15px', borderRadius: '12px', color: 'var(--accent-gold)' }}>
              <Target size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                To design and build structures of superior quality and safety, ensuring absolute pricing transparency and delivering luxury spaces that elevate our clients' lifestyle.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(212,175,55,0.1)', padding: '15px', borderRadius: '12px', color: 'var(--accent-gold)' }}>
              <Hourglass size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                To become India's most trusted luxury builder brand, recognized for sustainable building, Vastu design, and zero-defect handover completions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Foundations</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that dictate every foundation block we excavate and every brick we lay.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '25px'
          }}>
            {coreValues.map((value, index) => (
              <div key={index} className="glass-card">
                <div style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>
                  {value.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{value.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Timeline / Process */}
      <section className="section" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Workflows</span>
            <h2 className="section-title">Our Construction Process</h2>
            <p className="section-subtitle">How we guide your dream project from initial plot sketches to ready key handovers.</p>
          </div>

          <div style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '20px 0'
          }}>
            {/* Timeline center line */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '2px',
              background: 'var(--border-glass)',
              transform: 'translateX(-50%)',
            }} className="desktop-only"></div>

            {timelineSteps.map((step, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '40px',
                position: 'relative',
                width: '100%'
              }} className="timeline-row">
                
                {/* Center dot */}
                <div style={{
                  position: 'absolute',
                  top: '25px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold)',
                  border: '4px solid var(--primary-dark)',
                  zIndex: 2,
                  boxShadow: '0 0 10px var(--accent-gold)'
                }} className="desktop-only"></div>

                <div className="glass-card timeline-card" style={{
                  width: '45%',
                  padding: '25px',
                  borderLeft: '4px solid var(--accent-gold)',
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>{step.year}</span>
                  <h3 style={{ fontSize: '1.25rem', margin: '5px 0 10px 0' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Executives</span>
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">Dedicated skilled builders and design supervisors commanding Nissi Constructions projects.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            justifyContent: 'center'
          }}>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" 
                alt="Managing Director" 
                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
              />
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '5px' }}>K. Suresh Kumar</h3>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '10px' }}>Managing Director & Construction Lead</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Over 15 years directing residential duplex and steel high-rise constructions.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                alt="Chief Architect" 
                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
              />
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '5px' }}>Priya Venkat</h3>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '10px' }}>Interior Specialist & Design Lead</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Specialist in glassmorphic layouts, sustainable lighting design, and Vastu rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
