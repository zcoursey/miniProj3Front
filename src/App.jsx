import { BrowserRouter, Routes, Route } from "react-router-dom";
//Toaster is a toast notification library, looks pretty cool
import { Toaster } from "react-hot-toast";
import GlowingCursorEffect from "./components/GlowingCursorEffect";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import "./App.css"; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <GlowingCursorEffect />
        <div className="min-h-screen bg-black">
          <header className="bg-black text-white text-center py-4 relative z-10">
            <h1 className="text-3xl font-bold uppercase">South Carolina Colleges</h1>
            <p className="text-sm text-gray-400">Discover the best schools of our state</p>
          </header>
          <Navbar />
          <div className="container mx-auto p-4 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;

