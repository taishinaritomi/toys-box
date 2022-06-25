import type { Dispatch, SetStateAction} from 'react';
import { arrayMove } from '~/libs/array';

type Setter<T> = Dispatch<SetStateAction<T>>;

const useObjectArrayUpdater = <
  T extends Record<string | number | symbol, unknown>,
  N = never,
  K extends keyof T = never
>(
  setter: Setter<T[] | N>,
  key:K,
) => {

  const add = (addValue: T, location: 'start' | 'end' = 'start') => {
    setter((array) => {
      if(!Array.isArray(array)) return array;
      return location === 'start' ? [addValue, ...array] : [...array, addValue];
    });
  };

  const update = (updateKey: T[K], updateValue: Partial<T>) => {
    setter((array) => {
      if(!Array.isArray(array)) return array;
      return array.map((value) =>
        value[key] === updateKey ? { ...value, ...updateValue } : value,
      );
    });
  };

  const remove = (removeKey: T[K]) => {
    setter((array) => {
      if(!Array.isArray(array)) return array;
      return array.filter((value) => value[key] !== removeKey);
    });
  };

  const move = (oldKey: T[K], newKey: T[K]) => {
    setter((array) => {
      if(!Array.isArray(array)) return array;
      const oldIndex = array.findIndex((value) => value[key] === oldKey);
      const newIndex = array.findIndex((value) => value[key] === newKey);
      return arrayMove(array, oldIndex, newIndex);
    });
  };

  const nextMove = (nextMoveKey: T[K]) => {
    setter((array) => {
      if(!Array.isArray(array)) return array;
      const index = array.findIndex((value) => value[key] === nextMoveKey);
      return index === 0 ? array : arrayMove(array, index, index - 1);
    });
  };

  const prevMove = (prevMoveKey: T[K]) => {
    setter((array) => {
      if(!Array.isArray(array)) return array;
      const index = array.findIndex((value) => value[key] === prevMoveKey);
      return index === array.length - 1
        ? array
        : arrayMove(array, index, index + 1);
    });
  };

  return { add, update, remove, move, nextMove, prevMove };
};

export default useObjectArrayUpdater;
