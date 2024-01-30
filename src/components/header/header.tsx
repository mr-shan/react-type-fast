import React from 'react';

import styles from './header.style.module.css';
import globalStyles from './../../assets/globalStyles.module.css';

import InfoIcon from '../icons/infoIcon';
import LeaderBoardIcon from '../icons/leaderboardIcon';
import SettingIcon from '../icons/settingIcon';

import Modals from './modals';

const HeaderOg = () => {
  const [infoVisible, setInfoVisible] = React.useState(false);
  const [settingsVisible, setSettingsVisible] = React.useState(false);
  const [leaderBoardVisible, setLeaderBoardVisible] = React.useState(false);

  const onCloseModalsHandler = (type: string) => {
    switch (type) {
      case 'info':
        setInfoVisible(false);
        break;
      case 'settings':
        setSettingsVisible(false);
        break;
      case 'leaderBoard':
        setLeaderBoardVisible(false);
        break;
      default:
        setInfoVisible(false);
        setSettingsVisible(false);
        setLeaderBoardVisible(false);
    }
  };

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
              onClick={() => setLeaderBoardVisible(true)}
            >
              <LeaderBoardIcon width={btnDims.width} height={btnDims.height} />
            </button>
          </li>
          <li className={styles.listElement}>
            <button
              name='About this app'
              title='About this app'
              className={[styles.navBtn, globalStyles.btn].join(' ')}
              onClick={() => setInfoVisible(true)}
            >
              <InfoIcon width={btnDims.width} height={btnDims.height} />
            </button>
          </li>
          <li className={styles.listElement}>
            <button
              name='Settings'
              title='Settings'
              className={[styles.navBtn, globalStyles.btn].join(' ')}
              onClick={() => setSettingsVisible(true)}
            >
              <SettingIcon width={btnDims.width} height={btnDims.height} />
            </button>
          </li>
        </ul>
      </nav>
      <Modals
        infoModal={infoVisible}
        leaderBoard={leaderBoardVisible}
        settings={settingsVisible}
        onClose={onCloseModalsHandler}
      />
    </header>
  );
};

const Header = React.memo(HeaderOg, () => true)

export default Header;
