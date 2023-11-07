import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import { Image, Button } from "@nextui-org/react";
import toast from "react-hot-toast";

import { useCartStore } from "../../../store/menuStore";

export default function Pay() {
  const { cart, clearCart } = useCartStore();

  const navigate = useNavigate();

  const handlePayment = async () => {
    const { data } = await axios.post("/api/v1.0/kitchen/orders", cart);
    if (data.status_code === 201) {
      toast.success(data.message);
      clearCart();
      return navigate("/dashboard/menu");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <DashboardLayout>
      <div className=" mx-auto py-[50px] w-[90%] ">
        <div className=" mb-16 ">
          <h1 className=" text-3xl mb-2 ">Información personal</h1>
          <div className=" w-full h-auto ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            quisquam quaerat fuga modi ea rem iure aspernatur nobis omnis sit
            nam ex voluptatibus, libero harum sed voluptas fugit atque! Dolorem?
            Molestiae consequuntur expedita dolore vero veniam recusandae
            distinctio perspiciatis aut beatae? Inventore nihil voluptates
            minima iusto a provident ducimus iure aspernatur eligendi, corporis,
            obcaecati, sapiente animi natus tenetur suscipit culpa? In dolorem
            mollitia eius ratione omnis quas nobis blanditiis sapiente. Repellat
            inventore placeat quo animi, deleniti adipisci omnis, voluptates
            incidunt expedita temporibus nam minus quis saepe nisi dignissimos
            quisquam quaerat? Praesentium voluptas odit eius corporis. Illo
            consectetur voluptatum rem maiores voluptates debitis, facilis eius
            sed repellendus quam enim nihil deserunt atque aliquam veritatis
            rerum animi quaerat, voluptatem sunt quod fugit? Natus, ipsam et
            amet neque eos velit? Id sit doloribus autem inventore ea aperiam
            quo tempore neque maxime nulla. Cumque ipsam nulla minima
            praesentium cum ratione neque modi esse enim.
          </div>
        </div>
        <div className=" mb-16 ">
          <h1 className=" text-3xl mb-2 ">Información de facturación</h1>
          <div className=" w-full h-auto ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            quisquam quaerat fuga modi ea rem iure aspernatur nobis omnis sit
            nam ex voluptatibus, libero harum sed voluptas fugit atque! Dolorem?
            Molestiae consequuntur expedita dolore vero veniam recusandae
            distinctio perspiciatis aut beatae? Inventore nihil voluptates
            minima iusto a provident ducimus iure aspernatur eligendi, corporis,
            obcaecati, sapiente animi natus tenetur suscipit culpa? In dolorem
            mollitia eius ratione omnis quas nobis blanditiis sapiente. Repellat
            inventore placeat quo animi, deleniti adipisci omnis, voluptates
            incidunt expedita temporibus nam minus quis saepe nisi dignissimos
            quisquam quaerat? Praesentium voluptas odit eius corporis. Illo
            consectetur voluptatum rem maiores voluptates debitis, facilis eius
            sed repellendus quam enim nihil deserunt atque aliquam veritatis
            rerum animi quaerat, voluptatem sunt quod fugit? Natus, ipsam et
            amet neque eos velit? Id sit doloribus autem inventore ea aperiam
            quo tempore neque maxime nulla. Cumque ipsam nulla minima
            praesentium cum ratione neque modi esse enim.
          </div>
        </div>
        <div className=" text-white ">
          <h1 className=" text-3xl mb-2 ">Tu Pedido</h1>
          <div>
            {cart.map((item, i) => (
              <div
                className=" my-[10px] px-[10px] py-[20px] border border-gray-700 rounded "
                key={i}
              >
                <div className=" flex mb-4 ">
                  <p>{item.menu.name}</p>
                  <p className=" ml-1 ">Q{item.menu.price}</p>
                  <p className=" ml-1 "> - Cant {item.quantity}</p>
                </div>
                <Image
                  alt="NextUI hero Image"
                  src={item.menu.image}
                  width="100"
                  height="100"
                />
                <div className=" mt-4 ">
                  {item.extras.map((extra, i) => (
                    <div key={i}>
                      <p className=" text-sm text-gray-300 ">
                        {extra.name} Q{extra.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className=" mt-4 ">
            <Button onPress={handlePayment} className=" w-full ">
              Pagar
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
