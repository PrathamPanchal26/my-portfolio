import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post(API_URL, { title, description });
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/toggle`);
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.put(`${API_URL}/${editingId}`, { title, description });
      setEditingId(null);
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>📝 My Tasks</h1>
          <p>Stay organized and get things done!</p>
        </header>

        <form className="todo-form" onSubmit={editingId ? updateTodo : addTodo}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-input"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="todo-button">
            {editingId ? '✏️ Update' : '➕ Add Task'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => {
                setEditingId(null);
                setTitle('');
                setDescription('');
              }}
            >
              ❌ Cancel
            </button>
          )}
        </form>

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content" onClick={() => toggleTodo(todo._id)}>
                <span className="todo-checkbox">
                  {todo.completed ? '✅' : '⬜'}
                </span>
                <div className="todo-text">
                  <span className="todo-title">{todo.title}</span>
                  {todo.description && (
                    <span className="todo-description">{todo.description}</span>
                  )}
                </div>
              </div>
              <div className="todo-actions">
                <button 
                  className="edit-btn"
                  onClick={() => startEdit(todo)}
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => deleteTodo(todo._id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>

        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <p>No tasks found! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
