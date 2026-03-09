import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders primary hero heading", async () => {
  render(<App />);
  const headingElement = await screen.findByText(/Automatically publish SEO-optimised blogs/i);
  expect(headingElement).toBeInTheDocument();
  expect(await screen.findByText(/Our Other Apps/i)).toBeInTheDocument();
});
