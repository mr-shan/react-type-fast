/* eslint-disable no-case-declarations */
import React from 'react';
import { flushSync } from 'react-dom';

import styles from './style.module.css';

import Word from './word';
import { TypingWord, timeConstraint } from '../../types';

const KeysToAvoid = [
  'Tab',
  'Enter',
  'Meta',
  'Control',
  'Alt',
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
  'Shift',
];

interface IProps {
  gameOver: (wordList: TypingWord[]) => void;
  words: string[];
  timeConstraint: timeConstraint;
  constraintLimit: number;
}

const TypingArea = (props: IProps) => {
  const [wordList, setWordList] = React.useState<Array<TypingWord>>([]);
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const [totalCharTyped, setTotalCharTyped] = React.useState(0);
  const [grossSpeed, setGrossSpeed] = React.useState<number>(0);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [intervalRef, setIntervalRef] = React.useState<number>(0);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [limitLeft, setLimitLeft] = React.useState<number>(0);
  const [timer, setTimer] = React.useState(0);
  const typingAreaRef = React.useRef<HTMLDivElement>(null);
  const typingInputRef = React.useRef<HTMLInputElement>(null);

  const handleGameOver = (interval: number = 0) => {
    if (isGameOver) return;
    clearInterval(interval);
    props.gameOver(wordList);
    resetAll();
    setIsGameOver(true);
  };

  const setWordScore = (wordInProcess: TypingWord) => {
    let incorrectChars = 0;
    for (let i = 0; i < wordInProcess.typed.length; i++) {
      if (wordInProcess.original[i] !== wordInProcess.typed[i])
        incorrectChars++;
    }
    wordInProcess.wrongChars = incorrectChars;
  };

  const keyPressHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    if (KeysToAvoid.includes(event.key) || isGameOver) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (currentCharIndex === 0 && event.key === ' ') return;

    if (
      currentCharIndex === 0 &&
      currentWordIndex === 0 &&
      startTime === 0 &&
      !isGameOver
    ) {
      setStartTime(Date.now());
      if (props.timeConstraint === 'time') {
        flushSync(() => setLimitLeft(props.constraintLimit));
        const interval = setInterval(() => {
          setLimitLeft((oldLimit) => {
            return oldLimit - 1;
          });
        }, 1000);
        // @ts-expect-error the interval is added on window object. Later should be moved to context API
        window.typeTestIntervalRef = interval;
        flushSync(() =>
          setIntervalRef((oldVal) => {
            clearInterval(oldVal);
            return interval;
          })
        );
      } else {
        flushSync(() => setTimer(0));
        const interval = setInterval(() => {
          setTimer((oldTime) => oldTime + 1);
        }, 1000);
        flushSync(() =>
          setIntervalRef((oldVal) => {
            clearInterval(oldVal);
            return interval;
          })
        );
        // @ts-expect-error the interval is added on window object. Later should be moved to context API
        window.typeTestIntervalRef = interval;
      }
    }

    const key = event.key;
    switch (key) {
      // space key press handler
      case ' ':
        event.preventDefault();
        flushSync(() => {
          // handle the condition where a word is not completely typed but space
          // is pressed resulting skipping few character in current word
          // and jumping over to next word.
          if (isNaN(wordList[currentWordIndex].startTime))
            wordList[currentWordIndex].startTime = Date.now();
          wordList[currentWordIndex].endTime = Date.now();
          const curLen = wordList[currentWordIndex].typed.length;
          const ogLen = wordList[currentWordIndex].original.length;
          if (curLen < ogLen) {
            const wordsCopy = [...wordList];
            const charsToAdd = ogLen - curLen;
            for (let i = 0; i < charsToAdd; i++)
              wordsCopy[currentWordIndex].typed += '|';
            setWordScore(wordsCopy[currentWordIndex]);
            setWordList(wordsCopy);
          }
          setCurrentCharIndex(0);
          setCurrentWordIndex((oldIndex) => oldIndex + 1);
        });
        if (props.timeConstraint === 'words')
          setLimitLeft(() => {
            return wordList.length - 1 - currentWordIndex;
          });
        break;
      // backspace key press handler
      case 'Backspace':
        if (currentCharIndex === 0) {
          if (currentWordIndex === 0) return;
          flushSync(() => {
            const lastWord = wordList[currentWordIndex - 1];
            setCurrentCharIndex(lastWord.typed.length);
            setCurrentWordIndex((oldIndex) => oldIndex - 1);
          });
        } else {
          flushSync(() => {
            const wordsCopy = [...wordList];
            wordsCopy[currentWordIndex].typed = wordsCopy[
              currentWordIndex
            ].typed.substring(0, wordsCopy[currentWordIndex].typed.length - 1);
            setWordList(wordsCopy);
            setCurrentCharIndex((oldIndex) => oldIndex - 1);
            setTotalCharTyped((oldChars) => oldChars - 1);
          });
          setTimeout(() => {
            if (props.timeConstraint === 'words')
              setLimitLeft(() => {
                return wordList.length - currentWordIndex;
              });
          }, 10);
        }
        break;
      default:
        flushSync(() => {
          const wordsCopy = [...wordList];
          const currentTime = Date.now();
          if (currentCharIndex === 0) {
            wordsCopy[currentWordIndex].startTime = currentTime;
          }
          wordsCopy[currentWordIndex].endTime = currentTime;
          wordsCopy[currentWordIndex].typed += key;
          setWordScore(wordsCopy[currentWordIndex]);
          setWordList(wordsCopy);
          setCurrentCharIndex((oldIndex) => oldIndex + 1);
          setTotalCharTyped((oldChars) => oldChars + 1);
        });
        break;
    }
    if (currentWordIndex === wordList.length - 1) {
      const lastWord = wordList[wordList.length - 1];
      if (lastWord.typed === lastWord.original) handleGameOver();
    }
  };

  const calculateSpeed = () => {
    if (totalCharTyped < 2) return;

    const gross = totalCharTyped / 5 / ((Date.now() - startTime) / 1000 / 60);
    setGrossSpeed(Math.round(gross));
  };

  const resetAll = () => {
    clearInterval(intervalRef);
    setWordList([]);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTotalCharTyped(0);
    setGrossSpeed(0);
    setStartTime(0);
    setIntervalRef((oldVal) => {
      clearInterval(oldVal);
      return 0;
    });
    setLimitLeft(0);
  };

  React.useEffect(() => {
    if (!isGameOver && startTime) {
      calculateSpeed();
      if (limitLeft === 0) {
        handleGameOver();
      }
    }
  }, [limitLeft, timer]);

  React.useEffect(() => {
    resetAll();
    const wd: TypingWord[] = props.words.map((word: string, index: number) => {
      return {
        index: index + word,
        original: word,
        typed: '',
        wrongChars: 0,
        startTime: NaN,
        endTime: NaN,
      };
    });
    setWordList(wd);
    setLimitLeft(props.constraintLimit);
    typingInputRef.current?.focus();
  }, [props.words]);

  return (
    <div
      ref={typingAreaRef}
      className={styles.container}
      tabIndex={0}
      onKeyDown={keyPressHandler}
      onFocus={() => typingInputRef.current?.focus()}
    >
      <input
        id='type-fast-typing-area-input-ref'
        ref={typingInputRef}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        className={styles['type-fast-typing-area-input-ref']}
      />
      <div className={styles.typingStatsWrapper}>
        <span>{limitLeft}</span>
        <span>{grossSpeed}</span>
      </div>
      <div className={styles.words}>
        {wordList.map((tw: TypingWord, index: number) => (
          <Word
            key={tw.index}
            typingWord={tw}
            isActive={currentWordIndex === index}
            currentWordIndex={currentWordIndex}
            currentCharIndex={currentCharIndex}
          ></Word>
        ))}
      </div>
    </div>
  );
};

export default TypingArea;
