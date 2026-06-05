"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = "https://climate.expansao-ai.com.br";

type Status   = { oni: number; classificacao: string; nino34: number; fase: string };
type Trend    = { atual: number; anterior: number; variacao: number; tendencia: string };
type Month    = { periodo: string; oni: number; classificacao: string };
type Co2Now   = { co2_ppm: number; data_referencia: string };
type Co2Hist  = { data_referencia: string; co2_ppm: number };
type IceNow   = { extent_mkm2: number | null; data_referencia: string };
type Analysis = { oni: number; nino34: number; analysis: string };

type Data = {
  status: Status;
  trend: Trend;
  history: Month[];
  co2: Co2Now;
  co2History: Co2Hist[];
  ice: IceNow;
  analysis: Analysis;
};

const classMap: Record<string, { label: string; color: string; bg: string }> = {
  EL_NINO: { label: "El Niño",  color: "#f97316", bg: "rgba(249,115,22,.18)" },
  LA_NINA: { label: "La Niña",  color: "#22d3ee", bg: "rgba(34,211,238,.18)" },
  NEUTRO:  { label: "Neutro",   color: "#9a78ff", bg: "rgba(154,120,255,.18)" },
};

const trendIcon: Record<string, string> = { SUBINDO: "↑", DESCENDO: "↓", ESTAVEL: "→" };

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

const SLIDE_INTERVAL = 8_000;
const SLIDES = 3;

const slideVariants = {
  enter: { x: 28, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -28, opacity: 0 },
};

export function ClimatePreview() {
  const [data, setData]     = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  const [slide, setSlide]   = useState(0);

  async function load() {
    try {
      const [sRes, tRes, hRes, cRes, chRes, iRes, aRes] = await Promise.all([
        fetch(`${BASE}/climate/status`),
        fetch(`${BASE}/climate/trend`),
        fetch(`${BASE}/climate/history`),
        fetch(`${BASE}/climate/co2`),
        fetch(`${BASE}/climate/co2/history`),
        fetch(`${BASE}/climate/arctic_ice`),
        fetch(`${BASE}/climate/analysis`),
      ]);
      if (!sRes.ok || !tRes.ok || !hRes.ok) throw new Error();
      const [status, trend, history, co2, co2History, ice, analysis] = await Promise.all([
        sRes.json(), tRes.json(), hRes.json(),
        cRes.ok ? cRes.json() : null,
        chRes.ok ? chRes.json() : [],
        iRes.ok ? iRes.json() : null,
        aRes.ok ? aRes.json() : null,
      ]);
      setData({ status, trend, history, co2, co2History, ice, analysis });
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

  const next = useCallback(() => setSlide(s => (s + 1) % SLIDES), []);

  useEffect(() => {
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  if (failed) {
    return (
      <div className="showcase-preview">
        <div className="preview-grid" />
        <div className="climate-panel"><p className="btc-empty">—</p></div>
      </div>
    );
  }

  const cls       = data ? (classMap[data.status.classificacao] ?? classMap.NEUTRO) : null;
  const oniValues = data?.history.map(h => h.oni) ?? [];
  const { line: oniLine, area: oniArea, zeroY } = toPath(oniValues, 340, 60);
  const icon    = data ? (trendIcon[data.trend.tendencia] ?? "→") : "";
  const varSign = data && data.trend.variacao > 0 ? "+" : "";

  const co2Values = (data?.co2History ?? []).slice(-30).map(r => r.co2_ppm);
  const { line: co2Line, area: co2Area } = toPath(co2Values, 340, 60);

  const analysisText = data?.analysis?.analysis ?? "";
  const analysisSnippet = analysisText.length > 220
    ? analysisText.slice(0, 220).replace(/\s\S+$/, "") + "…"
    : analysisText;

  return (
    <div className="showcase-preview">
      <div className="preview-grid" />

      <div className="climate-panel">
        {/* Header sempre visível */}
        <div className="climate-top">
          <span className="climate-ticker">
            {slide === 0 ? "ENSO / ONI" : slide === 1 ? "CO₂ Atmosférico" : "Análise Climática"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="climate-source">{slide === 2 ? "Zhora AI" : "NOAA"}</span>
            <div className="preview-status">
              <span className="preview-status-dot" />
              Ao vivo
            </div>
          </div>
        </div>

        {!data && <p className="btc-empty">Carregando…</p>}

        {data && (
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: "easeInOut" }}
            >
              {/* ── Slide 0: ENSO/ONI ── */}
              {slide === 0 && (
                <>
                  <div className="climate-main">
                    <span className="climate-value">{data.status.oni.toFixed(2)}</span>
                    <span className="climate-badge" style={{ color: cls!.color, background: cls!.bg }}>
                      {cls!.label}
                    </span>
                  </div>
                  <div className="climate-trend">
                    <span style={{ color: cls!.color, fontWeight: 600 }}>
                      {icon} {varSign}{data.trend.variacao.toFixed(2)}
                    </span>
                    &nbsp;em relação ao mês anterior
                  </div>
                  <div className="btc-chart">
                    <svg viewBox="0 0 340 60" preserveAspectRatio="none" width="100%" height="60">
                      {oniValues.length > 0 && (
                        <line x1="0" y1={zeroY} x2="340" y2={zeroY}
                          stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3" />
                      )}
                      <path d={oniArea} fill={`rgba(${
                        data.status.classificacao === "EL_NINO" ? "249,115,22" :
                        data.status.classificacao === "LA_NINA" ? "34,211,238" : "154,120,255"
                      },.16)`} />
                      <motion.path key={data.status.oni} d={oniLine} fill="none"
                        stroke={cls!.color} strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.4, ease: "easeOut" }} />
                    </svg>
                  </div>
                  <p className="climate-analysis">
                    {data.status.classificacao === "NEUTRO"
                      ? `Nino 3.4: ${data.status.nino34.toFixed(2)} · ENSO em neutralidade`
                      : `Nino 3.4: ${data.status.nino34.toFixed(2)} · ${data.status.fase}`}
                  </p>
                </>
              )}

              {/* ── Slide 1: CO₂ + Gelo Ártico ── */}
              {slide === 1 && (
                <>
                  <div className="climate-main">
                    <span className="climate-value">{data.co2?.co2_ppm.toFixed(1)}</span>
                    <span className="climate-badge" style={{ color: "#f97316", background: "rgba(249,115,22,.18)" }}>
                      ppm
                    </span>
                  </div>
                  {data.ice?.extent_mkm2 != null && (
                    <div className="climate-trend">
                      <span style={{ color: "#22d3ee", fontWeight: 600 }}>
                        ❄ {data.ice.extent_mkm2.toFixed(2)} M km²
                      </span>
                      &nbsp;extensão gelo ártico
                    </div>
                  )}
                  <div className="btc-chart">
                    <svg viewBox="0 0 340 60" preserveAspectRatio="none" width="100%" height="60">
                      <path d={co2Area} fill="rgba(249,115,22,.12)" />
                      <motion.path d={co2Line} fill="none"
                        stroke="#f97316" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }} />
                    </svg>
                  </div>
                  <p className="climate-analysis">
                    CO₂ ref. {data.co2?.data_referencia} · histórico 30 dias
                  </p>
                </>
              )}

              {/* ── Slide 2: Análise IA ── */}
              {slide === 2 && (
                <>
                  <div style={{ marginTop: 4, marginBottom: 8 }}>
                    <span className="climate-badge" style={{ color: "#9a78ff", background: "rgba(154,120,255,.18)", fontSize: "0.7rem" }}>
                      ✦ Gerado por IA
                    </span>
                  </div>
                  <p style={{
                    fontSize: "0.72rem",
                    lineHeight: 1.55,
                    color: "var(--muted, #8a83b2)",
                    margin: "0 0 10px",
                    flex: 1,
                  }}>
                    {analysisSnippet || "Análise indisponível."}
                  </p>
                  <p className="climate-analysis">
                    ONI {data.analysis?.oni?.toFixed(2)} · Nino 3.4 {data.analysis?.nino34?.toFixed(2)}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Navigation dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
          {Array.from({ length: SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === slide ? 16 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: i === slide ? (cls?.color ?? "#9a78ff") : "rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
