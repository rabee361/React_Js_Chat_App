import {create} from 'zustand';

type TokenState = {
  token: string
}

type TokenAction = {
  setToken: (token: TokenState['token']) => void
}


const useToken = create<TokenState & TokenAction>((set) => ({
    token: '',
    setToken: (token) => set(() => ({ token: token })),
  }))


export default useToken;