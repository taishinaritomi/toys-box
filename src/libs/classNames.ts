export const classNames = (...classNames: unknown[]) => {
  return classNames
    .filter((className) => typeof className === 'string')
    .join(' ')
    .trim();
};
