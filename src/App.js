import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import "./App.css";
import LoginPage from "./pages/login-page/LoginPage";
import BloodBankComponent from "./components/bloodBankComponent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blood-bank" element={<BloodBankComponent />} />
      </Routes>
    </div>
  );
}

export default App;
