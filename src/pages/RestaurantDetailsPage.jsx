import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import restaurantService from "../services/restaurants.service";
import menuService from "../services/menu.service";
import "./RestaurantDetailsPage.css";
import FoodCounter from "../components/FoodCounter";

export default function RestaurantDetailsPage() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  let categories = [];

  const fetchRestaurant = () => {
    restaurantService
      .getRestaurant(restaurantId)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/*");
      });
  };

  const fetchMenu = () => {
    menuService
      .getMenuItemByRestaurantId(restaurantId)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/*");
      });
  };

  useEffect(() => {
    fetchRestaurant();
    fetchMenu();
  }, []);

  if (!restaurant) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (menu.length !== 0) {
    categories = [...new Set(menu.map((item) => item.category))];
  }

  return (
    <Box className="RestaurantDetailsPage" sx={{ marginTop: 10 }}>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          overflow: "visible",
          boxShadow: "none",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Box className="RestaurantDetailsCard">
          <CardMedia
            sx={{
              height: "50%",
              width: "100%",
              minWidth: "85vw",
              minHeight: "1vh",
              maxHeight: "38vh",
              borderRadius: 2,
            }}
            image={restaurant.image}
            alt="Restaurant image"
          />
          <CardContent
            sx={{ width: "100%" }}
            className="RestaurantDetailsContent"
          >
            <Typography gutterBottom variant="h5" component="div">
              {restaurant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {restaurant.description}
            </Typography>
            <Typography variant="body2" color="#e7a74e">
              {restaurant.rating} ★
            </Typography>
            {categories.map((category) => (
              <div key={category}>
                <Typography variant="h6" sx={{ margin: "16px 0" }}>
                  {category}
                </Typography>
                <Box display={"flex"} gap={5} flexWrap={"wrap"}>
                  {menu
                    .filter((item) => item.category === category)
                    .map((menuItem) => (
                      <Grid item xs={12} sm={4} key={menuItem._id}>
                        <Card className="MenuItemCard" sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={menuItem.image}
                              alt="menu item image"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {menuItem.itemName}
                              </Typography>
                              <Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                {menuItem.description}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  marginTop: "10px",
                                  gap: 5,
                                }}
                              >
                                <Typography variant="body1" color={"#2B2D42"}>
                                  <b>€{menuItem.price}</b>
                                </Typography>
                                <FoodCounter item={menuItem} />
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                </Box>
              </div>
            ))}
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
