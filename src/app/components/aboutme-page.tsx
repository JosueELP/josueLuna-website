import styles from "../css/page.module.css";
import Timeline from './dynamic-timeline'
import Tecnologies from './technologies-stack'

const classNames = require('classnames');

interface AboutMeProps {
  dictionary: { [key: string]: string }
}

export default function AboutMe({ dictionary } : AboutMeProps) {
  return (
    <div className={classNames(styles.main, styles.fontAiWritter, styles.aboutMeContainer, styles.paddingTop, styles.height)} id="aboutMe">
      <div className={classNames(styles.bioContainer, styles.spaceDown)}>
        <div className={classNames(styles.photo)}>
          <div className={styles.eclipse}></div>
          <div>
            <h3 className={classNames(styles.spaceDown)}>{dictionary.aboutMePageQuestion}</h3>
            <p className={classNames(styles.smaller)}>
              {dictionary.aboutMePageDescriptionP1} <span className={styles.italic}>{dictionary.aboutMePageDescriptionP2}</span> <br/>
              {dictionary.aboutMePageDescriptionP3}<br/>
              {dictionary.aboutMePageDescriptionP4}<br/>
              {dictionary.aboutMePageDescriptionP5}
            </p>
          </div>
        </div>
        <div className={classNames(styles.biography)}>
          <p className={classNames(styles.smaller, styles.spaceDown)}>
            {dictionary.aboutMePageBiographyP1}<br/>
            {dictionary.aboutMePageBiographyP2}<br/>
            {dictionary.aboutMePageBiographyP3}
          </p>
          <p className={classNames(styles.smaller)}>
            {dictionary.aboutMePageBiographyP4}<br/>
            {dictionary.aboutMePageBiographyP5}<br/>
            {dictionary.aboutMePageBiographyP6}<br/>
            {dictionary.aboutMePageBiographyP7}<br/>
            {dictionary.aboutMePageBiographyP8}<br/>
          </p>
        </div>
      </div>
      <div className={classNames(styles.aboutMeExtraContent)}>
        <div className={styles.aboutMeExtraContentContainer}>
          <h3>{dictionary.aboutMePageTecnologies}</h3>
          <Tecnologies dictionary={dictionary}/>
        </div>
        <div className={styles.aboutMeExtraContentContainer}> 
          <h3>{dictionary.aboutMePageTimeline}</h3>
          <Timeline dictionary={dictionary}/>
        </div>
      </div>
    </div>
  );
}
