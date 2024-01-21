import React from 'react';

import Header from './components/header/header';
import Menu from './components/menu/menu';
import TypingArea from './components/typingArea';
import RefreshIcon from './components/icons/refreshIcon';

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
      const randomWord = COMMON_WORDS[randomIndex];
      // if (randomWord && !wordsGenerated.includes(randomWord)) {
      if (randomWord) {
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
        <h1>Game Over</h1>
      ) : (
        <TypingArea
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
