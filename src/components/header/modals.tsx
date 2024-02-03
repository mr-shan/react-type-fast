import { memo, useEffect } from 'react';

import { setTheme, setDifficulty } from '../../store/features/appSettingReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import Modal from '../modal/Modal';

import styles from './modals.style.module.css';
import { TypingResult } from '../../types';

interface IProps {
  infoModal: boolean;
  settings: boolean;
  leaderBoard: boolean;
  onClose: (type: string) => void;
}

const ModalsOg = (props: IProps) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.appSetting.theme);
  const difficulty = useAppSelector(state => state.appSetting.difficulty)
  const typingResults = useAppSelector(state => state.typingResults.typingResults)

  const results = [...typingResults];
  results.sort((a: TypingResult, b: TypingResult) => new Date(b.id) - new Date(a.id))

  const themeChangeHandler = (event: any) => {
    const changedValue = event.target.value;
    localStorage.setItem('theme', changedValue);
    document.documentElement.setAttribute('data-theme', changedValue);
    dispatch(setTheme(changedValue));
  };

  const difficultyChangeHandler = (event: any) => {
    const changedValue = event.target.value;
    dispatch(setDifficulty(changedValue))
  };

  useEffect(() => {
    const themeValue = document.documentElement.getAttribute('data-theme');
    dispatch(setTheme(themeValue || 'dark'));
  }, []);

  return (
    <>
      <Modal isOpen={props.infoModal} onClose={() => props.onClose('info')}>
        <div className={styles.container}>
          <div className={styles.modalHeader}>
            <h3>About this app...</h3>
            <button onClick={() => props.onClose('info')}>&#10005;</button>
          </div>
          <p>
            This is the simple typing test application where you can test your
            typing speed in words per minutes along with accuracy of your typing
          </p>
          <p>
            You can choose between time and words as your timing window for your
            typing test. The test will automatically end once you reach out of
            your set limit.
          </p>
          <p>
            At the end of test, you will see your result along with a graph
            which shows your typing timeline.
          </p>
        </div>
      </Modal>
      <Modal isOpen={props.settings} onClose={() => props.onClose('settings')}>
        <div className={styles.container}>
          <div className={styles.modalHeader}>
            <h3>Settings</h3>
            <button onClick={() => props.onClose('settings')}>&#10005;</button>
          </div>
          <div className={styles.settingsContainer}>
            <div className={styles.settingItem}>
              <span>Theme</span>
              <select onChange={themeChangeHandler} value={theme}>
                <option title='dark' value='dark'>
                  Dark
                </option>
                <option title='light' value='light'>
                  Light
                </option>
                <option title='dark-orange' value='dark-orange'>
                  Orange (dark)
                </option>
              </select>
            </div>
            <div className={styles.settingItem}>
              <span>Difficulty Level</span>
              <select onChange={difficultyChangeHandler} value={difficulty}>
                <option title='dark' value='dark'>
                  Easy
                </option>
                <option title='light' value='light'>
                  Difficult
                </option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={props.leaderBoard}
        onClose={() => props.onClose('leaderBoard')}
      >
        <div className={styles.container}>
          <div className={styles.modalHeader}>
            <h3>Leader Board</h3>
            <button onClick={() => props.onClose('leaderBoard')}>
              &#10005;
            </button>
          </div>
          {results.length === 0 ? (
            <p style={{textAlign: 'center'}}>No previous typing results found.</p>
          ) : (
            <div className={styles.leaderBoardResults}>
              {results.map((result: any) => (
                <p className={styles.leaderBoardResult} key={result.id}>
                  <span className={styles.leaderBoardResultItem} style={{minWidth: '4.5rem'}}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Type
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.constraintLimit}{' '}
                      {result.constraint === 'time' ? 'Sec' : 'Words'}{' '}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Date
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {new Date(result.id).toDateString()}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Speed (Gross/Net)
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.grossSpeed} / {result.netSpeed}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Accuracy
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.accuracy}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Mistakes
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.wrongWords}
                    </span>
                  </span>
                </p>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

const Modals = memo(ModalsOg, (prevProps, nextProps) => {
  return (
    prevProps.infoModal === nextProps.infoModal &&
    prevProps.leaderBoard === nextProps.leaderBoard &&
    prevProps.settings === nextProps.settings
  );
});

export default Modals;
