import Card from "../cards/card";
import { cards as defaultCards } from "../../assets/cards";
import style from "./board.module.css";
import { useState, useEffect } from "react";
import { shuffleArray } from "../../utils";
import type { card } from "../../types/card";

export default function Board() {
  const [cards, setCards] = useState(shuffleArray(defaultCards));
  const [cardsFound, setCardsFound] = useState<number[]>([]);

  const handleClick = (id: number) => {
    const updatedCards = [...cards];
    const clickedCardIndex = updatedCards.findIndex((elt) => elt.id === id);
    updatedCards[clickedCardIndex].isVisible =
      !updatedCards[clickedCardIndex].isVisible;
    setCards(updatedCards);

    checkForMatch(updatedCards);
  };

  function checkForMatch(cards: card[]) {
    const visibleCard = cards.filter(
      (card) => card.isVisible && !cardsFound.includes(card.id)
    );
    if (visibleCard.length === 2) {
      setTimeout(() => {
        if (visibleCard[0].name === visibleCard[1].name) {
          console.log("It is a match");
          setCardsFound((prev) => [
            ...prev,
            visibleCard[0].id,
            visibleCard[1].id,
          ]);
        } else {
          const updatedCards = [...cards];
          const firstCardIndex = updatedCards.findIndex(
            (elt) => elt.id === visibleCard[0].id
          );
          const secondCardIndex = updatedCards.findIndex(
            (elt) => elt.id === visibleCard[1].id
          );
          updatedCards[firstCardIndex].isVisible = false;
          updatedCards[secondCardIndex].isVisible = false;
          setCards(updatedCards);
        }
      }, 1000);
    }
  }

  useEffect(() => {
    if (cardsFound.length === cards.length) {
      alert("Congratulations! You've found all matches!");
    }
  }, [cardsFound, cards]);

  return (
    <>
      <div className={style.board}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}
