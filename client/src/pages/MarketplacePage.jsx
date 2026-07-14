import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Search, Plus, MapPin, IndianRupee, Layers, Contact, Mail, Phone, Home, X, Check, ShieldAlert } from 'lucide-react';

const MarketplacePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [user, setUser] = useState(null);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Upload Property Form State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propType, setPropType] = useState('Apartment');
  const [propCity, setPropCity] = useState('Visakhapatnam');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Detail Modal
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    };
    fetchUser();
    window.addEventListener('auth-changed', fetchUser);

    fetchProperties();

    return () => window.removeEventListener('auth-changed', fetchUser);
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await api.get('/properties');
      setProperties(res.data);
      setFilteredProperties(res.data);
    } catch (err) {
      console.error('Error fetching properties:', err);
    }
  };

  const handleFilter = () => {
    let temp = [...properties];

    if (search) {
      temp = temp.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    }
    if (city) {
      temp = temp.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }
    if (type) {
      temp = temp.filter(p => p.type === type);
    }
    if (minPrice) {
      temp = temp.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      temp = temp.filter(p => p.price <= Number(maxPrice));
    }

    setFilteredProperties(temp);
  };

  const resetFilters = () => {
    setSearch('');
    setCity('');
    setType('');
    setMinPrice('');
    setMaxPrice('');
    setFilteredProperties(properties);
  };

  const handlePropertyUpload = async (e) => {
    e.preventDefault();
    setImageUploadLoading(true);
    let imageUrl = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'; // fallback

    try {
      if (imageFile) {
        // Upload image to server
        const uploadRes = await api.upload(imageFile, true); // public upload
        imageUrl = `http://localhost:5000${uploadRes.url}`;
      }

      await api.post('/properties', {
        title,
        description,
        type: propType,
        city: propCity,
        area,
        price: Number(price),
        ownerName,
        ownerPhone,
        ownerEmail,
        images: [imageUrl],
      });

      setFormSuccess(true);
      // Reset form
      setTitle('');
      setDescription('');
      setArea('');
      setPrice('');
      setOwnerName('');
      setOwnerPhone('');
      setOwnerEmail('');
      setImageFile(null);
      
      // Refresh list (won't show immediately as it starts pending, but let's refresh)
      fetchProperties();
    } catch (err) {
      alert('Failed to submit listing. Please make sure you are logged in.');
    } finally {
      setImageUploadLoading(false);
    }
  };

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString()}`;
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header banner */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
        padding: '80px 5%'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-tag">Marketplace</span>
            <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Property Directory</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>
              Connect with verified property sellers directly. Browse land plots, commercial buildings, apartment blocks, and luxury duplex villas.
            </p>
          </div>

          <div>
            {user ? (
              <button onClick={() => { setFormSuccess(false); setShowUploadModal(true); }} className="btn btn-primary">
                <Plus size={18} /> List Your Property
              </button>
            ) : (
              <div style={{ color: 'var(--text-muted)', background: '#fafafa', padding: '15px 20px', borderRadius: '10px', border: '1px dashed var(--border-glass)', fontSize: '0.9rem' }}>
                Please <strong>Log In</strong> to list your property.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filter and listings grid */}
      <section className="section" style={{ paddingTop: '30px' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Filters side sidebar */}
          <div className="glass-card" style={{ padding: '25px', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Search Filters</h3>
            
            <div className="form-group">
              <label className="form-label">Keywords</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Sea facing, 4 BHK..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <select className="form-control" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">All Cities</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Vijayawada">Vijayawada</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Min Budget (INR)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 5000000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Max Budget (INR)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 20000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <button onClick={handleFilter} className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>
                Filter
              </button>
              <button onClick={resetFilters} className="btn btn-secondary" style={{ padding: '10px', fontSize: '0.85rem' }}>
                Reset
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          <div>
            {filteredProperties.length === 0 ? (
              <div className="glass-card" style={{ padding: '50px', textAlign: 'center', borderStyle: 'dashed' }}>
                <Home size={40} style={{ color: 'var(--text-muted)', marginBottom: '15px', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.4rem', color: '#111111', marginBottom: '8px' }}>No Listings Found</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No approved properties matched your current search filters. Try adjusting your parameters.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '25px'
              }}>
                {filteredProperties.map(prop => (
                  <div key={prop._id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <img 
                      src={prop.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'} 
                      alt={prop.title} 
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                          {prop.type}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <MapPin size={12} /> {prop.city}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', minHeight: '44px' }}>{prop.title}</h3>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-glass)', paddingTop: '15px', marginTop: 'auto' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price</span>
                          <span style={{ fontWeight: 'bold', color: 'var(--white)', display: 'flex', alignItems: 'center' }}>
                            <IndianRupee size={14} /> {formatCurrency(prop.price)}
                          </span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Area</span>
                          <span style={{ fontWeight: '600', color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Layers size={14} /> {prop.area}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedProperty(prop)} 
                        className="btn btn-secondary" 
                        style={{ width: '100%', padding: '8px', fontSize: '0.85rem', marginTop: '15px' }}
                      >
                        Contact Owner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card" style={{ maxWidth: '600px', padding: '40px' }}>
            <button className="modal-close" onClick={() => setShowUploadModal(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', textAlign: 'center' }}>Upload Property Details</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px', textAlign: 'center' }}>
              Fill in your property specs. Admin will review and publish the listing.
            </p>

            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <Check size={48} style={{ color: '#10B981', margin: '0 auto 15px auto', background: 'rgba(16,185,129,0.1)', padding: '10px', borderRadius: '50%' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Property Submitted!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                  Your listing is successfully saved as pending. It will go live once an administrator verifies the details.
                </p>
                <button onClick={() => setShowUploadModal(false)} className="btn btn-primary" style={{ marginTop: '20px' }}>
                  Return to Marketplace
                </button>
              </div>
            ) : (
              <form onSubmit={handlePropertyUpload}>
                <div className="form-group">
                  <label className="form-label">Property Title</label>
                  <input type="text" className="form-control" required placeholder="e.g. 3 BHK Gated Villa at MVP Colony" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select className="form-control" value={propType} onChange={(e) => setPropType(e.target.value)}>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <select className="form-control" value={propCity} onChange={(e) => setPropCity(e.target.value)}>
                      <option value="Visakhapatnam">Visakhapatnam</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Vijayawada">Vijayawada</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Area (sq ft)</label>
                    <input type="text" className="form-control" required placeholder="e.g. 1800 sq ft" value={area} onChange={(e) => setArea(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (INR)</label>
                    <input type="number" className="form-control" required placeholder="e.g. 8500000" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" required placeholder="Describe utilities, parking, boundary spacing, facing directions..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Property Image</label>
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                </div>

                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: '20px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--accent-gold)' }}>Owner Contact Information</h4>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" className="form-control" required value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" required value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={imageUploadLoading}>
                  {imageUploadLoading ? 'Uploading media & saving...' : 'Submit Listing for Approval'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Property Owner details Modal */}
      {selectedProperty && (
        <div className="modal-overlay">
          <div className="modal-content glass-card" style={{ maxWidth: '500px', padding: '40px' }}>
            <button className="modal-close" onClick={() => setSelectedProperty(null)}>
              <X size={20} />
            </button>

            <span style={{ fontSize: '0.75rem', background: 'rgba(212,175,55,0.1)', color: 'var(--accent-gold)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              {selectedProperty.type}
            </span>
            <h3 style={{ fontSize: '1.8rem', marginTop: '10px', marginBottom: '5px' }}>{selectedProperty.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> {selectedProperty.city} | Area: {selectedProperty.area}
            </p>

            <div style={{ background: 'var(--secondary-dark)', border: '1px solid var(--border-glass)', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Asking Price</span>
              <span style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <IndianRupee size={18} /> {selectedProperty.price.toLocaleString()}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
              {selectedProperty.description}
            </p>

            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Contact size={18} className="accent-gold" style={{ color: 'var(--accent-gold)' }} /> Owner Contact Details
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                <div style={{ color: 'var(--white)', fontWeight: '500' }}>Name: {selectedProperty.ownerName}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <Phone size={14} /> <span>{selectedProperty.ownerPhone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <Mail size={14} /> <span>{selectedProperty.ownerEmail}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                <a href={`tel:${selectedProperty.ownerPhone}`} className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>
                  Call Owner
                </a>
                <a href={`mailto:${selectedProperty.ownerEmail}?subject=Inquiry%20about%20${encodeURIComponent(selectedProperty.title)}`} className="btn btn-secondary" style={{ flex: 1, padding: '10px' }}>
                  Email Owner
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
