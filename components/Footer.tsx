import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconArrowUpRight,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-grid">

          <div>

            <div className="footer-logo">
              Expansão AI
            </div>

            <p className="footer-text">
              Inteligência artificial,
              dados, automação e
              sistemas conectados
              para transformar
              operação em decisão.
            </p>

          </div>

          <div>

            <h4>
              Navegação
            </h4>

            <nav
              className="
              footer-links
              "
            >

              <a href="#servicos">
                Serviços
              </a>

              <a href="#projetos">
                Projetos
              </a>

              <a href="#laboratorio">
                Laboratório
              </a>

              <a href="#sobre">
                Sobre
              </a>

            </nav>

          </div>

          <div>

            <h4>
              Ecossistema
            </h4>

            <nav
              className="
              footer-links
              "
            >

              <a href="#">
                Produtos
              </a>

              <a href="#">
                AI Climate
              </a>

              <a href="#">
                Laboratório
              </a>

            </nav>

          </div>

          <div>

            <h4>
              Conexões
            </h4>

            <div
              className="
              footer-social
              "
            >

              <a href="#">
                <IconBrandLinkedin
                  size={20}
                />
              </a>

              <a href="#">
                <IconBrandGithub
                  size={20}
                />
              </a>

              <a href="#">
                <IconBrandYoutube
                  size={20}
                />
              </a>

            </div>

            <a
              href="#contato"
              className="
              footer-contact
              "
            >

              Vamos conversar

              <IconArrowUpRight
                size={16}
              />

            </a>

          </div>

        </div>

        <div
          className="
          footer-bottom
          "
        >

          <span>
            © 2026 Expansão AI
          </span>

          <span>
            Dados • IA • Automação
          </span>

        </div>

      </div>
    </footer>
  );
}