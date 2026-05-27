"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type BtcData = {
  price: number;
  change24h: number;
  sparkline: number[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function toPath(prices: number[], w: number, h: number): string {
  if (prices.length < 2) return "";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const pts = prices.map((p, i) => {
    const x = ((i / (prices.length - 1)) * w).toFixed(1);
    const y = (h - ((p - min) / range) * (h - 6) - 3).toFixed(1);
    return `${x},${y}`;
  });
  return "M" + pts.join(" L");
}

export function InvestmentPreview() {
  const [data, setData] = useState<BtcData | null>(null);
  const [failed, setFailed] = useState(false);

  async function load() {
    try {
      const [priceRes, chartRes] = await Promise.all([
        fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
        ),
        fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
        ),
      ]);

      if (!priceRes.ok || !chartRes.ok) throw new Error();

      const priceJson = await priceRes.json();
      const chartJson = await chartRes.json();

      const raw: [number, number][] = chartJson.prices;
      const step = Math.max(1, Math.floor(raw.length / 28));
      const sparkline = raw.filter((_, i) => i % step === 0).map(([, p]) => p);

      setData({
        price: priceJson.bitcoin.usd,
        change24h: priceJson.bitcoin.usd_24h_change,
        sparkline,
      });
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  const up = (data?.change24h ?? 0) >= 0;
  const stroke = up ? "#4ade80" : "#f87171";
  const fill = up ? "rgba(74,222,128,.2)" : "rgba(248,113,113,.16)";
  const linePath = data ? toPath(data.sparkline, 340, 58) : "";
  const areaPath = linePath ? `${linePath} L340,58 L0,58 Z` : "";

  return (
    <div className="showcase-preview">
      <div className="preview-grid" />

      <div className="btc-panel">
        <div className="btc-top">
          <span className="btc-ticker">BTC / USD</span>
          <div className="preview-status">
            <span className="preview-status-dot" />
            Ao vivo
          </div>
        </div>

        {!data && !failed && <p className="btc-empty">Carregando…</p>}
        {failed && <p className="btc-empty">—</p>}

        {data && (
          <>
            <div className="btc-price">{formatUSD(data.price)}</div>

            <div className={`btc-change ${up ? "up" : "down"}`}>
              {up ? "▲" : "▼"}&nbsp;{Math.abs(data.change24h).toFixed(2)}%
              <span className="btc-period">nas últimas 24h</span>
            </div>

            <div className="btc-chart">
              <svg
                viewBox="0 0 340 58"
                preserveAspectRatio="none"
                width="100%"
                height="58"
              >
                <path d={areaPath} fill={fill} />
                <motion.path
                  key={data.price}
                  d={linePath}
                  fill="none"
                  stroke={stroke}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
