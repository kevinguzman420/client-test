import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isExpired } from "react-jwt";
import Cookies from "js-cookie";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ProtectedPage({ children }) {
  const [isTokenExpired, setIsTokenExpired] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log("executing main.js");

  // verify token life
  const token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");

  const validateToken = async () => {
    setIsTokenExpired(isExpired(token));
    // debugger;

    if (isExpired(token)) {
      const response = await axios.post("/api/v1.0/users/refresh-token", {
        refresh_token: refresh_token,
      });
      console.log(response);
    }
  };

  useEffect(() => {
    validateToken();
  }, [isTokenExpired]);

  if (isTokenExpired === null) {
    return <h1 className=" text-green-300 ">Cargando...</h1>;
  } else if (!isTokenExpired) {
    return children;
  } else {
    return (
      <Modal isOpen={true} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sesión cerrada
              </ModalHeader>
              <ModalBody>
                <p>Su sesión ha expirado. Reinicie su sesión por favor.</p>
              </ModalBody>
              <ModalFooter>
                <Link
                  to="/signin"
                  className=" p-[10px] bg-black text-white rounded hover:bg-gray-800 duration-300 "
                >
                  Iniciar Sesión
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
}
