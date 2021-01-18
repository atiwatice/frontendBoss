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

export const AllTask = atom({ key: "AllTask", default: [] });
export const SelectTask = atom({key:"SelectTask"})
export const AllSubTask = atom({key:"AllSubTask",default:[]})
export const AllUserSameCompany = atom({key:"AllUserSameCompany",default:[]})
export const AllCoperate = atom({key:"AllCoperate",default:[]})