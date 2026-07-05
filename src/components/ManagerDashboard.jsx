import React, { useState } from 'react';
import { ChefHat, ShieldCheck, ClipboardCheck, MessageSquare, AlertOctagon, HelpCircle } from 'lucide-react';

export default function ManagerDashboard({ 
  chefs, 
  recordTasteTest, 
  complaints, 
  resolveComplaint 
}) {
  const [selectedChefId, setSelectedChefId] = useState('');
  const [param1, setParam1] = useState(8);
  const [param2, setParam2] = useState(9);
  const [param3, setParam3] = useState(8);
  const [param4, setParam4] = useState(7);
  const [param5, setParam5] = useState(8);
  const [overallTasteScore, setOverallTasteScore] = useState(8);
  const [testResult, setTestResult] = useState(null);

  const handleTasteSubmit = (e) => {
    e.preventDefault();
    if (!selectedChefId) return;

    // PDF Formula:
    // top 5 parameters score = average of top 5 (out of 10) * 5 (scales to 50 max)
    // overall score = overall taste (out of 10) * 5 (scales to 50 max)
    // Curry rating = (top5 + overall) / 2
    const paramsSum = param1 + param2 + param3 + param4 + param5;
    const top5Average = paramsSum / 5;
    const top5Score = top5Average * 5; // e.g. 8 * 5 = 40
    const overallScore = overallTasteScore * 5; // e.g. 9 * 5 = 45
    const finalRating = (top5Score + overallScore) / 2; // (40 + 45)/2 = 42.5

    recordTasteTest(parseInt(selectedChefId), finalRating);
    setTestResult({
      chefName: chefs.find(c => c.id === parseInt(selectedChefId))?.name,
      top5Score,
      overallScore,
      finalRating
    });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
      
      {/* Left Main Dashboard */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Unit Manager Console</h2>
            <p style={{ color: 'var(--text-muted)' }}>Perform 1-spoon taste inspections, manage local home chefs, and resolve neighbor complaints.</p>
          </div>
          <span className="badge badge-warning" style={{ padding: '0.4rem 1rem' }}>
            🏢 Unit #1 Manager
          </span>
        </div>

        {/* 1-Spoon Taste Test Input */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-bright)' }}>
            <ClipboardCheck style={{ color: 'var(--color-primary)' }} /> Record 1-Spoon Taste Test
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Inspect food batches at 9:30 AM before delivery starts. Grade 5 taste parameters (Spice, Salt, Masala, Oil, Texture) and rate the Overall Taste.
          </p>

          <form onSubmit={handleTasteSubmit} className="grid-2">
            <div>
              <div className="form-group">
                <label className="form-label">Select Chef to Audit</label>
                <select 
                  className="form-control" 
                  value={selectedChefId} 
                  onChange={(e) => setSelectedChefId(e.target.value)}
                  required
                >
                  <option value="">-- Choose Chef --</option>
                  {chefs.map(chef => (
                    <option key={chef.id} value={chef.id}>Chef {chef.name} (Current rating: {chef.rating.toFixed(1)})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🌶️ Spice Level (1-10)</span>
                  <input type="number" min="1" max="10" value={param1} onChange={e => setParam1(parseInt(e.target.value))} style={{ width: '60px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-bright)', padding: '0.25rem', borderRadius: '6px', textAlign: 'center', outline: 'none', fontWeight: 'bold' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🧂 Salt Balance (1-10)</span>
                  <input type="number" min="1" max="10" value={param2} onChange={e => setParam2(parseInt(e.target.value))} style={{ width: '60px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-bright)', padding: '0.25rem', borderRadius: '6px', textAlign: 'center', outline: 'none', fontWeight: 'bold' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🌿 Masala Balance (1-10)</span>
                  <input type="number" min="1" max="10" value={param3} onChange={e => setParam3(parseInt(e.target.value))} style={{ width: '60px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-bright)', padding: '0.25rem', borderRadius: '6px', textAlign: 'center', outline: 'none', fontWeight: 'bold' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🛢️ Oil correctness (1-10)</span>
                  <input type="number" min="1" max="10" value={param4} onChange={e => setParam4(parseInt(e.target.value))} style={{ width: '60px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-bright)', padding: '0.25rem', borderRadius: '6px', textAlign: 'center', outline: 'none', fontWeight: 'bold' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🍲 Overall Taste (1-10)</span>
                  <input type="number" min="1" max="10" value={param5} onChange={e => setParam5(parseInt(e.target.value))} style={{ width: '60px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-bright)', padding: '0.25rem', borderRadius: '6px', textAlign: 'center', outline: 'none', fontWeight: 'bold' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '1rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 'bold' }}>⭐ Overall Taste Score (out of 10)</label>
                <input 
                  type="range" min="1" max="10" 
                  value={overallTasteScore} 
                  onChange={e => setOverallTasteScore(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Score: {overallTasteScore}/10</span>
              </div>

              {testResult && (
                <div className="glass-panel animate-fade-in-up" style={{ padding: '0.75rem 1rem', background: 'var(--color-gold-light)', border: '1px solid rgba(233, 196, 106, 0.4)', fontSize: '0.85rem', margin: '1rem 0', boxShadow: 'none' }}>
                  <h4 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>Audit Logged:</h4>
                  <div>Chef: <strong>{testResult.chefName}</strong></div>
                  <div>Top 5 parameters score: <strong>{testResult.top5Score} / 50</strong></div>
                  <div>Overall rating score: <strong>{testResult.overallScore} / 50</strong></div>
                  <div style={{ marginTop: '0.25rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.25rem' }}>
                    Calculated Curry Rating: <strong style={{ color: 'var(--color-secondary)' }}>{testResult.finalRating.toFixed(1)} / 50</strong>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                Save Taste test
              </button>
            </div>
          </form>
        </div>

        {/* Local Chefs Grid */}
        <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-bright)' }}>👨‍🍳 Neighborhood Chefs Enrolled</h3>
          <div className="grid-2">
            {chefs.map(chef => (
              <div key={chef.id} style={{
                padding: '1rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>{chef.name.charAt(0)}</div>
                
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-bright)' }}>Chef {chef.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Curry Rating: <strong style={{ color: 'var(--color-secondary)' }}>{chef.rating.toFixed(1)}/50</strong></p>
                </div>
                
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Quality Complaints */}
      <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content', backgroundColor: 'var(--bg-card)' }}>
        <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-bright)' }}>
          <AlertOctagon style={{ color: 'var(--color-secondary)' }} /> Neighborhood Complaints
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Track issues reported by local households. Managers must contact chefs to address complaints.
        </p>

        {complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={36} style={{ color: 'var(--color-primary)', margin: '0 auto 0.75rem' }} />
            <p style={{ fontSize: '0.85rem' }}>All clear! No open complaints.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {complaints.map(comp => (
              <div key={comp.id} style={{
                background: 'var(--color-secondary-light)',
                border: '1px solid rgba(223, 122, 94, 0.2)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--color-secondary)' }}>{comp.type}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comp.time}</span>
                </div>
                <p style={{ marginBottom: '0.5rem', color: 'var(--text-bright)', fontWeight: 500 }}>"{comp.text}"</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Chef: <strong>{comp.chef}</strong> | Dish: <strong>{comp.dish}</strong>
                </div>
                
                <button 
                  onClick={() => resolveComplaint(comp.id)}
                  className="btn btn-secondary" 
                  style={{ width: '100%', fontSize: '0.75rem', padding: '0.3rem', borderRadius: '4px' }}
                >
                  Mark Resolved
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
