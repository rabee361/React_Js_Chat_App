import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type TokenState = {
  token: string
  userId: number
  chatId: number
}

type TokenAction = {
  setToken: (token: TokenState['token']) => void
  setUserId: (id: TokenState['userId']) => void
  setChatId: (chatId: TokenState['chatId']) => void
}


const useToken = create<TokenState & TokenAction>()(
  persist(
    (set) => ({
      token: '',
      userId: NaN,
      chatId: NaN,
      setToken: (token) => set({ token }),
      setUserId: (userId) => set({ userId }),
      setChatId: (chatId) => set({ chatId }),
    }),
    {
      name: 'token-storage',
    }
  ),
);

export default useToken;