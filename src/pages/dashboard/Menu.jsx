import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  useDisclosure, // modal
  Skeleton,
} from "@nextui-org/react";

// state
import { useMenuStore } from "../../store/menuStore";

// components
import DashboardLayout from "./DashboardLayout";
import CustomizeMenuModal from "./CustomizeMenuModal";
// assets

export default function Menu() {
  const [menus, setMenus] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const skeletonList = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  const getMenuItems = async () => {
    try {
      const { data } = await axios.get("/api/v1.0/kitchen/menu");
      setMenus(data.menus);
    } catch (error) {}
  };
  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <DashboardLayout>
      {menus === null ? (
        <div className=" grid grid-cols-5 grid-rows-2 gap-4 py-[20px] overflow-y-auto ">
          {skeletonList.map((i, index) => (
            <MenuCardSkeleton key={index} />
          ))}
        </div>
      ) : menus.length > 0 ? (
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
    <Card className=" mx-[36px] py-4 w-[200px] max-h-[450px] ">
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

const MenuCardSkeleton = () => {
  return (
    <Card className=" mx-[36px] py-4 w-[200px] max-h-[450px] ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Skeleton>
          <h4 className="font-bold text-large"></h4>
        </Skeleton>
        <Skeleton>
          <p className="text-tiny uppercase font-bold"></p>
        </Skeleton>
        <Skeleton>
          <small className="text-default-500"></small>
        </Skeleton>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Skeleton>
          <div className="object-cover h-[270px] rounded-xl"></div>
        </Skeleton>
        <Skeleton>
          <Button className=" mt-3 "></Button>
        </Skeleton>
      </CardBody>
    </Card>
  );
};
