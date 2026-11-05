import type { CSSProperties } from 'react';
import {
  type SimpleIcon,
  siApachekafka,
  siBitbucket,
  siCheckmarx,
  siClaude,
  siConfluence,
  siCss,
  siDocker,
  siDynatrace,
  siExpress,
  siGit,
  siGithub,
  siGithubcopilot,
  siGitlab,
  siGooglecloud,
  siGradle,
  siHtml5,
  siIntellijidea,
  siJavascript,
  siJira,
  siJunit5,
  siMysql,
  siNodedotjs,
  siPodman,
  siPostman,
  siPython,
  siReact,
  siRedis,
  siSnyk,
  siSonarqubeserver,
  siSplunk,
  siSpringboot,
} from 'simple-icons';
import styles from "../css/page.module.css";
import { Dictionary } from '../dictionaries';

interface Tech {
  name: string
  path: string
  hex: string
  viewBox?: string
  evenOdd?: boolean
}

type GroupKey = keyof Dictionary['aboutMe']['technologyGroups']

const icon = ({ title, path, hex }: SimpleIcon, name = title): Tech => ({ name, path, hex });

const java: Tech = {
  name: 'Java',
  hex: 'E76F00',
  viewBox: '3 3.5 42 42',
  path: 'M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z M32.084 25.055c1.754-.394 3.233.723 3.233 2.01 0 2.901-4.021 5.643-4.021 5.643s6.225-.742 6.225-5.505C37.521 24.053 34.464 23.266 32.084 25.055zM29.129 27.395c0 0 1.941-1.383 2.458-1.902-4.763 1.011-15.638 1.147-15.638.269 0-.809 3.507-1.638 3.507-1.638s-7.773-.112-7.773 2.181C11.683 28.695 21.858 28.866 29.129 27.395z M27.935,29.571c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z M18.686,32.739c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z M36.281,36.632c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z M39,38.604c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z',
};

const sqlServer: Tech = {
  name: 'SQL Server',
  hex: 'CC2927',
  evenOdd: true,
  path: 'M12 2C7.03 2 3 3.57 3 5.5v13C3 20.43 7.03 22 12 22s9-1.57 9-3.5v-13C21 3.57 16.97 2 12 2zm0 2c4.42 0 7 1.25 7 1.5S16.42 7 12 7 5 5.75 5 5.5 7.58 4 12 4zM5 8.1C6.6 8.68 9.15 9 12 9s5.4-.32 7-.9V12c0 .25-2.58 1.5-7 1.5S5 12.25 5 12zm0 6.5c1.6.58 4.15.9 7 .9s5.4-.32 7-.9v3.9c0 .25-2.58 1.5-7 1.5s-7-1.25-7-1.5z',
};

const techGroups: { key: GroupKey; items: Tech[] }[] = [
  {
    key: 'languages',
    items: [java, icon(siJavascript), icon(siHtml5, 'HTML'), icon(siCss), icon(siPython)],
  },
  {
    key: 'frameworks',
    items: [icon(siSpringboot), icon(siNodedotjs), icon(siExpress), icon(siReact), icon(siJunit5, 'JUnit 5'), icon(siGradle)],
  },
  {
    key: 'data',
    items: [icon(siRedis), icon(siApachekafka, 'Kafka'), icon(siMysql), sqlServer],
  },
  {
    key: 'cloud',
    items: [icon(siGooglecloud, 'GCP'), icon(siDocker), icon(siPodman), icon(siGit), icon(siGithub), icon(siGitlab, 'GitLab CI'), icon(siBitbucket)],
  },
  {
    key: 'monitoring',
    items: [icon(siDynatrace), icon(siSplunk), icon(siSnyk), icon(siSonarqubeserver, 'SonarQube'), icon(siCheckmarx)],
  },
  {
    key: 'tools',
    items: [icon(siJira), icon(siConfluence), icon(siPostman), icon(siIntellijidea, 'IntelliJ IDEA'), icon(siGithubcopilot, 'Copilot'), icon(siClaude, 'Claude Code')],
  },
];

// Near-black brand colors would vanish on the dark theme, so they follow the text color instead.
const brandColor = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.25 ? 'var(--font-color)' : `#${hex}`;
};

interface TechnologiesProps {
  groupLabels: Dictionary['aboutMe']['technologyGroups']
}

export default function Technologies({ groupLabels }: TechnologiesProps) {
  return (
    <div className={styles.techStackContainer}>
      {techGroups.map(({ key, items }) => (
        <section key={key} className={styles.techGroup}>
          <h4 className={styles.techGroupTitle}>{groupLabels[key]}</h4>
          <ul className={styles.techGrid}>
            {items.map((tech) => (
              <li
                key={tech.name}
                className={styles.techItem}
                style={{ '--brand-color': brandColor(tech.hex) } as CSSProperties}
              >
                <svg className={styles.techIcon} viewBox={tech.viewBox ?? "0 0 24 24"} role="img" aria-hidden="true">
                  <path d={tech.path} fillRule={tech.evenOdd ? 'evenodd' : undefined} />
                </svg>
                <span className={styles.techName}>{tech.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
