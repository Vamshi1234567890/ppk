import React, { useState } from 'react';
import { ShoppingCart, Star, Flame, Award, Heart, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';

export default function CustomerDashboard({ 
  menu, 
  cart, 
  addToCart, 
  updateCartQty, 
  removeFromCart, 
  placeOrder, 
  activeOrders, 
  advanceOrderStatus,
  submitRating,
  activeCustomer,
  setSelectedProduct,
  activeTab,
  setActiveTab
}) {
  const [ratingModalOrder, setRatingModalOrder] = useState(null);
  
  // Rating states (1-10)
  const [spiceRating, setSpiceRating] = useState(8);
  const [saltRating, setSaltRating] = useState(8);
  const [masalaRating, setMasalaRating] = useState(8);
  const [oilRating, setOilRating] = useState(8);
  const [overallTaste, setOverallTaste] = useState(8);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const renderCart = () => (
    <>
      <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>
        <ShoppingCart size={18} /> Current Order
      </h3>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '0.9rem' }}>Your shopping cart is empty.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.25rem' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-bright)' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', fontWeight: 600 }}>₹{item.price}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    style={{ background: 'var(--color-primary-light)', border: 'none', color: 'var(--color-primary)', width: '22px', height: '22px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => updateCartQty(item.id, -1)}
                  >-</button>
                  <span style={{ fontSize: '0.85rem', width: '15px', textAlign: 'center', color: 'var(--text-bright)', fontWeight: 600 }}>{item.quantity}</span>
                  <button 
                    style={{ background: 'var(--color-primary-light)', border: 'none', color: 'var(--color-primary)', width: '22px', height: '22px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => updateCartQty(item.id, 1)}
                  >+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Subtotal:</span>
              <strong style={{ fontSize: '1.2rem', color: 'var(--text-bright)' }}>₹{cartTotal}</strong>
            </div>
            
            <button 
              onClick={placeOrder}
              className="btn btn-primary" 
              style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
            >
              Place Order (10 AM - 1 PM)
            </button>
          </div>
        </div>
      )}
    </>
  );

  const openRatingModal = (order) => {
    setRatingModalOrder(order);
    // Reset scores
    setSpiceRating(8);
    setSaltRating(8);
    setMasalaRating(8);
    setOilRating(8);
    setOverallTaste(8);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    
    // PDF Formula:
    // 10 parameters (represented by our detailed ratings)
    // top 5 parameters score = average * 10 (e.g. if average of 5 is 8, score is 40)
    // Here we let user rate 5 specific parameters: Spice, Salt, Masala, Oil, and Overall Taste.
    // Let's compute:
    const top5Average = (spiceRating + saltRating + masalaRating + oilRating) / 4;
    const top5Score = top5Average * 5; // scaled to 50 max
    const overallScore = overallTaste * 5; // scaled to 50 max
    const curryRating = (top5Score + overallScore) / 2; // max 50

    submitRating(ratingModalOrder.id, curryRating, {
      spiceRating,
      saltRating,
      masalaRating,
      oilRating,
      overallTaste,
      score: curryRating
    });
    setRatingModalOrder(null);
  };

  return (
    <div className="animate-fade-in dashboard-layout-grid" style={{ '--sidebar-width': '340px' }}>
      
      {/* Main Panel */}
      <div>
        {/* Customer Context Header */}
        <div className="glass-panel profile-bar" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', backgroundColor: 'var(--color-primary-light)', border: '1px solid rgba(43, 81, 56, 0.15)', boxShadow: 'none' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logged In Customer Profile</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>{activeCustomer.name}</h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <MapPin size={16} /> <span>{activeCustomer.address}</span>
          </div>
        </div>

        <div className="dashboard-header-flex">
          <div>
            <h2 className="dashboard-title">Customer Kitchen Portal</h2>
            <p style={{ color: 'var(--text-muted)' }}>Order hot curries cooked by verified home makers in your neighborhood unit.</p>
          </div>
          
          <div className="glass-panel" style={{ display: 'flex', padding: '0.25rem', borderRadius: '30px', backgroundColor: 'var(--bg-card)' }}>
            <button 
              className={`btn ${activeTab === 'menu' ? 'btn-primary' : ''}`}
              style={{ borderRadius: '25px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', border: 'none' }}
              onClick={() => setActiveTab('menu')}
            >
              Browse Menu
            </button>
            <button 
              className={`btn ${activeTab === 'orders' ? 'btn-primary' : ''}`}
              style={{ borderRadius: '25px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', position: 'relative', border: 'none' }}
              onClick={() => setActiveTab('orders')}
            >
              My Orders
              {activeOrders.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'var(--color-secondary)',
                  color: 'white',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {activeOrders.length}
                </span>
              )}
            </button>
            <button 
              className={`btn tab-btn-cart ${activeTab === 'cart' ? 'btn-primary' : ''}`}
              style={{ borderRadius: '25px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', position: 'relative', border: 'none' }}
              onClick={() => setActiveTab('cart')}
            >
              Cart
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'var(--color-secondary)',
                  color: 'white',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'menu' && (
          <div className="grid-2">
            {menu.map((dish) => (
              <div 
                key={dish.id} 
                className="glass-panel" 
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  borderLeft: dish.category === 'Veg' ? '4px solid var(--color-success)' : '4px solid var(--color-danger)',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                <div onClick={() => setSelectedProduct(dish)} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className={`badge ${dish.category === 'Veg' ? 'badge-success' : 'badge-danger'}`}>
                      {dish.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Best with: <strong>{dish.bestWith}</strong></span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-bright)' }}>{dish.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{dish.ingredients}</p>
                  
                  {/* Detailed Product Matrix */}
                  <div className="grid-2" style={{ 
                    background: 'var(--bg-main)', 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    fontSize: '0.8rem',
                    marginBottom: '1rem',
                    gap: '0.5rem',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div>🌶️ Spice Level: <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>{dish.spiceLevel}</span></div>
                    <div>🛢️ Oil level: <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>{dish.oil}</span></div>
                    <div>🥗 Protein: <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>{dish.protein}</span></div>
                    <div>🔥 Calories: <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>{dish.calories} kcal</span></div>
                    <div style={{ gridColumn: 'span 2', fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.25rem' }}>
                      <Award size={14} /> Click card to view unit batch economics
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price per Portion</span>
                    <span style={{ fontSize: '1.4rem', color: 'var(--color-primary)', fontWeight: 800 }}>₹{dish.price}</span>
                  </div>
                  <button 
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    onClick={() => addToCart(dish)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            {activeOrders.length === 0 ? (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto 1rem', color: 'var(--color-primary-light)' }} />
                <h3>No active orders for {activeCustomer.name}</h3>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Add some fresh curries to your cart and place your order.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {activeOrders.map((order) => (
                  <div key={order.id} className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontWeight: 700, color: 'var(--text-bright)' }}>Order ID: #{order.id}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placed by: <strong>{order.customerName}</strong> at {order.time}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`badge ${
                          order.status === 'Delivered' ? 'badge-success' :
                          order.status === 'Ready for Pickup' ? 'badge-info' :
                          order.status === 'Cooking' ? 'badge-warning' : 'badge-primary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          <span>{item.name} <strong style={{ color: 'var(--color-primary)' }}>x{item.quantity}</strong></span>
                          <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total paid: </span>
                        <strong style={{ fontSize: '1.15rem', color: 'var(--text-bright)' }}>₹{order.total}</strong>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {order.status !== 'Delivered' && (
                          <button 
                            className="btn btn-secondary" 
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                            onClick={() => advanceOrderStatus(order.id)}
                          >
                            Simulate Next Step ➡️
                          </button>
                        )}
                        {order.status === 'Delivered' && !order.rated && (
                          <button 
                            className="btn btn-primary" 
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--color-secondary)' }}
                            onClick={() => openRatingModal(order)}
                          >
                            ⭐ Rate Curry (1-spoon score)
                          </button>
                        )}
                        {order.rated && (
                          <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>
                            Rated: {order.rating.score.toFixed(1)}/50
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="glass-panel mobile-only-cart" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', marginBottom: '2rem' }}>
            {renderCart()}
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <div className="glass-panel desktop-only-sidebar" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px', backgroundColor: 'var(--bg-card)' }}>
        {renderCart()}
      </div>

      {/* Interactive Quality Rating Modal */}
      {ratingModalOrder && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem', color: 'var(--text-bright)' }}>
              🍛 Rate Order #{ratingModalOrder.id}
            </h3>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Rate the curry's individual parameters out of 10. PPK quality controls require a strict 1-spoon taste standard.
            </p>

            <form onSubmit={handleRatingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label">🌶️ Spice Rating</label>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{spiceRating}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={spiceRating} 
                  onChange={(e) => setSpiceRating(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label">🧂 Salt Balance</label>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{saltRating}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={saltRating} 
                  onChange={(e) => setSaltRating(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label">🌿 Masala Intensity</label>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{masalaRating}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={masalaRating} 
                  onChange={(e) => setMasalaRating(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label">🛢️ Oil level correctness</label>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{oilRating}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={oilRating} 
                  onChange={(e) => setOilRating(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </div>

              <div className="form-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ fontWeight: 'bold', color: 'var(--text-bright)' }}>⭐ Overall Taste Score</label>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>{overallTaste}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={overallTaste} 
                  onChange={(e) => setOverallTaste(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-secondary)' }}
                />
              </div>

              {/* Formula explanation box */}
              <div style={{ background: 'var(--color-secondary-light)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid rgba(223, 122, 94, 0.2)' }}>
                <strong>PPK Rating Formula:</strong><br />
                <code>Curry Rating = (Top 4 parameters average + Overall Taste) / 2</code><br />
                Calculated Score: <strong style={{ color: 'var(--color-secondary)' }}>
                  {((( (spiceRating + saltRating + masalaRating + oilRating) / 4 ) * 5) + (overallTaste * 5)) / 2} / 50 points
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setRatingModalOrder(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Submit Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
