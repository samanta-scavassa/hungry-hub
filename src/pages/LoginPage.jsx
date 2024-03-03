import { Button, TextField } from "@mui/material";
import authService from "../services/auth.service";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Stack } from "@mui/system";
import "./LoginPage.css";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/hungry-hub");
      })
      .catch((error) => {
        console.error(error);
        navigate("/*");
      });
  };

  return (
    <div>
      <div className="LoginBox">
        <h1>Login</h1>
        <p>Sign in to continue</p>

        <form className="LoginForm" onSubmit={handleLoginSubmit}>
          <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
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
          </Stack>
          <div className="LoginButtons">
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
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
