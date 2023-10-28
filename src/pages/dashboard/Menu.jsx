import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  useDisclosure, // modal
} from "@nextui-org/react";


// state
import { useMenuStore } from "../../store/menuStore";

// components
import DashboardLayout from "./DashboardLayout";
import CustomizeMenuModal from "./CustomizeMenuModal";
// assets

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getMenuItems = async () => {
    try {
      const { data } = await axios.get("/api/v1.0/kitchen/menu");
      console.log(data);
      setMenus(data.menus);
    } catch (error) {}
  };
  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <DashboardLayout>
      {menus.length > 0 ? (
        <div className=" flex justify-start py-[36px] h-full ">
          {menus.map((menu) => (
            <MenuCard {...{ menu, onOpen }} key={menu.id} />
          ))}
        </div>
      ) : (
        <div>
          <p>There's no menu available yet</p>
        </div>
      )}
      <CustomizeMenuModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </DashboardLayout>
  );
}

const MenuCard = ({ menu, onOpen }) => {
  const setSelectedMenu = useMenuStore((state) => state.setSelectedMenu);

  const handleCardClick = () => {
    setSelectedMenu(menu);
    onOpen();
  };
  return (
    <Card
      className=" mx-[36px] py-4 w-[200px] max-h-[450px] "
      onClick={() => alert("Hola Mundo")}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{menu.name}</h4>
        <p className="text-tiny uppercase font-bold">{menu.name}</p>
        <small className="text-default-500">{menu.description}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={menu.name}
          className="object-cover rounded-xl"
          src={menu.image}
          width={270}
        />
        <Button onPress={handleCardClick} className=" mt-3 ">
          Order
        </Button>
      </CardBody>
    </Card>
  );
};
