

const arrayMove = <T>(array: T[], from: number, to: number): T[] => {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    ...newArray.splice(from, 1)
  );
  return newArray;
}

export { arrayMove };
