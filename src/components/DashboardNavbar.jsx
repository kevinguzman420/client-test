import { Link } from "react-router-dom";

export default function SideNavbar() {
  return (
    <div className=" menu flex flex-col justify-center items-center w-full h-full text-slate-300 border border-slate-800 ">
      <Item to="/dashboard/menu" icon="book-open-reader" />
      <Item to="/dashboard/orders" icon="utensils" />
    </div>
  );
}

const Item = ({ icon, to }) => {
  return (
    <Link to={to} className=" my-[32px] text-2xl cursor-pointer ">
      <i className={` fa-solid fa-${icon}`}></i>
    </Link>
  );
};
