import React from 'react';

import Header from './components/header/header';
import Menu from './components/menu/menu';

import './assets/colors.css';
import './App.css';

import { timeConstraint } from './types';
import { TIME_OPTIONS, WORDS_OPTIONS } from './types/constants';

function App() {
  const [timeConstraint, setTimeConstraint] =
    React.useState<timeConstraint>('time');
  const [constraintLimit, setConstraintLimit] = React.useState<number>(
    TIME_OPTIONS[0]
  );

  const timeConstraintChangeHandler = (event: timeConstraint) => {
    setTimeConstraint(event);
    const options = event === 'time' ? TIME_OPTIONS : WORDS_OPTIONS;
    setConstraintLimit(options[0]);
  };

  return (
    <>
      <Header />
      <Menu
        timeConstraint={timeConstraint}
        constraintLimit={constraintLimit}
        changeTimeConstraint={timeConstraintChangeHandler}
        changeLimit={setConstraintLimit}
      />
    </>
  );
}

export default App;
