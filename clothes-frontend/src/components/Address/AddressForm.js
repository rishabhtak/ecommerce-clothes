"use client";
import { useState, useRef, useContext, useEffect } from "react";
import { CartContext } from "../CartContextProvider";
import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  fullname: Yup.string().required("Please enter name"),
  phone: Yup.number()
    .typeError("Please enter correct value")
    .positive("Please enter correct value")
    .integer("Please enter correct value")
    .required("Phone is required"),
  city: Yup.string().required("Please enter city"),
  state: Yup.string().required("Please enter state"),
  address: Yup.string().required("Please enter address"),
  country: Yup.string().required("Please enter country"),
  pincode: Yup.number()
    .typeError("Please enter correct value")
    .positive("Please enter correct value")
    .integer("Please enter correct value")
    .required("Pincode is required"),
});
const AddressForm = () => {
  const formRef = useRef(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState(null);
  const { session } = useContext(CartContext);
  const [address, setAddress] = useState([]);

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

  useEffect(() => {
    getAddress();
  }, []);

  async function deleteAddress(id) {
    try {
      const response = await fetch(`/api/address`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          email: session.user.email,
          id: id,
        },
      });
      const res = await response.json();
      if (res.status === 200) {
        getAddress();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = await addressSchema.validate(
        {
          fullname: formData.get("fullname").toLowerCase(),
          phone: formData.get("phone"),
          city: formData.get("city").toLowerCase(),
          city: formData.get("city").toLowerCase(),
          state: formData.get("state").toLowerCase(),
          pincode: formData.get("pincode"),
          address: formData.get("address").toLowerCase(),
          country: formData.get("country").toLowerCase(),
          email: session?.user?.email,
        },
        { abortEarly: false }
      );
      const response = await fetch(`/api/address`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        setMessage("Address Created successfull");
        formRef.current.reset();
        getAddress();
      } else {
        setMessage("Somewhere went wrong, please try again later.");
        formRef.current.reset();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((validationError) => {
          errors[validationError.path] = validationError.message;
        });
        setValidationErrors(errors);
      } else {
        setMessage("Somewhere went wrong, please try again later.");
        formRef.current.reset();
      }
    }
  };

  return (
    <>
      <div className="bg-white/25 w-full shadow rounded p-8 sm:p-12">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="md:flex items-center mt-12">
            <div className="w-full md:w-1/2 flex flex-col">
              <label htmlFor="fullname" className="font-semibold leading-none">
                Full Name *
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
              />
              {validationErrors.fullname && (
                <p className="text-red-600">{validationErrors.fullname}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label htmlFor="phone" className="font-semibold leading-none">
                Phone *
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
              />
              {validationErrors.phone && (
                <p className="text-red-600">{validationErrors.phone}</p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col mt-8">
            <label htmlFor="address" className="font-semibold leading-none">
              Address *
            </label>
            <textarea
              type="text"
              id="address"
              name="address"
              className="h-40 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
            {validationErrors.address && (
              <p className="text-red-600">{validationErrors.address}</p>
            )}
          </div>
          <div className="md:flex items-center mt-12">
            <div className="w-full md:w-1/2 flex flex-col">
              <label htmlFor="city" className="font-semibold leading-none">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
              />
              {validationErrors.city && (
                <p className="text-red-600">{validationErrors.city}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label htmlFor="state" className="font-semibold leading-none">
                State *
              </label>
              <input
                id="state"
                name="state"
                type="text"
                className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
              />
              {validationErrors.state && (
                <p className="text-red-600">{validationErrors.state}</p>
              )}
            </div>
          </div>
          <div className="md:flex items-center mt-12">
            <div className="w-full md:w-1/2 flex flex-col">
              <label htmlFor="country" className="font-semibold leading-none">
                Country *
              </label>
              <input
                id="country"
                name="country"
                type="text"
                className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
              />
              {validationErrors.country && (
                <p className="text-red-600">{validationErrors.country}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label htmlFor="pincode" className="font-semibold leading-none">
                Pincode *
              </label>
              <input
                id="pincode"
                name="pincode"
                type="number"
                className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
              />
              {validationErrors.pincode && (
                <p className="text-red-600">{validationErrors.pincode}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none uppercase"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="shadow rounded cursor-pointer text-center">
        {address.length > 0 ? (
          address?.map((elem) => (
            <div key={elem._id} className="border-b-2 p-5">
              <p className="capitalize">{elem.fullname}</p>
              <p className="capitalize">{elem.address}</p>
              <p className="capitalize">
                {elem.city},{elem.state}
              </p>
              <p>{elem.phone}</p>
              <button
                onClick={() => deleteAddress(elem._id)}
                className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none uppercase"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="shadow rounded cursor-pointer text-center">
            <div className="border-b-2 p-5 text-xl">No Address Available</div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressForm;
