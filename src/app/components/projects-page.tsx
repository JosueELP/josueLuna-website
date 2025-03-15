"use client";

import ProjectCard from '../components/project-card';
import { useState, useEffect } from 'react'
import styles from "../css/page.module.css";
import { mockedProjects } from "../mocks/mocked-data";

const classNames = require('classnames');
const defaultUserName = "";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = process.env.NEXT_PUBLIC_GITHUB_USERNAME ? process.env.NEXT_PUBLIC_GITHUB_USERNAME : defaultUserName;
  
        const reposData = await fetchUserRepos(userName);
        reposData.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })
        setReposData(reposData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const fetchUserRepos = async (username : String) => {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });
      return response.json();
    };
  
    fetchData();
  }, [process.env.NEXT_PUBLIC_GITHUB_USERNAME, process.env.NEXT_PUBLIC_GITHUB_TOKEN]);

  return (
    <div className={classNames(styles.main, styles.fontAiWritter)} id="projects">
      <div className={classNames(styles.projectsContainer)}>
        <div className={classNames(styles.spaceDown)}>
          <h3 className={classNames(styles.spaceDown)}>{dictionary.projectsPageTitle}</h3>
        </div>
        <div className={classNames(styles.projectsGrid)}>
          {reposData.map((repo) => (
            <ProjectCard
              key={repo.id}
              repoName={repo.name}
              repoLink={repo.html_url}
              repoDescription={repo.description || "No description available"}
              repoLanguages={repo.language}
            />
          ))}

          {/* This is for mocked projects */}
          {mockedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              repoName={project.name}
              repoLink={project.html_url}
              repoDescription={project.description || "No description available"}
              repoLanguages={project.language}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
