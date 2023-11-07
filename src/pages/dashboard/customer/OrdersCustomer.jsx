import axios from "axios";
import { useEffect, useState } from "react";
import socketio from "socket.io-client";
import toast from "react-hot-toast";

const socket = socketio(import.meta.env.VITE_BASE_URL);

// components
import DashboardLayout from "../DashboardLayout";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const clientId = 1;

  socket.emit("request-customer-orders");

  socket.on("get-customer-orders", (data) => {
    setOrders(data.orders);
  });

  return (
    <DashboardLayout>
      <div className=" px-[80px] w-full min-h-full ">
        {orders === null ? (
          <div className=" flex justify-center items-center w-full h-screen ">
            Cargando...
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div
              className=" my-[20px] px-[40px] py-[20px] bg-gray-900 "
              key={order.id}
            >
              <h2 className=" mb-2 text-xl ">Total: Q{order.total}</h2>
              <h3 className=" text-white bg-gray-800 indent-2 ">Pedido:</h3>
              <div>
                {order.body.map((item) => (
                  <div key={item.id}>
                    <div className=" flex my-[20px] ">
                      <figure className="mr-[20px] ">
                        <img src={item.image} alt="" width="100" height="100" />
                      </figure>
                      <div>
                        <h3>{item.menu_name}</h3>
                        <small className=" text-green-400 font-bold ">
                          Price: Q {item.price}
                        </small>
                        <small className=" block text-slate-400 ">
                          {item.description}
                        </small>
                        <small>Quantity: {item.quantity}</small>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <p>Status:</p>
                </div>
                <div className=" flex justify-between ">
                  <div
                    className={`${
                      order.status_order_id >= 1 ? "bg-green-400" : "bg-red-400"
                    } flex justify-center items-center text-black w-[calc(33%)] h-[20px] `}
                  >
                    <small>Recibido</small>
                  </div>
                  <div
                    className={`${
                      order.status_order_id >= 2 ? "bg-green-400" : "bg-red-400"
                    } flex justify-center items-center text-black w-[calc(33%)] h-[20px] `}
                  >
                    <small>En camino</small>
                  </div>
                  <div
                    className={`${
                      order.status_order_id >= 3 ? "bg-green-400" : "bg-red-400"
                    } flex justify-center items-center text-black w-[calc(33%)] h-[20px] `}
                  >
                    <small>Entregado</small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No hay ordenes de pendientes.</div>
        )}
      </div>
    </DashboardLayout>
  );
}
