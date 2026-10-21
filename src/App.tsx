import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Activity from "./components/Activity";
import Education from "./components/Education";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Activity />
        <Education />
        <Contact />
      </main>
    </>
  );
}

export default App;
