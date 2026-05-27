import {
  IconFlask,
  IconBrandWhatsapp,
  IconMusic,
  IconBuildingBank,
  IconArrowUpRight,
} from "@tabler/icons-react";

import { MiniDashboard } from "./MiniDashboard";

const labs = [
  {
    title: "Agentes WhatsApp",
    description:
      "Experimentos com atendimento, qualificação, captura de dados e respostas assistidas por IA.",
    icon: IconBrandWhatsapp,
  },
  {
    title: "Focus Blues Lab",
    description:
      "Laboratório criativo para música, vídeos, thumbnails, prompts e automação de conteúdo.",
    icon: IconMusic,
  },
  {
    title: "Finance Intelligence",
    description:
      "Leitura de notas, carteira, rentabilidade, custos e dados financeiros com automação.",
    icon: IconBuildingBank,
  },
];

export function Laboratory() {
  return (
    <section id="laboratorio" className="site-section laboratory-section">
      <div className="container laboratory-grid">
        <div className="laboratory-copy">
          <div className="section-label">
            <IconFlask size={14} />
            Laboratório
          </div>

          <h2 className="section-title">
            Um espaço para transformar ideias em sistemas vivos.
          </h2>

          <p className="section-description">
            O laboratório da Expansão AI reúne experimentos, produtos em
            construção e provas de conceito. É aqui que validamos agentes,
            automações, dashboards e novas formas de aplicar IA em operações
            reais.
          </p>

          <div className="lab-list">
            {labs.map((item) => {
              const Icon = item.icon;

              return (
                <article className="lab-item" key={item.title}>
                  <div className="lab-icon">
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

          <a className="lab-link" href="#contato">
            Conversar sobre um experimento
            <IconArrowUpRight size={16} />
          </a>
        </div>

        <div className="laboratory-visual">
          <MiniDashboard />

          <div className="lab-floating-card lab-floating-a">
            <span>Agents</span>
            <strong>12</strong>
          </div>

          <div className="lab-floating-card lab-floating-b">
            <span>Signals</span>
            <strong>Live</strong>
          </div>
        </div>
      </div>
    </section>
  );
}