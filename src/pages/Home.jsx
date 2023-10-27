import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomInput } from "../components/elements/FormElements";

// validations
const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email please")
    .required("Enter your email please"),
  password: yup.string().required("Enter your password please"),
});

export default function Home() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    // api request to verify user identity...
    navigate("/dashboard");
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
              className=" w-[100px] h-[36px] bg-slate-600 rounded "
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
