import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialAdminProjects = [
  {
    id: "proj_1",
    title: "Rajdeep Villa Residential",
    category: "Residential",
    location: "Nikol, Ahmedabad",
    area: "5,000 SQ. FT.",
    projectType: "Turnkey Project",
    status: "Published",
  },
  {
    id: "proj_2",
    title: "S.P. Ring Road Commercial Hub",
    category: "Commercial",
    location: "S.P. Ring Road, Ahmedabad",
    area: "24,000 SQ. FT.",
    projectType: "Turnkey Project",
    status: "Published",
  },
  {
    id: "proj_3",
    title: "Naroda Industrial Warehouse",
    category: "Industrial",
    location: "Naroda GIDC, Ahmedabad",
    area: "15,000 SQ. FT.",
    projectType: "Structural Engineering",
    status: "Published",
  },
  {
    id: "proj_4",
    title: "Lifecare Hospital Interior Suite",
    category: "Hospital",
    location: "Naroda, Ahmedabad",
    area: "8,500 SQ. FT.",
    projectType: "Interior Project",
    status: "Published",
  },
  {
    id: "proj_5",
    title: "Luxury Living & Kitchen Suite",
    category: "Interior",
    location: "Nikol, Ahmedabad",
    area: "1,800 SQ. FT.",
    projectType: "Interior Project",
    status: "Published",
  },
  {
    id: "proj_6",
    title: "Master Suite & Vanity Lounge",
    category: "Interior",
    location: "Ahmedabad",
    area: "1,200 SQ. FT.",
    projectType: "Interior Project",
    status: "Published",
  },
];

const initialInquiries = [
  { id: 1, name: "Hardik Patel", phone: "+91 98982 11029", service: "Turnkey Villa Construction", location: "Nikol, Ahmedabad", date: "Today, 10:15 AM", status: "New Lead" },
  { id: 2, name: "Mehul Shah", phone: "+91 98250 44910", service: "Industrial Shed Erection", location: "Naroda GIDC", date: "Yesterday", status: "Contacted" },
  { id: 3, name: "Dr. Ananya Joshi", phone: "+91 99042 88123", service: "Hospital Clinic Interior", location: "Bapunagar, Ahmedabad", date: "2 days ago", status: "In Progress" },
  { id: 4, name: "Vikram Singhania", phone: "+91 97240 55198", service: "Commercial Elevation Design", location: "S.P. Ring Road", date: "3 days ago", status: "Converted" },
];

export default function KanhaAdminDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState("projects");
  const [projectsList, setProjectsList] = useState(initialAdminProjects);
  const [inquiriesList] = useState(initialInquiries);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProj, setNewProj] = useState({ title: "", category: "Residential", location: "Nikol, Ahmedabad", area: "3,500 SQ. FT.", projectType: "Turnkey Project" });
  const [toastMsg, setToastMsg] = useState("");

  // Company info state
  const [companyInfo, setCompanyInfo] = useState({
    name: "KANHA Construction & Interior",
    phone: "+91 9898749575",
    email: "kanha.consinterio@gmail.com",
    address: "Nikol, Ahmedabad, Gujarat, India",
    instagram: "https://www.instagram.com/kanha_construction_interiors?igsh=aGZ2YzN1anE4Z3N3",
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsVerifying(true);

    setTimeout(() => {
      // Default credentials are admin / 1234 (also supports any input for demo ease)
      if (username.trim().toLowerCase() === "admin" && (password === "1234" || password.length > 0)) {
        setIsAuthenticated(true);
        setIsVerifying(false);
      } else {
        setIsVerifying(false);
        setErrorMsg("Invalid credentials. Try username: admin & password: 1234");
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setUsername("admin");
    setPassword("1234");
    setIsAuthenticated(true);
  };

  const handleDeleteProject = (id) => {
    setProjectsList(prev => prev.filter(p => p.id !== id));
    showToast("Project deleted from live CMS database.");
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProj.title) return;
    const item = {
      id: `proj_${Date.now()}`,
      title: newProj.title,
      category: newProj.category,
      location: newProj.location,
      area: newProj.area,
      projectType: newProj.projectType,
      status: "Published",
    };
    setProjectsList([item, ...projectsList]);
    setShowAddModal(false);
    setNewProj({ title: "", category: "Residential", location: "Nikol, Ahmedabad", area: "3,500 SQ. FT.", projectType: "Turnkey Project" });
    showToast(`✅ "${item.title}" successfully published to portfolio!`);
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    showToast("Company profile details updated and saved successfully!");
  };

  return (
    <div className="kanha-admin-page">
      {!isAuthenticated ? (
        /* Login Screen (Exact replica of https://kanha-portfolio-eta.vercel.app/admin) */
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <div className="admin-login-header">
              <div className="admin-login-brand">
                <div className="admin-logo-box">K</div>
                <div>
                  <span className="admin-brand-name">KANHA</span>
                  <span className="admin-brand-sub">ADMIN PORTAL</span>
                </div>
              </div>

              <span className="admin-security-pill">
                🛡️ Authorized Personnel Only
              </span>

              <h2>Sign In to Dashboard</h2>
              <p>Customer and public access is restricted. Enter your administrator credentials to proceed.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="admin-login-form">
              <div className="form-group">
                <label>👤 Admin Username</label>
                <input
                  type="text"
                  required
                  placeholder="Enter username (admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>🔑 Admin Password / Security PIN</label>
                <div className="pass-input-row">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter Password or PIN (Default: 1234)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="pass-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title="Toggle visibility"
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="admin-login-error">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button type="submit" className="admin-auth-btn" disabled={isVerifying}>
                {isVerifying ? "Verifying Credentials..." : "Authenticate & Enter Dashboard ➔"}
              </button>

              <button
                type="button"
                className="admin-demo-fast-btn"
                onClick={handleQuickDemoLogin}
              >
                ⚡ 1-Click Demo Login (Auto admin / 1234)
              </button>
            </form>

            <div className="admin-login-foot">
              <Link to="/demos/kanha-portfolio">
                ← Return to Public Kanha Website
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="admin-dashboard-layout">
          {/* Top Admin Bar */}
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <div className="admin-logo-box small">K</div>
              <div>
                <strong>KANHA Construction &amp; Interior</strong>
                <span className="admin-badge-live">CMS MANAGEMENT CONSOLE</span>
              </div>
            </div>

            <div className="admin-topbar-right">
              <Link to="/demos/kanha-portfolio" className="btn-view-site" target="_blank" rel="noreferrer">
                🌐 View Live Site ↗
              </Link>
              <div className="admin-profile-pill">
                <span>👨‍💼 Administrator</span>
              </div>
              <button className="btn-logout" onClick={() => setIsAuthenticated(false)}>
                🚪 Sign Out
              </button>
            </div>
          </header>

          {/* Toast Notification */}
          {toastMsg && <div className="admin-toast-banner">{toastMsg}</div>}

          {/* Main Dashboard Workspace */}
          <main className="admin-container">
            {/* KPI Cards */}
            <div className="admin-kpi-row">
              <div className="admin-kpi-card">
                <span className="kpi-title">Active Projects</span>
                <span className="kpi-value">{projectsList.length}</span>
                <span className="kpi-note text-cyan">All published &amp; verified</span>
              </div>
              <div className="admin-kpi-card">
                <span className="kpi-title">Inquiries &amp; Leads</span>
                <span className="kpi-value">{inquiriesList.length}</span>
                <span className="kpi-note text-cyan">Nikol &amp; Ahmedabad leads</span>
              </div>
              <div className="admin-kpi-card">
                <span className="kpi-title">Total Executed Area</span>
                <span className="kpi-value">65,000+</span>
                <span className="kpi-note text-cyan">Sq. Ft. Built &amp; Handed Over</span>
              </div>
              <div className="admin-kpi-card">
                <span className="kpi-title">Server Telemetry</span>
                <span className="kpi-value">Active</span>
                <span className="kpi-note text-green">Vercel Edge Cloud • 100%</span>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="admin-tabs-nav">
              <button
                className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                📁 Projects Manager ({projectsList.length})
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "inquiries" ? "active" : ""}`}
                onClick={() => setActiveTab("inquiries")}
              >
                ✉️ Customer Inquiries ({inquiriesList.length})
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "company" ? "active" : ""}`}
                onClick={() => setActiveTab("company")}
              >
                ⚙️ Company Profile &amp; Contact
              </button>
            </div>

            {/* Tab 1: Project Management */}
            {activeTab === "projects" && (
              <div className="admin-content-box">
                <div className="admin-box-header">
                  <div>
                    <h3>Published Projects ({projectsList.length})</h3>
                    <p>Manage all residential, commercial, industrial, hospital, and interior projects displayed on the public site.</p>
                  </div>
                  <button className="btn-add-proj" onClick={() => setShowAddModal(true)}>
                    + Add New Project
                  </button>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Project Title</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Built-up Area</th>
                        <th>Execution Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectsList.map((p) => (
                        <tr key={p.id}>
                          <td><strong>{p.title}</strong></td>
                          <td><span className="badge-cat">{p.category}</span></td>
                          <td>{p.location}</td>
                          <td>{p.area}</td>
                          <td>{p.projectType}</td>
                          <td><span className="badge-status-pub">● {p.status}</span></td>
                          <td>
                            <button
                              className="btn-tbl-del"
                              onClick={() => handleDeleteProject(p.id)}
                              title="Delete project"
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Inquiries & Leads */}
            {activeTab === "inquiries" && (
              <div className="admin-content-box">
                <div className="admin-box-header">
                  <div>
                    <h3>Customer Inquiries &amp; Consultation Leads ({inquiriesList.length})</h3>
                    <p>Real-time inquiries received via website consultation form and phone hotline.</p>
                  </div>
                  <button className="btn-add-proj" onClick={() => showToast("Inquiry report exported to CSV.")}>
                    📥 Export Leads CSV
                  </button>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Phone Number</th>
                        <th>Requested Service</th>
                        <th>Plot Location</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiriesList.map((inq) => (
                        <tr key={inq.id}>
                          <td><strong>{inq.name}</strong></td>
                          <td><a href={`tel:${inq.phone}`} style={{ color: "#38bdf8" }}>{inq.phone}</a></td>
                          <td>{inq.service}</td>
                          <td>{inq.location}</td>
                          <td>{inq.date}</td>
                          <td><span className="badge-status-pub">{inq.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Company Settings */}
            {activeTab === "company" && (
              <div className="admin-content-box">
                <div className="admin-box-header">
                  <div>
                    <h3>Company Profile &amp; Contact Telemetry</h3>
                    <p>Update phone numbers, office address, and social links displayed across the site.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveCompany} className="admin-company-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Company Legal Name</label>
                      <input
                        type="text"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Official Phone (Calling &amp; WhatsApp)</label>
                      <input
                        type="text"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Inquiry Email Address</label>
                      <input
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Head Office Address</label>
                      <input
                        type="text"
                        value={companyInfo.address}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Instagram Handle URL</label>
                    <input
                      type="url"
                      value={companyInfo.instagram}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, instagram: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-add-proj">
                    💾 Save &amp; Publish Telemetry
                  </button>
                </form>
              </div>
            )}
          </main>

          {/* Add Project Modal */}
          {showAddModal && (
            <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
              <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="admin-modal-head">
                  <h3>Register &amp; Publish New Project</h3>
                  <button onClick={() => setShowAddModal(false)}>✕</button>
                </div>

                <form onSubmit={handleAddProject} className="admin-modal-form">
                  <div className="form-group">
                    <label>Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Skyline Luxury Duplex"
                      value={newProj.title}
                      onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={newProj.category}
                        onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                      >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                        <option>Hospital</option>
                        <option>Interior</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Built-up Area</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 4,200 SQ. FT."
                        value={newProj.area}
                        onChange={(e) => setNewProj({ ...newProj, area: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nikol, Ahmedabad"
                        value={newProj.location}
                        onChange={(e) => setNewProj({ ...newProj, location: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Execution Typology</label>
                      <select
                        value={newProj.projectType}
                        onChange={(e) => setNewProj({ ...newProj, projectType: e.target.value })}
                      >
                        <option>Turnkey Project</option>
                        <option>Architectural Design</option>
                        <option>Structural Engineering</option>
                        <option>Interior Project</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                    <button type="submit" className="btn-add-proj">Publish Project ➔</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
