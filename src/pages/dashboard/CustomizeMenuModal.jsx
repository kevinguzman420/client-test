import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  // accordion
  Accordion,
  AccordionItem,
  // radiobutton
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Skeleton, // skeleton
} from "@nextui-org/react";
import { PlusIcon, MinusIcon } from "../../components/icons/Icons";
import { useEffect, useState } from "react";
import { useMenuStore, useCartStore } from "../../store/menuStore";

export default function CustomizeMenuModal({ isOpen, onOpenChange }) {
  const { selectedMenu } = useMenuStore(); // get state (selected menu)
  const { setAddToCart } = useCartStore();

  const [extrasCategoriesMenu, setExtrasCategoriesMenu] = useState([]); // extras category
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"])); // to accordion items
  const [extras, setExtras] = useState(null); // extras by extras category
  const [selectedExtras, setSelectedExtras] = useState([]); // all selected extras
  const [total, setTotal] = useState();
  const [quantity, setQuantity] = useState(1);

  // extras category
  const getMenuCategories = async () => {
    setTotal(selectedMenu.price);
    const {
      data: { extras_category },
    } = await axios.get("/api/v1.0/kitchen/extras-category");
    setExtrasCategoriesMenu(extras_category);
  };

  useEffect(() => {
    isOpen && getMenuCategories();
  }, [isOpen]);

  // extras
  const getExtras = async (extraCategoryId) => {
    const {
      data: { extras },
    } = await axios.get(
      `/api/v1.0/kitchen/extras/extras-category/${extraCategoryId}`
    );
    setExtras(extras);
  };
  useEffect(() => {
    const [extraCategoryId] = selectedKeys;
    if (extraCategoryId > 0) {
      setExtras(null)
      getExtras(extraCategoryId);
    }
  }, [selectedKeys]);

  // handle add extra
  const handleAddExtra = (extra) => {
    setSelectedExtras([...selectedExtras, extra]);

    setTotal((prevTotal) => prevTotal + extra.price); // update total
  };
  // handle remove extra
  const handleRemoveExtra = (extra) => {
    setSelectedExtras((prevSelectedExtras) =>
      prevSelectedExtras.filter((item) => item.id !== extra.id)
    );

    setTotal((prevTotal) => prevTotal - extra.price); // update total
  };

  // update total by quantity menu
  const addQuantityMenu = (op) => {
    setTotal((prevTotal) =>
      op === "+"
        ? prevTotal + selectedMenu.price
        : prevTotal - selectedMenu.price
    );
  };

  // handle Order
  const handleOrder = async (onClose) => {
    const order = {
      subtotal: total,
      extras: selectedExtras,
      menu: selectedMenu,
      quantity,
    };
    setAddToCart(order);

    // clear data
    setTotal(0);
    setSelectedExtras([]);
    setQuantity(1);
    onClose(); // close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
      className=" h-[80%] "
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {selectedMenu.name}
            </ModalHeader>
            <ModalBody>
              <img
                src={selectedMenu.image}
                alt=""
                className=" w-[200px] h-[200px] "
              />
              <div className=" my-[20px] text-3xl ">
                precio: Q {selectedMenu.price}
              </div>
              <p>{selectedMenu.description}</p>

              {/* extras category container */}
              <Accordion
                variant="splitted"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className=" px-0 "
              >
                {/* extra category item */}
                {extrasCategoriesMenu.map((category) => (
                  <AccordionItem
                    key={category.id}
                    aria-label={category.name}
                    title={category.name}
                  >
                    {/* extras */}
                    {extras === null ? (
                      <div className=" flex justify-between items-center mb-3 w-full ">
                        <Skeleton className=" w-[50px] h-[30px] rounded-xl "></Skeleton>
                        <Skeleton className=" w-[100px] h-[20px] rounded-xl "/>
                      </div>
                    ) : extras.length > 0 ? (
                      extras.map((extra) => (
                        <div
                          className=" flex justify-between items-center mb-3 "
                          key={extra.id}
                        >
                          <Button
                            onPress={() => handleAddExtra(extra)}
                            color="primary"
                            size="sm"
                            isDisabled={selectedExtras.some(
                              (element) => element.id === extra.id
                            )}
                          >
                            Add
                          </Button>
                          <p>
                            {extra.name} (+Q{extra.price})
                          </p>
                        </div>
                      ))
                    ) : (
                      <div>No hay extras disponibles</div>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
              {selectedExtras.length > 0 && (
                <div>
                  <h1 className=" text-xl ">Selected Extras</h1>
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>Extra</TableColumn>
                      <TableColumn>Price</TableColumn>
                      <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {selectedExtras.map((extra) => (
                        <TableRow key={extra.id}>
                          <TableCell>{extra.name}</TableCell>
                          <TableCell>{extra.price}</TableCell>
                          <TableCell>
                            <Button
                              onPress={() => handleRemoveExtra(extra)}
                              color="warning"
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              <div className="flex gap-4 items-center my-[32px] ">
                <Button
                  isIconOnly
                  className=" bg-[#202020] text-white "
                  aria-label="Substract one"
                  size="sm"
                  onPress={() => {
                    setQuantity((prevQuantity) =>
                      prevQuantity > 1 ? prevQuantity - 1 : 1
                    );
                    addQuantityMenu("-");
                  }}
                >
                  <MinusIcon />
                </Button>
                <h1 className=" text-xl ">{quantity}</h1>
                <Button
                  isIconOnly
                  className=" bg-[#202020] text-white "
                  aria-label="Add one"
                  size="sm"
                  onPress={() => {
                    setQuantity((prevQuantity) => prevQuantity + 1);
                    addQuantityMenu("+");
                  }}
                >
                  <PlusIcon />
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className=" flex justify-between items-center ">
              <div className=" flex items-center ">
                <span className=" mr-2 text-xl ">Total:</span>
                <div className=" flex justify-center items-center h-[40px] w-[60px] text-white bg-[#202020] rounded-[10px] ">
                  <span className=" mr-1 ">Q</span>
                  {total}
                </div>
              </div>
              <Button
                className=" bg-[#202020] text-white "
                onPress={() => handleOrder(onClose)}
              >
                Agregar al Carrito
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
