import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.background = dark ? "#020617" : "#f8fafc";
  }, [dark]);

  return (
    <div onClick={() => setDark(!dark)} style={{ cursor: "pointer" }}>
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </div>
  );
};

export default ThemeToggle;
