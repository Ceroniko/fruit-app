import { fruitsAPI } from '@api/fruits.api';
import { FruitList } from '@components/FruitList';
import { Input } from '@components/Input';
import { Jar } from '@components/Jar';
import { Loader } from '@components/Loader';
import { Select, SelectOption } from '@components/Select';
import { Fruit, FruitsGroup } from '@dataTypes/fruits';
import { useQuery } from '@hooks/useQuery';
import { groupBy } from '@utils/grouping.utils';
import { ChangeEventHandler, useCallback, useId, useMemo, useState } from 'react';
import classes from './CaloriesCalculator.module.css';

type FruitGroupingKeys = Extract<keyof Fruit, 'family' | 'genus' | 'order'> | '';

const groupByOptions: SelectOption<FruitGroupingKeys>[] = [
  { value: 'genus', label: 'Genus' },
  { value: 'family', label: 'Family' },
  { value: 'order', label: 'Order' },
];

const DEFAULT_CALORIES_LIMIT = 2000;

const CaloriesCalculator = () => {
  const id = useId();
  const [groupByField, setGroupByField] = useState<FruitGroupingKeys>('');
  const [caloriesLimit, setCaloriesLimit] = useState('');
  const [selectedFruits, setSelectedFruits] = useState<Record<string, boolean>>({});

  const groupByFieldSelectId = `groupByField-${id}`;
  const caloriesLimitInputId = `caloriesLimit-${id}`;

  const queryFn = useMemo(() => fruitsAPI.getAllFruitsQueryFn(), []);
  const { data, error, isLoading } = useQuery(queryFn);

  const fruitMap = useMemo(() => {
    const map: Record<string, Fruit> = {};

    if (!data) return map;

    for (let i = 0; i < data.length; i++) {
      const fruit = data[i];
      map[fruit.id] = fruit;
    }

    return map;
  }, [data]);

  const fruitList = useMemo(() => {
    if (!data) return null;

    if (groupByField === '') return data;

    const groupedRows = groupBy(data, groupByField);
    return Object.entries(groupedRows).map(([groupName, fruits]) => ({ groupName, fruits }));
  }, [data, groupByField]);

  const { selectedFruitsList, totalCalories } = useMemo(() => {
    const selectedFruitsList: Fruit[] = [];
    let totalCalories = 0;

    for (const fruitId in selectedFruits) {
      if (!selectedFruits[fruitId] || !fruitMap[fruitId]) continue;

      const selectedFruit = fruitMap[fruitId];
      selectedFruitsList.push(selectedFruit);
      totalCalories += selectedFruit.nutritions.calories;
    }

    return { selectedFruitsList, totalCalories };
  }, [fruitMap, selectedFruits]);

  const progress = useMemo(() => {
    const numericDesiredTotal = parseFloat(caloriesLimit);

    if (!caloriesLimit || isNaN(numericDesiredTotal)) return totalCalories / DEFAULT_CALORIES_LIMIT;

    return totalCalories / numericDesiredTotal;
  }, [caloriesLimit, totalCalories]);

  const onAddFruit = useCallback((fruit: Fruit) => setSelectedFruits((prevSelectedFruits) => ({ ...prevSelectedFruits, [fruit.id]: true })), []);
  const onDeleteFruit = useCallback((fruit: Fruit) => setSelectedFruits((prevSelectedFruits) => ({ ...prevSelectedFruits, [fruit.id]: false })), []);
  const onAddFruitGroup = useCallback((group: FruitsGroup) => {
    const addedFruits = Object.fromEntries(group.fruits.map((fruit) => [fruit.id, true]));
    setSelectedFruits((prevSelectedFruits) => ({ ...prevSelectedFruits, ...addedFruits }));
  }, []);
  const onDeleteFruitGroup = useCallback((group: FruitsGroup) => {
    const deletedFruits = Object.fromEntries(group.fruits.map((fruit) => [fruit.id, false]));
    setSelectedFruits((prevSelectedFruits) => ({ ...prevSelectedFruits, ...deletedFruits }));
  }, []);

  const onCaloriesLimitChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    const { validity, value, valueAsNumber } = event.target;

    if (isNaN(valueAsNumber) || validity.rangeUnderflow) return setCaloriesLimit('');

    if (validity.stepMismatch) return setCaloriesLimit(Math.round(valueAsNumber).toString());

    setCaloriesLimit(value);
  }, []);

  if (isLoading) return <Loader />;

  if (error) return <div className={classes.errorContainer}>{error}</div>;

  return (
    <div className={classes.container}>
      <div className={classes.listContainer}>
        <label htmlFor={groupByFieldSelectId}>Group fruits by</label>
        <Select placeholder="Not selected" id={groupByFieldSelectId} value={groupByField} onChange={setGroupByField} options={groupByOptions} />
        {fruitList && (
          <FruitList
            addable
            deletable
            list={fruitList}
            selectedFruits={selectedFruits}
            onAddFruit={onAddFruit}
            onDeleteFruit={onDeleteFruit}
            onAddFruitGroup={onAddFruitGroup}
            onDeleteFruitGroup={onDeleteFruitGroup}
          />
        )}
      </div>

      <div className={classes.jarContainer}>
        <label htmlFor={caloriesLimitInputId}>Enter calories limit</label>
        <Input
          step={1}
          min={0}
          type="number"
          placeholder={`Total calories (Default - ${DEFAULT_CALORIES_LIMIT})`}
          id={caloriesLimitInputId}
          value={caloriesLimit}
          onChange={onCaloriesLimitChange}
        />
        <Jar progress={progress} current={totalCalories} className={classes.jar} />

        {selectedFruitsList && (
          <FruitList
            deletable
            addable={false}
            list={selectedFruitsList}
            selectedFruits={selectedFruits}
            onDeleteFruit={onDeleteFruit}
            onAddFruit={onAddFruit}
            onDeleteFruitGroup={onDeleteFruitGroup}
            onAddFruitGroup={onAddFruitGroup}
          />
        )}
      </div>
    </div>
  );
};

export { CaloriesCalculator };
