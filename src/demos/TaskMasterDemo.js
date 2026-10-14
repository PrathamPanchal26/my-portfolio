import React, { useState, useEffect, useMemo } from "react";

const INITIAL_TASKS = [
  {
    id: "tm-1",
    title: "Finalize Kanha Construction Turnkey Blueprint review",
    description: "Verify structural civil drawings, RCC column specifications, and client approval.",
    category: "Architecture",
    priority: "High",
    dueDate: "2026-10-18",
    completed: false,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "tm-2",
    title: "Deploy Vercel serverless contact API handler",
    description: "Integrate direct SMTP notification webhook with spam protection.",
    category: "Development",
    priority: "High",
    dueDate: "2026-10-15",
    completed: true,
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "tm-3",
    title: "Benchmark Spotify Bollywood Audio synthesizer latency",
    description: "Ensure Web Audio API buffer stays under 12ms across mobile browsers.",
    category: "Development",
    priority: "Medium",
    dueDate: "2026-10-22",
    completed: false,
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "tm-4",
    title: "Client Consultation with Interior Design team",
    description: "Discuss 3D modular kitchen finishes and false-ceiling lighting layout.",
    category: "Meetings",
    priority: "Medium",
    dueDate: "2026-10-20",
    completed: false,
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: "tm-5",
    title: "Update resume PDF and certifications showcase",
    description: "Add React 19 and advanced responsive design credentials.",
    category: "Personal",
    priority: "Low",
    dueDate: "2026-10-25",
    completed: true,
    createdAt: Date.now() - 86400000 * 5,
  },
];

const CATEGORIES = ["All", "Architecture", "Development", "Meetings", "Personal"];

export default function TaskMasterDemo() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("pratham_taskmaster_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TASKS;
  });

  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("pratham_taskmaster_data", JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2800);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, title: title.trim(), description: description.trim(), category, priority, dueDate }
            : t
        )
      );
      setEditingId(null);
      showNotification("Task successfully updated! ✏️");
    } else {
      const newTask = {
        id: "tm-" + Date.now(),
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        dueDate: dueDate || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
      showNotification("New task created! 🚀");
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  const handleStartEdit = (t) => {
    setEditingId(t.id);
    setTitle(t.title);
    setDescription(t.description || "");
    setCategory(t.category);
    setPriority(t.priority);
    setDueDate(t.dueDate || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showNotification("Task deleted 🗑️");
  };

  const handleResetDefaults = () => {
    setTasks(INITIAL_TASKS);
    showNotification("Reset to sample portfolio tasks! 🔄");
  };

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Status filter
      if (activeTab === "active" && t.completed) return false;
      if (activeTab === "completed" && !t.completed) return false;
      if (activeTab === "high" && t.priority !== "High") return false;

      // Category filter
      if (selectedCategory !== "All" && t.category !== selectedCategory) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(query);
        const matchesDesc = (t.description || "").toLowerCase().includes(query);
        const matchesCat = t.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [tasks, activeTab, selectedCategory, searchQuery]);

  // Statistics
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const highPriorityCount = tasks.filter((t) => t.priority === "High" && !t.completed).length;

  return (
    <div className="tm-container">
      {/* Toast Notification */}
      {notification && <div className="tm-toast">{notification}</div>}

      {/* Header */}
      <header className="tm-header">
        <div className="tm-header-top">
          <div className="tm-badge">FULL-STACK TASK &amp; PRODUCTIVITY SUITE</div>
          <h1>
            TaskMaster <span className="tm-highlight">Pro</span>
          </h1>
          <p className="tm-tagline">
            Simulated MERN Architecture · Real-time LocalStorage Persistence · Categorized Task Operations
          </p>
        </div>

        {/* Stats Strip */}
        <div className="tm-stats-grid">
          <div className="tm-stat-card">
            <span className="tm-stat-val">{totalCount}</span>
            <span className="tm-stat-lbl">Total Tasks</span>
          </div>
          <div className="tm-stat-card">
            <span className="tm-stat-val" style={{ color: "#22c55e" }}>
              {completedCount}
            </span>
            <span className="tm-stat-lbl">Completed</span>
          </div>
          <div className="tm-stat-card">
            <span className="tm-stat-val" style={{ color: "#3b82f6" }}>
              {activeCount}
            </span>
            <span className="tm-stat-lbl">In Progress</span>
          </div>
          <div className="tm-stat-card">
            <span className="tm-stat-val" style={{ color: "#ef4444" }}>
              {highPriorityCount}
            </span>
            <span className="tm-stat-lbl">Urgent / High</span>
          </div>
          <div className="tm-stat-card tm-progress-card">
            <div className="tm-progress-top">
              <span className="tm-stat-lbl">Productivity</span>
              <span className="tm-stat-val-sm">{completionPercent}%</span>
            </div>
            <div className="tm-progress-bar-bg">
              <div
                className="tm-progress-bar-fill"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Form + List */}
      <div className="tm-main-grid">
        {/* Left Column: Form */}
        <aside className="tm-form-pane">
          <div className="tm-form-card">
            <h3>{editingId ? "✏️ Edit Task" : "➕ Create New Task"}</h3>
            <p className="tm-form-desc">
              {editingId
                ? "Modify task attributes and save changes."
                : "Plan new sprint goals, architectural deadlines or daily items."}
            </p>

            <form onSubmit={handleSaveTask}>
              <div className="tm-field">
                <label htmlFor="tm-title">Task Title *</label>
                <input
                  id="tm-title"
                  type="text"
                  placeholder="e.g. Conduct client design sprint..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="tm-field">
                <label htmlFor="tm-desc">Description</label>
                <textarea
                  id="tm-desc"
                  rows="3"
                  placeholder="Key milestones, specifications or dependencies..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="tm-field-row">
                <div className="tm-field">
                  <label htmlFor="tm-cat">Category</label>
                  <select
                    id="tm-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Development">💻 Development</option>
                    <option value="Architecture">🏛️ Architecture</option>
                    <option value="Meetings">🤝 Meetings</option>
                    <option value="Personal">🎯 Personal</option>
                  </select>
                </div>

                <div className="tm-field">
                  <label htmlFor="tm-prio">Priority</label>
                  <select
                    id="tm-prio"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">🔴 High Priority</option>
                    <option value="Medium">🟡 Medium Priority</option>
                    <option value="Low">🟢 Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="tm-field">
                <label htmlFor="tm-date">Target Due Date</label>
                <input
                  id="tm-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="tm-form-actions">
                <button type="submit" className="tm-btn-primary">
                  {editingId ? "Update Task" : "Add Task to Sprint"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="tm-btn-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="tm-reset-box">
              <button
                type="button"
                className="tm-btn-reset"
                onClick={handleResetDefaults}
              >
                🔄 Restore Sample Data
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Search, Tabs & Task List */}
        <section className="tm-list-pane">
          {/* Controls Bar */}
          <div className="tm-controls-bar">
            {/* Search Input */}
            <div className="tm-search-box">
              <span className="tm-search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search tasks, descriptions or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="tm-search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="tm-category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`tm-cat-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status Tabs */}
          <div className="tm-tabs-row">
            <div className="tm-tabs-group">
              <button
                type="button"
                className={`tm-tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                className={`tm-tab-btn ${activeTab === "active" ? "active" : ""}`}
                onClick={() => setActiveTab("active")}
              >
                Active ({activeCount})
              </button>
              <button
                type="button"
                className={`tm-tab-btn ${activeTab === "completed" ? "active" : ""}`}
                onClick={() => setActiveTab("completed")}
              >
                Completed ({completedCount})
              </button>
              <button
                type="button"
                className={`tm-tab-btn ${activeTab === "high" ? "active" : ""}`}
                onClick={() => setActiveTab("high")}
              >
                Urgent ({highPriorityCount})
              </button>
            </div>

            <span className="tm-showing-counter">
              Showing {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {/* Tasks List */}
          <div className="tm-task-list">
            {filteredTasks.length === 0 ? (
              <div className="tm-empty-state">
                <div className="tm-empty-icon">📋</div>
                <h4>No tasks found matching criteria</h4>
                <p>Try clearing filters or add a new task using the left sidebar.</p>
                {(searchQuery || selectedCategory !== "All" || activeTab !== "all") && (
                  <button
                    type="button"
                    className="tm-btn-secondary"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setActiveTab("all");
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              filteredTasks.map((t) => {
                const isOverdue =
                  t.dueDate &&
                  !t.completed &&
                  new Date(t.dueDate).setHours(23, 59, 59, 999) < Date.now();

                return (
                  <article
                    key={t.id}
                    className={`tm-task-card ${t.completed ? "is-completed" : ""}`}
                  >
                    <div className="tm-task-check-col">
                      <button
                        type="button"
                        className={`tm-checkbox ${t.completed ? "checked" : ""}`}
                        onClick={() => handleToggleComplete(t.id)}
                        aria-label={t.completed ? "Mark incomplete" : "Mark completed"}
                      >
                        {t.completed ? "✓" : ""}
                      </button>
                    </div>

                    <div className="tm-task-body">
                      <div className="tm-task-meta-top">
                        <span className="tm-pill-cat">{t.category}</span>
                        <span
                          className={`tm-pill-prio prio-${t.priority.toLowerCase()}`}
                        >
                          {t.priority}
                        </span>
                        {t.dueDate && (
                          <span
                            className={`tm-pill-date ${isOverdue ? "is-overdue" : ""}`}
                          >
                            📅 {t.dueDate} {isOverdue && "(Overdue)"}
                          </span>
                        )}
                      </div>

                      <h4 className="tm-task-title">{t.title}</h4>

                      {t.description && (
                        <p className="tm-task-description">{t.description}</p>
                      )}
                    </div>

                    <div className="tm-task-actions-col">
                      <button
                        type="button"
                        className="tm-action-btn"
                        onClick={() => handleStartEdit(t)}
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="tm-action-btn tm-btn-del"
                        onClick={() => handleDeleteTask(t.id)}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
