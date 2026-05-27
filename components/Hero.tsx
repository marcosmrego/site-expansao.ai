import { IconTopologyStar3 } from "@tabler/icons-react";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="pill">
            <span className="pill-dot" />
            <IconTopologyStar3 size={13} />
            Inteligência aplicada a operações
          </div>

          <h1>
            Dados, automação e <em>IA</em> para negócios que precisam decidir
            melhor.
          </h1>

          <p>
            A Expansão AI cria soluções que conectam inteligência artificial,
            dados e processos para transformar operação em leitura estratégica,
            automação e tomada de decisão.
          </p>

          <div className="hero-actions">
            <a className="btn-primary" href="#projetos">
              Ver projetos
            </a>
            <a className="btn-ghost" href="#servicos">
              Como trabalhamos
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>IA</strong>
              <span>agentes e decisão assistida</span>
            </div>
            <div>
              <strong>Dados</strong>
              <span>leitura operacional</span>
            </div>
            <div>
              <strong>Fluxos</strong>
              <span>automação conectada</span>
            </div>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
