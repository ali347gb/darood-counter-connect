
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminReports from "./pages/AdminReports";
import AdminEditCounters from "./pages/AdminEditCounters";
import Media from "./pages/Media";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { CounterProvider } from "./contexts/CounterContext";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CounterProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/edit-counters" element={<AdminEditCounters />} />
            <Route path="/media" element={<Media />} />
            <Route path="/library" element={<Library />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </CounterProvider>
    </AuthProvider>
  );
}

export default App;
