import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./headers/Headers";
import HomePage from "./pages/HomePage";
import Log from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import Favorits from "./cards/favorits";
import UserCards from "./pages/userCards";
import CrateuserCard from "./pages/crateuserCard";
import About from "./pages/abouts";
import Erorr from "./pages/Erorr";
import AdminEria from "./pages/AdminEria";
import AllusersArea from "./pages/AllusersArea";
import Footer from "./conponntas/Footer";
import { Button } from "react-bootstrap";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  }, [theme]);

  return (
    <div style={{ minHeight: "100vh" }}>
  
      <div style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
        <Button variant={theme === "light" ? "dark" : "light"} onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Bright Mode"}
        </Button>
      </div>

      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Log />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/favourites" element={<Favorits />} />
        <Route path="/userCards" element={<UserCards />} />
        <Route path="/crateuserCard" element={<CrateuserCard />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Erorr />} />
        <Route path="/admin" element={<AdminEria />} />
        <Route path="/allusers" element={<AllusersArea />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
