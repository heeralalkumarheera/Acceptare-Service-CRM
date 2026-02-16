import React from "react";
import "../../styles/common.css";

const Tasks = () => {
  const tasks = [
    { task: "Call new leads", status: "Pending" },
    { task: "Send quotation", status: "Completed" },
  ];

  return (
    <div className="page">
      <h2>Tasks</h2>
      <p>Daily task management</p>

      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i}>
            {t.task}
            <span className={`badge ${t.status.toLowerCase()}`}>
              {t.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
