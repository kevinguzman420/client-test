import { useFormContext } from "react-hook-form";

export const CustomInput = ({
  type = "text",
  placeholder = "",
  defaultValue = "",
  registerName = "",
  error = "",
}) => {
  const { register } = useFormContext(); // Obtenemos la función de registro de react-hook-form

  return (
    <div className=" w-full mb-6 ">
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(registerName)} // Registramos el campo con react-hook-form
        className=" w-full h-[36px] text-slate-950 bg-white rounded indent-2 "
      />
      {error && <p className=" text-sm text-red-400 ">{error}</p>}
    </div>
  );
};
