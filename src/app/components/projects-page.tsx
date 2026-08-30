"use client";

import ProjectCard from '../components/project-card';
import { useState, useEffect } from 'react'
import styles from "../css/page.module.css";
import classNames from 'classnames';
import { Dictionary } from '../dictionaries';

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  created_at: string
}

interface ProjectsPageProps {
  dictionary: Dictionary
}

const API_URL = "/api/github/repos";

// Mock projects as fallback
const mockedProjects: GitHubRepo[] = [
  {
    id: -1,
    name: "ArduLogger",
    html_url: "https://github.com/AfterByte/ArduLogger",
    description: "A web application made with Flask and Arduino that uses the digital fingerprint sensor AS608 for login and signup",
    language: "Javascript",
    created_at: "2021-05-22T22:32:28Z"
  },
  {
    id: -2,
    name: "BattleShip-ColdWar",
    html_url: "https://github.com/AfterByte/BattleShip-ColdWar",
    description: "An Android BattleShip Game inspired on the Cold War for a School Project ",
    language: "Java",
    created_at: "2018-10-22T22:32:28Z"
  }
];

export default function Projects({ dictionary } : ProjectsPageProps) {
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isApiData, setIsApiData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiRepos = await response.json();
        // Sort API repos by creation date (newest first)
        apiRepos.sort((a: any, b: any) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        
        // Combine API and mock projects
        const combinedRepos = [...apiRepos, ...mockedProjects];
        setAllRepos(combinedRepos);
        setIsApiData(true);
      } catch (error) {
        console.error('Error fetching API repos:', error);
        setAllRepos(mockedProjects); // Fallback to mock data only
        setIsApiData(false);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classNames(styles.main, styles.fontAiWritter)} id="projects">
      <div className={styles.projectsContainer}>
        <div className={styles.spaceDown}>
          <h3 className={styles.spaceDown}>{dictionary.projects.title}</h3>
        </div>

        <div className={styles.projectsGrid}>
          {isLoading ? (
            <div className={styles.spaceDown}>{dictionary.projects.loading}</div>
          ) : (
            allRepos.map((project) => (
              <ProjectCard
                key={project.id}
                repoName={project.name}
                repoLink={project.html_url}
                repoDescription={project.description || "No description available"}
                repoLanguages={project.language || "Unknown"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
