import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import "./App.css";
import LoginPage from "./pages/login-page/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
