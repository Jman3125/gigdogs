//use this context variabel to reload feed once band signed in

import { createContext } from "react";

export type ReloadFeedContextType = {
  reload: boolean;
  setReload: (v: boolean) => void;
};

export const ReloadFeedContext = createContext<ReloadFeedContextType>({
  reload: false,
  setReload: () => {},
});
