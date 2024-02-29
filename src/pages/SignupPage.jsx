import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./SignupPage.css";

function SignupPage(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setFullName(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, fullName, phoneNumber, dateOfBirth };

    authService
      .signup(requestBody)
      .then((response) => {
        setSuccessMessage(true);
        setTimeout(function () {
          navigate("/hungry-hub/login");
        }, 3500);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        navigate("/*");
      });
  };

  return (
    <div className="SignupPage">
      <div className="SignupBox">
        <h1>Create new Account</h1>
        <p>
          Already registered?<Link to={"/login"}> Login</Link>
        </p>

        <form className="SignupForm" onSubmit={handleSignupSubmit}>
          <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
            <label>FULL NAME</label>
            <TextField
              id="outlined-required"
              label="Name"
              name="user-name"
              type="text"
              value={fullName}
              onChange={handleName}
              required
            />
            <label>E-MAIL</label>
            <TextField
              id="outlined-required"
              label="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={handleEmail}
              required
            />

            <label>PASSWORD</label>
            <TextField
              id="outlined-required"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handlePassword}
              required
            />

            <label>DATE OF BIRTH</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                required
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
            <label>PHONE NUMBER</label>
            <TextField
              id="outlined-required"
              label="Phone Number"
              name="phoneNumber"
              type="text"
              pattern="(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              required
            />
          </Stack>
          <div className="SignupButtons">
            <Button
              sx={{ backgroundColor: "white", color: "#EF233C" }}
              variant="outlined"
              color="error"
              onClick={() => navigate("/hungry-hub")}
            >
              BACK
            </Button>
            <Button
              sx={{ backgroundColor: "#EF233C", color: "white" }}
              variant="contained"
              color="error"
              type="submit"
            >
              SIGN UP
            </Button>
          </div>
          {successMessage && (
            <Alert sx={{ mb: 2 }}>Registration successful!</Alert>
          )}
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignupPage;
