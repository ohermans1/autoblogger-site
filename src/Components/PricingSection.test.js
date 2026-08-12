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
    { name: "Volume (Daily)", monthly: "$29.95 / month", annual: "or $299.95/year and save 17%", trial: "14-day free trial" },
    { name: "Authority (Pro)", monthly: "$59.95 / month", annual: "or $599.95/year and save 17%", trial: "7-day free trial" }
  ];

  expectedPlans.forEach(plan => {
    const card = screen.getByRole("heading", { name: plan.name }).closest(".pricing-card");

    expect(card).not.toBeNull();
    expect(within(card).getByText(plan.monthly)).toBeInTheDocument();
    expect(within(card).getByText(plan.annual)).toBeInTheDocument();
    expect(within(card).getByText(plan.trial)).toBeInTheDocument();
  });
});

test("renders the defining features of Growth, Volume, and Authority", () => {
  render(
    <MemoryRouter>
      <PricingSection />
    </MemoryRouter>
  );

  const growth = screen.getByRole("heading", { name: "Growth" }).closest(".pricing-card");
  const volume = screen.getByRole("heading", { name: "Volume (Daily)" }).closest(".pricing-card");
  const authority = screen.getByRole("heading", { name: "Authority (Pro)" }).closest(".pricing-card");

  expect(within(growth).getByText("Advanced ChatGPT-5.6 AI model")).toBeInTheDocument();
  expect(within(growth).getByText("Backlink network access")).toBeInTheDocument();
  expect(within(volume).getAllByText("Daily SEO blog publishing")).toHaveLength(2);
  expect(within(authority).getByText("Multi-pass AI writing and editing")).toBeInTheDocument();
  expect(within(authority).getByText("Four premium AI images per article")).toBeInTheDocument();
  expect(within(authority).getByText("Priority support and article fine-tuning")).toBeInTheDocument();
});
