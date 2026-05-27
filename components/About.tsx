import {
  IconCircuitCell,
  IconDatabaseSearch,
  IconRoute,
} from "@tabler/icons-react";

const principles = [
  {
    title: "Contexto antes da ferramenta",
    description:
      "A tecnologia entra depois que entendemos operação, processo, dados e objetivo de negócio.",
    icon: IconRoute,
  },
  {
    title: "Dados como base",
    description:
      "A leitura dos dados orienta decisões, priorização, automações e evolução dos produtos.",
    icon: IconDatabaseSearch,
  },
  {
    title: "IA aplicada",
    description:
      "Usamos IA para reduzir ruído operacional, acelerar análise e ampliar capacidade de execução.",
    icon: IconCircuitCell,
  },
];

export function About() {
  return (
    <section id="sobre" className="site-section about-section">
      <div className="container about-grid">
        <div>
          <div className="section-label">Sobre</div>

          <h2 className="section-title">
            A Expansão AI conecta estratégia, operação e tecnologia.
          </h2>

          <p className="section-description">
            Atuamos na construção de soluções digitais com foco em automação,
            inteligência artificial, dados e produtos aplicados. O objetivo é
            simples: criar sistemas que ajudem empresas a operar melhor,
            enxergar melhor e decidir melhor.
          </p>
        </div>

        <div className="about-panel">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <article className="about-item" key={item.title}>
                <div className="about-icon">
                  <Icon size={22} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}