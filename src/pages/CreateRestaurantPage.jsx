import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, FormControlLabel, Checkbox } from "@mui/material";
import { Alert, Button, TextField } from "@mui/material";
import restaurantService from "../services/restaurants.service";

export default function CreateRestaurantPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    image: null,
    userId: userId,
    operatingHours: {
      Monday: { openingTime: "", closingTime: "", checked: false },
      Tuesday: { openingTime: "", closingTime: "", checked: false },
      Wednesday: { openingTime: "", closingTime: "", checked: false },
      Thursday: { openingTime: "", closingTime: "", checked: false },
      Friday: { openingTime: "", closingTime: "", checked: false },
      Saturday: { openingTime: "", closingTime: "", checked: false },
      Sunday: { openingTime: "", closingTime: "", checked: false },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({
      ...restaurant,
      [name]: value,
    });
  };

  const handleTimeChange = (day, timeType, value) => {
    setRestaurant({
      ...restaurant,
      operatingHours: {
        ...restaurant.operatingHours,
        [day]: {
          ...restaurant.operatingHours[day],
          [timeType]: value,
        },
      },
    });
  };

  const handleCheckboxChange = (day) => {
    setRestaurant({
      ...restaurant,
      operatingHours: {
        ...restaurant.operatingHours,
        [day]: {
          ...restaurant.operatingHours[day],
          checked: !restaurant.operatingHours[day].checked,
        },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(restaurant).forEach((key) => {
      if (key === "operatingHours") {
        Object.keys(restaurant.operatingHours).forEach((day) => {
          formData.append(
            `operatingHours.${day}.openingTime`,
            restaurant.operatingHours[day].openingTime
          );
          formData.append(
            `operatingHours.${day}.closingTime`,
            restaurant.operatingHours[day].closingTime
          );
        });
      } else {
        formData.append(key, restaurant[key]);
      }
    });

    restaurantService
      .postRestaurant(formData)
      .then((response) => {
        setSuccessMessage(true);
        setTimeout(function () {
          navigate(`/hungry-hub/user-restaurants/${userId}`);
        }, 3500);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <div className="CreateRestaurantPage">
        <h1>Create Restaurant</h1>

        <form className="CreateRestaurantForm" onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
            <TextField
              id="name"
              label="Name"
              name="name"
              type="text"
              value={restaurant.name}
              onChange={handleChange}
              required
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              value={restaurant.email}
              onChange={handleChange}
              required
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              type="text"
              value={restaurant.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              id="description"
              label="Description"
              name="description"
              type="text"
              value={restaurant.description}
              onChange={handleChange}
            />
            {Object.entries(restaurant.operatingHours).map(([day, times]) => (
              <div key={day}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={times.checked}
                      onChange={() => handleCheckboxChange(day)}
                      name={day}
                    />
                  }
                  label={day}
                />
                {times.checked && (
                  <>
                    <TextField
                      label={`${day} Opening Time`}
                      type="time"
                      value={times.openingTime}
                      onChange={(e) =>
                        handleTimeChange(day, "openingTime", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label={`${day} Closing Time`}
                      type="time"
                      value={times.closingTime}
                      onChange={(e) =>
                        handleTimeChange(day, "closingTime", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                )}
              </div>
            ))}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setRestaurant({ ...restaurant, image: e.target.files[0] })
              }
            />
          </Stack>
          <div className="CreateButtons">
            <Button
              sx={{ backgroundColor: "white", color: "#EF233C" }}
              variant="outlined"
              color="error"
              onClick={() => navigate(`/hungry-hub/user-restaurants/${userId}`)}
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
            <Alert sx={{ mb: 2 }}>Restaurant successfully created</Alert>
          )}
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
