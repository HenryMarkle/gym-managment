import { atom, selector } from "recoil";

export const nameState = atom({
  key: "nameState",
  default: "",
});

export const charState = selector({
  key: "charState",
  get: ({ get }) => {
    const name = get(nameState);
    return [name];
  },
});
