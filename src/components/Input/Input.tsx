import { concatClassNames } from '@utils/styles.utils';
import { FC } from 'react';
import classes from './Input.module.css';

const Input: FC<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'children'>> = ({
  className,
  ...rest
}) => {
  return <input className={concatClassNames(classes.input, className)} {...rest} />;
};

export { Input };
