import { Button } from "@material-ui/core";
import React from "react";
import { CartItemType } from "../App";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (item: CartItemType) => void;
};
const Item = ({ item, handleAddToCart }: Props) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to card</Button>
    </Wrapper>
  );
};

export default Item;
