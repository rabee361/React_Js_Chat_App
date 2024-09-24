import { create } from "zustand";
import { LoginAction, LoginState } from "../types/types";


export const useLoginStore = create<LoginState & LoginAction>((set) => ({
    email: '',
    password: '',
    setEmail: (email) => set(() => ({ email: email })),
    setPassword: (password) => set(() => ({ password: password })),
  }))