import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; 
import Navbar from "./components/Navbar";
import Tours from "./pages/Tours";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tours" element={<Tours />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

