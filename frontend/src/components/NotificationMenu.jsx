import React, { useState } from "react";
import { Bell } from "lucide-react";

const NotificationMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Bell size={20} onClick={() => setOpen(!open)} style={{ cursor: "pointer" }} />

      {open && (
        <div style={box}>
          <p><b>Notifications</b></p>
          <hr />
          <p>🔔 New Lead added</p>
          <p>📄 Proposal Approved</p>
          <p>💰 Payment received</p>
        </div>
      )}
    </div>
  );
};

const box = {
  position: "absolute",
  right: 0,
  top: "40px",
  background: "#fff",
  width: "220px",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  zIndex: 10,
};

export default NotificationMenu;
