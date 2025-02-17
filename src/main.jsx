import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // Import file CSS thuần

// Import Prism core
import Prism from "prismjs";

// Import theme
import "prismjs/themes/prism-tomorrow.css";

// Import languages
import "prismjs/components/prism-bash"; // Thêm support cho bash/shell
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";

// Highlight tất cả code blocks khi component mount
document.addEventListener("DOMContentLoaded", () => {
  Prism.highlightAll();
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
