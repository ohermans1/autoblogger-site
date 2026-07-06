import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SeoLandingPage from "./SeoLandingPage";
import { getPageByRoute } from "../seo/pageCatalog";

test("renders the Staff Pick proof page with public screenshots", () => {
  const page = getPageByRoute("/2x-staff-pick");

  render(
    <MemoryRouter>
      <SeoLandingPage page={page} />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { level: 1, name: /2x Shopify Staff Pick/i })).toBeInTheDocument();
  expect(screen.getByText(/Shopify spotlight in 2024/i)).toBeInTheDocument();
  expect(screen.getByText(/Shopify spotlight in 2026/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /View autoBlogger on Shopify/i })).toBeInTheDocument();
});
