import {useStore} from "react-hookstore";

/**
 * Custom useStore hook, works the same, but setStore() also caches to sessionStorage
 * @param {string} storeName 
 */
const useSessionStore = (storeName) => {
  const [store,setActualStore] = useStore(storeName);
  const setStore = (value) => {
    setActualStore(value);
    sessionStorage.setItem(storeName, JSON.stringify(value));
  }
  return [store, setStore];
}

/**
 * Custom useStore hook, work the same, but setStore() also caches to localStorage
 * @param {string} storeName 
 */
const useLocalStore = (storeName) => {
  const [store,setActualStore] = useStore(storeName);
  const setStore = (value) => {
    setActualStore(value);
    localStorage.setItem(storeName, JSON.stringify(value));
  }
  return [store, setStore];
}

export {
  useSessionStore,
  useLocalStore
}