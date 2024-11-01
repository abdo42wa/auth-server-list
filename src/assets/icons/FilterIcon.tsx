import type { FC, SVGProps } from "react";

export const FilterIcon: FC<SVGProps<SVGAElement>> = () => {
  return (
    <div className="w-6">
      <svg
        version="1.1"
        id="filterIcon"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 12 12"
        enableBackground="new 0 0 12 12"
        xmlSpace="preserve"
      >
        <g>
          <path
            fill="#4763E4"
            d="M4.418396,2.25C4.2015991,1.5297241,3.539917,1,2.75,1S1.2984009,1.5297241,1.081604,2.25H0v1h1.081604
		C1.2984009,3.9702759,1.960083,4.5,2.75,4.5s1.4515991-0.5297241,1.668396-1.25H12v-1H4.418396z"
          />
          <path
            fill="#4763E4"
            d="M9.25,4.25c-0.789917,0-1.4515991,0.5297241-1.668396,1.25H0v1h7.581604
		C7.7984009,7.2202759,8.460083,7.75,9.25,7.75s1.4515991-0.5297241,1.668396-1.25H12v-1h-1.081604
		C10.7015991,4.7797241,10.039917,4.25,9.25,4.25z"
          />
          <path
            fill="#4763E4"
            d="M4.5,7.5c-0.789917,0-1.4515991,0.5297241-1.668396,1.25H0v1h2.831604
		C3.0484009,10.4702759,3.710083,11,4.5,11s1.4515991-0.5297241,1.668396-1.25H12v-1H6.168396
		C5.9515991,8.0297241,5.289917,7.5,4.5,7.5z"
          />
        </g>
      </svg>
    </div>
  );
};
