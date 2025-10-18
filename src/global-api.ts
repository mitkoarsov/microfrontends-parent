import {
  store,
  type RootState,
  type AppDispatch,
  setAppName,
  setAppBgColor,
} from "./store";
import type { AppKey } from "./store";

export type AppsState = RootState["apps"];

export const getAppsState = (): AppsState => store.getState().apps;
export const subscribeGlobal = (fn: () => void) => store.subscribe(fn);

export const updateAppName = (key: AppKey, name: string) =>
  (store.dispatch as AppDispatch)(setAppName({ key, name }));

export const updateAppBgColor = (key: AppKey, bgColor: string) =>
  (store.dispatch as AppDispatch)(setAppBgColor({ key, bgColor }));
