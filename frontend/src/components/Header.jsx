import React from "react";
import { Bell, Moon, Sun, User, LogOut } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [dark, setDark] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>Dashboard</h2>
      </div>

      <div className="header-right">
        {/* Dark Mode */}
        <button className="icon-btn" onClick={toggleDark}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification */}
        <button className="icon-btn">
          <Bell size={18} />
          <span className="badge">3</span>
        </button>

        {/* Profile */}
        <div className="profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            onClick={() => setOpenProfile(!openProfile)}
          />

          {openProfile && (
            <div className="dropdown">
              <p><User size={14} /> Riya Kumari</p>
              <p><LogOut size={14} /> Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
