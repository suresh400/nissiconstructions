import React, { useState, useEffect } from 'react';
import { 
  HardHat, Home, Bath, Grid, Wrench, Paintbrush, Layers, Square, Hammer, 
  Database, Building2, PlusCircle, Castle, RefreshCw, Palette, Shield, 
  ChefHat, Droplets, Layout, Triangle, CloudRain, Activity, ShieldAlert,
  Zap, Sofa, DoorClosed, Trees,
  CheckCircle2, ChevronRight, ChevronDown, Phone, PhoneCall, HelpCircle, FileCheck2, ArrowUpRight, X
} from 'lucide-react';
import { api } from '../utils/api';
import { sendEmailNotification } from '../utils/emailService';

const ServiceIcon = ({ iconName, size = 28, className, style }) => {
  const IconComponent = {
    HardHat, Home, Bath, Grid, Wrench, Paintbrush, Layers, Square, Hammer, 
    Database, Building2, PlusCircle, Castle, RefreshCw, Palette, Shield, 
    ChefHat, Droplets, Layout, Triangle, CloudRain, Activity, ShieldAlert,
    Zap, Sofa, DoorClosed, Trees
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

  // 10 Core Services requested by client
  const fallbackServices = [
    {
      _id: 's1',
      title: 'Construction & Civil Work',
      icon: 'Building2',
      category: 'Civil & Structural',
      description: 'House construction, extensions, masonry, concrete, plastering, roofing, compound walls, structural work.',
      benefits: [
        'Turnkey house construction & extensions',
        'Reinforced concrete & masonry precision',
        'Roofing, compound walls & structural work',
        'Strict building code compliance & structural warranty'
      ],
      process: [
        { stepNumber: 1, title: 'Architectural Blueprint & Site Survey', description: 'Detailed soil evaluation, site survey, and architectural engineering blueprints.' },
        { stepNumber: 2, title: 'Foundation & RCC Framework', description: 'High-grade reinforced concrete foundation, pillar casting, and structural framing.' },
        { stepNumber: 3, title: 'Masonry, Roofing & Plastering', description: 'Precision brickwork, weather-proof roofing, smooth internal and external plastering.' },
        { stepNumber: 4, title: 'Quality Sign-Off & Handover', description: 'Structural audit, quality clearance, and handover with full documentation.' }
      ]
    },
    {
      _id: 's2',
      title: 'Painting & Wall Work',
      icon: 'Paintbrush',
      category: 'Finishing & Protection',
      description: 'Interior/exterior painting, waterproofing, wall repairs, texture painting, wallpaper, dampness and crack repair.',
      benefits: [
        'Premium Asian Paints & Berger luxury coatings',
        'Permanent dampness & efflorescence treatment',
        'Designer texture finishes & imported wallpapers',
        'Weather-guard exterior anti-fungal protection'
      ],
      process: [
        { stepNumber: 1, title: 'Surface Inspection & Crack Repair', description: 'Thorough diagnosis of dampness, scraping, and structural crack filling.' },
        { stepNumber: 2, title: 'Waterproof Priming', description: 'Application of deep-penetrating water barrier primer coats.' },
        { stepNumber: 3, title: 'Putty & Texture Styling', description: 'Double coat acrylic wall putty and custom designer texture application.' },
        { stepNumber: 4, title: 'Double Finish Coat & Cleanup', description: 'Flawless luxury paint coats and complete site cleanup.' }
      ]
    },
    {
      _id: 's3',
      title: 'Interior Design & Renovation',
      icon: 'Sofa',
      category: 'Architecture & Design',
      description: 'Complete interiors, home renovation, living room, bedroom, false ceiling, partitions, 3D designs and remodeling.',
      benefits: [
        'High-fidelity 3D walkthroughs before start',
        'Space-optimized living room & bedroom layouts',
        'Designer false ceilings with ambient cove lighting',
        'End-to-end turnkey remodel management'
      ],
      process: [
        { stepNumber: 1, title: 'Design Consultation & 3D Render', description: 'Understanding your lifestyle, space planning, and creating 3D visualization.' },
        { stepNumber: 2, title: 'Material & Palette Curation', description: 'Selecting luxury veneers, laminates, fabrics, and hardware.' },
        { stepNumber: 3, title: 'On-Site Execution & Framing', description: 'False ceiling installation, drywall partitions, and architectural lighting.' },
        { stepNumber: 4, title: 'Finishing & Handover', description: 'Final styling, quality checks, and turnkey handover.' }
      ]
    },
    {
      _id: 's4',
      title: 'Kitchen & Bathroom',
      icon: 'Bath',
      category: 'Interior & Wet Areas',
      description: 'Modular kitchens, cabinets, countertops, bathroom renovation, tiles, sanitary fittings, waterproofing.',
      benefits: [
        'German soft-close modular kitchen cabinets',
        'Quartz, granite & composite luxury countertops',
        'Multi-barrier waterproof bathroom membranes',
        'Designer sanitary fittings & anti-skid floor tiles'
      ],
      process: [
        { stepNumber: 1, title: 'Ergonomic Layout & Plumbing Planning', description: 'Optimizing work triangle, ventilation, and plumbing layout.' },
        { stepNumber: 2, title: 'Civil & Waterproofing Execution', description: 'Complete bathroom waterproofing, slope creation, and plumbing lines.' },
        { stepNumber: 3, title: 'Cabinetry & Stone Countertops', description: 'Precision installation of modular units and stone countertops.' },
        { stepNumber: 4, title: 'Fixture Fitting & Pressure Testing', description: 'Installing premium sanitary fixtures and pressure-testing supply lines.' }
      ]
    },
    {
      _id: 's5',
      title: 'Electrical & Plumbing',
      icon: 'Zap',
      category: 'Utilities & MEP',
      description: 'Wiring, switches, lights, fans, electrical repairs, pipes, taps, drainage, leakage and water-tank work.',
      benefits: [
        'Concealed fire-retardant copper wiring (FRLS)',
        'Architectural LED profiles & modular smart switches',
        'Heavy-duty CPVC/UPVC water and drainage piping',
        'Pressure pumps, leakage resolution & water tank setup'
      ],
      process: [
        { stepNumber: 1, title: 'Circuit & Flow Diagnostics', description: 'Electrical load calculation and plumbing pressure assessment.' },
        { stepNumber: 2, title: 'Chasing & Concealed Conduit Laying', description: 'Wall cutting, conduit embedding, and pipe routing.' },
        { stepNumber: 3, title: 'Fittings & Fixture Installation', description: 'Installing modular switchboards, designer fixtures, taps, and valves.' },
        { stepNumber: 4, title: 'Safety Testing & Certification', description: 'Megger insulation testing, earthing check, and hydraulic leak tests.' }
      ]
    },
    {
      _id: 's6',
      title: 'Carpentry & Furniture',
      icon: 'Hammer',
      category: 'Woodwork & Furniture',
      description: 'Wardrobes, TV units, beds, shelves, doors, custom furniture, furniture repair and polishing.',
      benefits: [
        'Custom built-in wardrobes with sliding / soft-close doors',
        'Modern floating entertainment & TV console units',
        'Boiling Water Resistant (BWR) marine plywood',
        'High-gloss PU polish, melamine & veneer detailing'
      ],
      process: [
        { stepNumber: 1, title: 'Measurement & Custom Design', description: 'Exact dimensional measurements and functional interior shelving design.' },
        { stepNumber: 2, title: 'Timber & Ply Selection', description: 'Selecting calibrated plywood, teak wood, and decorative laminates.' },
        { stepNumber: 3, title: 'Precision Joinery & Assembly', description: 'Crafting sturdy joinery, edge-banding, and hardware mounting.' },
        { stepNumber: 4, title: 'Buffing, Polishing & Installation', description: 'Finishing with premium PU/melamine polish and onsite fitment.' }
      ]
    },
    {
      _id: 's7',
      title: 'Flooring, Tiles & False Ceiling',
      icon: 'Grid',
      category: 'Finishing & Ceilings',
      description: 'Tile installation/repair, marble, granite, wooden/vinyl flooring, gypsum/POP/PVC ceilings and decorative lighting.',
      benefits: [
        'Laser-leveled Italian marble, granite & vitrified tiles',
        'Water-resistant luxury vinyl & engineered wood flooring',
        'Acoustic gypsum & moisture-resistant false ceilings',
        'Concealed ambient cove lighting & magnetic track channels'
      ],
      process: [
        { stepNumber: 1, title: 'Subfloor & Ceiling Grid Prep', description: 'Laser leveling of substrate and heavy-duty GI ceiling suspension.' },
        { stepNumber: 2, title: 'Tile & Board Installation', description: 'High-bond polymer adhesive tile setting and gypsum board fixing.' },
        { stepNumber: 3, title: 'Grouting & Joint Finishing', description: 'Stain-resistant epoxy grouting and paper-taped seamless joints.' },
        { stepNumber: 4, title: 'Diamond Polishing & Light Fixtures', description: 'Mirror polishing for natural stones and lighting installation.' }
      ]
    },
    {
      _id: 's8',
      title: 'Doors, Windows & Glass',
      icon: 'DoorClosed',
      category: 'Openings & Glasswork',
      description: 'Wooden, aluminium and UPVC doors/windows, sliding systems, glass work, mosquito mesh and repairs.',
      benefits: [
        'Sound-insulating UPVC & slim-profile thermal aluminium',
        'Toughened safety glass partitions & shower enclosures',
        'High-security multipoint locking systems',
        'Smooth sliding mechanisms & retractable mosquito mesh'
      ],
      process: [
        { stepNumber: 1, title: 'Laser Aperture Measurement', description: 'Accurate mm-level measurements of all door and window openings.' },
        { stepNumber: 2, title: 'Precision Fabrication', description: 'Factory fabrication with reinforced corners and weatherproof gaskets.' },
        { stepNumber: 3, title: 'Anchor Fitting & Glazing', description: 'Secure fastener anchoring, glass insertion, and silicone perimeter sealing.' },
        { stepNumber: 4, title: 'Hardware Tuning & Testing', description: 'Adjusting rollers, handles, locks, and acoustic seal check.' }
      ]
    },
    {
      _id: 's9',
      title: 'Exterior & Outdoor Work',
      icon: 'Trees',
      category: 'Landscaping & Exterior',
      description: 'Landscaping, gardens, paving, driveway, terrace, balcony, gates, grills, railings and exterior improvements.',
      benefits: [
        'Lush landscape design, manicured lawns & drip irrigation',
        'Heavy-duty interlocking paver blocks & stone driveways',
        'Designer MS/SS safety gates, CNC grills & glass railings',
        'Terrace waterproofing, pergolas & vertical garden installations'
      ],
      process: [
        { stepNumber: 1, title: 'Landscape & Hardscape Planning', description: 'Site grading, drainage pathways, and aesthetic exterior layouts.' },
        { stepNumber: 2, title: 'Paving, Gates & Structural Metalwork', description: 'Driveway stone laying, structural gate framing, and balcony railings.' },
        { stepNumber: 3, title: 'Garden Planting & Automated Irrigation', description: 'Curated flora planting, soil enrichment, and drip irrigation.' },
        { stepNumber: 4, title: 'Weatherproof Lighting & Sealing', description: 'Outdoor architectural lighting and weather-protective sealing.' }
      ]
    },
    {
      _id: 's10',
      title: 'Home Repair & Maintenance',
      icon: 'Wrench',
      category: 'Maintenance & Repairs',
      description: 'General repairs, appliance installation, pest control, cleaning, AC services, waterproofing and regular home maintenance.',
      benefits: [
        'Rapid-response doorstep technician visits',
        'Certified experts for AC, appliance & electrical repairs',
        'Eco-safe anti-termite & pest control treatments',
        'Comprehensive Annual Maintenance Contract (AMC) options'
      ],
      process: [
        { stepNumber: 1, title: 'Quick Diagnostic Booking', description: 'Fast slot scheduling with experienced service technicians.' },
        { stepNumber: 2, title: 'Upfront Inspection & Estimate', description: 'Transparent assessment with zero hidden charges before work.' },
        { stepNumber: 3, title: 'Professional Repair Execution', description: 'Use of authentic spares and industrial-grade repair equipment.' },
        { stepNumber: 4, title: 'Quality Assurance & Service Warranty', description: 'Post-service performance check backed by our service guarantee.' }
      ]
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        const data = res.data || [];
        if (data.length > 0) {
          const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
          setServices(sorted);
        } else {
          setServices(fallbackServices);
        }
      } catch (err) {
        console.error('Error fetching services (using fallback):', err);
        setServices(fallbackServices);
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

      {/* Modern Detailed Modal */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(10px)',
          zIndex: 100010,
          display: 'flex',
          justifyContent: 'center',
          alignItems: isMobile ? 'flex-end' : 'center',
          padding: isMobile ? '0' : '20px',
          animation: 'fadeIn 0.25s ease'
        }} onClick={() => setSelectedService(null)}>
          <div style={{
            width: '100%',
            maxWidth: isMobile ? '100%' : '650px',
            maxHeight: isMobile ? '88vh' : '85vh',
            background: 'var(--card-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: isMobile ? '20px 20px 0 0' : '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            margin: '0 auto',
            animation: isMobile ? 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'fadeIn 0.25s ease'
          }} onClick={e => e.stopPropagation()}>
            {/* Icon-based Header — replaces broken image */}
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, var(--secondary-dark) 0%, var(--primary-dark) 100%)',
              borderBottom: '1px solid var(--border-glass)',
              padding: '40px 30px 30px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Close button */}
              <button
                onClick={() => setSelectedService(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'var(--border-glass)',
                  color: 'var(--white)',
                  border: '1px solid var(--border-glass)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <X size={18} />
              </button>

              {/* Icon badge */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ServiceIcon iconName={selectedService.icon} size={26} style={{ color: 'var(--accent-gold)' }} />
              </div>

              <div>
                {selectedService.category && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    {selectedService.category}
                  </span>
                )}
                <h2 style={{ fontSize: '1.7rem', color: 'var(--white)', fontWeight: '800', marginTop: '6px', lineHeight: '1.2' }}>
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
      {showBookingModal && selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          zIndex: 100020,
          display: 'flex',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: isMobile ? '0' : '20px'
        }}>
          <div className="modal-content glass-card" style={{
            padding: isMobile ? '24px 20px' : '40px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            background: 'var(--card-glass)',
            borderRadius: isMobile ? '20px 20px 0 0' : '16px',
            maxHeight: isMobile ? '90vh' : '90vh',
            overflowY: 'auto'
          }}>
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
              Confirming a callback session for: <strong style={{ color: 'var(--accent-gold)' }}>{selectedService.title}</strong>.
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
