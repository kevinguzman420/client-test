import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { CustomInput } from "../components/elements/FormElements";

// validations
const schema = yup.object({
  username: yup.string().required("Enter your username please"),
  email: yup
    .string()
    .email("Enter a valid email please")
    .required("Enter your email please"),
  password: yup.string().required("Enter your password please"),
});

export default function Signup() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { data } = await axios.post("/api/v1.0/users/signup", formData);
    if (data.status_code === 201) {
      toast.success(data.message);
      navigate("/signin");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className=" flex flex-col justify-center items-center w-full h-full ">
        <div className=" text-[32px] ">
          <h1>Create your account</h1>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className=" mt-[36px] w-[500px] "
        >
          <CustomInput
            type="text"
            placeholder="Username"
            registerName="username"
            defaultValue=""
            error={errors.username?.message}
          />
          <CustomInput
            type="email"
            placeholder="Email"
            registerName="email"
            defaultValue=""
            error={errors.email?.message}
          />
          <CustomInput
            type="password"
            placeholder="Password"
            registerName="password"
            error={errors.password?.message}
          />
          <div className=" w-full ">
            <button
              className=" px-[20px] w-auto h-[36px] bg-blue-400 text-black rounded "
              type="submit"
            >
              Create Account
            </button>
          </div>
          <div className=" mt-[40px] w-full ">
            <Link to="/signin" className=" flex items-center ">
              Sign In <i className=" ml-2 fa-solid fa-arrow-right-long "></i>
            </Link>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
