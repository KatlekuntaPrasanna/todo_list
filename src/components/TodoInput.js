import React from "react";

function TodoInput({
    input, setInput, addTodo,
    dueDate, setDueDate,
    priority, setPriority,
    category, setCategory,
    filterDate, setFilterDate
}) {
    return (
        <div className="input-section">

            {/* Task Name */}
            <input
                type="text"
                placeholder="Enter task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />

            {/* Task Due Date */}
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            {/* Priority */}
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            {/* Category */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>General</option>
                <option>Work</option>
                <option>Study</option>
                <option>Personal</option>
            </select>

            {/* Add Button */}
            <button onClick={addTodo}>Add</button>

        </div>
    );
}

export default TodoInput;
