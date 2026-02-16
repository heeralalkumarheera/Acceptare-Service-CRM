import React from "react";
import "./tasks.css";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Call client for demo",
      assignedTo: "Riya",
      dueDate: "05 Jan 2025",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "Prepare quotation",
      assignedTo: "Aman",
      dueDate: "04 Jan 2025",
      priority: "Medium",
      status: "Completed",
    },
    {
      id: 3,
      title: "Follow up payment",
      assignedTo: "Neha",
      dueDate: "06 Jan 2025",
      priority: "Low",
      status: "In Progress",
    },
  ];

  return (
    <div className="tasks-page">
      <h1 className="page-title">Tasks</h1>

      <div className="card">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>
                  <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;