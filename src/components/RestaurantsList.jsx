import { Box } from "@mui/material";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import restaurantService from "../services/restaurants.service";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import "./RestaurantsList.css";

export default function RestaurantsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    restaurantService
      .getAllRestaurants()
      .then((response) => {
        setRestaurants(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/*");
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Box className="RestaurantsListSection">
        {restaurants.map((restaurant) => {
          const diner = {
            id: restaurant._id,
            name: restaurant.name,
            addressId: restaurant.addressId,
            email: restaurant.email,
            phoneNumber: restaurant.phoneNumber,
            category: restaurant.category,
            description: restaurant.description,
            image: restaurant.image,
            userId: restaurant.userId,
            operatingHours: restaurant.operatingHours,
            isActive: restaurant.isActive,
          };
          return <RestaurantCard key={diner._id} restaurant={diner} />;
        })}
      </Box>
    </>
  );
}
