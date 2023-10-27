export const PlusIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V10H19C19.5523 10 20 10.4477 20 11C20 11.5523 19.5523 12 19 12H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V12H5C4.44772 12 4 11.5523 4 11C4 10.4477 4.44772 10 5 10H11V4Z"
        fill={fill}
      />
    </svg>
  );
};

export const MinusIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 11C6 10.4477 6.44772 10 7 10H17C17.5523 10 18 10.4477 18 11C18 11.5523 17.5523 12 17 12H7C6.44772 12 6 11.5523 6 11Z"
        fill={fill}
      />
    </svg>
  );
};
