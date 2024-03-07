import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditProfilePage from "./pages/EditProfilePage";
import EditPasswordPage from "./pages/EditPasswordPage";
import AddressesPage from "./pages/AddressesPage";
import CreateAddressPage from "./pages/CreateAddressPage";
import EditAddressPage from "./pages/EditAddressPage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Pages">
        <Routes>
          <Route path="/hungry-hub" element={<HomePage />} />
          <Route path="/hungry-hub/signup/:roleId" element={<SignupPage />} />
          <Route
            path="/hungry-hub/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
          <Route
            path="/hungry-hub/edit-profile/:userId"
            element={<EditProfilePage />}
          />
          <Route
            path="/hungry-hub/user-addresses/:userId"
            element={<AddressesPage />}
          />
          <Route
            path="/hungry-hub/user-addresses/:userId/create"
            element={<CreateAddressPage />}
          />
          <Route
            path="/hungry-hub/user-addresses/:addressId/edit"
            element={<EditAddressPage />}
          />
          <Route
            path="/hungry-hub/restaurants/create"
            element={<CreateRestaurantPage />}
          />
          <Route
            path="/hungry-hub/edit-password/:userId"
            element={<EditPasswordPage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
