import { Fruit, FruitsGroup } from '@dataTypes/fruits';
import { FC } from 'react';
import { Accordion } from '../Accordion';
import { Button } from '../Button';
import classes from './FruitList.module.css';

type FruitListProps = {
  list: (FruitsGroup | Fruit)[];
  selectedFruits: Record<string, boolean>;
  addable: boolean;
  deletable: boolean;
  onAddFruit: (fruit: Fruit) => void;
  onDeleteFruit: (fruit: Fruit) => void;
  onAddFruitGroup: (group: FruitsGroup) => void;
  onDeleteFruitGroup: (group: FruitsGroup) => void;
};

type FruitGroupProps = Omit<FruitListProps, 'list'> & { group: FruitsGroup };
type FruitProps = Pick<FruitListProps, 'addable' | 'deletable' | 'onDeleteFruit' | 'onAddFruit'> & { fruit: Fruit; selected: boolean };

const isFruit = (item: FruitsGroup | Fruit) => 'id' in item;

const FruitList: FC<FruitListProps> = ({ list, selectedFruits, ...sharedProps }) => {
  return (
    <ul className={classes.list}>
      {list.map((item) => {
        if (isFruit(item)) return <FruitItem key={item.id} fruit={item} selected={selectedFruits[item.id]} {...sharedProps} />;

        return <FruitGroup key={item.groupName} group={item} selectedFruits={selectedFruits} {...sharedProps} />;
      })}
    </ul>
  );
};

const FruitGroup: FC<FruitGroupProps> = ({
  group,
  addable,
  deletable,
  selectedFruits,
  onAddFruit,
  onDeleteFruit,
  onAddFruitGroup,
  onDeleteFruitGroup,
}) => {
  const { groupName, fruits } = group;

  const isGroupSelected = fruits.every((fruit) => selectedFruits[fruit.id]);

  const canAddGroup = !isGroupSelected && addable;
  const canDeleteGroup = isGroupSelected && deletable;

  return (
    <li className={classes.listItem}>
      <Accordion
        label={groupName}
        additionalContent={
          <>
            {canAddGroup && <Button onClick={() => onAddFruitGroup(group)}>Add group</Button>}
            {canDeleteGroup && <Button onClick={() => onDeleteFruitGroup(group)}>Delete group</Button>}
          </>
        }
      >
        <FruitList
          list={fruits}
          addable={addable}
          deletable={deletable}
          selectedFruits={selectedFruits}
          onAddFruitGroup={onAddFruitGroup}
          onDeleteFruitGroup={onDeleteFruitGroup}
          onAddFruit={onAddFruit}
          onDeleteFruit={onDeleteFruit}
        />
      </Accordion>
    </li>
  );
};

const FruitItem: FC<FruitProps> = ({ fruit, selected, addable, deletable, onDeleteFruit, onAddFruit }) => {
  const canAddFruit = !selected && addable;
  const canDeleteFruit = selected && deletable;

  return (
    <li className={classes.listItem}>
      <p>
        <span>{fruit.name}</span> - <span>{fruit.nutritions.calories}</span>
      </p>

      {canAddFruit && <Button onClick={() => onAddFruit(fruit)}>Add fruit</Button>}
      {canDeleteFruit && <Button onClick={() => onDeleteFruit(fruit)}>Delete fruit</Button>}
    </li>
  );
};

export { FruitList };
