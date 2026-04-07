import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/cartStore';
import { ArrowLeft, Plus, Minus, Trash2, Lock, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Italy'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate shipping cost
  const shippingCost = total >= 75 && shippingMethod === 'standard' ? 0 : (shippingMethod === 'standard' ? 9.90 : 14.90);
  const finalTotal = total + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      alert('Please fill in all shipping details');
      return;
    }

    // Generate random order number
    const newOrderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);

    // Clear cart
    clearCart();

    // Reset form
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Italy'
    });
  };

  const handleContinueShopping = () => {
    navigate('/Products');
  };

  // Empty state
  if (items.length === 0 && !orderPlaced) {
    return (
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 20px',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.3 }}>🛒</div>
        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 32,
          color: '#1A1A1A',
          marginBottom: 12
        }}>Your cart is empty</h1>
        <p style={{ color: '#666', fontSize: 16, marginBottom: 32 }}>
          Add some Italian delicacies to your cart to get started
        </p>
        <button onClick={() => navigate('/Products')} style={{
          padding: '14px 32px',
          background: '#2E7D32',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#1B5E20'}
          onMouseLeave={e => e.currentTarget.style.background = '#2E7D32'}>
          Browse Products
        </button>
      </div>
    );
  }

  // Success state
  if (orderPlaced) {
    return (
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 20px',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <style>{`
          @keyframes checkmark-bounce {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .checkmark {
            animation: checkmark-bounce 0.6s ease-out;
          }
        `}</style>

        <div className="checkmark" style={{ marginBottom: 32 }}>
          <CheckCircle2 size={80} color="#2E7D32" style={{ strokeWidth: 1.5 }} />
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 42,
          color: '#1A1A1A',
          marginBottom: 16
        }}>Order Confirmed!</h1>

        <p style={{ color: '#666', fontSize: 16, marginBottom: 32 }}>
          Thank you for your order. We're preparing your delicious Italian products.
        </p>

        <div style={{
          background: '#F0F7EE',
          border: '1px solid #E8F5E9',
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          maxWidth: 400
        }}>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 8 }}>Order Number</p>
          <p style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 20,
            fontWeight: 700,
            color: '#2E7D32'
          }}>{orderNumber}</p>
        </div>

        <button onClick={handleContinueShopping} style={{
          padding: '14px 32px',
          background: '#2E7D32',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#1B5E20'}
          onMouseLeave={e => e.currentTarget.style.background = '#2E7D32'}>
          Continue Shopping
        </button>
      </div>
    );
  }

  // Main checkout page
  return (
    <div style={{ background: '#F0F7EE', minHeight: '100vh', paddingBottom: 60 }}>
      {/* Back to cart link */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <button onClick={() => navigate(-1)} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#2E7D32',
          fontSize: 14,
          fontWeight: 600,
          transition: 'color 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#1B5E20'}
          onMouseLeave={e => e.currentTarget.style.color = '#2E7D32'}>
          <ArrowLeft size={18} />
          Back to Cart
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 40px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 36,
          color: '#1A1A1A',
          marginBottom: 32,
          textAlign: 'center'
        }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          {/* Left Column: Order Summary */}
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 22,
              color: '#1A1A1A',
              marginBottom: 20
            }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              {items.map(item => (
                <div key={item.id} style={{
                  background: '#fff',
                  border: '1px solid #E8F5E9',
                  borderRadius: 12,
                  padding: 16,
                  display: 'flex',
                  gap: 16
                }}>
                  <img src={item.image} alt={item.name} style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    objectFit: 'cover',
                    flexShrink: 0
                  }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: '#1A1A1A',
                      marginBottom: 4
                    }}>{item.name}</p>
                    <p style={{
                      fontSize: 13,
                      color: '#888',
                      marginBottom: 12
                    }}>{item.producer}</p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#F0F7EE',
                        border: '1px solid #E8F5E9',
                        borderRadius: 8,
                        padding: '4px 8px'
                      }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px 6px',
                          color: '#2E7D32',
                          display: 'flex'
                        }}>
                          <Minus size={14} />
                        </button>
                        <span style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: 14,
                          fontWeight: 500,
                          minWidth: 20,
                          textAlign: 'center'
                        }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px 6px',
                          color: '#2E7D32',
                          display: 'flex'
                        }}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: 16,
                          fontWeight: 700,
                          color: '#1A1A1A'
                        }}>
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button onClick={() => removeItem(item.id)} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#ccc',
                          display: 'flex',
                          padding: 2,
                          transition: 'color 0.15s'
                        }}
                          onMouseEnter={e => e.currentTarget.style.color = '#D32F2F'}
                          onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div style={{
              background: '#fff',
              border: '1px solid #E8F5E9',
              borderRadius: 12,
              padding: 20
            }}>
              <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #E8F5E9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#666', fontSize: 14 }}>Subtotal</span>
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#1A1A1A'
                  }}>€{total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666', fontSize: 14 }}>
                    {shippingMethod === 'standard' ? 'Shipping (Standard)' : 'Shipping (Express)'}
                  </span>
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 15,
                    fontWeight: 600,
                    color: shippingCost === 0 ? '#2E7D32' : '#1A1A1A'
                  }}>
                    {shippingCost === 0 ? 'FREE' : `€${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1A1A1A'
                }}>Total</span>
                <span style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#2E7D32'
                }}>€{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Shipping & Payment */}
          <div>
            {/* Shipping Information */}
            <div style={{
              background: '#fff',
              border: '1px solid #E8F5E9',
              borderRadius: 12,
              padding: 24,
              marginBottom: 24
            }}>
              <h3 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 18,
                color: '#1A1A1A',
                marginBottom: 16
              }}>Shipping Address</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange}
                  style={{
                    padding: '12px 14px',
                    border: '1px solid #E8F5E9',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif",
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#2E7D32'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E8F5E9'}
                />

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange}
                  style={{
                    padding: '12px 14px',
                    border: '1px solid #E8F5E9',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif",
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#2E7D32'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E8F5E9'}
                />

                <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleInputChange}
                  style={{
                    padding: '12px 14px',
                    border: '1px solid #E8F5E9',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif",
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#2E7D32'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E8F5E9'}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange}
                    style={{
                      padding: '12px 14px',
                      border: '1px solid #E8F5E9',
                      borderRadius: 8,
                      fontSize: 14,
                      fontFamily: "'DM Sans',sans-serif",
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#2E7D32'}
                    onBlur={e => e.currentTarget.style.borderColor = '#E8F5E9'}
                  />

                  <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange}
                    style={{
                      padding: '12px 14px',
                      border: '1px solid #E8F5E9',
                      borderRadius: 8,
                      fontSize: 14,
                      fontFamily: "'DM Sans',sans-serif",
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#2E7D32'}
                    onBlur={e => e.currentTarget.style.borderColor = '#E8F5E9'}
                  />
                </div>

                <select name="country" value={formData.country} onChange={handleInputChange}
                  style={{
                    padding: '12px 14px',
                    border: '1px solid #E8F5E9',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif",
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#2E7D32'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E8F5E9'}
                >
                  <option value="Italy">Italy</option>
                  <option value="Austria">Austria</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Greece">Greece</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Malta">Malta</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Romania">Romania</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Spain">Spain</option>
                  <option value="Sweden">Sweden</option>
                </select>
              </div>
            </div>

            {/* Shipping Method */}
            <div style={{
              background: '#fff',
              border: '1px solid #E8F5E9',
              borderRadius: 12,
              padding: 24,
              marginBottom: 24
            }}>
              <h3 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 18,
                color: '#1A1A1A',
                marginBottom: 16
              }}>Shipping Method</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Standard Shipping */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 14,
                  border: `2px solid ${shippingMethod === 'standard' ? '#2E7D32' : '#E8F5E9'}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background-color 0.2s',
                  background: shippingMethod === 'standard' ? '#F0F7EE' : '#fff'
                }}
                  onMouseEnter={e => { if (shippingMethod !== 'standard') e.currentTarget.style.background = '#FAFAFA'; }}
                  onMouseLeave={e => { if (shippingMethod !== 'standard') e.currentTarget.style.background = '#fff'; }}>
                  <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    style={{ cursor: 'pointer', marginRight: 12 }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>Standard Shipping</p>
                    <p style={{ fontSize: 12, color: '#888' }}>3-5 business days</p>
                  </div>
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 15,
                    fontWeight: 600,
                    color: total >= 75 ? '#2E7D32' : '#1A1A1A'
                  }}>
                    {total >= 75 ? 'FREE' : '€9.90'}
                  </span>
                </label>

                {/* Express Shipping */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 14,
                  border: `2px solid ${shippingMethod === 'express' ? '#2E7D32' : '#E8F5E9'}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background-color 0.2s',
                  background: shippingMethod === 'express' ? '#F0F7EE' : '#fff'
                }}
                  onMouseEnter={e => { if (shippingMethod !== 'express') e.currentTarget.style.background = '#FAFAFA'; }}
                  onMouseLeave={e => { if (shippingMethod !== 'express') e.currentTarget.style.background = '#fff'; }}>
                  <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    style={{ cursor: 'pointer', marginRight: 12 }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>Express Shipping</p>
                    <p style={{ fontSize: 12, color: '#888' }}>1-2 business days</p>
                  </div>
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#1A1A1A'
                  }}>
                    €14.90
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Section */}
            <div style={{
              background: '#fff',
              border: '1px solid #E8F5E9',
              borderRadius: 12,
              padding: 24,
              marginBottom: 24
            }}>
              <h3 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 18,
                color: '#1A1A1A',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <Lock size={20} color="#2E7D32" />
                Payment Details
              </h3>

              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
                Payment details will be collected securely through our encrypted checkout. Your information is protected with industry-standard security measures.
              </p>
            </div>

            {/* Place Order Button */}
            <button onClick={handlePlaceOrder} style={{
              width: '100%',
              padding: '16px',
              background: '#2E7D32',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.15s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1B5E20'; e.currentTarget.style.transform = 'scale(1.01)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.transform = 'scale(1)'; }}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
