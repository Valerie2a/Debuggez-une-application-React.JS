import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
  // "Catégories" est un titre toujours visible, on s'en sert pour vérifier le rendu de la section
  const categoriesTitle = await screen.findByText("Catégories");
  expect(categoriesTitle).toBeInTheDocument();
  })
  it("a list a people is displayed", () => {
  render(<Home />);
  // Vérifie qu’on a bien le titre de la section
  expect(screen.getByRole("heading", { name: "Notre équipe" })).toBeInTheDocument();
  // Vérifie qu’on a bien un des noms des PeopleCard (exemple : Samira)
  expect(screen.getByText("Samira")).toBeInTheDocument();
  })
  it("a footer is displayed", async () => {
  render(<Home />);  
  const footer = await screen.findByRole("contentinfo");
  expect(footer).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", () => {
  render(<Home />);
  expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
  })
});
