import { Button, FloatingLabel } from "flowbite-react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function Log() {
  const dispatch = useDispatch();
  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
  });


const navigate = useNavigate();

  const submit = async (form: typeof initialFormData) => {
    try {
      const tokenRes = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      
      toast.success("Sign In Successful");
      const token = tokenRes.data;
      axios.defaults.headers.common["x-auth-token"] = token;
      localStorage.setItem("token", token);
      console.log(token);

      const parsedToken = JSON.parse(atob(token.split(".")[1]));
      const res = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${parsedToken._id}`
      );
      console.log(res.data);
      dispatch(userActions.login(res.data));
      navigate("/");



    } catch (error) {
      console.error(error);
      toast.error("Sign In Failed");
    }
  };





  return (
    <main className="pt-75">
    <div className="flex min-h-screen items-start justify-center bg-gray-50 pt-32 px-4">
      <form
        onSubmit={handleSubmit(submit)}
        className="
          w-full max-w-md
          space-y-6
          rounded-2xl
          bg-white
          p-8
          shadow-xl
        "
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Sign In</h1>

        <div>
          <FloatingLabel
            type="email"
            variant="outlined"
            label="Email"
            {...register("email")}
            color={errors.email ? "error" : "success"}
          />
          {errors.email && (
            <span className="mt-1 block text-sm text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <FloatingLabel
            type="password"
            variant="outlined"
            label="Password"
            {...register("password")}
            color={errors.password ? "error" : "success"}
          />
          {errors.password && (
            <span className="mt-1 block text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          Sign In
        </Button>
      </form>
    </div>
    </main>
  );
}

export default Log;
