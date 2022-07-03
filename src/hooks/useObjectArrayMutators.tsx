import type { Dispatch } from 'react';
import { arrayMove } from '~/libs/array';

type Setter<T> = Dispatch<(prevState: T) => T>;
export type PartialSetStateAction<S> =
  | Partial<S>
  | ((prevState: S) => Partial<S>);

const useObjectArrayMutators = <
  T extends Record<string, unknown>,
  K extends keyof T = 'id',
>(
  setter: Setter<T[]> | Setter<T[] | undefined> | Setter<T[] | null>,
  key: K = 'id' as K,
) => {
  const add = (addValue: T, location: 'start' | 'end' = 'start') => {
    setter((array) => {
      if (!Array.isArray(array)) return [addValue];
      return location === 'start' ? [addValue, ...array] : [...array, addValue];
    });
  };

  const update = (updateKey: T[K], updateValue: PartialSetStateAction<T>) => {
    setter((array) => {
      if (!Array.isArray(array)) return [];
      return array.map((value) => {
        if (value[key] === updateKey) {
          const _updateValue =
            updateValue instanceof Function ? updateValue(value) : updateValue;
          return { ...value, ..._updateValue };
        } else {
          return value;
        }
      });
    });
  };

  const remove = (removeKey: T[K]) => {
    setter((array) => {
      if (!Array.isArray(array)) return [];
      return array.filter((value) => value[key] !== removeKey);
    });
  };

  const move = (oldKey: T[K], newKey: T[K]) => {
    setter((array) => {
      if (!Array.isArray(array)) return [];
      const oldIndex = array.findIndex((value) => value[key] === oldKey);
      const newIndex = array.findIndex((value) => value[key] === newKey);
      return arrayMove(array, oldIndex, newIndex);
    });
  };

  const nextMove = (nextMoveKey: T[K]) => {
    setter((array) => {
      if (!Array.isArray(array)) return [];
      const index = array.findIndex((value) => value[key] === nextMoveKey);
      return index === 0 ? array : arrayMove(array, index, index - 1);
    });
  };

  const prevMove = (prevMoveKey: T[K]) => {
    setter((array) => {
      if (!Array.isArray(array)) return [];
      const index = array.findIndex((value) => value[key] === prevMoveKey);
      return index === array.length - 1
        ? array
        : arrayMove(array, index, index + 1);
    });
  };

  return { add, update, remove, move, nextMove, prevMove };
};

export default useObjectArrayMutators;
