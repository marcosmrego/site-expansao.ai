"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BASE = "https://climate.expansao-ai.com.br";

type Status = { oni: number; classificacao: string; nino34: number; fase: string };
type Trend  = { atual: number; anterior: number; variacao: number; tendencia: string };
type Month  = { periodo: string; oni: number; classificacao: string };

type Data = { status: Status; trend: Trend; history: Month[] };

const classMap: Record<string, { label: string; color: string; bg: string }> = {
  EL_NINO: { label: "El Niño",  color: "#f97316", bg: "rgba(249,115,22,.18)" },
  LA_NINA: { label: "La Niña",  color: "#22d3ee", bg: "rgba(34,211,238,.18)" },
  NEUTRO:  { label: "Neutro",   color: "#9a78ff", bg: "rgba(154,120,255,.18)" },
};

const trendIcon: Record<string, string> = {
  SUBINDO:  "↑",
  DESCENDO: "↓",
  ESTAVEL:  "→",
};

function toPath(values: number[], w: number, h: number) {
  if (values.length < 2) return { line: "", area: "", zeroY: h / 2 };
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = 4;

  const pts = values.map((v, i) => {
    const x = ((i / (values.length - 1)) * w).toFixed(1);
    const y = (h - ((v - min) / range) * (h - pad * 2) - pad).toFixed(1);
    return `${x},${y}`;
  });

  const line = "M" + pts.join(" L");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const zeroY = h - ((-min) / range) * (h - pad * 2) - pad;

  return { line, area, zeroY };
}

export function ClimatePreview() {
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);

  async function load() {
    try {
      const [sRes, tRes, hRes] = await Promise.all([
        fetch(`${BASE}/climate/status`),
        fetch(`${BASE}/climate/trend`),
        fetch(`${BASE}/climate/history`),
      ]);
      if (!sRes.ok || !tRes.ok || !hRes.ok) throw new Error();
      const [status, trend, history] = await Promise.all([
        sRes.json(),
        tRes.json(),
        hRes.json(),
      ]);
      setData({ status, trend, history });
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => clearInterval(id);
  }, []);

  if (failed) {
    return (
      <div className="showcase-preview">
        <div className="preview-grid" />
        <div className="climate-panel">
          <p className="btc-empty">—</p>
        </div>
      </div>
    );
  }

  const cls = data ? (classMap[data.status.classificacao] ?? classMap.NEUTRO) : null;
  const oniValues = data?.history.map((h) => h.oni) ?? [];
  const { line, area, zeroY } = toPath(oniValues, 340, 60);
  const icon = data ? (trendIcon[data.trend.tendencia] ?? "→") : "";
  const varSign = data && data.trend.variacao > 0 ? "+" : "";

  return (
    <div className="showcase-preview">
      <div className="preview-grid" />

      <div className="climate-panel">
        {/* Header */}
        <div className="climate-top">
          <span className="climate-ticker">ENSO / ONI</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="climate-source">NOAA</span>
            <div className="preview-status">
              <span className="preview-status-dot" />
              Ao vivo
            </div>
          </div>
        </div>

        {!data && <p className="btc-empty">Carregando…</p>}

        {data && (
          <>
            {/* Main metric */}
            <div className="climate-main">
              <span className="climate-value">{data.status.oni.toFixed(2)}</span>
              <span
                className="climate-badge"
                style={{ color: cls!.color, background: cls!.bg }}
              >
                {cls!.label}
              </span>
            </div>

            {/* Trend */}
            <div className="climate-trend">
              <span style={{ color: cls!.color, fontWeight: 600 }}>
                {icon} {varSign}{data.trend.variacao.toFixed(2)}
              </span>
              &nbsp;em relação ao mês anterior
            </div>

            {/* Sparkline */}
            <div className="btc-chart">
              <svg viewBox="0 0 340 60" preserveAspectRatio="none" width="100%" height="60">
                {/* Zero reference line */}
                {oniValues.length > 0 && (
                  <line
                    x1="0" y1={zeroY} x2="340" y2={zeroY}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                )}

                <path
                  d={area}
                  fill={`rgba(${
                    data.status.classificacao === "EL_NINO" ? "249,115,22" :
                    data.status.classificacao === "LA_NINA" ? "34,211,238" :
                    "154,120,255"
                  },.16)`}
                />

                <motion.path
                  key={data.status.oni}
                  d={line}
                  fill="none"
                  stroke={cls!.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </svg>
            </div>

            {/* Analysis */}
            <p className="climate-analysis">{data.status.classificacao === "NEUTRO"
              ? `Nino 3.4: ${data.status.nino34.toFixed(2)} · ENSO em neutralidade`
              : `Nino 3.4: ${data.status.nino34.toFixed(2)} · ${data.status.fase}`
            }</p>
          </>
        )}
      </div>
    </div>
  );
}
