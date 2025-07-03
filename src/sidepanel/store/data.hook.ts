import { useStore } from "zustand";
import { dataStore, type IDataStore } from "@/src/sidepanel/store/data";

export const useDataStore = <T>(selector: (state: IDataStore) => T): T => {
  return useStore(dataStore, selector);
};
