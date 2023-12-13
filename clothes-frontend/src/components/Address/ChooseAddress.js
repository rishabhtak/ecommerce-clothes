"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContextProvider";
import Link from "next/link";

const ChooseAddress = () => {
  const { session, setSelectAddress, selectAddress, cartProducts, setOrderId } =
    useContext(CartContext);
  const [address, setAddress] = useState([]);

  console.log(address, cartProducts);

  async function getAddress() {
    try {
      const response = await fetch(`/api/address`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email: session.user.email,
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setAddress(data.address);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const finalPrice = cartProducts.reduce(
    (amount, item) => amount + item.total_price,
    0
  );
  const finalQuantity = cartProducts.reduce(
    (total, item) => item.total_quantity + total,
    0
  );

  const handleOrder = async (e) => {
    try {
      if (selectAddress && cartProducts) {
        const order = {
          items: cartProducts,
          finalPrice: finalPrice,
          finalQuantity: finalQuantity,
          userId: selectAddress.user,
          selectAddress,
        };
        const response = await fetch(`/api/order`, {
          method: "POST",
          body: JSON.stringify(order),
        });
        const responseData = await response.json();
        if (responseData.status === 200) {
          console.log(responseData);
          setOrderId(responseData.orderId);
        } else {
          console.log(responseData);
        }
      } else {
        alert("Select Address or product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      <div className="shadow rounded cursor-pointer text-center">
        {address.length > 0 ? (
          address?.map((elem) => (
            <div key={elem._id} className="border-b-2 p-5">
              <input
                type="radio"
                id={`address-${elem._id}`}
                name="selectedAddress"
                onChange={() => setSelectAddress(elem)}
              />
              <label htmlFor={`address-${elem._id}`}>
                <p className="capitalize">{elem.fullname}</p>
                <p className="capitalize">{elem.address}</p>
                <p className="capitalize">
                  {elem.city},{elem.state}
                </p>
                <p>{elem.phone}</p>
              </label>
            </div>
          ))
        ) : (
          <div className="shadow rounded cursor-pointer text-center">
            <div className="border-b-2 p-5 text-xl">No Address Available</div>
          </div>
        )}
      </div>
      <Link
        href="/profile/address"
        className="inline-block w-full px-4 py-2 mt-6 mb-6 bg-blue-500 text-white text-center rounded-md transition duration-300 hover:bg-blue-600"
      >
        Add New Address
      </Link>
      <Link
        href={`${
          selectAddress && cartProducts.length >= 1 ? "/orderconfirm" : ""
        }`}
      >
        <button
          onClick={handleOrder}
          className="inline-block w-full px-4 py-2 mt-6 mb-6 bg-blue-500 text-white text-center rounded-md transition duration-300 hover:bg-blue-600"
        >
          Continue To Payment
        </button>
      </Link>
    </>
  );
};

export default ChooseAddress;