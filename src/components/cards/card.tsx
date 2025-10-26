import style from "./card.module.css";
import type { card } from "../../types/card";
import fantom from "../../assets/pictures/fantom.png";

interface CardProps {
  card: card;
  onClick: (id: number) => void;
}

export default function Card({ card, onClick }: CardProps) {
  return (
    <div
      className={style.card}
      onClick={() => !card.isVisible && onClick(card.id)}
    >
      <img
        width={"100%"}
        height={"100%"}
        src={card.isVisible ? card.imageUrl : fantom}
        alt={`${card.name} logo`}
      />
    </div>
  );
}
