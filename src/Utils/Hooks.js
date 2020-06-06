import {createStore, useStore} from "react-hookstore";

/**
 * Custom createStore hook, works the same, but also fetches cache from sessionStorage else initial value is set to defaultValue.
 * Parses JSON by default.
 * @param {string} storeName 
 * @param {any} defaultValue
 */
export const createSessionStore = (storeName, defaultValue = null, needsParsing = true) => {
  const value = sessionStorage.getItem(storeName);
  createStore(storeName, (needsParsing ? JSON.parse(value) : value) || defaultValue);
}

/**
 * Custom createStore hook, works the same, but also fetches cache from localStorage else initial value is set to defaultValue.
 * Parses JSON by default.
 * @param {string} storeName 
 * @param {any} defaultValue
 */
export const createLocalStore = (storeName, defaultValue = null, needsParsing = true) => {
  const value = localStorage.getItem(storeName);
  createStore(storeName, (needsParsing ? JSON.parse(value) : value) || defaultValue);
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