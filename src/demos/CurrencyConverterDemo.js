import React, { useState } from "react";

const exchangeRates = {
  USD: 1.0,
  INR: 86.85,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  JPY: 154.2,
  CAD: 1.39,
  AUD: 1.54,
  SGD: 1.34,
};

const currencyNames = {
  USD: { name: "United States Dollar", flag: "🇺🇸", symbol: "$" },
  INR: { name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  EUR: { name: "Euro", flag: "🇪🇺", symbol: "€" },
  GBP: { name: "British Pound Sterling", flag: "🇬🇧", symbol: "£" },
  AED: { name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  JPY: { name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
  CAD: { name: "Canadian Dollar", flag: "🇨🇦", symbol: "CA$" },
  AUD: { name: "Australian Dollar", flag: "🇦🇺", symbol: "AU$" },
  SGD: { name: "Singapore Dollar", flag: "🇸🇬", symbol: "SG$" },
};

export default function CurrencyConverterDemo() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const convert = (val, from, to) => {
    const usdVal = val / exchangeRates[from];
    return usdVal * exchangeRates[to];
  };

  const convertedValue = convert(amount, fromCurrency, toCurrency);
  const unitRate = convert(1, fromCurrency, toCurrency);
  const inverseUnitRate = convert(1, toCurrency, fromCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const quickAmounts = [10, 50, 100, 500, 1000, 5000];

  return (
    <div className="curr-app">
      <div className="curr-container">
        <header className="curr-header">
          <span className="curr-badge">Real-Time Forex Engine</span>
          <h1>Universal Currency Exchange</h1>
          <p>Institutional grade mid-market exchange rates updated every 60 seconds.</p>
        </header>

        {/* Converter Card */}
        <div className="curr-converter-card">
          <div className="curr-row">
            <div className="curr-input-block">
              <label>Amount to Convert</label>
              <div className="curr-input-wrap">
                <span className="curr-prefix">{currencyNames[fromCurrency].symbol}</span>
                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                />
              </div>
            </div>

            <div className="curr-select-block">
              <label>From Currency</label>
              <div className="curr-select-wrap">
                <span className="curr-flag">{currencyNames[fromCurrency].flag}</span>
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                  {Object.keys(exchangeRates).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur} - {currencyNames[cur].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="curr-swap-wrap">
              <button className="curr-swap-btn" onClick={handleSwap} title="Swap currencies">
                ⇄
              </button>
            </div>

            <div className="curr-select-block">
              <label>To Currency</label>
              <div className="curr-select-wrap">
                <span className="curr-flag">{currencyNames[toCurrency].flag}</span>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                  {Object.keys(exchangeRates).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur} - {currencyNames[cur].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Amount Chips */}
          <div className="curr-quick-chips">
            <span className="curr-chips-label">Quick Values:</span>
            {quickAmounts.map((q) => (
              <button
                key={q}
                className={`curr-chip ${amount === q ? "active" : ""}`}
                onClick={() => setAmount(q)}
              >
                {currencyNames[fromCurrency].symbol}{q}
              </button>
            ))}
          </div>

          {/* Result Display */}
          <div className="curr-result-banner">
            <div className="curr-result-primary">
              <div className="curr-from-txt">
                {amount.toLocaleString()} {fromCurrency} =
              </div>
              <div className="curr-to-txt">
                {convertedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
              </div>
            </div>
            <div className="curr-rates-meta">
              <div>1 {fromCurrency} = {unitRate.toFixed(4)} {toCurrency}</div>
              <div>1 {toCurrency} = {inverseUnitRate.toFixed(4)} {fromCurrency}</div>
            </div>
          </div>
        </div>

        {/* Popular Global Rate Grid */}
        <div className="curr-grid-section">
          <h3>Popular Global Exchange Rates for 1 {fromCurrency}</h3>
          <div className="curr-rates-grid">
            {Object.keys(exchangeRates)
              .filter((c) => c !== fromCurrency)
              .map((cur) => {
                const rate = convert(1, fromCurrency, cur);
                return (
                  <div key={cur} className="curr-rate-card" onClick={() => setToCurrency(cur)}>
                    <div className="curr-card-top">
                      <span className="curr-flag-large">{currencyNames[cur].flag}</span>
                      <div>
                        <strong>{cur}</strong>
                        <div className="curr-rate-sub">{currencyNames[cur].name}</div>
                      </div>
                    </div>
                    <div className="curr-rate-val">
                      {currencyNames[cur].symbol} {rate.toFixed(3)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
