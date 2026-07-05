import React, { useState } from 'react';
import { ChefHat, Users, Clock, ShieldCheck, MapPin, Search, ArrowRight, Star, Heart } from 'lucide-react';

export default function LandingPage({ setRole, sampleMenu, setSelectedProduct }) {
  const [searchZip, setSearchZip] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchZip.trim()) {
      setSearchResult({
        unitName: `PPK Unit #${Math.floor(Math.random() * 100 + 10)}`,
        chefsCount: 20,
        activeHouses: '1,000 Houses Registered',
        status: 'Active (Delivering Today)'
      });
    }
  };

  return (
    <div className="landing-container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section" style={{
        position: 'relative',
        padding: '5rem 0',
        background: 'linear-gradient(135deg, rgba(251, 251, 249, 0.96) 0%, rgba(242, 242, 236, 0.88) 100%), url("/food_hero.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '1px solid var(--border-color)',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="hero-content">
              <span className="badge badge-primary" style={{ marginBottom: '1rem', padding: '0.4rem 1rem' }}>
                ⭐ Neighborhood Kitchen Revolution
              </span>
              <h1 style={{ fontSize: '3.5rem', lineHeight: '1.15', marginBottom: '1.5rem', fontWeight: 800 }}>
                Pakkinti <span style={{ color: 'var(--color-primary)' }}>Pulla Kura</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '540px' }}>
                Taste the culinary magic of your neighborhood! Connecting 1,000 households with 20 verified home makers cooking fresh, healthy, and authentic curries daily from 10 AM to 1 PM.
              </p>
              
              <form onSubmit={handleSearch} className="glass-panel" style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: '50px',
                maxWidth: '480px',
                border: '1px solid var(--color-primary)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, paddingLeft: '1rem' }}>
                  <MapPin size={18} style={{ color: 'var(--color-primary)' }} />
                  <input 
                    type="text" 
                    placeholder="Enter zip code or neighborhood..."
                    value={searchZip}
                    onChange={(e) => setSearchZip(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-bright)',
                      outline: 'none',
                      width: '100%',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '50px', padding: '0.6rem 1.5rem' }}>
                  <Search size={16} /> Find Unit
                </button>
              </form>

              {searchResult && (
                <div className="glass-panel animate-fade-in-up" style={{
                  marginTop: '1.5rem',
                  padding: '1rem 1.5rem',
                  maxWidth: '480px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-primary)',
                  backgroundColor: 'var(--color-primary-light)'
                }}>
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={18} /> Found Local Service!
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-bright)', fontWeight: 600 }}>{searchResult.unitName}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Serving {searchResult.activeHouses} | {searchResult.chefsCount} verified chefs online.
                  </p>
                </div>
              )}
            </div>

            <div className="hero-image-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxHeight: '400px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '4px solid var(--bg-card)'
              }}>
                <img 
                  src="/food_hero.png" 
                  alt="Delicious Indian Curries" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(17, 22, 20, 0.9))',
                  padding: '2rem 1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>TODAY'S SPECIAL</p>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>Thotakura Bhakar & Biryani</h4>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star fill="var(--color-gold)" color="var(--color-gold)" size={16} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>4.9</span>
                      <span style={{ fontSize: '0.75rem', color: '#D1D5DB' }}>(1.2k reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section" style={{
        padding: '5rem 0',
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start', gap: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.1em' }}>02</span>
                <span style={{ display: 'inline-block', width: '20px', height: '1px', backgroundColor: 'var(--border-color)' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About Us (Our Story)</span>
              </div>
              <h2 style={{ fontSize: '2.5rem', lineHeight: '1.25', marginBottom: '1.5rem', fontWeight: 800 }}>
                We solved food delivery. <br />
                <span style={{ color: 'var(--color-secondary)', fontStyle: 'italic' }}>We never solved food trust.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75' }}>
                Restaurants compete on discounts and speed. Meanwhile the kitchen stays invisible, the cook stays anonymous, and every household reinvents the same meal on its own stove. Chulha rebuilds the model — starting from trust.
                <br /><br />
                Chulha is a local community kitchen initiative designed to bring safety, trust, and connection back to food. We standardize recipe hygiene and raw ingredient sourcing, while keeping the cooking decentralized. By empowering neighborhood home makers, we ensure your family receives fresh, healthy meals cooked by hands you can trust.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
              <div style={{ borderLeft: '3px solid var(--color-secondary)', paddingLeft: '1.25rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-bright)', marginBottom: '0.25rem', fontWeight: 700 }}>
                  Radical Transparency
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No hidden dark kitchens. Every meal is traceably cooked by a verified home maker in your immediate neighborhood.
                </p>
              </div>

              <div style={{ borderLeft: '3px solid var(--color-primary)', paddingLeft: '1.25rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-bright)', marginBottom: '0.25rem', fontWeight: 700 }}>
                  Strict Safety Verification
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  We implement a dual quality check model: a physical 1-spoon taste inspection at 9:30 AM and an AI-driven daily kitchen cleanliness audit.
                </p>
              </div>

              <div style={{ borderLeft: '3px solid var(--color-primary)', paddingLeft: '1.25rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-bright)', marginBottom: '0.25rem', fontWeight: 700 }}>
                  Empowering Local Livelihoods
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  We return up to 75% of batch sales back to local home makers, fostering micro-entrepreneurship and economic growth in the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="principles-section" style={{ padding: '5rem 0 3rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.1em' }}>03</span>
              <span style={{ display: 'inline-block', width: '20px', height: '1px', backgroundColor: 'var(--border-color)' }}></span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The PPK Blueprint</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>The PPK Blueprint</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We build micro-local community hubs standardizing home cooking. Here is how each 1000-house block operates:
            </p>
          </div>

          <div className="grid-3">
            <div className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--color-secondary-light)',
                color: 'var(--color-secondary)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Users size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.4rem' }}>1000 Houses = 1 Unit</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Each local unit serves precisely 1,000 homes. This micro-focus reduces logistics costs, preserves freshness, and builds neighborly connections.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--color-gold-light)',
                color: '#A17B16',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <ChefHat size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.4rem' }}>20 Home Makers / Chefs</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Empowering 20 local home-makers per unit. Handpicked talent, verified kitchens, and structured recipes standardizing safety and taste.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Clock size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.4rem' }}>10 AM - 1 PM Curry Hour</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Cooked fresh daily and delivered during the lunchtime window. Hot, flavorful home-cooked food waiting on your doorstep right on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="menu-preview" style={{ padding: '3rem 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.1em' }}>04</span>
                <span style={{ display: 'inline-block', width: '20px', height: '1px', backgroundColor: 'var(--border-color)' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today's Curries</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Explore Today's Curries</h2>
              <p style={{ color: 'var(--text-muted)' }}>Click any card to read recipe standards, nutrition cost-breakdowns, and health matrixes.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setRole('customer')}>
              Browse Full Menu <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-4">
            {sampleMenu.slice(0, 4).map((item) => (
              <div 
                key={item.id} 
                className="glass-panel" 
                onClick={() => setSelectedProduct(item)}
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  backgroundColor: 'var(--bg-card)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(43, 81, 56, 0.01)',
                  borderBottom: '1px solid var(--border-color)',
                  flexGrow: 1
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className={`badge ${item.category === 'Veg' ? 'badge-success' : 'badge-danger'}`}>
                      {item.category}
                    </span>
                    <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>₹{item.price}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>{item.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineClamp: 2 }}>
                    {item.ingredients}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '4px', fontWeight: 600 }}>
                      🔥 {item.calories} kcal
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--color-secondary-light)', color: 'var(--color-secondary)', borderRadius: '4px', fontWeight: 600 }}>
                      🌶️ {item.spiceLevel} Spice
                    </span>
                  </div>
                </div>
                <div style={{ padding: '0.85rem 1.5rem', background: 'rgba(43, 81, 56, 0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  <span>View Details & Economics</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Home Maker Spotlights */}
      <section className="maker-spotlights-section" style={{
        padding: '5rem 0',
        background: 'var(--color-primary-light)',
        borderTop: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.1em' }}>05</span>
              <span style={{ display: 'inline-block', width: '20px', height: '1px', backgroundColor: 'var(--border-color)' }}></span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Our Neighborhood Chefs</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Our Verified Neighborhood Chefs</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We handpick home makers and verify their kitchens daily. Meet some of the talented cooks serving your neighborhood block:
            </p>
          </div>

          <div className="grid-3">
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1rem', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                J
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Chef Jyoti</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Specialty: Creamy Paneer Curries</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
                  <Star size={14} fill="var(--color-secondary)" /> 45.0/50 Quality Rating
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1rem', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                B
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Chef Bhakar</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Specialty: Thotakura Bhakar (Amaranth)</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
                  <Star size={14} fill="var(--color-secondary)" /> 46.5/50 Quality Rating
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1rem', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                S
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Chef Saniya</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Specialty: Nutritious Bitter Gourd Stir Fry</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
                  <Star size={14} fill="var(--color-secondary)" /> 44.2/50 Quality Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
