import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useJwt } from "react-jwt";
import Cookies from "js-cookie";

import { CustomInput } from "../components/elements/FormElements";
import { loadAxiosSettings } from "../utils/axios.config";

// validations
const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email please")
    .required("Enter your email please"),
  password: yup.string().required("Enter your password please"),
});

export default function Signin() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post("/api/v1.0/users/signin", formData, {
        withCredentials: true,
      });

      if (data.status_code === 200) {

        Cookies.set("access_token", data.access_token, {
          secure: true,
          sameSite: "none",
        });
        Cookies.set("refresh_token", data.refresh_token, {
          secure: true,
          sameSite: "none",
        });

        loadAxiosSettings();
      }
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.status);
    }
    // navigate("/dashboard");
  };

  return (
    <FormProvider {...methods}>
      <div className=" flex flex-col justify-center items-center w-full h-full ">
        <div className=" text-[32px] ">
          <h1>Enter your data</h1>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className=" mt-[36px] w-[500px] "
        >
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
              className=" w-[100px] h-[36px] bg-green-400 text-black rounded "
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className=" mt-[40px] w-full ">
            <Link to="/signup" className=" flex items-center ">
              Sign Up <i className=" ml-2 fa-solid fa-arrow-right-long "></i>
            </Link>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
