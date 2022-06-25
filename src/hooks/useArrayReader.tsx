import { useCallback } from "react";

const useArrayReader = <
  T extends Record<string | number | symbol, unknown>,
  N = never,
  K extends keyof T = never
>(
  array: T[] | N,
  key:K,
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

export default useArrayReader;
