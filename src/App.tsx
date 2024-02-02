import React from 'react';

import Header from './components/header/header';
import Menu from './components/menu/menu';
import TypingArea from './components/typingArea';
import RefreshIcon from './components/icons/refreshIcon';
import TypingResult from './components/typingResult';

import { useAppSelector, useAppDispatch } from './store/hooks';
import { addResult, initializeState } from './store/features/typingResultsReducer';

import './assets/colors.css';
import './App.css';

import { TypingWord } from './types';
import { COMMON_WORDS, RANDOM_WORDS } from './types/constants';
import { getTypingSpeed } from './helper/helper';

function App() {
  const dispatch = useAppDispatch();
  const constraint = useAppSelector((state) => state.appSetting.constraint);
  const constraintLimit = useAppSelector(
    (state) => state.appSetting.constraintLimit
  );
  const difficulty = useAppSelector(state => state.appSetting.difficulty)

  const [isGameOver, setIsGameOver] = React.useState(false);
  const [generatedWords, setGeneratedWords] = React.useState<Array<string>>([]);
  const [wrongWords, setWrongWords] = React.useState(0);
  const [grossSpeed, setGrossSpeed] = React.useState(0);
  const [netSpeed, setNetSpeed] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(0);
  const [typedWords, setTypedWords] = React.useState<Array<TypingWord>>([]);
  const [gameId, setGameId] = React.useState<string>(Date.now().toString());
  const [maxSpeed, setMaxSpeed] = React.useState(0);

  const onGameOver = (wordList: TypingWord[]) => {
    if (isGameOver) return;
    const totalTypedWordList: TypingWord[] = [];
    let wrongWords = 0,
      grossSpeed = 0,
      totalTypedWords = 0,
      maxSpeedWord = 0,
      totalTypedChars = 0;
    wordList.forEach((word: TypingWord) => {
      if (isNaN(word.startTime) || isNaN(word.endTime)) return;
      totalTypedWords++;
      totalTypedChars += word.typed.length;
      if (word.endTime === word.startTime) {
        // this is the condition when a word is skipped.
        word.speed = 0;
      } else {
        word.speed = getTypingSpeed(
          word.startTime,
          word.endTime,
          word.original.length,
          word.wrongChars
        );
      }
      if (word.speed > maxSpeedWord) maxSpeedWord = word.speed;
      if (word.wrongChars > 0) wrongWords++;
      grossSpeed += word.speed;
      totalTypedWordList.push(word);
    });
    if (constraint === 'time')
      grossSpeed = Math.round(totalTypedChars / 5 / (constraintLimit / 60));
    else grossSpeed = Math.round(grossSpeed / totalTypedWords);
    const netWpm = Math.round(grossSpeed - wrongWords);
    const acc = Math.round((netWpm / grossSpeed) * 100);
    setGrossSpeed(grossSpeed);
    setNetSpeed(netWpm);
    setAccuracy(acc);
    setWrongWords(wrongWords);
    setIsGameOver(true);
    setTypedWords(totalTypedWordList);
    setMaxSpeed(Math.round(maxSpeedWord));
    dispatch(
      addResult({
        id: new Date().toISOString(),
        constraint: constraint,
        constraintLimit: constraintLimit,
        accuracy: acc,
        grossSpeed: grossSpeed,
        netSpeed: netWpm,
        wrongWords: wrongWords,
      })
    );
  };

  const generateRandomWords = (numberOfWordsNeeded: number) => {
    setGameId(Date.now().toString());
    const wordsGenerated: string[] = [];
    let wordsCounter = numberOfWordsNeeded;
    const wordsToUse = difficulty === 'easy' ? COMMON_WORDS : RANDOM_WORDS
    while (wordsCounter > 0) {
      const randomIndex = Math.floor(Math.random() * 1000);
      const randomWord = wordsToUse[randomIndex];
      // if (randomWord && !wordsGenerated.includes(randomWord)) {
      if (randomWord) {
        wordsGenerated.push(randomWord);
        wordsCounter--;
      }
    }
    setGeneratedWords(wordsGenerated);
    resetAll();
  };

  const resetAll = () => {
    setIsGameOver(false);
    setWrongWords(0);
    setGrossSpeed(0);
    setNetSpeed(0);
    setAccuracy(0);
    setTypedWords([]);
    setMaxSpeed(0);
    // @ts-expect-error the interval is added on window object. Later should be moved to context API
    for (let i = 0; i <= window.typeTestIntervalRef; i++) {
      clearInterval(i);
    }
  };

  const refreshWordsHandler = () => {
    const numberOfWordsNeeded =
      constraint === 'time' ? constraintLimit * 6 : constraintLimit;
    generateRandomWords(numberOfWordsNeeded);
    setIsGameOver(false);
  };

  React.useEffect(() => {
    const numberOfWordsNeeded =
      constraint === 'time' ? constraintLimit * 6 : constraintLimit;
    generateRandomWords(numberOfWordsNeeded);
    setIsGameOver(false);
  }, [constraint, constraintLimit]);

  React.useEffect(() => {
    dispatch(initializeState());
  }, [])

  return (
    <>
      <Header />
      <Menu />
      {isGameOver ? (
        <TypingResult
          accuracy={accuracy}
          grossSpeed={grossSpeed}
          netSpeed={netSpeed}
          wrongWords={wrongWords}
          wordsList={typedWords}
          maxSpeed={maxSpeed}
          constraintLimit={constraintLimit}
        />
      ) : (
        <TypingArea
          key={gameId}
          words={generatedWords}
          gameOver={onGameOver}
          timeConstraint={constraint}
          constraintLimit={constraintLimit}
        />
      )}
      <div className='refreshWrapper'>
        <button onClick={refreshWordsHandler} name='Refresh' title='Refresh'>
          <RefreshIcon width={36} height={36} />
        </button>
      </div>
    </>
  );
}

export default App;
