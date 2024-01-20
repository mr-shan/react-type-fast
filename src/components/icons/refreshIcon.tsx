import { IconProps } from '../../types';

const RefreshIcon = (props: IconProps) => {
  const width = props.width || '48';
  const height = props.height || '48';
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
      <g clip-path='url(#clip0_203_23)'>
        <path
          d='M24 10V2L14 12L24 22V14C30.62 14 36 19.38 36 26C36 32.62 30.62 38 24 38C17.38 38 12 32.62 12 26H8C8 34.84 15.16 42 24 42C32.84 42 40 34.84 40 26C40 17.16 32.84 10 24 10Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_203_23'>
          <rect width={width} height={height} fill={background} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RefreshIcon;
