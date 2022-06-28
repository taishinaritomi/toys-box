import { useCallback } from "react";

const useObjectArrayReader = <
  T extends Record<string | number | symbol, unknown>,
  K extends keyof T = 'id'
>(
  array: T[] | (T[] | undefined) | (T[] | null),
  key: K = 'id' as K,
) => {
  const findByKey = useCallback((findKey: T[K]) => {
    if(!Array.isArray(array)) return null;
    return array.find((array) => array[key] === findKey) || null;
  },[array])

  const findIndex = useCallback((findKey: T[K]) => {
    if(!Array.isArray(array)) return 0;
    return array.findIndex((array) => array[key] === findKey);
  },[array])

  return { findByKey, findIndex }
}

export default useObjectArrayReader;
