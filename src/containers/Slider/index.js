import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const byDateDesc = data?.focus?.length
    ? data.focus.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date))
    : [];

  // Gestion de la pause avec la barre d’espace
  useEffect(() => {
    const handleSpacebar = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, []);

  // Gestion de l'auto défilement
  useEffect(() => {
    if (isPaused || byDateDesc.length === 0) {
      return undefined; // Renvoit undefined explicitement
    }

    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={`${event.title}-${event.id || idx}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>
                  {event.date
                    ? new Date(event.date).toLocaleDateString("fr-FR", {
                        month: "long",
                      })
                    : "(date manquante)"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, idx) => (
            <input
              key={`radio-${event.id}`}
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => setIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

