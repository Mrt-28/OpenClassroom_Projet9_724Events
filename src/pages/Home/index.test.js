import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import * as DataContext from "../../contexts/DataContext";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";

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

  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.spyOn(DataContext, "useData").mockReturnValue({
      last: {
        cover: "/images/default-event.png",
        title: "Test Event",
        date: new Date("2025-10-06")
      }
    });
  });

  it("a list of events is displayed", async () => {
    // to implement
    render(
      <Home>
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
        />
      </Home>
    );
    const eventCard = await screen.findAllByTestId("card-event-testid");
    expect(eventCard.length).toBeGreaterThan(0);
  })
  it("a list a people is displayed", async () => {
    // to implement
    render(
      <Home>
        <PeopleCard
          imageSrc="http://src-image"
          name="test name"
          position="test position"
        />
      </Home>
    );
    const peopleCard = await screen.findAllByTestId("card-people-testid");
    expect(peopleCard.length).toBeGreaterThan(0);
  })
  it("a footer is displayed", async () => {
    // to implement -------------
    render(<Home />);    
    const footer = await screen.findByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    // to implement
    render(
    <Home>
      <EventCard
        imageSrc="http://src-image"
        title="test event"
        date={new Date("2022-04-01")}
        small
        label="boom"
      />      
    </Home>
    );
    const footer = await screen.findByRole("contentinfo");
    const lastEvent = await within(footer).findByTestId("card-event-testid");
    expect(lastEvent).toBeInTheDocument();
  })
});
