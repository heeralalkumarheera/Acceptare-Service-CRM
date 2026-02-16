import React, { useState } from "react";
import { User, LogOut, Settings } from "lucide-react";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        <User size={26} />
      </div>

      {open && (
        <div style={menuStyle}>
          <div style={item}><Settings size={16} /> Settings</div>
          <div style={item}><LogOut size={16} /> Logout</div>
        </div>
      )}
    </div>
  );
};

const menuStyle = {
  position: "absolute",
  right: 0,
  top: "40px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  width: "160px",
  zIndex: 10,
};

const item = {
  padding: "10px",
  display: "flex",
  gap: "8px",
  cursor: "pointer",
};

export default ProfileMenu;
