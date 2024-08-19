import { concatClassNames } from '@utils/styles.utils';
import { FC } from 'react';
import classes from './Button.module.css';

const Button: FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ className, children, ...rest }) => {
  return (
    <button className={concatClassNames(classes.button, className)} {...rest}>
      {children}
    </button>
  );
};

export { Button };
