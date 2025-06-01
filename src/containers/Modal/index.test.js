/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";

describe("When Modal is rendered with children", () => {
  it("should not display modal content initially", () => {
    render(
      <Modal>
        {({ isOpened, setIsOpened }) => (
          <>
            <button onClick={() => setIsOpened(true)}>Open Modal</button>
            {isOpened && <div>modal content</div>}
          </>
        )}
      </Modal>
    );
    // Vérifie que la modale n’est pas affichée au départ
    expect(screen.queryByText("modal content")).not.toBeInTheDocument();
  });

  it("should display modal content after button click", () => {
    render(
      <Modal>
        {({ isOpened, setIsOpened }) => (
          <>
            <button onClick={() => setIsOpened(true)}>Open Modal</button>
            {isOpened && (
              <>
                <div>modal content</div>
                {/* Ajoute un identifiant unique pour éviter le conflit avec la modale réelle */}
                <button data-testid="custom-close" onClick={() => setIsOpened(false)}></button>
              </>
            )}
          </>
        )}
      </Modal>
    );

    // La modale n’est pas affichée au départ
    expect(screen.queryByText("modal content")).not.toBeInTheDocument();

    // Simule le clic sur le bouton d’ouverture
    fireEvent.click(screen.getByText("Open Modal"));

    // Vérifie que le contenu est maintenant affiché
    expect(screen.getByText("modal content")).toBeInTheDocument();

    // Simule le clic sur le bouton de fermeture personnalisé
    const closeButtons = screen.getAllByTestId("custom-close");
    fireEvent.click(closeButtons[0]);

    // Vérifie que le contenu est de nouveau masqué
    expect(screen.queryByText("modal content")).not.toBeInTheDocument();
  });
});
