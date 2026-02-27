import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders primary hero heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Automatically publish SEO-optimised blogs/i);
  expect(headingElement).toBeInTheDocument();
});
