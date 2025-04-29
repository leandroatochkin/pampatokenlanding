import React from 'react';

const Logo = ({ width = 100, height = 100 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 65 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 35.2924C0 25.7421 7.77446 18 17.3647 18H65V27.2083H39.4351V83H30.1883V52.5847H17.3647C7.77446 52.5847 0 44.8427 0 35.2924ZM30.1883 43.3764V27.2083H17.3647C12.8814 27.2083 9.24686 30.8277 9.24686 35.2924C9.24686 39.7571 12.8814 43.3764 17.3647 43.3764H30.1883Z"
        fill="#43A047"
      />
    </svg>
  );
};

export default Logo;
