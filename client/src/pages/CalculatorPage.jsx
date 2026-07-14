import React, { useState } from 'react';
import { Calculator, FileText, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

const CalculatorPage = () => {
  const [calcType, setCalcType] = useState('construction'); // construction, interiors, renovation
  const [plotSize, setPlotSize] = useState(1500); // sq ft
  const [floors, setFloors] = useState(1);
  const [materialQuality, setMaterialQuality] = useState('premium'); // standard, premium, luxury

  // Rates definition per sq ft
  const rates = {
    construction: {
      standard: 1650,
      premium: 2200,
      luxury: 3200
    },
    interiors: {
      standard: 450,
      premium: 850,
      luxury: 1600
    },
    renovation: {
      standard: 350,
      premium: 650,
      luxury: 1200
    }
  };

  const calculateTotal = () => {
    const rate = rates[calcType][materialQuality];
    if (calcType === 'interiors') {
      return plotSize * rate; // interiors doesn't multiply fully by floors typically or it's floor based. Let's say it is:
    }
    return plotSize * floors * rate;
  };

  const totalCost = calculateTotal();

  // Budget split approximations
  const budgetSplit = [
    { name: 'Steel & Cement Structure (RCC)', percent: 35 },
    { name: 'Bricks & Sand Masonry', percent: 12 },
    { name: 'Flooring, Stone & Marble work', percent: 13 },
    { name: 'Electrical Wiring & DB Switches', percent: 8 },
    { name: 'Plumbing Conduits & Sanitaryware', percent: 9 },
    { name: 'Teak Doors & Glazed Windows', percent: 8 },
    { name: 'Painting & False Ceilings', percent: 8 },
    { name: 'Engineering Supervision & Labor', percent: 7 }
  ];

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
      {/* Header */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--secondary-dark) 0%, var(--primary-dark) 100%)',
        textAlign: 'center',
        padding: '80px 5%'
      }}>
        <div className="container">
          <span className="section-tag">Estimations</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Cost & Budget Calculator</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Get an instant estimation of your home construction, interior design, or renovation project budget using current local market rates.
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="section">
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Inputs Section */}
          <div className="glass-card" style={{ padding: '35px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Calculator /> Calculator Inputs
            </h3>

            {/* Project Type */}
            <div className="form-group">
              <label className="form-label">Calculation Goal</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setCalcType('construction')}
                  style={{
                    flex: 1,
                    background: calcType === 'construction' ? 'var(--accent-gold)' : 'var(--primary-dark)',
                    color: calcType === 'construction' ? '#ffffff' : 'var(--text-light)',
                    border: '1px solid var(--border-glass)',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  House Construction
                </button>
                <button
                  onClick={() => setCalcType('interiors')}
                  style={{
                    flex: 1,
                    background: calcType === 'interiors' ? 'var(--accent-gold)' : 'var(--primary-dark)',
                    color: calcType === 'interiors' ? '#ffffff' : 'var(--text-light)',
                    border: '1px solid var(--border-glass)',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  Interior Design
                </button>
                <button
                  onClick={() => setCalcType('renovation')}
                  style={{
                    flex: 1,
                    background: calcType === 'renovation' ? 'var(--accent-gold)' : 'var(--primary-dark)',
                    color: calcType === 'renovation' ? '#ffffff' : 'var(--text-light)',
                    border: '1px solid var(--border-glass)',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  Renovation Work
                </button>
              </div>
            </div>

            {/* Area Slider */}
            <div className="form-group" style={{ marginTop: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label">Total Built-up Area</label>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{plotSize} Sq Ft</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="50"
                value={plotSize}
                onChange={(e) => setPlotSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>500 sq ft</span>
                <span>10,000 sq ft</span>
              </div>
            </div>

            {/* Floors Selector */}
            {calcType !== 'interiors' && (
              <div className="form-group" style={{ marginTop: '25px' }}>
                <label className="form-label">Number of Floors</label>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {[1, 2, 3, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => setFloors(num)}
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        background: floors === num ? 'var(--accent-gold)' : 'var(--primary-dark)',
                        color: floors === num ? '#ffffff' : 'var(--text-light)',
                        border: '1px solid var(--border-glass)',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      G+{num - 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material Quality Class */}
            <div className="form-group" style={{ marginTop: '25px' }}>
              <label className="form-label">Material & Finishing Quality</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  onClick={() => setMaterialQuality('standard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    borderRadius: '8px',
                    background: 'var(--primary-dark)',
                    border: `1px solid ${materialQuality === 'standard' ? 'var(--accent-gold)' : 'var(--border-glass)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1rem', color: materialQuality === 'standard' ? 'var(--accent-gold)' : 'var(--white)' }}>Standard Grade</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Finolex wires, Supreme pipes, vitrified tiles, basic teak entry door</span>
                  </div>
                  <span style={{ fontWeight: '600' }}>₹{rates[calcType].standard}/sqft</span>
                </div>

                <div
                  onClick={() => setMaterialQuality('premium')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    borderRadius: '8px',
                    background: 'var(--primary-dark)',
                    border: `1px solid ${materialQuality === 'premium' ? 'var(--accent-gold)' : 'var(--border-glass)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1rem', color: materialQuality === 'premium' ? 'var(--accent-gold)' : 'var(--white)' }}>Premium Luxury</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ultratech cement, Polycab wires, Kohler fixtures, Granite countertops</span>
                  </div>
                  <span style={{ fontWeight: '600' }}>₹{rates[calcType].premium}/sqft</span>
                </div>

                <div
                  onClick={() => setMaterialQuality('luxury')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    borderRadius: '8px',
                    background: 'var(--primary-dark)',
                    border: `1px solid ${materialQuality === 'luxury' ? 'var(--accent-gold)' : 'var(--border-glass)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1rem', color: materialQuality === 'luxury' ? 'var(--accent-gold)' : 'var(--white)' }}>Ultra Custom Royal</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Italian marble, custom teak carpentry, smart automation, VRF HVAC</span>
                  </div>
                  <span style={{ fontWeight: '600' }}>₹{rates[calcType].luxury}/sqft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="glass-card" style={{ padding: '35px', borderLeft: '4px solid var(--accent-gold)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText className="accent-gold" style={{ color: 'var(--accent-gold)' }} /> Estimated Budget
            </h3>

            <div style={{
              background: 'var(--secondary-dark)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>
                Total Cost Range
              </span>
              <h2 style={{ fontSize: '2.8rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
                {formatCurrency(totalCost)}
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Based on approx rate of ₹{rates[calcType][materialQuality]} / sq ft
              </span>
            </div>

            {/* Visual breakdown lists */}
            <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--accent-gold)' }}>Budget Cost Distribution</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {budgetSplit.map((split, index) => {
                const amount = (totalCost * split.percent) / 100;
                return (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--white)' }}>{split.name}</span>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>{split.percent}% ({formatCurrency(amount)})</span>
                    </div>
                    {/* Visual bar */}
                    <div style={{ width: '100%', height: '5px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${split.percent}%`, height: '100%', background: 'var(--accent-gold)' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: '35px',
              padding: '20px',
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6'
            }}>
              <strong>* Disclaimer:</strong> These estimates are calculated using standard regional rates in Andhra Pradesh. Final rates may vary depending on municipal authorizations, site access limits, and brand customizations.
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CalculatorPage;
