import React from 'react';

import styles from './header.style.module.css';
import globalStyles from './../../assets/globalStyles.module.css';

import InfoIcon from '../icons/infoIcon';
import LeaderBoardIcon from '../icons/leaderboardIcon';
import SettingIcon from '../icons/settingIcon';

import { useAppDispatch } from '../../store/hooks';
import { setModalVisibility } from '../../store/features/appSettingReducer';

const HeaderOg = () => {
  const dispatch = useAppDispatch();
  const showModal = (event: string) => {
    dispatch(setModalVisibility({ key: event, value: true }))
  }

  const btnDims = { width: 28, height: 28 };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.logo}>TypeFast.com</h1>
        </div>
        <ul className={styles.navButtonsList}>
          <li className={styles.listElement}>
            <button
              name='Leader Board'
              title='Leader Board'
              className={[styles.navBtn, globalStyles.btn].join(' ')}
              onClick={() => showModal('leaderBoard')}
            >
              <LeaderBoardIcon width={btnDims.width} height={btnDims.height} />
            </button>
          </li>
          <li className={styles.listElement}>
            <button
              name='About this app'
              title='About this app'
              className={[styles.navBtn, globalStyles.btn].join(' ')}
              onClick={() => showModal('info')}
            >
              <InfoIcon width={btnDims.width} height={btnDims.height} />
            </button>
          </li>
          <li className={styles.listElement}>
            <button
              name='Settings'
              title='Settings'
              className={[styles.navBtn, globalStyles.btn].join(' ')}
              onClick={() => showModal('settings')}
            >
              <SettingIcon width={btnDims.width} height={btnDims.height} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Header = React.memo(HeaderOg, () => true)

export default Header;
