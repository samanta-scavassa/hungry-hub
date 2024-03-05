import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addressService from "../services/adresses.service";
import { Stack } from "@mui/material";
import { Alert, Button, TextField } from "@mui/material";
import "./CreateAddressPage.css";

export default function CreateAddressPage() {
  const { userId } = useParams();
  const [successMessage, setSuccessMessage] = useState(false);
  const [address, setAddress] = useState({
    userId: userId,
    label: "",
    street: "",
    number: "",
    city: "",
    zipCode: "",
    otherInformation: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleLabel = (e) =>
    setAddress((address) => ({
      ...address,
      label: e.target.value,
    }));

  const handleStreet = (e) =>
    setAddress((address) => ({
      ...address,
      street: e.target.value,
    }));

  const handleNumber = (e) =>
    setAddress((address) => ({
      ...address,
      number: e.target.value,
    }));

  const handleCity = (e) =>
    setAddress((address) => ({
      ...address,
      city: e.target.value,
    }));

  const handleZipCode = (e) =>
    setAddress((address) => ({
      ...address,
      zipCode: e.target.value,
    }));

  const handleOtherInfo = (e) =>
    setAddress((address) => ({
      ...address,
      otherInformation: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addressService
      .createAddress(address)
      .then((response) => {
        setSuccessMessage(true);
        setTimeout(function () {
          navigate(`/hungry-hub/user-addresses/${userId}`);
        }, 3500);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        navigate("/");
      });
  };

  return (
    <div>
      <div className="CreateAddressPage">
        <h1>Create Address</h1>

        <form className="CreateAddressForm" onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
            <label>Label</label>
            <TextField
              id="outlined-required"
              label="Label"
              name="label"
              type="text"
              value={address.label}
              onChange={handleLabel}
              required
            />
            <label>Street</label>
            <TextField
              id="outlined-required"
              label="Street"
              name="street"
              type="text"
              value={address.street}
              onChange={handleStreet}
              required
            />

            <label>Number</label>

            <TextField
              id="outlined-required"
              label="Number"
              name="number"
              type="number"
              value={address.number}
              onChange={handleNumber}
              required
            />
            <label>City</label>
            <TextField
              id="outlined-required"
              label="City"
              name="city"
              type="text"
              value={address.city}
              onChange={handleCity}
              required
            />
            <label>Zip Code</label>
            <TextField
              id="outlined-required"
              label="Zip Code"
              name="zipCode"
              type="text"
              value={address.zipCode}
              onChange={handleZipCode}
              required
            />
            <label>Other Information</label>
            <TextField
              id="outlined-required"
              label="Other Information"
              name="otherInformation"
              type="text"
              value={address.otherInformation}
              onChange={handleOtherInfo}
              required
            />
          </Stack>
          <div className="CreateButtons">
            <Button
              sx={{ backgroundColor: "white", color: "#EF233C" }}
              variant="outlined"
              color="error"
              onClick={() => navigate(`/hungry-hub/user-addresses/${userId}`)}
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
            <Alert sx={{ mb: 2 }}>Address successfully created</Alert>
          )}
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
