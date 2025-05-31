import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  // Ajout / retrait de la classe body selon l'état de la modale
  useEffect(() => {
  if (isOpened) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  // Nettoyage
  return () => {
    document.body.style.overflow = "";
  };
}, [isOpened]);


  // Appelle la fonction enfant et extrait les parties avant/après ouverture
  const rendered = children({ isOpened, setIsOpened });
  const safeChildren = rendered?.props?.children;

  const childArray = Array.isArray(safeChildren)
    ? safeChildren
    : [safeChildren].filter(Boolean); // Retire null ou undefined

  return (
    <>
      {childArray[0] ?? null}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {childArray[1] ?? null}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)}
              className="modal-close"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Modal;
