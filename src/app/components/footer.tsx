import styles from "../css/page.module.css";
import Wave from 'react-wavify'

const classNames = require('classnames');

export default function Footer() {
  return (
    <div className={classNames(styles.footer)}>
      <Wave mask="url(#mask)" fill="#a5968c" 
        options={{
          height: 40,
          amplitude: 20,
          speed: 0.25,
          points: 5
        }}>
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="2000" height="300" fill="url(#gradient)"  />
          </mask>
        </defs>
      </Wave>
    </div>
  );
}