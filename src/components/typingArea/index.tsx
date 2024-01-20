/* eslint-disable no-case-declarations */
import React from 'react';
import { flushSync } from 'react-dom';

import styles from './style.module.css';

import Word from './word';
import { TypingWord } from '../../types';

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
  gameOver: any;
  words: string[];
}

const TypingArea = (props: IProps) => {
  const [wordList, setWordList] = React.useState<Array<TypingWord>>([]);
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const typingAreaRef = React.useRef<HTMLDivElement>(null)

  const handleGameOver = () => {
    props.gameOver(wordList);
  };

  const setWordScore = (wordInProcess: TypingWord) => {
    let incorrectChars = 0;
    for (let i = 0; i < wordInProcess.typed.length; i++) {
      if (wordInProcess.original[i] !== wordInProcess.typed[i])
        incorrectChars++;
    }
    wordInProcess.wrongChars = incorrectChars;
  };

  const keyPressHandler = (event: any) => {
    if (KeysToAvoid.includes(event.key)) return;

    const key = event.key;
    switch (key) {
      // space key press handler
      case ' ':
        event.preventDefault();
        if (currentWordIndex === wordList.length - 1) {
          handleGameOver();
          return;
        }
        flushSync(() => {
          // handle the condition where a word is not completely typed but space
          // is pressed resulting skipping few character in current word
          // and jumping over to next word.
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
          });
        }
        break;
      default:
        flushSync(() => {
          const wordsCopy = [...wordList];
          wordsCopy[currentWordIndex].typed += key;
          setWordScore(wordsCopy[currentWordIndex]);
          setWordList(wordsCopy);
          setCurrentCharIndex((oldIndex) => oldIndex + 1);
        });
        if (currentWordIndex === wordList.length - 1) {
          const lastWord = wordList[wordList.length - 1];
          if (lastWord.typed === lastWord.original) handleGameOver();
        }
        break;
    }
  };

  React.useEffect(() => {
    const wd: TypingWord[] = props.words.map((word: string, index: number) => {
      return {
        index: index,
        original: word,
        typed: '',
        wrongChars: 0,
      };
    });
    setWordList(wd);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    typingAreaRef.current?.focus()
  }, [props.words]);

  return (
    <div ref={typingAreaRef} className={styles.container} tabIndex={0} onKeyDown={keyPressHandler}>
      <div className={styles.words}>
        {wordList.map((tw: TypingWord) => (
          <Word
            key={tw.original}
            typingWord={tw}
            isActive={currentWordIndex === tw.index}
            currentWordIndex={currentWordIndex}
            currentCharIndex={currentCharIndex}
          ></Word>
        ))}
      </div>
    </div>
  );
};

export default TypingArea;
