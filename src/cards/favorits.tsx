import axios from "axios";
import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

type CardType = {
  title: string;
  subtitle: string;
  description: string;
  image: {
    url: string;
  };
  likes: [];
  _id: string;
};




const Favourites = () => {

  
  const [cards, setCards] = useState<CardType[]>([]);

  const searchWord = useSelector(
    (state: TRootState) => state.search.searchWord
  );
  const user = useSelector((state: TRootState) => state.user.user);

if(!user){
  window.location.href = "/Login"
  return null;
}

  const navigate = useNavigate();

  const filterBySearch = () => {
    return cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
        );

        const likedCards = response.data.filter((item: CardType) => {
          return item.likes.includes(user?._id + "");
        });
        setCards(likedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    if (user?._id) {
      fetchCards();
    }
  }, [user?._id]);

  return (
    <main className="pt-75">
    <div className="flex flex-col items-center justify-start gap-6 p-4">
      <h1 className="text-2xl font-semibold">Favourites Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {filterBySearch().map((card) => (
          <Card key={card._id} className="h-full">
            <h2 className="text-xl font-bold">{card.title}</h2>
            <p className="text-gray-500">{card.subtitle}</p>
            <FaHeart className="m-auto"/>
            <Button onClick={() => navigate("/card/" + card._id)}>Click</Button>
          </Card>
        ))}
        
      </div>
    </div>
    </main>
  );
};

export default Favourites;
