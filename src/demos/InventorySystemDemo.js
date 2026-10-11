import React, { useState } from "react";

const initialInventory = [
  { id: 1, barcode: "BAR-88210-CTN", name: "Classic Cotton Oxford Shirt", category: "Cotton", price: 1299, stock: 45, minStock: 15, status: "In Stock" },
  { id: 2, barcode: "BAR-44912-DNM", name: "Slim Fit Raw Indigo Denim", category: "Denim", price: 2499, stock: 8, minStock: 12, status: "Low Stock" },
  { id: 3, barcode: "BAR-10492-SLK", name: "Banarasi Handloom Silk Kurta", category: "Silk", price: 4999, stock: 22, minStock: 10, status: "In Stock" },
  { id: 4, barcode: "BAR-77312-WOL", name: "Merino Wool Winter Blazer", category: "Wool", price: 6499, stock: 0, minStock: 5, status: "Out of Stock" },
  { id: 5, barcode: "BAR-99201-LNN", name: "Breathable Linen Casual Trousers", category: "Linen", price: 1899, stock: 34, minStock: 10, status: "In Stock" },
  { id: 6, barcode: "BAR-33108-PLY", name: "Moisture Wicking Poly Tracksuit", category: "Polyester", price: 1599, stock: 5, minStock: 15, status: "Low Stock" },
  { id: 7, barcode: "BAR-55209-CTN", name: "Heavyweight Graphic Cotton Tee", category: "Cotton", price: 899, stock: 78, minStock: 20, status: "In Stock" },
  { id: 8, barcode: "BAR-66104-DNM", name: "Distressed Vintage Denim Jacket", category: "Denim", price: 3299, stock: 14, minStock: 8, status: "In Stock" },
];

export default function InventorySystemDemo() {
  const [items, setItems] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scannedMessage, setScannedMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "Cotton", price: "", stock: "", minStock: 10 });

  const categories = ["All", "Cotton", "Denim", "Silk", "Wool", "Linen", "Polyester"];

  const handleStockChange = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          let newStatus = "In Stock";
          if (newStock === 0) newStatus = "Out of Stock";
          else if (newStock <= item.minStock) newStatus = "Low Stock";
          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );
  };

  const simulateBarcodeScan = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setSearchTerm(randomItem.barcode);
    setScannedMessage(`⚡ Barcode Scanned: [${randomItem.barcode}] matched "${randomItem.name}"`);
    setTimeout(() => setScannedMessage(""), 4000);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    const genBarcode = `BAR-${Math.floor(10000 + Math.random() * 90000)}-${newItem.category.slice(0, 3).toUpperCase()}`;
    const stockNum = Number(newItem.stock) || 0;
    const minStockNum = Number(newItem.minStock) || 10;
    let status = "In Stock";
    if (stockNum === 0) status = "Out of Stock";
    else if (stockNum <= minStockNum) status = "Low Stock";

    const created = {
      id: Date.now(),
      barcode: genBarcode,
      name: newItem.name,
      category: newItem.category,
      price: Number(newItem.price),
      stock: stockNum,
      minStock: minStockNum,
      status,
    };
    setItems([created, ...items]);
    setShowAddModal(false);
    setNewItem({ name: "", category: "Cotton", price: "", stock: "", minStock: 10 });
    setScannedMessage(`✅ Added new item with Barcode: ${genBarcode}`);
    setTimeout(() => setScannedMessage(""), 4000);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalStockCount = items.reduce((acc, curr) => acc + curr.stock, 0);
  const totalValuation = items.reduce((acc, curr) => acc + curr.stock * curr.price, 0);
  const lowStockCount = items.filter((i) => i.status === "Low Stock" || i.status === "Out of Stock").length;

  return (
    <div className="inv-app">
      {/* Top Header */}
      <header className="inv-header">
        <div className="inv-header-inner">
          <div className="inv-brand">
            <span className="inv-logo-icon">📦</span>
            <div>
              <h2>ClothWare Inventory &amp; Barcode Hub</h2>
              <p>Real-Time Warehouse Stock Tracking &amp; Dispatch Management</p>
            </div>
          </div>
          <div className="inv-header-actions">
            <button className="inv-btn inv-btn-scan" onClick={simulateBarcodeScan}>
              📷 Scan Barcode Gun
            </button>
            <button className="inv-btn inv-btn-primary" onClick={() => setShowAddModal(true)}>
              + Add New SKU
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="inv-container">
        {scannedMessage && <div className="inv-alert-banner">{scannedMessage}</div>}

        <div className="inv-kpi-grid">
          <div className="inv-kpi-card">
            <span className="inv-kpi-label">Total Unique SKUs</span>
            <span className="inv-kpi-val">{items.length}</span>
            <span className="inv-kpi-sub">Across 6 fabric categories</span>
          </div>
          <div className="inv-kpi-card">
            <span className="inv-kpi-label">Units in Warehouse</span>
            <span className="inv-kpi-val">{totalStockCount.toLocaleString()}</span>
            <span className="inv-kpi-sub">Verified physical count</span>
          </div>
          <div className="inv-kpi-card">
            <span className="inv-kpi-label">Total Inventory Valuation</span>
            <span className="inv-kpi-val">₹{totalValuation.toLocaleString()}</span>
            <span className="inv-kpi-sub">Wholesale cost basis</span>
          </div>
          <div className="inv-kpi-card alert-kpi">
            <span className="inv-kpi-label">Reorder Alerts</span>
            <span className="inv-kpi-val">{lowStockCount} items</span>
            <span className="inv-kpi-sub text-danger">Requires immediate PO</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="inv-controls-card">
          <div className="inv-search-wrap">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by Barcode (e.g. BAR-88210) or Product Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <button onClick={() => setSearchTerm("")}>Clear</button>}
          </div>

          <div className="inv-cat-filters">
            {categories.map((c) => (
              <button
                key={c}
                className={`inv-cat-btn ${selectedCategory === c ? "active" : ""}`}
                onClick={() => setSelectedCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="inv-table-card">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Barcode / SKU</th>
                <th>Product Description</th>
                <th>Fabric</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Stock Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="inv-barcode-tag">||| {item.barcode}</span>
                  </td>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    <span className="inv-cat-badge">{item.category}</span>
                  </td>
                  <td>₹{item.price.toLocaleString()}</td>
                  <td>
                    <div className="inv-qty-controls">
                      <button onClick={() => handleStockChange(item.id, -1)}>−</button>
                      <span className="inv-qty-number">{item.stock}</span>
                      <button onClick={() => handleStockChange(item.id, 1)}>+</button>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`inv-status-pill ${
                        item.status === "In Stock"
                          ? "status-ok"
                          : item.status === "Low Stock"
                          ? "status-low"
                          : "status-out"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="inv-quick-action"
                      onClick={() => handleStockChange(item.id, 10)}
                      title="Restock +10 units"
                    >
                      +10 Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="inv-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inv-modal-header">
              <h3>Register New Fabric / Garment SKU</h3>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddItem} className="inv-form">
              <div className="inv-form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premium Silk Festive Kurta"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="inv-form-row">
                <div className="inv-form-group">
                  <label>Fabric Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    <option>Cotton</option>
                    <option>Denim</option>
                    <option>Silk</option>
                    <option>Wool</option>
                    <option>Linen</option>
                    <option>Polyester</option>
                  </select>
                </div>
                <div className="inv-form-group">
                  <label>Unit Retail Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="1499"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="inv-form-row">
                <div className="inv-form-group">
                  <label>Initial Opening Stock</label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                  />
                </div>
                <div className="inv-form-group">
                  <label>Reorder Threshold (Min)</label>
                  <input
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })}
                  />
                </div>
              </div>
              <div className="inv-modal-actions">
                <button type="button" className="inv-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="inv-btn inv-btn-primary">Generate Barcode &amp; Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
