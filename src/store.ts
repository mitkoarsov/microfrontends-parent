import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AppKey = "app1" | "app2";
type AppMeta = { name: string; bgColor: string };
type GlobalState = Record<AppKey, AppMeta>;

const initialState: GlobalState = {
  app1: { name: "App 1", bgColor: "#fff3e0" },
  app2: { name: "App 2", bgColor: "#e3f2fd" },
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setAppName: (s, a: PayloadAction<{ key: AppKey; name: string }>) => {
      s[a.payload.key].name = a.payload.name;
    },
    setAppBgColor: (s, a: PayloadAction<{ key: AppKey; bgColor: string }>) => {
      s[a.payload.key].bgColor = a.payload.bgColor;
    },
  },
});

export const { setAppName, setAppBgColor } = appsSlice.actions;

export const store = configureStore({ reducer: { apps: appsSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
