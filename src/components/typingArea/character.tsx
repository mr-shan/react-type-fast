import styles from './word.module.css';
import TypingIndicator from './typingIndicator';

interface IPropsChar {
  char: string;
  showIndicator: boolean;
  typedChar: string;
  isExcess: boolean;
}

const Character = (props: IPropsChar) => {
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

export default Character;
