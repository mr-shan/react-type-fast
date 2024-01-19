import globalStyles from './../../assets/globalStyles.module.css';
import styles from './menu.style.module.css';

import TimeIcon from '../icons/timeIcon';
import WordsIcon from '../icons/wordsIcon';

import { timeConstraint } from '../../types';

import { TIME_OPTIONS, WORDS_OPTIONS } from '../../types/constants';

interface IProps {
  timeConstraint: timeConstraint;
  constraintLimit: number;
  changeTimeConstraint: any;
  changeLimit: any
}

const Menu = (props: IProps) => {
  const options = props.timeConstraint === 'words' ? WORDS_OPTIONS : TIME_OPTIONS;

  const timeConstraintChangeHandler = (event: timeConstraint) => {
    if (event === props.timeConstraint) return;
    props.changeTimeConstraint(event)
  }
  const constraintLimitChangeHandler = (event: number) => {
    if (event === props.constraintLimit) return;
    props.changeLimit(event)
  }

  return (
    <div className={styles.container}>
      <button
        className={[
          props.timeConstraint === 'time' ? styles.selected : '',
          styles.menuButton,
          globalStyles.btn,
        ].join(' ')}
        onClick={() => timeConstraintChangeHandler('time')}
      >
        <TimeIcon />
        <span>Time</span>
      </button>

      <button
        className={[
          props.timeConstraint === 'words' ? styles.selected : '',
          styles.menuButton,
          globalStyles.btn,
        ].join(' ')}
        onClick={() => timeConstraintChangeHandler('words')}
      >
        <WordsIcon />
        <span>Words</span>
      </button>

      <div className={styles.separator}></div>

      {/* list of available options for selected menu */}
      {options.map((option: number) => (
        <button
          className={[
            props.constraintLimit === option ? styles.selected : '',
            styles.menuButton,
            globalStyles.btn,
          ].join(' ')}
          key={option}
          onClick={() => constraintLimitChangeHandler(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Menu;
