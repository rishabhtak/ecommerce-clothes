"use client";
import { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { createColumnHelper } from "@tanstack/react-table";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("sno", {
      header: () => "S.No.",
    }),
    columnHelper.accessor("_id", {
      header: () => "Id",
    }),
    columnHelper.accessor("finalPrice", {
      header: () => "Price",
    }),
    columnHelper.accessor("finalQuantity", {
      header: () => "Qty",
    }),
    columnHelper.accessor("paymentStatus", {
      header: () => "PaymentStatus",
    }),
    columnHelper.accessor("createdAt", {
      header: () => "Date",
      cell: ({ row }) => (
        <div>{new Date(row.original.createdAt).toLocaleString()}</div>
      ),
    }),
    columnHelper.accessor("actions", {
      header: () => "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-x-6">
          <Link href={"/orders/" + row.original._id} className="text-blue-500">
            View
          </Link>
        </div>
      ),
    }),
  ];

  async function getOrders() {
    try {
      const response = await fetch(`/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const ordersWithIds = data.orders.map((order, index) => ({
        ...order,
        sno: index + 1,
      }));
      setOrders(ordersWithIds);
    } catch (error) {
      toast.error("Error fetching orders");
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="max-w-lg">
        <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">Order</h2>
      </div>
      <Table columns={columns} data={orders} />
    </>
  );
};

export default OrderTable;
