import ChevronDown from '@icons/chevron-down.svg';
import { concatClassNames } from '@utils/styles.utils';
import classes from './Select.module.css';

type SelectOption<TValue extends string> = { value: TValue; label: string };
type SelectTagProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
type SelectProps<TValue extends string> = Omit<SelectTagProps, 'value' | 'onChange' | 'children'> & {
  value: TValue;
  placeholder?: string;
  onChange: (value: TValue) => void;
  options: SelectOption<TValue>[];
};

const Select = <TValue extends string>({ value, placeholder, options, className, onChange, ...rest }: SelectProps<TValue>) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value as TValue);
  };

  return (
    <div className={concatClassNames(classes.selectContainer, className)}>
      <select value={value} className={classes.select} onChange={handleChange} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className={classes.chevron} />
    </div>
  );
};

export { Select };
export type { SelectOption, SelectProps };
