import { FC } from 'react';
import classes from './Jar.module.css';

type JarProps = Omit<React.SVGProps<SVGSVGElement>, 'children' | 'viewBox'> & {
  progress: number;
  current: number;
};

const Jar: FC<JarProps> = ({ progress, current, ...rest }) => {
  const offset = Math.max(0, Math.min(100, progress));

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...rest} viewBox="0 0 70 90">
      <defs>
        <linearGradient id="gaugeGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="var(--red-300)" />
          <stop offset="50%" stopColor="var(--yellow-300)" />
          <stop offset="100%" stopColor="var(--green-300)" />
        </linearGradient>
      </defs>
      <g className={classes.jar} data-shake={offset > 0.9} style={{ '--progress': offset }}>
        <circle id="handle" cx="35" cy="6" r="4" fill="none" stroke="var(--gray-500)" />
        <rect id="lid" x="12" y="10" width="46" height="13" rx="5" fill="none" stroke="var(--gray-500)" />
        <rect className={classes.filling} x="5" y="23" width="60" height="65" rx="10" fill="url(#gaugeGradient)" stroke="none" />
        <rect id="body" x="5" y="23" width="60" height="65" rx="10" fill="none" stroke="var(--gray-500)" />
        <text x="50%" y="50%" text-anchor="middle">
          {current}
        </text>
      </g>
    </svg>
  );
};

export { Jar };
