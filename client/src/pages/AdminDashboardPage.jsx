import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Shield, Users, Home, Award, FileText, Briefcase, Star, Check, Trash2, Plus, Sparkles, LogOut, Download } from 'lucide-react';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Data Lists
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Form States - Add Project
  const [projTitle, setProjTitle] = useState('');
  const [projLoc, setProjLoc] = useState('');
  const [projCost, setProjCost] = useState('');
  const [projTime, setProjTime] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projImg, setProjImg] = useState('');
  const [projFeatured, setProjFeatured] = useState(false);

  // Form States - Add Blog
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCat, setBlogCat] = useState('Construction Tips');
  const [blogSum, setBlogSum] = useState('');
  const [blogCont, setBlogCont] = useState('');
  const [blogImg, setBlogImg] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('5 mins read');

  // Form States - Add Job
  const [jobTitle, setJobTitle] = useState('');
  const [jobLoc, setJobLoc] = useState('Visakhapatnam');
  const [jobSal, setJobSal] = useState('₹40,000 - ₹60,000 / Month');
  const [jobType, setJobType] = useState('Full Time');
  const [jobDesc, setJobDesc] = useState('');
  const [jobReqs, setJobReqs] = useState('');

  // Loading States
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const stored = localStorage.getItem('user');
      if (!stored) {
        navigate('/');
        return;
      }
      const parsed = JSON.parse(stored);
      if (parsed.role !== 'admin') {
        navigate('/');
        return;
      }
      setUser(parsed);
    };
    checkAdmin();
    
    // Fetch initial datasets
    fetchLeads();
    fetchProperties();
    fetchTestimonials();
    fetchJobs();
  }, [navigate]);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/consultations/admin/all');
      setLeads(res.data);
    } catch (e) {
      console.error('Error fetching leads:', e);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await api.get('/properties/admin/all');
      setProperties(res.data);
    } catch (e) {
      console.error('Error fetching properties:', e);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials/admin/all');
      setTestimonials(res.data);
    } catch (e) {
      console.error('Error fetching testimonials:', e);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get('/careers');
      setJobs(res.data);
    } catch (e) {
      console.error('Error fetching jobs:', e);
    }
  };

  // Status Handlers
  const handleResolveLead = async (id) => {
    try {
      await api.put(`/consultations/${id}`, { status: 'resolved' });
      fetchLeads();
    } catch (err) {
      alert('Failed to resolve lead: ' + err.message);
    }
  };

  const handleApproveProperty = async (id) => {
    try {
      await api.put(`/properties/${id}/approve`, { status: 'approved' });
      fetchProperties();
    } catch (err) {
      alert('Failed to approve property: ' + err.message);
    }
  };

  const handleApproveTestimonial = async (id) => {
    try {
      await api.put(`/testimonials/${id}/approve`, { status: 'approved' });
      fetchTestimonials();
    } catch (err) {
      alert('Failed to approve testimonial: ' + err.message);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Delete this property listing?')) return;
    try {
      await api.delete(`/properties/${id}`);
      fetchProperties();
    } catch (e) {
      alert('Failed to delete property');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (e) {
      alert('Failed to delete testimonial');
    }
  };

  // Submit Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/projects', {
        title: projTitle,
        description: projDesc,
        location: projLoc,
        costRange: projCost,
        timeline: projTime,
        images: [projImg || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'],
        categories: ['all', 'residential'],
        featured: projFeatured
      });
      alert('Project portfolio entry added successfully!');
      setProjTitle('');
      setProjLoc('');
      setProjCost('');
      setProjTime('');
      setProjDesc('');
      setProjImg('');
      setProjFeatured(false);
    } catch (err) {
      alert('Error creating project: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit Add Blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/blogs', {
        title: blogTitle,
        summary: blogSum,
        content: `<p>${blogCont}</p>`,
        category: blogCat,
        image: blogImg || 'https://images.unsplash.com/photo-1512403754473-27855f33d4fc?auto=format&fit=crop&w=600&q=80',
        author: blogAuthor || 'Nissi Constructions Editorial Desk',
        readTime: blogReadTime
      });
      alert('Blog article published successfully!');
      setBlogTitle('');
      setBlogSum('');
      setBlogCont('');
      setBlogImg('');
      setBlogAuthor('');
    } catch (err) {
      alert('Error creating blog: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit Add Job
  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/careers', {
        title: jobTitle,
        description: jobDesc,
        location: jobLoc,
        salary: jobSal,
        type: jobType,
        requirements: jobReqs.split(',').map(s => s.trim())
      });
      alert('Job listing published successfully!');
      setJobTitle('');
      setJobDesc('');
      setJobReqs('');
      fetchJobs();
    } catch (err) {
      alert('Error creating job opening: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Admin Title Banner */}
      <section style={{ background: '#040710', borderBottom: '1px solid var(--border-glass)', padding: '30px 5%' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: 'rgba(212,175,55,0.1)', padding: '12px', borderRadius: '10px', color: 'var(--accent-gold)' }}>
              <Shield size={28} />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', color: 'white' }}>Nissi Constructions Admin Panel</h1>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Authorized personnel login session</span>
            </div>
          </div>
          <button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth-changed'));
            navigate('/');
          }} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </section>

      {/* Main dashboard columns */}
      <section className="section" style={{ flexGrow: 1, paddingTop: '30px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px', alignItems: 'start' }}>
          
          {/* Tab Sidebar */}
          <div className="glass-card" style={{ padding: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <button
                onClick={() => setActiveTab('leads')}
                style={{
                  background: activeTab === 'leads' ? 'var(--accent-gold)' : 'transparent',
                  color: activeTab === 'leads' ? 'var(--primary-dark)' : 'var(--text-light)',
                  border: 'none', padding: '12px 15px', borderRadius: '8px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <Users size={16} /> Leads ({leads.length})
              </button>

              <button
                onClick={() => setActiveTab('properties')}
                style={{
                  background: activeTab === 'properties' ? 'var(--accent-gold)' : 'transparent',
                  color: activeTab === 'properties' ? 'var(--primary-dark)' : 'var(--text-light)',
                  border: 'none', padding: '12px 15px', borderRadius: '8px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <Home size={16} /> Properties Directory
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                style={{
                  background: activeTab === 'testimonials' ? 'var(--accent-gold)' : 'transparent',
                  color: activeTab === 'testimonials' ? 'var(--primary-dark)' : 'var(--text-light)',
                  border: 'none', padding: '12px 15px', borderRadius: '8px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <Star size={16} /> Client Testimonials
              </button>

              <button
                onClick={() => setActiveTab('add-project')}
                style={{
                  background: activeTab === 'add-project' ? 'var(--accent-gold)' : 'transparent',
                  color: activeTab === 'add-project' ? 'var(--primary-dark)' : 'var(--text-light)',
                  border: 'none', padding: '12px 15px', borderRadius: '8px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <Award size={16} /> Add Portfolio Project
              </button>

              <button
                onClick={() => setActiveTab('add-blog')}
                style={{
                  background: activeTab === 'add-blog' ? 'var(--accent-gold)' : 'transparent',
                  color: activeTab === 'add-blog' ? 'var(--primary-dark)' : 'var(--text-light)',
                  border: 'none', padding: '12px 15px', borderRadius: '8px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <FileText size={16} /> Add Blog Post
              </button>

              <button
                onClick={() => setActiveTab('add-job')}
                style={{
                  background: activeTab === 'add-job' ? 'var(--accent-gold)' : 'transparent',
                  color: activeTab === 'add-job' ? 'var(--primary-dark)' : 'var(--text-light)',
                  border: 'none', padding: '12px 15px', borderRadius: '8px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <Briefcase size={16} /> Add Job Vacancy
              </button>
            </div>
          </div>

          {/* Main Dashboard Window */}
          <div className="glass-card" style={{ padding: '35px' }}>
            
            {/* 1. Leads Table */}
            {activeTab === 'leads' && (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Consultation & Booking Leads</h3>
                {leads.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No leads submitted yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--accent-gold)' }}>
                          <th style={{ padding: '12px' }}>Applicant</th>
                          <th style={{ padding: '12px' }}>Contact</th>
                          <th style={{ padding: '12px' }}>Service Type</th>
                          <th style={{ padding: '12px' }}>Query Message</th>
                          <th style={{ padding: '12px' }}>Status</th>
                          <th style={{ padding: '12px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map(lead => (
                          <tr key={lead._id} style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-light)' }}>
                            <td style={{ padding: '12px' }}>{lead.name || 'Anonymous'}</td>
                            <td style={{ padding: '12px' }}>
                              {lead.phone}<br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.email}</span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                                {lead.serviceType}
                              </span>
                            </td>
                            <td style={{ padding: '12px', maxWidth: '250px' }}>{lead.message || '-'}</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{
                                color: lead.status === 'resolved' ? '#10B981' : '#F59E0B',
                                fontWeight: 'bold'
                              }}>
                                {lead.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              {lead.status === 'pending' && (
                                <button onClick={() => handleResolveLead(lead._id)} className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                  Resolve
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 2. Properties Verification */}
            {activeTab === 'properties' && (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Marketplace Listings Review</h3>
                {properties.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No properties in database.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--accent-gold)' }}>
                          <th style={{ padding: '12px' }}>Property Title</th>
                          <th style={{ padding: '12px' }}>Location / Specs</th>
                          <th style={{ padding: '12px' }}>Owner Details</th>
                          <th style={{ padding: '12px' }}>Price</th>
                          <th style={{ padding: '12px' }}>Status</th>
                          <th style={{ padding: '12px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map(p => (
                          <tr key={p._id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                            <td style={{ padding: '12px' }}>{p.title}</td>
                            <td style={{ padding: '12px' }}>
                              {p.city} ({p.type})<br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Area: {p.area}</span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              {p.ownerName}<br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.ownerPhone}</span>
                            </td>
                            <td style={{ padding: '12px' }}>₹{p.price.toLocaleString()}</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ color: p.status === 'approved' ? '#10B981' : '#F59E0B', fontWeight: 'bold' }}>
                                {p.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {p.status === 'pending' && (
                                  <button onClick={() => handleApproveProperty(p._id)} className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                    Approve
                                  </button>
                                )}
                                <button onClick={() => handleDeleteProperty(p._id)} className="btn btn-secondary" style={{ padding: '4px 8px', color: '#EF4444' }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 3. Testimonials Verification */}
            {activeTab === 'testimonials' && (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Client Reviews Approval</h3>
                {testimonials.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No testimonials in database.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--accent-gold)' }}>
                          <th style={{ padding: '12px' }}>Client</th>
                          <th style={{ padding: '12px' }}>Review Text</th>
                          <th style={{ padding: '12px' }}>Rating</th>
                          <th style={{ padding: '12px' }}>Status</th>
                          <th style={{ padding: '12px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonials.map(t => (
                          <tr key={t._id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                            <td style={{ padding: '12px' }}>
                              {t.clientName}<br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.designation}</span>
                            </td>
                            <td style={{ padding: '12px', maxWidth: '300px' }}>{t.text}</td>
                            <td style={{ padding: '12px' }}>{t.rating} Stars</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ color: t.status === 'approved' ? '#10B981' : '#F59E0B', fontWeight: 'bold' }}>
                                {t.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {t.status === 'pending' && (
                                  <button onClick={() => handleApproveTestimonial(t._id)} className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                    Approve
                                  </button>
                                )}
                                <button onClick={() => handleDeleteTestimonial(t._id)} className="btn btn-secondary" style={{ padding: '4px 8px', color: '#EF4444' }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 4. Add Portfolio Project Form */}
            {activeTab === 'add-project' && (
              <form onSubmit={handleAddProject}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Create Portfolio Project</h3>
                
                <div className="form-group">
                  <label className="form-label">Project Title</label>
                  <input type="text" className="form-control" required placeholder="e.g. Marina Blue Duplex Villas" value={projTitle} onChange={(e) => setProjTitle(e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" required placeholder="e.g. Rushikonda, Vizag" value={projLoc} onChange={(e) => setProjLoc(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cost Range</label>
                    <input type="text" className="form-control" required placeholder="e.g. ₹1.8 Cr - ₹2.5 Cr" value={projCost} onChange={(e) => setProjCost(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Timeline (Duration)</label>
                    <input type="text" className="form-control" required placeholder="e.g. 14 Months" value={projTime} onChange={(e) => setProjTime(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Image URL</label>
                    <input type="text" className="form-control" placeholder="https://..." value={projImg} onChange={(e) => setProjImg(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Description</label>
                  <textarea className="form-control" rows="4" required placeholder="Detail the structural components, sand depth, flooring types..." value={projDesc} onChange={(e) => setProjDesc(e.target.value)}></textarea>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="projFeatured" checked={projFeatured} onChange={(e) => setProjFeatured(e.target.checked)} style={{ cursor: 'pointer' }} />
                  <label htmlFor="projFeatured" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>Feature on Home Page</label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={loading}>
                  {loading ? 'Creating...' : 'Save & Publish Portfolio Project'}
                </button>
              </form>
            )}

            {/* 5. Add Blog Post Form */}
            {activeTab === 'add-blog' && (
              <form onSubmit={handleAddBlog}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Write New Blog Article</h3>
                
                <div className="form-group">
                  <label className="form-label">Article Title</label>
                  <input type="text" className="form-control" required placeholder="e.g. Understanding Concrete Slump Cube Test Strengths" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-control" value={blogCat} onChange={(e) => setBlogCat(e.target.value)}>
                      <option value="Construction Tips">Construction Tips</option>
                      <option value="Home Design">Home Design</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Investment Guides">Investment Guides</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Author Name</label>
                    <input type="text" className="form-control" placeholder="e.g. Er. K. Suresh Kumar" value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Brief Summary</label>
                  <input type="text" className="form-control" required placeholder="A short 1-sentence teaser summarizing the article" value={blogSum} onChange={(e) => setBlogSum(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input type="text" className="form-control" placeholder="https://..." value={blogImg} onChange={(e) => setBlogImg(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Article Content</label>
                  <textarea className="form-control" rows="6" required placeholder="Write the full blog post text..." value={blogCont} onChange={(e) => setBlogCont(e.target.value)}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={loading}>
                  {loading ? 'Publishing...' : 'Publish Blog Post'}
                </button>
              </form>
            )}

            {/* 6. Add Job Vacancy Form */}
            {activeTab === 'add-job' && (
              <div>
                <form onSubmit={handleAddJob} style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Create Job Listing</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input type="text" className="form-control" required placeholder="e.g. Senior Structural AutoCAD Draftsman" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input type="text" className="form-control" required value={jobLoc} onChange={(e) => setJobLoc(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Salary Details</label>
                      <input type="text" className="form-control" required value={jobSal} onChange={(e) => setJobSal(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Job Type</label>
                    <select className="form-control" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                      <option value="Full Time">Full Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Consultant">Consultant</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Requirements (Comma separated)</label>
                    <input type="text" className="form-control" required placeholder="3+ Years exp, AutoCAD certified, Concrete load calculations" value={jobReqs} onChange={(e) => setJobReqs(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Job Description / Scope</label>
                    <textarea className="form-control" rows="3" required placeholder="Describe responsibilities and site details..." value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={loading}>
                    {loading ? 'Creating...' : 'Publish Job Listing'}
                  </button>
                </form>

                {/* Job Candidate submissions panel */}
                <h4 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Review Job Candidate Profiles</h4>
                {jobs.map(job => (
                  <div key={job._id} style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px'
                  }}>
                    <h5 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{job.title} ({job.applications ? job.applications.length : 0} Candidates)</h5>
                    
                    {(!job.applications || job.applications.length === 0) ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No candidate applications received yet.</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        {job.applications.map((app, index) => (
                          <div key={index} style={{
                            background: 'rgba(255,255,255,0.02)',
                            padding: '15px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-glass)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div>
                              <strong style={{ color: 'white' }}>{app.applicantName}</strong><br />
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                Tel: {app.applicantPhone} | Email: {app.applicantEmail}
                              </span>
                            </div>
                            <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-gold-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                              <Download size={14} /> Download CV
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
