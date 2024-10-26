"use client";

import ProjectCard from '../components/project-card';
import { useState, useEffect } from 'react'
import styles from "../css/page.module.css";

const classNames = require('classnames');

interface ProjectsPageProps {
  dictionary: { [key: string]: string }
}

export default function Projects({ dictionary } : ProjectsPageProps) {
  const [items, setItems] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

  return (
    <div className={classNames(styles.main, styles.fontAiWritter)} id="projects">
      <div className={classNames(styles.projectsContainer)}>
        <div className={classNames(styles.spaceDown)}>
          <h3 className={classNames(styles.spaceDown)}>{dictionary.projectsPageTitle}</h3>
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
