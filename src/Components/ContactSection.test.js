import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactSection from "./ContactSection";

test("contact page gives visitors a working email destination and a copy fallback", async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });

  render(<MemoryRouter><ContactSection /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: /let's talk about your shopify blog/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Email support" })).toHaveAttribute("href", "mailto:support@autoblogger.bot");
  expect(screen.getByRole("link", { name: "support@autoblogger.bot" })).toHaveAttribute("href", "mailto:support@autoblogger.bot");

  fireEvent.click(screen.getByRole("button", { name: /copy address/i }));
  await waitFor(() => expect(writeText).toHaveBeenCalledWith("support@autoblogger.bot"));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Email address copied"));
});
