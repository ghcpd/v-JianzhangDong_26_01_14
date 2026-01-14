/**
 * UI design notes:
 * - Layout uses two columns: left for creation/editing, right for list and stats.
 * - Light blue + white palette keeps focus on task content; accents highlight actions.
 * - Padding and rounded corners give breathing room; drop shadows lift primary cards.
 */

const { useState, useMemo } = React;

const seedTasks = [
  {
    id: 1,
    title: "Prep user research",
    description: "Outline interview questions and schedule 3 sessions.",
    dueDate: "2026-01-16",
    status: "pending",
  },
  {
    id: 2,
    title: "Design system audit",
    description: "Review button states and consolidate color tokens.",
    dueDate: "2026-01-18",
    status: "completed",
  },
  {
    id: 3,
    title: "Sprint demo deck",
    description: "Collect metrics and craft the story arc for the demo.",
    dueDate: "2026-01-20",
    status: "pending",
  },
];

function App() {
  const [tasks, setTasks] = useState(seedTasks);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, completionRate };
  }, [tasks]);

  const resetForm = () => {
    setForm({ title: "", description: "", dueDate: "" });
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.dueDate) {
      setError("Title and due date are required to create clarity.");
      return;
    }
    const normalized = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
    };

    if (editingId) {
      setTasks((prev) => prev.map((t) => (t.id === editingId ? { ...t, ...normalized } : t)));
    } else {
      const newTask = {
        id: Date.now(),
        status: "pending",
        ...normalized,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    resetForm();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setForm({ title: task.title, description: task.description, dueDate: task.dueDate });
    setError("");
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "pending" ? "completed" : "pending" } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) resetForm();
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="app-shell">
      <div className="header">
        <div>
          <h1 className="title">Task Flow Dashboard</h1>
          <p className="subtitle">Plan, track, and visualize your personal to-dos.</p>
        </div>
        <div className="actions">
          <span className="chip" title="Tasks completed">
            <span className="dot" style={{ background: "var(--success)" }}></span>
            {stats.completed} done
          </span>
          <span className="chip" title="Tasks pending">
            <span className="dot" style={{ background: "var(--warning)" }}></span>
            {stats.pending} pending
          </span>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>{editingId ? "Edit task" : "Add a new task"}</h2>
          <p className="helper">Keep titles short and dates realistic to stay focused.</p>
          {error && <div className="error" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                data-testid="title-input"
                type="text"
                placeholder="Task title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="form-row">
              <textarea
                data-testid="description-input"
                rows="3"
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <input
                data-testid="due-input"
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <div className="form-row" style={{ gap: "8px" }}>
              <button className="button" type="submit" data-testid="submit-btn">
                {editingId ? "Save changes" : "Add task"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="button secondary"
                  onClick={resetForm}
                  data-testid="cancel-edit"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card">
          <h2>Summary</h2>
          <div className="stats">
            <div className="stat-card">
              <p className="stat-label">Total tasks</p>
              <p className="stat-value" data-testid="total-count">{stats.total}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Completed</p>
              <p className="stat-value" data-testid="completed-count">{stats.completed}</p>
              <div className="bar" aria-label="completion bar">
                <div className="bar-fill" style={{ width: `${stats.completionRate}%` }}></div>
              </div>
            </div>
            <div className="stat-card">
              <p className="stat-label">Pending</p>
              <p className="stat-value" data-testid="pending-count">{stats.pending}</p>
            </div>
          </div>
          <div className="progress-grid" style={{ marginTop: "12px" }}>
            <div className="pill">{stats.completionRate}% completion</div>
            <div className="badge">{stats.pending} need action</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "18px" }}>
        <div className="task-list" data-testid="task-list">
          {tasks.length === 0 && <div className="empty">You are all caught up. Add a task to begin.</div>}
          {tasks.map((task) => (
            <div className="task" key={task.id} data-testid="task-item">
              <div>
                <div className="task-header">
                  <span className={`status-dot ${task.status === "completed" ? "completed" : ""}`}></span>
                  <h3 className="task-title">{task.title}</h3>
                  <span className="tag">{task.status === "completed" ? "Done" : "Pending"}</span>
                </div>
                {task.description && <p className="task-desc">{task.description}</p>}
                <div className="meta">
                  <span>Due {formatDate(task.dueDate)}</span>
                </div>
              </div>
              <div className="task-actions">
                <button
                  className="button secondary"
                  onClick={() => toggleStatus(task.id)}
                  data-testid="toggle-status"
                >
                  {task.status === "completed" ? "Mark pending" : "Mark done"}
                </button>
                <button className="button secondary" onClick={() => startEdit(task)} data-testid="edit-task">
                  Edit
                </button>
                <button className="button" onClick={() => deleteTask(task.id)} data-testid="delete-task">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
