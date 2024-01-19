import { IconProps } from '../../types';

const LeaderBoardIcon = (props: IconProps) => {
  const width = props.width || '36';
  const height = props.height || '36';
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
      <g clipPath='url(#clip0_3_23)'>
        <path
          d='M11.25 31.5H3V13.5H11.25V31.5ZM22.125 4.5H13.875V31.5H22.125V4.5ZM33 16.5H24.75V31.5H33V16.5Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_3_23'>
          <rect width={width} height={height} fill={background} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LeaderBoardIcon;
