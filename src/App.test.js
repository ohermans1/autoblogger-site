import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders primary hero heading", async () => {
  render(<App />);
  const headingElement = await screen.findByRole("heading", { name: /Your Shopify blog, on a roll/i });
  expect(headingElement).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: /From a blank blog to a publishing rhythm/i })).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: /Start your 14-day free trial/i })).toHaveAttribute("href", "https://apps.shopify.com/autoblogger");
});
