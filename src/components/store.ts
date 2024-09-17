import {create} from 'zustand';

type TokenState = {
  token: string
  id: number
  chatId: number
}

type TokenAction = {
  setToken: (token: TokenState['token']) => void
  setUserId: (id: TokenState['id']) => void
  setChatId: (chatId: TokenState['chatId']) => void
}


const useToken = create<TokenState & TokenAction>((set) => ({
    token: '',
    id: NaN,
    chatId: NaN,
    setToken: (token) => set(() => ({ token: token })),
    setUserId: (id) => set(() => ({ id: id })),
    setChatId: (chatId) => set(() => ({ chatId: chatId })),
  }))


export default useToken;