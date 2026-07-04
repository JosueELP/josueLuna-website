"use client";

import ProjectCard from '../components/project-card';
import { useState, useEffect } from 'react'
import styles from "../css/page.module.css";
import { mockedProjects } from "../mocks/mocked-data";

const classNames = require('classnames');
const defaultUrl = "/api/github/repos";

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string
  created_at: string
}

interface ProjectsPageProps {
  dictionary: { [key: string]: string }
}

export default function Projects({ dictionary } : ProjectsPageProps) {
  const [reposData, setReposData] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reposData = await fetchRepos();
        reposData.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })
        setReposData(reposData)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load GitHub repositories. Showing mock projects instead.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchRepos = async () => {
      const response = await fetch(defaultUrl, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    };
  
    fetchData();
  }, []);

  const hasMockData = mockedProjects.length > 0;
  const displayRepos = error ? mockedProjects : reposData;
  const showMockMessage = error || !reposData.length;

  return (
    <div className={classNames(styles.main, styles.fontAiWritter)} id="projects">
      <div className={classNames(styles.projectsContainer)}>
        <div className={classNames(styles.spaceDown)}>
          <h3 className={classNames(styles.spaceDown)}>{dictionary.projectsPageTitle}</h3>
        </div>
        
        <div className={classNames(styles.projectsGrid)}>
          {isLoading ? (
            <div className={classNames(styles.spaceDown)}>Loading projects...</div>
          ) : (
            <>
              {displayRepos.map((project) => (
                <ProjectCard
                  key={hasMockData ? project.id : project.id}
                  repoName={(hasMockData ? project : project).name}
                  repoLink={(hasMockData ? project : project).html_url}
                  repoDescription={(hasMockData ? project : project).description || "No description available"}
                  repoLanguages={(hasMockData ? project : project).language}
                />
              ))}
              
              {showMockMessage && (
                <div className={classNames(styles.spaceDown)}>
                  <p style={{ color: '#888', fontStyle: 'italic' }}>
                    Showing mock data. Enable GitHub API in environment variables.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
