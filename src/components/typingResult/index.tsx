import { TypingWord } from '../../types';
import styles from './style.module.css';

import { useAppSelector } from '../../store/hooks';

const TypingResult = () => {
  const result = useAppSelector(state => state.typingResults.mostRecentResult);
  if (!result || !result?.maxSpeed) {
    return <div>Please complete typing test to see results.</div>
  }
  const yAxis = [
    0,
    Math.floor(result.maxSpeed / 4),
    Math.floor(result.maxSpeed / 2),
    result.maxSpeed,
  ];
  const xAxis = [];
  for (let i = 0; i < result.constraintLimit; i++) {
    xAxis.push(i + 1);
  }

  const wordListLength = result.typedWords?.length || 0

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
          {result.typedWords?.map((item: TypingWord, index: number) => (
            <span
              key={item.index}
              className={styles.chartItem}
              style={{
                left: `${((index + 1) / wordListLength) * 100}%`,
                // @ts-expect-error Typing speed can not be undefined.
                bottom: `${(item.speed / result.maxSpeed) * 100}%`,
                background: item.wrongChars ? 'var(--error)' : ''
              }}
            >
            </span>
          ))}
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{result.grossSpeed}</div>
          <div className={styles.statsTitle}>Raw Speed</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{result.netSpeed}</div>
          <div className={styles.statsTitle}>Net Speed</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{result.wrongWords}</div>
          <div className={styles.statsTitle}>Mistakes</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statsScore}>{result.accuracy}%</div>
          <div className={styles.statsTitle}>Accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default TypingResult;
