import styles from "../page.module.css";

const classNames = require('classnames');

export default function HomePage() {
  return (
    <div className={styles.main} id="homePage">
      <div className={classNames(styles.fontAiWritter, styles.absolute)}>
        <h1 className={styles.title}>
          <span className={classNames(styles.italic, styles.small)}>
            Hi I'm
          </span> 
          <br/> 
          <span className={styles.bold}>
            Josue Luna
          </span>
        </h1>
        <div className={styles.afterName}>
          <h3>Developer</h3>
          <h3>Computer Systems Engineer</h3>
          <h3>Geek</h3>
        </div>
      </div>

      <div className={styles.videoBackground}>
        <video autoPlay loop muted>
          <source src="../../assets/synthwave-animation.webm" type="video/webm"/>
          Your browser does not support the video background.
        </video>
      </div>

    </div>
  );
}
