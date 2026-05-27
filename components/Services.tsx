import { IconBrain, IconDatabase, IconBolt } from "@tabler/icons-react";

const services = [
  {
    icon: IconBrain,
    title: "Agentes Inteligentes",
    description:
      "Agentes conectados aos processos internos para responder, executar tarefas, apoiar decisões e reduzir trabalho operacional.",
  },
  {
    icon: IconBolt,
    title: "Automação Operacional",
    description:
      "Fluxos automatizados integrando sistemas, APIs, dados, WhatsApp, e-mail e processos internos.",
  },
  {
    icon: IconDatabase,
    title: "Dados e Analytics",
    description:
      "Dashboards, indicadores, observabilidade operacional e inteligência baseada em dados.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="site-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-dot" />
            Serviços
          </div>

          <h2 className="section-title">Inteligência aplicada à operação</h2>

          <p className="section-description">
            Construímos soluções que unem automação, inteligência artificial e
            leitura operacional para gerar ganho real de produtividade, contexto
            e capacidade analítica.
          </p>
        </div>

        <div className="cards-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="feature-card" key={service.title}>
                <div className="feature-icon">
                  <Icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
