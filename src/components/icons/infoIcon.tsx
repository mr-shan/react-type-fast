import { IconProps } from '../../types';

const InfoIcon = (props: IconProps) => {
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
      <g clipPath='url(#clip0_3_27)'>
        <path
          d='M18 3C9.72 3 3 9.72 3 18C3 26.28 9.72 33 18 33C26.28 33 33 26.28 33 18C33 9.72 26.28 3 18 3ZM19.5 25.5H16.5V16.5H19.5V25.5ZM19.5 13.5H16.5V10.5H19.5V13.5Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_3_27'>
          <rect width={width} height={height} fill={background} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoIcon;
