import styles from "../css/page.module.css";

const classNames = require('classnames');

export default function Footer() {
  return (
    <div className={classNames(styles.footer)} id="Footer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280"><path fill="#a5968c" fillOpacity="1" d="M0,192L40,192C80,192,160,192,240,181.3C320,171,400,149,480,133.3C560,117,640,107,720,112C800,117,880,139,960,138.7C1040,139,1120,117,1200,106.7C1280,96,1360,96,1400,96L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
    </div>
  );
}