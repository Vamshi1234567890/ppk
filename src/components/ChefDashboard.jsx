import React, { useState } from 'react';
import { ChefHat, CheckCircle2, ShieldCheck, Sparkles, Upload, AlertTriangle, Star } from 'lucide-react';

export default function ChefDashboard({ 
  chefProfile, 
  menu, 
  toggleChefDish, 
  activeOrders, 
  advanceOrderStatus 
}) {
  const [kitchenVerified, setKitchenVerified] = useState(false);
  const [cleanlinessScore, setCleanlinessScore] = useState(null);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  // Simulated AI scanning
  const startCleanlinessScan = (simulatedScore) => {
    setIsScanning(true);
    setUploadedImage('/chef_kitchen.png');
    setScanStatus('Analyzing kitchen workspace layout...');
    
    setTimeout(() => {
      setScanStatus('Checking floor hygiene & countertop sterilization...');
      setTimeout(() => {
        setScanStatus('Running object detection on kitchen tools & storage containers...');
        setTimeout(() => {
          setIsScanning(false);
          setCleanlinessScore(simulatedScore);
          setKitchenVerified(true);
          
          let reward = 0;
          if (simulatedScore >= 90) {
            reward = 100;
          } else if (simulatedScore >= 80) {
            reward = 90;
          } else {
            reward = 0;
          }
          setRewardAmount(reward);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // Count chef's orders
  const chefOrders = activeOrders.filter(order => 
    order.items.some(item => {
      return true; // Cook all orders for demonstration
    })
  );

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>
      
      {/* Left Main Console */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Chef Operations Center</h2>
            <p style={{ color: 'var(--text-muted)' }}>Manage your daily cooking menu, handle active orders, and run hygiene scans.</p>
          </div>
          <span className="badge badge-success" style={{ padding: '0.4rem 1rem' }}>
            🟢 Active & Verified
          </span>
        </div>

        {/* AI Cleanliness Scanning Hub */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem', border: '1px solid rgba(43, 81, 56, 0.2)', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-bright)' }}>
            <Sparkles style={{ color: 'var(--color-primary)' }} /> AI Kitchen Hygiene Scan
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Upload your kitchen setup photo daily. Our deep learning model grades kitchen cleanliness. 
            Scores <strong>&gt;90</strong> earn a <strong>₹100 reward</strong>, scores <strong>80-90</strong> earn <strong>₹90</strong>. Scores <strong>&lt;50</strong> blacklist your kitchen.
          </p>

          <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
            <div style={{
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem 1rem',
              textAlign: 'center',
              background: 'var(--bg-main)',
              position: 'relative',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}>
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Kitchen Scan" 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'calc(var(--radius-md) - 2px)',
                    opacity: isScanning ? 0.4 : 1
                  }}
                />
              ) : (
                <>
                  <Upload size={36} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Simulate kitchen photo uploads</p>
                </>
              )}

              {isScanning && (
                <div style={{
                  position: 'absolute',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid var(--border-color)',
                  width: '90%',
                  padding: '1rem',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 3,
                  textAlign: 'center'
                }}>
                  <div className="spinner" style={{
                    border: '3px solid rgba(43, 81, 56, 0.1)',
                    borderTop: '3px solid var(--color-primary)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    margin: '0 auto 0.75rem',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                  `}</style>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-bright)', fontWeight: 600 }}>{scanStatus}</p>
                </div>
              )}
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-bright)' }}>Test Scan Scenarios:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  className="btn btn-secondary" 
                  disabled={isScanning}
                  onClick={() => startCleanlinessScan(94)}
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem' }}
                >
                  📸 Scan Perfect Kitchen (Score: 94)
                </button>
                <button 
                  className="btn btn-secondary" 
                  disabled={isScanning}
                  onClick={() => startCleanlinessScan(84)}
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem' }}
                >
                  📸 Scan Average Kitchen (Score: 84)
                </button>
                <button 
                  className="btn btn-secondary" 
                  disabled={isScanning}
                  onClick={() => startCleanlinessScan(42)}
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', color: 'var(--color-danger)', borderColor: 'rgba(231, 111, 81, 0.4)' }}
                >
                  ⚠️ Scan Unclean Kitchen (Score: 42)
                </button>
              </div>

              {kitchenVerified && cleanlinessScore !== null && (
                <div className="glass-panel animate-fade-in-up" style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: '8px',
                  background: cleanlinessScore >= 90 ? 'var(--color-primary-light)' : 
                              cleanlinessScore >= 80 ? 'var(--color-gold-light)' : 'var(--color-secondary-light)',
                  border: cleanlinessScore >= 90 ? '1px solid rgba(43, 81, 56, 0.3)' : 
                          cleanlinessScore >= 80 ? '1px solid rgba(233, 196, 106, 0.3)' : '1px solid rgba(223, 122, 94, 0.3)',
                  boxShadow: 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--text-bright)' }}>Score: {cleanlinessScore}/100</strong>
                    <span className={`badge ${
                      cleanlinessScore >= 90 ? 'badge-success' : 
                      cleanlinessScore >= 80 ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {cleanlinessScore >= 90 ? 'Excellent' : 
                       cleanlinessScore >= 80 ? 'Good' : 'Blacklist Alert'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {cleanlinessScore >= 90 ? `🎉 Fantastic hygiene standards! You've received a ₹100 cash reward.` :
                     cleanlinessScore >= 80 ? `👍 Cleanliness meets standards. You've received a ₹90 cash reward.` :
                     `⚠️ Blacklist Warning: Score below 50. Please clean workspace immediately. No rewards.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Orders List */}
        <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-bright)' }}>
            🧑‍🍳 Kitchen Orders Queue ({chefOrders.length})
          </h3>

          {chefOrders.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>
              No active customer orders right now. Orders arrive daily between 10 AM and 1 PM.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {chefOrders.map((order) => (
                <div key={order.id} style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-bright)' }}>Order #{order.id}</strong>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>Items: {order.items.map(i => `${i.name} (${i.quantity}x)`).join(', ')}</span>
                      <span>•</span>
                      <span>Total: ₹{order.total}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={`badge ${
                      order.status === 'Delivered' ? 'badge-success' :
                      order.status === 'Ready for Pickup' ? 'badge-info' :
                      order.status === 'Cooking' ? 'badge-warning' : 'badge-primary'
                    }`} style={{ fontSize: '0.75rem' }}>
                      {order.status}
                    </span>

                    {order.status !== 'Delivered' && (
                      <button 
                        onClick={() => advanceOrderStatus(order.id)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                      >
                        Advance State
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar: Profile & Earnings */}
      <div>
        {/* Chef Bio Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-card)' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            fontWeight: 800,
            fontSize: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {chefProfile.name.charAt(0)}
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-bright)' }}>Chef {chefProfile.name}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>PPK Unit #1 • 1000 Houses Block</p>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Curry Rating</span>
              <strong style={{ color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={14} fill="var(--color-secondary)" /> {chefProfile.rating.toFixed(1)}/50
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status</span>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Enrolled</span>
            </div>
          </div>
        </div>

        {/* Financial Earnings log */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>Daily Earnings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Base Cook Payout</span>
              <strong style={{ color: 'var(--text-bright)' }}>₹{chefOrders.filter(o => o.status === 'Delivered').length * 300}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Hygiene Rewards</span>
              <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>+₹{rewardAmount}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontWeight: 'bold' }}>
              <span style={{ color: 'var(--text-bright)' }}>Total Payout</span>
              <span style={{ color: 'var(--color-secondary)', fontSize: '1.1rem' }}>₹{(chefOrders.filter(o => o.status === 'Delivered').length * 300) + rewardAmount}</span>
            </div>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
            Payouts processed daily after Curry Delivery Hour (1 PM).
          </p>
        </div>

        {/* Menu toggler */}
        <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>My Daily Cooklist</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {menu.slice(0, 5).map((dish) => (
              <div key={dish.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: dish.active ? 'var(--text-bright)' : 'var(--text-muted)', fontWeight: dish.active ? 600 : 400 }}>{dish.name}</span>
                <label className="switch" style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '36px',
                  height: '20px'
                }}>
                  <input 
                    type="checkbox" 
                    checked={dish.active !== false}
                    onChange={() => toggleChefDish(dish.id)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span className="slider" style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: dish.active !== false ? 'var(--color-primary)' : '#E6E6DF',
                    borderRadius: '20px',
                    transition: '.2s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '14px', width: '14px',
                      left: dish.active !== false ? '18px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      transition: '.2s'
                    }}></span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
