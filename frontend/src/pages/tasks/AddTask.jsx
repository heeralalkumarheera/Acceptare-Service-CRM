import React from "react";
const AddTask = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Add Task</h2>

      <input type="text" placeholder="Task Title" /><br /><br />
      <input type="date" /><br /><br />
      <select>
        <option>Pending</option>
        <option>Completed</option>
      </select><br /><br />

      <button>Add Task</button>
    </div>
  );
};

export default AddTask;