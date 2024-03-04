import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import americanFood from "../assets/images/food-categories/american.jpg";
import asianFood from "../assets/images/food-categories/asian.jpg";
import burger from "../assets/images/food-categories/burger.jpg";
import dessert from "../assets/images/food-categories/dessert.jpg";
import germanFood from "../assets/images/food-categories/german.jpg";
import italianFood from "../assets/images/food-categories/italian.jpg";
import japaneseFood from "../assets/images/food-categories/japanese.jpg";
import pizza from "../assets/images/food-categories/pizza.jpg";
import poke from "../assets/images/food-categories/poke.jpg";
import salad from "../assets/images/food-categories/salad.jpg";
import vegan from "../assets/images/food-categories/vegan.jpg";
import french from "../assets/images/food-categories/french.jpg";
import indian from "../assets/images/food-categories/indian.jpg";
import mediterranean from "../assets/images/food-categories/mediterranean.jpg";
import mexican from "../assets/images/food-categories/mexican.jpg";
import Carousel from "react-material-ui-carousel";
import "./FoodCarousel.css";

const categories = [
  { name: "American", image: americanFood },
  { name: "Asian", image: asianFood },
  { name: "Burger", image: burger },
  { name: "Dessert", image: dessert },
  { name: "German", image: germanFood },
  { name: "Italian", image: italianFood },
  { name: "Japanese", image: japaneseFood },
  { name: "Pizza", image: pizza },
  { name: "Poke", image: poke },
  { name: "Salad", image: salad },
  { name: "Vegan", image: vegan },
  { name: "French", image: french },
  { name: "Indian", image: indian },
  { name: "Mediterranean", image: mediterranean },
  { name: "Mexican", image: mexican },
];

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
  const carousel = generateFoodCarouselItems();
  return (
    <Box>
      <Container>
        <h2>Food Categories</h2>
        <Carousel>
          {carousel.map((items, index) => (
            <Paper elevation={0} key={index} sx={{ height: 265 }}>
              <Item items={items} />
            </Paper>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}

function Item({ items }) {
  return (
    <Grid
      item
      xs={4}
      sx={{
        display: "flex",
        height: "100%",
        position: "relative",
        gap: 1,
        // maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      {items.map((foodItem, index) => (
        <Link
          className="MediaLink"
          to={`/hungry-hub/restaurants/category/${foodItem.name}`}
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
              // sx={{ minWidth: 200, minHeight: 200 }}
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
        </Link>
      ))}
    </Grid>
  );
}
