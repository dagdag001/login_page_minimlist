import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { WelcomePage } from "./pages/WelcomePage";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </>
  );
}
