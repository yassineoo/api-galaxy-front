// apiStore.js
import create from "zustand";

const useApiStore = create((set: any) => ({
  selectedApi: null,
  selectApi: (api: any) => set({ selectedApi: api }),
}));

export default useApiStore;
