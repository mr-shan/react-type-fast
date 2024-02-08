import { memo, useEffect, ChangeEvent } from 'react';

import { setTheme, setDifficulty } from '../../store/features/appSettingReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import Modal from '../modal/Modal';

import styles from './modals.style.module.css';
import { difficulty } from '../../types';

interface IProps {
  isOpen: boolean;
  onClose: (type: string) => void;
}

const SettingsOg = (props: IProps) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.appSetting.theme);
  const difficulty = useAppSelector(state => state.appSetting.difficulty)

  const themeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const changedValue = event.target.value;
    localStorage.setItem('theme', changedValue);
    document.documentElement.setAttribute('data-theme', changedValue);
    dispatch(setTheme(changedValue));
  };

  const difficultyChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const changedValue = event.target.value as difficulty;
    dispatch(setDifficulty(changedValue))
  };

  useEffect(() => {
    const themeValue = document.documentElement.getAttribute('data-theme');
    dispatch(setTheme(themeValue || 'dark'));
  }, []);

  return (          
      <Modal isOpen={props.isOpen} onClose={() => props.onClose('settings')}>
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
  );
};

const SettingsModal = memo(SettingsOg, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen
  );
});

export default SettingsModal;
