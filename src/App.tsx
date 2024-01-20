import React from 'react';

import Header from './components/header/header';
import Menu from './components/menu/menu';
import TypingArea from './components/typingArea';
import RefreshIcon from './components/icons/refreshIcon';

import './assets/colors.css';
import './App.css';

import { timeConstraint, TypingWord } from './types';
import { TIME_OPTIONS, WORDS_OPTIONS, RANDOM_WORDS } from './types/constants';

function App() {
  const [timeConstraint, setTimeConstraint] =
    React.useState<timeConstraint>('words');
  const [constraintLimit, setConstraintLimit] = React.useState<number>(
    WORDS_OPTIONS[1]
  );
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [generatedWords, setGeneratedWords] = React.useState<Array<string>>([]);

  const timeConstraintChangeHandler = (event: timeConstraint) => {
    setTimeConstraint(event);
    const options = event === 'time' ? TIME_OPTIONS : WORDS_OPTIONS;
    setConstraintLimit(options[0]);
  };

  const onGameOver = (wordList: TypingWord[]) => {
    console.log(wordList);
    setIsGameOver(true);
  };

  const generateRandomWords = (numberOfWordsNeeded: number) => {
    const wordsGenerated: string[] = [];
    let wordsCounter = numberOfWordsNeeded;
    while (wordsCounter > 0) {
      const randomIndex = Math.floor(Math.random() * 1000);
      const randomWord = RANDOM_WORDS[randomIndex];
      if (randomWord && !wordsGenerated.includes(randomWord)) {
        wordsGenerated.push(randomWord);
        wordsCounter--;
      }
    }
    setGeneratedWords(wordsGenerated);
  };

  const refreshWordsHandler = () => {
    const numberOfWordsNeeded =
      timeConstraint === 'time' ? constraintLimit * 6 : constraintLimit;
    generateRandomWords(numberOfWordsNeeded);
  }

  React.useEffect(() => {
    const numberOfWordsNeeded =
      timeConstraint === 'time' ? constraintLimit * 6 : constraintLimit;
    generateRandomWords(numberOfWordsNeeded);
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
        <h1>Game Over</h1>
      ) : (
        <TypingArea words={generatedWords} gameOver={onGameOver} />
      )}
      <div className='refreshWrapper'>
        <button onClick={refreshWordsHandler}>
          <RefreshIcon />
        </button>
      </div>
    </>
  );
}

export default App;
