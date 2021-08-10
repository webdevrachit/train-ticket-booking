import { store } from "store/";


const getApiKey = async () => {
  return await store.getState().user.apiKey;
};

const getFromstorage = async (key) => {
  return await localStorage.getItem(key);
};

const saveToStorage = async (key, value) => {
  		try {
		    return await localStorage.setItem(key, value);
		} catch (error) {
		    console.log(`
		        Error in saving ${key } token
		    `)
		}
	return null;
};

const storage = {
  get: (key) => getFromstorage(key),
  set: (key, value) => saveToStorage(key, value),
  getApiKey: () => getApiKey(),
};

export default storage;