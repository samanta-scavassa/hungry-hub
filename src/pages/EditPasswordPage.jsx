import { Alert, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import userService from "../services/users.service";
import "./EditPasswordPage.css"

export default function EditPasswordPage() {
    const { userId } = useParams();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handlePassword = (e) => setPassword(e.target.value);
  
    const handleEditPassword = (e) => {
      e.preventDefault();
  
      userService
        .updateUserPassword(userId, {password:password})
        .then((response) => {
          setSuccessMessage(true);
          setTimeout(function () {
            navigate("/hungry-hub");
          }, 3500);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
          console.log(errorDescription);
          navigate("/*");
        });
    };
    return (
      <div>
        <div className="EditPasswordPage">
          <h1>Change password</h1>
  
          <form className="EditPasswordForm" onSubmit={handleEditPassword}>
            <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
              <label>PASSWORD</label>
              <TextField
                id="outlined-required"
                label="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePassword}
                required
              />
            </Stack>
            <div className="EditButtons">
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
                SAVE
              </Button>
            </div>
            {successMessage && (
              <Alert sx={{ mb: 2 }}>Password succesfully updated</Alert>
            )}
          </form>
  
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    );
  }
  