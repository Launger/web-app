import {createStore, useStore} from "react-hookstore";

/**
 * Custom createStore hook, works the same, but also fetches cache from sessionStorage else initial value is set to defaultValue.
 * Parses JSON by default.
 * @param {string} storeName 
 * @param {any} defaultValue
 * @param {boolean} needsParsing
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
 * @param {boolean} needsParsing
 */
export const createLocalStore = (storeName, defaultValue = null, needsParsing = true) => {
  const value = localStorage.getItem(storeName);
  createStore(storeName, (needsParsing ? JSON.parse(value) : value) || defaultValue);
}

/**
 * Custom useStore hook, works the same, but setStore() also caches to sessionStorage.
 * Uses JSON.stringify() by default
 * @param {string} storeName 
 * @param {boolean} needStringify
 */
export const useSessionStore = (storeName, needStringify = true) => {
  const [store,setActualStore] = useStore(storeName);
  const setStore = (value) => {
    setActualStore(value);
    value = (needStringify ? JSON.stringify(value) : value);
    sessionStorage.setItem(storeName, value);
  }
  return [store, setStore];
}

/**
 * Custom useStore hook, works the same, but setStore() also caches to localStorage.
 * Uses JSON.stringify() by default
 * @param {string} storeName 
 * @param {boolean} needStringify
 */
export const useLocalStore = (storeName, needStringify = true) => {
  const [store,setActualStore] = useStore(storeName);
  const setStore = (value) => {
    setActualStore(value);
    value = (needStringify ? JSON.stringify(value) : value);
    localStorage.setItem(storeName, value);
  }
  return [store, setStore];
}