// Simple theme management
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
}

export function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}

export function setTheme(theme) {
  applyTheme(theme);
  localStorage.setItem('theme', theme);
}

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);
