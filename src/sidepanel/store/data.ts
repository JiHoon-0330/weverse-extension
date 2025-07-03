import { createStore } from "zustand";

export interface IData {
  fetchNotiFeedActivities: {
    isLoading: boolean;
    data: unknown;
  };
}

export interface IDataStore {
  data: IData;
  setData: (data: IData) => void;
}

export const dataStore = createStore<IDataStore>((set) => ({
  data: {
    fetchNotiFeedActivities: {
      isLoading: true,
      data: {},
    },
  },
  setData: (data) => set({ data }),
}));
