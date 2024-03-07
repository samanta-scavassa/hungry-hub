import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import restaurantService from "../services/restaurants.service";
import menuService from "../services/menu.service";
import "./RestaurantDetailsPage.css";
import FoodCounter from "../components/FoodCounter";
import CartComponent from "../components/CartComponent";
import { AuthContext } from "../context/auth.context";
// import cartService from "../services/cart.service";
import { CartContext } from "../context/cart.context";

export default function RestaurantDetailsPage() {
  const { addItemToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [cartOpen, setCartOpen] = useState(false);
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState(null);
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
        let itemWithCount = {};

        res.data.forEach((item) => {
          itemWithCount = {
            ...itemWithCount,
            [item._id]: {
              ...item,
              count: 0,
            },
          };
        });

        setMenu(itemWithCount);
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

  const menuItems = Object.values(menu);

  if (menuItems.length !== 0) {
    categories = [...new Set(menuItems.map((item) => item.category))];
  }

  const handleCompleteOrder = async (menuItems) => {
    const itemsToCart = menuItems.filter((menuItem) => menuItem.count > 0);
    const addItemToCartPromises = itemsToCart.map((item) => {
      return addItemToCart(user._id, restaurant._id, {
        menuItemId: item._id,
        quantity: item.count,
      });
    });
    await Promise.all(addItemToCartPromises);
    setCartOpen(true);
  };

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
              minHeight: "38vh",
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
                  {menuItems
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
                                  gap: 16,
                                }}
                              >
                                <Typography variant="body1" color={"#2B2D42"}>
                                  <b>€{menuItem.price}</b>
                                </Typography>
                                <FoodCounter
                                  id={menuItem._id}
                                  value={menuItem.count}
                                  onChange={(id, value) => {
                                    setMenu({
                                      ...menu,
                                      [id]: {
                                        ...menuItem,
                                        count: value,
                                      },
                                    });
                                  }}
                                />
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
          <Box
            sx={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#EF233C",
                color: "white",
                width: "400px",
              }}
              variant="contained"
              color="error"
              onClick={() => handleCompleteOrder(menuItems)}
            >
              COMPLETE ORDER
            </Button>
          </Box>
        </Box>
      </Card>
      <CartComponent
        restaurant={restaurant}
        cartItems={menuItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </Box>
  );
}
