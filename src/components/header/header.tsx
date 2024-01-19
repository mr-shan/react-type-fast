import styles from './header.style.module.css';
import globalStyles from './../../assets/globalStyles.module.css';

import InfoIcon from '../icons/infoIcon';
import LeaderBoardIcon from '../icons/leaderboardIcon';
import SettingIcon from '../icons/settingIcon';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.logo}>TypeFast.com</h1>
        </div>
        <ul className={styles.navButtonsList}>
          <li className={styles.listElement}>
            <button className={[styles.navBtn, globalStyles.btn].join(' ')}>
              <LeaderBoardIcon />
            </button>
          </li>
          <li className={styles.listElement}>
            <button className={[styles.navBtn, globalStyles.btn].join(' ')}>
              <InfoIcon />
            </button>
          </li>
          <li className={styles.listElement}>
            <button className={[styles.navBtn, globalStyles.btn].join(' ')}>
              <SettingIcon />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
