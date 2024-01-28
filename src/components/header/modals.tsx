import Modal from '../modal/Modal';

import styles from './modals.style.module.css'

interface IProps {
  infoModal: boolean
  settings: boolean
  leaderBoard: boolean
  onClose: (type: string) => void
}

const Modals = (props: IProps) => {
  return (
    <>
      <Modal isOpen={props.infoModal} onClose={() => props.onClose('info')}>
        <div className={styles.container}>
          <h3>About this app...</h3>
          <p>This is the simple typing test application where you can test your typing speed in words per minutes along with accuracy of your typing</p>
          <p>You can choose between time and words as your timing window for your typing test. The test will automatically end once you reach out of your set limit.</p>
          <p>At the end of test, you will see your result along with a graph which shows your typing timeline.</p>
        </div>
      </Modal>
      <Modal isOpen={props.settings} onClose={() => props.onClose('settings')}>
        <div className={styles.container}>This is settings</div>
      </Modal>
      <Modal isOpen={props.leaderBoard} onClose={() => props.onClose('leaderBoard')}>
        <div className={styles.container}>This is leader board</div>
      </Modal>
    </>
  )
}

export default Modals