"use client";

import ProjectCard from '../components/project-card';
import { useState, useEffect } from 'react'
import styles from "../page.module.css";

const classNames = require('classnames');

export default function Projects() {
  const [items, setItems] = useState(['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'])

  return (
    <div className={classNames(styles.main, styles.fontAiWritter)} id="projects">
      <div className={classNames(styles.projectsContainer)}>
        <div className={classNames(styles.spaceDown)}>
          <h3 className={classNames(styles.spaceDown)}>Some of my personal projects</h3>
        </div>
        <div className={classNames(styles.projectsGrid)}>
          {items.map((item, index) => (
            <ProjectCard/> 
          ))}
        </div>
      </div>
    </div>
  );
}
