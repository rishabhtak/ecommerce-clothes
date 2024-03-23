"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

export default function OrderDetails({ id }) {
  const [order, setOrder] = useState(null);

  async function getOrders() {
    try {
      const response = await fetch(`/api/orders?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setOrder(data.orders);
      } else {
        setOrder(null);
      }
    } catch (error) {
      setOrder(null);
      toast.error("Error fetching order details");
    }
  }
  useEffect(() => {
    getOrders();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOrderStatus = async (e, selectItem) => {
    try {
      const { value } = e.target;
      const updatedItems = order.items.map((item) => {
        if (item.variant_id === selectItem.variant_id) {
          // Update the orderStatus for the matched item
          return {
            ...item,
            orderStatus: value,
          };
        }
        return item;
      });

      setOrder((prevOrder) => ({
        ...prevOrder,
        items: updatedItems,
      }));

        const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order._id,
          orderStatus: value,
          variant_id: selectItem.variant_id,
          paymentStatus: false,
        }),
      }); 
      const data = await response.json();
      if (data.status === 200) {
        toast.success("Order status updated successfully");
      } else {
        toast.error("Error updating order status");
      } 
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  const handlePaymentStatus = async (e) => {
    try {
      const { value } = e.target;
      setOrder((prevOrder) => ({
        ...prevOrder,
        paymentStatus: value,
      }));
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order._id,
          orderStatus: false,
          variant_id: false,
          paymentStatus: value,
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        toast.success("Payment status updated successfully");
      } else {
        toast.error("Error updating payment status");
      }
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  return (
    <>
      <ToastContainer />
      {order ? (
        <div key={order._id}>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="text-xl sm:text-2xl my-3 sm:my-5 font-bold tracking-tight text-gray-900">
                Order Id #{order._id}
              </div>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li
                      key={item.variant_id}
                      className="flex flex-col py-6 sm:flex-row"
                    >
                      <div className="sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                        <Image
                          src={item.images}
                          alt={item.productName}
                          className="h-full w-full object-cover object-center"
                          height={400}
                          width={400}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h1 className="capitalize">{item.productName}</h1>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            {item.category} - {item.subcategory}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            Size: {item.variant_size}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            Color: {item.variant_color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.total_quantity}
                            </label>
                          </div>

                          <div className="flex flex-col">
                            <p>Price: ₹{item.variant_price}</p>
                            <p>Subtotal: {item.total_price}</p>
                          </div>
                        </div>
                        <div className="text-md my-5 font-bold tracking-tight text-red-900 capitalize">
                          Order Status:
                          <span>
                            <select
                              value={item.orderStatus}
                              onChange={(e) => handleOrderStatus(e, item)}
                            >
                              <option value="pending">Pending</option>
                              <option value="received">Recieved</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="text-md my-5 font-bold tracking-tight text-red-900 capitalize">
                Payment Status:
                <span>
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => handlePaymentStatus(e)}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                  </select>
                </span>
              </div>
              <div className="flex flex-col my-2 text-base font-medium text-gray-900">
                <p>Total Price: ₹{order.finalPrice}</p>
                <p>Total Items in Cart: {order.finalQuantity} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping Address:</p>
              <div className="flex flex-col gap-2 px-4 sm:px-6 py-4 sm:py-6 border-solid border-2 border-gray-200">
                <p className="text-base sm:text-sm leading-6 text-gray-900 capitalize">
                  Name: {order.selectAddress.fullname}
                </p>
                <p className="text-base sm:text-sm leading-6 text-gray-900">
                  Email: {order.selectAddress.email}
                </p>
                <p className="sm:overflow-ellipsis sm:whitespace-nowrap sm:max-w-xs text-xs sm:text-sm leading-5 text-gray-500 capitalize">
                  Address: {order.selectAddress.address}
                </p>
                <p className="sm:overflow-ellipsis sm:whitespace-nowrap sm:max-w-xs text-xs sm:text-sm leading-5 text-gray-500 capitalize">
                  City: {order.selectAddress.city}
                </p>
                <p className="sm:overflow-ellipsis sm:whitespace-nowrap sm:max-w-xs text-xs sm:text-sm leading-5 text-gray-500 capitalize">
                  State: {order.selectAddress.state}
                </p>
                <p className="text-xs sm:text-sm leading-5 text-gray-500">
                  Pincode: {order.selectAddress.pincode}
                </p>
                <div className="sm:flex sm:items-end">
                  <p className="text-base sm:text-sm leading-6 text-gray-900">
                    Phone: {order.selectAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Order Details not found</div>
      )}
    </>
  );
}
