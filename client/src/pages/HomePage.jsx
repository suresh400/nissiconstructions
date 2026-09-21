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

/* ── Responsive hook: tracks phone / tablet / desktop ── */
const useBreakpoint = () => {
  const getBreakpoint = () => {
    const w = window.innerWidth;
    return { isPhone: w <= 480, isTablet: w > 480 && w <= 768, isMobile: w <= 768, isDesktop: w > 768 };
  };
  const [bp, setBp] = useState(getBreakpoint);
  useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return bp;
};

const HomePage = () => {
  const { t } = useLanguage();
  const { isPhone, isTablet, isMobile } = useBreakpoint();

  // Services state
  const [services, setServices] = useState([]);
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

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

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedService || showBookingModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService, showBookingModal]);

  // Core values
  const coreValues = [
    { icon: <Award size={32} />, title: 'Uncompromising Quality', desc: 'From concrete grades to premium teak woods, we select only RERA-approved grade materials.' },
    { icon: <Shield size={32} />, title: 'Absolute Transparency', desc: 'No hidden bills. We share live digital spreadsheets detailing procurement and contractor payouts.' },
    { icon: <Compass size={32} />, title: 'Vastu Excellence', desc: 'Our architectural design templates are 100% compliant with ancient Vastu science standards.' },
    { icon: <Sparkles size={32} />, title: 'Luxury Innovation', desc: 'Specialists in modern architectural profiles, glass facades, and automated home smart rigs.' },
  ];

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
          setServices(data.sort((a, b) => a.title.localeCompare(b.title)));
        } else {
          setServices(fallbackServices);
        }
      } catch {
        setServices(fallbackServices);
      }
    };
    fetchServices();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    const serviceToBook = selectedService || services.find(s => s._id === hoveredService);
    if (!serviceToBook) return;
    try {
      await api.post('/consultations', {
        name: bookingName,
        email: bookingEmail,
        phone: bookingPhone,
        serviceType: serviceToBook.title,
        message: bookingMessage || `Client requested consultation for service: ${serviceToBook.title}`,
        type: 'booking',
      });
      try {
        await sendEmailNotification({
          name: bookingName, email: bookingEmail, phone: bookingPhone,
          serviceType: serviceToBook.title,
          message: bookingMessage || `Client requested consultation for service: ${serviceToBook.title}`,
          type: 'booking'
        });
      } catch {}
      setBookingSuccess(true);
      setBookingName(''); setBookingEmail(''); setBookingPhone(''); setBookingMessage('');
    } catch (err) {
      alert(`Consultation request failed: ${err.message || 'Please try again.'}`);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await api.post('/consultations', {
        name: contactName, email: contactEmail, phone: contactPhone,
        serviceType: contactServiceType, message: contactMessage, type: 'callback'
      });
      try {
        await sendEmailNotification({
          name: contactName, email: contactEmail, phone: contactPhone,
          serviceType: contactServiceType, message: contactMessage, type: 'callback'
        });
      } catch {}
      setContactSuccess(true);
      setContactName(''); setContactEmail(''); setContactPhone(''); setContactMessage('');
    } catch (err) {
      alert(`Failed to send message: ${err.message || 'Please try again.'}`);
    } finally {
      setContactLoading(false);
    }
  };

  /* ── Derived layout values ── */
  const heroPaddingTop = isPhone ? '100px' : isTablet ? '120px' : '160px';
  const heroPaddingBottom = isPhone ? '50px' : '80px';
  const heroH1Size = isPhone ? 'clamp(1.9rem, 8vw, 2.4rem)' : isTablet ? '2.6rem' : '3.6rem';
  const heroImgHeight = isPhone ? '220px' : isTablet ? '320px' : '480px';

  /* Services grid: 1 col phone, 2 col tablet, 3 col desktop */
  const servicesGridCols = isPhone ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

  /* About grid */
  const aboutGridCols = isMobile ? '1fr' : '1.1fr 0.9fr';

  /* Contact form grid */
  const formGridCols = isPhone ? '1fr' : '1fr 1fr';

  return (
    <div style={{ background: 'var(--primary-dark)', color: 'var(--text-light)', minHeight: '100vh', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      {/* ── 1. Hero Section ── */}
      <section id="home" style={{
        paddingTop: heroPaddingTop,
        paddingBottom: heroPaddingBottom,
        paddingLeft: 'clamp(4%, 5%, 5%)',
        paddingRight: 'clamp(4%, 5%, 5%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <span style={{
            fontSize: isPhone ? '0.72rem' : '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: isPhone ? '2px' : '3px',
            color: 'var(--accent-gold)',
            marginBottom: '16px',
            display: 'block'
          }}>
            Nissi Constructions
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: heroH1Size,
            lineHeight: '1.2',
            color: 'var(--white)',
            fontWeight: '700',
            marginBottom: isPhone ? '18px' : '25px',
            letterSpacing: '-0.5px'
          }}>
            We build spaces that endure.
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: isPhone ? '0.95rem' : '1.1rem',
            lineHeight: '1.7',
            maxWidth: '620px',
            margin: `0 auto ${isPhone ? '28px' : '40px'} auto`
          }}>
            Premium residential and commercial developments built with absolute structural integrity and financial transparency.
          </p>
          <div style={{
            display: 'flex',
            gap: isPhone ? '10px' : '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'var(--white)',
                color: 'var(--black)',
                border: '1px solid var(--white)',
                padding: isPhone ? '11px 20px' : '14px 30px',
                borderRadius: '6px',
                fontSize: isPhone ? '0.88rem' : '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-hover)'; e.currentTarget.style.borderColor = 'var(--gold-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--white)'; }}
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent',
                color: 'var(--text-light)',
                border: '1px solid var(--border-glass)',
                padding: isPhone ? '11px 20px' : '14px 30px',
                borderRadius: '6px',
                fontSize: isPhone ? '0.88rem' : '0.95rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-glass)'; }}
            >
              Explore Services <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Hero Image Block ── */}
      <section style={{ padding: isPhone ? '0 4% 50px 4%' : '0 5% 80px 5%' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          borderRadius: isPhone ? '10px' : '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
          border: '1px solid var(--border-glass)'
        }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury Minimalist Villa"
            style={{ width: '100%', height: heroImgHeight, objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ── 2. About Section ── */}
      <section id="about" style={{
        padding: `clamp(60px, 8vw, 100px) clamp(4%, 5%, 5%)`,
        borderTop: '1px solid var(--border-glass)',
        background: 'var(--secondary-dark)'
      }}>
        <div className="container">
          {/* Profile grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: aboutGridCols,
            gap: isPhone ? '30px' : '50px',
            alignItems: 'center',
            marginBottom: isPhone ? '50px' : '80px'
          }}>
            <div>
              <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Corporate Profile</span>
              <h2 style={{
                fontSize: isPhone ? 'clamp(1.4rem, 5vw, 1.8rem)' : isTablet ? '2rem' : '2.4rem',
                marginBottom: '20px',
                fontWeight: '700'
              }}>
                Building Landmarks with Structural Integrity
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.7', fontSize: isPhone ? '0.92rem' : '0.98rem' }}>
                Nissi Constructions was established with a singular focus: to close the trust gap in the private residential sector. Over the years, we have scaled our operations from private custom homes to multi-story commercial properties and gated villa societies.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '25px', lineHeight: '1.7', fontSize: isPhone ? '0.92rem' : '0.98rem' }}>
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
            gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr',
            gap: isPhone ? '16px' : '30px',
            marginBottom: isPhone ? '50px' : '80px'
          }}>
            {[
              { icon: <Target size={28} />, title: 'Our Mission', text: 'To design and build structures of superior quality and safety, ensuring absolute pricing transparency and delivering luxury spaces that elevate our clients\' lifestyle.' },
              { icon: <Hourglass size={28} />, title: 'Our Vision', text: 'To become India\'s most trusted luxury builder brand, recognized for sustainable building, Vastu design, and zero-defect handover completions.' }
            ].map((card, i) => (
              <div key={i} className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'var(--card-glass)' }}>
                <div style={{ background: 'rgba(212,175,55,0.08)', padding: isPhone ? '12px' : '15px', borderRadius: '12px', color: 'var(--accent-gold)', flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: isPhone ? '1.15rem' : '1.4rem', marginBottom: '10px', fontWeight: '700' }}>{card.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: isPhone ? '0.87rem' : '0.92rem', lineHeight: '1.7', margin: 0 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Values grid */}
          <div>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: isPhone ? '30px' : '50px' }}>
              <span className="section-tag">Foundations</span>
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle">Principles dictating every foundation block we excavate and every brick we lay.</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isPhone ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: isPhone ? '16px' : '25px'
            }}>
              {coreValues.map((value, index) => (
                <div key={index} className="glass-card" style={{ background: 'var(--card-glass)' }}>
                  <div style={{ color: 'var(--accent-gold)', marginBottom: '16px' }}>{value.icon}</div>
                  <h3 style={{ fontSize: isPhone ? '1.05rem' : '1.25rem', marginBottom: '10px', fontWeight: '700' }}>{value.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: isPhone ? '0.85rem' : '0.88rem', lineHeight: '1.6', margin: 0 }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Services Section ── */}
      <section id="services" style={{
        padding: `clamp(50px, 7vw, 90px) clamp(16px, 4vw, 5%)`,
        background: 'var(--primary-dark)',
        borderTop: '1px solid var(--border-glass)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: isPhone ? '30px' : '50px' }}>
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Expertise Directory</span>
            <h2 className="section-title">Our Construction Services</h2>
            <p className="section-subtitle" style={{ maxWidth: '620px', margin: '15px auto 0 auto' }}>
              Explore our turnkey services from reinforced civil construction to luxury interior makeovers. Tap any service to inspect workflow & book a consultation.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isPhone ? '16px' : '24px',
            alignItems: 'stretch'
          }}>
            {services.map(service => (
              <div
                key={service._id}
                onClick={() => {
                  setSelectedService(service);
                  setBookingSuccess(false);
                }}
                className="glass-card"
                style={{
                  background: 'var(--card-glass)',
                  borderRadius: '16px',
                  padding: isPhone ? '20px' : '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  border: '1px solid var(--border-glass)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: isPhone ? '44px' : '52px',
                    height: isPhone ? '44px' : '52px',
                    borderRadius: '12px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)'
                  }}>
                    <ServiceIcon iconName={service.icon} size={isPhone ? 22 : 26} />
                  </div>
                  {service.category && (
                    <span style={{
                      fontSize: '0.68rem',
                      color: 'var(--accent-gold)',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      background: 'rgba(212, 175, 55, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}>
                      {service.category}
                    </span>
                  )}
                </div>

                <h3 style={{
                  fontSize: isPhone ? '1.15rem' : '1.3rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: 'var(--white)'
                }}>
                  {service.title}
                </h3>

                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: isPhone ? '0.88rem' : '0.92rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flexGrow: 1
                }}>
                  {service.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-glass)',
                  marginTop: 'auto'
                }}>
                  <span style={{
                    fontSize: '0.84rem',
                    fontWeight: '600',
                    color: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    View Details <ArrowUpRight size={14} />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service);
                      setShowBookingModal(true);
                      setBookingSuccess(false);
                    }}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      color: 'var(--white)',
                      cursor: 'pointer'
                    }}
                  >
                    Book Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Contact Section ── */}
      <section id="contact" style={{
        padding: `clamp(50px, 7vw, 90px) clamp(16px, 4vw, 5%)`,
        background: 'var(--secondary-dark)',
        borderTop: '1px solid var(--border-glass)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: isPhone ? '30px' : '60px' }}>
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Get In Touch</span>
            <h2 className="section-title">Contact Nissi Constructions Desk</h2>
            <p className="section-subtitle">Book a site assessment visit, request a blueprint estimate, or ask questions.</p>
          </div>

          <div style={{ maxWidth: '650px', margin: '0 auto', width: '100%' }}>
            <div className="glass-card" style={{ padding: isPhone ? '24px' : '40px', background: 'var(--card-glass)', border: '1px solid var(--border-glass)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: isPhone ? '1.3rem' : '1.6rem', marginBottom: '25px', color: 'var(--white)', fontWeight: '700', textAlign: 'center' }}>Send Message</h3>

              {contactSuccess && (
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
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '5px', fontWeight: '700' }}>Message Submitted!</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>We will reach out as soon as possible.</p>
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Full Name</label>
                  <input type="text" className="form-control" required value={contactName} onChange={e => setContactName(e.target.value)} placeholder="e.g. Suresh Kumar" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: formGridCols, gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'var(--text-light)' }}>Email Address</label>
                    <input type="email" className="form-control" required value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="e.g. suresh@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'var(--text-light)' }}>{t('Phone Number')}</label>
                    <input type="tel" className="form-control" required value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="e.g. +91 87904 20585" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Inquiry Area</label>
                  <select className="form-control" value={contactServiceType} onChange={e => setContactServiceType(e.target.value)}>
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
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="Describe your site details, Vastu preferences, plot size, budget specs..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={contactLoading}>
                  {contactLoading ? 'Sending message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Professional Service Details Modal (Centered, zIndex 100010 above navbar, never pushed right) ── */}
      {selectedService && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(10px)',
            zIndex: 100010,
            display: 'flex',
            alignItems: isPhone ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: isPhone ? '0' : '20px',
            animation: 'fadeIn 0.25s ease'
          }}
          onClick={() => setSelectedService(null)}
        >
          <div
            style={{
              background: 'var(--card-glass)',
              border: '1px solid var(--border-glass)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 0 30px rgba(212, 175, 55, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              width: isPhone ? '100%' : 'min(92vw, 640px)',
              maxHeight: isPhone ? '88vh' : '86vh',
              borderRadius: isPhone ? '22px 22px 0 0' : '18px',
              animation: isPhone ? 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'fadeIn 0.25s ease',
              margin: '0 auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: 'var(--card-glass)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border-glass)',
              padding: isPhone ? '16px 20px' : '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: isPhone ? '40px' : '48px',
                  height: isPhone ? '40px' : '48px',
                  borderRadius: '12px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  flexShrink: 0
                }}>
                  <ServiceIcon iconName={selectedService.icon} size={isPhone ? 20 : 24} />
                </div>
                <div>
                  {selectedService.category && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
                      {selectedService.category}
                    </span>
                  )}
                  <h3 style={{ fontSize: isPhone ? '1.15rem' : '1.4rem', color: 'var(--white)', fontWeight: '700', margin: 0, lineHeight: '1.2' }}>
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                aria-label="Close details"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: isPhone ? '20px' : '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <p style={{ color: 'var(--text-light)', fontSize: isPhone ? '0.92rem' : '1rem', lineHeight: '1.7', margin: 0 }}>
                  {selectedService.description}
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr', gap: '10px', marginTop: '18px' }}>
                  <button
                    onClick={() => { setShowBookingModal(true); setBookingSuccess(false); }}
                    className="btn btn-primary"
                    style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', fontSize: '0.88rem' }}
                  >
                    {t('Book Consultation')} <PhoneCall size={16} />
                  </button>
                  <a
                    href={`https://wa.me/917601078843?text=Hello%20Nissi%20Constructions,%20I%20am%20interested%20in%20your%20${encodeURIComponent(selectedService.title)}%20services.`}
                    target="_blank" rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    {t('Chat via WhatsApp')} <ArrowUpRight size={16} />
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '14px' }}>
                  <Phone size={13} style={{ color: 'var(--accent-gold)' }} />
                  <span>{t('Direct Support Helpline')}: <strong style={{ color: 'var(--white)' }}>+91 87904 20585</strong></span>
                </div>
              </div>

              {/* Key Benefits */}
              {selectedService.benefits?.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '18px' }}>
                  <h4 style={{ fontSize: '0.98rem', color: 'var(--accent-gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                    <FileCheck2 size={16} /> Key Benefits & Standards
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedService.benefits.map((benefit, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontSize: isPhone ? '0.86rem' : '0.9rem', color: 'var(--text-muted)' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Workflow */}
              {selectedService.process?.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '18px' }}>
                  <h4 style={{ fontSize: '0.98rem', color: 'var(--accent-gold)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                    <HelpCircle size={16} /> Execution Workflow
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedService.process.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                        <div style={{
                          background: 'rgba(212,175,55,0.1)', color: 'var(--accent-gold)',
                          width: '26px', height: '26px', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 'bold', fontSize: '0.78rem', flexShrink: 0
                        }}>
                          {step.stepNumber || idx + 1}
                        </div>
                        <div>
                          <h5 style={{ fontSize: '0.88rem', color: 'var(--white)', fontWeight: '600', marginBottom: '2px' }}>{step.title}</h5>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.5', margin: 0 }}>{step.description}</p>
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

      {/* ── Booking Modal (zIndex 100020 on top of everything, centered, never pushed right) ── */}
      {showBookingModal && (selectedService || services.find(s => s._id === hoveredService)) && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          zIndex: 100020,
          display: 'flex',
          alignItems: isPhone ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: isPhone ? '0' : '20px',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{
            background: 'var(--card-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: isPhone ? '20px 20px 0 0' : '16px',
            width: '100%',
            maxWidth: isPhone ? '100%' : '500px',
            maxHeight: isPhone ? '90vh' : '90vh',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            padding: isPhone ? '24px 20px' : '36px',
            position: 'relative',
            margin: '0 auto',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
            animation: isPhone ? 'slideInUp 0.3s cubic-bezier(0.16,1,0.3,1)' : 'fadeIn 0.25s ease'
          }}>
            <button
              onClick={() => setShowBookingModal(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-glass)',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '32px', height: '32px', borderRadius: '50%'
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: isPhone ? '1.3rem' : '1.6rem', marginBottom: '8px', textAlign: 'center', color: 'var(--white)', fontWeight: '700' }}>
              Inquire for Service
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '22px', textAlign: 'center' }}>
              Confirming a callback session for:{' '}
              <strong style={{ color: 'var(--accent-gold)' }}>
                {(selectedService || services.find(s => s._id === hoveredService))?.title}
              </strong>
            </p>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={50} style={{ color: '#10B981', margin: '0 auto 15px auto' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--white)' }}>Consultation Request Placed</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Our project desk supervisor will reach out to you shortly.</p>
                <button onClick={() => setShowBookingModal(false)} className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Full Name</label>
                  <input type="text" className="form-control" required value={bookingName} onChange={e => setBookingName(e.target.value)} placeholder="e.g. Suresh Kumar" />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>{t('Phone Number')}</label>
                  <input type="tel" className="form-control" required value={bookingPhone} onChange={e => setBookingPhone(e.target.value)} placeholder="e.g. +91 87904 20585" />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Email Address</label>
                  <input type="email" className="form-control" required value={bookingEmail} onChange={e => setBookingEmail(e.target.value)} placeholder="e.g. suresh@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--text-light)' }}>Inquiry Message</label>
                  <textarea className="form-control" rows="3" placeholder="Describe your project, timeline, location specifications..." value={bookingMessage} onChange={e => setBookingMessage(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '13px', marginTop: '8px' }} disabled={bookingLoading}>
                  {bookingLoading ? 'Submitting Details...' : 'Request Callback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
