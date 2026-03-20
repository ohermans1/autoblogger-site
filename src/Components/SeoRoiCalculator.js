import React, { useState } from "react";

const DEFAULTS = {
  monthlyImpressions: 20000,
  currentCtr: 2.4,
  targetCtr: 3.8,
  conversionRate: 2.2,
  averageOrderValue: 95
};

function parseNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

const InputField = ({ label, suffix, value, onChange, step = "0.1" }) => (
  <label className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <span className="block text-sm font-semibold text-gray-900">{label}</span>
    <div className="mt-2 flex items-center gap-3">
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {suffix && <span className="text-sm font-semibold text-gray-500">{suffix}</span>}
    </div>
  </label>
);

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const SeoRoiCalculator = ({ tool }) => {
  const defaults = {
    ...DEFAULTS,
    ...(tool?.defaults || {})
  };

  const [inputs, setInputs] = useState(() => ({
    monthlyImpressions: String(defaults.monthlyImpressions),
    currentCtr: String(defaults.currentCtr),
    targetCtr: String(defaults.targetCtr),
    conversionRate: String(defaults.conversionRate),
    averageOrderValue: String(defaults.averageOrderValue)
  }));

  const monthlyImpressions = parseNumber(inputs.monthlyImpressions);
  const currentCtr = parseNumber(inputs.currentCtr);
  const targetCtr = parseNumber(inputs.targetCtr);
  const conversionRate = parseNumber(inputs.conversionRate);
  const averageOrderValue = parseNumber(inputs.averageOrderValue);

  const currentClicks = monthlyImpressions * (currentCtr / 100);
  const projectedClicks = monthlyImpressions * (targetCtr / 100);
  const additionalClicks = projectedClicks - currentClicks;
  const additionalOrders = additionalClicks * (conversionRate / 100);
  const additionalRevenueMonthly = additionalOrders * averageOrderValue;
  const additionalRevenueYearly = additionalRevenueMonthly * 12;

  const updateInput = key => event => {
    setInputs(previous => ({
      ...previous,
      [key]: event.target.value
    }));
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-gray-900">{tool?.title || "Interactive SEO ROI Calculator"}</h2>
        {tool?.description && <p className="mt-2 text-gray-700">{tool.description}</p>}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <InputField label="Monthly impressions" value={inputs.monthlyImpressions} onChange={updateInput("monthlyImpressions")} step="1" />
        <InputField label="Current CTR" suffix="%" value={inputs.currentCtr} onChange={updateInput("currentCtr")} />
        <InputField label="Target CTR" suffix="%" value={inputs.targetCtr} onChange={updateInput("targetCtr")} />
        <InputField label="Conversion rate" suffix="%" value={inputs.conversionRate} onChange={updateInput("conversionRate")} />
        <InputField label="Average order value" suffix="USD" value={inputs.averageOrderValue} onChange={updateInput("averageOrderValue")} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Current Clicks / Month" value={formatNumber(currentClicks)} />
        <StatCard label="Projected Clicks / Month" value={formatNumber(projectedClicks)} />
        <StatCard label="Additional Clicks / Month" value={formatNumber(additionalClicks)} />
        <StatCard label="Additional Orders / Month" value={formatNumber(additionalOrders)} />
        <StatCard label="Additional Revenue / Month" value={formatCurrency(additionalRevenueMonthly)} />
        <StatCard label="Additional Revenue / Year" value={formatCurrency(additionalRevenueYearly)} />
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="font-semibold">What this models</p>
        <p className="mt-2">
          The calculator assumes impressions stay constant and only click-through rate changes. Orders and revenue are derived from the conversion rate and average order value you enter.
        </p>
        {tool?.note && <p className="mt-2">{tool.note}</p>}
      </div>
    </section>
  );
};

export default SeoRoiCalculator;
