import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SeoLandingPage from "./SeoLandingPage";
import { getPageByRoute } from "../seo/pageCatalog";

test("renders a working ROI calculator for the calculator resource page", () => {
  const page = getPageByRoute("/resources/ecommerce-seo-roi-calculator");

  render(
    <MemoryRouter>
      <SeoLandingPage page={page} />
    </MemoryRouter>
  );

  expect(screen.getByText(/SEO ROI Planning Worksheet/i)).toBeInTheDocument();
  expect(screen.getByText(/Interactive SEO ROI Calculator/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Download CSV/i })).toBeInTheDocument();
  expect(screen.getByText("$1,221")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Projected monthly impressions/i), {
    target: { value: "30000" }
  });

  expect(screen.getByText("$1,379")).toBeInTheDocument();
});
