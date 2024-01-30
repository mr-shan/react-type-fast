import { TypingWord } from '../../types';
import styles from './style.module.css';

interface IProps {
  wordsList: TypingWord[];
  grossSpeed: number;
  netSpeed: number;
  wrongWords: number;
  accuracy: number;
  maxSpeed: number;
  constraintLimit: number;
}

const TypingResult = (props: IProps) => {
  const yAxis = [
    0,
    Math.floor(props.maxSpeed / 4),
    Math.floor(props.maxSpeed / 2),
    props.maxSpeed,
  ];
  const xAxis = [];
  for (let i = 0; i < props.constraintLimit; i++) {
    xAxis.push(i + 1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <div className={styles.chart}>
          <span className={styles.xAxisItem} style={{ left: 0 }}>
            0
          </span>
          {xAxis.map((item) => (
            <span
              key={item}
              className={styles.xAxisItem}
              style={{ left: `${(item / xAxis.length) * 100}%` }}
            >
              {item}
            </span>
          ))}
          {yAxis.map((item, index) => (
            <span
              key={item}
              className={styles.yAxisItem}
              style={{ bottom: `${(index / (yAxis.length - 1)) * 100}%` }}
            >
              {item}
            </span>
          ))}
          {props.wordsList?.map((item: TypingWord, index: number) => (
            <span
              key={item.index}
              className={styles.chartItem}
              style={{
                left: `${((index + 1) / props.wordsList?.length) * 100}%`,
                // @ts-expect-error Typing speed can not be undefined.
                bottom: `${(item.speed / props.maxSpeed) * 100}%`,
                background: item.wrongChars ? 'var(--error)' : ''
              }}
            >
            </span>
          ))}
        </div>
      </div>
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

export default TypingResult;
