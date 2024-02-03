/* eslint-disable no-case-declarations */
import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import styles from './style.module.css';
import Word from './word';
import { TypingWord, timeConstraint } from '../../types';
import { KEYS_TO_AVOID } from '../../types/constants';
import {
  startTest,
  endTest,
  setCurrentCharIndex,
  setCurrentWordIndex,
  reset
} from '../../store/features/typingProgressReducer';

import useTimer from '../hooks/useTimer';

interface IProps {
  gameOver: (wordList: TypingWord[], startTime: number, endTime: number) => void;
  words: string[];
  timeConstraint: timeConstraint;
  constraintLimit: number;
}

const TypingArea = (props: IProps) => {
  const dispatch = useAppDispatch();
  const currentWordIndex = useAppSelector(
    (state) => state.typingProgress.currentWordIndex
  );
  const currentCharIndex = useAppSelector(
    (state) => state.typingProgress.currentCharIndex
  );
  const gameStatus = useAppSelector((state) => state.typingProgress.testStatus);
  const startTime = useAppSelector((state) => state.typingProgress.startTime);
  const endTime = useAppSelector((state) => state.typingProgress.endTime);

  const [timerValue, startTimer, endTimer] = useTimer();
  const [inputVal] = useState('');

  const [wordList, setWordList] = React.useState<Array<TypingWord>>([]);
  const [totalCharTyped, setTotalCharTyped] = React.useState(0);
  const [grossSpeed, setGrossSpeed] = React.useState<number>(0);
  const [limitLeft, setLimitLeft] = React.useState<number>(0);
  const typingAreaRef = React.useRef<HTMLDivElement>(null);
  const typingInputRef = React.useRef<HTMLInputElement>(null);

  const handleGameOver = () => {
    if (gameStatus === 'over') return;
    dispatch(endTest());
    props.gameOver(wordList, startTime, endTime);
    resetAll();
    endTimer();
  };

  const setWordScore = (wordInProcess: TypingWord) => {
    let incorrectChars = 0;
    for (let i = 0; i < wordInProcess.typed.length; i++) {
      if (wordInProcess.original[i] !== wordInProcess.typed[i])
        incorrectChars++;
    }
    wordInProcess.wrongChars = incorrectChars;
  };

  const inputHandler = (input: string) => {
    if (currentCharIndex === 0 && input === ' ') return;

    if (currentCharIndex === 0 && currentWordIndex === 0 && startTime === 0) {
      dispatch(startTest());
      startTimer();
    }

    switch (input) {
      case ' ':
        dispatch(setCurrentCharIndex(0));
        dispatch(setCurrentWordIndex(currentWordIndex + 1));
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

        if (props.timeConstraint === 'words') {
          if (limitLeft === 1) {
            handleGameOver();
          } else {
            setLimitLeft(wordList.length - currentWordIndex - 1);
          }
        }
        break;
      case 'Backspace':
        if (currentCharIndex === 0) {
          if (currentWordIndex === 0) return;
          const lastWord = wordList[currentWordIndex - 1];
          dispatch(setCurrentCharIndex(lastWord.typed.length));
          dispatch(setCurrentWordIndex(currentWordIndex - 1));
          if (props.timeConstraint === 'words') {
            setLimitLeft(wordList.length - currentWordIndex);
          }
        } else {
          const wordsCopy = [...wordList];
          wordsCopy[currentWordIndex].typed = wordsCopy[
            currentWordIndex
          ].typed.substring(0, wordsCopy[currentWordIndex].typed.length - 1);
          setWordList(wordsCopy);
          setTotalCharTyped((oldChars) => oldChars - 1);
          dispatch(setCurrentCharIndex(currentCharIndex - 1));
        }
        break;
      default:
        const wordsCopy = [...wordList];
        const currentTime = Date.now();
        if (currentCharIndex === 0) {
          wordsCopy[currentWordIndex].startTime = currentTime;
        }
        wordsCopy[currentWordIndex].endTime = currentTime;
        wordsCopy[currentWordIndex].typed += input;
        setWordScore(wordsCopy[currentWordIndex]);
        setWordList(wordsCopy);
        setTotalCharTyped((oldChars) => oldChars + 1);
        dispatch(setCurrentCharIndex(currentCharIndex + 1));
        break;
    }
    if (currentWordIndex === wordList.length - 1) {
      const lastWord = wordList[wordList.length - 1];
      if (lastWord.typed === lastWord.original) handleGameOver();
    }
  }

  const keyPressHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Unidentified') return
    if (KEYS_TO_AVOID.includes(event.key)) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    event.preventDefault();
    inputHandler(event.key)
  };

  const calculateSpeed = () => {
    if (totalCharTyped < 2) return;
    const gross = totalCharTyped / 5 / ((Date.now() - startTime) / 1000 / 60);
    setGrossSpeed(Math.round(gross));
  };

  const resetAll = () => {
    setWordList([]);
    dispatch(setCurrentWordIndex(0));
    dispatch(setCurrentCharIndex(0));
    dispatch(reset())
    setTotalCharTyped(0);
    setGrossSpeed(0);
    setLimitLeft(0);
  };

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

  React.useEffect(() => {
    if (gameStatus === 'running' && timerValue) {
      calculateSpeed();
      if (props.timeConstraint === 'time') {
        const remainingTime = props.constraintLimit - timerValue;
        setLimitLeft(remainingTime);
        if (remainingTime <= 0) {
          handleGameOver();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, timerValue]);

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
        value={inputVal}
        onChange={(event) => inputHandler(event.target.value)}
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
