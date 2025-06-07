import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

type CardType = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: {
    url: string;
  };
  likes: string[];
};

const Cards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchWord = useSelector((state: TRootState) =>
    state.search.searchWord.toLowerCase()
  );
  const user = useSelector((state: TRootState) => state.user.user);

 

  useEffect(() => {
    axios
      .get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards")
      .then((res) => {
        setCards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
        setLoading(false);
      });
  }, []);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchWord)
  );

  const likeOrUnlikeCard = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = token;

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`
      );

      const updatedCards = cards.map((card) => {
        if (card._id === cardId) {
          const isLiked = card.likes.includes(user?._id || "");
          const updatedLikes = isLiked
            ? card.likes.filter((id) => id !== user?._id)
            : [...card.likes, user?._id + ""];
          return { ...card, likes: updatedLikes };
        }
        return card;
      });

      setCards(updatedCards);
      toast.success("Updated like status!");
    } catch (error) {
      console.error("Error liking/unliking card:", error);
      toast.error("Failed to update like status");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <main className="pt-5 mt-5">
      <Container className="mt-5 pt-5">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredCards.map((card, index) => {
            const isLiked = card.likes.includes(user?._id || "");
            return (
              <Col key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={card.image?.url || "https://via.placeholder.com/300"}
                    alt={card.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {card.subtitle}
                    </Card.Subtitle>
                    <Card.Text>{card.description}</Card.Text>
                    {user && (
                      <FaHeart
                        className={`${
                          isLiked ? "text-danger" : "text-secondary"
                        } cursor-pointer`}
                        onClick={() => likeOrUnlikeCard(card._id)}
                      />
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </main>
  );
};

export default Cards;
