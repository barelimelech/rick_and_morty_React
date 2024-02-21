import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "./charactersSlice";
import episodesSlice from "./episodesSlice";
import MyCustomApiService from "./myCustomApiService";

const store = configureStore({
  reducer: { characters: charactersSlice, episodes: episodesSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: MyCustomApiService,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;