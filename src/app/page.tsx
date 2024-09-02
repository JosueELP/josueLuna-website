import HomePage from './components/home-page';
import AboutMe from './components/aboutme-page';
import Projects from './components/projects-page';
import ContactMe from './components/contactme-page';
import NavBar from './components/nav-bar';
import styles from "./page.module.css";
import "@fontsource/ia-writer-mono";

export default function Home() {
  return (
    <main className={styles.container}>
      <NavBar/>
      <HomePage/>
      <AboutMe/>
      <Projects/>
      <ContactMe/>
    </main>
  );
}
