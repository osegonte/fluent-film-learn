// Theme initialization
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './theme.js'

createRoot(document.getElementById("root")!).render(<App />);
