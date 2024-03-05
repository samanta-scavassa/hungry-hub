import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addressService from "../services/adresses.service";
import { Stack } from "@mui/material";
import { Alert, Button, TextField } from "@mui/material";
import { AuthContext } from "../context/auth.context";

export default function EditAddressPage() {
  const { addressId } = useParams();
  const [successMessage, setSuccessMessage] = useState(false);
  const [address, setAddress] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(addressId);

  const fetchAddress = () => {
    addressService
      .getAddress(addressId)
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/*");
      });
  };

  useEffect(() => {
    fetchAddress();
  }, []);

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
      .updateAddress(addressId, address)
      .then((response) => {
        setSuccessMessage(true);
        setTimeout(function () {
          navigate(`/hungry-hub/user-addresses/${user._id}`);
        }, 3500);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        navigate("/*");
      });
  };

  return (
    <div>
      <div className="EditAddressPage">
        <h1>Edit Address</h1>

        <form className="EditAddressForm" onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
            <label>Label</label>
            <TextField
              id="outlined-required"
              name="label"
              type="text"
              value={address.label}
              onChange={handleLabel}
              required
            />
            <label>Street</label>
            <TextField
              id="outlined-required"
              name="street"
              type="text"
              value={address.street}
              onChange={handleStreet}
              required
            />

            <label>Number</label>

            <TextField
              id="outlined-required"
              name="number"
              type="number"
              value={address.number}
              onChange={handleNumber}
              required
            />
            <label>City</label>
            <TextField
              id="outlined-required"
              name="city"
              type="text"
              value={address.city}
              onChange={handleCity}
              required
            />
            <label>Zip Code</label>
            <TextField
              id="outlined-required"
              name="zipCode"
              type="text"
              value={address.zipCode}
              onChange={handleZipCode}
              required
            />
            <label>Other Information</label>
            <TextField
              id="outlined-required"
              name="otherInformation"
              type="text"
              value={address.otherInformation}
              onChange={handleOtherInfo}
              required
            />
          </Stack>
          <div className="EditButtons">
            <Button
              sx={{ backgroundColor: "white", color: "#EF233C" }}
              variant="outlined"
              color="error"
              onClick={() => navigate(`/hungry-hub/user-addresses/${user._id}`)}
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
            <Alert sx={{ mb: 2 }}>Address successfully saved</Alert>
          )}
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
