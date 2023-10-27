import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// components
import DashboardLayout from "./DashboardLayout";

export default function Orders() {
  const getAllCustomerOrders = async () => {
    const { data } = await axios.get("/api/v1.0/kitchen/orders-by-customer");
    toast(data.message);
  };
  useEffect(() => {
    getAllCustomerOrders();
  }, []);

  return <DashboardLayout>Here goes all the customer orders</DashboardLayout>;
}
