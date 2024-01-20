import { memo } from 'react';
import styles from './word.module.css';
import TypingIndicator from './typingIndicator';

interface IPropsChar {
  char: string;
  showIndicator: boolean;
  typedChar: string;
  isExcess: boolean;
}

const CharacterOg = (props: IPropsChar) => {
  const classes = [];
  if (props.isExcess) {
    classes.push(styles.wrongChar);
  } else if (props.typedChar !== undefined) {
    classes.push(
      props.char === props.typedChar ? styles.rightChar : styles.wrongChar
    );
  }
  return (
    <>
      {props.showIndicator && <TypingIndicator />}
      <span className={classes.join(' ')}>{props.char}</span>
    </>
  );
};

const Character = memo(
  CharacterOg,
  (oldProps, nextProps) => oldProps.showIndicator === nextProps.showIndicator
);
export default Character;
