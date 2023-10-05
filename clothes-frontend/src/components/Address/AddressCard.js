import React from "react";

const AddressCard = () => {
  return (
    <div className="shadow rounded cursor-pointer">
      <div className="border-b-2 p-5">
        <p>Rishabh Tak</p>
        <p>Jaipur,Rajasthan</p>
        <p>Phone Number</p>
        <p>9876543210</p>
        <button class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
          Delivered Here
        </button>
      </div>
    
    </div>
  );
};

export default AddressCard;
