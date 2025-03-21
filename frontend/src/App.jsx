import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Dashboard />} />
        <Route path="/programs" element={<Dashboard />} />
        <Route path="/about" element={<Dashboard />} />
        <Route path="/contact" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App

