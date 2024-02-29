import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import userService from "../services/users.service";
import { Stack } from "@mui/system";
import { Alert, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./EditProfilePage.css";

export default function EditProfilePage() {
  const { userId } = useParams();
  const [successMessage, setSuccessMessage] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const navigate = useNavigate();

  const fetchUser = () => {
    userService
      .getUser(userId)
      .then((res) => {
        setUser(res.data);
        setDateOfBirth(res.data.dateOfBirth);
      })
      .catch((err) => {
        console.log(err);
        navigate("/*");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("The user that i am trying to edit =>", user);
  if (!user) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleEmail = (e) =>
    setUser((user) => {
      return { ...user, email: e.target.value };
    });
  const handlePassword = (e) =>
    setUser((user) => {
      return { ...user, password: e.target.value };
    });
  const handleName = (e) =>
    setUser((user) => {
      return { ...user, fullName: e.target.value };
    });
  const handlePhoneNumber = (e) =>
    setUser((user) => {
      return { ...user, phoneNumber: e.target.value };
    });

  const handleEditSubmit = (e) => {
    e.preventDefault();

    userService
      .updateUser(userId, user)
      .then((response) => {
        setSuccessMessage(true);
        setTimeout(function () {
          navigate("/hungry-hub/login");
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
      <div className="EditProfilePage">
        <h1>Edit profile</h1>

        <form className="EditProfileForm" onSubmit={handleEditSubmit}>
          <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
            <label>FULL NAME</label>
            <TextField
              id="outlined-required"
              label="Name"
              name="user-name"
              type="text"
              value={user.fullName}
              onChange={handleName}
              required
            />
            <label>E-MAIL</label>
            <TextField
              id="outlined-required"
              label="E-mail"
              name="email"
              type="email"
              value={user.email}
              onChange={handleEmail}
              required
            />

            <label>PASSWORD</label>
            <TextField
              id="outlined-required"
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handlePassword}
              required
            />

            <label>DATE OF BIRTH</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={user.dateOfBirth}
                onChange={(date) => {
                  setDateOfBirth(date);
                  setUser((user) => {
                    return { ...user, dateOfBirth: dateOfBirth };
                  });
                }}
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
              value={user.phoneNumber}
              onChange={handlePhoneNumber}
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
            <Alert sx={{ mb: 2 }}>User succesfully saved</Alert>
          )}
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
