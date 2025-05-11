import HomePage from '../components/home-page';
import AboutMe from '../components/aboutme-page';
import Projects from '../components/projects-page';
import ContactMe from '../components/contactme-page';
import NavBar from '../components/nav-bar';
import LanguageSwitcher from '../components/laguage-switcher';
import styles from "../css/page.module.css";
import { getDictionary } from '../dictionaries';
import "@fontsource/ia-writer-mono";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang);

  return (
    <main className={styles.container}>
      <LanguageSwitcher/>
      <NavBar
        dictionary={dict}/>
      <HomePage 
        dictionary={dict}/>
      <AboutMe
        dictionary={dict}/>
      <Projects
        dictionary={dict}/>
      <ContactMe
        dictionary={dict}/>
    </main>
  );
}
