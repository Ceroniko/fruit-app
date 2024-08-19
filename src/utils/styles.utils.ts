const concatClassNames = (...classNames: unknown[]) => {
  let finalClassName = '';

  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];

    if (typeof className !== 'string' || className === '') continue;

    finalClassName += ` ${className}`;
  }

  return finalClassName;
};

export { concatClassNames };
