import React from 'react';

import { TypingWord } from '../../types';
import styles from './style.module.css';

interface IProps {
  wordsList?: TypingWord[];
  grossSpeed: number;
  netSpeed: number;
  wrongWords: number;
  accuracy: number;
}

const TypingResult = (props: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.chart}></div>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{props.grossSpeed}</div>
          <div className={styles.statsTitle}>Gross Speed</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{props.netSpeed}</div>
          <div className={styles.statsTitle}>Net Speed</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{props.wrongWords}</div>
          <div className={styles.statsTitle}>Wrong Words</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{props.accuracy}%</div>
          <div className={styles.statsTitle}>Accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default TypingResult
