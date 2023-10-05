import AddressForm from "@/components/Address/AddressForm";
import AddressCard from "@/components/Address/AddressCard";
import Stepcount from "@/components/Stepcount";
import Wrapper from "@/components/Wrapper/Index";

const page = () => {
  return (
    <Wrapper>
      <Stepcount />
      <div className="grid grid-cols-1 lg:grid-cols-2 py-16 gap-5">
        <AddressCard />
        <AddressForm />
      </div>
    </Wrapper>
  );
};

export default page;
