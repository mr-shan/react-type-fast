import { memo, useState, useEffect } from 'react';
import Modal from '../modal/Modal';

import { LOCAL_STORAGE_RESULTS_KEY } from '../../types/constants';

import styles from './modals.style.module.css';

interface IProps {
  infoModal: boolean;
  settings: boolean;
  leaderBoard: boolean;
  onClose: (type: string) => void;
}

const ModalsOg = (props: IProps) => {
  const [theme, setTheme] = useState('dark')
  const oldResultStr = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY);
  let results = [];
  if (oldResultStr) {
    results = JSON.parse(oldResultStr);
  }

  const themeChangeHandler = (event: any) => {
    const theme = event.target.value;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    setTheme(theme)
  }

  useEffect(() => {
    const themeValue = document.documentElement.getAttribute('data-theme')
    setTheme(themeValue || 'dark')
  }, [])

  return (
    <>
      <Modal isOpen={props.infoModal} onClose={() => props.onClose('info')}>
        <div className={styles.container}>
          <h3>About this app...</h3>
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
          <h3>Settings</h3>
          <div className={styles.settingsContainer}>
            <div className={styles.settingItem}>
              <span>Theme</span>
              <select onChange={themeChangeHandler} value={theme}>
                <option title='dark' value='dark'>Dark</option>
                <option title='light' value='light'>Light</option>
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
          <h3>Leader Board</h3>
          {results.length === 0 ? (
            <p>No previous typing results found.</p>
          ) : (
            <div className={styles.leaderBoardResults}>
              {results.map((result: any) => (
                <p className={styles.leaderBoardResult} key={result.id}>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Type
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.constraintLimit}{' '}
                      {result.constraintType === 'time' ? 'Sec' : 'Words'}{' '}
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
                      {result.grossSpeed } / { result.netSpeed}
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
