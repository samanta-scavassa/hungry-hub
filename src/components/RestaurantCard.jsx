import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/hungry-hub/restaurants/${restaurant.id}`}>
      <Card className="RestaurantCard" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={restaurant.image}
            alt="restaurant image"
          />
          <Box className="labels">
            {restaurant.rating && (
              <div>
                <span className="label">{restaurant.rating} ★</span>
              </div>
            )}
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {restaurant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {restaurant.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default RestaurantCard;
