"use client";

import { useState, useEffect } from 'react'
import styles from "../page.module.css";

const classNames = require('classnames');

export default function HomePage() {
  const [os, setOS] = useState<string | null>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.indexOf("win") > -1) setOS("Windows")
    else if (userAgent.indexOf("mac") > -1) setOS("MacOS")
    else if (userAgent.indexOf("linux") > -1) setOS("Linux")
    else if (userAgent.indexOf("android") > -1) setOS("Android")
    else if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1) setOS("iOS")
    else setOS("Unknown")
    console.log("OS: ", userAgent)
  }, [])

  const getVideoUrl = () => {
    switch (os) {
      case "MacOS":
        return "../../assets/synthwave-animation.mov"
      case "iOS":
        return "../../assets/synthwave-animation.mov"
      default:
        return "../../assets/synthwave-animation.webm"
    }
  }

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
          <source src={getVideoUrl()}/>
          Your browser does not support the video background.
        </video>
      </div>

    </div>
  );
}
