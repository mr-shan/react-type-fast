import styles from './style.module.css';
import { ReactNode } from 'react';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = (props: IProps) => {
  if (!props.isOpen) return <></>;

  return (
    <>
      <div className={styles.backdrop} onClick={props.onClose}></div>
      <div className={styles.body}> {props.children} </div>
    </>
  );
};

export default Modal;
