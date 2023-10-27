import { useEffect, useState } from "react";
import { useCartStore } from "../store/menuStore";
import { Link } from "react-router-dom";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  // image
  Image,
  // link
  // Link,
} from "@nextui-org/react";

export default function DashboardHeader() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [total, setTotal] = useState(0);

  const { cart } = useCartStore();

  useEffect(() => {
    if (cart.length > 0) {
      const totalPrice = cart.reduce((total, item) => total + item.subtotal, 0);
      setTotal(totalPrice);
    }
  }, []);

  return (
    <div className=" header flex justify-between items-center px-[40px] w-full h-full text-slate-300 border border-slate-800 ">
      <h1 className=" text-2xl ">Menu Restaurante</h1>
      {cart.length > 0 && (
        <div className=" relative text-2xl ">
          <span className=" absolute -top-1 z-10 flex justify-center items-center h-[20px] w-[20px] text-[12px] text-black font-bold bg-white rounded-full ">
            {cart.length}
          </span>
          <Button
            isIconOnly
            onPress={onOpen}
            className=" outline-none outline-offset-0"
          >
            <i
              className={` ${
                cart.length > 0 ? "text-blue-400" : "text-slate-300"
              } fa-solid fa-cart-shopping `}
            ></i>
          </Button>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ordenes</ModalHeader>
              <ModalBody>
                <div>
                  {cart.map((item, i) => (
                    <div
                      className=" flex justify-between items-start my-[10px] px-[10px] border border-slate-300 rounded "
                      key={i}
                    >
                      <div>
                        <div className=" flex ">
                          <p>{item.menu.name}</p>
                          <p className=" ml-1 ">Q{item.menu.price}</p>
                          <p className=" ml-1 text-gray-700 ">
                            {" "}
                            - Cant {item.quantity}
                          </p>
                        </div>
                        <Image
                          alt="NextUI hero Image"
                          src={item.menu.image}
                          width="100"
                          height="100"
                        />
                        <div>
                          {item.extras.map((extra, i) => (
                            <div key={i}>
                              <p className=" text-sm text-gray-500 ">
                                {extra.name} Q{extra.price}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className=" h-full hover:text-red-500 cursor-pointer duration-300 ">
                        <i className=" fa-solid fa-trash "></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className=" flex justify-between items-center my-[24px] px-2 py-2 bg-black text-white rounded ">
                  <p>Subtotal:</p>
                  <p>Q{total}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Keep Buyin
                </Button>
                <Link
                  to="/dashboard/pay"
                  className=" flex justify-center items-center px-[10px] text-white bg-black  rounded-[10px] "
                >
                  To Pay
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
