import axios from "axios";
import { toast } from "react-toastify";
import useToken from "./useToken";
import Ucards from "../Ts/cards";
import { Button } from "react-bootstrap";
const CrateDeomCard = () => {
  const userId = useToken(); 
  const token = localStorage.getItem("token");

  const generateDemoCard = (): Ucards => {
    const random = Math.random().toString(36).substring(7);
    
    if(!userId) {
      toast.error("משתמש לא מחובר. לא ניתן ליצור כרטיסים.");  
      return {} as Ucards;
    }
    
    return {
      title: `כרטיס ${random}`,
      subtitle: `כותרת משנה ${random}`,
      description: "תיאור דמו כללי",
      phone: "0501234567",
      email: `demo${random}@example.com`,
      web: "https://example.com",
      image: {
        url: "https://picsum.photos/200?random=" + Math.floor(Math.random() * 1000),
        alt: "תמונה אקראית",
      },
      address: {
        state: "מרכז",
        country: "ישראל",
        city: "תל אביב",
        street: "הרצל",
        houseNumber: Math.floor(Math.random() * 100),
        zip: 12345,
      }
    };
  };

  const createFiveDemoCards = async () => {
    if (!token || !userId) {
      toast.error("משתמש לא מחובר. לא ניתן ליצור כרטיסים.");
      


      return;
    }

    try {
      for (let i = 0; i < 5; i++) {
        const card = generateDemoCard();
        await axios.post(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`,
          card,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log(`✅ כרטיס ${i + 1} נוצר`);
      }
       window.location.href = "/userCards"
    
    } catch (error) {
      console.error("❌ שגיאה ביצירת כרטיסי דמו:", error);
      toast.error("אירעה שגיאה בעת יצירת כרטיסי דמו.");
    }
  };

  return (
    <div>
      {/* ...הטופס שלך */}
      <Button
        type="button"
        onClick={createFiveDemoCards}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-2 hover:shadow-lg transition-shadow duration-300" 
      >
        create 5 demo cards
      </Button>
    </div>
  );
};

export default CrateDeomCard;
