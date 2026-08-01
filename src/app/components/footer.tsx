"use client"

import styles from "../css/page.module.css";
import Wave from 'react-wavify'
import { useTheme } from '../theme-context';

const classNames = require('classnames');

const WAVE_FILL = {
  light: '#a5968c',
  dark: '#ff4fc3',
};

export default function Footer() {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles.footer)}>
      <Wave mask="url(#mask)" fill={WAVE_FILL[theme]}
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
            <rect x="0" y="0" width="100%" height="300" fill="url(#gradient)"  />
          </mask>
        </defs>
      </Wave>
    </div>
  );
}