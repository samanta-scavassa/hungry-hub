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
    rating: "",
    category: "",
  });

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    restaurantService
      .getAllRestaurants(
        filter.rating ? filter.rating : "null",
        filter.category ? filter.category : "null"
      )
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
    return <Loading />;
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
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </Box>
    </Container>
  );
}
