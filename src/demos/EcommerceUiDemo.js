import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Minimalist Leather Backpack",
    category: "Accessories",
    price: 119,
    rating: 4.9,
    reviews: 148,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Wireless ANC Studio Headphones",
    category: "Tech",
    price: 249,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    badge: "Sale -20%",
  },
  {
    id: 3,
    name: "Urban Knit Runner Sneakers",
    category: "Footwear",
    price: 135,
    rating: 4.7,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    badge: "Trending",
  },
  {
    id: 4,
    name: "Organic Heavyweight Cotton Hoodie",
    category: "Apparel",
    price: 85,
    rating: 4.9,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    badge: "Eco Choice",
  },
  {
    id: 5,
    name: "Chronograph Sapphire Wristwatch",
    category: "Accessories",
    price: 189,
    rating: 4.95,
    reviews: 82,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    badge: "Premium",
  },
  {
    id: 6,
    name: "Smart Ambient Home Speaker",
    category: "Tech",
    price: 159,
    rating: 4.6,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80",
    badge: "New Release",
  },
];

export default function EcommerceUiDemo() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([
    { ...products[0], qty: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const categories = ["All", "Apparel", "Footwear", "Accessories", "Tech"];

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "SAVE20") {
      setDiscountPercent(20);
    } else {
      alert("Try promo code: SAVE20");
    }
  };

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal - discountAmount + shipping;
  const totalCartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <div className="ecom-app">
      {/* Top Announcement Bar */}
      <div className="ecom-announcement">
        ⚡ Flash Sale: Use code <strong>SAVE20</strong> for 20% off all orders • Free express shipping over $150
      </div>

      {/* Nav */}
      <header className="ecom-header">
        <div className="ecom-header-inner">
          <div className="ecom-brand">
            <span className="ecom-logo-icon">🛍️</span>
            <strong>AURORA</strong>
            <span>STUDIO</span>
          </div>

          <div className="ecom-nav-categories">
            {categories.map((c) => (
              <button
                key={c}
                className={`ecom-cat-link ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="ecom-header-actions">
            <button className="ecom-cart-trigger" onClick={() => setIsCartOpen(true)}>
              🛒 Cart
              <span className="ecom-cart-badge">{totalCartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="ecom-hero">
        <div className="ecom-hero-inner">
          <span className="ecom-hero-tag">Autumn / Winter '25 Edition</span>
          <h1>Engineered For Modern Living</h1>
          <p>Hand-crafted essentials designed with precision aesthetics and lifetime durability.</p>
        </div>
      </div>

      {/* Product Catalog */}
      <main className="ecom-container">
        <div className="ecom-toolbar">
          <h2>Featured Collection ({filtered.length})</h2>
          <div className="ecom-pills">
            {categories.map((c) => (
              <button
                key={c}
                className={`ecom-pill-btn ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="ecom-grid">
          {filtered.map((item) => (
            <div key={item.id} className="ecom-card">
              <div className="ecom-card-media">
                <img src={item.image} alt={item.name} />
                <span className="ecom-card-badge">{item.badge}</span>
              </div>
              <div className="ecom-card-content">
                <span className="ecom-card-category">{item.category}</span>
                <h3>{item.name}</h3>
                <div className="ecom-card-rating">
                  ★ {item.rating} <span>({item.reviews} reviews)</span>
                </div>
                <div className="ecom-card-footer">
                  <span className="ecom-card-price">${item.price}</span>
                  <button className="ecom-add-btn" onClick={() => addToCart(item)}>
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="ecom-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="ecom-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ecom-drawer-header">
              <h3>Shopping Bag ({totalCartCount})</h3>
              <button className="ecom-drawer-close" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div className="ecom-drawer-body">
              {cart.length === 0 ? (
                <div className="ecom-empty-cart">
                  <span>🛍️</span>
                  <p>Your bag is currently empty.</p>
                </div>
              ) : (
                <div className="ecom-cart-list">
                  {cart.map((item) => (
                    <div key={item.id} className="ecom-cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="ecom-cart-item-info">
                        <h4>{item.name}</h4>
                        <div className="ecom-cart-item-price">${item.price}</div>
                        <div className="ecom-cart-qty-bar">
                          <button onClick={() => updateQty(item.id, -1)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button className="ecom-item-del" onClick={() => updateQty(item.id, -item.qty)}>
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="ecom-drawer-footer">
                <form onSubmit={applyPromo} className="ecom-promo-form">
                  <input
                    type="text"
                    placeholder="Enter Promo (e.g. SAVE20)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>

                <div className="ecom-summary-rows">
                  <div className="ecom-sum-row">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="ecom-sum-row discount">
                      <span>Promo Discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="ecom-sum-row">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="ecom-sum-row total">
                    <span>Total Amount:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {!checkoutDone ? (
                  <button className="ecom-checkout-btn" onClick={() => setCheckoutDone(true)}>
                    Proceed to Secure Checkout
                  </button>
                ) : (
                  <div className="ecom-checkout-success">
                    🎉 Order Placed! Confirmation &amp; DHL tracking code sent to your email.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
