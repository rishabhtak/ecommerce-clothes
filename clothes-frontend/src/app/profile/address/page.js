import React from "react";
import Wrapper from "@/components/Wrapper/Index";
import AddressForm from "@/components/Address/AddressForm";

const page = () => {
  return (
    <Wrapper>
      <h1 className="py-16 text-center text-2xl font-bold">
        Add/Update Address
      </h1>
      <AddressForm />
    </Wrapper>
  );
};

export default page;
