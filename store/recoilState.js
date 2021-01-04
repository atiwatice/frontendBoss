import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
export const userState = atom({
    key: "userState",
    default: {
      userId: 0,
      username: "",
    },
  });
  
  export const loginState = atom({
    key: "loginState",
    default: "LOGOUT",
  });