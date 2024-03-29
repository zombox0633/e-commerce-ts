import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { definedStore } from "helpers/*";

type UseAuthenticationStoreType = {
  jwt: string | null;
  onSetJwt: (param: string) => boolean;
  onRemoveJwt: () => boolean;
};

const useAuthenticationStore = create<UseAuthenticationStoreType>()(
  devtools(
    persist(
      (set) => ({
        jwt: null,
        onSetJwt: (param: string) => {
          set({ jwt: param }, false, { type: "onSetJwt" });          
          return true;
        },
        onRemoveJwt: () => {
          set({ jwt: null }, false, { type: "onRemoveJwt" });
          return true;
        },
      }),
      { name: "secret" },
    ),
    definedStore("useProfileStore"),
  ),
);

export default useAuthenticationStore;
