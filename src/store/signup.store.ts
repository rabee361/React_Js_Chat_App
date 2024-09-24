import { create } from 'zustand'
import { SignUpAction, SignUpState } from "../types/types";




export const useSignUpStore = create<SignUpState & SignUpAction>((set) => ({
    email: '',
    username: '',
    password1: '',
    password2: '',
    setEmail: (email) => set(() => ({ email: email })),
    setUsername: (username) => set(() => ({ username: username })),
    setPassword1: (password1) => set(() => ({ password1: password1 })),
    setPassword2: (password2) => set(() => ({ password2: password2 })),
  }))
  