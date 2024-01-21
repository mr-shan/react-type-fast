import { memo } from 'react';
import styles from './style.module.css';

const TypingIndicatorOg = () => {
  return (
    <span className={styles.typingIndicator}></span>
  )
}

const TypingIndicator = memo(TypingIndicatorOg, () => true)

export default TypingIndicator