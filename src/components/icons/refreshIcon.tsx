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
      viewBox="0 0 36 36"
      fill={background}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_203_23)'>
        <path
          d='M18 7.5V1.5L10.5 9L18 16.5V10.5C22.965 10.5 27 14.535 27 19.5C27 24.465 22.965 28.5 18 28.5C13.035 28.5 9 24.465 9 19.5H6C6 26.13 11.37 31.5 18 31.5C24.63 31.5 30 26.13 30 19.5C30 12.87 24.63 7.5 18 7.5Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_203_23'>
          <rect width='36' height='36' fill={background} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RefreshIcon;
