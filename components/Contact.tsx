import {
  IconMail,
  IconBrandWhatsapp,
  IconArrowUpRight,
} from "@tabler/icons-react";

export function Contact() {
  return (
    <section
      id="contato"
      className="site-section contact-section"
    >
      <div className="container">

        <div className="contact-card">

          <div className="contact-copy">

            <div className="section-label">
              Contato
            </div>

            <h2 className="section-title">
              Vamos construir algo
              inteligente juntos.
            </h2>

            <p className="section-description">
              Se você possui um processo
              operacional que consome
              tempo, dados que precisam
              virar decisão ou uma ideia
              que merece ganhar vida,
              vamos conversar.
            </p>

            <div className="contact-actions">

              <a
                className="contact-btn-primary"
                href="mailto:contato@expansao-ai.com.br"
              >
                <IconMail
                  size={18}
                />

                Entrar em contato

              </a>

              <a
                className="contact-btn-secondary"
                href="#"
              >

                <IconBrandWhatsapp
                  size={18}
                />

                WhatsApp

              </a>

            </div>

          </div>

          <div
            className="
            contact-panel
            "
          >

            <div
              className="
              contact-box
              "
            >

              <span>
                Operação
              </span>

              <strong>
                IA + Dados
              </strong>

            </div>

            <div
              className="
              contact-box
              "
            >

              <span>
                Integração
              </span>

              <strong>
                APIs + Fluxos
              </strong>

            </div>

            <div
              className="
              contact-box
              "
            >

              <span>
                Inteligência
              </span>

              <strong>
                Analytics
              </strong>

            </div>

            <div
              className="
              contact-box
              "
            >

              <span>
                Execução
              </span>

              <strong>
                Automação
              </strong>

            </div>

            <div
              className="
              contact-glow
              "
            />

            <div
              className="
              contact-orb
              "
            />

          </div>

        </div>

      </div>
    </section>
  );
}