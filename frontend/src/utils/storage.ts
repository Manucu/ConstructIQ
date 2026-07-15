export function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Could not save "${key}" to storage:`, error);
  }
}

export function loadFromStorage<T>(key: string): T | null {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue) as T;
  } catch (error) {
    console.error(`Could not load "${key}" from storage:`, error);
    return null;
  }
}

export function removeFromStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Could not remove "${key}" from storage:`, error);
  }
}