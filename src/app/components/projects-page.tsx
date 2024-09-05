import styles from "../page.module.css";

const classNames = require('classnames');

export default function Projects() {
  return (
    <div className={classNames(styles.main, styles.fontAiWritter)} id="projects">
      <div>
        <h3 className={classNames(styles.spaceDown)}>Some of my personal projects</h3>
      </div>
    </div>
  );
}
