import React, { useState } from "react";
import cartService from "../services/cart.service";
import orderItemService from "../services/orderItemDetails.service";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addItemToCart = async (userId, restaurantId, item) => {
    const cartRequestBody = { userId, restaurantId };
    let newCart = null;
    if (cart == null) {
      newCart = await cartService.postCart(cartRequestBody);
      setCart(newCart.data);
    }

    const orderItemRequestBody = {
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      orderId: newCart.data._id,
    };
    await orderItemService.postOrderItem(orderItemRequestBody);
    setIsLoading(false);

    const updatedCart = await cartService.getCartById(newCart.data._id);
    setCart(updatedCart.data);
  };
  //   removeItemFromCart;
  //   updateCart;
  //   deleteCart;

  return (
    <CartContext.Provider
      value={{
        isLoading,
        cart,
        addItemToCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };
