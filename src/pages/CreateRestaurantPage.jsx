import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Autocomplete, Chip } from "@mui/material";
import { Alert, Button } from "@mui/material";
import restaurantService from "../services/restaurants.service";
import { AuthContext } from "../context/auth.context";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateRestaurantPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    image: null,
    userId: user._id,
    operatingHours: {
      openingTime: "",
      closingTime: "",
    },
    selectedDays: [],
  });

  const handleNameChange = (e) => {
    setRestaurant({
      ...restaurant,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setRestaurant({
      ...restaurant,
      email: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    setRestaurant({
      ...restaurant,
      phoneNumber: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setRestaurant({
      ...restaurant,
      description: e.target.value,
    });
  };

  const handleTimeChange = (timeType, value) => {
    setRestaurant({
      ...restaurant,
      operatingHours: {
        ...restaurant.operatingHours,
        [timeType]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(restaurant).forEach(([key, value]) => {
        if (key === "operatingHours") {
          Object.entries(value).forEach(([timeKey, timeValue]) => {
            const [hour, minute] = timeValue.split(":");
            formData.append(`operatingHours.${timeKey}.hour`, hour);
            formData.append(`operatingHours.${timeKey}.minute`, minute);
          });
        } else if (key === "selectedDays") {
          // value.forEach((day) => {
          formData.append(`operatingHours.days`, restaurant.selectedDays);
          // });
        } else {
          formData.append(key, value);
        }
      });

      await restaurantService.postRestaurant(formData);
      setSuccessMessage(true);
      setTimeout(
        () => navigate(`/hungry-hub/user-restaurants/${user._id}`),
        3500
      );
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
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
              onChange={handleNameChange}
              required
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              value={restaurant.email}
              onChange={handleEmailChange}
              required
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              type="text"
              value={restaurant.phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
            <TextField
              id="description"
              label="Description"
              name="description"
              type="text"
              value={restaurant.description}
              onChange={handleDescriptionChange}
            />
            <Autocomplete
              multiple
              id="selectedDays"
              options={daysOfWeek}
              onChange={(event, newValue) =>
                setRestaurant({ ...restaurant, selectedDays: newValue })
              }
              value={restaurant.selectedDays}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option}
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Days" />
              )}
            />
            {restaurant.selectedDays.length > 0 && (
              <>
                <TextField
                  label={`Opening Time`}
                  type="time"
                  value={restaurant.operatingHours.openingTime}
                  onChange={(e) =>
                    handleTimeChange("openingTime", e.target.value)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label={`Closing Time`}
                  type="time"
                  value={restaurant.operatingHours.closingTime}
                  onChange={(e) =>
                    handleTimeChange("closingTime", e.target.value)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}
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
              onClick={() =>
                navigate(`/hungry-hub/user-restaurants/${user._id}`)
              }
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
