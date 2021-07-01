import { Grid } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { StyledButton, Wrapper } from "./App.styles";
import Cart from "./Cart/Cart";
import Item from "./Item/Item";
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};
const getProduct = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "product",
    getProduct
  );
  console.log(data);
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, items) => ack + items.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      //  Is the item already add in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const hangdleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={hangdleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)}>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item: CartItemType) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
