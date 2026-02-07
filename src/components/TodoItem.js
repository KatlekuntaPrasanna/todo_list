import { useState } from "react";

function TodoItem({ todo, deleteTodo, toggleComplete, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);

    const [newText, setNewText] = useState(todo.text);
    const [newDate, setNewDate] = useState(todo.dueDate || "");
    const [newPriority, setNewPriority] = useState(todo.priority || "low");
    const [newCategory, setNewCategory] = useState(todo.category || "General");

    const handleSave = () => {
        if (!newText.trim()) return;

        editTodo(todo.id, {
            text: newText,
            dueDate: newDate,
            priority: newPriority,
            category: newCategory
        });

        setIsEditing(false);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        return new Date(dateStr).toLocaleDateString();
    };

    const isOverdue =
        todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

    return (
        <li className={`todo-item ${todo.completed ? "completed" : ""} ${todo.priority} ${isOverdue ? "overdue" : ""}`}>

            <div className="left">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                />

                {isEditing ? (
                    <div className="edit-form">
                        <input
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            placeholder="Task name"
                        />

                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />

                        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                            <option>General</option>
                            <option>Work</option>
                            <option>Study</option>
                            <option>Personal</option>
                        </select>
                    </div>
                ) : (
                    <div className="task-info">
                        <span className="task-text">{todo.text}</span>
                        <div className="task-meta">
                            {todo.dueDate && (
                                <span className={isOverdue ? "overdue-date" : ""}>
                                    📅 {formatDate(todo.dueDate)}
                                </span>
                            )}
                            <span>🏷 {todo.category}</span>
                            <span className={`priority-label ${todo.priority}`}>
                                {todo.priority.toUpperCase()}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="actions">
                {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>

        </li>
    );
}

export default TodoItem;

