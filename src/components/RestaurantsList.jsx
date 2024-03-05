import { Box, Container, Typography } from "@mui/material";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import restaurantService from "../services/restaurants.service";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import "./RestaurantsList.css";
import RestaurantsFilter from "./RestaurantsFilter";

export default function RestaurantsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    rating: null,
    category: null,
  });

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    restaurantService
      .getAllRestaurants(filter.rating, filter.category)
      .then((response) => {
        setRestaurants(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/*");
      });
  }, [filter]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <Container>
      <h2>Restaurants</h2>
      <RestaurantsFilter onFilterChange={handleFilterChange} value={filter} />
      <Box className="RestaurantsListSection">
        {!restaurants.length && (
          <Typography textAlign="center" variant="h6">
            No results found
          </Typography>
        )}
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
            rating: restaurant.rating
          };
          return <RestaurantCard key={diner._id} restaurant={diner} />;
        })}
      </Box>
    </Container>
  );
}
