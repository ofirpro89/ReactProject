import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import Ucards from "../Ts/cards"; 
import CardSimcha from "../Validaisions/CardSimcha"; 
import axios from "axios";
import { toast } from "react-toastify";
import { TRootState } from "../store/store";
import { useSelector } from "react-redux";







const CrateCard = () => {

  const user = useSelector((state: TRootState) => state.user.user);

  if(!user){
    window.location.href = "/"
    return null;
  }


 
  const token = localStorage.getItem("token");
  console.log(token)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Ucards>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
    },
    mode: "onChange",
    resolver: joiResolver(CardSimcha), 
  });

 
  const submitForm = async (data: Ucards) => {
    console.log("Form submitted", data);
    try {
      await axios.post(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`,
        data,
        {
            headers:{
                "x-auth-token":token
        }
    }
      );
     toast.success("Card created successfully!");
      setTimeout(() => {
        window.location.href = "/userCards";
      }, 2000); 


  
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    
    <main className="pt-75">
      
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-10 rounded-xl shadow-lg w-full max-w-4xl"
        >
          <h1 className="text-3xl font-bold mb-4 sm:col-span-2">Create Card</h1>

          <div>
            <FloatingLabel
              {...register("title")}
              variant="outlined"
              label="Title"
              type="text"
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("subtitle")}
              variant="outlined"
              label="Subtitle"
              type="text"
            />
            {errors.subtitle && <p>{errors.subtitle.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("description")}
              variant="outlined"
              label="Description"
              type="text"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("phone")}
              variant="outlined"
              label="Phone"
              type="text"
            />
            {errors.phone && <p>{errors.phone.message}</p>}
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
              {...register("web")}
              variant="outlined"
              label="Website"
              type="text"
            />
            {errors.web && <p>{errors.web.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("image.url")}
              variant="outlined"
              label="Image URL"
              type="text"
            />
            {errors.image?.url && <p>{errors.image.url.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("image.alt")}
              variant="outlined"
              label="Image Alt"
              type="text"
            />
            {errors.image?.alt && <p>{errors.image.alt.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("address.state")}
              variant="outlined"
              label="State"
              type="text"
            />
            {errors.address?.state && <p>{errors.address.state.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("address.country")}
              variant="outlined"
              label="Country"
              type="text"
            />
            {errors.address?.country && (
              <p>{errors.address.country.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.city")}
              variant="outlined"
              label="City"
              type="text"
            />
            {errors.address?.city && <p>{errors.address.city.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("address.street")}
              variant="outlined"
              label="Street"
              type="text"
            />
            {errors.address?.street && <p>{errors.address.street.message}</p>}
          </div>

          <div>
            <FloatingLabel
              {...register("address.houseNumber")}
              variant="outlined"
              label="House Number"
              type="number"
            />
            {errors.address?.houseNumber && (
              <p>{errors.address.houseNumber.message}</p>
            )}
          </div>

          <div>
            <FloatingLabel
              {...register("address.zip")}
              variant="outlined"
              label="Zip Code"
              type="text"
            />
            {errors.address?.zip && <p>{errors.address.zip.message}</p>}
          </div>

        

          <div className="sm:col-span-2 mt-4">
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
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

export default CrateCard;
