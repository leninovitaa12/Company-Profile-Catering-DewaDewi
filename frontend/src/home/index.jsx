import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css" // Change this from App.css to index.css

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

