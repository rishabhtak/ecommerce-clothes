"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContextProvider";

const SelectedAddress = () => {
  const { session, setSelectAddress, selectAddress } = useContext(CartContext);
  console.log(selectAddress);
  return <div>SelectedAddress</div>;
};

export default SelectedAddress;
