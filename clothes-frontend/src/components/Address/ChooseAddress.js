"use client";
import { useState, useEffect, useContext, useCallback } from "react";
import { CartContext } from "../CartContextProvider";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const ChooseAddress = () => {
  const { session, setSelectAddress, selectAddress, cartProducts } =
    useContext(CartContext);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);

  const finalPrice = cartProducts.reduce(
    (amount, item) => amount + item.total_price,
    0
  );
  const finalQuantity = cartProducts.reduce(
    (total, item) => item.total_quantity + total,
    0
  );

  const getAddress = useCallback(async () => {
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
        toast.error("Couldn't get address,Please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getAddress();
  }, [getAddress]);

  // =============  Stripe Payment Start here ==============
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleOrder = async (e) => {
    setLoading(true);
    try {
      if (selectAddress && cartProducts) {
        const order = {
          items: cartProducts,
          finalPrice: finalPrice,
          finalQuantity: finalQuantity,
          userId: selectAddress.user,
          selectAddress,
          email: session?.user?.email,
        };
        const stripe = await stripePromise;
        const response = await fetch(`/api/checkout`, {
          method: "POST",
          body: JSON.stringify(order),
        });
        const responseData = await response.json();
        if (responseData.status === 200) {
          stripe?.redirectToCheckout({ sessionId: responseData.sessionId });
        } else {
          console.log(responseData);
          toast.error("Sorry order not created. Please try again later");
        }
      } else {
        toast.error("Please choose address");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  // =============  Stripe Payment End here ==============

  if (cartProducts.length <= 0) {
    return redirect("/");
  }
  console.log(Boolean(selectAddress));
  return (
    <>
      <ToastContainer />
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

      <button
        onClick={handleOrder}
        disabled={loading}
        className={`inline-block w-full px-4 py-2 mt-6 mb-6 ${
          loading && Boolean(selectAddress)
            ? "bg-indigo-200"
            : "bg-blue-500 hover:bg-blue-600"
        }  text-white text-center rounded-md transition duration-300`}
      >
        {loading && Boolean(selectAddress)
          ? "Loading..."
          : " Continue To Payment"}
      </button>
    </>
  );
};

export default ChooseAddress;
