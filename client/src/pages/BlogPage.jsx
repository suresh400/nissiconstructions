import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Calendar, User, Clock, ArrowRight, X } from 'lucide-react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'Construction Tips', name: 'Construction Tips' },
    { id: 'Home Design', name: 'Home Design' },
    { id: 'Architecture', name: 'Architecture' },
    { id: 'Investment Guides', name: 'Investment Guides' }
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blogs');
      setBlogs(res.data);
      setFilteredBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(b => b.category === catId));
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
          <span className="section-tag">Insights & Advice</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Nissi Constructions Engineering Blog</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Discover tips on concrete ratios, smart layouts, structural designs, and real estate investment yields in coastal India.
          </p>
        </div>
      </section>

      {/* Blogs Showcase */}
      <section className="section">
        <div className="container">
          {/* Category Tabs */}
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

          {/* Blogs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {filteredBlogs.map(blog => (
              <div key={blog._id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                
                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-gold)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    display: 'inline-block'
                  }}>
                    {blog.category}
                  </span>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', minHeight: '60px' }}>{blog.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.6' }}>
                    {blog.summary}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid var(--border-glass)',
                    paddingTop: '15px',
                    marginTop: 'auto'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {blog.readTime}
                    </span>
                  </div>

                  <button 
                    onClick={() => setSelectedBlog(blog)} 
                    className="btn btn-secondary" 
                    style={{ width: '100%', marginTop: '15px', padding: '10px', fontSize: '0.85rem' }}
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="modal-overlay">
          <div className="modal-content glass-card" style={{ maxWidth: '750px', padding: '40px' }}>
            <button className="modal-close" onClick={() => setSelectedBlog(null)}>
              <X size={20} />
            </button>

            <span style={{
              fontSize: '0.75rem',
              color: 'var(--accent-gold)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '10px',
              display: 'inline-block'
            }}>
              {selectedBlog.category}
            </span>

            <h3 style={{ fontSize: '2.2rem', marginBottom: '15px', lineHeight: '1.2' }}>{selectedBlog.title}</h3>

            <div style={{
              display: 'flex',
              gap: '20px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: '25px',
              borderBottom: '1px solid var(--border-glass)',
              paddingBottom: '15px'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <User size={14} /> {selectedBlog.author}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} /> {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> {selectedBlog.readTime}
              </span>
            </div>

            <img 
              src={selectedBlog.image} 
              alt={selectedBlog.title} 
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', marginBottom: '30px', border: '1px solid var(--border-glass)' }}
            />

            {/* Rich content rendering */}
            <div 
              style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '1.05rem' }}
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
