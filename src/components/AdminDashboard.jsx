import React, { useState } from 'react';
import { BarChart3, TrendingUp, Info, Trash2, ArrowUpRight, Scale } from 'lucide-react';

export default function AdminDashboard({ menu, activeOrders, ratingHistory }) {
  const [selectedUnit, setSelectedUnit] = useState('Unit #1');

  // Simple analytics stats
  const totalSalesFromOrders = activeOrders.reduce((acc, order) => acc + order.total, 0);
  const baseSales = 24800;
  const totalSales = baseSales + totalSalesFromOrders;

  const baseOrders = 62;
  const totalOrders = baseOrders + activeOrders.length;

  const avgRating = ratingHistory.length > 0
    ? ratingHistory.reduce((acc, r) => acc + r.score, 0) / ratingHistory.length
    : 44.5;

  // Render SVG charts
  const salesData = [12000, 15000, 18200, 21000, 24800, totalSales];
  const maxSales = Math.max(...salesData);
  const chartHeight = 120;
  const chartWidth = 420;

  return (
    <div className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Admin Analytics Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Corporate overview of unit performance, waste logs, and micro-unit economics.</p>
        </div>
        
        <select 
          className="form-control" 
          value={selectedUnit} 
          onChange={(e) => setSelectedUnit(e.target.value)}
          style={{ width: '220px', cursor: 'pointer' }}
        >
          <option value="Unit #1">Unit #1 (Madhapur)</option>
          <option value="Unit #2">Unit #2 (Gachibowli)</option>
          <option value="Unit #3">Unit #3 (Kondapur)</option>
        </select>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="metric-header">
            <span>Total Sales</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>₹</span>
          </div>
          <div className="metric-value">₹{totalSales.toLocaleString()}</div>
          <span className="metric-change up">
            <ArrowUpRight size={14} /> +12.4% vs last week
          </span>
        </div>

        <div className="glass-panel metric-card" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="metric-header">
            <span>Total Orders</span>
            <TrendingUp size={16} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="metric-value">{totalOrders}</div>
          <span className="metric-change up">
            <ArrowUpRight size={14} /> +8.2% vs last week
          </span>
        </div>

        <div className="glass-panel metric-card" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="metric-header">
            <span>Avg Curry Score</span>
            <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>⭐</span>
          </div>
          <div className="metric-value">{avgRating.toFixed(1)}/50</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>
            Based on taste test & customer reviews
          </span>
        </div>

        <div className="glass-panel metric-card" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="metric-header">
            <span>Waste Tracked</span>
            <Trash2 size={16} style={{ color: 'var(--color-danger)' }} />
          </div>
          <div className="metric-value">4.2 <span style={{ fontSize: '1rem', fontWeight: 400 }}>kg</span></div>
          <span className="metric-change down" style={{ color: 'var(--color-secondary)' }}>
            📉 -15% reduction this week
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        
        {/* Sales & Orders Chart Panel */}
        <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-bright)' }}>
            <BarChart3 size={18} style={{ color: 'var(--color-primary)' }} /> Sales Growth Trend (Daily)
          </h3>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
            <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="var(--border-color)" strokeWidth="1" />
              <line x1="0" y1={chartHeight/2} x2={chartWidth} y2={chartHeight/2} stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
              <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />

              {/* Data bars */}
              {salesData.map((val, idx) => {
                const barWidth = 40;
                const barSpacing = (chartWidth - (barWidth * salesData.length)) / (salesData.length - 1);
                const x = idx * (barWidth + barSpacing);
                const barHeight = (val / maxSales) * (chartHeight - 20);
                const y = chartHeight - barHeight;

                return (
                  <g key={idx}>
                    <rect 
                      x={x} 
                      y={y} 
                      width={barWidth} 
                      height={barHeight} 
                      rx="4"
                      fill="url(#barGradient)"
                      style={{ transition: 'all 0.5s ease-out' }}
                    />
                    <text 
                      x={x + barWidth/2} 
                      y={y - 8} 
                      fill="var(--text-bright)" 
                      fontSize="9" 
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ₹{Math.round(val/100)/10}k
                    </text>
                    <text 
                      x={x + barWidth/2} 
                      y={chartHeight + 15} 
                      fill="var(--text-muted)" 
                      fontSize="9" 
                      textAnchor="middle"
                    >
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Today'][idx]}
                    </text>
                  </g>
                );
              })}

              {/* Gradients */}
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-secondary)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Unit Economics Panel */}
        <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-bright)' }}>
            <Scale size={18} style={{ color: 'var(--color-secondary)' }} /> Unit Economics Breakdown
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Standard financial model for a batch of <strong>Thotakura Curry</strong> (400rs total sales):
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-main)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-bright)' }}>🛒 Total Sales (Batch value)</span>
              <strong style={{ color: 'var(--color-primary)' }}>₹400</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>👨‍🍳 Payment to Chef</span>
              <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>-₹300</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>🥕 Raw Veg & Tomato Cost (Chef Expense)</span>
              <span style={{ color: 'var(--text-muted)' }}>-₹200</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>🛢️ Oil Cost (Chef Expense)</span>
              <span style={{ color: 'var(--text-muted)' }}>-₹10</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', padding: '0.75rem 0.75rem 0.25rem', fontWeight: 'bold' }}>
              <span style={{ color: 'var(--text-bright)' }}>🏢 Unit Retained Balance</span>
              <span style={{ color: 'var(--color-secondary)' }}>₹100</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>• Unit team pay (40%)</span>
                <span>₹40</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>• Unit maintenance (30%)</span>
                <span>₹30</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>• Platform cost (20%)</span>
                <span>₹20</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>• Net unit profit (10%)</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>₹10 (small profit)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Product Standard Matrix and Waste logs */}
      <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-bright)' }}>
          <Info size={18} /> PPK Product Standards & Waste Log
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Curry Product</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Spice Level</th>
                <th style={{ padding: '0.75rem' }}>Oil Content</th>
                <th style={{ padding: '0.75rem' }}>Protein</th>
                <th style={{ padding: '0.75rem' }}>Calories</th>
                <th style={{ padding: '0.75rem' }}>Est. Weekly Waste</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((dish, idx) => {
                const wasteKgs = (idx * 0.4 + 0.2).toFixed(1);
                return (
                  <tr key={dish.id} style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-bright)' }}>{dish.name}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${dish.category === 'Veg' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>
                        {dish.category}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{dish.spiceLevel}</td>
                    <td style={{ padding: '0.75rem' }}>{dish.oil}</td>
                    <td style={{ padding: '0.75rem' }}>{dish.protein}</td>
                    <td style={{ padding: '0.75rem' }}>{dish.calories} kcal</td>
                    <td style={{ padding: '0.75rem', color: 'var(--color-secondary)', fontWeight: 600 }}>{wasteKgs} kg</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
