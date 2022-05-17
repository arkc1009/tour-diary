import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages";

describe("index", () => {
  it("render a main", () => {
    render(<Home />);

    const head = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(head).toBeInTheDocument();
  });
});
