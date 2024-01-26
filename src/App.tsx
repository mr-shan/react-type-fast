import React from 'react';

import Header from './components/header/header';
import Menu from './components/menu/menu';
import TypingArea from './components/typingArea';
import RefreshIcon from './components/icons/refreshIcon';
import TypingResult from './components/typingResult';

import './assets/colors.css';
import './App.css';

import { timeConstraint, TypingWord } from './types';
import { TIME_OPTIONS, WORDS_OPTIONS, COMMON_WORDS } from './types/constants';

function App() {
  const [timeConstraint, setTimeConstraint] =
    React.useState<timeConstraint>('time');
  const [constraintLimit, setConstraintLimit] = React.useState<number>(
    TIME_OPTIONS[0]
  );
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [generatedWords, setGeneratedWords] = React.useState<Array<string>>([]);
  const [wrongWords, setWrongWords] = React.useState(0);
  const [grossSpeed, setGrossSpeed] = React.useState(0);
  const [netSpeed, setNetSpeed] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(0);
  const [typedWords, setTypedWords] = React.useState<Array<TypingWord>>([]);
  const [gameId, setGameId] = React.useState<string>(Date.now().toString())
  const [maxSpeed, setMaxSpeed] = React.useState(0)

  const timeConstraintChangeHandler = (event: timeConstraint) => {
    setTimeConstraint(event);
    const options = event === 'time' ? TIME_OPTIONS : WORDS_OPTIONS;
    setConstraintLimit(options[0]);
  };

  const onGameOver = (wordList: TypingWord[]) => {
    const totalTypedWordList: TypingWord[]= []
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
        // this is skipped condition.
        word.speed = constraintLimit;
      } else {
        word.speed =
        word.original.length /
        5 /
        ((word.endTime - word.startTime) / 1000 / 60);
      }
      if (word.speed > maxSpeedWord) maxSpeedWord = word.speed
      if (word.wrongChars > 0) wrongWords++;
      grossSpeed += word.speed
      totalTypedWordList.push(word)
    });
    if (timeConstraint === 'time')
      grossSpeed = Math.round(totalTypedChars / 5 / (constraintLimit / 60));
    else 
      grossSpeed = Math.round(grossSpeed / totalTypedWords);
    const netWpm = Math.round(grossSpeed - wrongWords);
    setGrossSpeed(grossSpeed);
    setNetSpeed(netWpm);
    setAccuracy(Math.round((netWpm / grossSpeed) * 100));
    setWrongWords(wrongWords);
    setIsGameOver(true);
    setTypedWords(totalTypedWordList)
    setMaxSpeed(Math.round(maxSpeedWord))
  };

  const generateRandomWords = (numberOfWordsNeeded: number) => {
    setGameId(Date.now().toString())
    const wordsGenerated: string[] = [];
    let wordsCounter = numberOfWordsNeeded;
    while (wordsCounter > 0) {
      const randomIndex = Math.floor(Math.random() * 1000);
      const randomWord = COMMON_WORDS[randomIndex];
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
    for(let i = 0; i <= window.typeTestIntervalRef; i++) {
      clearInterval(i)
    }
  };

  const refreshWordsHandler = () => {
    const numberOfWordsNeeded =
      timeConstraint === 'time' ? constraintLimit * 6 : constraintLimit;
    generateRandomWords(numberOfWordsNeeded);
    setIsGameOver(false);
  };

  React.useEffect(() => {
    const numberOfWordsNeeded =
      timeConstraint === 'time' ? constraintLimit * 6 : constraintLimit;
    generateRandomWords(numberOfWordsNeeded);
    setIsGameOver(false);
  }, [timeConstraint, constraintLimit]);

  return (
    <>
      <Header />
      <Menu
        timeConstraint={timeConstraint}
        constraintLimit={constraintLimit}
        changeTimeConstraint={timeConstraintChangeHandler}
        changeLimit={setConstraintLimit}
      />
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
          timeConstraint={timeConstraint}
          constraintLimit={constraintLimit}
        />
      )}
      <div className='refreshWrapper'>
        <button onClick={refreshWordsHandler}>
          <RefreshIcon width={36} height={36} />
        </button>
      </div>
    </>
  );
}

export default App;
