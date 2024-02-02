import globalStyles from './../../assets/globalStyles.module.css';
import styles from './menu.style.module.css';

import TimeIcon from '../icons/timeIcon';
import WordsIcon from '../icons/wordsIcon';

import { timeConstraint } from '../../types';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setConstraint, setConstraintLimit } from '../../store/features/appSettingReducer';

import { TIME_OPTIONS, WORDS_OPTIONS } from '../../types/constants';

const Menu = () => {
  const dispatch = useAppDispatch()
  const constraint = useAppSelector(state => state.appSetting.constraint)
  const constraintLimit = useAppSelector(state => state.appSetting.constraintLimit)
  const options = constraint === 'words' ? WORDS_OPTIONS : TIME_OPTIONS;

  const timeConstraintChangeHandler = (event: timeConstraint) => {
    if (event === constraint) return;
    dispatch(setConstraint(event))
  }
  const constraintLimitChangeHandler = (event: number) => {
    if (event === constraintLimit) return;
    dispatch(setConstraintLimit(event))
  }

  return (
    <div className={styles.container}>
      <button
        className={[
          constraint === 'time' ? styles.selected : '',
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
          constraint === 'words' ? styles.selected : '',
          styles.menuButton,
          globalStyles.btn,
        ].join(' ')}
        style={{animationDelay: '100ms'}}
        onClick={() => timeConstraintChangeHandler('words')}
      >
        <WordsIcon />
        <span>Words</span>
      </button>

      <div className={styles.separator}></div>

      {/* list of available options for selected menu */}
      {options.map((option: number, index: number) => (
        <button
          className={[
            constraintLimit === option ? styles.selected : '',
            styles.menuButton,
            globalStyles.btn,
          ].join(' ')}
          key={option}
          style={{animationDelay: `${index * 60}ms`}}
          onClick={() => constraintLimitChangeHandler(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Menu;
