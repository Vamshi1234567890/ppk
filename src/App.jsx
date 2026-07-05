import React, { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import CustomerDashboard from './components/CustomerDashboard.jsx';
import ChefDashboard from './components/ChefDashboard.jsx';
import ManagerDashboard from './components/ManagerDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { ChefHat, Shield, User, HelpCircle, UtensilsCrossed, Settings, Plus, Info, X, Users, Menu, ShoppingCart } from 'lucide-react';
import './App.css';

// Initial Menu list based on PPK PDF Product Matrix & Curries Menu
const INITIAL_MENU = [
  { 
    id: 1, 
    name: 'Thotakura Curry (Amaranth)', 
    category: 'Veg', 
    ingredients: 'Amaranth leaves, Tomato, Onion, Oil', 
    spiceLevel: 'Low', 
    oil: 'Low', 
    protein: 'Low', 
    calories: 120, 
    bestWith: 'Rice', 
    chefNotes: 'Fresh leafy greens cooked homestyle.',
    price: 300,
    active: true,
    rawVegCost: 190,
    rawOilCost: 10,
    chefPay: 300,
    salesValue: 400
  },
  { 
    id: 2, 
    name: 'Dal Curry (Toor Dal)', 
    category: 'Veg', 
    ingredients: 'Toor Dal, Tomato, Turmeric, Cumin, Mustard', 
    spiceLevel: 'Low', 
    oil: 'Low', 
    protein: 'High', 
    calories: 180, 
    bestWith: 'Rice', 
    chefNotes: 'Simple, soothing yellow dal seasoning.',
    price: 200,
    active: true,
    rawVegCost: 110,
    rawOilCost: 10,
    chefPay: 200,
    salesValue: 280
  },
  { 
    id: 3, 
    name: 'Chicken Curry', 
    category: 'Non-Veg', 
    ingredients: 'Fresh Chicken, Onion, Tomato, Ginger, Garam Masala', 
    spiceLevel: 'Medium', 
    oil: 'Medium', 
    protein: 'High', 
    calories: 320, 
    bestWith: 'Rice/Roti', 
    chefNotes: 'Spiced chicken simmered in rich gravy.',
    price: 800,
    active: true,
    rawVegCost: 540,
    rawOilCost: 20,
    chefPay: 800,
    salesValue: 1050
  },
  { 
    id: 4, 
    name: 'Mutton Curry', 
    category: 'Non-Veg', 
    ingredients: 'Tender Mutton, Onion, Ginger, Garlic, Cardamom', 
    spiceLevel: 'Medium', 
    oil: 'Medium', 
    protein: 'High', 
    calories: 380, 
    bestWith: 'Rice/Roti', 
    chefNotes: 'Slow-cooked traditional mutton delicacy.',
    price: 1400,
    active: true,
    rawVegCost: 980,
    rawOilCost: 30,
    chefPay: 1400,
    salesValue: 1800
  },
  { 
    id: 5, 
    name: 'Egg Curry', 
    category: 'Non-Veg', 
    ingredients: 'Boiled Eggs, Tomato, Onion, Garam Masala', 
    spiceLevel: 'Medium', 
    oil: 'Low', 
    protein: 'Medium', 
    calories: 210, 
    bestWith: 'Rice', 
    chefNotes: 'Fried boiled eggs in a tangy tomato curry.',
    price: 250,
    active: true,
    rawVegCost: 160,
    rawOilCost: 10,
    chefPay: 250,
    salesValue: 330
  },
  { 
    id: 6, 
    name: 'Paneer Butter Curry', 
    category: 'Veg', 
    ingredients: 'Soft Paneer, Tomato, Cream, Cashew paste', 
    spiceLevel: 'Medium', 
    oil: 'Low', 
    protein: 'High', 
    calories: 290, 
    bestWith: 'Roti', 
    chefNotes: 'Creamy, rich tomato paneer base.',
    price: 450,
    active: true,
    rawVegCost: 310,
    rawOilCost: 15,
    chefPay: 450,
    salesValue: 600
  },
  { 
    id: 7, 
    name: 'Alu Curry (Potato)', 
    category: 'Veg', 
    ingredients: 'Potato, Onion, Coriander, Spices', 
    spiceLevel: 'Low', 
    oil: 'Low', 
    protein: 'Low', 
    calories: 170, 
    bestWith: 'Rice/Roti', 
    chefNotes: 'Comforting, dry potato fry cooked homestyle.',
    price: 220,
    active: true,
    rawVegCost: 130,
    rawOilCost: 10,
    chefPay: 220,
    salesValue: 300
  },
  { 
    id: 8, 
    name: 'Bitter Gourd Curry', 
    category: 'Veg', 
    ingredients: 'Bitter Gourd, Onion, Jaggery, Peanut powder', 
    spiceLevel: 'Low', 
    oil: 'Low', 
    protein: 'Low', 
    calories: 110, 
    bestWith: 'Rice', 
    chefNotes: 'Healthy stir fry with reduced bitterness.',
    price: 250,
    active: true,
    rawVegCost: 160,
    rawOilCost: 10,
    chefPay: 250,
    salesValue: 335
  },
  { 
    id: 9, 
    name: 'Chikkudukaya Curry (Broad Beans)', 
    category: 'Veg', 
    ingredients: 'Broad Beans, Onion, Mustard seeds, Curry leaves', 
    spiceLevel: 'Low', 
    oil: 'Low', 
    protein: 'Medium', 
    calories: 130, 
    bestWith: 'Rice', 
    chefNotes: 'Fresh seasonal broad beans stir-fry.',
    price: 200,
    active: true,
    rawVegCost: 120,
    rawOilCost: 10,
    chefPay: 200,
    salesValue: 270
  },
  { 
    id: 10, 
    name: 'Hyderabadi Biryani', 
    category: 'Rice', 
    ingredients: 'Basmati Rice, Spices, Saffron, Veg/Meat, Raita', 
    spiceLevel: 'High', 
    oil: 'Medium', 
    protein: 'High', 
    calories: 450, 
    bestWith: 'Raita', 
    chefNotes: 'Fragrant basmati rice layered with masala.',
    price: 500,
    active: true,
    rawVegCost: 340,
    rawOilCost: 20,
    chefPay: 500,
    salesValue: 660
  }
];

const INITIAL_CHEFS = [
  { id: 1, name: 'Jyoti', rating: 45.0, specialty: 'Paneer Butter Curry' },
  { id: 2, name: 'Saniya', rating: 44.2, specialty: 'Bitter Gourd Curry' },
  { id: 3, name: 'Sampath', rating: 42.0, specialty: 'Chicken Curry' },
  { id: 4, name: 'Bhakar', rating: 46.5, specialty: 'Thotakura Curry (Amaranth)' },
  { id: 5, name: 'Naresh', rating: 43.8, specialty: 'Mutton Curry' }
];

const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Vamshi Krishna', address: 'Plot 42, Madhapur, Hyderabad' },
  { id: 2, name: 'Srilatha Reddy', address: 'Phase 2, Gachibowli, Hyderabad' }
];

const INITIAL_COMPLAINTS = [
  { id: 1, type: 'Spice Issue', text: 'Chicken Curry was extremely spicy for children to consume.', chef: 'Sampath', dish: 'Chicken Curry', time: '10:35 AM' },
  { id: 2, type: 'Oil Level', text: 'Thotakura had too much oil pooled at the bottom today.', chef: 'Bhakar', dish: 'Thotakura Curry (Amaranth)', time: '11:15 AM' }
];

function App() {
  const [role, setRole] = useState('landing'); // 'landing', 'customer', 'chef', 'manager', 'admin'
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [chefs, setChefs] = useState(INITIAL_CHEFS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  
  const [activeCustomerId, setActiveCustomerId] = useState(1);
  const [activeChefId, setActiveChefId] = useState(1);
  
  const [cart, setCart] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [ratingHistory, setRatingHistory] = useState([]);

  // Modal Product details state
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Dynamic switch simulator sidebar toggle
  const [showSimulatorBar, setShowSimulatorBar] = useState(true);
  
  const [customerTab, setCustomerTab] = useState('menu');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [role, customerTab]);
  
  // Registration Inputs
  const [newCustName, setNewCustName] = useState('');
  const [newCustAddr, setNewCustAddr] = useState('');
  const [newChefName, setNewChefName] = useState('');
  const [newChefSpecial, setNewChefSpecial] = useState('Thotakura Curry (Amaranth)');

  const activeCustomer = customers.find(c => c.id === activeCustomerId) || customers[0];
  const activeChef = chefs.find(c => c.id === activeChefId) || chefs[0];

  // Customer actions
  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === dish.id);
      if (existing) {
        return prevCart.map((item) => 
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    
    const now = new Date();
    const orderTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newOrder = {
      id: Math.floor(Math.random() * 9000 + 1000),
      customerName: activeCustomer.name,
      items: [...cart],
      total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      status: 'Pending Acceptance',
      time: orderTime,
      rated: false,
      rating: null
    };

    setActiveOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setRole('customer'); // Navigate to customer dashboard
  };

  const advanceOrderStatus = (orderId) => {
    const statuses = ['Pending Acceptance', 'Cooking', 'Ready for Pickup', 'Delivered'];
    
    setActiveOrders((prevOrders) => 
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const currentIdx = statuses.indexOf(order.status);
          const nextStatus = currentIdx < statuses.length - 1 ? statuses[currentIdx + 1] : order.status;
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  const submitRating = (orderId, score, details) => {
    setActiveOrders((prevOrders) => 
      prevOrders.map((order) => {
        if (order.id === orderId) {
          return { ...order, rated: true, rating: { score, ...details } };
        }
        return order;
      })
    );

    setRatingHistory(prev => [...prev, { orderId, score }]);
    
    setChefs(prevChefs => 
      prevChefs.map(chef => {
        if (chef.id === activeChefId) {
          const delta = (score - 25) / 20;
          return { ...chef, rating: Math.min(50, Math.max(10, chef.rating + delta)) };
        }
        return chef;
      })
    );
  };

  // Chef actions
  const toggleChefDish = (id) => {
    setMenu(prevMenu => 
      prevMenu.map(dish => 
        dish.id === id ? { ...dish, active: !dish.active } : dish
      )
    );
  };

  // Manager actions
  const recordTasteTest = (chefId, score) => {
    setChefs(prevChefs => 
      prevChefs.map(chef => 
        chef.id === chefId ? { ...chef, rating: (chef.rating + score) / 2 } : chef
      )
    );
  };

  const resolveComplaint = (id) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  // Simulator dynamic registrations
  const registerCustomer = (e) => {
    e.preventDefault();
    if (!newCustName.trim()) return;
    const newCust = {
      id: Math.floor(Math.random() * 900 + 100),
      name: newCustName,
      address: newCustAddr || 'Local Unit neighborhood'
    };
    setCustomers(prev => [...prev, newCust]);
    setActiveCustomerId(newCust.id);
    setNewCustName('');
    setNewCustAddr('');
  };

  const enrollChef = (e) => {
    e.preventDefault();
    if (!newChefName.trim()) return;
    const newChef = {
      id: Math.floor(Math.random() * 900 + 100),
      name: newChefName,
      rating: 45.0,
      specialty: newChefSpecial
    };
    setChefs(prev => [...prev, newChef]);
    setActiveChefId(newChef.id);
    setNewChefName('');
  };

  // Dynamic calculations for Retained Balance details (PDF page 2)
  const calculateEconomics = (dish) => {
    const totalSales = dish.salesValue || (dish.price * 1.33); // approx batch sales
    const chefPay = dish.chefPay || dish.price;
    const rawVeg = dish.rawVegCost || (dish.price * 0.6);
    const rawOil = dish.rawOilCost || 10;
    const retainedBalance = totalSales - chefPay;
    
    return {
      totalSales: Math.round(totalSales),
      chefPay: Math.round(chefPay),
      rawVeg: Math.round(rawVeg),
      rawOil: Math.round(rawOil),
      retainedBalance: Math.round(retainedBalance),
      teamPay: Math.round(retainedBalance * 0.4),
      maintenance: Math.round(retainedBalance * 0.3),
      platform: Math.round(retainedBalance * 0.2),
      profit: Math.round(retainedBalance * 0.1)
    };
  };

  return (
    <div className="app-wrapper">
      {/* Navigation bar (Hides Admin/Manager/Chef role from regular view) */}
      <nav className="navbar">
        <div className="container navbar-container">
          <a href="#" className="logo-area" onClick={() => setRole('landing')}>
            <div className="logo-icon">PPK</div>
            <div>
              <span className="logo-text">Pakkinti Pulla Kura</span>
              <span className="logo-tagline">COMMUNITY KITCHEN</span>
            </div>
          </a>

          <div className="nav-links">
            <button 
              className={`nav-link btn-secondary btn ${role === 'landing' ? 'active' : ''}`} 
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setRole('landing')}
            >
              Home
            </button>
            <button 
              className={`nav-link btn-secondary btn ${role === 'customer' ? 'active' : ''}`}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={() => {
                setCustomerTab('menu');
                setRole('customer');
              }}
            >
              <User size={14} /> Customer Portal
            </button>
            <button 
              className={`nav-link btn-secondary btn ${role === 'chef' ? 'active' : ''}`}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setRole('chef')}
            >
              <ChefHat size={14} /> Chef Portal
            </button>
          </div>

          <button 
            className="menu-toggle-btn" 
            onClick={() => setIsDrawerOpen(true)}
            title="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Main View Router */}
      <main className="container" style={{ padding: '2.5rem 1.5rem 6rem' }}>
        {role === 'landing' && (
          <LandingPage 
            setRole={setRole} 
            sampleMenu={menu.filter(item => item.active)} 
            setSelectedProduct={setSelectedProduct}
          />
        )}
        {role === 'customer' && (
          <CustomerDashboard 
            menu={menu.filter(item => item.active)} 
            cart={cart}
            addToCart={addToCart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            placeOrder={placeOrder}
            activeOrders={activeOrders.filter(o => o.customerName === activeCustomer.name)}
            advanceOrderStatus={advanceOrderStatus}
            submitRating={submitRating}
            activeCustomer={activeCustomer}
            setSelectedProduct={setSelectedProduct}
            activeTab={customerTab}
            setActiveTab={setCustomerTab}
          />
        )}
        {role === 'chef' && (
          <ChefDashboard 
            chefProfile={activeChef}
            menu={menu}
            toggleChefDish={toggleChefDish}
            activeOrders={activeOrders}
            advanceOrderStatus={advanceOrderStatus}
          />
        )}
        {role === 'manager' && (
          <ManagerDashboard 
            chefs={chefs}
            recordTasteTest={recordTasteTest}
            complaints={complaints}
            resolveComplaint={resolveComplaint}
          />
        )}
        {role === 'admin' && (
          <AdminDashboard 
            menu={menu}
            activeOrders={activeOrders}
            ratingHistory={ratingHistory}
          />
        )}
      </main>

      {/* Floatable Simulation Control Panel (Enables testing of all portals in prototype mode) */}
      <div className="simulator-panel">
        {showSimulatorBar ? (
          <div className="glass-panel animate-fade-in-up" style={{
            width: '320px',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--color-primary)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Settings size={16} /> Simulator Control Panel
              </strong>
              <button 
                onClick={() => setShowSimulatorBar(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Role Switches */}
              <div>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Simulate Active Role</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {['landing', 'customer', 'chef', 'manager', 'admin'].map((r) => (
                    <button 
                      key={r}
                      onClick={() => setRole(r)}
                      className="btn" 
                      style={{
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.75rem',
                        borderRadius: '6px',
                        backgroundColor: role === r ? 'var(--color-primary)' : 'var(--color-primary-light)',
                        color: role === r ? 'white' : 'var(--color-primary)',
                        border: 'none',
                        flexGrow: 1
                      }}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Context Toggles */}
              {role === 'customer' && (
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Active Customer</label>
                  <select 
                    className="form-control"
                    style={{ padding: '0.35rem', fontSize: '0.8rem' }}
                    value={activeCustomerId}
                    onChange={(e) => setActiveCustomerId(parseInt(e.target.value))}
                  >
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>

                  {/* Add Customer Form */}
                  <form onSubmit={registerCustomer} style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Add customer..." 
                      className="form-control"
                      style={{ padding: '0.35rem', fontSize: '0.8rem' }}
                      value={newCustName}
                      onChange={(e) => setNewCustName(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)' }}>
                      <Plus size={16} />
                    </button>
                  </form>
                </div>
              )}

              {role === 'chef' && (
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Active Chef Profile</label>
                  <select 
                    className="form-control"
                    style={{ padding: '0.35rem', fontSize: '0.8rem' }}
                    value={activeChefId}
                    onChange={(e) => setActiveChefId(parseInt(e.target.value))}
                  >
                    {chefs.map(c => <option key={c.id} value={c.id}>Chef {c.name}</option>)}
                  </select>

                  {/* Enroll Chef Form */}
                  <form onSubmit={enrollChef} style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Enroll chef..." 
                      className="form-control"
                      style={{ padding: '0.35rem', fontSize: '0.8rem' }}
                      value={newChefName}
                      onChange={(e) => setNewChefName(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)' }}>
                      <Plus size={16} />
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        ) : (
          <button 
            onClick={() => setShowSimulatorBar(true)}
            className="btn btn-primary"
            style={{
              borderRadius: '50px',
              width: '50px',
              height: '50px',
              padding: 0,
              boxShadow: '0 4px 15px rgba(43, 81, 56, 0.3)'
            }}
          >
            <Settings size={22} />
          </button>
        )}
      </div>

      {/* Global Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ maxWidth: '580px', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className={`badge ${selectedProduct.category === 'Veg' ? 'badge-success' : 'badge-danger'}`} style={{ marginBottom: '0.5rem' }}>
                  {selectedProduct.category}
                </span>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{selectedProduct.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0.25rem', color: 'var(--text-muted)' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Product Info Grid */}
              <div className="grid-2" style={{ gap: '1rem', background: 'var(--bg-main)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                <div>🌶️ Spice Level: <strong style={{ color: 'var(--text-bright)' }}>{selectedProduct.spiceLevel}</strong></div>
                <div>🛢️ Oil Content: <strong style={{ color: 'var(--text-bright)' }}>{selectedProduct.oil}</strong></div>
                <div>🥗 Protein Index: <strong style={{ color: 'var(--text-bright)' }}>{selectedProduct.protein}</strong></div>
                <div>🔥 Calories: <strong style={{ color: 'var(--text-bright)' }}>{selectedProduct.calories} kcal</strong></div>
                <div>🍚 Best Coupled With: <strong style={{ color: 'var(--text-bright)' }}>{selectedProduct.bestWith}</strong></div>
                <div>🪙 Cost per Portion: <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>₹{selectedProduct.price}</strong></div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-bright)' }}>🥣 Main Ingredients</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedProduct.ingredients}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-bright)' }}>🧑‍🍳 Chef Preparation Note</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>"{selectedProduct.chefNotes}"</p>
              </div>

              {/* Batches Pricing & Unit Economics Equations */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Info size={16} style={{ color: 'var(--color-secondary)' }} /> Batch Financial Economics (1000 Houses Unit model)
                </h4>
                
                {(() => {
                  const econ = calculateEconomics(selectedProduct);
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Retail Market Value (per batch)</span>
                        <strong style={{ color: 'var(--color-primary)' }}>₹{econ.totalSales}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Payment to Chef Labor</span>
                        <span>-₹{econ.chefPay}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', paddingLeft: '1rem', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span>↳ Chef Raw Veg Cost: ₹{econ.rawVeg} | Chef Oil Cost: ₹{econ.rawOil}</span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', fontWeight: 'bold', color: 'var(--text-bright)' }}>
                        <span>🏢 Retained Block Balance</span>
                        <span style={{ color: 'var(--color-secondary)' }}>₹{econ.retainedBalance}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', padding: '0.5rem', background: 'var(--bg-main)', borderRadius: '6px', marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <div>• Team Pay (40%): <strong>₹{econ.teamPay}</strong></div>
                        <div>• Block Maintenance (30%): <strong>₹{econ.maintenance}</strong></div>
                        <div>• Platform Fee (20%): <strong>₹{econ.platform}</strong></div>
                        <div>• Net Profit (10%): <strong>₹{econ.profit}</strong></div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                >
                  Add Curry to Cart (₹{selectedProduct.price})
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '2.5rem 0',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <div className="container">
          <p>© 2026 PPK (Pakkinti Pulla Kura) Community Kitchen Platform. All Rights Reserved.</p>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Empowering 20 local home chefs for every 1000 houses block. Fresh. Safe. Standardized.
          </p>
        </div>
      </footer>

      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav">
        <button 
          className={`bottom-nav-link ${role === 'landing' ? 'active' : ''}`}
          onClick={() => setRole('landing')}
        >
          <UtensilsCrossed size={18} />
          <span>Home</span>
        </button>
        <button 
          className={`bottom-nav-link ${role === 'customer' ? 'active' : ''}`}
          onClick={() => {
            setCustomerTab('menu');
            setRole('customer');
          }}
        >
          <User size={18} />
          <span>Customer</span>
        </button>
        <button 
          className={`bottom-nav-link ${role === 'chef' ? 'active' : ''}`}
          onClick={() => setRole('chef')}
        >
          <ChefHat size={18} />
          <span>Chef</span>
        </button>
      </div>

      {/* Slide-out Navigation Drawer */}
      <div className={`nav-drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={() => setIsDrawerOpen(false)}></div>
      <div className={`nav-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-primary)' }}>PPK Navigation</span>
          <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)} title="Close Menu">
            <X size={24} />
          </button>
        </div>
        <div className="drawer-links">
          <button 
            className={`drawer-link ${role === 'landing' ? 'active' : ''}`}
            onClick={() => {
              setRole('landing');
              setIsDrawerOpen(false);
            }}
          >
            <UtensilsCrossed size={18} /> Home
          </button>
          <button 
            className={`drawer-link ${role === 'customer' && customerTab === 'menu' ? 'active' : ''}`}
            onClick={() => {
              setCustomerTab('menu');
              setRole('customer');
              setIsDrawerOpen(false);
            }}
          >
            <ShoppingCart size={18} /> Products
          </button>
          <button 
            className={`drawer-link ${role === 'customer' && customerTab === 'orders' ? 'active' : ''}`}
            onClick={() => {
              setCustomerTab('orders');
              setRole('customer');
              setIsDrawerOpen(false);
            }}
          >
            <User size={18} /> Customer Portal
          </button>
          <button 
            className={`drawer-link ${role === 'chef' ? 'active' : ''}`}
            onClick={() => {
              setRole('chef');
              setIsDrawerOpen(false);
            }}
          >
            <ChefHat size={18} /> Chef Portal
          </button>
          <button 
            className={`drawer-link ${role === 'manager' ? 'active' : ''}`}
            onClick={() => {
              setRole('manager');
              setIsDrawerOpen(false);
            }}
          >
            <Shield size={18} /> Manager Portal
          </button>
          <button 
            className={`drawer-link ${role === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setRole('admin');
              setIsDrawerOpen(false);
            }}
          >
            <Shield size={18} /> Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
