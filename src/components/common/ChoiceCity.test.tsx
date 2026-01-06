import { render, screen, fireEvent } from "@testing-library/react";
import ChoiceCity from "./ChoiceCity";
import { useCitiesStore } from "../../store/useCitiesStore";

const mockCities = [
  { id: 1, city: "Berlin", name: "Station A", lat: 1, lng: 1 },
  { id: 2, city: "Berlin", name: "Station B", lat: 2, lng: 2 },
  { id: 3, city: "Munich", name: "Station C", lat: 3, lng: 3 },
];

beforeEach(() => {
  useCitiesStore.setState({ selectedCity: null });
});

test("renders unique cities in select", () => {
  render(<ChoiceCity cities={mockCities} />);

  expect(screen.getByText("Berlin")).toBeInTheDocument();
  expect(screen.getByText("Munich")).toBeInTheDocument();
});

test("changes selected city on select change", () => {
  render(<ChoiceCity cities={mockCities} />);

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Berlin" },
  });

  expect(useCitiesStore.getState().selectedCity).toBe("Berlin");
});

test("clears selected city when clicking clear filter", () => {
  useCitiesStore.setState({ selectedCity: "Berlin" });

  render(<ChoiceCity cities={mockCities} />);

  fireEvent.click(screen.getByText(/clear filter/i));

  expect(useCitiesStore.getState().selectedCity).toBe("");
});
