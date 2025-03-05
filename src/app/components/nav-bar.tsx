import styles from "../css/page.module.css";

const classNames = require('classnames');

interface NavBarProps {
  dictionary: { [key: string]: string }
}

export default function NavBar({ dictionary } : NavBarProps) {
  return (
    <div className={classNames(styles.navBar)} id="navBar">
      <nav className={classNames(styles.fontAiWritter, styles.smaller)}>
        <a href="#homePage" aria-label="Link to navigate to the top of the home page">
          <div className={classNames(styles.navBarElement)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            {dictionary.navBarHome}
          </div>
        </a>
        <a href="#aboutMe" aria-label="Link to navigate to the 'about me' section of the page">
          <div className={styles.navBarElement}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {dictionary.navBarAbout}
          </div>
        </a>
        <a href="#projects" aria-label="Link to navigate to the 'projects' section of the page">
          <div className={styles.navBarElement}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
            {dictionary.navBarProjects}
          </div>
        </a>
        <a href="#contactMe" aria-label="Link to navigate to the 'contact me' section of the page">
          <div className={styles.navBarElement}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {dictionary.navBarContact}
          </div>
        </a>
      </nav>
    </div>
  );
}
