import * as React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 155 164"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M77.085 137.041c30.125 0 54.546-24.421 54.546-54.546 0-30.124-24.421-54.545-54.546-54.545S22.54 52.37 22.54 82.495s24.42 54.546 54.545 54.546zm0 22.539c42.573 0 77.085-34.512 77.085-77.085 0-42.573-34.512-77.085-77.085-77.085C34.512 5.41 0 39.922 0 82.495c0 42.573 34.512 77.085 77.085 77.085z"
      fill="url(#prefix__paint0_radial)"
    />
    <path
      d="M135.816 0H94.999L35.372 97.769h34.015L41.84 163.964l75.299-92.673H89.929L135.816 0z"
      fill="#303030"
    />
    <defs>
      <radialGradient
        id="prefix__paint0_radial"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(63.229 22.29 6.9) scale(190.737)"
      >
        <stop stopColor="#F24E1E" />
        <stop offset={0.263} stopColor="#FF7262" />
        <stop offset={0.518} stopColor="#A259FF" />
        <stop offset={0.832} stopColor="#1ABCFE" />
        <stop offset={1} stopColor="#0ACF83" />
      </radialGradient>
    </defs>
  </svg>
);

export default Logo;
