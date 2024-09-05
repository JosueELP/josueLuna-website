import styles from "../page.module.css";

const classNames = require('classnames');

export default function AboutMe() {
  return (
    <div className={classNames(styles.main, styles.fontAiWritter)} id="aboutMe">
      <div className={styles.bioContainer}>
        <div className={classNames(styles.photo)}>
          <div className={styles.eclipse}></div>
          <div>
            <h3 className={classNames(styles.spaceDown)}>Who am I?</h3>
            <p className={classNames(styles.smaller)}>
              I'm a <span className={styles.italic}>Computer Systems Enginner.</span> <br/>
              Always passionated by web development and software development in general.<br/>
              I like videogames, synthwave music & all the computer/techonolgy stuff that <br/>
              most of us in this bussines like :P
            </p>
          </div>
        </div>
        <div className={classNames(styles.biography)}>
          <p className={classNames(styles.smaller, styles.spaceDown)}>
            I currently consider myself to be in a mid level of Software Developer, <br/>
            most focused in backend side, but also worked in frontend tasks. At the end, my main goal is to <br/>
            become a full stack dev!
          </p>
          <p className={classNames(styles.smaller)}>
            If there is something that school teached me well, It's the ability to learn <br/>
            whatever it takes in order to do the best possible job <br/>
            and deliver the best possible code/product. <br/>
            That's why, if I don't know a technology, you can be sure <br/>
            that I can learn it if the job requires it. <br/>
          </p>
        </div>
      </div>
    </div>
  );
}
