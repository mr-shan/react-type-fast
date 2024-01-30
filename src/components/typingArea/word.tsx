import { memo } from 'react';

import styles from './word.module.css';
import { TypingWord } from '../../types';

import TypingIndicator from './typingIndicator';
import Character from './character';

interface IProps {
  typingWord: TypingWord;
  currentWordIndex: number;
  currentCharIndex: number;
  isActive: boolean
}

const WordOg = (props: IProps) => {
  const characters = props.typingWord.original.split('');

  const excessTyped = props.typingWord.typed.substring(
    props.typingWord.original.length,
    props.typingWord.typed.length
  );
  if (excessTyped) {
    characters.push(...excessTyped.split(''));
  }

  const showTypingIndicator =
    props.currentCharIndex > props.typingWord.original.length - 1 && props.isActive;

  const id = props.typingWord.index + props.typingWord.original;

  if (props.isActive) {
    const el = document.getElementById(id)
    const offsetTop = el?.offsetTop
    // @ts-expect-error the offset top does exist on the parent node.
    const parentOffsetTop = el?.parentNode?.offsetTop
    if (offsetTop && parentOffsetTop) {
      if (offsetTop > parentOffsetTop + 60) {
        // @ts-expect-error the offset top does exist on the parent node.
        el.parentNode.scrollTo(0, offsetTop - (parentOffsetTop + el.offsetHeight))
      }
    }
  }
  return (
    <div className={styles.wordWrapper} id={id}>
      {characters.map((char: string, index: number) => (
        <Character
          key={index}
          char={char}
          isExcess={index >= props.typingWord.original.length}
          typedChar={props.typingWord.typed[index]}
          showIndicator={props.currentCharIndex === index && props.isActive}
        ></Character>
      ))}
      {showTypingIndicator && <TypingIndicator />}
    </div>
  );
};

const Word = memo(WordOg, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive && !nextProps.isActive
})

export default Word;
