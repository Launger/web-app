import {createStore, useStore} from "react-hookstore";

/**
 * Custom createStore hook, works the same, but also fetches cache from sessionStorage else initial value is set to defaultValue
 * @param {string} storeName 
 * @param {any} defaultValue
 */
export const createSessionStore = (storeName, defaultValue = null) => {
  createStore(storeName, JSON.parse(sessionStorage.getItem(storeName)) || defaultValue);
}

/**
 * Custom createStore hook, works the same, but also fetches cache from localStorage else initial value is set to defaultValue
 * @param {string} storeName 
 * @param {any} defaultValue
 */
export const createLocalStore = (storeName, defaultValue = null) => {
  createStore(storeName, JSON.parse(localStorage.getItem(storeName)) || defaultValue);
}

/**
 * Custom useStore hook, works the same, but setStore() also caches to sessionStorage
 * @param {string} storeName 
 */
export const useSessionStore = (storeName) => {
  const [store,setActualStore] = useStore(storeName);
  const setStore = (value) => {
    setActualStore(value);
    sessionStorage.setItem(storeName, JSON.stringify(value));
  }
  return [store, setStore];
}

/**
 * Custom useStore hook, works the same, but setStore() also caches to localStorage
 * @param {string} storeName 
 */
export const useLocalStore = (storeName) => {
  const [store,setActualStore] = useStore(storeName);
  const setStore = (value) => {
    setActualStore(value);
    localStorage.setItem(storeName, JSON.stringify(value));
  }
  return [store, setStore];
}