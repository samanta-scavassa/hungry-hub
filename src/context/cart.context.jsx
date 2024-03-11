import React, { useState } from "react";
import cartService from "../services/cart.service";
import orderItemService from "../services/orderItemDetails.service";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const createCart = async (userId, restaurantId) => {
    const cartRequestBody = { userId, restaurantId };
    if (cart == null) {
      const newCart = await cartService.postCart(cartRequestBody);
      setCart(newCart.data);
      return newCart.data._id;
    }
    return cart._id;
  };

  const addItemToCart = async (cartId, item) => {
    const orderItemRequestBody = {
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      orderId: cartId,
    };
    await orderItemService.postOrderItem(orderItemRequestBody);
    setIsLoading(false);

    const updatedCart = await cartService.getCartById(cartId);
    setCart(updatedCart.data);
  };

  const deleteCart = async () => {
    try {
      if (cart != null) {
        if (cart.orderItemDetailsId.length > 0) {
          const deleteOrderItemsPromisses = cart.orderItemDetailsId.map(
            (orderItem) => {
              orderItemService.deleteOrderItem(orderItem);
            }
          );

          await Promise.all(deleteOrderItemsPromisses);
        }

        await cartService.deleteCart(cart._id);
      }

      setCart(null);
      closeCart();
    } catch (error) {
      console.log(error);
    }
  };
  //   removeItemFromCart;
  //   updateCart;

  return (
    <CartContext.Provider
      value={{
        isLoading,
        cart,
        createCart,
        addItemToCart,
        isCartOpen,
        openCart,
        closeCart,
        deleteCart,
        setCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };
