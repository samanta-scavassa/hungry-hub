import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <Routes>
      <Route path="/hungry-hub" element={<HomePage />} />
      <Route path="/hungry-hub/signup" element={<SignupPage />} />
      <Route path="/hungry-hub/login" element={<LoginPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
