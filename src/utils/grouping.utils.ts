const groupBy = <TDataType>(data: TDataType[], groupByKey: keyof TDataType) => {
  const groupedRows: Record<string, TDataType[]> = {};

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const key = entry[groupByKey];

    if (typeof key !== 'string') throw new Error('Picked wrong key');

    groupedRows[key] ??= [];
    groupedRows[key].push(entry);
  }

  return groupedRows;
};

export { groupBy };
