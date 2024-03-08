import { useContext } from "react";
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { CartContext } from "../context/cart.context";

export default function CartComponent({ restaurant, cartItems }) {
  const { cart, isCartOpen, closeCart, deleteCart } = useContext(CartContext);
  const orderItems = cartItems.filter((menuItem) => menuItem.count > 0);
  //   const [isLoading, setIsLoading] = useState(true);

  //   if (isLoading) return <Loading />;

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={closeCart}>
      <Box sx={{ width: 400, padding: "20px" }}>
        <Typography variant="body2">Your order with</Typography>
        <Typography variant="h6">{restaurant.name}</Typography>
        <Divider sx={{ margin: "20px 0" }} />
        {orderItems.map((item) => (
          <Box key={item._id} display="flex" justifyContent="space-between">
            <Typography>
              {item.count}x {item.itemName}
            </Typography>
            <Typography>
              <b>€ {item.price}</b>
            </Typography>
          </Box>
        ))}
        <Divider sx={{ margin: "20px 0" }} />

        {cart !== null && (
          <>
            <Typography>Subtotal: € {cart.totalPrice.toFixed(2)}</Typography>
            <Typography>Delivery: € 3</Typography>
            <Typography>Total: € {Number(cart.totalPrice) + 3}</Typography>
          </>
        )}
        <Box
          display="flex"
          justifyContent="center"
          position="absolute"
          bottom="0"
          marginBottom="48px"
          gap={5}
          maxHeight="48px"
        >
          <Button
            sx={{
              backgroundColor: "white",
              color: "#EF233C",
              width: "200px",
            }}
            variant="outlined"
            color="error"
            onClick={deleteCart}
          >
            CANCEL ORDER
          </Button>
          <Button
            sx={{
              backgroundColor: "#EF233C",
              color: "white",
              width: "100px",
            }}
            variant="contained"
            color="error"
            onClick={() => {}}
          >
            PAY
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
