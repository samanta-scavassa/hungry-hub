import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./FoodCarousel.css";
import RestaurantsList from "./RestaurantsList";
import { categories } from "../constants/categories.js";

const generateFoodCarouselItems = () => {
  const items = [];
  let carouselItems = [];
  categories.forEach((category, i) => {
    if ((i + 1) % 5 === 0) {
      carouselItems.push(category);
      items.push(carouselItems);
      carouselItems = [];
    } else {
      carouselItems.push(category);
    }
  });

  return items;
};

export default function FoodCarousel() {
  const handleFilter = (filter) => {
    return <RestaurantsList category={filter} />;
  };
  const carousel = generateFoodCarouselItems();
  return (
    <Box>
      <Container>
        <h2>Food Categories</h2>
        <Carousel>
          {carousel.map((items, index) => (
            <Paper elevation={0} key={index} sx={{ height: 265 }}>
              <Item items={items} handleFilter={handleFilter} />
            </Paper>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}

function Item({ items, handleFilter }) {
  return (
    <Grid
      item
      xs={4}
      sx={{
        display: "flex",
        height: "100%",
        position: "relative",
        gap: 1,
        margin: "0 auto",
      }}
    >
      {items.map((foodItem, index) => (
        <Button
          className="MediaLink"
          onClick={() => handleFilter(foodItem.name)}
          key={index}
        >
          <Card sx={{ width: "100%" }}>
            <CardMedia
              className="Media"
              component="img"
              height="200"
              width="100%"
              image={foodItem.image}
              alt={foodItem.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="MediaCaption"
              >
                {foodItem.name}
              </Typography>
            </CardContent>
          </Card>
        </Button>
      ))}
    </Grid>
  );
}
