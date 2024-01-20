import { IconProps } from '../../types';

const TimeIcon = (props: IconProps) => {
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
      <g clipPath='url(#clip0_3_32)'>
        <path
          d='M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z'
          fill={color}
        />
        <path
          d='M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_3_32'>
          <rect width={width} height={height} fill={background} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TimeIcon;