
export interface Message {
    id?: number
    senderId: number;
    chatId: number;
    content: string;
    createdAt: string;
    attach?: string;
    attachSize?: string;
    attach2?: string;
    attachSize2?: string;
  }

export type LoginState = {
    email: string
    password: string
  }
  
export type LoginAction = {
    setEmail: (email: LoginState['email']) => void
    setPassword: (email: LoginState['password']) => void
  }

export type SignUpState = {
    email: string
    username: string
    password1: string
    password2: string
  }
  
export type SignUpAction = {
    setEmail: (email: SignUpState['email']) => void
    setUsername: (username: SignUpState['username']) => void
    setPassword1: (password: SignUpState['password1']) => void
    setPassword2: (password2: SignUpState['password2']) => void
  }
  


export interface User {
    id: number
    username: string
    email: string
    password: string
    image: string
    online: boolean
  }

export interface Chat {
    id: number;
    user1Id: number;
    user2Id: number;
    user1: User;
    user2: User;
}
