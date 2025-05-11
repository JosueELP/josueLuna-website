"use client";

import { useState, useEffect, useRef } from 'react'
import { RetrowaveScene } from "../scripts/retrowave_scene.js";
import styles from "../css/page.module.css";

const classNames = require('classnames');

interface HomePageProps {
  dictionary: { [key: string]: string }
}

export default function HomePage({ dictionary } : HomePageProps) {
  const [os, setOS] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    if (userAgent.indexOf("iphone") > -1 
        || userAgent.indexOf("ipad") > -1
        || userAgent.indexOf("ios") > -1 
        || userAgent.indexOf("android") > -1) { setOS("Mobile") }
    else setOS("Desktop")

    if (os !== null) {
      if (!containerRef.current) return
      // Initialize the retrowave scene
      const retrowaveScene = new RetrowaveScene("", ("Mobile" === os));
      retrowaveScene.prepareScene(false, true)
    }

    console.log("condition: ", ("Mobile" === os));
    console.log("user agent: ", userAgent);
    console.log("OS: ", os);
  }, [os])

  return (
    <div className={styles.main} id="homePage">
      <div className={classNames(styles.fontAiWritter, styles.absolute, styles.coloredFont)}>
        <h1 className={styles.title}>
          <span className={classNames(styles.italic, styles.small)}>
            {dictionary.preTitle}
          </span> 
          <br/> 
          <span className={styles.bold}>
            {dictionary.titleName}
          </span>
        </h1>
        <div className={styles.afterName}>
          <h3>{dictionary.afterNameValues[0]}</h3>
          <h3>{dictionary.afterNameValues[1]}</h3>
          <h3>{dictionary.afterNameValues[2]}</h3>
        </div>
      </div>

      <div
      ref={containerRef} 
      id="retrowaveSceneContainer"
      className={styles.retrowaveScene}
      ></div>

    </div>
  );
}
