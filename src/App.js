import React, { useState, useEffect } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("General");
  const [filterDate, setFilterDate] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false,
        archived: false,
        dueDate,
        priority,
        category
      }
    ]);

    setInput("");
    setDueDate("");
    setPriority("low");
    setCategory("General");
  };

  const deleteTodo = id =>
    setTodos(todos.map(t => t.id === id ? { ...t, archived: true } : t));

  const toggleComplete = id =>
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const editTodo = (id, updatedFields) => {
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id === id
          ? {
            ...t,
            text: updatedFields.text || "",
            dueDate: updatedFields.dueDate || "",
            priority: updatedFields.priority || "low",
            category: updatedFields.category || "General"
          }
          : t
      )
    );
  };

  const clearCompleted = () =>
    setTodos(todos.filter(t => !t.completed));

  const filteredTodos = todos
    .filter(t => !t.archived)
    .filter(t =>
      filter === "active" ? !t.completed :
        filter === "completed" ? t.completed : true
    )
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    .filter(t => filterDate ? t.dueDate === filterDate : true)
    .filter(t => filterCategory === "all" ? true : t.category === filterCategory)
    .filter(t => filterPriority === "all" ? true : t.priority === filterPriority);


  // 📊 Stats
  const total = todos.filter(t => !t.archived).length;
  const completedCount = todos.filter(t => t.completed && !t.archived).length;
  const activeCount = total - completedCount;
  const archivedCount = todos.filter(t => t.archived).length;

  return (
    <div className={darkMode ? "app-container dark" : "app-container"}>
      <h1>Smart Todo Manager</h1>

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Theme' : 'Dark Theme'}
      </button>

      <div className="main-layout">

        {/* LEFT SIDE — CREATE TASK */}
        <div className="task-creator">
          <h2>Create Task</h2>
          <TodoInput
            input={input}
            setInput={setInput}
            addTodo={addTodo}
            dueDate={dueDate}
            setDueDate={setDueDate}
            priority={priority}
            setPriority={setPriority}
            category={category}
            setCategory={setCategory}
          />
        </div>

        {/* RIGHT SIDE — TASK DISPLAY */}
        <div className="task-display">
          <h2>Your Tasks</h2>

          <div className="top-filters">
            <input
              className="search-bar"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              type="date"
              className="date-filter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />

            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Personal">Personal</option>
            </select>

            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="stats-panel">
            <div>Total: {total}</div>
            <div>Active: {activeCount}</div>
            <div>Completed: {completedCount}</div>
            <div>Archived: {archivedCount}</div>
          </div>

          <TodoList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        </div>

      </div>

      <div className="footer">
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
