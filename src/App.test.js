import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders primary hero heading", async () => {
  render(<App />);
  const headingElement = await screen.findByText(/Shopify AI blog automation/i);
  expect(headingElement).toBeInTheDocument();
  expect(await screen.findByText(/More tools for Shopify growth/i)).toBeInTheDocument();
});
