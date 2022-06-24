import type { Dispatch, SetStateAction } from "react";
import { arrayMove } from "~/libs/array";

const useArray = <T extends { id: string }>(setter: Dispatch<SetStateAction<T[]>>) => {

  const add = (addValue: T) => {
    setter((values) => [addValue,...values]);
  };

  const update = (
    updateValue: Partial<T>,
    id: string,
    ) => {
      setter((values) => {
        return values.map((value) =>
        value.id === id ? { ...value, ...updateValue } : value,
        );
      });
    };

    const remove = (id: string) => {
      setter((values) => values.filter((value) => value.id !== id));
    };

    const sort = (oldId:string, newId:string) => {
      setter((values) => {
        const oldIndex = values.findIndex((item) => item.id === oldId);
        const newIndex = values.findIndex((item) => item.id === newId);
        return arrayMove(values, oldIndex, newIndex);
      });
    }

    const next = (id: string) => {
      setter((fruits) => {
        const index = fruits.findIndex((fruit) => fruit.id === id);
        return index === 0 ? fruits : arrayMove(fruits, index, index - 1);
      });
    };

    const prev = (id: string) => {
      setter((fruits) => {
        const index = fruits.findIndex((fruit) => fruit.id === id);
        return index === fruits.length -1 ? fruits : arrayMove(fruits, index, index + 1);
      });
    };

  return { add, update, remove, sort, next, prev }
}

export default useArray;

// Example
// const List:FC = () => {
//   const [list,setList] = useState<List>();
//   const { add } = useArray(setList);
//   add({id:'id',name:'name'});
// }
