import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  );

  useEffect(() => {
    if (!byDateDesc || byDateDesc.length === 0){
    return () => {};
    }
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
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
                  {event?.date
                    ? new Date(event.date).toLocaleDateString("fr-FR", {
                        month: "long",
                      })
                    : "(date manquante)"}
                </div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radio-${event.id || radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

