import { memo } from 'react';

import { useAppSelector } from '../../store/hooks';

import Modal from '../modal/Modal';

import styles from './modals.style.module.css';
import { TypingResult } from '../../types';

interface IProps {
  isOpen: boolean;
  onClose: (type: string) => void;
}

const ModalsOg = (props: IProps) => {
  const typingResults = useAppSelector(state => state.typingResults.typingResults)

  const results = [...typingResults];
  // @ts-expect-error the results are sorted as per dates in descending order.
  results.sort((a: TypingResult, b: TypingResult) => new Date(b.id) - new Date(a.id))

  return (
      <Modal
        isOpen={props.isOpen}
        onClose={() => props.onClose('leaderBoard')}
      >
        <div className={styles.container}>
          <div className={styles.modalHeader}>
            <h3>Leader Board</h3>
            <button onClick={() => props.onClose('leaderBoard')}>
              &#10005;
            </button>
          </div>
          {results.length === 0 ? (
            <p style={{textAlign: 'center'}}>No previous typing results found.</p>
          ) : (
            <div className={styles.leaderBoardResults}>
              {results.map((result: TypingResult) => (
                <p className={styles.leaderBoardResult} key={result.id}>
                  <span className={styles.leaderBoardResultItem} style={{minWidth: '4.5rem'}}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Type
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.constraintLimit}{' '}
                      {result.constraint === 'time' ? 'Sec' : 'Words'}{' '}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Date
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {new Date(result.id).toDateString()}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Speed (Gross/Net)
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.grossSpeed} / {result.netSpeed}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Accuracy
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.accuracy}
                    </span>
                  </span>
                  <span className={styles.leaderBoardResultItem}>
                    <span className={styles.leaderBoardResultItemTitle}>
                      Mistakes
                    </span>
                    <span className={styles.leaderBoardResultItemResult}>
                      {result.wrongWords}
                    </span>
                  </span>
                </p>
              ))}
            </div>
          )}
        </div>
      </Modal>
  );
};

const LeaderBoardModel = memo(ModalsOg, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen
  );
});

export default LeaderBoardModel;
