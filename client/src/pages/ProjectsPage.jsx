import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { Calendar, Tag, MapPin, IndianRupee, Hourglass, X } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'ongoing', name: 'Ongoing' },
    { id: 'completed', name: 'Completed' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'villas', name: 'Villas' },
    { id: 'renovations', name: 'Renovations' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
        setFilteredProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.categories.includes(catId)));
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
          <span className="section-tag">Corporate Portfolio</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Our Construction Projects</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Browse through our residential, commercial, villa, and renovation landmarks, demonstrating our commitment to concrete rigidity and luxury.
          </p>
        </div>
      </section>

      {/* Projects Portfolio Section */}
      <section className="section">
        <div className="container">
          {/* Category Filter bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '50px'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  background: activeCategory === cat.id ? 'var(--accent-gold)' : '#ffffff',
                  color: activeCategory === cat.id ? '#ffffff' : 'var(--text-light)',
                  border: activeCategory === cat.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-glass)',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: activeCategory === cat.id ? '600' : '400',
                  transition: 'var(--transition)'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {filteredProjects.map(project => (
              <div key={project._id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {project.beforeAfter && project.beforeAfter.before && project.beforeAfter.after ? (
                  <BeforeAfterSlider 
                    beforeImage={project.beforeAfter.before} 
                    afterImage={project.beforeAfter.after} 
                  />
                ) : (
                  <img 
                    src={project.images[0] || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'} 
                    alt={project.title} 
                    style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                  />
                )}

                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {project.categories.map((c, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        background: 'rgba(212,175,55,0.1)',
                        color: 'var(--accent-gold)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        fontWeight: '600'
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{project.title}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '15px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={14} className="accent-gold" style={{ color: 'var(--accent-gold)' }} />
                      <span>{project.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IndianRupee size={14} className="accent-gold" style={{ color: 'var(--accent-gold)' }} />
                      <span>{project.costRange}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Hourglass size={14} className="accent-gold" style={{ color: 'var(--accent-gold)' }} />
                      <span>{project.timeline}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedProject(project)} 
                    className="btn btn-secondary" 
                    style={{ width: '100%', marginTop: 'auto', padding: '10px' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content glass-card" style={{ maxWidth: '700px', padding: '40px' }}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X size={20} />
            </button>

            <span style={{
              fontSize: '0.75rem',
              background: 'rgba(212,175,55,0.1)',
              color: 'var(--accent-gold)',
              padding: '4px 10px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontWeight: '600',
              display: 'inline-block',
              marginBottom: '10px'
            }}>
              {selectedProject.categories.join(' | ')}
            </span>

            <h3 style={{ fontSize: '2rem', marginBottom: '5px' }}>{selectedProject.title}</h3>
            <p style={{ color: 'var(--accent-gold)', fontSize: '0.95rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={16} /> {selectedProject.location}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'var(--secondary-dark)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Project Cost / Budget Range</span>
                <span style={{ fontSize: '1.15rem', color: 'var(--white)', fontWeight: 'bold' }}>{selectedProject.costRange}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Contract Timeline</span>
                <span style={{ fontSize: '1.15rem', color: 'var(--white)', fontWeight: 'bold' }}>{selectedProject.timeline}</span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '30px' }}>
              {selectedProject.description}
            </p>

            {/* Slider or Single/Multiple Images */}
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--accent-gold)' }}>Visual Gallery</h4>
              {selectedProject.beforeAfter && selectedProject.beforeAfter.before && selectedProject.beforeAfter.after ? (
                <div style={{ marginBottom: '20px' }}>
                  <BeforeAfterSlider 
                    beforeImage={selectedProject.beforeAfter.before} 
                    afterImage={selectedProject.beforeAfter.after} 
                  />
                  <span style={{ display: 'block', textCombineUpright: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px', textAlign: 'center' }}>
                    Drag the slider to compare before (excavation/original) and after (completed building)
                  </span>
                </div>
              ) : null}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '15px' }}>
                {selectedProject.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Gallery ${idx}`} 
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-glass)' }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
