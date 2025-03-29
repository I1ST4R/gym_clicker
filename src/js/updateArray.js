export const updateArray = (setArray, updates, id = null) => {
  setArray(prevArray =>
    prevArray.map(element =>
      (id !== null && element.id !== id) ? element : { ...element, ...updates }
    )
  );
};