import {
  IconArrowUpRight,
  IconCloudComputing,
  IconChartLine,
  IconRobot,
} from "@tabler/icons-react";
import { InvestmentPreview } from "./InvestmentPreview";
import { ClimatePreview } from "./ClimatePreview";

const projects = [
  {
    id: "climate",
    title: "Expansão AI Climate",
    label: "Dados climáticos",
    description:
      "Dashboard experimental para leitura de indicadores climáticos, variações e tendências com foco em dados públicos e visualização simples.",
    icon: IconCloudComputing,
  },
  {
    id: "investment",
    title: "Investment Intelligence",
    label: "Dados financeiros",
    description:
      "Pipeline para ingestão, leitura e análise de notas de negociação, posições, custos e indicadores de carteira.",
    icon: IconChartLine,
  },
  {
    id: "workflow",
    title: "Workflow Agents",
    label: "Automação e IA",
    description:
      "Agentes e fluxos conectando e-mail, WhatsApp, banco de dados, documentos e rotinas operacionais.",
    icon: IconRobot,
  },
];

export function Projects() {
  return (
    <section id="projetos" className="site-section projects-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-dot" />
            Projetos
          </div>

          <h2 className="section-title">
            Produtos e experimentos em construção
          </h2>

          <p className="section-description">
            A Expansão AI nasce como um laboratório aplicado. Cada projeto
            combina tecnologia, operação e inteligência para transformar dados
            em produtos úteis.
          </p>
        </div>

        <div className="showcase-grid">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <article className="showcase-card" key={project.id}>
                {project.id === "investment" ? (
                  <InvestmentPreview />
                ) : project.id === "climate" ? (
                  <ClimatePreview />
                ) : (
                  <div className="showcase-preview">
                    <div className="preview-grid" />

                    <div className="preview-panel">
                      <div className="preview-top">
                        <span>{project.label}</span>
                        <div className="preview-status">
                          <span className="preview-status-dot" />
                          Em construção
                        </div>
                      </div>

                      <div className="preview-bars">
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className="preview-line" />
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        opacity: 0.14,
                        color: "var(--violet-light)",
                      }}
                    >
                      <Icon size={42} />
                    </div>
                  </div>
                )}

                <div className="showcase-content">
                  <span>{project.label}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a className="showcase-link" href="#contato">
                    Conversar sobre isso
                    <IconArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
