import { buscarResumosSemanais, ResumoSemanal, VariacaoFii } from "../../lib/db";

export const dynamic = "force-dynamic";

function formatarData(data: string) {
  return new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function formatarPercentual(valor: number | null) {
  if (valor === null) return "—";
  const sinal = valor >= 0 ? "+" : "";
  return `${sinal}${valor.toFixed(2).replace(".", ",")}%`;
}

function corPercentual(valor: number | null) {
  if (valor === null) return "var(--muted)";
  return valor >= 0 ? "#4ade80" : "#f87171";
}

function ListaVariacoes({ titulo, itens }: { titulo: string; itens: VariacaoFii[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2" style={{ color: "var(--muted)" }}>
        {titulo}
      </h3>
      <ul className="text-sm space-y-1">
        {itens.map((item) => (
          <li key={item.ticker} className="flex justify-between gap-4">
            <span>{item.ticker}</span>
            <span style={{ color: corPercentual(item.variacao) }}>
              {formatarPercentual(item.variacao)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DestaqueSemana({ resumo }: { resumo: ResumoSemanal }) {
  return (
    <div
      className="rounded-lg p-6 mb-10"
      style={{ border: "1px solid var(--border-hi)" }}
    >
      <h2 className="text-lg font-semibold mb-1">
        Semana de {formatarData(resumo.semana_inicio)} a {formatarData(resumo.semana_fim)}
      </h2>
      <p className="mb-6" style={{ color: "var(--muted)" }}>
        IFIX na semana:{" "}
        <span style={{ color: corPercentual(resumo.ifix_variacao_semana) }}>
          {formatarPercentual(resumo.ifix_variacao_semana)}
        </span>
        {resumo.ifix_variacao_semana_anterior !== null && (
          <>
            {" "}(semana anterior:{" "}
            <span style={{ color: corPercentual(resumo.ifix_variacao_semana_anterior) }}>
              {formatarPercentual(resumo.ifix_variacao_semana_anterior)}
            </span>
            )
          </>
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <ListaVariacoes titulo="Top altas da semana" itens={resumo.top_altas} />
        <ListaVariacoes titulo="Top baixas da semana" itens={resumo.top_baixas} />
      </div>

      {resumo.setor_destaque && (
        <p className="mb-6 text-sm">
          <span style={{ color: "var(--muted)" }}>Setor destaque: </span>
          {resumo.setor_destaque}{" "}
          <span style={{ color: corPercentual(resumo.setor_destaque_variacao) }}>
            ({formatarPercentual(resumo.setor_destaque_variacao)})
          </span>
        </p>
      )}

      {resumo.destaques && (
        <div>
          <h3 className="text-sm font-medium mb-2" style={{ color: "var(--muted)" }}>
            Destaques da semana
          </h3>
          <ul className="text-sm space-y-1 list-disc pl-5">
            {resumo.destaques.split("\n").filter(Boolean).map((linha) => (
              <li key={linha}>{linha}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default async function ResumoSemanalPage() {
  const resumos = await buscarResumosSemanais();
  const [atual, ...anteriores] = resumos;

  return (
    <main
      style={{ background: "var(--bg)", color: "var(--text)" }}
      className="min-h-screen px-6 py-12"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-1">Radar FIIs — Resumo Semanal</h1>
        <p className="mb-8" style={{ color: "var(--muted)" }}>
          Material de apoio para os vídeos editoriais semanais.
        </p>

        {!atual ? (
          <p style={{ color: "var(--muted)" }}>Nenhum resumo semanal gerado ainda.</p>
        ) : (
          <>
            <DestaqueSemana resumo={atual} />

            {anteriores.length > 0 && (
              <>
                <h2 className="text-base font-medium mb-3">Semanas anteriores</h2>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-hi)" }}>
                      <th className="py-2 pr-4">Semana</th>
                      <th className="py-2 pr-4">IFIX</th>
                      <th className="py-2 pr-4">Setor destaque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {anteriores.map((resumo) => (
                      <tr key={resumo.id} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {formatarData(resumo.semana_inicio)} – {formatarData(resumo.semana_fim)}
                        </td>
                        <td className="py-3 pr-4" style={{ color: corPercentual(resumo.ifix_variacao_semana) }}>
                          {formatarPercentual(resumo.ifix_variacao_semana)}
                        </td>
                        <td className="py-3 pr-4">{resumo.setor_destaque ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
