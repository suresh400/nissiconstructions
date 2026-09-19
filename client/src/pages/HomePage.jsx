import React, { useState, useEffect } from 'react';
import {
  ArrowRight, CheckCircle2, Phone, Calendar, ArrowUpRight,
  Target, Compass, Sparkles, Award, Shield, Hourglass,
  HardHat, Home, Bath, Grid, Wrench, Paintbrush, Layers, Square, Hammer,
  Database, Building2, PlusCircle, Castle, RefreshCw, Palette,
  ChefHat, Droplets, Layout, Triangle, CloudRain, Activity, ShieldAlert,
  Zap, Sofa, DoorClosed, Trees,
  ChevronRight, ChevronDown, PhoneCall, HelpCircle, FileCheck2, X, MapPin, Mail, Clock, Send
} from 'lucide-react';
import { api } from '../utils/api';
import { useLanguage } from '../utils/LanguageContext';
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

const HomePage = () => {
  const { t } = useLanguage();
  // Services state
  const [services, setServices] = useState([]);
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // mobile drawer
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // General Booking Form state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactServiceType, setContactServiceType] = useState('General Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Corporate core values list
  const coreValues = [
    { icon: <Award size={36} />, title: 'Uncompromising Quality', desc: 'From concrete grades to premium teak woods, we select only RERA-approved grade materials.' },
    { icon: <Shield size={36} />, title: 'Absolute Transparency', desc: 'No hidden bills. We share live digital spreadsheets detailing procurement and contractor payouts.' },
    { icon: <Compass size={36} />, title: 'Vastu Excellence', desc: 'Our architectural design templates are 100% compliant with ancient Vastu science standards.' },
    { icon: <Sparkles size={36} />, title: 'Luxury Innovation', desc: 'Specialists in modern architectural profiles, glass facades, and automated home smart rigs.' },
  ];

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    const serviceToBook = selectedService || services.find(s => s._id === hoveredService);
    if (!serviceToBook) return;

    try {
      // 1. Submit booking details to local DB via API
      console.log('[Booking Submit] Sending to database...');
      await api.post('/consultations', {
        name: bookingName,
        email: bookingEmail,
        phone: bookingPhone,
        serviceType: serviceToBook.title,
        message: bookingMessage || `Client requested consultation for service: ${serviceToBook.title}`,
        type: 'booking',
      });
      console.log('[Booking Submit] Saved in DB successfully!');

      // 2. Trigger EmailJS notification (optional, will not block if fails)
      try {
        await sendEmailNotification({
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
          serviceType: serviceToBook.title,
          message: bookingMessage || `Client requested consultation for service: ${serviceToBook.title}`,
          type: 'booking'
        });
      } catch (emailErr) {
        console.error('[Booking Submit] EmailJS error (non-blocking):', emailErr);
      }

      setBookingSuccess(true);
      setBookingName('');
      setBookingEmail('');
      setBookingPhone('');
      setBookingMessage('');
    } catch (err) {
      console.error('[Booking Submit] Connection/Server error:', err);
      alert(`Consultation request failed: ${err.message || 'Please try again.'}`);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      // 1. Submit contact details to local DB via API
      console.log('[Contact Submit] Sending to database...');
      await api.post('/consultations', {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        serviceType: contactServiceType,
        message: contactMessage,
        type: 'callback'
      });
      console.log('[Contact Submit] Saved in DB successfully!');

      // 2. Trigger EmailJS notification (optional, will not block if fails)
      try {
        await sendEmailNotification({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          serviceType: contactServiceType,
          message: contactMessage,
          type: 'callback'
        });
      } catch (emailErr) {
        console.error('[Contact Submit] EmailJS error (non-blocking):', emailErr);
      }

      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    } catch (err) {
      console.error('[Contact Submit] Connection/Server error:', err);
      alert(`Failed to send message: ${err.message || 'Please try again.'}`);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--primary-dark)', color: 'var(--text-light)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>

      {/* 1. Hero Section */}
      <section id="home" style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        paddingLeft: '5%',
        paddingRight: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: 'var(--accent-gold)',
            marginBottom: '20px',
            display: 'block'
          }}>
            Nissi Constructions
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '3.6rem',
            lineHeight: '1.2',
            color: 'var(--white)',
            fontWeight: '700',
            marginBottom: '25px',
            letterSpacing: '-0.5px'
          }}>
            We build spaces that endure.
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.15rem',
            lineHeight: '1.7',
            maxWidth: '650px',
            margin: '0 auto 40px auto'
          }}>
            Premium residential and commercial developments built with absolute structural integrity and financial transparency.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'var(--white)',
                color: 'var(--black)',
                border: '1px solid var(--white)',
                padding: '14px 30px',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold-hover)'; e.currentTarget.style.borderColor = 'var(--gold-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--white)'; }}
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'transparent',
                color: 'var(--text-light)',
                border: '1px solid var(--border-glass)',
                padding: '14px 30px',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-glass)'; }}
            >
              Explore Services <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Hero Image Block */}
      <section style={{ padding: '0 5% 80px 5%' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
          border: '1px solid var(--border-glass)'
        }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury Minimalist Villa"
            style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" style={{ padding: '100px 5%', borderTop: '1px solid var(--border-glass)', background: 'var(--secondary-dark)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
            gap: '50px',
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <div>
              <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Corporate Profile</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '20px', fontWeight: '700' }}>Building Landmarks with Structural Integrity</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.7', fontSize: '0.98rem' }}>
                Nissi Constructions was established with a singular focus: to close the trust gap in the private residential sector. Over the years, we have scaled our operations from private custom homes to multi-story commercial properties and gated villa societies.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '25px', lineHeight: '1.7', fontSize: '0.98rem' }}>
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
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                }}
              />
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '30px',
            marginBottom: '80px'
          }}>
            <div className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '30px', background: 'var(--card-glass)' }}>
              <div style={{ background: 'rgba(212,175,55,0.08)', padding: '15px', borderRadius: '12px', color: 'var(--accent-gold)' }}>
                <Target size={30} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', fontWeight: '700' }}>Our Mission</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>
                  To design and build structures of superior quality and safety, ensuring absolute pricing transparency and delivering luxury spaces that elevate our clients' lifestyle.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '30px', background: 'var(--card-glass)' }}>
              <div style={{ background: 'rgba(212,175,55,0.08)', padding: '15px', borderRadius: '12px', color: 'var(--accent-gold)' }}>
                <Hourglass size={30} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', fontWeight: '700' }}>Our Vision</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>
                  To become India's most trusted luxury builder brand, recognized for sustainable building, Vastu design, and zero-defect handover completions.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values grid */}
          <div>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
              <span className="section-tag">Foundations</span>
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle">Principles dictating every foundation block we excavate and every brick we lay.</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '25px'
            }}>
              {coreValues.map((value, index) => (
                <div key={index} className="glass-card" style={{ padding: '30px', background: 'var(--card-glass)' }}>
                  <div style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>
                    {value.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontWeight: '700' }}>{value.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* 3. Services Section */}
      <section id="services" style={{ padding: '100px 5%', background: 'var(--primary-dark)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Expertise Directory</span>
            <h2 className="section-title">Our Construction Services</h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '15px auto 0 auto' }}>
              {isMobile
                ? 'Tap any service name below to view workflow details and book consultations.'
                : 'Hover over any service name below to view builder expertise, benefits, and details.'}
            </p>
          </div>

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
                        setBookingSuccess(false);
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
                          <span>{t('Direct Support')}: <strong style={{ color: 'var(--white)' }}>+91 87904 20585</strong></span>
                        </div>

                        {/* Actions Button Bar */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedService(service);
                              setShowBookingModal(true);
                              setBookingSuccess(false);
                            }}
                            className="btn btn-primary"
                            style={{
                              padding: '8px 12px',
                              fontSize: '0.75rem',
                              flex: 1,
                              fontWeight: '600'
                            }}
                          >
                            {t('Book Call')}
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
                            {t('WhatsApp')} <ArrowUpRight size={12} />
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

      {/* 4. Contact Section */}
      <section id="contact" style={{ padding: '100px 5%', background: 'var(--secondary-dark)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Get In Touch</span>
            <h2 className="section-title">Contact Nissi Constructions Desk</h2>
            <p className="section-subtitle">Book a site assessment visit, request a blueprint estimate, or ask questions.</p>
          </div>

          <div style={{
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            {/* Message Form Card */}
            <div className="glass-card" style={{ padding: '40px', background: 'var(--card-glass)', border: '1px solid var(--border-glass)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '25px', color: 'var(--white)', fontWeight: '700', textAlign: 'center' }}>Send Message</h3>

              {contactSuccess ? (
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
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '5px', fontWeight: '700' }}>Message Submitted!</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                    We will reach out as soon as possible.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'var(--text-light)' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. suresh@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'var(--text-light)' }}>{t('Phone Number')}</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +91 87904 20585"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Inquiry Area</label>
                  <select
                    className="form-control"
                    value={contactServiceType}
                    onChange={(e) => setContactServiceType(e.target.value)}
                  >
                    <option value="General Inquiry">General Inquiry / Greeting</option>
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Villa Cost Estimate">Villa Cost Estimate</option>
                    <option value="Commercial Complex">Commercial Complex</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Message Details</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your site details, Vastu preferences, plot size, budget specs..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={contactLoading}>
                  {contactLoading ? 'Sending message...' : 'Send Message'}
                </button>
              </form>
            </div>
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
            {/* Icon-based Header — replaces broken image */}
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, var(--secondary-dark) 0%, var(--primary-dark) 100%)',
              borderBottom: '1px solid var(--border-glass)',
              padding: '40px 30px 28px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
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
                  backdropFilter: 'blur(8px)'
                }}
              >
                <X size={18} />
              </button>

              {/* Icon badge */}
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '14px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ServiceIcon iconName={selectedService.icon} size={28} style={{ color: 'var(--accent-gold)' }} />
              </div>

              <div>
                {selectedService.category && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
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
                    onClick={() => { setShowBookingModal(true); setBookingSuccess(false); }}
                    className="btn btn-primary"
                    style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {t('Request Consultation')} <PhoneCall size={16} />
                  </button>
                  <a
                    href={`https://wa.me/917601078843?text=Hello,%20I%20am%20interested%20in%20your%20${encodeURIComponent(selectedService.title)}%20services.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {t('Chat via WhatsApp')} <ArrowUpRight size={16} />
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

      {showBookingModal && (selectedService || services.find(s => s._id === hoveredService)) && (
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
              Confirming a callback session for: <strong style={{ color: 'var(--accent-gold)' }}>{(selectedService || services.find(s => s._id === hoveredService))?.title}</strong>.
            </p>

            {bookingSuccess ? (
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
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>{t('Phone Number')}</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="e.g. +91 87904 20585"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder="e.g. suresh@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Inquiry Message</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Describe your project, timeline, location specifications..."
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={bookingLoading}>
                  {bookingLoading ? 'Submitting Details...' : 'Request Callback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Inline Keyframes style injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
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

export default HomePage;
