import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Projects } from "../components/Projects";
import { Laboratory } from "../components/Laboratory";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Services />
            <Projects />
            <Laboratory />
            <About />
            <Contact />
            <Footer />
        </main>
    );
}