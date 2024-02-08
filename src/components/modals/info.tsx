import { memo } from 'react';

import Modal from '../modal/Modal';
import styles from './modals.style.module.css';

interface IProps {
  isOpen: boolean;
  onClose: (type: string) => void;
}

const ModalsOg = (props: IProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose('info')}>
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
          At the end of test, you will see your result along with a graph which
          shows your typing timeline.
        </p>
      </div>
    </Modal>
  );
};

const InfoModel = memo(ModalsOg, (prevProps, nextProps) => {
  return prevProps.isOpen === nextProps.isOpen;
});

export default InfoModel;
