import React from "react";
import AddressCard from "@/components/Address/AddressCard";
import Cart from "@/components/Cart";
import Wrapper from "@/components/Wrapper/Index";
import Stepcount from "@/components/Stepcount";

const page = () => {
  return (
    <Wrapper>
      <Stepcount />
      <AddressCard />
      <Cart />
    </Wrapper>
  );
};

export default page;
