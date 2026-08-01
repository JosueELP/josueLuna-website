import styles from "../css/page.module.css";
import Timeline from './dynamic-timeline'
import Tecnologies from './technologies-stack'
import { Dictionary } from '../dictionaries';

const classNames = require('classnames');

interface AboutMeProps {
  dictionary: Dictionary
}

export default function AboutMe({ dictionary } : AboutMeProps) {
  const { aboutMe } = dictionary;

  return (
    <div className={classNames(styles.main, styles.fontAiWritter, styles.aboutMeContainer, styles.paddingTop, styles.height)} id="aboutMe">
      <div className={classNames(styles.bioContainer, styles.spaceDown)}>
        <div className={classNames(styles.photo)}>
          <div className={styles.eclipse}></div>
          <div>
            <h3 className={classNames(styles.spaceDown)}>{aboutMe.question}</h3>
            <p className={classNames(styles.smaller)}>
              {aboutMe.descriptionIntro} <span className={styles.italic}>{aboutMe.descriptionRole}</span><br/>
              {aboutMe.description}
            </p>
          </div>
        </div>
        <div className={classNames(styles.biography)}>
          <p className={classNames(styles.smaller, styles.spaceDown)}>
            {aboutMe.biographyIntro}
          </p>
          <p className={classNames(styles.smaller)}>
            {aboutMe.biographyLearning}
          </p>
        </div>
      </div>
      <div className={classNames(styles.aboutMeExtraContent)}>
        <div className={styles.aboutMeExtraContentContainer}>
          <h3>{aboutMe.technologies}</h3>
          <Tecnologies/>
        </div>
        <div className={styles.aboutMeExtraContentContainer}>
          <h3>{aboutMe.timelineTitle}</h3>
          <Timeline dictionary={dictionary}/>
        </div>
      </div>
    </div>
  );
}
