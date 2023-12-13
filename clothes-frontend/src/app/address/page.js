import ChooseAddress from "@/components/Address/ChooseAddress";
import Wrapper from "@/components/Wrapper/Index";
import Link from "next/link";

const page = () => {
  return (
    <Wrapper>
      <h1 className="mb-10 text-center text-2xl font-bold">Choose Address</h1>

      <ChooseAddress />
    
    </Wrapper>
  );
};

export default page;
