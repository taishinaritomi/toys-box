import type { AtomEffect } from 'recoil';

const localStorageEffect = <T>(
  key: string,
  parser?: (value: T) => T,
): AtomEffect<T> => {
  return ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        try {
          const jsonPerse = JSON.parse(savedValue || '[]');
          const valueParse = parser ? parser(jsonPerse) : jsonPerse;
          setSelf(valueParse);
        } catch(e) { }
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };
};

export { localStorageEffect };
