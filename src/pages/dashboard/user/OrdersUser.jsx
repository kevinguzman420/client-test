import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import socketio from "socket.io-client";

const socket = socketio(import.meta.env.VITE_BASE_URL);

// components
import DashboardLayout from "../DashboardLayout";

export default function Orders() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [orders, setOrders] = useState(null);
  const orderStatus = {
    onway: 2,
    finished: 3,
  };

  const getAllCustomerOrders = async () => {
    // const clientId = 1;
    // const { data } = await axios.get(
    //   `/api/v1.0/kitchen/orders-by-customer/${clientId}`
    // );
    // setOrders(data.orders);

    socket.emit("request-customer-orders");

    socket.on("get-customer-orders", (data) => {
      setOrders(data.orders);
    });
  };
  useEffect(() => {
    getAllCustomerOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newOrderStatus) => {
    // const { data } = await axios.put(
    //   `/api/v1.0/kitchen/orders/update-status/${orderId}/${newOrderStatus}`
    // );
    // console.log(data);
    // if (data.status_code === 200) {
    //   toast.success(data.message);
    // } else {
    //   toast.error("There's an error when try to update the order");
    // }
    socket.emit("update-customer-order-status", { orderId, newOrderStatus });
  };

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
                <div className=" mb-2 ">
                  <p>Update status:</p>
                </div>
                <div className=" flex justify-between ">
                  <Button
                    className={`${
                      order.status_order_id >= 1 ? "bg-green-400" : "bg-red-400"
                    } flex justify-center items-center text-black w-[100px] h-[36px] rounded `}
                  >
                    Recibido
                  </Button>
                  <Button
                    className={`${
                      order.status_order_id >= 2
                        ? "bg-green-400"
                        : "bg-blue-400"
                    } flex justify-center items-center text-black w-[100px] h-[36px] rounded `}
                    onPress={() =>
                      handleUpdateOrderStatus(order.id, orderStatus.onway)
                    }
                  >
                    En camino
                  </Button>
                  <Button
                    className={`${
                      order.status_order_id >= 3
                        ? "bg-green-400"
                        : "bg-gray-400"
                    } flex justify-center items-center text-black w-[100px] h-[36px] rounded `}
                    isDisabled={order.status_order_id === 2 ? false : true}
                    onPress={() =>
                      handleUpdateOrderStatus(order.id, orderStatus.finished)
                    }
                  >
                    Entregado
                  </Button>
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
