import { IconProps } from '../../types';

const WordsIcon = (props: IconProps) => {
  const width = props.width || '24';
  const height = props.height || '24';
  const color = props.color || 'currentColor';
  const background = props.color || 'none';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={background}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_3_42)'>
        <path
          d='M9 4V7H14V19H17V7H22V4H9ZM3 12H6V19H9V12H12V9H3V12Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_3_42'>
          <rect width={width} height={height} fill={background} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WordsIcon;
