import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PricingSection from "./PricingSection";

test("renders all current Shopify plans with the correct prices and trials", () => {
  render(
    <MemoryRouter>
      <PricingSection />
    </MemoryRouter>
  );

  const expectedPlans = [
    { name: "Starter (Core)", monthly: "$9.95 / month", annual: "or $99.95/year and save 16%", trial: "14-day free trial" },
    { name: "Growth", monthly: "$19.95 / month", annual: "or $199.95/year and save 16%", trial: "14-day free trial" },
    { name: "Volume (Daily)", monthly: "$29.95 / month", annual: "or $299.95/year and save 17%", trial: "14-day free trial" }
  ];

  expectedPlans.forEach(plan => {
    const card = screen.getByRole("heading", { name: plan.name }).closest(".pricing-card");

    expect(card).not.toBeNull();
    expect(within(card).getByText(plan.monthly)).toBeInTheDocument();
    expect(within(card).getByText(plan.annual)).toBeInTheDocument();
    expect(within(card).getByText(plan.trial)).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: `Start the ${plan.name} free trial on Shopify` })).toHaveAttribute("href", "https://apps.shopify.com/autoblogger");
  });
});

test("renders the defining features of Growth and Volume", () => {
  render(
    <MemoryRouter>
      <PricingSection />
    </MemoryRouter>
  );

  const growth = screen.getByRole("heading", { name: "Growth" }).closest(".pricing-card");
  const volume = screen.getByRole("heading", { name: "Volume (Daily)" }).closest(".pricing-card");

  expect(within(growth).getByText("Advanced ChatGPT-5.6 AI model")).toBeInTheDocument();
  expect(within(growth).getByText("Backlink network access")).toBeInTheDocument();
  expect(within(volume).getAllByText("Daily SEO blog publishing")).toHaveLength(2);
});
