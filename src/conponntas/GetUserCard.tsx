import {  useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

type CardType = {
  _id: string;
  name?: {
    first?: string;
    last?: string;
  };
  address?: {
    city?: string;
    country?: string;
    state?: string;
  };
  email?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  likes?: string[];
  title: string;
  subtitle: string;
  description: string;
};

const GetUserCard = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards", {
        headers: {
          "x-auth-token": token || "",
        },
      })
      .then((res) => {
        setCards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        No cards available.
      </div>
    );
  }


  const deleteCard = async (cardId:any) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
        headers: {
          "x-auth-token": token || "",
        },
      });
     
      toast.success("delete card is Successful");
    // Update the state to remove the deleted card
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));


    } catch (error) {
      console.error("Failed to delete card", error);
   
    }
  };

 




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {cards.map((card) => (
        
    
        
        <div
          key={card._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={card.image?.url ?? "/default-image.jpg"}
            alt={card.image?.alt ?? "Card image"}
            className="w-full h-48 object-cover"
          />
       
       <div className="flex flex-col items-center justify-center" key="{card_title}">
          <h1 className="text-lg font-serif font-medium mb-2">{card.title}</h1>
<h2 className="text-base font-sans italic mb-2 text-gray-700">{card.subtitle}</h2>
<h3 className="text-sm font-light mb-2 text-gray-600">{card.description}</h3>

        </div>


          <div className="p-4">
            <h1 className="text-lg font-serif font-medium mb-2">{card.title}</h1>
            
            <p className="text-gray-600 text-sm mb-1">
              📧 <strong>Email:</strong> {card.email ?? "No email"}
            </p>
            <p className="text-gray-600 text-sm">
              📍 <strong>Location:</strong> {card.address?.city ?? "Unknown city"}, {card.address?.state ?? "Unknown state"}, {card.address?.country ?? "Unknown country"}
            </p>
          </div>
         
          <div className="justify-center flex mb-4">
          <Button onClick={() => deleteCard(card._id)}>delete Card</Button>
        
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetUserCard;
