import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { Checkbox, FormControlLabel } from '@mui/material';
import TUser from "../Ts/UserRegiste";
import registerSchema from "../Validaisions/Simcha";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TUser>({
    defaultValues: {
      name:{
          first:"",
          middle:"",
          last:"",
      },
      address:{
        state:"",
        country:"",     
        city:"",
        street:"",
        houseNumber:0,
        zip:0,
      },
      phone:"",
      email:"",
      image:{
          url:"",
          alt:"",
      },
      password:"",
      isBusiness:false,
    },
    mode: "onChange",
    // התיקון החשוב: מוסיפים abortEarly:false כדי לקבל את כל השגיאות ולא רק הראשונה
    resolver: joiResolver(registerSchema, { abortEarly: false }),
  });

  const submitForm = async (data: TUser) => {
    console.log("Form submitted", data);
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        data,
      );
      toast.success("Registration successful!");
      reset();
    } catch (error: any) {
      toast.error("Registration failed. Please try again.");
      // לא לקרוא ל-reset() במקרה של שגיאה כדי לא למחוק את התוכן
    }
  };

  return (
    <main className="pt-75">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-10 rounded-xl shadow-lg w-full max-w-4xl"
        >
          <h1 className="text-3xl font-bold mb-4 sm:col-span-2">Register</h1>

          <div>
            <FloatingLabel
              {...register("name.first")}
              variant="outlined"
              label="First Name"
              type="text"
            />
            {errors.name?.first && (
              <p className="text-red-500 text-sm mt-1">{errors.name.first.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("name.middle")}
              variant="outlined"
              label="Middle Name"
              type="text"
            />
          </div>

          <div>
            <FloatingLabel
              {...register("name.last")}
              variant="outlined"
              label="Last Name"
              type="text"
            />
            {errors.name?.last && (
              <p className="text-red-500 text-sm mt-1">{errors.name.last.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.state")}
              variant="outlined"
              label="State"
              type="text"
            />
            {errors.address?.state && (
              <p className="text-red-500 text-sm mt-1">{errors.address.state.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.country")}
              variant="outlined"
              label="Country"
              type="text"
            />
            {errors.address?.country && (
              <p className="text-red-500 text-sm mt-1">{errors.address.country.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.city")}
              variant="outlined"
              label="City"
              type="text"
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.street")}
              variant="outlined"
              label="Street"
              type="text"
            />
            {errors.address?.street && (
              <p className="text-red-500 text-sm mt-1">{errors.address.street.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.houseNumber")}
              variant="outlined"
              label="House Number"
              type="text"
            />
            {errors.address?.houseNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.address.houseNumber.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.zip")}
              variant="outlined"
              label="Zip"
              type="text"
            />
            {errors.address?.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.address.zip.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("phone")}
              variant="outlined"
              label="Phone"
              type="text"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("email")}
              variant="outlined"
              label="Email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("image.url")}
              variant="outlined"
              label="Image URL"
              type="text"
            />
            {errors.image?.url && (
              <p className="text-red-500 text-sm mt-1">{errors.image.url.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("image.alt")}
              variant="outlined"
              label="Image Alt"
              type="text"
            />
            {errors.image?.alt && (
              <p className="text-red-500 text-sm mt-1">{errors.image.alt.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("password")}
              variant="outlined"
              label="Password"
              type="password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("isBusiness")}
                  color="primary"
                />
              }
              label="Business Account"
            />
          </div>

          <div className="sm:col-span-2 mt-4">
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Register
            </Button>
            <Button
              type="button"
              onClick={() => reset()}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
