import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.body.classList.add("bg-dark");
      document.body.classList.remove("bg-light");
    } else {
      document.body.classList.add("bg-light");
      document.body.classList.remove("bg-dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <label className="switch">
      <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
      <span className="slider"></span>
    </label>
  );
}

export default ThemeToggle;
