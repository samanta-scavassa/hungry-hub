import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Pages">
        <Routes>
          <Route path="/hungry-hub" element={<HomePage />} />
          <Route path="/hungry-hub/signup" element={<SignupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
