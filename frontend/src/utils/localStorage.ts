const STORAGE_KEY = "working-day";

export function saveWorkingDay(data: unknown) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function loadWorkingDay<T>() {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as T;
}

export function clearWorkingDay() {
  localStorage.removeItem(STORAGE_KEY);
}