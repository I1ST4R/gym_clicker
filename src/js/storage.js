
export const loadState = (key, defaultValue, parser = (val) => val) => {
  const savedValue = localStorage.getItem(key);
  return savedValue ? parser(savedValue) : defaultValue;
};

export const saveState = (key, value) => {
  localStorage.setItem(key, value);
};

export const bigIntParser = (key, value) => {
  if (typeof value === 'string' && /^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
};