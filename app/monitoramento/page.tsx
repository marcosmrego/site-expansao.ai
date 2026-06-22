import { buscarExecucoes } from "../../lib/db";

export const dynamic = "force-dynamic";

function formatarData(data: string) {
  return new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export default async function MonitoramentoPage() {
  const execucoes = await buscarExecucoes();

  return (
    <main
      style={{ background: "var(--bg)", color: "var(--text)" }}
      className="min-h-screen px-6 py-12"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-1">Radar FIIs — Monitoramento</h1>
        <p className="mb-8" style={{ color: "var(--muted)" }}>
          Últimas execuções da pipeline diária (geração de vídeo + upload no YouTube).
        </p>

        {execucoes.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Nenhuma execução registrada ainda.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-hi)" }}>
                <th className="py-2 pr-4">Data</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Detalhe</th>
              </tr>
            </thead>
            <tbody>
              {execucoes.map((execucao) => (
                <tr key={execucao.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    {formatarData(execucao.data_referencia)}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="rounded px-2 py-1 text-xs font-medium"
                      style={
                        execucao.status === "sucesso"
                          ? { background: "rgba(34,197,94,0.15)", color: "#4ade80" }
                          : { background: "rgba(239,68,68,0.15)", color: "#f87171" }
                      }
                    >
                      {execucao.status === "sucesso" ? "sucesso" : "falha"}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {execucao.status === "sucesso" ? (
                      execucao.video_url ? (
                        <a
                          href={execucao.video_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--violet-light)" }}
                          className="underline"
                        >
                          ver vídeo
                        </a>
                      ) : (
                        "—"
                      )
                    ) : (
                      <span style={{ color: "var(--muted)" }}>
                        {execucao.etapa_falha ? `${execucao.etapa_falha}: ` : ""}
                        {execucao.erro_detalhe ?? "erro não detalhado"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
