import { Pool } from "pg";

let pool: Pool | undefined;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? "5432"),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  }
  return pool;
}

export type ExecucaoPipeline = {
  id: number;
  data_referencia: string;
  status: "sucesso" | "falha";
  etapa_falha: string | null;
  erro_detalhe: string | null;
  video_url: string | null;
  criado_em: string;
};

export async function buscarExecucoes(limite = 30): Promise<ExecucaoPipeline[]> {
  const { rows } = await getPool().query<ExecucaoPipeline>(
    "SELECT id, data_referencia, status, etapa_falha, erro_detalhe, video_url, criado_em " +
      "FROM execucoes_pipeline ORDER BY data_referencia DESC, id DESC LIMIT $1",
    [limite]
  );
  return rows;
}
