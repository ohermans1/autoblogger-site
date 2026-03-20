import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StaffPickPage from "./StaffPickPage";

test("renders the dedicated staff pick page with proof and FAQ content", () => {
  render(
    <MemoryRouter>
      <StaffPickPage />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /2x Shopify Staff Pick/i })).toBeInTheDocument();
  expect(screen.getByText(/Seen in the Shopify App Store spotlight/i)).toBeInTheDocument();
  expect(screen.getByText(/Shopify spotlight in 2024/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /View autoBlogger on Shopify/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /When was autoBlogger featured as a Shopify Staff Pick\?/i }));

  expect(screen.getByText(/2024 and 2026/i)).toBeInTheDocument();
});
